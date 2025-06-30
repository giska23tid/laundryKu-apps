import React, { useEffect, useState } from 'react';
import { supabase } from '../../libs/suppabase';
import { useNavigate } from 'react-router-dom';
import { Calendar, PackageCheck, Pencil, Trash2 } from 'lucide-react';

const DataPesanan = () => {
  const [pesanan, setPesanan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPesanan();
  }, []);

  const fetchPesanan = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('pesanan')
        .select(`
          id,
          nama,
          total_harga,
          status,
          tanggal,
          layanan:layanan_id(nama)
        `)
        .order('tanggal', { ascending: false });
      if (error) throw error;
      setPesanan(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (pesanan) => {
    navigate(`/admin/Pesanan/edit/${pesanan.id}`, {
      state: { pesananData: pesanan }
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus pesanan ini?')) return;
    try {
      const { error } = await supabase.from('pesanan').delete().eq('id', id);
      if (error) throw error;
      fetchPesanan();
      alert('Pesanan berhasil dihapus');
    } catch (err) {
      alert('Gagal menghapus pesanan: ' + err.message);
    }
  };

  const getStatusStyle = (status) => {
    const base = 'px-2 py-1 rounded-full text-xs font-semibold';
    switch (status) {
      case 'Selesai':
        return `${base} bg-green-100 text-green-700`;
      case 'Diproses':
        return `${base} bg-yellow-100 text-yellow-700`;
      case 'Dibatalkan':
        return `${base} bg-red-100 text-red-700`;
      default:
        return `${base} bg-gray-100 text-gray-700`;
    }
  };

  if (loading) return (
    <div className="p-6 flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
        <div className="text-xl text-blue-600 font-medium">Memuat data pesanan...</div>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 font-sans">
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
              <PackageCheck className="w-8 h-8 text-blue-600" />
              Data Pesanan
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
          <thead className="bg-blue-100 text-blue-800 text-left text-sm uppercase sticky top-0 z-10">
            <tr>
              <th className="p-4 font-semibold">No</th>
              <th className="p-4 font-semibold">Nama Pelanggan</th>
              <th className="p-4 font-semibold">Layanan</th>
              <th className="p-4 font-semibold">Total Harga</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Tanggal</th>
              <th className="p-4 font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 divide-y divide-gray-100">
            {pesanan.map((item, index) => (
              <tr key={item.id} className="hover:bg-blue-50/60 transition-all duration-200">
                <td className="p-4">{index + 1}</td>
                <td className="p-4 font-medium">{item.nama}</td>
                <td className="p-4">{item.layanan?.nama || '-'}</td>
                <td className="p-4">Rp {item.total_harga?.toLocaleString('id-ID') || '0'}</td>
                <td className="p-4">
                  <span className={getStatusStyle(item.status)}>{item.status}</span>
                </td>
                <td className="p-4">
                  {new Date(item.tanggal).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </td>
                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-sm transition"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-full shadow-sm transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataPesanan;
