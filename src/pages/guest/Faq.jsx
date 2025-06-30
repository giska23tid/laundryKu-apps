import { useState, useEffect } from 'react';
import React from "react";

// import { initTooltip } from '../functions/Tooltip';

const Faq = () => {
    const [activeAccordion, setActiveAccordion] = useState(null);
    const [hoveredFaq, setHoveredFaq] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    // FAQ data with categories
    const faqData = [
        {
            id: 1,
            category: 'layanan',
            icon: 'bx-brush',
            iconColor: 'text-primary',
            question: 'Berapa lama proses pencucian di LaundryKu?',
            answer: 'Kami menawarkan berbagai pilihan waktu sesuai kebutuhan Anda: Express 3 jam untuk kebutuhan mendesak, Reguler 1 hari untuk layanan standar, dan Premium 2-3 hari untuk perawatan khusus seperti dry clean. Semua dengan jaminan kualitas terbaik.',
            tags: ['waktu', 'express', 'reguler', 'premium'],
            helpful: 89,
            views: 245
        },
        {
            id: 2,
            category: 'harga',
            icon: 'bx-money',
            iconColor: 'text-success',
            question: 'Bagaimana sistem pembayaran dan harga di LaundryKu?',
            answer: 'Kami menerima pembayaran tunai, transfer bank, e-wallet (GoPay, OVO, DANA), dan kartu kredit. Harga dihitung per kilogram dengan tarif mulai dari Rp 5.000/kg untuk cuci reguler. Tersedia juga paket hemat untuk pelanggan setia dengan diskon hingga 20%.',
            tags: ['harga', 'pembayaran', 'diskon', 'paket'],
            helpful: 156,
            views: 387
        },
        {
            id: 3,
            category: 'layanan',
            icon: 'bx-car',
            iconColor: 'text-info',
            question: 'Apakah tersedia layanan antar jemput?',
            answer: 'Ya! Kami menyediakan layanan antar jemput GRATIS dalam radius 5km dari outlet. Untuk area di luar radius, dikenakan biaya tambahan Rp 5.000. Layanan tersedia setiap hari dari jam 08:00-20:00 dengan sistem booking melalui WhatsApp atau aplikasi mobile.',
            tags: ['antar jemput', 'gratis', 'booking', 'whatsapp'],
            helpful: 203,
            views: 412
        },
        {
            id: 4,
            category: 'kualitas',
            icon: 'bx-shield-plus',
            iconColor: 'text-warning',
            question: 'Bagaimana jaminan kualitas dan keamanan pakaian saya?',
            answer: 'Kami memberikan garansi 100% kepuasan atau uang kembali. Setiap pakaian diberi label khusus dan diasuransikan. Jika terjadi kerusakan akibat kelalaian kami, akan ada ganti rugi sesuai harga pakaian. Kami juga menggunakan deterjen berkualitas tinggi yang aman untuk semua jenis kain.',
            tags: ['garansi', 'asuransi', 'ganti rugi', 'kualitas'],
            helpful: 178,
            views: 298
        },
        {
            id: 5,
            category: 'khusus',
            icon: 'bx-closet',
            iconColor: 'text-danger',
            question: 'Apakah bisa mencuci pakaian khusus seperti jas, gaun, atau sepatu?',
            answer: 'Tentu saja! Kami memiliki layanan khusus untuk berbagai jenis pakaian: Dry Clean untuk jas dan gaun formal, Cuci Sepatu dengan teknologi khusus, Cuci Karpet dan Boneka, serta layanan Setrika Premium. Tim ahli kami berpengalaman menangani berbagai jenis kain dan material.',
            tags: ['dry clean', 'sepatu', 'jas', 'karpet', 'premium'],
            helpful: 134,
            views: 223
        },
        {
            id: 6,
            category: 'layanan',
            icon: 'bx-time-five',
            iconColor: 'text-purple',
            question: 'Jam operasional dan cara menghubungi LaundryKu?',
            answer: 'Outlet kami buka setiap hari: Senin-Jumat (06:00-22:00), Sabtu-Minggu (07:00-21:00). Customer service 24/7 melalui WhatsApp di 0812-3456-7890. Anda juga bisa menghubungi kami melalui aplikasi mobile atau website untuk konsultasi dan booking layanan.',
            tags: ['jam buka', 'whatsapp', 'customer service', 'aplikasi'],
            helpful: 267,
            views: 445
        },
        {
            id: 7,
            category: 'kualitas',
            icon: 'bx-leaf',
            iconColor: 'text-success',
            question: 'Apakah deterjen yang digunakan ramah lingkungan dan aman?',
            answer: 'Ya! Kami menggunakan deterjen eco-friendly yang ramah lingkungan dan aman untuk kulit sensitif. Semua produk telah tersertifikasi BPOM dan tidak mengandung bahan kimia berbahaya. Tersedia juga opsi deterjen hypoallergenic untuk pelanggan dengan alergi khusus.',
            tags: ['eco friendly', 'ramah lingkungan', 'aman', 'hypoallergenic'],
            helpful: 145,
            views: 189
        },
        {
            id: 8,
            category: 'harga',
            icon: 'bx-gift',
            iconColor: 'text-warning',
            question: 'Apakah ada program loyalitas atau promo khusus?',
            answer: 'Kami memiliki program LaundryKu VIP dengan berbagai keuntungan: Diskon 15% untuk member, Poin reward setiap transaksi, Gratis cuci setiap 10x kunjungan, Priority booking untuk layanan antar jemput, dan Promo spesial di bulan ulang tahun member.',
            tags: ['member vip', 'diskon', 'poin reward', 'promo'],
            helpful: 198,
            views: 356
        }
    ];

    // FAQ categories
    const faqCategories = [
        { id: 'all', name: 'Semua', icon: 'bx-grid-alt', count: faqData.length },
        { id: 'layanan', name: 'Layanan', icon: 'bx-cog', count: faqData.filter(f => f.category === 'layanan').length },
        { id: 'harga', name: 'Harga & Pembayaran', icon: 'bx-money', count: faqData.filter(f => f.category === 'harga').length },
        { id: 'kualitas', name: 'Kualitas & Garansi', icon: 'bx-shield-check', count: faqData.filter(f => f.category === 'kualitas').length },
        { id: 'khusus', name: 'Layanan Khusus', icon: 'bx-star', count: faqData.filter(f => f.category === 'khusus').length }
    ];

    // Quick stats
    const quickStats = [
        {
            icon: 'bx-help-circle',
            value: '8+',
            label: 'FAQ Terpopuler',
            color: 'text-primary'
        },
        {
            icon: 'bx-like',
            value: '1.2K+',
            label: 'Helpful Votes',
            color: 'text-success'
        },
        {
            icon: 'bx-show',
            value: '2.5K+',
            label: 'Total Views',
            color: 'text-info'
        },
        {
            icon: 'bx-time',
            value: '< 2 Min',
            label: 'Avg Read Time',
            color: 'text-warning'
        }
    ];

    useEffect(() => {
        // initTooltip();
    }, []);

    // Filter FAQs based on search and category
    const filteredFaqs = faqData.filter(faq => {
        const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
        const matchesSearch = 
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        
        return matchesCategory && matchesSearch;
    });

    const toggleAccordion = (id) => {
        setActiveAccordion(activeAccordion === id ? null : id);
    };

    const handleHelpful = (faqId) => {
        console.log(`FAQ ${faqId} marked as helpful`);
    };

    return (
        <div className="pt-20">
            <section className="py-5 bg-light overflow-hidden" id="faq">
                <div className="container">
                    {/* Header */}
                    <div className="row mb-5">
                        <div className="col-12 text-center" data-aos="fade-up" data-aos-duration="1000">
                            <span className="badge bg-primary mb-3 shadow rounded-pill px-4 py-2 fs-6">
                                <i className="bx bx-help-circle me-2"></i>
                                Pertanyaan Umum
                            </span>
                            <h2 className="display-5 fw-bold mb-4 text-primary">
                                Pertanyaan yang Sering Diajukan (FAQ)
                            </h2>
                            <p className="lead text-muted mb-4 col-lg-8 mx-auto">
                                Temukan jawaban atas pertanyaan umum seputar layanan LaundryKu.
                                Kami siap membantu memberikan informasi yang kamu butuhkan dengan jelas dan cepat.
                            </p>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="row g-3 mb-5" data-aos="fade-up" data-aos-delay="200">
                        {quickStats.map((stat, index) => (
                            <div key={index} className="col-6 col-lg-3">
                                <div className="card border-0 shadow text-center h-100">
                                    <div className="card-body p-3">
                                        <i className={`bx ${stat.icon} fs-2 ${stat.color} mb-2`}></i>
                                        <h4 className="fw-bold mb-1">{stat.value}</h4>
                                        <small className="text-muted">{stat.label}</small>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <div className="row mb-4" data-aos="fade-up" data-aos-delay="300">
                        <div className="col-12">
                            <div className="card border-0 shadow">
                                <div className="card-body p-4">
                                    <div className="row align-items-center">
                                        <div className="col-lg-8">
                                            <div className="position-relative">
                                                <i className="bx bx-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                                                <input
                                                    type="text"
                                                    className="form-control ps-5 py-3 border-0 bg-light shadow w-100"
                                                    placeholder="Cari pertanyaan atau kata kunci..."
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    style={{ fontSize: '16px' }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 mt-3 mt-lg-0">
                                            <div className="d-flex justify-content-lg-end">
                                                <span className="badge bg-primary fs-6 shadow px-3 py-2">
                                                    <i className="bx bx-search-alt me-1"></i>
                                                    {filteredFaqs.length} hasil ditemukan
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="row mb-4" data-aos="fade-up" data-aos-delay="400">
                        <div className="col-12">
                            <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
                                {faqCategories.map(category => (
                                    <button
                                        key={category.id}
                                        className={`btn shadow ${activeCategory === category.id ? 'btn-primary' : 'btn-outline-primary'} 
                                                  shadow d-flex align-items-center gap-2`}
                                        onClick={() => setActiveCategory(category.id)}
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

                    {/* FAQ Accordion */}
                    <div className="row" data-aos="fade-up" data-aos-delay="500">
                        <div className="col-12">
                            {filteredFaqs.length > 0 ? (
                                <div className="accordion" id="faqAccordion">
                                    {filteredFaqs.map((faq, index) => (
                                        <div 
                                            key={faq.id} 
                                            className="card border-0 shadow mb-3 faq-card"
                                            style={{ 
                                                transition: 'all 0.3s ease',
                                                transform: hoveredFaq === faq.id ? 'translateY(-2px)' : 'translateY(0)',
                                                boxShadow: hoveredFaq === faq.id ? '0 8px 25px rgba(0,0,0,0.1)' : ''
                                            }}
                                            onMouseEnter={() => setHoveredFaq(faq.id)}
                                            onMouseLeave={() => setHoveredFaq(null)}
                                            data-aos="zoom-in" 
                                            data-aos-delay={index * 100}
                                        >
                                            <div className="card-header bg-white border-0 p-0">
                                                <button
                                                    className={`btn btn-link text-decoration-none w-100 text-start p-4 d-flex align-items-center gap-3 ${
                                                        activeAccordion === faq.id ? 'text-primary' : 'text-dark'
                                                    }`}
                                                    onClick={() => toggleAccordion(faq.id)}
                                                    style={{ transition: 'all 0.3s ease' }}
                                                > 
                                                    <div className="flex-grow-1">
                                                        <h5 className="fw-bold mb-1">{faq.question}</h5>
                                                        <div className="d-flex align-items-center gap-3 text-muted small">
                                                            <span>
                                                                <i className="bx bx-like me-1"></i>
                                                                {faq.helpful} helpful
                                                            </span>
                                                            <span>
                                                                <i className="bx bx-show me-1"></i>
                                                                {faq.views} views
                                                            </span>
                                                            <span className={`badge shadow ${
                                                                faq.category === 'layanan' ? 'bg-primary' :
                                                                faq.category === 'harga' ? 'bg-success' :
                                                                faq.category === 'kualitas' ? 'bg-warning' : 'bg-info'
                                                            } text-white`}>
                                                                {faq.category}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className={`transition-all duration-300 ${
                                                        activeAccordion === faq.id ? 'rotate-180' : ''
                                                    }`} style={{ transition: 'transform 0.3s ease' }}>
                                                        <i className="bx bx-chevron-down fs-4"></i>
                                                    </div>
                                                </button>
                                            </div>

                                            <div className={`collapse ${activeAccordion === faq.id ? 'show' : ''}`}>
                                                <div className="card-body pt-0 px-4 pb-4">
                                                    <div className="ps-5">
                                                        <div className="border-start border-primary border-3 ps-4">
                                                            <p className="text-muted mb-4" style={{ lineHeight: '1.7' }}>
                                                                {faq.answer}
                                                            </p>

                                                            {/* Tags */}
                                                            <div className="d-flex flex-wrap gap-2 mb-4">
                                                                {faq.tags.map((tag, tagIndex) => (
                                                                    <span 
                                                                        key={tagIndex}
                                                                        className="badge bg-light text-primary border shadow"
                                                                    >
                                                                        <i className="bx bx-tag me-1"></i>
                                                                        {tag}
                                                                    </span>
                                                                ))}
                                                            </div>

                                                            {/* Action Buttons */}
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="d-flex gap-2">
                                                                    <button 
                                                                        className="btn btn-sm btn-outline-success shadow"
                                                                        onClick={() => handleHelpful(faq.id)}
                                                                        data-bs-toggle="tooltip" 
                                                                        title="Apakah ini membantu?"
                                                                    >
                                                                        <i className="bx bx-like me-1"></i>
                                                                        Helpful ({faq.helpful})
                                                                    </button>
                                                                    <button className="btn btn-sm btn-outline-primary shadow" style={{marginRight:'0.8rem'}}>
                                                                        <i className="bx bx-share me-2"></i>
                                                                        Share
                                                                    </button>
                                                                </div>
                                                                <small className="text-muted">
                                                                    <i className="bx bx-time me-1"></i>
                                                                    Diperbarui 2 hari lalu
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-5">
                                    <i className="bx bx-search-alt-2 display-1 text-muted mb-3"></i>
                                    <h4 className="text-muted">Tidak ada FAQ yang ditemukan</h4>
                                    <p className="text-muted">Coba gunakan kata kunci yang berbeda atau pilih kategori lain.</p>
                                    <button 
                                        className="btn btn-primary shadow"
                                        onClick={() => {
                                            setSearchQuery('');
                                            setActiveCategory('all');
                                        }}
                                    >
                                        <i className="bx bx-refresh me-2"></i>
                                        Reset Filter
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Faq;