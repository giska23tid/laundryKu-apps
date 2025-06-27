import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 shadow">
        <h2 className="text-2xl font-extrabold text-green-600 mb-8">Laundry Kilat</h2>
        <nav className="space-y-4 font-medium text-gray-700">
          <a href="#" className="hover:text-green-600">Dashboard</a>
          <a href="/admin/pesanan" className="hover:text-green-600">Data Pesanan</a>
          <a href="/admin/pelanggan" className="hover:text-green-600">Data Pelanggan</a>
          <a href="#" className="hover:text-green-600">Layanan</a>
          <a href="#" className="hover:text-green-600">Riwayat Transaksi</a>
          <a href="#" className="hover:text-green-600">Kelola Akun</a>
          <a href="#" className="text-red-600 hover:underline">Logout</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-gray-50">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-10">Dashboard Admin</h1>

        {/* Ringkasan Hari Ini */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="p-5 bg-green-100 rounded-xl shadow">
            <p className="text-gray-600">Total Pesanan</p>
            <h2 className="text-3xl font-bold text-green-700">120</h2>
          </div>
          <div className="p-5 bg-yellow-100 rounded-xl shadow">
            <p className="text-gray-600">Pesanan Selesai</p>
            <h2 className="text-3xl font-bold text-yellow-700">98</h2>
          </div>
          <div className="p-5 bg-blue-100 rounded-xl shadow">
            <p className="text-gray-600">Sedang Proses</p>
            <h2 className="text-3xl font-bold text-blue-700">22</h2>
          </div>
          <div className="p-5 bg-indigo-100 rounded-xl shadow">
            <p className="text-gray-600">Pendapatan Hari Ini</p>
            <h2 className="text-3xl font-bold text-indigo-700">Rp 450.000</h2>
          </div>
        </section>

        {/* Tabel Terbaru */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pesanan Terbaru</h2>
          <div className="overflow-auto rounded-xl bg-white shadow">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-4">No</th>
                  <th className="p-4">Nama</th>
                  <th className="p-4">Layanan</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-4">1</td>
                  <td className="p-4">Rina</td>
                  <td className="p-4">Cuci + Setrika</td>
                  <td className="p-4 text-green-600 font-semibold">Selesai</td>
                  <td className="p-4">26 Jun 2025</td>
                </tr>
                <tr className="border-t">
                  <td className="p-4">2</td>
                  <td className="p-4">Bayu</td>
                  <td className="p-4">Express</td>
                  <td className="p-4 text-yellow-600 font-semibold">Diproses</td>
                  <td className="p-4">26 Jun 2025</td>
                </tr>
                <tr className="border-t">
                  <td className="p-4">3</td>
                  <td className="p-4">Sari</td>
                  <td className="p-4">Dry Clean</td>
                  <td className="p-4 text-red-600 font-semibold">Dibatalkan</td>
                  <td className="p-4">25 Jun 2025</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Notifikasi */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Notifikasi</h2>
          <ul className="bg-white rounded-xl shadow p-4 space-y-3">
            <li className="text-gray-700">📦 Pesanan baru dari Andi telah masuk.</li>
            <li className="text-gray-700">✅ Pesanan Rina telah diselesaikan.</li>
            <li className="text-gray-700">⚠️ Pesanan Sari dibatalkan oleh pelanggan.</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;