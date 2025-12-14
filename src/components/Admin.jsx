
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import styles from "./Admin.module.css";

const Admin = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  const [nuevoProducto, setNuevoProducto] = useState({
    name: "",
    description: "",
    price: "",
    imageURL: "",
    category: ""
  });

  const [productoEditando, setProductoEditando] = useState(null);
  const [productoEditado, setProductoEditado] = useState({
    name: "",
    description: "",
    price: "",
    imageURL: "",
    category: ""
  });

  const [imagenArchivo, setImagenArchivo] = useState(null);
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [previsualizacion, setPrevisualizacion] = useState(null);

  const [imagenArchivoEdit, setImagenArchivoEdit] = useState(null);
  const [previsualizacionEdit, setPrevisualizacionEdit] = useState(null);
  const [subiendoImagenEdit, setSubiendoImagenEdit] = useState(false);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    setCargando(true);
    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      setError("Error al cargar productos");
      console.error(error);
    } else {
      setProductos(data);
    }
    setCargando(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInputChangeEdit = (e) => {
    const { name, value } = e.target;
    setProductoEditado(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleImagenChange = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {

      if (!archivo.type.startsWith('image/')) {
        setMensaje({ tipo: "error", texto: "Por favor selecciona un archivo de imagen válido" });
        return;
      }

      if (archivo.size > 5 * 1024 * 1024) {
        setMensaje({ tipo: "error", texto: "La imagen no debe superar los 5MB" });
        return;
      }

      setImagenArchivo(archivo);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPrevisualizacion(reader.result);
      };
      reader.readAsDataURL(archivo);
    }
  };

  const handleImagenChangeEdit = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      // Validar que sea una imagen
      if (!archivo.type.startsWith('image/')) {
        setMensaje({ tipo: "error", texto: "Por favor selecciona un archivo de imagen válido" });
        return;
      }

      if (archivo.size > 5 * 1024 * 1024) {
        setMensaje({ tipo: "error", texto: "La imagen no debe superar los 5MB" });
        return;
      }

      setImagenArchivoEdit(archivo);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPrevisualizacionEdit(reader.result);
      };
      reader.readAsDataURL(archivo);
    }
  };

  const subirImagen = async (archivo) => {
    if (!archivo) return null;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      console.log('Usuario actual:', user);

      if (!user) {
        console.error('No hay usuario autenticado');
        setMensaje({ tipo: "error", texto: "Debes iniciar sesión para subir imágenes" });
        return null;
      }

      const extension = archivo.name.split('.').pop();
      const nombreArchivo = `${Date.now()}-${Math.random().toString(36).substring(7)}.${extension}`;

      const { data, error } = await supabase.storage
        .from('oboe-shop-images')
        .upload(nombreArchivo, archivo, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('oboe-shop-images')
        .getPublicUrl(nombreArchivo);

      return publicUrl;

    } catch (error) {
      console.error('Error al subir imagen:', error);
      setMensaje({ tipo: "error", texto: "Error al subir la imagen" });
      return null;
    }
  };

  const handleAgregarProducto = async (e) => {
    e.preventDefault();

    if (!nuevoProducto.name || !nuevoProducto.price || !imagenArchivo) {
      setMensaje({ tipo: "error", texto: "Por favor completa los campos obligatorios y selecciona una imagen" });
      return;
    }

    setSubiendoImagen(true);
    const imageURL = await subirImagen(imagenArchivo);
    setSubiendoImagen(false);

    if (!imageURL) {
      setMensaje({ tipo: "error", texto: "No se pudo subir la imagen" });
      return;
    }

    const { data, error } = await supabase
      .from("products")
      .insert([{
        name: nuevoProducto.name,
        description: nuevoProducto.description,
        price: parseFloat(nuevoProducto.price),
        imageURL: imageURL,
        category: nuevoProducto.category
      }])
      .select();

    if (error) {
      setMensaje({ tipo: "error", texto: "Error al agregar producto" });
      console.error(error);
    } else {
      setMensaje({ tipo: "exito", texto: "Producto agregado exitosamente" });
      setNuevoProducto({
        name: "",
        description: "",
        price: "",
        imageURL: "",
        category: ""
      });
      setImagenArchivo(null);
      setPrevisualizacion(null);
      cargarProductos();

      setTimeout(() => setMensaje(null), 3000);
    }
  };

  const handleEditarClick = (producto) => {
    setProductoEditando(producto.id);
    setProductoEditado({
      name: producto.name,
      description: producto.description || "",
      price: producto.price.toString(),
      imageURL: producto.imageURL,
      category: producto.category || ""
    });
    setPrevisualizacionEdit(producto.imageURL);
    setImagenArchivoEdit(null);
  };


  const handleCancelarEdicion = () => {
    setProductoEditando(null);
    setProductoEditado({
      name: "",
      description: "",
      price: "",
      imageURL: "",
      category: ""
    });
    setImagenArchivoEdit(null);
    setPrevisualizacionEdit(null);
  };


  const handleGuardarEdicion = async (e) => {
    e.preventDefault();


    if (!productoEditado.name || !productoEditado.price) {
      setMensaje({ tipo: "error", texto: "Por favor completa los campos obligatorios" });
      return;
    }

    let imageURL = productoEditado.imageURL;


    if (imagenArchivoEdit) {
      setSubiendoImagenEdit(true);
      imageURL = await subirImagen(imagenArchivoEdit);
      setSubiendoImagenEdit(false);

      if (!imageURL) {
        setMensaje({ tipo: "error", texto: "No se pudo subir la nueva imagen" });
        return;
      }
    }


    const { error } = await supabase
      .from("products")
      .update({
        name: productoEditado.name,
        description: productoEditado.description,
        price: parseFloat(productoEditado.price),
        imageURL: imageURL,
        category: productoEditado.category
      })
      .eq("id", productoEditando);

    if (error) {
      setMensaje({ tipo: "error", texto: "Error al actualizar producto" });
      console.error(error);
    } else {
      setMensaje({ tipo: "exito", texto: "Producto actualizado exitosamente" });
      handleCancelarEdicion();
      cargarProductos();

      setTimeout(() => setMensaje(null), 3000);
    }
  };


  const handleEliminarProducto = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      return;
    }

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      setMensaje({ tipo: "error", texto: "Error al eliminar producto" });
      console.error(error);
    } else {
      setMensaje({ tipo: "exito", texto: "Producto eliminado exitosamente" });
      cargarProductos();

      setTimeout(() => setMensaje(null), 3000);
    }
  };

  return (
    <div className={styles.contenedor}>

      <div className={styles.hero}>
        <div className={styles.heroTexto}>
          <h1>Panel de Administración</h1>
          <p>Gestiona tus productos</p>
        </div>
      </div>


      {mensaje && (
        <div className={mensaje.tipo === "exito" ? styles.mensajeExito : styles.mensajeError}>
          {mensaje.texto}
        </div>
      )}


      <div className={styles.adminGrid}>

        <div className={styles.formularioCard}>
          <h2>Agregar Producto</h2>
          <div className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Nombre *</label>
              <input
                type="text"
                id="name"
                name="name"
                className={styles.input}
                value={nuevoProducto.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                name="description"
                className={styles.textarea}
                value={nuevoProducto.description}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="price">Precio *</label>
              <input
                type="number"
                id="price"
                name="price"
                className={styles.input}
                step="0.01"
                min="0"
                value={nuevoProducto.price}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="imageFile">Imagen del Producto *</label>
              <input
                type="file"
                id="imageFile"
                name="imageFile"
                className={styles.inputFile}
                accept="image/*"
                onChange={handleImagenChange}
                required
              />
              {previsualizacion && (
                <div className={styles.previsualizacionContainer}>
                  <img
                    src={previsualizacion}
                    alt="Previsualización"
                    className={styles.previsualizacion}
                  />
                </div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="category">Categoría</label>
              <input
                type="text"
                id="category"
                name="category"
                className={styles.input}
                value={nuevoProducto.category}
                onChange={handleInputChange}
              />
            </div>

            <button
              onClick={handleAgregarProducto}
              className={styles.submitButton}
              disabled={subiendoImagen}
            >
              {subiendoImagen ? "Subiendo imagen..." : "Agregar Producto"}
            </button>
          </div>
        </div>

        <div className={styles.productosCard}>
          <h2>Productos Actuales ({productos.length})</h2>

          {cargando ? (
            <div className={styles.cargandoTexto}>Cargando productos...</div>
          ) : productos.length === 0 ? (
            <div className={styles.sinProductos}>No hay productos registrados</div>
          ) : (
            <div className={styles.listaProductos}>
              {productos.map((producto) => (
                <div key={producto.id}>
                  <div className={styles.productoItem}>
                    <img
                      src={producto.imageURL}
                      alt={producto.name}
                      className={styles.productoImagen}
                    />
                    <div className={styles.productoInfo}>
                      <h3>{producto.name}</h3>
                      <p className={styles.productoPrecio}>${producto.price}</p>
                      {producto.category && (
                        <p className={styles.productoCategoria}>{producto.category}</p>
                      )}
                    </div>
                    <div className={styles.botonesAccion}>
                      <button
                        className={styles.botonEditar}
                        onClick={() => handleEditarClick(producto)}
                      >
                        Editar
                      </button>
                      <button
                        className={styles.botonEliminar}
                        onClick={() => handleEliminarProducto(producto.id)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  {productoEditando === producto.id && (
                    <div className={styles.formularioEdicion}>
                      <h3>Editar Producto</h3>
                      <div className={styles.form}>
                        <div className={styles.formGroup}>
                          <label htmlFor={`edit-name-${producto.id}`}>Nombre *</label>
                          <input
                            type="text"
                            id={`edit-name-${producto.id}`}
                            name="name"
                            className={styles.input}
                            value={productoEditado.name}
                            onChange={handleInputChangeEdit}
                            required
                          />
                        </div>

                        <div className={styles.formGroup}>
                          <label htmlFor={`edit-description-${producto.id}`}>Descripción</label>
                          <textarea
                            id={`edit-description-${producto.id}`}
                            name="description"
                            className={styles.textarea}
                            value={productoEditado.description}
                            onChange={handleInputChangeEdit}
                          />
                        </div>

                        <div className={styles.formGroup}>
                          <label htmlFor={`edit-price-${producto.id}`}>Precio *</label>
                          <input
                            type="number"
                            id={`edit-price-${producto.id}`}
                            name="price"
                            className={styles.input}
                            step="0.01"
                            min="0"
                            value={productoEditado.price}
                            onChange={handleInputChangeEdit}
                            required
                          />
                        </div>

                        <div className={styles.formGroup}>
                          <label htmlFor={`edit-imageFile-${producto.id}`}>
                            Nueva Imagen (opcional)
                          </label>
                          <input
                            type="file"
                            id={`edit-imageFile-${producto.id}`}
                            name="imageFile"
                            className={styles.inputFile}
                            accept="image/*"
                            onChange={handleImagenChangeEdit}
                          />
                          {previsualizacionEdit && (
                            <div className={styles.previsualizacionContainer}>
                              <img
                                src={previsualizacionEdit}
                                alt="Previsualización"
                                className={styles.previsualizacion}
                              />
                            </div>
                          )}
                        </div>

                        <div className={styles.formGroup}>
                          <label htmlFor={`edit-category-${producto.id}`}>Categoría</label>
                          <input
                            type="text"
                            id={`edit-category-${producto.id}`}
                            name="category"
                            className={styles.input}
                            value={productoEditado.category}
                            onChange={handleInputChangeEdit}
                          />
                        </div>

                        <div className={styles.botonesEdicion}>
                          <button
                            onClick={handleGuardarEdicion}
                            className={styles.botonGuardar}
                            disabled={subiendoImagenEdit}
                          >
                            {subiendoImagenEdit ? "Subiendo..." : "Guardar Cambios"}
                          </button>
                          <button
                            onClick={handleCancelarEdicion}
                            className={styles.botonCancelar}
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;