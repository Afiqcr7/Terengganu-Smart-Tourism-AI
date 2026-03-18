"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AccommodationPage() {
  const [stays, setStays] = useState<any[]>([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    async function fetchStays() {
      const { data } = await supabase.from('accommodations').select('*');
      setStays(data || []);
    }
    fetchStays();
  }, []);

  // Filter logic
  const filteredStays = filter === 'All' ? stays : stays.filter(s => s.category === filter);

  return (
    <div className="container py-5">
      <h1 className="text-center fw-bold mb-4">Where to Stay</h1>
      
      {/* Filter Buttons */}
      <div className="d-flex justify-content-center gap-2 mb-5">
        {['All', 'Hotel', 'Homestay', 'Resort'].map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} 
            className={`btn ${filter === cat ? 'btn-primary' : 'btn-outline-primary'}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Layout */}
      <div className="row g-4">
        {filteredStays.map((stay) => (
          <div key={stay.id} className="col-md-4">
            <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden hover-effect">
              <div className="card-body p-4">
                <span className="badge bg-primary mb-2">{stay.category}</span>
                <h4 className="fw-bold">{stay.name}</h4>
                <p className="text-muted"><i className="bi bi-geo-alt"></i> {stay.district}</p>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span className="fw-bold text-primary">{stay.price_range}</span>
                  <button className="btn btn-sm btn-outline-dark">Book Now</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}