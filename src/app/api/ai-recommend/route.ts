import { NextResponse } from 'next/server';
import { OpenRouter } from "@openrouter/sdk";

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    // Convert image to Base64
    const arrayBuffer = await file.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString("base64");

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://terengganu-smart-tourism-ai.vercel.app",
        "X-Title": "Terengganu Smart Tourism",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-lite-preview:free",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "What is in this image? Reply with one word: beach, mountain, or building." },
              { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64Image}` } }
            ]
          }
        ]
      }),
    });

    const result = await response.json();

    if (!result.choices || !result.choices[0]) {
      throw new Error(result.error?.message || "Failed to get AI response");
    }

    const aiAnswer = result.choices[0].message.content;
    return NextResponse.json({ label: aiAnswer });

  } catch (error) {
    console.error("AI API Error:", error);
    return NextResponse.json({ error: "AI processing failed" }, { status: 500 });
  }
}