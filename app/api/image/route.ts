import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
const { OpenAIApi } = require("openai");

const openai = new OpenAIApi({
  apiKey: process.env.OPEN_AI_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!openai.apiKey) {
      return new NextResponse("Openai API key not configured", { status: 500 });
    }
    if (!prompt) {
      return new NextResponse("Prompt is Required", { status: 400 });
    }
    if (!amount) {
      return new NextResponse("Amount is Required", { status: 400 });
    }
    if (!resolution) {
      return new NextResponse("Resolution is Required", { status: 400 });
    }

    const response = await openai.create({
      prompt,
      n: parseInt(amount, 10),
      size: "medium",
    });

    console.log("OpenAI Response:", response);

    if (response.errors) {
      console.log("OpenAI Errors:", response.errors);
    }
    return NextResponse.json(response.data.data);
  } catch (error) {
    console.log("[Conversation Error]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
