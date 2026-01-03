import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
});

export async function generateItinerary(destination: string, days: number, preferences?: string) {
    const prompt = `Generate a detailed day-by-day travel itinerary for ${days} days in ${destination}. 
  Preferences: ${preferences || 'None'}. 
  Include activities, estimated costs, and timing for each day.
  Format the response as a valid JSON array of objects, where each object represents a day.
  Each day object should have:
  - day: number
  - activities: array of objects { name: string, time: string, cost: number, description: string }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Basic cleaning of JSON response if needed
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
}
