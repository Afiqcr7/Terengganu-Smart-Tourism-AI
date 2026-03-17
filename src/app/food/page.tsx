"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function FoodPage() {
  const [foods, setFoods] = useState<any[]>([]);

  useEffect(() => {
    async function fetchFood() {
      const { data } = await supabase.from('restaurants').select('*'); // Assuming you have a 'restaurants' or 'food' table
      setFoods(data || []);
    }
    fetchFood();
  }, []);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold display-4">Terengganu Delicacies</h1>
        <p className="text-muted lead">Savor the authentic taste of the East Coast</p>
      </div>

      <div className="row g-4">
        {foods.map((food) => (
          <div key={food.id} className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm overflow-hidden rounded-4 hover-effect">
              {/* Image Container */}
              <div className="position-relative">
                <img 
                  src={food.image_url || 'https://images.unsplash.com/photo-1596720516644-8d48a3130d1f'} 
                  className="card-img-top" 
                  alt={food.name} 
                  style={{ height: '250px', objectFit: 'cover' }} 
                />
                <span className="position-absolute top-0 end-0 m-3 badge bg-primary">Local Favorite</span>
              </div>

              {/* Body */}
              <div className="card-body p-4">
                <h4 className="fw-bold">{food.name}</h4>
                <p className="text-muted small">{food.description || "A must-try traditional dish when visiting Terengganu."}</p>
                <div className="d-flex align-items-center mt-3 text-primary">
                  <i className="bi bi-geo-alt-fill me-2"></i>
                  <small className="fw-bold">{food.location || "Various Locations"}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}