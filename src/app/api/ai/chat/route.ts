import { NextRequest, NextResponse } from "next/server";
import { getGeminiModel } from "@/lib/ai";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = (await request.json()) as { messages?: ChatMessage[] };

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages are required." }, { status: 400 });
    }

    const model = getGeminiModel();
    const systemPrompt =
      "You are a practical AI assistant for a developer portfolio website. Help with career questions, resume advice, content drafting, and developer productivity. Be concise, actionable, and honest. If the user asks for facts not included in the conversation, state that you may need more context.";

    const history = messages.slice(0, -1).map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [{ text: message.content }],
    }));

    const latestMessage = messages[messages.length - 1];
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [{ text: "Understood. I will act as a concise developer and career assistant." }],
        },
        ...history,
      ],
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
      },
    });

    const result = await chat.sendMessage(latestMessage.content);
    return NextResponse.json({ reply: result.response.text() });
  } catch (error) {
    console.error("AI chat error:", error);
    return NextResponse.json(
      { error: "Unable to generate a chatbot reply right now." },
      { status: 500 }
    );
  }
}
