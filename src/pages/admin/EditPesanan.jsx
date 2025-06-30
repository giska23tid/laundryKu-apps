import React, { useEffect, useState } from 'react';
import { supabase } from '../../libs/suppabase';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Pencil, Calendar, ArrowLeftCircle, Save } from 'lucide-react';

const EditPesanan = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: '',
    total_harga: '',
    status: '',
    tanggal: ''
  });

  useEffect(() => {
    if (location.state?.pesananData) {
      const { pesananData } = location.state;
      setFormData({
        nama: pesananData.nama,
        total_harga: pesananData.total_harga,
        status: pesananData.status,
        tanggal: pesananData.tanggal.split('T')[0]
      });
    } else {
      fetchPesanan();
    }
  }, [id, location.state]);

  const fetchPesanan = async () => {
    try {
      const { data, error } = await supabase
        .from('pesanan')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setFormData({
        nama: data.nama,
        total_harga: data.total_harga,
        status: data.status,
        tanggal: data.tanggal.split('T')[0]
      });
    } catch (err) {
      alert('Gagal mengambil data: ' + err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('pesanan')
        .update(formData)
        .eq('id', id);

      if (error) throw error;

      alert('Pesanan berhasil diperbarui');
      navigate('/admin/Pesanan');
    } catch (err) {
      alert('Gagal memperbarui pesanan: ' + err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 font-sans">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-blob animation-delay-4000"></div>
      </div>

      {/* Modern Header */}
      <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8 mb-8 z-10 max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-2">
          <Pencil className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 bg-clip-text text-transparent">
            Edit Data Pesanan
          </h1>
        </div>
        <div className="flex items-center text-gray-600 bg-gray-50 rounded-full px-4 py-2 w-fit mb-4">
          <Calendar className="w-5 h-5 mr-2" />
          <span className="font-medium">{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Pelanggan
            </label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Harga
            </label>
            <input
              type="number"
              name="total_harga"
              value={formData.total_harga}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Diproses">Diproses</option>
              <option value="Selesai">Selesai</option>
              <option value="Dibatalkan">Dibatalkan</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal
            </label>
            <input
              type="date"
              name="tanggal"
              value={formData.tanggal}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate('/admin/Pesanan')}
              className="flex items-center gap-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-full transition font-semibold"
            >
              <ArrowLeftCircle className="w-5 h-5" />
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow transition font-semibold"
            >
              <Save className="w-5 h-5" />
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPesanan;
