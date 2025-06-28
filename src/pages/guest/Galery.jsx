import { useState, useEffect } from 'react';
// import { initTooltip } from '../functions/Tooltip';
const Gallery = () => {
    useEffect(() => {
        // initTooltip();
    }, []);
    const [activeTab, setActiveTab] = useState('sepatu');
    const [currentSlide, setCurrentSlide] = useState(0);

    // Categories for navigation tabs
    const categories = [
        { id: 'sepatu', name: 'Sepatu', icon: 'bx-walk', color: 'primary' },
        { id: 'kaos', name: 'Kaos', icon: 'bx-briefcase-alt-2', color: 'success' },
        { id: 'kemeja', name: 'Kemeja', icon: 'bxs-t-shirt', color: 'warning' },
        { id: 'celana', name: 'Celana Panjang', icon: 'bx-pie-chart', color: 'info' }
    ];

    // Gallery data with before-after images
    const galleryData = {
        sepatu: [
            {
                id: 1,
                before: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400",
                after: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
                title: "Sepatu Sneakers",
                description: "Pembersihan deep cleaning dengan hasil maksimal"
            },
            {
                id: 2,
                before: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400",
                after: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400",
                title: "Sepatu Formal",
                description: "Perawatan leather premium"
            },
            {
                id: 3,
                before: "https://images.unsplash.com/photo-1520256862855-398228c41684?w=400",
                after: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400",
                title: "Sepatu Olahraga",
                description: "Pembersihan noda membandel"
            }
        ],
        kaos: [
            {
                id: 1,
                before: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
                after: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=400",
                title: "Kaos Putih",
                description: "Menghilangkan noda kuning dan kusam"
            },
            {
                id: 2,
                before: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=400",
                after: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400",
                title: "Kaos Berwarna",
                description: "Menjaga warna tetap cerah"
            }
        ],
        kemeja: [
            {
                id: 1,
                before: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
                after: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=400",
                title: "Kemeja Formal",
                description: "Setrika rapi dengan hasil profesional"
            },
            {
                id: 2,
                before: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
                after: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400",
                title: "Kemeja Casual",
                description: "Cuci dan setrika dengan hasil sempurna"
            }
        ],
        celana: [
            {
                id: 1,
                before: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
                after: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
                title: "Celana Jeans",
                description: "Pembersihan menyeluruh tanpa merusak warna"
            },
            {
                id: 2,
                before: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400",
                after: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
                title: "Celana Formal",
                description: "Perawatan premium dengan hasil sempurna"
            }
        ]
    };

    const currentGallery = galleryData[activeTab];
    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % currentGallery.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + currentGallery.length) % currentGallery.length);

    return (
        <section className="py-5 bg-light overflow-hidden" id="gallery">
            <div className="container">
                <div className="row align-items-center">
                    {/* Left Content */}
                    <div className="col-lg-5 mb-5 mb-lg-0">
                        <div className="text-start" data-aos="fade-right" data-aos-duration="1000">
                            <span className="badge bg-primary mb-3 shadow rounded-pill px-4 py-2 fs-6">
                                <i className="bx bx-crown me-2"></i>
                                Gallery Terlengkap
                            </span>
                            <h2 className="display-5 fw-bold mb-4 text-primary">
                                Galeri Before-After
                            </h2>
                            <p className="lead text-muted mb-4">
                                Lihat transformasi luar biasa dari layanan laundry kami. Dari kondisi kotor dan kusam
                                menjadi bersih, wangi, dan seperti baru kembali.
                            </p>

                            {/* Navigation Tabs */}
                            <div className="mb-4">
                                <h5 className="fw-bold mb-3 text-dark">Kategori Layanan:</h5>
                                <div className="d-flex flex-wrap gap-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            className={`badge border-0 shadow rounded px-3 py-2 fs-6 d-inline-flex align-items-center transition-all ${activeTab === category.id
                                                    ? `bg-${category.color} text-white`
                                                    : 'bg-light text-muted'
                                                }`}
                                            style={{
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                transform: activeTab === category.id ? 'scale(1.05)' : 'scale(1)'
                                            }}
                                            onClick={() => {
                                                setActiveTab(category.id);
                                                setCurrentSlide(0);
                                            }}
                                        >
                                            <i className={`bx ${category.icon} me-2`}></i>
                                            {category.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="row g-3 mb-4">
                                <div className="col-6">
                                    <div className="text-center p-3 bg-light rounded shadow">
                                        <h3 className="fw-bold text-success mb-1">1000+</h3>
                                        <small className="text-muted">Pelanggan Puas</small>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="text-center p-3 bg-light rounded shadow">
                                        <h3 className="fw-bold text-primary mb-1">5★</h3>
                                        <small className="text-muted">Rating Layanan</small>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <div className="d-flex gap-3">
                                <button className="btn btn-primary btn-lg shadow px-4" data-bs-toggle="tooltip" title='Hubungi Kami'>
                                    <i className="bx bx-phone me-2"></i>
                                    Hubungi Kami
                                </button>
                                <button className="btn btn-outline-primary shadow btn-lg px-4" data-bs-toggle="tooltip" title='Info Lengkap'>
                                    <i className="bx bx-info-circle me-2"></i>
                                    Info Lengkap
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Carousel */}
                    <div className="col-lg-7">
                        <div className="position-relative" data-aos="fade-left" data-aos-duration="1000">
                            {/* Carousel Container */}
                            <div className="card border-0 shadow-lg overflow-hidden rounded-4">
                                <div className="card-header bg-gradient text-white text-center py-3"
                                    style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                                    <h5 className="fw-bold mb-0">
                                        <i className="bx bx-images me-2"></i>
                                        {categories.find(cat => cat.id === activeTab)?.name} - Before & After
                                    </h5>
                                </div>

                                <div className="card-body p-0">
                                    {currentGallery && currentGallery.length > 0 && (
                                        <div className="position-relative">
                                            {/* Main Image */}
                                            <div className="row g-0">
                                                <div className="col-6 position-relative">
                                                    <div className="position-relative">
                                                        <img
                                                            src={currentGallery[currentSlide].before}
                                                            alt="Before"
                                                            className="w-100"
                                                            style={{ height: '300px', objectFit: 'cover' }}
                                                        />
                                                        <div className="position-absolute top-0 start-0 m-3">
                                                            <span className="badge bg-danger fs-6 px-3 py-2 shadow">
                                                                <i className="bx bx-x me-1"></i>
                                                                BEFORE
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-6 position-relative">
                                                    <div className="position-relative">
                                                        <img
                                                            src={currentGallery[currentSlide].after}
                                                            alt="After"
                                                            className="w-100"
                                                            style={{ height: '300px', objectFit: 'cover' }}
                                                        />
                                                        <div className="position-absolute top-0 end-0 m-3">
                                                            <span className="badge bg-success fs-6 px-3 py-2 shadow">
                                                                <i className="bx bx-check me-1"></i>
                                                                AFTER
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Navigation Arrows */}
                                            <button
                                                className="position-absolute top-50 start-0 translate-middle-y btn btn-light btn-sm rounded-circle shadow ms-2"
                                                style={{ width: '40px', height: '40px', zIndex: 10 }}
                                                onClick={prevSlide}
                                            >
                                                <i className="bx bx-chevron-left"></i>
                                            </button>
                                            <button
                                                className="position-absolute top-50 end-0 translate-middle-y btn btn-light btn-sm rounded-circle shadow me-2"
                                                style={{ width: '40px', height: '40px', zIndex: 10 }}
                                                onClick={nextSlide}
                                            >
                                                <i className="bx bx-chevron-right"></i>
                                            </button>
                                        </div>
                                    )}

                                    {/* Image Info */}
                                    <div className="p-4 bg-light">
                                        <h6 className="fw-bold mb-2">{currentGallery[currentSlide]?.title}</h6>
                                        <p className="text-muted mb-3 small">{currentGallery[currentSlide]?.description}</p>

                                        {/* Dots Indicator */}
                                        <div className="d-flex justify-content-center gap-2">
                                            {currentGallery.map((_, index) => (
                                                <button
                                                    key={index}
                                                    className={`btn btn-sm rounded-circle ${index === currentSlide ? 'btn-primary' : 'btn-outline-secondary'
                                                        }`}
                                                    style={{ width: '10px', height: '10px', padding: 0 }}
                                                    onClick={() => setCurrentSlide(index)}
                                                ></button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;