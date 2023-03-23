import React, { useEffect, useState } from 'react';
import { ProductInfoContext } from '../../Context/SelectedProduct';
import { products } from '../../Info/products';

const Sizes = ({ selectedObj }) => {
  const [product, setProductsInfo] = ProductInfoContext();
  const [availableSizes, setSizes] = useState();

  useEffect(() => {
    if (selectedObj[0].subProducts[0].gender !== null) {
      if (product.gender !== '0') {
        setSizes(
          selectedObj[0].subProducts[0].gender.filter((e) => {
            return e.name == product.gender;
          })
        );
      } else {
        setSizes();
      }
    }
  }, [product.gender]);

  return (
    <div>
      <div>Sizes:</div>
      <select>
        {selectedObj[0].subProducts[0].gender !== null ? (
          <option values='notSelected'>Not selected</option>
        ) : (
          <option values='defaultSize'>
            {selectedObj[0].subProducts[0].sizes}
          </option>
        )}

        {availableSizes !== undefined &&
          availableSizes[0].sizes.map((e, index) => {
            return <option key={index}>{e}</option>;
          })}
      </select>
    </div>
  );
};

export default Sizes;
