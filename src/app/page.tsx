"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [places, setPlaces] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPlaces() {
      const { data } = await supabase.from('places').select('*');
      setPlaces(data || []);
    }
    fetchPlaces();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5 text-center shadow-lg">
        <div className="container">
          <h1 className="display-3 fw-bold">Visit Terengganu</h1>
          <p className="lead">Experience the culture, islands, and cuisine of the East Coast.</p>
          <div className="mt-4">
            <button className="btn btn-light btn-lg px-4 me-2">Explore Now</button>
            <button className="btn btn-outline-light btn-lg px-4">View Map</button>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <main className="container my-5">
        <h2 className="mb-4 text-center">Top Tourist Attractions</h2>
        <div className="row g-4">
          {places.map((place) => (
            <div key={place.id} className="col-md-4">
              <div className="card h-100 border-0 shadow-sm hover-effect">
                <div className="card-body">
                  <div className="text-primary mb-3">
                    <i className="bi bi-geo-alt-fill" style={{ fontSize: '2rem' }}></i>
                  </div>
                  <h5 className="card-title fw-bold">{place.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{place.district}</h6>
                  <p className="card-text">{place.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}