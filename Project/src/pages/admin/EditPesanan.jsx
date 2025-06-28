import React, { useEffect, useState } from 'react';
import { supabase } from '../../libs/suppabase';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

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
    // Ambil data dari state navigasi jika ada
    if (location.state?.pesananData) {
      const { pesananData } = location.state;
      setFormData({
        nama: pesananData.nama,
        total_harga: pesananData.total_harga,
        status: pesananData.status,
        tanggal: pesananData.tanggal.split('T')[0]
      });
    } else {
      // Jika tidak ada state, ambil dari API
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
      if (data) {
        setFormData({
          nama: data.nama,
          total_harga: data.total_harga,
          status: data.status,
          tanggal: data.tanggal.split('T')[0]
        });
      }
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Edit Pesanan</h1>
      
      <div className="bg-white p-6 rounded-xl shadow">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Pelanggan</label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Total Harga</label>
              <input
                type="number"
                name="total_harga"
                value={formData.total_harga}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
                required
              >
                <option value="Diproses">Diproses</option>
                <option value="Selesai">Selesai</option>
                <option value="Dibatalkan">Dibatalkan</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Tanggal</label>
              <input
                type="date"
                name="tanggal"
                value={formData.tanggal}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
                required
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Simpan Perubahan
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/Pesanan')}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Batal
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPesanan;