import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./assets/tailwind.css";
import AOS from "aos";
import "aos/dist/aos.css";

import GuestRoutes from "./routes/GuestRoutes";
import AdminRoutes from "./routes/AdminRoutes";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <Router>
      <GuestRoutes />
      <AdminRoutes />
    </Router>
  );
}

export default App;
