import { useState, useEffect } from 'react';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.pageYOffset > 300);
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="btn btn-primary position-fixed shadow border-0"
            style={{
                bottom: '30px',
                right: '30px',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                zIndex: 1050,
                transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
            }}
            title="Kembali ke atas"
            aria-label="Scroll to top"
        >
            <i className="bx bx-chevron-up fs-4 text-white"></i>
        </button>
    );
};

export default ScrollToTop;
