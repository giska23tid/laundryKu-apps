// src/layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import React from "react";

const MainLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <ScrollToTop />
    <Footer />
  </>
);

export default MainLayout;
