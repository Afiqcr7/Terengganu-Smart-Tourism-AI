"use client"; // Required for using useEffect and useState

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';// Import the client we created earlier

export default function Home() {
  // This state will hold our tourist places
  const [places, setPlaces] = useState<any[]>([]);

  // useEffect runs when the page loads
  useEffect(() => {
    async function fetchPlaces() {
      const { data, error } = await supabase.from('places').select('*');
      
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setPlaces(data || []);
      }
    }

    fetchPlaces();
  }, []);

  return (
    <div className="container mt-5">
      <header className="text-center mb-5">
        <h1 className="display-4">Explore Terengganu</h1>
        <p className="lead">Discover the beauty of the East Coast</p>
      </header>

      <div className="row">
        {places.map((place) => (
          <div key={place.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{place.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{place.district}</h6>
                <p className="card-text">{place.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}