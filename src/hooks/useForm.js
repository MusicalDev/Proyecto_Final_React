import { useState, useRef } from 'react';
import Swal from 'sweetalert2';

const useForm = (initialData, onValidate) => {
  const [form, setForm] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);
  const grecaptcha = useRef();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleRecaptchaChange = (value) => {
    setFormIsValid(!!value);
    setForm((prevForm) => ({ ...prevForm, grecaptcha: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const err = onValidate(form) || {};
    setErrors(err);
    
    if (Object.keys(err).length === 0 && formIsValid) {
      setLoading(true);
      fetch("https://formsubmit.co/ajax/music.d3v@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(form)
      })
        .then(response => response.json())
        .then(data => {
          if (data.success === "true") {
            Swal.fire({
              title: '¡Mensaje enviado!',
              text: 'Tu mensaje ha sido enviado correctamente. Te responderé pronto.',
              icon: 'success',
              confirmButtonColor: '#eab308',
              backdrop: 'rgba(55, 65, 81, 0.8)',
            }).then(() => {
              setForm(initialData);
              if (grecaptcha.current) {
                grecaptcha.current.reset();
              }
              setFormIsValid(false);
            });
          }
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al enviar el mensaje. Por favor intenta nuevamente.',
            icon: 'error',
            confirmButtonColor: '#eab308',
          });
          setLoading(false);
        });
    }
  };

  return { 
    form, 
    errors, 
    loading, 
    handleChange, 
    handleSubmit, 
    handleRecaptchaChange,
    grecaptcha 
  };
};

export default useForm;