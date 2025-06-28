import { Route } from "react-router-dom"; 
import React from "react";
import AdminLayout from "../layouts/AdminLayout";
import AdminLogin from "../pages/admin/AdminLogin";
import Dashboard from "../pages/admin/Dashboard";
import DataPesanan from "../pages/admin/DataPesanan";
import DataLayanan from "../pages/admin/DataLayanan";
import DataUlasan from "../pages/admin/DataUlasan";
import RiwayatTransaksi from "../pages/admin/RiwayatTransaksi"; 
import Logout from "../pages/admin/Logout";

const adminRoutes = [
  <Route path="/admin/login" element={<AdminLogin />} key="admin-login" />,
  <Route path="/admin" element={<AdminLayout />} key="admin-layout">
    <Route index element={<Dashboard />} />
    <Route path="Pesanan" element={<DataPesanan />} />
    <Route path="Layanan" element={<DataLayanan />} />
    <Route path="Ulasan" element={<DataUlasan />} />
    <Route path="RiwayatTransaksi" element={<RiwayatTransaksi />} />
    <Route path="logout" element={<Logout />} /> {/* ✅ Sudah benar */}
    {/* Tambah lainnya */}
  </Route>,
];

export default adminRoutes;
