// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ penting!
import App from './App';
import './assets/tailwind.css'; // ✅ import tailwind

import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import AOS from "aos";
AOS.init();

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ Tambahkan ini */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
