import React from "react";
import { UserCircle2 } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 shadow-lg backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* Logo & Brand */}
        <div className="text-2xl font-bold text-white tracking-wide drop-shadow-lg no-underline">
          LaundryKu
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex gap-2 lg:gap-4 items-center">
          <li><a href="/" style={{ textDecoration: 'none' }} className="px-4 py-2 rounded-full font-small text-white hover:bg-white/20 hover:text-white transition no-underline">Home</a></li>
          <li><a href="/services" style={{ textDecoration: 'none' }} className="px-4 py-2 rounded-full font-small text-white hover:bg-white/20 hover:text-white transition no-underline">Layanan</a></li>
          <li><a href="/gallery" style={{ textDecoration: 'none' }} className="px-4 py-2 rounded-full font-small text-white hover:bg-white/20 hover:text-white transition no-underline">Galeri</a></li>
          <li><a href="/testimonials" style={{ textDecoration: 'none' }} className="px-4 py-2 rounded-full font-small text-white hover:bg-white/20 hover:text-white transition no-underline">Testimoni</a></li>
          <li><a href="/location" style={{ textDecoration: 'none' }} className="px-4 py-2 rounded-full font-small text-white hover:bg-white/20 hover:text-white transition no-underline">Lokasi</a></li>
          <li><a href="/faq" style={{ textDecoration: 'none' }} className="px-4 py-2 rounded-full font-small text-white hover:bg-white/20 hover:text-white transition no-underline">FAQ</a></li>
          <li><a href="/contact" style={{ textDecoration: 'none' }} className="px-4 py-2 rounded-full font-small text-white hover:bg-white/20 hover:text-white transition no-underline">Hubungi Kami</a></li>
        </ul>

        {/* Login Button */}
        <a href="/admin/login" style={{ textDecoration: 'none' }} className="flex items-center gap-2 bg-white/90 hover:bg-white text-blue-700 font-semibold px-5 py-2 rounded-full shadow transition ml-4 no-underline">
          <UserCircle2 className="w-5 h-5" />
          Login Admin
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
