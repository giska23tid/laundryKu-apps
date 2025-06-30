import React, { useEffect, useState } from "react";
import { 
  PackageCheck, 
  CheckCircle, 
  AlertTriangle, 
  DollarSign, 
  Calendar, 
  Bell, 
  TrendingUp, 
  Users, 
  Clock, 
  Award 
} from "lucide-react";
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

        // Parallel requests for better performance
        const [
          { count: totalPesanan },
          { count: pesananSelesai },
          { count: sedangProses },
          { data: pendapatanData },
          { data: pesananData }
        ] = await Promise.all([
          supabase.from('pesanan').select('*', { count: 'exact' }),
          supabase.from('pesanan').select('*', { count: 'exact' }).eq('status', 'Selesai'),
          supabase.from('pesanan').select('*', { count: 'exact' }).eq('status', 'Diproses'),
          supabase.from('pesanan')
            .select('total_harga')
            .gte('tanggal', new Date().toISOString().split('T')[0])
            .lte('tanggal', new Date().toISOString().split('T')[0])
            .eq('status', 'Selesai'),
          supabase.from('pesanan')
            .select(`id, nama, total_harga, status, tanggal, layanan:layanan_id (nama)`)
            .order('tanggal', { ascending: false })
            .limit(5)
        ]);

        const totalPendapatan = (pendapatanData || []).reduce(
          (sum, item) => sum + (item?.total_harga || 0), 0);

        setSummary({
          totalPesanan: totalPesanan || 0,
          pesananSelesai: pesananSelesai || 0,
          sedangProses: sedangProses || 0
        });
        setPendapatanHariIni(totalPendapatan);
        setPesananTerbaru(pesananData || []);

      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return (
    <div className="p-6 flex items-center justify-center min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
        <div className="text-xl text-blue-600 font-medium">Memuat dashboard...</div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="p-6 flex items-center justify-center min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50">
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
    <div className="flex-1 p-6 min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-blob animation-delay-4000"></div>
      </div>

      {/* Modern Header */}
      <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 bg-clip-text text-transparent mb-3">
              Dashboard Admin
            </h1>
            <div className="flex items-center text-gray-600 bg-gray-50 rounded-full px-4 py-2 w-fit">
              <Calendar className="w-5 h-5 mr-2" />
              <span className="font-medium">{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full shadow-lg">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">3</span>
            </div>
            <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-3 rounded-full shadow-lg">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Total Pesanan",
            value: summary.totalPesanan,
            gradient: "from-blue-500 to-blue-600",
            icon: <PackageCheck className="w-8 h-8" />,
            bgPattern: "bg-blue-50"
          },
          {
            label: "Pesanan Selesai",
            value: summary.pesananSelesai,
            gradient: "from-blue-600 to-blue-700",
            icon: <CheckCircle className="w-8 h-8" />,
            bgPattern: "bg-blue-50"
          },
          {
            label: "Sedang Proses",
            value: summary.sedangProses,
            gradient: "from-indigo-500 to-indigo-600",
            icon: <Clock className="w-8 h-8" />,
            bgPattern: "bg-indigo-50"
          },
          {
            label: "Pelanggan Aktif",
            value: "47",
            gradient: "from-blue-400 to-indigo-500",
            icon: <Users className="w-8 h-8" />,
            bgPattern: "bg-blue-50"
          }
        ].map((item, idx) => (
          <div
            key={idx}
            className={`relative ${item.bgPattern} rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20 backdrop-blur-sm overflow-hidden group`}
          >
            {/* Animated background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
            
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">{item.label}</p>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{item.value}</h2>
              </div>
              <div className={`bg-gradient-to-br ${item.gradient} p-4 rounded-2xl text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Enhanced Revenue Card */}
      <section className="mb-8">
        <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-3xl p-8 shadow-2xl text-white overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 animate-shimmer"></div>
          </div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-blue-100 mb-2 font-medium">Pendapatan Hari Ini</p>
              <h2 className="text-4xl font-bold mb-3">
                Rp {pendapatanHariIni.toLocaleString('id-ID')}
              </h2>
              <div className="text-blue-200 text-sm">Update terakhir: {new Date().toLocaleTimeString('id-ID')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Table */}
      <section className="mb-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <PackageCheck className="w-6 h-6 mr-3 text-blue-600" />
              Pesanan Terbaru
            </h2>
          </div>
          
          <div className="overflow-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <tr>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">No</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">Pelanggan</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">Layanan</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">Total</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">Tanggal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pesananTerbaru.map((row, idx) => {
                  let statusConfig = {};
                  if (row.status === "Selesai") {
                    statusConfig = { bg: "bg-blue-100", text: "text-blue-800", dot: "bg-blue-500" };
                  } else if (row.status === "Diproses") {
                    statusConfig = { bg: "bg-indigo-100", text: "text-indigo-800", dot: "bg-indigo-500" };
                  } else if (row.status === "Dibatalkan") {
                    statusConfig = { bg: "bg-gray-100", text: "text-gray-800", dot: "bg-gray-500" };
                  }
                  
                  return (
                    <tr key={row.id} className="hover:bg-blue-50/50 transition-colors duration-200 group">
                      <td className="p-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {idx + 1}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                          {row.nama}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                          {row.layanan?.nama || '-'}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-gray-800">
                          Rp {row.total_harga?.toLocaleString('id-ID') || '0'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 ${statusConfig.dot} rounded-full mr-2 animate-pulse`}></div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.text}`}>
                            {row.status}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600">
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
        </div>
      </section>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;