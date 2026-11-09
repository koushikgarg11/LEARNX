import { NextRequest, NextResponse } from "next/server";
import { generateAssistantResponse, AssistantRole } from "@/lib/ai/assistant-service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { assistantType, prompt, context } = body;

    if (!assistantType || !prompt) {
      return NextResponse.json(
        { error: "assistantType and prompt are required" },
        { status: 400 }
      );
    }

    const response = await generateAssistantResponse(
      assistantType as AssistantRole,
      prompt,
      context
    );

    return NextResponse.json({
      success: true,
      message: response,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to process AI assistant request" },
      { status: 500 }
    );
  }
}
