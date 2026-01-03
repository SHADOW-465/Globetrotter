import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { data: { user } } = await supabase.auth.getUser(
            req.headers.get("Authorization")?.split(" ")[1] || ""
        );

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { data: trip, error } = await supabase
            .from('Trip')
            .select(`
                *,
                stops:Stop(
                    *,
                    activities:Activity(*)
                )
            `)
            .eq('id', id)
            .eq('userId', user.id)
            .single();

        if (error) throw error;

        if (!trip) {
            return NextResponse.json({ error: "Trip not found" }, { status: 404 });
        }

        // Sort stops by sequence in JS since Supabase simple query doesn't always guarantee deep order easily in one go without verbose syntax
        // or ensure DB returns ordered. For now, we sort manually.
        if (trip.stops && Array.isArray(trip.stops)) {
            trip.stops.sort((a: any, b: any) => a.sequence - b.sequence);
        }

        return NextResponse.json({ trip });
    } catch (error: any) {
        console.error("Fetch Trip Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch trip: " + error.message },
            { status: 500 }
        );
    }
}
