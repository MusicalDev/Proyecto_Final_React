// src/pages/Contact/Contact.jsx
import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import useForm from '../hooks/useForm';
import styles from './Contacto.module.css';


const Contact = () => {
  const initialData = {
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    message: '',
    grecaptcha: '',
  };

  const onValidate = (form) => {
    let errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    let regexComments = /^.{1,255}$/;
    let regexPhone = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/;

    if (!form.firstname.trim()) {
      errors.firstname = 'El nombre es requerido';
    } else if (!regexName.test(form.firstname)) {
      errors.firstname = 'El nombre solo acepta letras y espacios';
    }

    if (!form.lastname.trim()) {
      errors.lastname = 'El apellido es requerido';
    } else if (!regexName.test(form.lastname)) {
      errors.lastname = 'El apellido solo acepta letras y espacios';
    }

    if (!form.phone.trim()) {
      errors.phone = 'El teléfono es requerido';
    } else if (!regexPhone.test(form.phone)) {
      errors.phone = 'El formato del teléfono no es válido';
    }

    if (!form.email.trim()) {
      errors.email = 'El email es requerido';
    } else if (!regexEmail.test(form.email)) {
      errors.email = 'El formato del email no es válido';
    }

    if (!form.message.trim()) {
      errors.message = 'El mensaje es requerido';
    } else if (!regexComments.test(form.message)) {
      errors.message = 'El mensaje debe tener entre 1 y 255 caracteres';
    }

    if (!form.grecaptcha) {
      errors.grecaptcha = 'Por favor completa el captcha';
    }

    return errors;
  };

  const {
    form,
    errors,
    loading,
    handleChange,
    handleSubmit,
    handleRecaptchaChange,
    grecaptcha,
  } = useForm(initialData, onValidate);

  return (
    <div className={styles.contenedor}>
      <section className={styles.hero}>
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
          <p>Estamos para ayudarte</p>
        </div>
      </section>

      <section className={styles.descripcion}>
        <h2>Hablemos de tu proyecto</h2>
        <p>
          ¿Tienes una idea en mente? ¿Necesitas ayuda con tu proyecto? 
          Completa el formulario y me pondré en contacto contigo lo antes posible.
        </p>
      </section>

      <div className={styles.contactoGrid}>
        <div className={styles.formularioCard}>
          <h2>Envía un mensaje</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="firstname">Nombre</label>
              <input
                id="firstname"
                placeholder="Tu nombre"
                type="text"
                name="firstname"
                value={form.firstname}
                autoComplete="given-name"
                onChange={handleChange}
                className={styles.input}
              />
              {errors.firstname && (
                <div className={styles.error} role="alert">
                  <span><em>{errors.firstname}</em></span>
                </div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="lastname">Apellido</label>
              <input
                id="lastname"
                placeholder="Tu apellido"
                type="text"
                name="lastname"
                value={form.lastname}
                autoComplete="family-name"
                onChange={handleChange}
                className={styles.input}
              />
              {errors.lastname && (
                <div className={styles.error} role="alert">
                  <span><em>{errors.lastname}</em></span>
                </div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">Teléfono</label>
              <input
                id="phone"
                placeholder="Tu teléfono"
                type="text"
                name="phone"
                value={form.phone}
                autoComplete="tel"
                onChange={handleChange}
                className={styles.input}
              />
              {errors.phone && (
                <div className={styles.error} role="alert">
                  <span><em>{errors.phone}</em></span>
                </div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                placeholder="tu@email.com"
                type="email"
                name="email"
                value={form.email}
                autoComplete="email"
                onChange={handleChange}
                className={styles.input}
              />
              {errors.email && (
                <div className={styles.error} role="alert">
                  <span><em>{errors.email}</em></span>
                </div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                placeholder="Cuéntame sobre tu proyecto..."
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                className={styles.textarea}
              />
              {errors.message && (
                <div className={styles.error} role="alert">
                  <span><em>{errors.message}</em></span>
                </div>
              )}
            </div>

            <div className={styles.recaptchaWrapper}>
              <ReCAPTCHA
                name="grecaptcha"
                hl="es"
                value={form.grecaptcha}
                onChange={handleRecaptchaChange}
                ref={grecaptcha}
                sitekey="6LfmSiYsAAAAAOUN6sC2aLxUWClxlo-zx16lBCpY"
              />
              {errors.grecaptcha && (
                <div className={styles.error} role="alert">
                  <span><em>{errors.grecaptcha}</em></span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </form>
        </div>

        <div className={styles.infoCard}>
          <h2>Información de contacto</h2>
          
          <div className={styles.infoItem}>
            <div className={styles.infoIcono}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>
            <div>
              <h3>Nombre</h3>
              <p>Musical Dev</p>
            </div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.infoIcono}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <div>
              <h3>Email</h3>
              <p>music.d3v@gmail.com
</p>
            </div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.infoIcono}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <div>
              <h3>Tiempo de respuesta</h3>
              <p>24-48 horas hábiles</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;