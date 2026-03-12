type GenerateReplyParams = {
    message: string;
};

type OpenAIMessage = {
    role: "system" | "user" | "assistant";
    content: string;
};

type OpenAIChatResponse = {
    choices?: Array<{
        message?: {
            content?: string;
        };
    }>;
    error?: {
        message?: string;
    };
};

export async function generateReply({
    message,
}: GenerateReplyParams): Promise<string> {
    const apiKey = process.env.OPENAI_API_KEY;
    const baseUrl = process.env.OPENAI_BASE_URL;
    const model = process.env.OPENAI_MODEL;

    if (!apiKey) {
        throw new Error("OPENAI_API_KEY is not configured");
    }

    if (!baseUrl) {
        throw new Error("OPENAI_BASE_URL is not configured");
    }

    if (!model) {
        throw new Error("OPENAI_MODEL is not configured");
    }

    const messages: OpenAIMessage[] = [
        {
            role: "system",
            content:
                "You are a helpful AI assistant. Respond clearly and concisely",
        },
        {
            role: "user",
            content: message,
        },
    ];

    const response = await fetch (`${baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model,
            messages,
            temperature: 0.7,
        }),
    });

    const data: OpenAIChatResponse = await response.json();

    if (!response.ok) {
        throw new Error(data?.error?.message || "AI API request failed");
    }

    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
        throw new Error("AI API returned an empty response");
    }

    return reply;
}