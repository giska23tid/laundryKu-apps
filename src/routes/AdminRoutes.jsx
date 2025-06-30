// src/routes/adminRoutes.jsx
import { Route, Navigate } from "react-router-dom";
import React from "react";
import AdminLayout from "../layouts/AdminLayout";
import AdminLogin from "../pages/admin/AdminLogin";
import Dashboard from "../pages/admin/Dashboard";
import DataPesanan from "../pages/admin/DataPesanan";
import DataLayanan from "../pages/admin/DataLayanan";
import DataUlasan from "../pages/admin/DataUlasan";
import RiwayatTransaksi from "../pages/admin/RiwayatTransaksi";
import EditPesanan from "../pages/admin/EditPesanan";
import EditLayanan from "../pages/admin/EditLayanan";
import TambahLayanan from "../pages/admin/TambahLayanan";

const adminRoutes = [
  <Route path="/admin/login" element={<AdminLogin />} key="admin-login" />,
  <Route 
    path="/admin" 
    element={<AdminLayout />} 
    key="admin-layout"
  >
    <Route index element={<Dashboard />} />
    <Route path="pesanan" element={<DataPesanan />} />
    <Route path="layanan" element={<DataLayanan />} />
    <Route path="layanan/edit/:id" element={<EditLayanan />} />
    <Route path="layanan/tambah" element={<TambahLayanan />} />
    <Route path="ulasan" element={<DataUlasan />} />
    <Route path="riwayat-transaksi" element={<RiwayatTransaksi />} />
    <Route path="pesanan/edit/:id" element={<EditPesanan />} />
  </Route>,
  // Redirect untuk path yang tidak ada
  <Route path="*" element={<Navigate to="/admin/login" replace />} key="admin-notfound" />,
];

export default adminRoutes;