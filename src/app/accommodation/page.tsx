"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AccommodationPage() {
  const [stays, setStays] = useState<any[]>([]);
  const [filter, setFilter] = useState('All');
  const [userRole, setUserRole] = useState(''); // Added this state

  useEffect(() => {
    async function fetchData() {
      // Fetch stays
      const { data } = await supabase.from('accommodations').select('*');
      setStays(data || []);

      // Check if user is a Seller
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // user_metadata is where the role is saved during signup
        setUserRole(user.user_metadata.role || '');
      }
    }
    fetchData();
  }, []);

  const filteredStays = filter === 'All' ? stays : stays.filter(s => s.category === filter);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">Where to Stay</h1>
        
        {/* ONLY SHOWS IF USER IS SELLER */}
        {userRole === 'Seller' && (
          <a href="/accommodation/add" className="btn btn-success shadow-sm">
            <i className="bi bi-plus-circle me-2"></i> Add New Listing
          </a>
        )}
      </div>
      
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