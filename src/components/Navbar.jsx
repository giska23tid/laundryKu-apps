import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm py-3">
  <div className="container">
    <a className="navbar-brand fw-bold d-flex align-items-center" href="#">
      LaundryKu
    </a>

    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    {/* UBAH DI SINI: hilangkan collapse untuk testing */}
    <div className="navbar-collapse show" id="navbarNav">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <a className="nav-link" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/services">Layanan</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/gallery">Galeri</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/testimonials">Testimoni</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/location">Lokasi</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/faq">FAQ</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/contact">Hubungi Kami</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/admin/login">Login Admin</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  );
};

export default Navbar;
