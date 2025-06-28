import { Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import AdminLogin from "../pages/admin/AdminLogin";
import Dashboard from "../pages/admin/Dashboard";
import DataPesanan from "../pages/admin/DataPesanan";
import EditPesanan from "../pages/admin/EditPesanan"; // Import komponen EditPesanan
import DataLayanan from "../pages/admin/DataLayanan";
import DataUlasan from "../pages/admin/DataUlasan";
import RiwayatTransaksi from "../pages/admin/RiwayatTransaksi";

const adminRoutes = [
  <Route path="/admin/login" element={<AdminLogin />} key="admin-login" />,
  <Route path="/admin" element={<AdminLayout />} key="admin-layout">
    <Route index element={<Dashboard />} />
    <Route path="Pesanan" element={<DataPesanan />} />
    <Route path="Pesanan/edit/:id" element={<EditPesanan />} /> {/* Tambahkan route ini */}
    <Route path="Layanan" element={<DataLayanan />} />
    <Route path="Ulasan" element={<DataUlasan />} />
    <Route path="RiwayatTransaksi" element={<RiwayatTransaksi />} />
  </Route>,
];

export default adminRoutes;