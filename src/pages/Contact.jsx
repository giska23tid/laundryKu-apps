import { useState, useEffect } from 'react';
// import { initTooltip } from '../functions/Tooltip';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        subject: '',
        message: '',
        priority: 'normal',
        newsletter: false
    });

    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null);

    // Contact info data
    const contactInfo = [
        {
            id: 1,
            icon: 'bx-map',
            iconColor: 'text-primary',
            title: 'Alamat Outlet',
            info: 'Jl. Raya Laundry No. 123, Kota Medan, Sumatera Utara 20112',
            subInfo: 'Buka setiap hari: 06:00 - 22:00',
            action: 'Lihat di Maps',
            actionIcon: 'bx-map-pin'
        },
        {
            id: 2,
            icon: 'bx-phone',
            iconColor: 'text-success',
            title: 'Telepon & WhatsApp',
            info: '+62 812-3456-7890',
            subInfo: 'Customer Service 24/7',
            action: 'Hubungi Sekarang',
            actionIcon: 'bx-phone-call'
        },
        {
            id: 3,
            icon: 'bx-envelope',
            iconColor: 'text-info',
            title: 'Email',
            info: 'info@laundrykilat.com',
            subInfo: 'Respon dalam 24 jam',
            action: 'Kirim Email',
            actionIcon: 'bx-send'
        },
        {
            id: 4,
            icon: 'bx-time-five',
            iconColor: 'text-warning',
            title: 'Jam Operasional',
            info: 'Senin - Jumat: 06:00 - 22:00',
            subInfo: 'Sabtu - Minggu: 07:00 - 21:00',
            action: 'Booking Sekarang',
            actionIcon: 'bx-calendar-check'
        }
    ];

    // Service options
    const serviceOptions = [
        { value: '', label: 'Pilih jenis layanan...' },
        { value: 'cuci-reguler', label: 'Cuci Reguler' },
        { value: 'cuci-express', label: 'Cuci Express (3 jam)' },
        { value: 'dry-clean', label: 'Dry Clean' },
        { value: 'cuci-sepatu', label: 'Cuci Sepatu' },
        { value: 'cuci-karpet', label: 'Cuci Karpet' },
        { value: 'setrika-premium', label: 'Setrika Premium' },
        { value: 'antar-jemput', label: 'Layanan Antar Jemput' },
        { value: 'konsultasi', label: 'Konsultasi Perawatan' },
        { value: 'lainnya', label: 'Lainnya' }
    ];

    // Quick stats
    const quickStats = [
        {
            icon: 'bx-message-dots',
            value: '24/7',
            label: 'Customer Support',
            color: 'text-primary'
        },
        {
            icon: 'bx-time',
            value: '< 1 Jam',
            label: 'Waktu Respon',
            color: 'text-success'
        },
        {
            icon: 'bx-like',
            value: '99%',
            label: 'Kepuasan Pelanggan',
            color: 'text-info'
        },
        {
            icon: 'bx-phone-call',
            value: '5000+',
            label: 'Konsultasi Selesai',
            color: 'text-warning'
        }
    ];

    useEffect(() => {
        // initTooltip();
    }, []);

    // Form validation
    const validateForm = () => {
        const errors = {};

        // Name validation
        if (!formData.name.trim()) {
            errors.name = 'Nama lengkap wajib diisi';
        } else if (formData.name.trim().length < 2) {
            errors.name = 'Nama minimal 2 karakter';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            errors.email = 'Email wajib diisi';
        } else if (!emailRegex.test(formData.email)) {
            errors.email = 'Format email tidak valid';
        }

        // Phone validation
        const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/;
        if (!formData.phone.trim()) {
            errors.phone = 'Nomor telepon wajib diisi';
        } else if (!phoneRegex.test(formData.phone.replace(/[\s-]/g, ''))) {
            errors.phone = 'Format nomor telepon tidak valid';
        }

        // Service validation
        if (!formData.service) {
            errors.service = 'Pilih jenis layanan';
        }

        // Subject validation
        if (!formData.subject.trim()) {
            errors.subject = 'Subject wajib diisi';
        } else if (formData.subject.trim().length < 5) {
            errors.subject = 'Subject minimal 5 karakter';
        }

        // Message validation
        if (!formData.message.trim()) {
            errors.message = 'Pesan wajib diisi';
        } else if (formData.message.trim().length < 10) {
            errors.message = 'Pesan minimal 10 karakter';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user starts typing
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            console.log('Form submitted:', formData);
            setSubmitStatus('success');

            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                service: '',
                subject: '',
                message: '',
                priority: 'normal',
                newsletter: false
            });

        } catch (error) {
            console.error('Submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-5 bg-light overflow-hidden" id="contact">
            <div className="container">
                {/* Header */}
                <div className="row mb-5">
                    <div className="col-12 text-center" data-aos="fade-up" data-aos-duration="1000">
                        <span className="badge bg-primary mb-3 shadow rounded-pill px-4 py-2 fs-6">
                            <i className="bx bx-message-dots me-2"></i>
                            Kontak Kami
                        </span>
                        <h2 className="display-5 fw-bold mb-4 text-primary">
                            Hubungi Laundry Kilat
                        </h2>
                        <p className="lead text-muted mb-4 col-lg-8 mx-auto">
                            Punya pertanyaan atau butuh bantuan? Isi form kontak di bawah, dan tim Laundry Kilat
                            siap membantu kamu dengan cepat dan ramah.
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

                <div className="row g-4">
                    {/* Contact Information */}
                    <div className="col-lg-4" data-aos="fade-right" data-aos-delay="300">
                        <div className="h-100">
                            <h3 className="fw-bold mb-4 text-primary">
                                <i className="bx bx-info-circle me-2"></i>
                                Informasi Kontak
                            </h3>

                            {contactInfo.map((info, index) => (
                                <div
                                    key={info.id}
                                    className="card border-0 shadow mb-3"
                                    style={{
                                        transition: 'all 0.3s ease',
                                        transform: hoveredCard === info.id ? 'translateY(-3px)' : 'translateY(0)',
                                        boxShadow: hoveredCard === info.id ? '0 10px 30px rgba(0,0,0,0.15)' : ''
                                    }}
                                    onMouseEnter={() => setHoveredCard(info.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    data-aos="zoom-in"
                                    data-aos-delay={400 + (index * 100)}
                                >
                                    <div className="card-body p-4">
                                        <div className="d-flex align-items-start gap-3">
                                            <div className={`rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 ${info.iconColor} bg-light shadow`}
                                                style={{ width: '50px', height: '50px' }}>
                                                <i className={`bx ${info.icon} fs-4`}></i>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h5 className="fw-bold mb-2">{info.title}</h5>
                                                <p className="mb-1 text-dark">{info.info}</p>
                                                <small className="text-muted d-block mb-3">{info.subInfo}</small>
                                                <button className="btn btn-sm btn-outline-primary shadow" data-bs-toggle="tooltip" title={info.action}>
                                                    <i className={`bx ${info.actionIcon} me-1`}></i>
                                                    {info.action}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}


                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="col-lg-8" data-aos="fade-left" data-aos-delay="400">
                        <div className="card border-0 shadow">
                            <div className="card-body p-5">
                                <div className="d-flex align-items-center mb-4">
                                    <i className="bx bx-edit fs-2 text-primary me-3"></i>
                                    <div>
                                        <h3 className="fw-bold mb-1">Kirim Pesan</h3>
                                        <small className="text-muted">Isi form di bawah untuk menghubungi kami</small>
                                    </div>
                                </div>


                                {submitStatus === 'success' && (
                                    <div className="alert alert-success d-flex align-items-center shadow" role="alert">
                                        <i className="bx bx-check-circle fs-4 me-2"></i>
                                        <div>
                                            <strong>Pesan berhasil dikirim!</strong> Tim kami akan menghubungi Anda dalam 24 jam.
                                        </div>
                                    </div>
                                )}

                                {submitStatus === 'error' && (
                                    <div className="alert alert-danger d-flex align-items-center shadow" role="alert">
                                        <i className="bx bx-error-circle fs-4 me-2"></i>
                                        <div>
                                            <strong>Gagal mengirim pesan!</strong> Silakan coba lagi atau hubungi kami via WhatsApp.
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} noValidate>
                                    <div className="row g-3">
                                        {/* Name Field */}
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className={`form-control shadow ${formErrors.name ? 'is-invalid' : formData.name ? 'is-valid' : ''}`}
                                                    id="floatingName"
                                                    placeholder="Nama Lengkap"
                                                />
                                                <label htmlFor="floatingName">
                                                    <i className="bx bx-user me-2"></i>Nama Lengkap *
                                                </label>
                                                {formErrors.name && (
                                                    <div className="invalid-feedback">
                                                        <i className="bx bx-error-circle me-1"></i>
                                                        {formErrors.name}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Email Field */}
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className={`form-control shadow ${formErrors.email ? 'is-invalid' : formData.email ? 'is-valid' : ''}`}
                                                    id="floatingEmail"
                                                    placeholder="name@example.com"
                                                />
                                                <label htmlFor="floatingEmail">
                                                    <i className="bx bx-envelope me-2"></i>Email Address *
                                                </label>
                                                {formErrors.email && (
                                                    <div className="invalid-feedback">
                                                        <i className="bx bx-error-circle me-1"></i>
                                                        {formErrors.email}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Phone Field */}
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className={`form-control shadow ${formErrors.phone ? 'is-invalid' : formData.phone ? 'is-valid' : ''}`}
                                                    id="floatingPhone"
                                                    placeholder="08123456789"
                                                />
                                                <label htmlFor="floatingPhone">
                                                    <i className="bx bx-phone me-2"></i>Nomor Telepon *
                                                </label>
                                                {formErrors.phone && (
                                                    <div className="invalid-feedback">
                                                        <i className="bx bx-error-circle me-1"></i>
                                                        {formErrors.phone}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Service Field */}
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <select
                                                    name="service"
                                                    value={formData.service}
                                                    onChange={handleInputChange}
                                                    className={`form-select shadow ${formErrors.service ? 'is-invalid' : formData.service ? 'is-valid' : ''}`}
                                                    id="floatingService"
                                                >
                                                    {serviceOptions.map(option => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                <label htmlFor="floatingService">
                                                    <i className="bx bx-cog me-2"></i>Jenis Layanan *
                                                </label>
                                                {formErrors.service && (
                                                    <div className="invalid-feedback">
                                                        <i className="bx bx-error-circle me-1"></i>
                                                        {formErrors.service}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Subject Field */}
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleInputChange}
                                                    className={`form-control shadow ${formErrors.subject ? 'is-invalid' : formData.subject ? 'is-valid' : ''}`}
                                                    id="floatingSubject"
                                                    placeholder="Subject"
                                                />
                                                <label htmlFor="floatingSubject">
                                                    <i className="bx bx-bookmark me-2"></i>Subject *
                                                </label>
                                                {formErrors.subject && (
                                                    <div className="invalid-feedback">
                                                        <i className="bx bx-error-circle me-1"></i>
                                                        {formErrors.subject}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Priority Field */}
                                        <div className="col-12">
                                            <label className="form-label fw-bold">
                                                <i className="bx bx-flag me-2 text-warning"></i>
                                                Prioritas Pesan
                                            </label>
                                            <div className="d-flex gap-3">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="priority"
                                                        value="low"
                                                        checked={formData.priority === 'low'}
                                                        onChange={handleInputChange}
                                                        id="priorityLow"
                                                    />
                                                    <label className="form-check-label" htmlFor="priorityLow">
                                                        <span className="badge bg-success shadow me-1">LOW</span> Normal
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="priority"
                                                        value="normal"
                                                        checked={formData.priority === 'normal'}
                                                        onChange={handleInputChange}
                                                        id="priorityNormal"
                                                    />
                                                    <label className="form-check-label" htmlFor="priorityNormal">
                                                        <span className="badge bg-warning shadow me-1">NORMAL</span> Standar
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="priority"
                                                        value="high"
                                                        checked={formData.priority === 'high'}
                                                        onChange={handleInputChange}
                                                        id="priorityHigh"
                                                    />
                                                    <label className="form-check-label" htmlFor="priorityHigh">
                                                        <span className="badge bg-danger shadow me-1">HIGH</span> Urgent
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Message Field */}
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleInputChange}
                                                    className={`form-control shadow ${formErrors.message ? 'is-invalid' : formData.message ? 'is-valid' : ''}`}
                                                    id="floatingMessage"
                                                    placeholder="Tulis pesan Anda di sini..."
                                                    style={{ height: '150px' }}
                                                ></textarea>
                                                <label htmlFor="floatingMessage">
                                                    <i className="bx bx-message-detail me-2"></i>Pesan *
                                                </label>
                                                {formErrors.message && (
                                                    <div className="invalid-feedback">
                                                        <i className="bx bx-error-circle me-1"></i>
                                                        {formErrors.message}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Newsletter Checkbox */}
                                        <div className="col-12">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    data-bs-toggle="tooltip"
                                                    title='Anda harus menchecklist untuk mendapatkan newsletter dari kami'
                                                    name="newsletter"
                                                    checked={formData.newsletter}
                                                    onChange={handleInputChange}
                                                    id="newsletter"
                                                />
                                                <label className="form-check-label" htmlFor="newsletter">
                                                    <i className="bx bx-envelope me-2"></i>
                                                    Ya, saya ingin menerima newsletter dan promo terbaru dari Laundry Kilat
                                                </label>
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="col-12">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="btn btn-primary btn-lg w-100 shadow"
                                                data-bs-toggle="tooltip"
                                                title='Kirim pesan ke kami'
                                                style={{ transition: 'all 0.3s ease' }}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                        <i className="bx bx-loader-alt bx-spin me-2"></i>
                                                        Mengirim Pesan...
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="bx bx-send me-2"></i>
                                                        Kirim Pesan
                                                    </>
                                                )}
                                            </button>
                                            <small className="text-muted d-block text-center mt-2">
                                                <i className="bx bx-shield-check me-1"></i>
                                                Data Anda aman dan tidak akan disebarluaskan
                                            </small>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </section>
    );
};

export default Contact;