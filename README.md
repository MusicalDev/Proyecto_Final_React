# 🛒 E-commerce React - Proyecto Final

![React](https://img.shields.io/badge/React-19.2.3-61dafb?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Latest-646cff?style=for-the-badge&logo=vite&logoColor=white)
![CSS Modules](https://img.shields.io/badge/CSS_Modules-000000?style=for-the-badge&logo=css3&logoColor=white)

Una aplicación de e-commerce desarrollada con React, Vite y CSS Modules. Incluye funcionalidades de gestión de productos, carrito de compras, autenticación de usuarios y panel de administración.

## 🌐 Demo en Vivo

🔗 **[Ver aplicación desplegada en Vercel](https://proyecto-final-react-gules.vercel.app)**


## ✨ Características

- 🛍️ **Catálogo de productos** con búsqueda y filtrado
- 🛒 **Carrito de compras** funcional con persistencia
- 👤 **Sistema de autenticación** (Login/Registro)
- 🔐 **Perfiles de usuario** editables
- 👨‍💼 **Panel de administración** para gestión de productos
- 📱 **Diseño responsive** para todos los dispositivos
- 🎨 **Interfaz moderna** con CSS Modules
- ✅ **Validación de formularios**

## 🔑 Credenciales de Prueba

Para explorar todas las funcionalidades de la aplicación, utiliza las siguientes credenciales:

### 👨‍💼 Cuenta de Administrador
```
Usuario: admin@admin.com
Contraseña: admin1234
```

**Funcionalidades disponibles:**
- ✅ Agregar nuevos productos
- ✏️ Editar productos existentes
- 🗑️ Eliminar productos
- 📊 Gestión completa del inventario

### 👤 Cuenta de Cliente
```
Usuario: prueba@prueba.com
Contraseña: holahola
O simplemente puede crear un usuario por tu cuenta
```

**Funcionalidades disponibles:**
- 🛒 Agregar productos al carrito
- 💳 Realizar compras
- 👤 Ver y editar perfil personal

## 🚀 Tecnologías Utilizadas

### Frontend
- **React 19.2.3** - Librería de UI
- **Vite** - Build tool y dev server
- **React Router DOM** - Navegación y rutas
- **CSS Modules** - Estilos con scope local

### Librerías Principales
- **@supabase/supabase-js** - Backend as a Service (Base de datos y autenticación)
- **React Toastify** - Notificaciones toast
- **SweetAlert2** - Alertas modales elegantes
- **React Confetti** - Efectos de confetti
- **Canvas Confetti** - Animaciones de celebración
- **React Google reCAPTCHA** - Protección contra bots
- **Bootstrap** - Framework CSS
- **Styled Components** - CSS-in-JS
- **Toastify JS** - Sistema de notificaciones

### Herramientas de Desarrollo
- **ESLint** - Linting de código
- **Vite Plugin React** - Hot Module Replacement
- **PNPM** - Gestor de paquetes

## 📦 Instalación

### Prerrequisitos

- Node.js (versión 18 o superior)
- PNPM, NPM o Yarn

### Pasos de instalación

1. **Clona el repositorio**
```bash
git clone https://github.com/MusicalDev/Proyecto_Final_React.git
cd Proyecto_Final_React
```

2. **Instala las dependencias**
```bash
# Con PNPM (recomendado)
pnpm install

# O con NPM
npm install

# O con Yarn
yarn install
```


## 💻 Uso

### Como Cliente

1. **Navega por el catálogo** de productos
2. **Agrega productos** al carrito haciendo clic en "Agregar al Carrito"
3. **Visualiza tu carrito** en el ícono del carrito en la barra de navegación
4. **Procede al checkout** para completar tu compra
5. **Edita tu perfil** en la sección "Mi Perfil"

### Como Administrador

1. **Inicia sesión** con las credenciales de administrador
2. **Accede al panel de administración** desde el menú
3. **Agrega nuevos productos** completando el formulario
4. **Edita productos existentes** haciendo clic en el botón de edición
5. **Elimina productos** que ya no necesites


## 🎯 Funcionalidades Principales

### 🛒 Carrito de Compras
- Agregar/eliminar productos
- Actualizar cantidades
- Cálculo automático del total
- Persistencia del carrito en localStorage
- Proceso de checkout con validación

### 👤 Gestión de Usuarios
- Registro de nuevos usuarios
- Inicio de sesión seguro
- Edición de perfil
- Cierre de sesión

### 📦 Gestión de Productos (Admin)
- CRUD completo de productos
- Carga de imágenes
- Categorización de productos

### 🎨 Interfaz de Usuario
- Diseño responsive mobile-first
- Animaciones y transiciones suaves
- Feedback visual con toasts
- Modales informativos
- Efectos de celebración en compras

## 📜 Scripts Disponibles

```json
{
  "dev": "vite",                    // Inicia servidor de desarrollo
  "build": "vite build",            // Genera build de producción
  "preview": "vite preview",        // Preview del build
  "lint": "eslint ."               // Ejecuta el linter
}
```


## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto:

1. **Fork** el repositorio
2. Crea una **rama** para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. Abre un **Pull Request**

### Guía de estilo
- Usa CSS Modules para los estilos
- Sigue las convenciones de React Hooks
- Comenta el código cuando sea necesario
- Mantén los componentes pequeños y reutilizables

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**MusicalDev**
- GitHub: [@MusicalDev](https://github.com/MusicalDev)
- Proyecto: [Proyecto_Final_React](https://github.com/MusicalDev/Proyecto_Final_React)


## 📞 Soporte

Si tienes alguna pregunta o problema, por favor:
- Abre un [Issue](https://github.com/MusicalDev/Proyecto_Final_React/issues)
- Contacta al autor

---

⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub!

**Hecho con ❤️ usando React y Vite**