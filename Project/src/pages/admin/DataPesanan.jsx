import React, { useEffect, useState } from 'react';
import { supabase } from '../../libs/suppabase';
import { useNavigate } from 'react-router-dom';

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
  // Navigasi ke halaman edit dengan membawa data pesanan
  navigate(`/admin/Pesanan/edit/${pesanan.id}`, { 
    state: { 
      pesananData: pesanan 
    } 
  });
};

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus pesanan ini?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('pesanan')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Refresh data setelah menghapus
      fetchPesanan();
      alert('Pesanan berhasil dihapus');
    } catch (err) {
      alert('Gagal menghapus pesanan: ' + err.message);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Selesai':
        return 'text-green-600';
      case 'Diproses':
        return 'text-yellow-600';
      case 'Dibatalkan':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  if (loading) return <div className="p-6">Memuat data...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Data Pesanan</h1>
      
      <div className="overflow-auto rounded-xl bg-white shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-left text-sm text-gray-700">
            <tr>
              <th className="p-4">No</th>
              <th className="p-4">Nama Pelanggan</th>
              <th className="p-4">Layanan</th>
              <th className="p-4">Total Harga</th>
              <th className="p-4">Status</th>
              <th className="p-4">Tanggal</th>
              <th className="p-4">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {pesanan.map((item, index) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{item.nama}</td>
                <td className="p-4">{item.layanan?.nama || '-'}</td>
                <td className="p-4">Rp {item.total_harga?.toLocaleString('id-ID') || '0'}</td>
                <td className={`p-4 font-semibold ${getStatusClass(item.status)}`}>
                  {item.status}
                </td>
                <td className="p-4">
                  {new Date(item.tanggal).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </td>
                <td className="p-4 space-x-2">
                  <button 
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button 
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(item.id)}
                  >
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