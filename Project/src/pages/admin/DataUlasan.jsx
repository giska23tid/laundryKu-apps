import React, { useEffect, useState } from 'react';
import { supabase } from '../../libs/suppabase';

const DataUlasan = () => {
  const [ulasan, setUlasan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUlasan = async () => {
      try {
        setLoading(true);
        
        // Ambil data ulasan dari tabel 'message'
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

  if (loading) return <div className="p-6">Memuat data ulasan...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Data Ulasan dan Pesan</h1>
      
      <div className="overflow-auto rounded-xl bg-white shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-left text-sm text-gray-700">
            <tr>
              <th className="p-4">No</th>
              <th className="p-4">Nama</th>
              <th className="p-4">Email</th>
              <th className="p-4">No HP</th>
              <th className="p-4">Jenis Layanan</th>
              <th className="p-4">Pesan/Ulasan</th>
              <th className="p-4">Tanggal</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {ulasan.map((item, index) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{item.nama || '-'}</td>
                <td className="p-4">{item.email || '-'}</td>
                <td className="p-4">{item.no_hp || '-'}</td>
                <td className="p-4">{item.jenis_layanan || '-'}</td>
                <td className="p-4">{item.subject || '-'}</td>
                <td className="p-4">
                  {new Date(item.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
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