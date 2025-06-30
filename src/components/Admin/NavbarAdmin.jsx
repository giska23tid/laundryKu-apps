import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

const NavbarAdmin = () => {
  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg px-6 py-4 z-50 flex items-center justify-between">
      {/* Logo - putih dengan efek glow */}
      <div className="text-2xl font-bold text-white tracking-wide drop-shadow-lg">
        LaundryKu
      </div>

      {/* Navigation - semua text putih */}
      <div className="hidden md:flex gap-8 text-sm font-medium">
        {[
          { to: '/admin', label: 'Dashboard' },
          { to: '/admin/pesanan', label: 'Pesanan' },
          { to: '/admin/Ulasan', label: 'Ulasan' },
          { to: '/admin/layanan', label: 'Layanan' },
          { to: '/admin/riwayat-transaksi', label: 'RiwayatTransaksi' },
        ].map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `text-white hover:text-blue-200 transition ${
                isActive ? 'font-bold underline underline-offset-4' : ''
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>

      {/* Profile / Logout */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-white">
          <FaUser Circle className="text-xl" />
          <span>Admin</span>
        </div>
        <NavLink
          to="/logout"
          className="flex items-center gap-2 bg-white hover:bg-gray-100 text-blue-600 px-3 py-1.5 rounded-md text-sm transition font-medium shadow-sm"
        >
          <FaSignOutAlt className="text-sm" />
          Logout
        </NavLink>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
