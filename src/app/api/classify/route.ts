import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as Blob;

const response = await fetch(
  "https://api-inference.huggingface.co/models/nlpconnect/vit-gpt2-image-captioning",
  {
    headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` },
    method: "POST",
    body: file,
  }
);

  const result = await response.json();
  // Return the top label found by the AI
  const description = result[0]?.generated_text || "A beautiful place in Terengganu";
  
  return NextResponse.json({ label: description });
}

