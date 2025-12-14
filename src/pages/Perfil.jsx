import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuthContext } from '../context/AuthContext';
import styles from '../pages/Perfil.module.css';

const Perfil = () => {
  const { user, loading } = useAuthContext();

  const [perfil, setPerfil] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (loading) return;
    if (!user) return;

    const obtenerPerfil = async () => {
      const { data } = await supabase
        .from('users_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      setPerfil(data);
      setCargando(false);
    };

    obtenerPerfil();
  }, [user, loading]);

  const manejarCambio = (campo, valor) => {
    setPerfil({ ...perfil, [campo]: valor });
  };

  const guardarCambios = async () => {
    setGuardando(true);
    setMensaje('');

    const { error } = await supabase
      .from('users_profiles')
      .update({
        nombre: perfil.nombre,
        telefono: perfil.telefono,
        direccion: perfil.direccion,
        actualizado_en: new Date().toISOString(),
      })
      .eq('id', user.id);

    setGuardando(false);

    if (error) {
      setMensaje('Error al actualizar el perfil');
    } else {
      setMensaje('¡Perfil actualizado exitosamente!');
      setTimeout(() => setMensaje(''), 3000);
    }
  };

  if (loading || cargando) {
    return (
      <div className={styles.contenedor}>
        <div className={styles.cargando}>
          <p>Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (!perfil) {
    return (
      <div className={styles.contenedor}>
        <div className={styles.error}>
          <p>No se encontró el perfil.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.contenedor}>

      <div className={styles.hero}>
        <div className={styles.logoContainer}>
          <svg width="120" height="120" viewBox="0 0 150 150">
            <path d="M75 7 A68 68 0 0 1 143 75L7 75A68 68 0 0 1 75 7Z" fill="#0d1b2a" />
            <path d="M75 143A68 68 0 0 1 7 75L143 75A68 68 0 0 1 75 143Z" fill="#0d1b2a" />
            <circle cx="75" cy="75" r="68" stroke="#ffca1a" strokeWidth="4" fill="none" />
            <text x="50%" y="45%" textAnchor="middle" fontFamily="Fugaz One, sans-serif" fontSize="30" fill="#e0e1dd">Oboe</text>
            <text x="50%" y="65%" textAnchor="middle" fontFamily="Fugaz One, sans-serif" fontSize="28" fill="#e0e1dd">Store</text>
          </svg>
        </div>
        <div className={styles.heroTexto}>
          <p>MI PERFIL</p>
        </div>
      </div>

      <div className={styles.perfilGrid}>
        <div className={styles.infoCard}>
          <h2>Información de la Cuenta</h2>

          <div className={styles.infoItem}>
            <div className={styles.infoIcono}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h3>Email</h3>
              <p>{perfil.email}</p>
            </div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.infoIcono}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3>Miembro desde</h3>
              <p>{new Date(perfil.creado_en).toLocaleDateString('es-AR')}</p>
            </div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.infoIcono}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3>Última actualización</h3>
              <p>{new Date(perfil.actualizado_en).toLocaleDateString('es-AR')}</p>
            </div>
          </div>
        </div>

        <div className={styles.formularioCard}>
          <h2>Editar Perfil</h2>

          {mensaje && (
            <div className={mensaje.includes('Error') ? styles.error : styles.success}>
              {mensaje}
            </div>
          )}

          <form className={styles.form} onSubmit={(e) => { e.preventDefault(); guardarCambios(); }}>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input
                type="email"
                value={perfil.email}
                disabled
                className={`${styles.input} ${styles.inputDisabled}`}
              />
              <small className={styles.helpText}>El email no se puede modificar</small>
            </div>

            <div className={styles.formGroup}>
              <label>Nombre completo</label>
              <input
                type="text"
                value={perfil.nombre || ""}
                onChange={(e) => manejarCambio("nombre", e.target.value)}
                className={styles.input}
                placeholder="Ingresa tu nombre completo"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Teléfono</label>
              <input
                type="text"
                value={perfil.telefono || ""}
                onChange={(e) => manejarCambio("telefono", e.target.value)}
                className={styles.input}
                placeholder="Ej: +54 11 5555 5555"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Dirección</label>
              <input
                type="text"
                value={perfil.direccion || ""}
                onChange={(e) => manejarCambio("direccion", e.target.value)}
                className={styles.input}
                placeholder="Ej: Av. Siempre Viva 123"
              />
            </div>

            <button
              className={styles.submitButton}
              type="submit"
              disabled={guardando}
            >
              {guardando ? "Guardando..." : "Guardar Cambios"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Perfil;