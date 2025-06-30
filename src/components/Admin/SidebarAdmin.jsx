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
    <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] overflow-y-auto bg-white border-r border-gray-200 shadow-sm p-6 hidden md:block z-40">

      <nav className="space-y-1 text-sm font-medium">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200 ${isActive
              ? "bg-blue-100 text-blue-700 border-l-4 border-blue-500 font-semibold"
              : "text-gray-700 hover:bg-gray-50"
            }`
          }
        >
          <FaTachometerAlt className="w-4 h-4" />
          Dashboard
        </NavLink>

        {[
          { to: "/admin/pesanan", icon: FaClipboardList, label: "Pesanan" },
          { to: "/admin/ulasan", icon: FaUsers, label: "Ulasan" },
          { to: "/admin/layanan", icon: FaConciergeBell, label: "Layanan" },
          { to: "/admin/riwayat-transaksi", icon: FaUserCog, label: "RiwayatTransaksi" },
        ].map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200 ${isActive
                ? "bg-blue-100 text-blue-700 border-l-4 border-blue-500 font-semibold"
                : "text-gray-700 hover:bg-gray-50"
              }`
            }
          >
            <Icon className="w-4 h-4" />
            {label}
          </NavLink>
        ))}

      </nav>
    </aside>
  );
};

export default SidebarAdmin;
