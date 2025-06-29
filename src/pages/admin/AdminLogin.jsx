import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../libs/suppabase';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const typedMessages = [
    "Selamat datang kembali di dashboard admin.",
    "Kelola data pesanan, pelanggan, dan transaksi.",
    "Pastikan keamanan akun Anda selalu terjaga.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % typedMessages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const message = typedMessages[currentSlide];
    let index = 0;
    setTypedText('');
    setIsTyping(true);
    const typeInterval = setInterval(() => {
      if (index < message.length) {
        setTypedText(message.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 50);
    return () => clearInterval(typeInterval);
  }, [currentSlide]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error: loginError } = await supabase
      .from('admin')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .single();

    if (loginError || !data) {
      setError('Username atau password salah.');
    } else {
      localStorage.setItem('adminLoggedIn', true);
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-500 to-blue-700 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 transition-all duration-300">
        <div className="text-center mb-6">
          <div className="text-blue-600 text-4xl font-extrabold tracking-wide mb-1">
            LaundryKu Admin
          </div>
          <p className="text-sm text-gray-500">{typedText}{isTyping && <span className="animate-pulse">|</span>}</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan username"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md"
          >
            🔐 LOGIN ADMIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
