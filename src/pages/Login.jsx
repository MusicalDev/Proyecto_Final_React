import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const { login, isAdmin } = useAuthContext();
  const [form, setForm] = useState({ email: "", password: "" });
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

    const result = await login(form.email, form.password);

    if (!result.success) {
      setError(result.error);
      setLoading(false);
      return;
    }

    if (result.isAdmin) {
      navigate("/admin");
    } else {
      navigate("/perfil");
    }

    setLoading(false);
  };

  return (
    <div className={styles.contenedor}>
      <div className={styles.hero}>
        <div className={styles.heroTexto}>
          <h1>Iniciar Sesión</h1>
          <p>Accedé a tu cuenta</p>
        </div>
      </div>

      <div className={styles.formularioCard}>
        <h2>Login</h2>

        {error && <div className={styles.error}>{error}</div>}

        <form className={styles.form} onSubmit={manejarSubmit}>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              placeholder="Crea un cuenta o usa las credenciales del README"
              type="email"
              name="email"
              value={form.email}
              onChange={manejarCambio}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Contraseña</label>
            <input
              placeholder="Crea un cuenta o usa las credenciales del README"
              type="password"
              name="password"
              value={form.password}
              onChange={manejarCambio}
              className={styles.input}
              required
            />
          </div>

          <button className={styles.submitButton} disabled={loading}>
            {loading ? "Ingresando..." : "Iniciar Sesión"}
          </button>
        </form>

        <p className={styles.registro}>
          ¿No tenés cuenta?
          <Link to="/registro" className={styles.registroLink}>
            Crear cuenta
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
