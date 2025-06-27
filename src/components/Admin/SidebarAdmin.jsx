import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaClipboardList,
  FaUsers,
  FaConciergeBell,
  FaMoneyBillWave,
  FaUserCog,
  FaSignOutAlt,
} from 'react-icons/fa';

const SidebarAdmin = () => {
  return (
    <aside className="fixed top-16 left-0 w-64 h-full bg-white border-r border-gray-200 shadow-sm p-6 hidden md:block">
      <nav className="space-y-4">
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md font-medium hover:bg-green-100 ${
              isActive ? 'bg-green-100 text-green-700' : 'text-gray-700'
            }`
          }
        >
          <FaTachometerAlt /> Dashboard
        </NavLink>

        <NavLink
          to="/admin/pesanan"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md font-medium hover:bg-green-100 ${
              isActive ? 'bg-green-100 text-green-700' : 'text-gray-700'
            }`
          }
        >
          <FaClipboardList /> Pesanan
        </NavLink>

        <NavLink
          to="/admin/pelanggan"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md font-medium hover:bg-green-100 ${
              isActive ? 'bg-green-100 text-green-700' : 'text-gray-700'
            }`
          }
        >
          <FaUsers /> Pelanggan
        </NavLink>

        <NavLink
          to="/admin/layanan"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md font-medium hover:bg-green-100 ${
              isActive ? 'bg-green-100 text-green-700' : 'text-gray-700'
            }`
          }
        >
          <FaConciergeBell /> Layanan
        </NavLink>

        <NavLink
          to="/admin/transaksi"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md font-medium hover:bg-green-100 ${
              isActive ? 'bg-green-100 text-green-700' : 'text-gray-700'
            }`
          }
        >
          <FaMoneyBillWave /> Transaksi
        </NavLink>

        <NavLink
          to="/admin/akun"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md font-medium hover:bg-green-100 ${
              isActive ? 'bg-green-100 text-green-700' : 'text-gray-700'
            }`
          }
        >
          <FaUserCog /> Akun
        </NavLink>

        <NavLink
          to="/admin/logout"
          className="flex items-center gap-3 px-3 py-2 rounded-md font-medium text-red-600 hover:bg-red-100"
        >
          <FaSignOutAlt /> Logout
        </NavLink>
      </nav>
    </aside>
  );
};

export default SidebarAdmin;
