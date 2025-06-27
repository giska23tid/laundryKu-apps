import React from 'react';

const DataPesanan = () => {
  const pesanan = [
    {
      id: 1,
      nama: 'Rina',
      layanan: 'Cuci + Setrika',
      status: 'Selesai',
      tanggal: '2025-06-26',
    },
    {
      id: 2,
      nama: 'Bayu',
      layanan: 'Express',
      status: 'Diproses',
      tanggal: '2025-06-26',
    },
    {
      id: 3,
      nama: 'Sari',
      layanan: 'Dry Clean',
      status: 'Dibatalkan',
      tanggal: '2025-06-25',
    },
  ];

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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Data Pesanan</h1>
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Nama</th>
              <th className="px-4 py-2 text-left">Layanan</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Tanggal</th>
              <th className="px-4 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pesanan.map((item, index) => (
              <tr key={item.id} className="border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{item.nama}</td>
                <td className="px-4 py-2">{item.layanan}</td>
                <td className={`px-4 py-2 font-semibold ${getStatusClass(item.status)}`}>{item.status}</td>
                <td className="px-4 py-2">{item.tanggal}</td>
                <td className="px-4 py-2">
                  <button className="text-blue-600 hover:underline mr-2">Edit</button>
                  <button className="text-red-600 hover:underline">Hapus</button>
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