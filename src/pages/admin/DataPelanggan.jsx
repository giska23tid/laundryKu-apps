import React from 'react';

const DataPelanggan = () => {
  const pelanggan = [
    {
      id: 1,
      nama: 'Rina',
      email: 'rina@example.com',
      telepon: '081234567890',
      alamat: 'Jl. Merdeka No. 1, Jakarta',
    },
    {
      id: 2,
      nama: 'Bayu',
      email: 'bayu@example.com',
      telepon: '082112345678',
      alamat: 'Jl. Mawar No. 12, Bandung',
    },
    {
      id: 3,
      nama: 'Sari',
      email: 'sari@example.com',
      telepon: '085612345678',
      alamat: 'Jl. Melati No. 9, Surabaya',
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Data Pelanggan</h1>
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Nama</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Telepon</th>
              <th className="px-4 py-2 text-left">Alamat</th>
              <th className="px-4 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pelanggan.map((item, index) => (
              <tr key={item.id} className="border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{item.nama}</td>
                <td className="px-4 py-2">{item.email}</td>
                <td className="px-4 py-2">{item.telepon}</td>
                <td className="px-4 py-2">{item.alamat}</td>
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

export default DataPelanggan;