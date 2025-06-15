import { useState, useEffect } from 'react';
// import { initTooltip } from '../functions/Tooltip';
const Service = () => {

    useEffect(() => {
        // initTooltip();
    }, []);
    const [hoveredCard, setHoveredCard] = useState(null);
    const services = [
        {
            id: 1,
            icon: "bx-droplet",
            title: "Cuci Kering",
            description: "Pakaian dicuci bersih dan dikeringkan tanpa setrika.",
            price: "Rp 4.000/kg",
            time: "1-2 hari",
            color: "primary",
            features: ["Deterjen premium", "Pewangi alami", "Pengeringan optimal"]
        },
        {
            id: 2,
            icon: "bx bx-closet",
            title: "Cuci Setrika",
            description: "Layanan lengkap: cuci, kering, dan setrika rapi.",
            price: "Rp 6.000/kg",
            time: "2-3 hari",
            color: "success",
            features: ["Cuci + kering", "Setrika profesional", "Lipat rapi"]
        },
        {
            id: 3,
            icon: "bx-time",
            title: "Express",
            description: "Layanan kilat untuk kebutuhan mendesak Anda.",
            price: "Rp 8.000/kg",
            time: "3-6 jam",
            color: "warning",
            features: ["Prioritas utama", "Hasil cepat", "Kualitas terjamin"]
        },
        {
            id: 4,
            icon: "bx-car",
            title: "Antar Jemput",
            description: "Laundry dijemput dan diantar ke lokasi Anda.",
            price: "Gratis*",
            time: "Fleksibel",
            color: "info",
            features: ["Gratis ongkir", "Jadwal fleksibel", "Area Medan"]
        },
        {
            id: 5,
            icon: "bx-brush",
            title: "Cuci Sepatu",
            description: "Pembersihan sepatu profesional dan aman.",
            price: "Rp 15.000/pasang",
            time: "1-2 hari",
            color: "dark",
            features: ["Deep cleaning", "Anti bakteri", "Semua jenis sepatu"]
        },
        {
            id: 6,
            icon: "bx-badge-check",
            title: "Dry Clean",
            description: "Perawatan khusus untuk pakaian premium.",
            price: "Rp 20.000/pcs",
            time: "3-4 hari",
            color: "danger",
            features: ["Bahan premium", "Tanpa air", "Hasil maksimal"]
        }
    ];


    return (
        <section className="py-5 bg-light" id="services">
            <div className="container">

                <div className="text-center mb-5" data-aos="fade-up" data-aos-duration="1000">
                    <span className="badge bg-primary mb-3 shadow rounded-pill px-4 py-2 fs-6">
                        <i className="bx bx-crown me-2"></i>
                        Layanan Terlengkap
                    </span>
                    <h2 className="display-5 fw-bold mb-3 text-primary">
                        Layanan Laundry Kami
                    </h2>
                    <p className="lead text-muted col-lg-8 mx-auto">
                        Kami menyediakan berbagai layanan laundry berkualitas tinggi dengan teknologi modern
                        dan pelayanan terbaik untuk memenuhi semua kebutuhan Anda.
                    </p>
                </div>


                <div className="row g-4 mb-5" data-aos-duration="1000" data-aos="fade-up">
                    {services.map((service, index) => (
                        <div key={service.id} className="col-12 col-md-6 col-lg-4"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}>
                            <div
                                className={`card h-100 border-0 shadow ${hoveredCard === service.id ? 'shadow' : 'shadow'
                                    }`} data-aos-duration="1000"
                                style={{
                                    transition: 'all 0.3s ease',
                                    transform: hoveredCard === service.id ? 'translateY(-5px)' : 'translateY(0)'
                                }}
                                onMouseEnter={() => setHoveredCard(service.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >

                                <div className={`bg-${service.color}`} style={{ height: '10px' }}></div>

                                <div className="card-body p-4">

                                    <div className="d-flex align-items-center mb-3">
                                        <div className={`bg-${service.color} bg-opacity-10 rounded-circle p-3 me-3 shadow`}>
                                            <i className={`bx ${service.icon} fs-3 text-${service.color}`}></i>
                                        </div>
                                        <div>
                                            <h5 className="fw-bold mb-1">{service.title}</h5>
                                            <small className={`badge bg-${service.color} bg-opacity-20 text-white${service.color}`}>
                                                {service.time}
                                            </small>
                                        </div>
                                    </div>


                                    <p className="text-muted mb-3">{service.description}</p>


                                    <ul className="list-unstyled mb-3">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="small text-muted mb-1">
                                                <i className="bx bx-check text-success me-2"></i>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>


                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className={`h6 fw-bold text-${service.color} mb-0`}>
                                            {service.price}
                                        </span>
                                        <button className={`btn btn-outline-${service.color} btn-sm shadow`} data-bs-toggle="tooltip" title='Pilih Layanan'>
                                            <i className="bx bx-check-circle me-1"></i>
                                            Pilih Layanan
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Service;