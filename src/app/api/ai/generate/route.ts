import { NextResponse } from "next/server";
import { generateItinerary } from "@/lib/gemini";

export async function POST(req: Request) {
    try {
        const { destination, days, preferences } = await req.json();

        if (!destination || !days) {
            return NextResponse.json(
                { error: "Destination and days are required" },
                { status: 400 }
            );
        }

        const itinerary = await generateItinerary(destination, days, preferences);

        return NextResponse.json({ itinerary });
    } catch (error: any) {
        console.error("AI Generation Error:", error);
        return NextResponse.json(
            { error: "Failed to generate itinerary: " + error.message },
            { status: 500 }
        );
    }
}
