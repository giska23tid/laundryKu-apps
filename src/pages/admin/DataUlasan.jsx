import React, { useEffect, useState } from 'react';
import { supabase } from '../../libs/suppabase';
import { MessageCircle, Calendar } from 'lucide-react';

const DataUlasan = () => {
  const [ulasan, setUlasan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUlasan = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('message')
          .select(`
            id,
            nama,
            email,
            no_hp,
            jenis_layanan,
            subject,
            created_at
          `)
          .order('created_at', { ascending: false });
        if (error) throw error;
        setUlasan(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUlasan();
  }, []);

  if (loading) return (
    <div className="p-6 flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
        <div className="text-xl text-blue-600 font-medium">Memuat data ulasan...</div>
      </div>
    </div>
  );
  if (error) return (
    <div className="p-6 flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <div className="text-red-600 text-xl font-semibold">Error: {error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex-1 p-6 min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-blob animation-delay-4000"></div>
      </div>

      {/* Modern Header */}
      <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8 mb-8 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 bg-clip-text text-transparent mb-3 flex items-center gap-3">
              <MessageCircle className="w-8 h-8 text-blue-600" />
              Data Ulasan & Pesan
            </h1>
            <div className="flex items-center text-gray-600 bg-gray-50 rounded-full px-4 py-2 w-fit">
              <Calendar className="w-5 h-5 mr-2" />
              <span className="font-medium">{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 overflow-x-auto z-10">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-blue-100 text-blue-800 text-left uppercase text-xs font-semibold sticky top-0 z-10">
            <tr>
              <th className="p-4">No</th>
              <th className="p-4">Nama</th>
              <th className="p-4">Email</th>
              <th className="p-4">No HP</th>
              <th className="p-4">Jenis Layanan</th>
              <th className="p-4">Pesan / Ulasan</th>
              <th className="p-4">Tanggal</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 divide-y divide-gray-100">
            {ulasan.map((item, index) => (
              <tr key={item.id} className="hover:bg-blue-50/60 transition-all duration-200">
                <td className="p-4">{index + 1}</td>
                <td className="p-4 font-medium">{item.nama || '-'}</td>
                <td className="p-4">{item.email || '-'}</td>
                <td className="p-4">{item.no_hp || '-'}</td>
                <td className="p-4">{item.jenis_layanan || '-'}</td>
                <td className="p-4">{item.subject || '-'}</td>
                <td className="p-4 text-sm text-gray-500">
                  {new Date(item.created_at).toLocaleDateString('id-ID', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataUlasan;
