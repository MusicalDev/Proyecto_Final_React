import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import BagIcon from '../assets/BagIcon';
import { useAuthContext } from '../context/AuthContext';
import { useCarritoContext } from '../context/CarritoContext';
import styles from './Header.module.css';
import CartIcon from '../assets/BagIcon';
import MobileMenu from './Menu';

const Header = () => {
  const { usuario, user, isAuthenticated, logout, loading } = useAuthContext();
  const { cantidadTotal } = useCarritoContext();
  const estaLogeado = !!isAuthenticated || !!usuario || !!user;

  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => setMenuAbierto(!menuAbierto);

  const [scrollDirection, setScrollDirection] = useState("up");

  useEffect(() => {
    let ultimoScroll = window.scrollY;

    const manejarScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > ultimoScroll && currentScroll > 70) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }

      ultimoScroll = currentScroll;
    };

    window.addEventListener("scroll", manejarScroll);
    return () => window.removeEventListener("scroll", manejarScroll);
  }, []);

  return (
    <header
      className={`${styles.headerCustom} ${scrollDirection === "down" ? styles.headerHidden : ""
        }`}
    >
      <nav className={`navbar navbar-expand-lg navbar-light  ${styles.navbarCustom}`}>


        <Link to="/" className={`${styles.logoCustom} navbar-brand d-flex align-items-center`}>
          <svg width="70" height="70" viewBox="0 0 150 150">
            <path d="M75 7 A68 68 0 0 1 143 75L7 75A68 68 0 0 1 75 7Z" fill="#0d1b2a" />
            <path d="M75 143A68 68 0 0 1 7 75L143 75A68 68 0 0 1 75 143Z" fill="#0d1b2a" />
            <circle cx="75" cy="75" r="68" stroke="#ffca1a" strokeWidth="4" fill="none" />
            <text x="50%" y="45%" textAnchor="middle" fontFamily="Fugaz One, sans-serif" fontSize="30" fill="#e0e1dd">Oboe</text>
            <text x="50%" y="65%" textAnchor="middle" fontFamily="Fugaz One, sans-serif" fontSize="28" fill="#e0e1dd">Store</text>
          </svg>
        </Link>


        <MobileMenu
          contadorEnCarrito={cantidadTotal}
          logout={logout}
        />


        <div className="collapse navbar-collapse" id="menuPrincipal">

          <div className={styles.navbar}>
            <Navbar />
          </div>

          <div
            className={`d-flex align-items-center ms-auto flex-column flex-md-row gap-3 text-center mt-3 mt-md-0 ${styles.rightIcons}`}
          >

            {loading ? (
              <span className={styles.linkText}>Cargando...</span>
            ) : estaLogeado ? (

              <button
                onClick={logout}
                className={styles.link}
                style={{ cursor: "pointer", border: "none", background: "none" }}
                aria-label="Cerrar sesión"
              >
                <span className={styles.linkInner}>
                  <span className={styles.slice}></span>
                  <span className={styles.linkText}>Cerrar Sesión</span>
                </span>
              </button>
            ) : (

              <Link to="/login" className={styles.link}>
                <span className={styles.linkInner}>
                  <span className={styles.slice}></span>
                  <span className={styles.linkText}>Ingresá</span>
                </span>
              </Link>
            )}

            <Link to="/carrito" className={styles.iconoDeCarritoCustom}>
              <CartIcon
                className={styles.iconoCarrito}
                style={{ width: 30, height: 30 }}
              />
              {cantidadTotal > 0 && (
                <span className={styles.contadorDeCarritoCustom}>
                  {cantidadTotal}
                </span>
              )}
            </Link>

          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;