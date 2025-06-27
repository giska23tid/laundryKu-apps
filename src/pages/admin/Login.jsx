import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../libs/suppabase';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });

    if (loginError) {
      setError('Username atau password salah.');
    } else {
      localStorage.setItem('adminLoggedIn', 'true');
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f5f7fa]">
      {/* Left Illustration */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-green-300 to-green-500 rounded-r-[4rem] shadow-lg">
        <img
          src="https://ouch-cdn2.icons8.com/W3TYoaxJ-EYwSWyl_b__dJChnebiQ5qP8xMfXre8XW0/rs:fit:832:720/czM6Ly9pY29uczgvZXNzZW50aWFscy1pbGx1c3RyYXRpb24tMTkuc3Zn.svg"
          alt="Login Art"
          className="w-4/5 max-w-lg"
        />
      </div>

      {/* Right Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Avatar"
                className="w-10 h-10"
              />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-800">Welcome Back!</h1>
            <p className="text-sm text-gray-500 mt-1">
              Masuk untuk mengelola layanan LaundryKu
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-600 px-4 py-2 rounded-md text-sm mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none text-sm"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none text-sm"
              required
            />
            <div className="text-right text-xs text-green-600 hover:underline cursor-pointer">
              Lupa password?
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition duration-300 shadow-md"
            >
              LOGIN
            </button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-8">© 2025 LaundryKu. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
