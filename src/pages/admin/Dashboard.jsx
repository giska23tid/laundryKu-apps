import React, { useEffect, useState } from "react";
import { PackageCheck, CheckCircle, AlertTriangle } from "lucide-react";
import { supabase } from "../../libs/suppabase";

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalPesanan: 0,
    pesananSelesai: 0,
    sedangProses: 0
  });
  
  const [pendapatanHariIni, setPendapatanHariIni] = useState(0);
  const [pesananTerbaru, setPesananTerbaru] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 1. Hitung total pesanan
        const { count: totalPesanan, error: countError } = await supabase
          .from('pesanan')
          .select('*', { count: 'exact' });
        
        if (countError) throw countError;
        
        // 2. Hitung pesanan selesai
        const { count: pesananSelesai, error: selesaiError } = await supabase
          .from('pesanan')
          .select('*', { count: 'exact' })
          .eq('status', 'Selesai');
        
        if (selesaiError) throw selesaiError;
        
        // 3. Hitung pesanan diproses
        const { count: sedangProses, error: prosesError } = await supabase
          .from('pesanan')
          .select('*', { count: 'exact' })
          .eq('status', 'Diproses');
        
        if (prosesError) throw prosesError;
        
        // 4. Hitung pendapatan hari ini
        const today = new Date().toISOString().split('T')[0];
        const { data: pendapatanData, error: pendapatanError } = await supabase
          .from('pesanan')
          .select('total_harga')
          .gte('tanggal', today)
          .lte('tanggal', today)
          .eq('status', 'Selesai');
        
        if (pendapatanError) throw pendapatanError;
        
        const totalPendapatan = (pendapatanData || []).reduce(
          (sum, item) => sum + (item?.total_harga || 0), 
          0
        );
        
        // 5. Ambil pesanan terbaru dengan join ke tabel layanan
        const { data: pesananData, error: pesananError } = await supabase
          .from('pesanan')
          .select(`
            id,
            nama,
            total_harga,
            status,
            tanggal,
            layanan:layanan_id (nama)
          `)
          .order('tanggal', { ascending: false })
          .limit(10);
        
        if (pesananError) throw pesananError;
        
        // Update state
        setSummary({
          totalPesanan: totalPesanan || 0,
          pesananSelesai: pesananSelesai || 0,
          sedangProses: sedangProses || 0
        });
        
        setPendapatanHariIni(totalPendapatan);
        setPesananTerbaru(pesananData || []);
        
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err.message);
        // Set default values jika error
        setSummary({
          totalPesanan: 0,
          pesananSelesai: 0,
          sedangProses: 0
        });
        setPendapatanHariIni(0);
        setPesananTerbaru([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  if (loading) return <div className="p-6">Memuat data...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Dashboard Admin
      </h1>

      {/* Ringkasan Hari Ini - 3 Card */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {[
          {
            label: "Total Pesanan",
            value: summary.totalPesanan,
            bg: "bg-green-100",
            text: "text-green-700",
            icon: <PackageCheck className="w-6 h-6" />
          },
          {
            label: "Pesanan Selesai",
            value: summary.pesananSelesai,
            bg: "bg-blue-100",
            text: "text-blue-700",
            icon: <CheckCircle className="w-6 h-6" />
          },
          {
            label: "Sedang Proses",
            value: summary.sedangProses,
            bg: "bg-yellow-100",
            text: "text-yellow-700",
            icon: <AlertTriangle className="w-6 h-6" />
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className={`${item.bg} rounded-xl p-5 shadow hover:shadow-md transition flex items-center justify-between`}
          >
            <div>
              <p className="text-gray-600">{item.label}</p>
              <h2 className={`text-2xl font-bold ${item.text}`}>{item.value}</h2>
            </div>
            <div className={`p-3 rounded-full ${item.text.replace('text', 'bg').replace('-700', '-200')}`}>
              {item.icon}
            </div>
          </div>
        ))}
      </section>

      {/* Card Pendapatan Hari Ini */}
      <section className="mb-8">
        <div className="bg-indigo-100 rounded-xl p-5 shadow hover:shadow-md transition">
          <p className="text-gray-600">Pendapatan Hari Ini</p>
          <h2 className="text-2xl font-bold text-indigo-700">
            Rp {pendapatanHariIni.toLocaleString('id-ID')}
          </h2>
        </div>
      </section>

      {/* Tabel Pesanan Terbaru */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Daftar Pesanan
        </h2>
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
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {pesananTerbaru.map((row, idx) => {
                let statusColor = "";
                if (row.status === "Selesai") statusColor = "text-green-600";
                else if (row.status === "Diproses") statusColor = "text-yellow-600";
                else if (row.status === "Dibatalkan") statusColor = "text-red-600";
                
                return (
                  <tr key={row.id} className="border-t hover:bg-gray-50">
                    <td className="p-4">{idx + 1}</td>
                    <td className="p-4">{row.nama}</td>
                    <td className="p-4">{row.layanan?.nama || '-'}</td>
                    <td className="p-4">Rp {row.total_harga?.toLocaleString('id-ID') || '0'}</td>
                    <td className={`p-4 font-semibold ${statusColor}`}>
                      {row.status}
                    </td>
                    <td className="p-4">
                      {new Date(row.tanggal).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;