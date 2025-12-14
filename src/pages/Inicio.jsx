import Carousel from '../components/Carousel';
import styles from './Inicio.module.css';

const noticias = [
  {
    id: 1,
    imagen: 'caña.webp', 
    texto: 'Nueva línea de cañas para oboe profesional disponible a partir de este mes.'
  },
  {
    id: 2,
    imagen: 'lutheria.webp',
    texto: 'Nuestro luthier estrella dará un taller de mantenimiento de oboes en París.'
  },
  {
    id: 3,
    imagen: 'oboecrack.webp',
    texto: 'Consejos para cuidar tu oboe durante los cambios de estación.'
  }
];

const Inicio = () => {
  return (
    <>
      <Carousel />

      <section className={styles.container}>
        <h1 className={styles.title}>Bienvenidos</h1>

        <p className={styles.paragraph}>
          En Oboe Store compartimos una pasión: el oboe. Desde hace años nos dedicamos a ofrecer a músicos y entusiastas del instrumento lo mejor en <strong>oboes, accesorios y servicios de luthería</strong>, con la calidad que cualquier profesional espera.
        </p>

        <p className={styles.paragraph}>
          Nuestro equipo está compuesto por expertos en el cuidado y mantenimiento del oboe, con experiencia en <strong>reparación, regulación y personalización</strong> de cada instrumento. Sabemos que cada detalle cuenta, por eso seleccionamos <strong>productos de primera calidad</strong>, provenientes de fabricantes confiables y cuidadosamente revisados por nosotros antes de llegar a tus manos.
        </p>

        <p className={styles.paragraph}>
          Ya seas músico profesional, estudiante o amante del oboe, en Oboe Store encontrarás <strong>instrumentos y accesorios que garantizan un rendimiento excepcional</strong>, además de un servicio personalizado que te acompaña en cada etapa de tu experiencia musical.
        </p>

        <p className={styles.paragraph}>
          <strong>Confianza, calidad y pasión por la música:</strong> esa es nuestra promesa.
        </p>
      </section>

      {/* Sección de Noticias */}
      <section className={styles.newsSection}>
        <h2 className={styles.newsTitle}>Últimas Novedades</h2>
        <div className={styles.newsContainer}>
          {noticias.map(noticia => (
            <div key={noticia.id} className={styles.newsCard}>
              <img src={noticia.imagen} alt="Noticia" className={styles.newsImage} />
              <p className={styles.newsText}>{noticia.texto}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Inicio;
