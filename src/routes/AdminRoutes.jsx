import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminLogin from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import DataPesanan from "../pages/admin/DataPesanan";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/Login" element={<AdminLogin />} />
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/admin/pesanan" element={<DataPesanan />} />
    </Routes>
  );
};

export default AdminRoutes;
