"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check user on load
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    
    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <a className="navbar-brand fw-bold" href="/">Terengganu</a>
        <div className="navbar-nav flex-row">
          <a className="nav-link mx-2" href="/">Home</a>
          <a className="nav-link mx-2" href="/districts">Districts</a>
          <a className="nav-link mx-2" href="/food">Food</a>
          <a className="nav-link mx-2" href="/accommodation">Stay</a>
          <a className="nav-link mx-2" href="/events">Events</a>
          <a className="nav-link mx-2" href="/ai-search">AI</a>
          
          {/* DYNAMIC NAV: Show Dashboard if logged in, Login if not */}
          {user ? (
            <a className="nav-link mx-2 fw-bold text-primary" href="/dashboard">Dashboard</a>
          ) : (
            <a className="nav-link mx-2 fw-bold text-success" href="/login">Login</a>
          )}
        </div>
      </div>
    </nav>
  );
}