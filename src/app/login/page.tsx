"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Tourist'); // Default role

const handleSignUp = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password: password,
    options: { 
      data: { role: role } // Ensure role is saved
    }
  });

  if (error) {
    alert("Error: " + error.message);
  } else {
    // UPDATED MESSAGE:
    alert("Success! You can now log in.");
    // Automatically redirect them to the home page or login page
    window.location.href = '/login'; 
  }
};

  return (
    <div className="container py-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4">Login / Sign Up</h2>
      <input className="form-control mb-3" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="form-control mb-3" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      
      <select className="form-select mb-3" onChange={(e) => setRole(e.target.value)}>
        <option>Tourist</option>
        <option>Seller</option>
      </select>

      <button className="btn btn-primary w-100 mb-2" onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}