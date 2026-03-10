import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const data = await req.formData();
  const file = data.get('file') as File;
  
  const response = await fetch(
    "https://api-inference.huggingface.co/models/google/vit-base-patch16-224",
    {
      headers: { Authorization: `Bearer YOUR_HUGGINGFACE_TOKEN` },
      method: "POST",
      body: file,
    }
  );
  const result = await response.json();
  return NextResponse.json(result);
}