"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

// 1. We define the type for our data here
interface DistrictData {
  attractions: any[];
  restaurants: any[];
  hotels: any[];
}

export default function DistrictDetail() {
  const params = useParams();
  
  // params.name comes from the folder name [name]
  const districtName = decodeURIComponent(params.name as string);
  
  // 2. We pass the type to useState here
  const [data, setData] = useState<DistrictData>({ 
    attractions: [], 
    restaurants: [], 
    hotels: [] 
  });

  useEffect(() => {
    async function fetchData() {
      // Fetching from Supabase
      const { data: attractions } = await supabase.from('places').select('*').eq('district', districtName);
      const { data: restaurants } = await supabase.from('restaurants').select('*').eq('location', districtName);
      const { data: hotels } = await supabase.from('accommodations').select('*').eq('district', districtName);
      
      // Setting the state with the fetched data
      setData({ 
        attractions: attractions || [], 
        restaurants: restaurants || [], 
        hotels: hotels || [] 
      });
    }
    fetchData();
  }, [districtName]);

  return (
    <div className="container py-5">
      <h1 className="display-4 fw-bold mb-5">{districtName}</h1>
      
      <section className="mb-5">
        <h3>Attractions</h3>
        <div className="row">
          {data.attractions.map((a: any) => (
            <div key={a.id} className="col-md-3">
              <div className="card p-3 shadow-sm">{a.name}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-5">
        <h3>Restaurants</h3>
        <div className="row">
          {data.restaurants.map((r: any) => (
            <div key={r.id} className="col-md-3">
              <div className="card p-3 shadow-sm">{r.name}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3>Stays (Hotels/Homestays)</h3>
        <div className="row">
          {data.hotels.map((h: any) => (
            <div key={h.id} className="col-md-3">
              <div className="card p-3 shadow-sm">{h.name}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}