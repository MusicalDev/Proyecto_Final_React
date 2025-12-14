import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Carousel.module.css';

export default function CarouselFade() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  const slides = [
    {
      title: "Nuestros Productos",
      description: "Instrumentos nuevos y accesorios para el oboe",
      image: "https://fdqedteopboxusmyslza.supabase.co/storage/v1/object/public/oboe-shop-images/oboes.jpg",
      link: "/productos"
    },
    {
      title: "Servicios de  luthería",
      description: "Ofrecemos servicios de mantenimientos y reparación",
      image: "https://fdqedteopboxusmyslza.supabase.co/storage/v1/object/public/oboe-shop-images/123305906_113191937136835_8536543593333082451_n.jpg",
      link: "/servicios"
    },
    {
      title: "Contáctanos",
      description: "Estamos aquí para ayudarte",
      image: "https://fdqedteopboxusmyslza.supabase.co/storage/v1/object/public/oboe-shop-images/gilles-gravier-xebABdbf3us-unsplash.jpg",
      link: "/contacto"
    }
  ];

  const handleSlideClick = () => {
    if (!isTransitioning) {
      navigate(slides[currentSlide].link);
    }
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  // Auto-play
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className={styles.carouselContainer}>

      <div className={styles.carouselInner}>

        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`${styles.carouselItem} ${index === currentSlide ? styles.active : styles.inactive
              }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              cursor: 'pointer'
            }}
            onClick={handleSlideClick}
          >
            <div className={styles.overlay}></div>

            <div className={styles.caption}>
              <h3 className={styles.captionTitle}>
                {slide.title}
              </h3>
              <p className={styles.captionDescription}>
                {slide.description}
              </p>
              <span className={styles.clickIndicator}>Haz click para ver más →</span>
            </div>
          </div>
        ))}

      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        disabled={isTransitioning}
        className={`${styles.control} ${styles.controlPrev}`}
        aria-label="Anterior"
      >
        <span className={styles.arrow}>‹</span>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        disabled={isTransitioning}
        className={`${styles.control} ${styles.controlNext}`}
        aria-label="Siguiente"
      >
        <span className={styles.arrow}>›</span>
      </button>

      <div className={styles.indicators}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentSlide(index);
                setTimeout(() => setIsTransitioning(false), 600);
              }
            }}
            className={`${styles.indicator} ${index === currentSlide ? styles.indicatorActive : ''
              }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
