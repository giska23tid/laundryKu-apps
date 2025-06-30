import React, { useState } from 'react';
import { supabase } from '../../libs/suppabase';
import { useNavigate } from 'react-router-dom';
import { Wrench, Calendar, ArrowLeftCircle, PlusCircle } from 'lucide-react';

const TambahLayanan = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: '',
    deskripsi: '',
    harga: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('layanan').insert([formData]);
      if (error) throw error;
      alert('Layanan berhasil ditambahkan');
      navigate('/admin/layanan');
    } catch (err) {
      alert('Gagal menambah layanan: ' + err.message);
    }
  };

  return (
    <div className="flex-1 p-6 min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-blob animation-delay-4000"></div>
      </div>

      {/* Modern Header */}
      <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8 mb-8 z-10 max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-2">
          <Wrench className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 bg-clip-text text-transparent">
            Tambah Layanan
          </h1>
        </div>
        <div className="flex items-center text-gray-600 bg-gray-50 rounded-full px-4 py-2 w-fit mb-4">
          <Calendar className="w-5 h-5 mr-2" />
          <span className="font-medium">{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Layanan</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
            <textarea
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp)</label>
            <input
              type="number"
              name="harga"
              value={formData.harga}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate('/admin/layanan')}
              className="flex items-center gap-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-full transition font-semibold"
            >
              <ArrowLeftCircle className="w-5 h-5" />
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow transition font-semibold"
            >
              <PlusCircle className="w-5 h-5" />
              Tambah Layanan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahLayanan;
