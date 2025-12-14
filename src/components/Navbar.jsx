import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useAuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, loading } = useAuthContext();
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  if (loading) {
    return (
      <nav>
        <ul className={styles.lista}>
          <li className={styles.item}>Cargando...</li>
        </ul>
      </nav>
    );
  }

  return (
    <nav>
      <ul className={styles.lista}>
        <li className={styles.item}>
          <Link
            to="/"
            className={`${styles.link} ${isActive('/') ? styles.active : ''}`}
          >
            <span className={styles.linkInner}>
              <span className={styles.slice}></span>
              <span className={styles.linkText}>Inicio</span>
            </span>
          </Link>

          <Link
            to="/productos"
            className={`${styles.link} ${isActive('/productos') ? styles.active : ''}`}
          >
            <span className={styles.linkInner}>
              <span className={styles.slice}></span>
              <span className={styles.linkText}>Productos</span>
            </span>
          </Link>

          <Link
            to="/servicios"
            className={`${styles.link} ${isActive('/servicios') ? styles.active : ''}`}
          >
            <span className={styles.linkInner}>
              <span className={styles.slice}></span>
              <span className={styles.linkText}>Servicios de Reparación</span>
            </span>
          </Link>

          <Link
            to="/contacto"
            className={`${styles.link} ${isActive('/contacto') ? styles.active : ''}`}
          >
            <span className={styles.linkInner}>
              <span className={styles.slice}></span>
              <span className={styles.linkText}>Contacto</span>
            </span>
          </Link>

          {isAuthenticated && isAdmin && (
            <Link
              to="/admin"
              className={`${styles.link} ${isActive('/admin') ? styles.active : ''}`}
            >
              <span className={styles.linkInner}>
                <span className={styles.slice}></span>
                <span className={styles.linkText}>Admin</span>
              </span>
            </Link>
          )}

          {isAuthenticated && !isAdmin && (
            <Link
              to="/perfil"
              className={`${styles.link} ${isActive('/perfil') ? styles.active : ''}`}
            >
              <span className={styles.linkInner}>
                <span className={styles.slice}></span>
                <span className={styles.linkText}>Perfil</span>
              </span>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
