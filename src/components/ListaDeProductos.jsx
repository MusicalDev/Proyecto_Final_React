import { useState, useEffect } from "react";
import { useCarritoContext } from "../context/CarritoContext";
import { useAuthContext } from "../context/AuthContext";
import { supabase } from "../supabaseClient";
import styles from "./ListaDeProductos.module.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListaDeProductos = () => {
  const [productos, setProductos] = useState([]);
  const [resultado, setResultado] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [productoActivo, setProductoActivo] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const { agregarAlCarrito } = useCarritoContext();

  const { isAuthenticated, isAdmin } = useAuthContext();

  useEffect(() => {
    const cargarProductos = async () => {
      const { data, error } = await supabase.from("products").select("*");

      if (error) setError("Error al cargar productos");
      else {
        setProductos(data);
        setResultado(data);
      }

      setCargando(false);
    };

    cargarProductos();
  }, []);

  const buscarProductos = () => {
    if (busqueda.trim() === "") {
      setResultado(productos);
      return;
    }

    const texto = busqueda.toLowerCase();

    const filtrados = productos.filter(
      (p) =>
        p.name.toLowerCase().includes(texto) ||
        p.description?.toLowerCase().includes(texto) ||
        p.category?.toLowerCase().includes(texto)
    );

    setResultado(filtrados);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") buscarProductos();
  };

  const SkeletonCard = () => (
    <div className={styles.skeletonItem}>
      <div className={styles.skeletonSeccionImagen}>
        <div className={styles.skeletonImagen}></div>
      </div>
      <div className={styles.skeletonContenido}>
        <div className={styles.skeletonLinea}></div>
        <div className={styles.skeletonLineaCorta}></div>
        <div className={styles.skeletonBotones}>
          <div className={styles.skeletonBoton}></div>
          <div className={styles.skeletonBoton}></div>
        </div>
      </div>
    </div>
  );

  if (cargando) {
    return (
      <div className={styles.contenedor}>
        <h2 className={styles.titulo}>Cargando productos...</h2>
        <div className={styles.lista}>
          {[...Array(6)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.contenedor}>
        <div className={styles.errorMensaje}>
          <h3>{error}</h3>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.contenedor}>
      <div className={styles.hero}>
        <img
          src="banner-oboe.webp"
          alt="Luthier reparando un oboe"
          className={styles.heroImagen}
        />
        <div className={styles.heroTexto}>
          <h1>Productos</h1>
          <p>Explora nuestros instrumentos y accesorios.</p>
        </div>
      </div>

      <div className={styles.buscadorCaja}>
        <input
          type="text"
          className={styles.buscadorInput}
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          onKeyDown={handleEnter}
        />

        <button className={styles.buscadorBoton} onClick={buscarProductos}>
          Buscar
        </button>

        {busqueda !== "" && (
          <button
            className={styles.buscadorLimpiar}
            onClick={() => {
              setBusqueda("");
              setResultado(productos);
            }}
          >
            Limpiar
          </button>
        )}
      </div>

      <ul className={styles.lista}>
        {resultado.map((producto) => (
          <li key={producto.id} className={styles.item}>
            <div className={styles.seccionImagen}>
              <img
                src={producto.imageURL}
                alt={producto.name}
                className={styles.imagen}
              />
            </div>

            <div className={styles.contenido}>
              <div className={styles.nombre}>{producto.name}</div>
              <div className={styles.precio}>${producto.price}</div>

              <div className={styles.botones}>
                <button
                  className={styles.botonAgregar}
                  onClick={() => {
                    if (!isAuthenticated) {
                      toast.error("Debes iniciar sesión para comprar.");
                      return;
                    }

                    if (isAdmin) {
                      toast.error("Los administradores no pueden comprar.");
                      return;
                    }

                    agregarAlCarrito(
                      {
                        id: producto.id,
                        nombre: producto.name,
                        precio: producto.price,
                        imagen: producto.imageURL,
                        stock: producto.stock || 10,
                        descripcion: producto.description,
                      },
                      1
                    );

                    toast.success("Producto agregado al carrito 🛒");
                  }}
                >
                  Comprar
                </button>

                <button
                  className={styles.detalleLink}
                  onClick={() => setProductoActivo(producto)}
                >
                  + Info
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {productoActivo && (
        <div className={styles.modalFondo}>
          <div className={styles.modalCaja}>
            <button
              className={styles.modalCerrar}
              onClick={() => setProductoActivo(null)}
            >
              ✕
            </button>

            <img
              src={productoActivo.imageURL}
              alt={productoActivo.name}
              className={styles.modalImagen}
            />

            <h2>{productoActivo.name}</h2>
            <p>{productoActivo.description}</p>
            <h3>${productoActivo.price}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaDeProductos;
