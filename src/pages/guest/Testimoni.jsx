import { useState, useEffect } from 'react';
// import { initTooltip } from '../functions/Tooltip';
const Testimonials = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [activeFilter, setActiveFilter] = useState('all');
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Testimonials data
    const testimonials = [
        {
            id: 1,
            name: "Adi Suradi",
            role: "Bapak Rumah Tangga",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            rating: 5,
            text: "Laundry Kilat benar-benar menyelamatkan hari saya! Kemeja suami yang terkena noda minyak bisa bersih sempurna dalam 3 jam. Pelayanannya ramah dan hasil setrikanya rapi banget!",
            service: "Express",
            location: "Medan Baru",
            date: "2 hari lalu",
            verified: true,
            category: "express"
        },
        {
            id: 2,
            name: "Budi Santoso",
            role: "Karyawan Swasta",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            rating: 5,
            text: "Sudah 2 tahun jadi pelanggan setia. Sepatu kantor saya yang putih selalu bersih seperti baru. Tim antar jemputnya juga selalu tepat waktu. Recommended banget!",
            service: "Cuci Sepatu",
            location: "Medan Timur",
            date: "1 minggu lalu",
            verified: true,
            category: "shoes"
        },
        {
            id: 3,
            name: "Rina Maharani",
            role: "Mahasiswa",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
            rating: 5,
            text: "Sebagai mahasiswa, budget terbatas tapi tetap pengen pakaian bersih dan wangi. Laundry Kilat kasih harga terjangkau dengan kualitas premium. Terima kasih!",
            service: "Cuci Kering",
            location: "Medan Petisah",
            date: "3 hari lalu",
            verified: true,
            category: "regular"
        },
        {
            id: 4,
            name: "Ahmad Rizki",
            role: "Pengusaha",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
            rating: 5,
            text: "Jas mahal saya di dry clean disini hasilnya sempurna! Tidak ada kerusakan sama sekali dan wanginya tahan lama. Pelayanan profesional dengan harga yang fair.",
            service: "Dry Clean",
            location: "Medan Center",
            date: "5 hari lalu",
            verified: true,
            category: "premium"
        },
        {
            id: 5,
            name: "Firman Syahputera",
            role: "Dokter",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            rating: 5,
            text: "Jadwal kerja yang padat membuat saya susah ke laundry. Layanan antar jemput Laundry Kilat sangat membantu. Pakaian bersih tanpa ribet!",
            service: "Antar Jemput",
            location: "Medan Helvetia",
            date: "1 hari lalu",
            verified: true,
            category: "pickup"
        },
        {
            id: 6,
            name: "Dedi Prasetyo",
            role: "Atlet",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
            rating: 5,
            text: "Jersey dan peralatan olahraga saya selalu bau dan kotor. Setelah dicuci di Laundry Kilat, bau hilang total dan warnanya tetap cerah. Mantap!",
            service: "Cuci Setrika",
            location: "Medan Johor",
            date: "4 hari lalu",
            verified: true,
            category: "regular"
        }
    ];

    // Filter categories
    const filterCategories = [
        { id: 'all', name: 'Semua', icon: 'bx-grid-alt', count: testimonials.length },
        { id: 'express', name: 'Express', icon: 'bx-time', count: testimonials.filter(t => t.category === 'express').length },
        { id: 'regular', name: 'Regular', icon: 'bx-wash', count: testimonials.filter(t => t.category === 'regular').length },
        { id: 'premium', name: 'Premium', icon: 'bx-crown', count: testimonials.filter(t => t.category === 'premium').length },
        { id: 'shoes', name: 'Sepatu', icon: 'bx-walk', count: testimonials.filter(t => t.category === 'shoes').length },
        { id: 'pickup', name: 'Antar Jemput', icon: 'bx-car', count: testimonials.filter(t => t.category === 'pickup').length }
    ];

    // Filter testimonials
    const filteredTestimonials = activeFilter === 'all'
        ? testimonials
        : testimonials.filter(t => t.category === activeFilter);

    // Auto-play carousel
    useEffect(() => {
        // initTooltip();
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % Math.ceil(filteredTestimonials.length / 3));
        }, 4000);

        return () => clearInterval(interval);
    }, [filteredTestimonials.length, isAutoPlaying]);

    const nextSlide = () => {
        setCurrentSlide(prev => (prev + 1) % Math.ceil(filteredTestimonials.length / 3));
    };

    const prevSlide = () => {
        setCurrentSlide(prev => (prev - 1 + Math.ceil(filteredTestimonials.length / 3)) % Math.ceil(filteredTestimonials.length / 3));
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <i key={i} className={`bx ${i < rating ? 'bxs-star' : 'bx-star'} text-warning`}></i>
        ));
    };

    const getVisibleTestimonials = () => {
        const startIndex = currentSlide * 3;
        return filteredTestimonials.slice(startIndex, startIndex + 3);
    };

    return (
        <div className="pt-20">
            <section className="py-5 bg-light overflow-hidden" id="testimonials">
                <div className="container">
                    {/* Header */}
                    <div className="row">
                        <div className="col-12 text-center mb-5" data-aos="fade-up" data-aos-duration="1000">
                            <span className="badge bg-primary mb-3 shadow rounded-pill px-4 py-2 fs-6">
                                <i className="bx bx-crown me-2"></i>
                                Testimoni Pelanggan
                            </span>
                            <h2 className="display-5 fw-bold mb-4 text-primary">
                                Cerita Nyata dari Pelanggan Laundry Kilat
                            </h2>
                            <p className="lead text-muted mb-4 col-lg-8 mx-auto">
                                Pelanggan kami merasakan langsung kecepatan dan kualitas Laundry Kilat.
                                Dari pakaian kusam menjadi bersih dan wangi hanya dalam hitungan jam!
                            </p>

                            {/* Statistics */}
                            <div className="row g-3 mb-5">
                                <div className="col-6 col-md-3">
                                    <div className="bg-white p-3 rounded shadow">
                                        <h3 className="fw-bold text-success mb-1">1000+</h3>
                                        <small className="text-muted">Pelanggan</small>
                                    </div>
                                </div>
                                <div className="col-6 col-md-3">
                                    <div className="text-center p-3 bg-light rounded shadow">
                                        <h3 className="fw-bold text-primary mb-1">5★</h3>
                                        <small className="text-muted">Rating Layanan</small>
                                    </div>
                                </div>
                                <div className="col-6 col-md-3">
                                    <div className="bg-white p-3 rounded shadow">
                                        <h3 className="fw-bold text-info mb-1">98%</h3>
                                        <small className="text-muted">Kepuasan</small>
                                    </div>
                                </div>
                                <div className="col-6 col-md-3">
                                    <div className="bg-white p-3 rounded shadow">
                                        <h3 className="fw-bold text-primary mb-1">24/7</h3>
                                        <small className="text-muted">Layanan</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="row mb-4" data-aos="fade-up" data-aos-delay="200">
                        <div className="col-12">
                            <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
                                {filterCategories.map(category => (
                                    <button
                                        key={category.id}
                                        className={`btn ${activeFilter === category.id ? 'btn-primary' : 'btn-outline-primary'} 
                                                  btn-sm shadow d-flex align-items-center gap-2`}
                                        onClick={() => {
                                            setActiveFilter(category.id);
                                            setCurrentSlide(0);
                                        }}
                                        style={{ transition: 'all 0.3s ease' }}
                                    >
                                        <i className={`bx ${category.icon}`}></i>
                                        {category.name}
                                        <span className="badge bg-light text-dark ms-1">{category.count}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Carousel Controls */}
                    <div className="row mb-3">
                        <div className="col-12 d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-3">
                                <span className="text-muted small">
                                    {filteredTestimonials.length} testimoni ditemukan
                                </span>
                                <button
                                    className={`btn btn-sm ${isAutoPlaying ? 'btn-success' : 'btn-outline-secondary'} shadow`}
                                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                                >
                                    <i className={`bx ${isAutoPlaying ? 'bx-pause' : 'bx-play'} me-1`}></i>
                                    {isAutoPlaying ? 'Pause' : 'Play'}
                                </button>
                            </div>

                            <div className="d-flex gap-2">
                                <button
                                    className="btn btn-outline-primary shadow btn-sm rounded-circle" data-bs-toggle="tooltip" title='Prev'
                                    onClick={prevSlide}
                                    style={{ width: '40px', height: '40px' }}
                                >
                                    <i className="bx bx-chevron-left"></i>
                                </button>
                                <button
                                    className="btn btn-outline-primary shadow btn-sm rounded-circle" data-bs-toggle="tooltip" title='Next'
                                    onClick={nextSlide}
                                    style={{ width: '40px', height: '40px' }}
                                >
                                    <i className="bx bx-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Testimonials Carousel */}
                    <div className="row" data-aos="fade-up" data-aos-delay="400">
                        <div className="col-12">
                            <div className="testimonials-carousel position-relative overflow-hidden">
                                <div className="row g-4 mb-4">
                                    {getVisibleTestimonials().map((testimonial, index) => (
                                        <div key={testimonial.id} className="col-12 col-md-6 col-lg-4"
                                            data-aos="zoom-in" data-aos-delay={index * 100}>
                                            <div className="card border-0 shadow h-100 testimonial-card">
                                                {/* Card Header */}
                                                <div className="card-header bg-white border-0 pb-0">
                                                    <div className="d-flex align-items-center mb-3">
                                                        <div className="position-relative me-3">
                                                            <img
                                                                src={testimonial.avatar}
                                                                alt={testimonial.name}
                                                                className="rounded-circle border border-3 border-primary"
                                                                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                                            />
                                                            {testimonial.verified && (
                                                                <div className="position-absolute bottom-0 end-0">
                                                                    <i className="bx bxs-badge-check text-success fs-5 bg-white rounded-circle"></i>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <h6 className="fw-bold mb-1">{testimonial.name}</h6>
                                                            <small className="text-muted d-block">{testimonial.role}</small>
                                                            <div className="d-flex align-items-center gap-1">
                                                                {renderStars(testimonial.rating)}
                                                                <small className="text-muted ms-1">({testimonial.rating}.0)</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Card Body */}
                                                <div className="card-body pt-0">
                                                    <div className="position-relative">
                                                        <i className="bx bxs-quote-left text-primary opacity-25 position-absolute"
                                                            style={{ fontSize: '2rem', top: '-10px', left: '-5px' }}></i>
                                                        <p className="text-muted mb-3 ps-3" style={{ lineHeight: '1.6' }}>
                                                            {testimonial.text}
                                                        </p>
                                                    </div>

                                                    {/* Service Badge */}
                                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                                        <span className="badge bg-primary  text-white shadow px-3 py-2">
                                                            <i className="bx bx-check-circle me-1"></i>
                                                            {testimonial.service}
                                                        </span>
                                                        <small className="text-muted">
                                                            <i className="bx bx-time me-1"></i>
                                                            {testimonial.date}
                                                        </small>
                                                    </div>

                                                    {/* Location */}
                                                    <div className="d-flex align-items-center text-muted small">
                                                        <i className="bx bx-map me-2"></i>
                                                        {testimonial.location}
                                                    </div>
                                                </div>

                                                {/* Card Footer */}
                                                <div className="card-footer bg-light border-0">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <button className="btn btn-sm  shadow btn-outline-primary" data-bs-toggle="tooltip" title='HelpFul'>
                                                            <i className="bx bx-like me-1"></i>
                                                            Helpful
                                                        </button>
                                                        <button className="btn btn-sm btn-link text-muted p-0" data-bs-toggle="tooltip" title='share'>
                                                            <i className="bx bx-share me-1"></i>
                                                            Share
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Dots Indicator */}
                            <div className="d-flex justify-content-center mt-4 gap-2">
                                {Array.from({ length: Math.ceil(filteredTestimonials.length / 3) }, (_, index) => (
                                    <button
                                        key={index}
                                        className={`btn btn-sm shadow rounded-circle ${index === currentSlide ? 'btn-primary' : 'btn-outline-primary'
                                            }`}
                                        style={{ width: '12px', height: '12px', padding: 0 }}
                                        onClick={() => setCurrentSlide(index)}
                                    ></button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Testimonials;