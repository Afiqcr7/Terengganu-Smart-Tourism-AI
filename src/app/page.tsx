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
{/* 1. HERO BANNER (Top) */}
<section className="position-relative w-100 vh-100 overflow-hidden">
  <video autoPlay loop muted playsInline className="position-absolute w-100 h-100 object-fit-cover" style={{ zIndex: -1 }}>
    <source src="/hero-video.mp4" type="video/mp4" />
  </video>
  <div className="container h-100 d-flex align-items-center justify-content-center text-white text-center">
    <h1 className="display-1 fw-bold">Explore Terengganu</h1>
  </div>
</section>

{/* 2. AI TRAVEL ASSISTANT (Moved to top for visibility) */}
<section className="py-5 bg-primary text-white">
  <div className="container text-center">
    <h2 className="display-5 fw-bold mb-3">AI Travel Assistant</h2>
    <p className="lead mb-4">Upload a photo, and let our AI curate your perfect Terengganu trip.</p>
    
    <div className="card shadow-lg p-4 mx-auto rounded-4" style={{ maxWidth: '600px' }}>
      <div className="card-body">
        <a href="/ai-search" className="btn btn-primary btn-lg w-100 fw-bold py-3 shadow-sm">
          <i className="bi bi-camera-fill me-2"></i> Launch AI Scanner
        </a>
      </div>
    </div>
  </div>
</section>

{/* 3. RECOMMENDED PLACES & OTHERS ... */}


{/* 2. RECOMMENDED PLACES (Enhanced) */}
<section className="container py-5">
  <h2 className="mb-5 text-center fw-bold">Recommended Places</h2>
  <div className="row g-4">
    {places.map((place) => (
      <div key={place.id} className="col-md-3">
        <div className="card h-100 border-0 shadow-lg overflow-hidden" style={{ borderRadius: '20px' }}>
          {/* Use the image_url from your database */}
          <img src={place.image_url || 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5'} 
               className="card-img-top" alt={place.name} style={{ height: '200px', objectFit: 'cover' }} />
          <div className="card-body p-4">
            <h5 className="fw-bold">{place.name}</h5>
            <p className="text-primary small">{place.district}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

{/* 3. LOCAL FOOD (Card-style Grid) */}
<section className="bg-light py-5">
  <div className="container">
    <h2 className="mb-5 text-center fw-bold">Local Delicacies</h2>
    <div className="row g-4">
      {[
        { name: 'Keropok Lekor', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRterhmK_eQcXVKWflRQcG5GQ9r6HjhR1bQsA&s' },
        { name: 'Nasi Dagang', img: 'https://www.hexafood.com/wp-content/uploads/2023/10/Nasi-Dagang-Rice-Cooker-Gulai-Ikan-Tongkol-Acar-Mentah-3-scaled.jpg' }
      ].map((food) => (
        <div key={food.name} className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm text-center p-3" style={{ borderRadius: '15px' }}>
            <img src={food.img} className="rounded-circle mx-auto mb-3" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
            <h5>{food.name}</h5>
          </div>
        </div>
      ))}
    </div>

  </div>
</section>
    </div>
  );
}