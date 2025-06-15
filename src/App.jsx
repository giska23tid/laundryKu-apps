import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/tailwind.css";

import AOS from "aos";
import "aos/dist/aos.css";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import HalamanHarga from "./pages/Harga";
import Hero from "./components/Hero";
import Services from "./pages/Service";
import Gallery from "./pages/Galery";
import Testimonials from "./pages/Testimoni";
import Location from "./pages/Location";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="harga" element={<HalamanHarga />} />
          <Route path="services" element={<Services />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="location" element={<Location />} />
          <Route path="faq" element={<Faq />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
