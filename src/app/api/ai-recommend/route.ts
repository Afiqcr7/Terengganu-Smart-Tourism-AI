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

// ... inside route.ts
const result = await response.json();

// Make sure we are sending back a clean label string
const label = result[0]?.label || "Unknown";

return NextResponse.json({ label: label });
}