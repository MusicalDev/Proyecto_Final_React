import { createContext, useState } from 'react';


export const ProductoContext = createContext();
export function ProductoProvider({ children }) {
    
    return (
        <ProductoContext.Provider value={{ eliminarProducto, agregarProducto, producto  }}>
            {children}
        </ProductoContext.Provider>
    );
}
