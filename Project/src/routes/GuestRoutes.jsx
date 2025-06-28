import { Route } from "react-router-dom";
import React from "react";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/guest/Home";
import Services from "../pages/guest/Service";
import Gallery from "../pages/guest/Galery";
import Testimonials from "../pages/guest/Testimoni";
import Location from "../pages/guest/Location";
import Faq from "../pages/guest/Faq";
import Contact from "../pages/guest/Contact";

const guestRoutes = [
  <Route path="/" element={<MainLayout />} key="main-layout">
    <Route index element={<Home />} />
    <Route path="services" element={<Services />} />
    <Route path="gallery" element={<Gallery />} />
    <Route path="testimonials" element={<Testimonials />} />
    <Route path="location" element={<Location />} />
    <Route path="faq" element={<Faq />} />
    <Route path="contact" element={<Contact />} />
  </Route>,
];

export default guestRoutes;
