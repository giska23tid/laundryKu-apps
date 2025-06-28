import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./assets/tailwind.css";
import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Routes } from "react-router-dom";
import adminRoutes from "./routes/AdminRoutes";
import guestRoutes from "./routes/GuestRoutes";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <Routes>
      {adminRoutes}
      {guestRoutes}
    </Routes>
  );
}

export default App;
