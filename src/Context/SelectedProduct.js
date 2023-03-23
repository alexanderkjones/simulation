import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export default function SelectedProduct({ children }) {
  const [product, setProductsInfo] = useState({
    defaultObjectId: '0',
    productId: '0',
    gender: '0',
    sizes: '0',
    selectedFace: 'front',
    camera: {
      x: 0,
      y: 0,
    },
    activeMesh: {},
  });

  return (
    <ProductContext.Provider value={[product, setProductsInfo]}>
      {children}
    </ProductContext.Provider>
  );
}

export const ProductInfoContext = () => useContext(ProductContext);
