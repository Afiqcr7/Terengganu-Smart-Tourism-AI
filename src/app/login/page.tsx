"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Tourist');
  const [name, setName] = useState(''); // 1. Added name state
  const [isLogin, setIsLogin] = useState(true);

  const handleAction = async () => {
    if (isLogin) {
      // LOGIN LOGIC
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) alert(error.message);
      else window.location.href = '/dashboard'; // Redirect to dashboard
    } else {
      // SIGN UP LOGIC
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { 
          data: { role, full_name: name } // 3. Save name here
        }
      });
      if (error) alert(error.message);
      else alert("Account created! Please log in now.");
    }
  };

  return (
    <div className="container py-5 text-center" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4">{isLogin ? "Login" : "Sign Up"}</h2>
      
      <input className="form-control mb-3" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      
      {/* 2. Added Full Name input (Only shows on Sign Up) */}
      {!isLogin && (
        <input className="form-control mb-3" placeholder="Full Name" onChange={(e) => setName(e.target.value)} />
      )}

      <input className="form-control mb-3" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      
      {!isLogin && (
        <select className="form-select mb-3" onChange={(e) => setRole(e.target.value)}>
          <option value="Tourist">Tourist</option>
          <option value="Seller">Seller</option>
        </select>
      )}

      <button className="btn btn-primary w-100 mb-3" onClick={handleAction}>
        {isLogin ? "Login" : "Sign Up"}
      </button>

      <button className="btn btn-link" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
      </button>
    </div>
  );
}