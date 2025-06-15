import { useState, useEffect } from 'react';
// import { initTooltip } from '../functions/Tooltip';
const Harga = () => {

    useEffect(() => {
        // initTooltip();
    }, []);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState('monthly');
    const [discountEnabled, setDiscountEnabled] = useState(false);

    const pricingPlans = [
        {
            id: 1,
            name: "Basic",
            description: "Cocok untuk kebutuhan pribadi dan keluarga kecil",
            icon: "bx-user",
            color: "primary",
            features: ["Cuci Kering", "Antar Jemput Gratis", "Support 24/7", "Garansi Kualitas"],
            prices: {
                monthly: 50000,
                semester: 280000,
                yearly: 500000
            },
            popular: false
        },
        {
            id: 2,
            name: "Standard",
            description: "Pilihan terbaik untuk keluarga dengan kebutuhan rutin",
            icon: "bx-home",
            color: "success",
            features: ["Cuci + Setrika", "Antar Jemput Gratis", "Express Service", "Support 24/7", "Diskon 5%"],
            prices: {
                monthly: 100000,
                semester: 550000,
                yearly: 1000000
            },
            popular: true
        },
        {
            id: 3,
            name: "Premium",
            description: "Layanan premium untuk bisnis dan kebutuhan komersial",
            icon: "bx-crown",
            color: "warning",
            features: ["Semua Layanan", "Priority Support", "Dry Clean", "Cuci Sepatu", "Diskon 10%", "Manager Khusus"],
            prices: {
                monthly: 200000,
                semester: 1100000,
                yearly: 2000000
            },
            popular: false
        },
        {
            id: 4,
            name: "Enterprise",
            description: "Solusi lengkap untuk hotel, restoran, dan bisnis besar",
            icon: "bx-building",
            color: "danger",
            features: ["Custom Package", "Dedicated Team", "SLA Guarantee", "Bulk Discount", "Invoice Monthly", "Account Manager", "24/7 Priority"],
            prices: {
                monthly: 500000,
                semester: 2700000,
                yearly: 5000000
            },
            popular: false
        }
    ];

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };


    const calculatePrice = (originalPrice) => {
        if (!discountEnabled) return originalPrice;

        let discountPercentage = 0;
        if (selectedPlan === 'semester') discountPercentage = 0.15;
        if (selectedPlan === 'yearly') discountPercentage = 0.25;

        return originalPrice * (1 - discountPercentage);
    };


    const getPlanLabel = () => {
        switch (selectedPlan) {
            case 'monthly': return 'Per Bulan';
            case 'semester': return 'Per 6 Bulan';
            case 'yearly': return 'Per Tahun';
            default: return 'Per Bulan';
        }
    };

    const getDiscountPercentage = () => {
        if (!discountEnabled) return 0;
        if (selectedPlan === 'semester') return 15;
        if (selectedPlan === 'yearly') return 25;
        return 0;
    };

    return (
        <section className="py-5 bg-white overflow-hidden" id="harga">
            <div className="container">

                <div className="text-center mb-5" data-aos="fade-up" data-aos-duration="1000">
                    <span className="badge bg-primary mb-3 shadow rounded-pill px-4 py-2 fs-6">
                        <i className="bx bx-dollar me-2"></i>
                        Harga Terlengkap
                    </span>
                    <h2 className="display-5 fw-bold mb-3 text-primary">
                        Harga Laundry Kami
                    </h2>
                    <p className="lead text-muted col-lg-8 mx-auto">
                        Harga mulai dari Rp10.000 per kilo! Transparan tanpa biaya tersembunyi, dan tetap bersih, wangi, serta tepat waktu.
                    </p>
                </div>


                <div className="row justify-content-center mb-5" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
                    <div className="col-lg-6">
                        <div className="card border-0 shadow">
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <label className="form-label fw-bold mb-0">
                                        <i className="bx bx-time-five me-2 text-primary"></i>
                                        Pilih Paket Berlangganan
                                    </label>
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="discountSwitch"
                                            checked={discountEnabled}
                                            onChange={(e) => setDiscountEnabled(e.target.checked)}
                                        />
                                        <label className="form-check-label fw-bold text-success" htmlFor="discountSwitch">
                                            <i className="bx bx-discount me-1"></i>
                                            Aktifkan Diskon
                                        </label>
                                    </div>
                                </div>

                                <div className="btn-group w-100" role="group">
                                    <input
                                        type="radio"
                                        className="btn-check shadow"
                                        name="planOptions"
                                        id="monthly"
                                        checked={selectedPlan === 'monthly'}
                                        onChange={() => setSelectedPlan('monthly')}
                                    />
                                    <label className="btn btn-outline-primary" htmlFor="monthly">
                                        <i className="bx bx-calendar me-2"></i>1 Bulan
                                    </label>

                                    <input
                                        type="radio"
                                        className="btn-check"
                                        name="planOptions"
                                        id="semester"
                                        checked={selectedPlan === 'semester'}
                                        onChange={() => setSelectedPlan('semester')}
                                    />
                                    <label className="btn btn-outline-primary position-relative" htmlFor="semester">
                                        <i className="bx bx-calendar-alt me-2"></i>6 Bulan
                                        {discountEnabled && (
                                            <span className="position-absolute top-0 start-100 translate-middle z-3 badge rounded-pill bg-success">
                                                -15%
                                            </span>
                                        )}
                                    </label>

                                    <input
                                        type="radio"
                                        className="btn-check"
                                        name="planOptions"
                                        id="yearly"
                                        checked={selectedPlan === 'yearly'}
                                        onChange={() => setSelectedPlan('yearly')}
                                    />
                                    <label className="btn btn-outline-primary position-relative" htmlFor="yearly">
                                        <i className="bx bx-calendar-star me-2"></i>1 Tahun
                                        {discountEnabled && (
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                -25%
                                            </span>
                                        )}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row g-4 mb-5" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                    {pricingPlans.map((plan, index) => {
                        const originalPrice = plan.prices[selectedPlan];
                        const finalPrice = calculatePrice(originalPrice);
                        const discountPercent = getDiscountPercentage();

                        return (
                            <div key={plan.id} className="col-12 col-md-6 col-lg-3"
                                data-aos="fade-up"
                                data-aos-delay={index * 100 + 300}>
                                <div
                                    className={`card h-100 border-0 ${plan.popular ? 'shadow border-3 border-warning' : 'shadow'
                                        } ${hoveredCard === plan.id ? 'shadow' : ''}`}
                                    style={{
                                        transition: 'all 0.3s ease',
                                        transform: hoveredCard === plan.id ? 'translateY(-10px)' : 'translateY(0)'
                                    }}
                                    onMouseEnter={() => setHoveredCard(plan.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >

                                    {plan.popular && (
                                        <div className="position-absolute top-0 start-50 translate-middle">
                                            <span className="badge bg-primary text-light px-3 py-2 rounded-pill shadow">
                                                <i className="bx bx-star me-1"></i>
                                                Paling Populer
                                            </span>
                                        </div>
                                    )}


                                    <div className={`bg-${plan.color}`} style={{ height: '8px' }}></div>

                                    <div className="card-body p-4 text-center">

                                        <div className="mb-4">
                                            <div className={`bg-${plan.color} shadow bg-opacity-10 rounded-circle p-3 d-inline-flex mb-3`}>
                                                <i className={`bx ${plan.icon}  fs-2 text-${plan.color}`}></i>
                                            </div>
                                            <h4 className="fw-bold mb-2">{plan.name}</h4>
                                            <p className="text-muted small mb-0">{plan.description}</p>
                                        </div>


                                        <div className="mb-4">
                                            {discountEnabled && discountPercent > 0 && (
                                                <div className="mb-2">
                                                    <small className="text-muted text-decoration-line-through">
                                                        {formatPrice(originalPrice)}
                                                    </small>
                                                    <span className={`badge bg-${plan.color} ms-2`}>
                                                        -{discountPercent}%
                                                    </span>
                                                </div>
                                            )}
                                            <h3 className={`fw-bold text-${plan.color} mb-1`}>
                                                {formatPrice(finalPrice)}
                                            </h3>
                                            <small className="text-muted">{getPlanLabel()}</small>
                                        </div>


                                        <ul className="list-unstyled mb-4 text-start">
                                            {plan.features.map((feature, idx) => (
                                                <li key={idx} className="mb-2 small">
                                                    <i className="bx bx-check-circle text-success me-2"></i>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>


                                        <button className={`btn btn-${plan.popular ? plan.color : `${plan.color}`} w-100 shadow`} data-bs-toggle="tooltip" title='Pilih Paket'>
                                            <i className="bx bx-shopping-bag me-2"></i>
                                            {plan.popular ? 'Pilih Sekarang' : 'Pilih Paket'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>


                <div className="row justify-content-center" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
                    <div className="col-lg-8">
                        <div className="alert alert-info border-0 shadow relative">
                            <div className="d-flex align-items-center">
                                <i className="bx bx-info-circle fs-4 text-info me-3"></i>
                                <div>
                                    <h6 className="alert-heading mb-1">Informasi Penting</h6>
                                    <p className="mb-0 small">
                                        Semua paket sudah termasuk pickup & delivery gratis area Medan.
                                        Pembayaran dapat dilakukan bulanan atau sekaligus dengan diskon tambahan.
                                    </p>
                                </div>
                            </div>
                            <button type='button' className='btn-close  position-absolute text-muted top-0 end-0 m-2' aria-label='Close' onClick={(e) => e.currentTarget.parentElement.style.display = 'none'} style={{ width: '0.5rem', height: '0.5rem' }}>

                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Harga;