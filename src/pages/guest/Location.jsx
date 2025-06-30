import { useState, useEffect } from 'react';
// import { initTooltip } from '../functions/Tooltip';

const Location = () => {
  const [activeLocation, setActiveLocation] = useState(0);

  // Multiple locations data
  const locations = [
    {
      id: 1,
      name: "LaundryKu Medan Center",
      address: "Jl. Sisingamangaraja No. 123, Medan",
      area: "Medan Center",
      phone: "(061) 8888-9999",
      hours: "06:00 - 22:00",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.0288863200934!2d98.6569!3d3.5945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30312f8b2c9d1b0b%3A0x6c8e8b5b6b7b8b9b!2sMedan%20Center!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid",
      features: ["Antar Jemput", "Express 3 Jam", "Cuci Sepatu", "Dry Clean"],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      rating: 4.9,
      reviews: 234,
      isMain: true
    },
    {
      id: 2,
      name: "Laundry Kilat Medan Timur",
      address: "Jl. Jamin Ginting No. 456, Medan",
      area: "Medan Timur",
      phone: "(061) 7777-8888",
      hours: "07:00 - 21:00",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.0588863200934!2d98.7269!3d3.6145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30312f8b2c9d1b0b%3A0x6c8e8b5b6b7b8b9c!2sMedan%20Timur!5e0!3m2!1sen!2sid!4v1700000000001!5m2!1sen!2sid",
      features: ["Antar Jemput", "Cuci Setrika", "Cuci Sepatu"],
      image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 156,
      isMain: false
    },
    {
      id: 3,
      name: "Laundry Kilat Medan Baru",
      address: "Jl. Gatot Subroto No. 789, Medan",
      area: "Medan Baru",
      phone: "(061) 6666-7777",
      hours: "08:00 - 20:00",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.0788863200934!2d98.6469!3d3.5745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30312f8b2c9d1b0b%3A0x6c8e8b5b6b7b8b9d!2sMedan%20Baru!5e0!3m2!1sen!2sid!4v1700000000002!5m2!1sen!2sid",
      features: ["Express 3 Jam", "Dry Clean", "Cuci Karpet"],
      image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 98,
      isMain: false
    }
  ];

  const actionButtons = [
    {
      label: 'Hubungi Sekarang',
      icon: 'bx-phone',
      className: 'btn-primary',
      tooltip: 'Telepon kami sekarang',
    },
    {
      label: 'Petunjuk Arah',
      icon: 'bx-directions',
      className: 'btn-outline-primary',
      tooltip: 'Lihat lokasi di Google Maps',
    },
    {
      label: 'Order Pickup',
      icon: 'bx-car',
      className: 'btn-outline-success',
      tooltip: 'Jemput laundry ke rumahmu',
    },
  ];


  useEffect(() => {
    // initTooltip();
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`bx ${i < Math.floor(rating) ? 'bxs-star' : 'bx-star'} text-warning`}
      ></i>
    ));
  };

  const currentLocation = locations[activeLocation];

  return (
    <div className="pt-20">
      <section className="py-5 bg-light overflow-hidden" id="location">
        <div className="container">
          {/* Header Section */}
          <div className="row mb-5">
            <div className="col-12 text-center" data-aos="fade-up" data-aos-duration="1000">
              <span className="badge bg-primary mb-3 shadow rounded-pill px-4 py-2 fs-6">
                <i className="bx bx-map me-2"></i>
                Lokasi Kami
              </span>
              <h2 className="display-5 fw-bold mb-4 text-primary">
                Temukan Cabang Laundry Kilat Terdekat
              </h2>
              <p className="lead text-muted mb-4 col-lg-8 mx-auto">
                Tersebar di berbagai lokasi strategis di Medan, Laundry Kilat hadir
                untuk memberikan layanan terbaik dengan jangkauan yang luas dan mudah dijangkau.
              </p>
            </div>
          </div>

          {/* Location Tabs */}
          <div className="row mb-4" data-aos="fade-up" data-aos-delay="200">
            <div className="col-12">
              <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
                {locations.map((location, index) => (
                  <button
                    key={location.id}
                    className={`btn ${activeLocation === index ? 'btn-primary' : 'btn-outline-primary'} 
                                              shadow d-flex align-items-center gap-2 position-relative`}
                    onClick={() => setActiveLocation(index)}
                    style={{ transition: 'all 0.3s ease' }}
                  >
                    <i className="bx bx-store"></i>
                    {location.area}
                    {location.isMain && (
                      <span className="badge bg-warning text-dark ms-1">
                        <i className="bx bx-crown"></i>
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Location Content */}
          <div className="row align-items-center g-4 mb-5" data-aos="fade-up" data-aos-delay="400">
            {/* Map Section */}
            <div className="col-lg-6">
              <div className="position-relative">
                <div className="card shadow border-0 rounded-4 overflow-hidden">
                  <iframe
                    title={`${currentLocation.name} Location`}
                    src={currentLocation.mapUrl}
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>

                  {/* Overlay Info Card */}
                  <div className="position-absolute top-0 end-0" style={{ marginTop: '50px', marginLeft: '0.7rem' }}>
                    <div className="card border-0 shadow" style={{ width: 'max-content' }}>
                      <div className="card-body p-3">
                        <div className="d-flex align-items-center mb-2">
                          <img
                            src={currentLocation.image}
                            alt={currentLocation.name}
                            className="rounded me-2"
                            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                          />
                          <div>
                            <h6 className="mb-0 fw-bold text-truncate">{currentLocation.name}</h6>
                            <div className="d-flex align-items-center">
                              {renderStars(currentLocation.rating)}
                              <small className="text-muted ms-1">
                                {currentLocation.rating} ({currentLocation.reviews})
                              </small>
                            </div>
                          </div>
                        </div>
                        <p className="small text-muted mb-0">
                          <i className="bx bx-map me-1"></i>
                          {currentLocation.address}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Live Status Badge */}
                  <div className="position-absolute top-0 end-0 m-3">
                    <span className="badge bg-success shadow d-flex align-items-center gap-1">
                      <span className="spinner-grow spinner-grow-sm" role="status" style={{ width: '8px', height: '8px' }}></span>
                      Buka Sekarang
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div className="col-lg-6">
              <div className="ps-lg-4">
                <div className="d-flex align-items-center mb-3">
                  <span className="badge bg-primary shadow rounded-pill px-3 py-2 fs-6 me-3">
                    <i className="bx bx-crown me-1"></i>
                    {currentLocation.isMain ? 'Cabang Utama' : 'Cabang'}
                  </span>
                  <div className="d-flex align-items-center">
                    {renderStars(currentLocation.rating)}
                    <span className="ms-2 fw-bold text-warning">{currentLocation.rating}</span>
                    <small className="text-muted ms-1">({currentLocation.reviews} reviews)</small>
                  </div>
                </div>

                <h2 className="display-6 fw-bold mb-3 text-primary">
                  {currentLocation.name}
                </h2>

                <div className="row g-3 mb-4">
                  <div className="col-12">
                    <div className="d-flex align-items-center text-muted">
                      <i className="bx bx-map fs-5 me-3 text-primary"></i>
                      <div>
                        <strong className="text-dark">Alamat:</strong><br />
                        {currentLocation.address}
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center text-muted">
                      <i className="bx bx-phone fs-5 me-3 text-success"></i>
                      <div>
                        <strong className="text-dark">Telepon:</strong><br />
                        <a href={`tel:${currentLocation.phone}`} className="text-decoration-none">
                          {currentLocation.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center text-muted">
                      <i className="bx bx-time fs-5 me-3 text-info"></i>
                      <div>
                        <strong className="text-dark">Jam Buka:</strong><br />
                        {currentLocation.hours}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services Available */}
                <div className="mb-4">
                  <h5 className="fw-bold mb-3">
                    <i className="bx bx-check-shield text-primary me-2"></i>
                    Layanan Tersedia
                  </h5>
                  <div className="d-flex flex-wrap gap-2">
                    {currentLocation.features.map((feature, index) => (
                      <span
                        key={index}
                        className="badge bg-light text-primary border shadow px-3 py-2"
                      >
                        <i className="bx bx-check-circle me-1"></i>
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-flex flex-wrap gap-2">
                  {actionButtons.map((btn, index) => (
                    <button key={index}
                    className={`btn ${btn.className} shadow d-flex align-items-center gap-2`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={btn.tooltip}
                    >
                      <i className={`bx ${btn.icon}`}></i>
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Location;