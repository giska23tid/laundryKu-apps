import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const NavbarAdmin = () => {
  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-white shadow-md border-b border-gray-200 px-6 py-4 z-50 flex items-center justify-between">      {/* Logo */}
      <div className="text-2xl font-bold text-blue-600 tracking-wide">
        Laundry<span className="text-gray-800">Admin</span>
      </div>

      {/* Navigation */}
      <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
        {[
          { to: '/admin', label: 'Dashboard' },
          { to: '/admin/pesanan', label: 'Pesanan' },
          { to: '/admin/Ulasan', label: 'Ulasan' },
          { to: '/admin/layanan', label: 'Layanan' },
          { to: '/admin/transaksi', label: 'Transaksi' },
        ].map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `hover:text-blue-600 transition ${isActive ? 'text-blue-700 font-semibold' : ''
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>

      {/* Profile / Logout */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <FaUserCircle className="text-xl text-blue-500" />
          <span>Admin</span>
        </div>
        <NavLink
          to="/logout"
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-sm transition"
        >
          <FaSignOutAlt className="text-sm" />
          Logout
        </NavLink>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
