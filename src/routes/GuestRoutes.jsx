import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/guest/Home";
import HalamanHarga from "../pages/guest/Harga";
import Services from "../pages/guest/Service";
import Gallery from "../pages/guest/Galery";
import Testimonials from "../pages/guest/Testimoni";
import Location from "../pages/guest/Location";
import Faq from "../pages/guest/Faq";
import Contact from "../pages/guest/Contact";

const GuestRoutes = () => {
  return (
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
  );
};

export default GuestRoutes;
