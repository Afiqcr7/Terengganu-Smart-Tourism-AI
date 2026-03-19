"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      const { data } = await supabase.from('events').select('*');
      setEvents(data || []);
    }
    fetchEvents();
  }, []);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold display-4">Upcoming Events</h1>
        <p className="text-muted">Don't miss the excitement in Terengganu!</p>
      </div>

      <div className="row g-4">
        {events.map((event) => (
          <div key={event.id} className="col-lg-6">
            <div className="card h-100 shadow-sm border-0 rounded-4 p-3 hover-effect">
              <div className="row g-0 align-items-center">
                {/* Date Box */}
                <div className="col-3 text-center bg-primary text-white rounded-4 p-3">
                  <h3 className="mb-0">{new Date(event.event_date).getDate()}</h3>
                  <small className="text-uppercase">
                    {new Date(event.event_date).toLocaleString('default', { month: 'short' })}
                  </small>
                </div>
                
                {/* Event Info */}
                <div className="col-9 ps-3">
                  <h5 className="fw-bold mb-1">{event.name}</h5>
                  <p className="small text-muted mb-1">
                    <i className="bi bi-geo-alt-fill"></i> {event.location}
                  </p>
                  <p className="small mb-0">{event.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}