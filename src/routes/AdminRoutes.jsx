import { Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import AdminLogin from "../pages/admin/AdminLogin";
import Dashboard from "../pages/admin/Dashboard";
import DataPesanan from "../pages/admin/DataPesanan";

const adminRoutes = [
  <Route path="/admin/login" element={<AdminLogin />} key="admin-login" />,
  <Route path="/admin" element={<AdminLayout />} key="admin-layout">
    <Route index element={<Dashboard />} />
    <Route path="pesanan" element={<DataPesanan />} />
    {/* Tambah lainnya */}
  </Route>,
];

export default adminRoutes;
