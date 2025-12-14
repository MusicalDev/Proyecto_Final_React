import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useCarritoContext } from '../context/CarritoContext';
import Confetti from 'react-confetti';
import styles from './Carrito.module.css';

const Carrito = () => {
  const { user, isAuthenticated } = useAuthContext();
  const {
    carrito,
    cantidadTotal,
    actualizarCantidad,
    eliminarDelCarrito,
    vaciarCarrito
  } = useCarritoContext();

  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const subtotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  const envio = subtotal > 50000 ? 0 : 3000;
  const total = subtotal + envio;

  const manejarActualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;

    const item = carrito.find(p => p.id === id);
    if (nuevaCantidad > item.stock) {
      setMensaje(`Solo hay ${item.stock} unidades disponibles`);
      setTimeout(() => setMensaje(''), 3000);
      return;
    }

    actualizarCantidad(id, nuevaCantidad);
  };

  const manejarEliminarProducto = (id) => {
    eliminarDelCarrito(id);
    setMensaje('Producto eliminado del carrito');
    setTimeout(() => setMensaje(''), 3000);
  };

  const manejarVaciarCarrito = () => {
    if (window.confirm('¿Estás seguro de que querés vaciar el carrito?')) {
      vaciarCarrito();
      setMensaje('Carrito vaciado');
      setTimeout(() => setMensaje(''), 3000);
    }
  };

  const procederAlPago = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setShowConfetti(true);

    setMensaje({
      tipo: "exito",
      texto: "🎉 ¡Compra exitosa! Nuestro equipo se estará comunicando contigo pronto."
    });


    setTimeout(() => setShowConfetti(false), 5000);

    vaciarCarrito();
  };

  return (
    <div className={styles.contenedor}>

      {/* CONFETTI */}
      {showConfetti && <Confetti />}

      {/* HERO */}
      <div className={styles.hero}>
        <div className={styles.logoContainer}>
          <svg width="120" height="120" viewBox="0 0 120 120" className={styles.carritoIcon}>
            <circle
              cx="60"
              cy="60"
              r="55"
              stroke="#ffca1a"
              strokeWidth="3"
              fill="none"
              className={styles.circuloExterior}
            />

            <circle cx="60" cy="60" r="50" fill="#0d1b2a" />

            <g className={styles.carritoBody}>
              <path
                d="M 35 45 L 40 70 L 80 70 L 85 45 Z"
                fill="none"
                stroke="#e0e1dd"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <line x1="40" y1="70" x2="80" y2="70" stroke="#e0e1dd" strokeWidth="3" strokeLinecap="round" />
              <path
                d="M 30 45 L 30 35 L 40 35"
                fill="none"
                stroke="#e0e1dd"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="48" cy="78" r="5" fill="#ffca1a" className={styles.rueda} />
              <circle cx="72" cy="78" r="5" fill="#ffca1a" className={styles.rueda} />
            </g>
          </svg>
        </div>
        <div className={styles.heroTexto}>
          <p>Mi Carrito</p>
        </div>
      </div>

      {mensaje && (
        <div
          className={`${styles.mensajeToast} ${mensaje.tipo === "exito" ? styles.exito : ""}`}
        >
          {mensaje.texto}
        </div>
      )}


      {carrito.length === 0 ? (
        <div className={styles.carritoVacio}>
          <svg className={styles.iconoVacio} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h2>Tu carrito está vacío</h2>
          <p>Agregá productos para comenzar tu compra</p>
          <Link to="/productos" className={styles.botonVolver}>
            Ver Productos
          </Link>
        </div>
      ) : (
        <div className={styles.carritoGrid}>
          <div className={styles.productosContainer}>
            <div className={styles.header}>
              <h2>Productos ({cantidadTotal})</h2>
              <button onClick={manejarVaciarCarrito} className={styles.botonVaciar}>
                Vaciar carrito
              </button>
            </div>

            {carrito.map(item => (
              <div key={item.id} className={styles.productoCard}>
                <img src={item.imagen} alt={item.nombre} className={styles.imagen} />

                <div className={styles.productoInfo}>
                  <h3>{item.nombre}</h3>
                  <p className={styles.precio}>${item.precio.toLocaleString('es-AR')}</p>
                  <p className={styles.stock}>Stock disponible: {item.stock}</p>
                </div>

                <div className={styles.cantidadControl}>
                  <button
                    onClick={() => manejarActualizarCantidad(item.id, item.cantidad - 1)}
                    className={styles.botonCantidad}
                    disabled={item.cantidad <= 1}
                  >
                    -
                  </button>
                  <span className={styles.cantidad}>{item.cantidad}</span>
                  <button
                    onClick={() => manejarActualizarCantidad(item.id, item.cantidad + 1)}
                    className={styles.botonCantidad}
                    disabled={item.cantidad >= item.stock}
                  >
                    +
                  </button>
                </div>

                <div className={styles.subtotalProducto}>
                  <p className={styles.labelSubtotal}>Subtotal</p>
                  <p className={styles.precioSubtotal}>
                    ${(item.precio * item.cantidad).toLocaleString('es-AR')}
                  </p>
                </div>

                <button
                  onClick={() => manejarEliminarProducto(item.id)}
                  className={styles.botonEliminar}
                  aria-label="Eliminar producto"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <div className={styles.resumenContainer}>
            <div className={styles.resumenCard}>
              <h2>Resumen de compra</h2>

              <div className={styles.resumenLinea}>
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString('es-AR')}</span>
              </div>

              <div className={styles.resumenLinea}>
                <span>Envío</span>
                <span className={envio === 0 ? styles.envioGratis : ''}>
                  {envio === 0 ? '¡Gratis!' : `$${envio.toLocaleString('es-AR')}`}
                </span>
              </div>

              {subtotal < 50000 && (
                <div className={styles.infoEnvio}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>Agregá ${(50000 - subtotal).toLocaleString('es-AR')} más para envío gratis</p>
                </div>
              )}

              <div className={styles.separador}></div>

              <div className={styles.totalLinea}>
                <span>Total</span>
                <span>${total.toLocaleString('es-AR')}</span>
              </div>

              <button onClick={procederAlPago} className={styles.botonCheckout}>
                {isAuthenticated ? 'Comprar' : 'Iniciar sesión para continuar'}
              </button>

              <Link to="/productos" className={styles.seguirComprando}>
                ← Seguir comprando
              </Link>
            </div>

            <div className={styles.metodosCard}>
              <h3>Métodos de pago</h3>
              <div className={styles.metodos}>
                <div className={styles.metodo}>
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 8H4V6h16m0 12H4v-6h16m0-8H4c-1.11 0-2 .89-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2z" />
                  </svg>
                  <span>Tarjetas</span>
                </div>
                <div className={styles.metodo}>
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
                  </svg>
                  <span>Efectivo</span>
                </div>
                <div className={styles.metodo}>
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 5v14c0 1.1.89 2 2 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z" />
                  </svg>
                  <span>Transferencia</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
