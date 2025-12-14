import { createContext, useContext, useState, useEffect } from 'react';
import { useAuthContext } from './AuthContext';
import { supabase } from '../supabaseClient';

const CarritoContext = createContext();

export const useCarritoContext = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarritoContext debe usarse dentro de CarritoProvider');
  }
  return context;
};

export const CarritoProvider = ({ children }) => {
  const { user, isAuthenticated, isAdmin } = useAuthContext();
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (!isAuthenticated || isAdmin) {

      const carritoLocal = localStorage.getItem('carrito');
      if (carritoLocal) {
        setCarrito(JSON.parse(carritoLocal));
      }
      setLoading(false);
      return;
    }


    const cargarCarrito = async () => {
      setLoading(true);

      const carritoLocal = localStorage.getItem(`carrito_${user.id}`);
      if (carritoLocal) {
        setCarrito(JSON.parse(carritoLocal));
      }
      setLoading(false);
    };

    cargarCarrito();
  }, [user, isAuthenticated, isAdmin]);

  useEffect(() => {
    if (isAuthenticated && !isAdmin && user) {
      localStorage.setItem(`carrito_${user.id}`, JSON.stringify(carrito));
    } else {
      localStorage.setItem('carrito', JSON.stringify(carrito));
    }
  }, [carrito, isAuthenticated, isAdmin, user]);

  const agregarAlCarrito = (producto, cantidad = 1) => {
    setCarrito(prevCarrito => {
      const itemExistente = prevCarrito.find(item => item.id === producto.id);

      if (itemExistente) {
        return prevCarrito.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        return [...prevCarrito, { ...producto, cantidad }];
      }
    });
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;

    setCarrito(prevCarrito =>
      prevCarrito.map(item =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(prevCarrito => prevCarrito.filter(item => item.id !== id));
  };
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);

  const totalCarrito = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);

  const value = {
    carrito,
    loading,
    cantidadTotal,
    totalCarrito,
    agregarAlCarrito,
    actualizarCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
  };

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
};