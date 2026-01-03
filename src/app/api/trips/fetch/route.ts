import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: Request) {
    try {
        const { data: { user } } = await supabase.auth.getUser(
            req.headers.get("Authorization")?.split(" ")[1] || ""
        );

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { data: trips, error } = await supabase
            .from('Trip')
            .select(`
                *,
                stops:Stop(
                    *,
                    activities:Activity(*)
                )
            `)
            .eq('userId', user.id)
            .order('createdAt', { ascending: false });

        if (error) throw error;

        return NextResponse.json({ trips });
    } catch (error: any) {
        console.error("Fetch Trips Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch trips: " + error.message },
            { status: 500 }
        );
    }
}
