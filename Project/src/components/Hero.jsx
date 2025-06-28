import { useState, useEffect } from 'react';
import React from "react";

// import { initTooltip } from '../functions/Tooltip';
const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [typedText, setTypedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    
    const heroImages = [
        "/assets/Hero.jpg",
        "/assets/laundry-machine.jpg", 
        "/assets/clean-clothes.jpg",
        "/assets/delivery-service.jpg"
    ];

    const typedMessages = [
        "Cuci cepat, bersih, dan wangi. Antar jemput gratis!",
        "Hasil cuci terjamin 100% bersih dan harum.",
        "Layanan express ready dalam 3 jam!",
        "Pengalaman 10+ tahun melayani pelanggan."
    ];

    const services = [
        { 
            icon: "bx-basket", 
            title: "Reguler", 
            desc: "Cuci + Setrika", 
            color: "primary",
            time: "1-2 hari"
        },
        { 
            icon: "bx-time", 
            title: "Express", 
            desc: "Cuci Kilat", 
            color: "warning",
            time: "3-6 jam"
        },
        { 
            icon: "bx-droplet", 
            title: "Dry Clean", 
            desc: "Pakaian Premium", 
            color: "info",
            time: "2-3 hari"
        },
        { 
            icon: "bx-home", 
            title: "Antar Jemput", 
            desc: "Gratis Ongkir", 
            color: "success",
            time: "Fleksibel"
        }
    ];


    useEffect(() => {
        // initTooltip();
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 4000);
        
        return () => clearInterval(interval);
    }, []);

 
    useEffect(() => {
        const currentMessage = typedMessages[currentSlide];
        let index = 0;
        setTypedText('');
        setIsTyping(true);

        const typeInterval = setInterval(() => {
            if (index < currentMessage.length) {
                setTypedText(currentMessage.slice(0, index + 1));
                index++;
            } else {
                setIsTyping(false);
                clearInterval(typeInterval);
            }
        }, 50);

        return () => clearInterval(typeInterval);
    }, [currentSlide]);



    return (
        <section className="py-5 bg-white position-relative overflow-hidden min-vh-100 d-flex align-items-center" data-aos-duration="1200" data-aos="fade-down" id='hero'>
            
            
            <div className="container" style={{paddingTop: '50px'}}>
                <div className="row align-items-center">
                    <div className="col-md-6 mb-4 mb-md-0">
                    
                        <div className="d-flex flex-wrap gap-2" data-aos-duration="1000" data-aos-delay="600" data-aos="fade-up">
                            <span className="badge bg-primary mb-2 shadow px-3 rounded-pill py-2 fs-6">
                                <i className="bx bx-crown me-1"></i>
                                #1 Laundry Pilihan Warga
                            </span>
                        </div>

                        <h1 className="display-4 fw-bold mb-3" data-aos-duration="1000" data-aos-delay="500" data-aos="fade-up">
                            Layanan Laundry 
                            <span className="text-primary d-block">Terpercaya</span>
                        </h1>
                        
                   
                        <p className="lead text-dark mb-4" style={{ minHeight: '60px' }} data-aos-duration="1000" data-aos-delay="400" data-aos="fade-up">
                            {typedText}
                            {isTyping && <span className="text-primary">|</span>}
                        </p>

                     
                        <div className="row g-3 mb-4" data-aos-duration="1000" data-aos-delay="600" data-aos="fade-down">
                            {services.map((service, index) => (
                                <div key={index} className="col-6 col-lg-3" data-aos="fade-up" data-aos-delay={index * 100}>
                                    <div className={`card border-0 shadow h-100 bg-${service.color} bg-opacity-10 border-${service.color} border-2`}>
                                        <div className="card-body text-center p-3">
                                            <i className={`bx ${service.icon} fs-2 text-${service.color} mb-2`}></i>
                                            <h6 className="card-title fw-bold mb-1">{service.title}</h6>
                                            <p className="card-text small text-muted mb-1">{service.desc}</p>
                                            <small className={`badge bg-${service.color} bg-opacity-20 text-white ${service.color}`}>
                                                {service.time}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

               

                      
                        <div className="d-flex flex-wrap gap-3" data-aos-duration="1000"  data-aos="fade-up">
                            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="text-decoration-none" data-aos-delay="1000" data-aos="fade-down">
                                <button className="btn btn-success shadow-lg d-flex align-items-center btn-lg" data-bs-toggle="tooltip" title='Hubungi via WhatsApp'>
                                    <i className="bx bxl-whatsapp fs-5"></i>
                                    Hubungi via WhatsApp
                                </button>
                            </a>
                            <a href="./pages/guest/Harga" className="text-decoration-none">
                                <button className="btn btn-outline-primary shadow-lg d-flex align-items-center btn-lg" data-aos-delay="900" data-aos="fade-down" data-bs-toggle="tooltip" title='Lihat harga'>
                                    <i className="bx bx-money fs-5"></i>
                                    Lihat Harga
                                </button>
                            </a>
                        </div>
                    </div>

                  
                    <div className="col-md-6 text-center" data-aos-duration="1000" data-aos-delay="600" data-aos="fade-up">
                        <div className="card shadow-lg border-0">
                           
                            <div className="position-relative overflow-hidden rounded">
                                {heroImages.map((image, index) => (
                                    <img 
                                        key={index}
                                        src={image}
                                        className={`img-fluid w-100 position-absolute top-0 start-0 ${
                                            index === currentSlide ? 'opacity-100' : 'opacity-0'
                                        }`}
                                        alt={`Laundry Service ${index + 1}`}
                                        style={{ 
                                            height: '400px', 
                                            objectFit: 'cover',
                                            transition: 'opacity 0.5s ease-in-out'
                                        }}
                                    />
                                ))}
                                
                             
                                <img 
                                    src={heroImages[0]}
                                    className="img-fluid w-100 opacity-0"
                                    alt="Height Reference"
                                    style={{ height: '400px', objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;