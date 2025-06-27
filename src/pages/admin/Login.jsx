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
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:flex flex-col items-center justify-center bg-green-600 text-white p-6">
          <h2 className="text-xl font-bold mb-2">LaundryKu Admin</h2>
          <p className="text-sm text-center mb-4 h-12">
            {typedText}{isTyping && <span className="animate-pulse">|</span>}
          </p>
          <img
            src="https://ouch-cdn2.icons8.com/W3TYoaxJ-EYwSWyl_b__dJChnebiQ5qP8xMfXre8XW0/rs:fit:832:720/czM6Ly9pY29uczgvZXNzZW50aWFscy1pbGx1c3RyYXRpb24tMTkuc3Zn.svg"
            alt="Login Art"
            className="w-40 h-40"
          />
        </div>

        <div className="p-8">
          <h2 className="text-3xl font-extrabold text-center text-green-600 mb-6">Login Admin</h2>
          {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Masukkan username"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Masukkan password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;