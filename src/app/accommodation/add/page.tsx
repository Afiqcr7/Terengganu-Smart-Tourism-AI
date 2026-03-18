"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AddListing() {
  const [formData, setFormData] = useState({ name: '', category: 'Hotel', district: '', price_range: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from('accommodations').insert([formData]);
    alert('Listing Added Successfully!');
  };

  return (
    <div className="container py-5">
      <div className="card shadow p-5 mx-auto" style={{ maxWidth: '500px' }}>
        <h2 className="mb-4">Add Your Property</h2>
        <form onSubmit={handleSubmit}>
          <input className="form-control mb-3" placeholder="Name" onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <select className="form-select mb-3" onChange={(e) => setFormData({...formData, category: e.target.value})}>
            <option>Hotel</option><option>Homestay</option><option>Resort</option>
          </select>
          <input className="form-control mb-3" placeholder="District" onChange={(e) => setFormData({...formData, district: e.target.value})} />
          <input className="form-control mb-3" placeholder="Price (e.g. RM200/night)" onChange={(e) => setFormData({...formData, price_range: e.target.value})} />
          <button type="submit" className="btn btn-primary w-100">Submit Listing</button>
        </form>
      </div>
    </div>
  );
}