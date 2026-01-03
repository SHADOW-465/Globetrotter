import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";

export async function GET(req: Request) {
    try {
        const { data: { user } } = await supabase.auth.getUser(
            req.headers.get("Authorization")?.split(" ")[1] || ""
        );

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const trips = await prisma.trip.findMany({
            where: { userId: user.id },
            include: {
                stops: {
                    include: {
                        activities: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({ trips });
    } catch (error: any) {
        console.error("Fetch Trips Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch trips: " + error.message },
            { status: 500 }
        );
    }
}
