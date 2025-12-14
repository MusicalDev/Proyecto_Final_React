import styles from "./Servicios.module.css";
import { useNavigate } from "react-router-dom";

const Servicios = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.contenedor}>

      <div className={styles.hero}>
        <img
          src="banner.webp"
          alt="Luthier reparando un oboe"
          className={styles.heroImagen}
        />
        <div className={styles.heroTexto}>
          <h1>Servicios de Luthería para Oboe</h1>
          <p>Cuidado profesional, precisión y dedicación para tu instrumento.</p>
        </div>
      </div>

      <section className={styles.descripcion}>
        <h2>Especialistas en mantenimiento y reparación de oboe</h2>
        <p>
          Con años de experiencia trabajando con oboes profesionales, de estudio y corno inglés,
          ofrecemos un servicio de luthería especializado que garantiza el mejor rendimiento de tu instrumento.
          Cada ajuste se realiza con precisión, utilizando materiales de alta calidad y conocimientos técnicos
          propios del mundo del oboe.
        </p>
      </section>

      <section className={styles.servicios}>
        <h2>Servicios que ofrecemos</h2>

        <ul className={styles.lista}>
          <li>
            <h3>Ajuste completo del instrumento</h3>
            <p>
              Regulación total de las llaves, revisión de mecanismos, hermeticidad y limpieza interna.
            </p>
          </li>

          <li>
            <h3>Cambio y ajuste de zapatillas</h3>
            <p>
              Instalación de zapatillas de piel o sintéticas, alineación de llaves y estanqueidad garantizada.
            </p>
          </li>

          <li>
            <h3>Mantenimiento preventivo</h3>
            <p>
              Limpieza de cuerpo, engrase de mecanismos, ajuste fino y revisión general del instrumento.
            </p>
          </li>

          <li>
            <h3>Reparaciones estructurales</h3>
            <p>
              Reparación de grietas, reemplazo de corchos, tornillos y piezas dañadas.
            </p>
          </li>

          <li>
            <h3>Overhaul completo</h3>
            <p>
              Servicio profundo que incluye desmontaje total, limpieza, pulido, ajuste y reemplazo integral de zapatillas.
            </p>
          </li>

          <li>
            <h3>Servicio para Corno Inglés</h3>
            <p>
              Ajustes, mantenimiento y reparaciones específicas para corno inglés.
            </p>
          </li>
        </ul>
      </section>

      <section className={styles.contactoCTA}>
        <h2>Comunicate con nuestros especialistas</h2>

        <button
          className={styles.contactoBoton}
          onClick={() => navigate("/contacto")}
        >
          Ir a Contacto
        </button>
      </section>

    </div>
  );
};

export default Servicios;
