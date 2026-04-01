"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState('');

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setRole(user.user_metadata.role); // This gets the role we saved during signup
      }
    }
    getUser();
  }, []);

  if (!user) return <div className="container py-5">Please log in.</div>;

  return (
    <div className="container py-5">
      <h1>Welcome, {user.email}</h1>
      <p>Your Role: <strong>{role}</strong></p>

      {role === 'Seller' ? (
        <div className="mt-4 p-4 border rounded shadow">
          <h3>Seller Control Panel</h3>
          <p>You can manage your listings here:</p>
          <div className="d-flex gap-3">
            <a href="/accommodation/add" className="btn btn-success">Add Hotel/Homestay</a>
            <a href="/food/add" className="btn btn-warning">Add Restaurant</a>
          </div>
        </div>
      ) : (
        <div className="mt-4 p-4 border rounded bg-light">
          <h3>My Tourist Profile</h3>
          <p>Browse your favourite places and AI recommendations!</p>
        </div>
      )}
    </div>
  );
}