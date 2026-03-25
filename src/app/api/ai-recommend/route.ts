import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  
  // Convert image to Base64 (OpenRouter/OpenAI style)
  const bytes = await file.arrayBuffer();
  const base64Image = Buffer.from(bytes).toString("base64");

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "HTTP-Referer": "https://terengganu-smart-tourism-ai.vercel.app", // Required by OpenRouter
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.0-flash-lite-preview:free", // A very fast, free vision model
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Look at this image. Is it a beach, mountain, or building? Give me only one word." },
            { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64Image}` } }
          ]
        }
      ]
    }),
  });

  const result = await response.json();
  const aiAnswer = result.choices[0].message.content;

  return NextResponse.json({ label: aiAnswer });
}