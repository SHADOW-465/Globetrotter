import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
    try {
        const { name, place, startDate, endDate, description, itinerary } = await req.json();

        // Get user from session
        const { data: { user } } = await supabase.auth.getUser(
            req.headers.get("Authorization")?.split(" ")[1] || ""
        );

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Sync user (optional, but good for joins later if we had a pure SQL relation)
        // With Supabase, we can check if the user exists in `public.User` or relies on `auth.users`
        // Assuming we maintain a `User` table in public schema as per original Prisma schema:
        const { data: dbUser } = await supabase
            .from('User')
            .select('*')
            .eq('id', user.id)
            .single();

        if (!dbUser) {
            await supabase.from('User').insert({
                id: user.id,
                email: user.email!,
                name: user.user_metadata.first_name + " " + user.user_metadata.last_name,
                password: "", // Legacy field from schema
                updatedAt: new Date().toISOString()
            });
        }

        // Create Trip
        const { data: trip, error: tripError } = await supabase
            .from('Trip')
            .insert({
                name,
                startDate: new Date(startDate).toISOString(),
                endDate: new Date(endDate).toISOString(),
                description,
                userId: user.id,
                updatedAt: new Date().toISOString()
            })
            .select()
            .single();

        if (tripError) throw tripError;

        // Create Stops and Activities
        // Note: Supabase doesn't support deep nested creates in one go like Prisma
        // We have to iterate or use RPC, or multiple inserts.
        // Doing sequential inserts for simplicity here.

        for (let index = 0; index < itinerary.length; index++) {
            const day = itinerary[index];
            const { data: stop, error: stopError } = await supabase
                .from('Stop')
                .insert({
                    tripId: trip.id,
                    city: place,
                    country: "",
                    startDate: new Date(startDate).toISOString(),
                    endDate: new Date(endDate).toISOString(),
                    sequence: index,
                    updatedAt: new Date().toISOString()
                })
                .select()
                .single();

            if (stopError) {
                console.error("Failed to create stop", stopError);
                continue;
            }

            if (day.activities && day.activities.length > 0) {
                const activitiesToInsert = day.activities.map((act: any) => ({
                    stopId: stop.id,
                    name: act.name,
                    description: act.description,
                    cost: act.cost,
                    time: act.time,
                    updatedAt: new Date().toISOString()
                }));

                const { error: actError } = await supabase
                    .from('Activity')
                    .insert(activitiesToInsert);

                if (actError) console.error("Failed to insert activities", actError);
            }
        }

        return NextResponse.json({ trip });
    } catch (error: any) {
        console.error("Trip Creation Error:", error);
        return NextResponse.json(
            { error: "Failed to create trip: " + error.message },
            { status: 500 }
        );
    }
}
