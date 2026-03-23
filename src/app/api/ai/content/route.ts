import { NextRequest, NextResponse } from "next/server";
import { getGeminiModel } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const {
      tool,
      topic,
      tone,
      audience,
      extraContext,
    } = (await request.json()) as {
      tool?: string;
      topic?: string;
      tone?: string;
      audience?: string;
      extraContext?: string;
    };

    if (!tool || !topic?.trim()) {
      return NextResponse.json({ error: "Tool and topic are required." }, { status: 400 });
    }

    const prompts: Record<string, string> = {
      email: `Write a polished email.
Topic: ${topic}
Tone: ${tone || "professional"}
Audience: ${audience || "general"}
Extra context: ${extraContext || "none"}

Return a subject line first, then the email body.`,
      content: `Create high-quality content.
Topic: ${topic}
Tone: ${tone || "clear and engaging"}
Audience: ${audience || "developers"}
Extra context: ${extraContext || "none"}

Return:
1. A headline
2. A short hook
3. A polished body
4. A call to action`,
      social: `Write a social post for LinkedIn or X.
Topic: ${topic}
Tone: ${tone || "confident"}
Audience: ${audience || "developers and recruiters"}
Extra context: ${extraContext || "none"}

Keep it punchy and practical, with a strong opening and clear formatting.`,
    };

    const prompt = prompts[tool];

    if (!prompt) {
      return NextResponse.json({ error: "Unsupported content tool." }, { status: 400 });
    }

    const model = getGeminiModel();
    const result = await model.generateContent(prompt);

    return NextResponse.json({ text: result.response.text() });
  } catch (error) {
    console.error("AI content error:", error);
    return NextResponse.json(
      { error: "Unable to generate content right now." },
      { status: 500 }
    );
  }
}
