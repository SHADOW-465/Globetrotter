import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
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

        // Create user in our DB if not exists (sync with Supabase)
        let dbUser = await prisma.user.findUnique({
            where: { email: user.email! },
        });

        if (!dbUser) {
            dbUser = await prisma.user.create({
                data: {
                    id: user.id,
                    email: user.email!,
                    name: user.user_metadata.first_name + " " + user.user_metadata.last_name,
                    password: "", // Supabase manages password
                },
            });
        }

        const trip = await prisma.trip.create({
            data: {
                name,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                description,
                userId: user.id,
                stops: {
                    create: itinerary.map((day: any, index: number) => ({
                        city: place, // For simplicity, using same city for all stops in a single-destination trip
                        country: "", // Could be enhanced with Gemini
                        startDate: new Date(startDate), // Simplified
                        endDate: new Date(endDate),
                        sequence: index,
                        activities: {
                            create: day.activities.map((act: any) => ({
                                name: act.name,
                                description: act.description,
                                cost: act.cost,
                                time: act.time,
                            })),
                        },
                    })),
                },
            },
        });

        return NextResponse.json({ trip });
    } catch (error: any) {
        console.error("Trip Creation Error:", error);
        return NextResponse.json(
            { error: "Failed to create trip: " + error.message },
            { status: 500 }
        );
    }
}
