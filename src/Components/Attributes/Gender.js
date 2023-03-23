import React, { useEffect, useState } from 'react';
import { ProductInfoContext } from '../../Context/SelectedProduct';
import { products } from '../../Info/products';

const Gender = ({ values, selectedObj }) => {
  const [product, setProductsInfo] = ProductInfoContext();

  // const selectedObj = products.filter((e) => {
  //   return e.id === 'G16777';
  // });

  console.log();

  return (
    <div>
      {selectedObj[0].subProducts[0].gender ? (
        <div>
          <div>Gender:</div>
          <select
            onChange={(e) => {
              setProductsInfo({ ...product, gender: e.target.value });
            }}
          >
            <option value={'0'}>Not selected</option>
            {values.map((e, index) => {
              return (
                <option key={index} value={e.name}>
                  {e.name}
                </option>
              );
            })}
          </select>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Gender;
