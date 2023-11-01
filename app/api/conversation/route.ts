import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import { ChatCompletionMessage } from "openai/resources/index.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

const instructionMessage: ChatCompletionMessage = {
  role: "system",
  content:
    "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanation",
};
export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!openai.apiKey) {
      return new NextResponse("Openai API key not configured", { status: 500 });
    }
    if (!messages) {
      return new NextResponse("Messaged Are Required", { status: 400 });
    }
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages],
    });
    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log("[Conversation Error]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
