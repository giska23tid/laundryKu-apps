import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./assets/tailwind.css";
import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { Routes, Route } from "react-router-dom";
import adminRoutes from "./routes/AdminRoutes";
import guestRoutes from "./routes/GuestRoutes";

// ✅ Import komponen logout langsung
import Logout from "./pages/admin/Logout"; // Pastikan path benar

function App() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <Routes>
      {/* ✅ Tambahkan route global logout */}
      <Route path="/logout" element={<Logout />} />

      {adminRoutes}
      {guestRoutes}
    </Routes>
  );
}

export default App;
