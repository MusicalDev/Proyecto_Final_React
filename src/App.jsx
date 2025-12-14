import Carrito from "./pages/Carrito";
import Header from "./components/Header";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import { Routes, Route } from "react-router-dom";
import RutaProtegida from "./components/RutaProtegida";
import Admin from "./components/Admin";
import Footer from "./components/Footer";
import Servicios from "./pages/Servicios";
import Login from "./pages/Login";
import Contacto from "./pages/Contacto";
import Registro from "./pages/Registro";
import Perfil from "./pages/Perfil";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "toastify-js/src/toastify.css";



function App() {
  return (
    <>
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route
          path="/carrito"
          element={
            <RutaProtegida adminOnly={false} excludeAdmin={true}>
              <Carrito />
            </RutaProtegida>
          }
        />
        <Route
          path="/perfil"
          element={
            <RutaProtegida adminOnly={false} excludeAdmin={true}>
              <Perfil />
            </RutaProtegida>
          }
        />
        <Route
          path="/admin"
          element={
            <RutaProtegida adminOnly={true}>
              <Admin />
            </RutaProtegida>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;