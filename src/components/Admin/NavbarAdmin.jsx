import React from 'react';

const NavbarAdmin = () => {
  return (
    <nav className="bg-white shadow-md border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="text-xl font-bold text-green-600 tracking-wide">
        Laundry<span className="text-gray-700">Admin</span>
      </div>

      {/* Navigation */}
      <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-600">
        <a href="/admin" className="hover:text-green-600">Dashboard</a>
        <a href="/admin/pesanan" className="hover:text-green-600">Pesanan</a>
        <a href="/admin/pelanggan" className="hover:text-green-600">Pelanggan</a>
        <a href="/admin/layanan" className="hover:text-green-600">Layanan</a>
        <a href="/admin/transaksi" className="hover:text-green-600">Transaksi</a>
      </div>

      {/* Profile / Logout */}
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-700">Admin</span>
        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
