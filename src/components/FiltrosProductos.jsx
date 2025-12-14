import { useState } from "react";
import styles from "../components/ListaDeProductos.module.css";

const FiltrosProductos = ({ onBuscar }) => {
  const [texto, setTexto] = useState("");

  const hacerBusqueda = () => {
    onBuscar(texto.trim());
  };

  return (
    <aside className={styles.filtrosContainer}>
      <h3 className={styles.filtrosTitulo}>Buscar productos</h3>

      <div className={styles.filtrosBox}>
        <input
          type="text"
          value={texto}
          placeholder="Buscar por nombre, categoría..."
          onChange={(e) => setTexto(e.target.value)}
          className={styles.inputBuscar}
        />

        <button onClick={hacerBusqueda} className={styles.botonBuscar}>
          Buscar
        </button>
      </div>
    </aside>
  );
};

export default FiltrosProductos;

