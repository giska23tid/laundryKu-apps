import { Outlet, useLocation } from "react-router-dom";
import NavbarAdmin from "../components/Admin/NavbarAdmin";
import SidebarAdmin from "../components/Admin/SidebarAdmin";
import React from "react";

export default function AdminLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/admin/login";

  if (isLoginPage) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Outlet />
      </main>
    );
  }

  return (
    <div className="font-poppins bg-gray-50 text-gray-800">
      {/* Navbar (sticky top) */}
      <NavbarAdmin />

      <div className="flex pt-16">
        {/* Sidebar (fixed) */}
        <SidebarAdmin />

        {/* Main Content */}
        <main className="ml-64 w-full p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
