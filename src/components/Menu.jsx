import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import CartIcon from "../assets/BagIcon";
import styles from "./Header.module.css";

const MobileMenuModal = ({ contadorEnCarrito = 0, logout }) => {
  const { usuario } = useAuthContext();
  const estaLogeado = !!usuario;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return (
    <>
      <WrapperButton>
        <button className="btn" onClick={() => setOpen(true)}>
          <span className="icon">
            <svg viewBox="0 0 175 80" width={38} height={38}>
              <rect width={50} height={10} fill="#e0e1dd" rx={8} />
              <rect y={25} width={50} height={10} fill="#e0e1dd" rx={8} />
              <rect y={50} width={50} height={10} fill="#e0e1dd" rx={8} />
            </svg>
          </span>
          <span className="text">MENU</span>
        </button>
      </WrapperButton>

      {open && createPortal(
        <Backdrop onClick={() => setOpen(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setOpen(false)}>×</CloseButton>

            {/* NAVBAR */}
            <div className="navBlock" onClick={() => setOpen(false)}>
              <Navbar />
            </div>

            <div className="authBlock">
              {estaLogeado ? (
                <span onClick={logout} className={styles.link} style={{ cursor: "pointer" }}>
                  <span className={styles.linkInner}>
                    <span className={styles.slice}></span>
                    <span className={styles.linkText}>Cerrar Sesión</span>
                  </span>
                </span>
              ) : (
                <Link
                  to="/login"
                  className={styles.link}
                  onClick={() => setOpen(false)}
                >
                  <span className={styles.linkInner}>
                    <span className={styles.slice}></span>
                    <span className={styles.linkText}>Ingresá</span>
                  </span>
                </Link>
              )}
            </div>
            <div className="carritoBlock">
              <Link
                to="/carrito"
                className={styles.iconoDeCarritoCustom}
                onClick={() => setOpen(false)}
              >
                <CartIcon
                  className={styles.iconoCarrito}
                  style={{ width: 30, height: 30 }}
                />
                {contadorEnCarrito > 0 && (
                  <span className={styles.contadorDeCarritoCustom}>
                    {contadorEnCarrito}
                  </span>
                )}
              </Link>
            </div>
          </Modal>
        </Backdrop>,
        document.body 
      )}
    </>
  );
};

const WrapperButton = styled.div`
  @media (min-width: 992px) {
    display: none;
  }

  .btn {
    width: 110px;
    height: 45px;
    border-radius: 4px;
    border: none;
    transition: all 0.5s ease-in-out;
    font-size: 16px;
    font-weight: 400;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    background: #040f16;
    color: #f5f5f5;
    cursor: pointer;
    border: 1px solid #e0e1dd;
  }

  .btn:hover {
    box-shadow: 0 0 10px 0px #2e2e2e3a;
  }

  .icon {
    position: absolute;
    left: 0;
    width: 60px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: width 0.5s ease;
    padding-left: 10px;
    top: 5px;
  }

  .text {
    transform: translateX(35px);
    transition: opacity 0.5s ease;
  }

  .btn:hover .icon {
    width: 125px;
  }

  .btn:hover .text {
    opacity: 0;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.49);
  backdrop-filter: blur(8px);
  
  /* CENTRADO CON FLEXBOX */
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 99999;
  
  /* SCROLL INTERNO SI ES NECESARIO */
  overflow-y: auto;

  animation: fadeIn 0.3s ease forwards;

  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
`;

const Modal = styled.div`
  width: 92%;
  max-width: 520px;
  max-height: 85vh;
  overflow-y: auto;
  
  background: rgba(13, 27, 42, 1);
  border-radius: 18px;
  padding: 28px 22px;
  border: 1px solid rgba(224,225,221,0.12);
  backdrop-filter: blur(10px);

  display: flex;
  flex-direction: column;
  gap: 34px;

  box-shadow: 0 10px 30px rgba(2,6,23,0.5);
  
  /* Posición relativa para el botón de cerrar */
  position: relative;
  
  /* ANIMACIÓN */
  animation: popup 0.28s cubic-bezier(.2,.9,.2,1) forwards;

  @keyframes popup {
    from { transform: scale(0.92); opacity: 0; }
    to   { transform: scale(1); opacity: 1; }
  }

  .navBlock,
  .authBlock,
  .carritoBlock {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  /* FORZAR QUE EL NAVBAR SE VEA EN COLUMNA */
  .navBlock > * {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    width: 100%;
    gap: 12px;
  }

  /* ESTILOS PARA LOS LINKS DEL NAVBAR */
  .navBlock a,
  .navBlock nav,
  .navBlock ul,
  .navBlock div {
    text-decoration: none;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    width: auto;
    margin-top: 15px;
    margin-bottom: 15px;
    width: auto;
  }

  .navBlock li {
    list-style: none;
    width: 100%;
    text-align: center;
  }
  
  /* ESTILOS PARA EL SCROLLBAR */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(224,225,221,0.1);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(224,225,221,0.3);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(224,225,221,0.5);
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #f5f5f5;
  font-size: 32px;
  font-weight: bold;
  position: absolute;
  right: 18px;
  top: 10px;
  cursor: pointer;
  z-index: 1;
  line-height: 1;
  padding: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #ffca1a;
  }
`;

export default MobileMenuModal;