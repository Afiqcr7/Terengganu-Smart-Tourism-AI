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
    {/* 5. AI SMART RECOMMENDATION SECTION */}
<section className="py-5 bg-dark text-white text-center">
  <div className="container">
    <h2 className="mb-4">AI Travel Assistant</h2>
    <p className="lead mb-4">Upload a photo of your dream vacation, and we'll match it to a spot in Terengganu!</p>
    
    <div className="card p-4 w-50 mx-auto bg-light text-dark">
      <input 
        type="file" 
        onChange={(e) => {
          // You can create a function to handle this directly here!
          // For now, let's just make this link to the AI page
        }} 
        className="form-control mb-3" 
      />
      <a href="/ai-search" className="btn btn-primary btn-lg">
        Try AI Image Search
      </a>
    </div>
  </div>
</section>
  </div>
</section>
    </div>
  );
}