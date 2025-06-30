// src/pages/admin/RiwayatTransaksi.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../libs/suppabase';
import { Printer, X, FileText, Calendar } from 'lucide-react';

const RiwayatTransaksi = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [selectedTransaksi, setSelectedTransaksi] = useState(null);
  const [showStruk, setShowStruk] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransaksi = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('pesanan')
          .select(`
            id,
            nama,
            no_hp,
            alamat,
            berat,
            total_harga,
            status,
            tanggal,
            layanan:layanan_id (
              nama,
              harga
            )
          `)
          .order('tanggal', { ascending: false });

        if (error) throw error;
        setTransaksi(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaksi();
  }, []);

  const handleShowStruk = (transaksi) => {
    setSelectedTransaksi(transaksi);
    setShowStruk(true);
  };

  const handlePrintStruk = () => {
    window.print();
  };

  const handleCancelStruk = () => {
    setShowStruk(false);
  };

  if (loading) return (
    <div className="p-6 flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
        <div className="text-xl text-blue-600 font-medium">Memuat data transaksi...</div>
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
              <FileText className="w-8 h-8 text-blue-600" />
              Riwayat Transaksi
            </h1>
            <div className="flex items-center text-gray-600 bg-gray-50 rounded-full px-4 py-2 w-fit">
              <Calendar className="w-5 h-5 mr-2" />
              <span className="font-medium">{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 overflow-x-auto z-10 mb-8">
        <table className="min-w-full table-auto">
          <thead className="bg-blue-100 text-left text-sm text-blue-800 uppercase font-semibold sticky top-0 z-10">
            <tr>
              <th className="p-4">No</th>
              <th className="p-4">Nama Pelanggan</th>
              <th className="p-4">Layanan</th>
              <th className="p-4">Berat (kg)</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4">Tanggal</th>
              <th className="p-4">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
            {transaksi.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-500">
                  Tidak ada transaksi ditemukan.
                </td>
              </tr>
            ) : (
              transaksi.map((item, index) => (
                <tr key={item.id} className="hover:bg-blue-50/60 transition-all duration-200">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{item.nama}</td>
                  <td className="p-4">{item.layanan?.nama || '-'}</td>
                  <td className="p-4">{item.berat || '-'}</td>
                  <td className="p-4">Rp {item.total_harga?.toLocaleString('id-ID') || '0'}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.status === 'Selesai' ? 'bg-green-100 text-green-800' :
                      item.status === 'Diproses' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {new Date(item.tanggal).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleShowStruk(item)}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <Printer size={16} /> Struk
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Struk */}
      {showStruk && selectedTransaksi && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-6 scrollbar-thin relative">
            {/* Tombol Close */}
            <button
              onClick={() => setShowStruk(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              aria-label="Tutup"
            >
              <X size={24} />
            </button>

            <div className="border-b pb-4 mb-4">
              <h3 className="text-lg font-medium text-center mb-2">LaundryKu</h3>
              <p className="text-center text-sm text-gray-600">Jl. Contoh No. 123, Kota Anda</p>
              <p className="text-center text-sm text-gray-600">Telp: 0812-3456-7890</p>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">No. Transaksi:</span>
                <span>{selectedTransaksi.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tanggal:</span>
                <span>
                  {new Date(selectedTransaksi.tanggal).toLocaleString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pelanggan:</span>
                <span>{selectedTransaksi.nama}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">No. HP:</span>
                <span>{selectedTransaksi.no_hp || '-'}</span>
              </div>
            </div>

            <div className="border-y py-4 mb-4">
              <div className="font-medium mb-2">Detail Layanan:</div>
              <div className="flex justify-between mb-1">
                <span>{selectedTransaksi.layanan?.nama || '-'}</span>
                <span>Rp {selectedTransaksi.layanan?.harga?.toLocaleString('id-ID') || '0'}</span>
              </div>
              <div className="flex justify-between">
                <span>Berat:</span>
                <span>{selectedTransaksi.berat || '0'} kg</span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-lg mb-6">
              <span>TOTAL:</span>
              <span>Rp {selectedTransaksi.total_harga?.toLocaleString('id-ID') || '0'}</span>
            </div>

            <div className="text-center text-sm text-gray-500 mb-4">
              Terima kasih telah menggunakan layanan kami
            </div>

            {/* Tombol Cetak dan Cancel */}
            <div className="flex justify-center gap-4">
              <button
                onClick={handleCancelStruk}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handlePrintStruk}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
              >
                <Printer size={16} /> Cetak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiwayatTransaksi;
