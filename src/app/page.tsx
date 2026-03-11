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
{/* 1. HERO BANNER WITH VIDEO */}
<section className="position-relative w-100 overflow-hidden" style={{ height: '100vh' }}>
  
  {/* The Video Background */}
  <video 
    autoPlay 
    loop 
    muted 
    playsInline
    className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
    style={{ zIndex: -1 }}
  >
    <source src="/hero-video.mp4" type="video/mp4" />
  </video>

  {/* Overlay - Darkens the video so text is readable */}
  <div className="position-absolute top-0 start-0 w-100 h-100 bg-black opacity-50" style={{ zIndex: 0 }}></div>

  {/* Text Content */}
  <div className="container h-100 d-flex flex-column align-items-center justify-content-center text-white text-center position-relative" style={{ zIndex: 1 }}>
    <h1 className="display-1 fw-bold">Explore Terengganu</h1>
    <p className="lead fs-2">Discover the beauty of the East Coast</p>
    <button className="btn btn-primary btn-lg mt-4 px-5">Start Your Journey</button>
  </div>
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