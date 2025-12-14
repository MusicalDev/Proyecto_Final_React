import { useState } from "react";
import { supabase } from "../supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Registro.module.css";

const Registro = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    nombre: "",
    telefono: "",
    direccion: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const manejarCambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      const user = data.user;

      if (!user) {
        alert("Cuenta creada! Revisá tu email para confirmar la cuenta antes de iniciar sesión.");
        setLoading(false);
        navigate("/login");
        return;
      }

      const { error: profileError } = await supabase
        .from("users_profiles")
        .update({
          nombre: form.nombre,
          telefono: form.telefono,
          direccion: form.direccion,
          actualizado_en: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (profileError) {
        console.error("Error al actualizar perfil:", profileError);
        setError("Error al actualizar el perfil: " + profileError.message);
        setLoading(false);
        return;
      }
      alert("Cuenta creada con éxito. Bienvenido/a!");
      setLoading(false);

      navigate("/perfil");

    } catch (err) {
      console.error("Error en registro:", err);
      setError("Ocurrió un error inesperado. Intenta nuevamente.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.contenedor}>
      <div className={styles.hero}>
        <div className={styles.heroTexto}>
          <h1>Crear Cuenta</h1>
          <p>Registrate para acceder al panel</p>
        </div>
      </div>

      <div className={styles.formularioCard}>
        <h2>Registro</h2>

        {error && <div className={styles.error}>{error}</div>}

        <form className={styles.form} onSubmit={manejarSubmit}>
          <div className={styles.formGroup}>
            <label>Email *</label>
            <input
              type="email"
              name="email"
              placeholder="ej: usuario@mail.com"
              value={form.email}
              onChange={manejarCambio}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Contraseña *</label>
            <input
              type="password"
              name="password"
              placeholder="mínimo 6 caracteres"
              value={form.password}
              onChange={manejarCambio}
              className={styles.input}
              required
              minLength={6}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Nombre completo</label>
            <input
              type="text"
              name="nombre"
              placeholder="Ej: Juan Pérez"
              value={form.nombre}
              onChange={manejarCambio}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Teléfono</label>
            <input
              type="text"
              name="telefono"
              placeholder="Ej: +54 11 5555 5555"
              value={form.telefono}
              onChange={manejarCambio}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Dirección</label>
            <input
              type="text"
              name="direccion"
              placeholder="Ej: Av. Siempre Viva 123"
              value={form.direccion}
              onChange={manejarCambio}
              className={styles.input}
            />
          </div>

          <button
            className={styles.submitButton}
            type="submit"
            disabled={loading}
          >
            {loading ? "Creando cuenta..." : "Registrarse"}
          </button>
        </form>

        <p className={styles.registro}>
          ¿Ya tenés una cuenta?{" "}
          <Link to="/login" className={styles.registroLink}>
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registro;