import React, { useEffect, useState } from 'react';
import { products } from '../../Info/products';
import Sizes from './Sizes';
import Gender from './Gender';

const Attributes = () => {
  const selectedObj = products.filter((e) => {
    return e.id === 'G1677744748794';
  });

  return (
    <>
      <Sizes selectedObj={selectedObj} />
      <Gender
        selectedObj={selectedObj}
        values={products[0].subProducts[0].gender}
      />
    </>
  );
};

export default Attributes;
