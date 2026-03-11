"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [places, setPlaces] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from('places').select('*').limit(6);
      setPlaces(data || []);
    }
    fetchData();
  }, []);

  return (
    <div>
      {/* 1. HERO BANNER */}
      <section className="p-5 text-center bg-primary text-white rounded-bottom-4 shadow">
        <h1 className="display-3 fw-bold">Explore Terengganu</h1>
        <p className="lead">The Land of Hidden Gems & Crystal Clear Waters</p>
      </section>

      {/* 2. RECOMMENDED PLACES */}
      <section className="container py-5">
        <h2 className="mb-4 text-center">Recommended Places</h2>
        <div className="row g-4">
          {places.map((place) => (
            <div key={place.id} className="col-md-3">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5>{place.name}</h5>
                  <p className="text-muted">{place.district}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. LOCAL FOOD SECTION (Simple Layout) */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h2>Local Delicacies</h2>
          <div className="row mt-4">
            {['Keropok Lekor', 'Nasi Dagang', 'Laksam', 'Satar'].map((food) => (
              <div key={food} className="col-md-3">
                <div className="p-3 border rounded bg-white shadow-sm">{food}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. UPCOMING EVENTS */}
      <section className="container py-5">
        <h2 className="mb-4">Upcoming Events</h2>
        <div className="list-group">
          <div className="list-group-item p-3">
            <h5>Monsoon Cup</h5>
            <p className="mb-0">World-class sailing event in Terengganu.</p>
          </div>
          <div className="list-group-item p-3">
            <h5>Squid Jigging Festival</h5>
            <p className="mb-0">Join the annual night fishing experience.</p>
          </div>
        </div>
      </section>
    </div>
  );
}