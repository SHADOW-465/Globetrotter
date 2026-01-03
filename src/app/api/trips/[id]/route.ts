import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { data: { user } } = await supabase.auth.getUser(
            req.headers.get("Authorization")?.split(" ")[1] || ""
        );

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const trip = await prisma.trip.findUnique({
            where: {
                id: params.id,
                userId: user.id
            },
            include: {
                stops: {
                    include: {
                        activities: true
                    },
                    orderBy: { sequence: 'asc' }
                }
            }
        });

        if (!trip) {
            return NextResponse.json({ error: "Trip not found" }, { status: 404 });
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
