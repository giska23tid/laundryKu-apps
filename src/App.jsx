import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

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
