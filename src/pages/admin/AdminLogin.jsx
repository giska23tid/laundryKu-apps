import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../libs/suppabase';
import { User, Lock, LogIn, ShieldCheck } from 'lucide-react';

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
    "Kelola data pesanan, layanan, dan transaksi dengan mudah.",
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
    }, 40);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 relative overflow-hidden">
      {/* Animated Blobs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute top-40 left-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-blob animation-delay-4000"></div>

      <div className="w-full max-w-md z-10">
        <div className="relative bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-10 flex flex-col items-center">
          {/* Logo/avatar */}
          <div className="flex flex-col items-center mb-6">
            <div className="bg-gradient-to-tr from-blue-600 to-blue-700 rounded-full p-3 shadow-lg mb-2">
              <ShieldCheck className="w-10 h-10 text-white" />
            </div>
            <div className="text-2xl font-extrabold tracking-wide text-blue-700 drop-shadow mb-1">
              LaundryKu Admin
            </div>
            <p className="text-xs text-gray-500 text-center min-h-[20px]">{typedText}{isTyping && <span className="animate-pulse">|</span>}</p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg mb-4 text-sm animate-shake w-full text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6 w-full">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Username</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500">
                  <User className="w-5 h-5" />
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/70"
                  placeholder="Masukkan username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500">
                  <Lock className="w-5 h-5" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/70"
                  placeholder="Masukkan password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-full font-bold text-lg shadow-lg hover:scale-[1.03] hover:shadow-xl transition-all duration-200"
            >
              <LogIn className="w-5 h-5" />
              LOGIN ADMIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
