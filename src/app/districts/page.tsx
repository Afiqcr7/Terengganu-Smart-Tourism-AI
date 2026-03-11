"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase'; 

export default function DistrictsPage() {
  const [accommodations, setAccommodations] = useState<any[]>([]);

  useEffect(() => {
    async function fetchAccommodations() {
      const { data, error } = await supabase.from('accommodations').select('*');
      
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setAccommodations(data || []);
      }
    }

    fetchAccommodations();
  }, []);

  return (
    <div className="container mt-5">
      {/* NAVIGATION GOES HERE, INSIDE THE RETURN STATEMENT */}
      <nav className="mb-4">
        <a href="/" className="btn btn-outline-primary me-2">Home</a>
        <a href="/districts" className="btn btn-primary">View Accommodations</a>
      </nav>

      <h1 className="mb-4">Places to Stay in Terengganu</h1>
      
      <div className="row">
        {accommodations.map((item) => (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <h6 className="card-subtitle mb-2 text-primary">{item.category}</h6>
                <p className="card-text">
                  <strong>District:</strong> {item.district} <br />
                  <strong>Price:</strong> {item.price_range}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}