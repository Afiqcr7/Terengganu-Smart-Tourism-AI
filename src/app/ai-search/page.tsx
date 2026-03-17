"use client";
import { useState } from 'react';

export default function AISearch() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null); // To show the uploaded image
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0])); // Show thumbnail
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/classify', { method: 'POST', body: formData });
    const data = await res.json();
    
    // Check if the AI sees water/beach/sea
    const label = data[0]?.label || "General";
    setResult(label);
    setLoading(false);
  };

  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <h1 className="fw-bold display-4 text-primary">AI Travel Finder</h1>
          <p className="lead">Upload a photo of your dream scenery, and our AI will match it to the best spots in Terengganu.</p>
          
          <div className="p-4 border border-2 border-dashed rounded-4 bg-light text-center">
            <input type="file" onChange={handleFileChange} className="form-control mb-3" />
            {preview && <img src={preview} className="img-thumbnail mb-3" style={{ height: '150px' }} />}
            <button onClick={handleUpload} className="btn btn-primary btn-lg w-100" disabled={loading}>
              {loading ? <><span className="spinner-border spinner-border-sm me-2"></span> Analyzing...</> : "Scan & Recommend"}
            </button>
          </div>
        </div>

        <div className="col-md-6">
          {result && (
            <div className="card border-0 shadow-lg p-4 rounded-4 bg-primary text-white">
              <h3 className="fw-bold">AI Result: {result}</h3>
              <hr />
              <p>Based on your image, we suggest visiting:</p>
              <ul className="list-unstyled">
                <li><i className="bi bi-check-circle-fill me-2"></i> Pulau Redang</li>
                <li><i className="bi bi-check-circle-fill me-2"></i> Pulau Perhentian</li>
                <li><i className="bi bi-check-circle-fill me-2"></i> Tasik Kenyir</li>
              </ul>
              <a href="/districts" className="btn btn-light mt-3">Explore Districts</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}