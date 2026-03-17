import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  // 1. Use process.env to keep your token secret!
  const response = await fetch(
    "https://api-inference.huggingface.co/models/google/vit-base-patch16-224",
    {
      headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` },
      method: "POST",
      body: file,
    }
  );

  const result = await response.json();

  // 2. The AI returns an array, we grab the top result (index 0)
  // We return it in a clean format that your frontend can easily read
  const topResult = result[0]?.label || "Terengganu Landscape";

  return NextResponse.json({ label: topResult });
}