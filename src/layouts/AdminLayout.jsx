// src/layouts/AdminLayout.jsx
import { Outlet, useLocation } from "react-router-dom";
import NavbarAdmin from "../components/Admin/NavbarAdmin";
import SidebarAdmin from "../components/Admin/SidebarAdmin";

export default function AdminLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/admin/login";

  if (isLoginPage) return <Outlet />; // Jangan render layout saat di login

  return (
    <div className="font-poppins bg-gray-50 text-gray-800 min-h-screen">
      <NavbarAdmin />
      <div className="flex">
        <SidebarAdmin />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
