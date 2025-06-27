// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
// main.jsx
import './assets/tailwind.css';


import AdminLayout from "./layouts/AdminLayout";
import MainLayout from "./layouts/MainLayout";

import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import DataPesanan from "./pages/admin/DataPesanan";

import Home from "./pages/guest/Home";
import Services from "./pages/guest/Service";
import Gallery from "./pages/guest/Galery";
import Testimonials from "./pages/guest/Testimoni";
import Location from "./pages/guest/Location";
import Faq from "./pages/guest/Faq";
import Contact from "./pages/guest/Contact";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <Routes>
      {/* Route login admin TANPA layout */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin routes DENGAN layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="pesanan" element={<DataPesanan />} />
        {/* Tambah rute admin lain jika ada */}
      </Route>

      {/* Guest (pengunjung) routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="location" element={<Location />} />
        <Route path="faq" element={<Faq />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;
