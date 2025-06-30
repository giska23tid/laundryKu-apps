import { useState, useEffect } from "react";
import React from "react";

// import { initTooltip } from "../functions/Tooltip";

const Footer = () => {
  useEffect(() => {
    // initTooltip();
  }, []);

  const [hoveredPlatform, setHoveredPlatform] = useState(null);

  const socialLinks = [
    { platform: "facebook-circle", title: "Follow us on Facebook" },
    { platform: "instagram", title: "Follow us on Instagram" },
    { platform: "twitter", title: "Follow us on Twitter" },
    { platform: "linkedin", title: "Connect on LinkedIn" },
  ];

  const quickLinks = [
    { icon: "home-alt", text: "Beranda", href: "#" },
    { icon: "briefcase-alt-2", text: "Layanan", href: "#" },
    { icon: "chat", text: "Kontak", href: "#" },
  ];

  const features = [
    { icon: "home-alt", text: "Beranda", href: "#" },
    { icon: "archive", text: "Layanan", href: "#" },
    { icon: "support", text: "Bantuan", href: "#" },
  ];

  const supportLinks = [
    { icon: "help-circle", text: "Help Center" },
    { icon: "envelope", text: "Contact Us" },
    { icon: "check-shield", text: "Terms of Service" },
  ];

  const today = new Date();
  const tanggalLengkap = today.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const renderLinks = (links, withAnchor = true) => {
    return links.map(({ icon, text, href }, index) => (
      <li key={index} className="mb-3">
        {withAnchor ? (
          <a href={href} className="text-decoration-none text-light">
            <i className={`bx bx-${icon} me-2`}></i>
            {text}
          </a>
        ) : (
          <>
            <i className={`bx bx-${icon} me-2`}></i>
            {text}
          </>
        )}
      </li>
    ));
  };

  return (
    <>
      <footer
        className="overflow-hidden shadow"
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          color: "#e0e0e0",
          borderTop: "3px solid #0f3460",
        }}
      >
        <div className="container py-5">
          <div className="row g-4">
            <div className="col-lg-6 col-md-12 mb-4">
              <div className="d-flex align-items-center mb-4">
                <i className="bx bx-crown fs-1 me-1"></i>
                <h4 className="mb-0 fw-bold text-white">LaundryKu</h4>
              </div>
              <p className="mb-4 text-light" style={{ lineHeight: "1.6" }}>
                Tingkatkan kenyamanan hidup Anda dengan layanan Laundry Kilat kami.
                Cuci cepat, antar-jemput gratis, dan hasil wangi bersih seperti baru—semua
                dalam genggaman Anda.
              </p>
              <div className="d-flex gap-3">
                {socialLinks.map(({ platform, title }) => (
                  <a
                    key={platform}
                    href="#"
                    className={`rounded-circle p-2 d-flex align-items-center justify-content-center text-decoration-none ${hoveredPlatform === platform
                        ? "bg-primary text-white shadow-lg"
                        : "bg-white text-dark shadow"
                      }`}
                    data-bs-toggle="tooltip"
                    title={title}
                    onMouseEnter={() => setHoveredPlatform(platform)}
                    onMouseLeave={() => setHoveredPlatform(null)}
                  >
                    <i className={`bx bxl-${platform}`}></i>
                  </a>
                ))}
              </div>
            </div>

            <div className="col-lg-2 col-md-4 mb-4 text-md-start text-center">
              <h5
                className="mb-4 fw-bold"
                style={{ color: "#ffffff", borderBottom: "2px solid #00a8ff", paddingBottom: "8px" }}
              >
                <i className="bx bx-link me-2" style={{ color: "#00a8ff" }}></i>Quick Links
              </h5>
              <ul className="list-unstyled">{renderLinks(quickLinks)}</ul>
            </div>

            <div className="col-lg-2 col-md-4 mb-4 text-md-start text-center">
              <h5
                className="mb-4 fw-bold text-white"
                style={{ borderBottom: "2px solid #00a8ff", paddingBottom: "8px" }}
              >
                <i className="bx bx-star me-2" style={{ color: "#00a8ff" }}></i>Features
              </h5>
              <ul className="list-unstyled">{renderLinks(features)}</ul>
            </div>

            <div className="col-lg-2 col-md-4 mb-4 text-md-start text-center">
              <h5
                className="mb-4 fw-bold text-white"
                style={{ borderBottom: "2px solid #00a8ff", paddingBottom: "8px" }}
              >
                <i className="bx bx-support me-2" style={{ color: "#00a8ff" }}></i>Support
              </h5>
              <ul className="list-unstyled">{renderLinks(supportLinks, false)}</ul>
            </div>
          </div>
        </div>

        <div className="border-top" style={{ borderColor: "#00a8ff !important" }}>
          <div className="container py-4">
            <div className="row align-items-center">
              <div className="col-md-6 text-md-start text-center">
                <p className="mb-0 small">
                  LaundryKu © {new Date().getFullYear()}. All rights reserved.<br />
                </p>
              </div>
              <div className="col-md-6 text-center text-md-end">
                <i className="bx bx-time me-1"></i>
                {tanggalLengkap}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
