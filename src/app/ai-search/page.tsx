"use client";
import { useState } from 'react';

export default function AISearch() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/classify', { method: 'POST', body: formData });
    const data = await res.json();
    setResult(data.label);
    setLoading(false);
  };

  return (
    <div className="container py-5 text-center">
      <h2>AI Terengganu Guide</h2>
      <p>Upload a photo of nature, and we'll tell you where to go!</p>
      
      <input type="file" onChange={(e) => setFile(e.target.files![0])} className="form-control w-50 mx-auto my-3" />
      <button onClick={handleUpload} className="btn btn-primary" disabled={loading}>
        {loading ? "Analyzing..." : "Find My Destination"}
      </button>

      {result && (
        <div className="mt-4 p-4 border rounded shadow-sm bg-white">
          <h3>AI thinks this is: {result}</h3>
          <p>Recommended for you: 
            {result.includes('beach') || result.includes('water') ? " Pulau Redang, Pulau Perhentian" : " Tasik Kenyir, Kenyir Elephant Village"}
          </p>
        </div>
      )}
    </div>
  );
}