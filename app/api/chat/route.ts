import { NextResponse } from "next/server";
import { generateReply } from "@/lib/ai";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const message = body?.message;

        if (!message || typeof message !== "string" || !message.trim()) {
            return NextResponse.json(
                { error: "Message is required" },
                { status: 400 }
            );
        }

        const reply = await generateReply({ message: message.trim() });

        return NextResponse.json({ reply }, { status: 200 });
    } catch (error) {
        console.error("API /api/chat error:", error);

        const errorMessage =
            error instanceof Error
                ? error.message
                : "Something went wrong while processing your request";

        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}