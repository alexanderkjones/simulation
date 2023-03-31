import React from 'react';
import EditorStats from './EditorStats';
import { products } from '../../../Info/products';

const selectedObj = products.filter((e) => {
  return e.id === 'G1677744748794';
});

const subProdFilter = selectedObj[0].subProducts.filter((e) => {
  return e.id === 'S1677744811741';
});
const subProd = subProdFilter[0];

const EditorUi = (props) => {
  const { setEnabledMesh } = props;

  return (
    <div>
      <EditorStats />
      <div className="canvas-faces">
        {subProd.faces.map((e, index) => {
          return (
            <img
              onClick={() => {
                setEnabledMesh(e.faceName);
              }}
              key={index}
              className="face-img"
              src={e.picture}
            />
          );
        })}
      </div>
    </div>
  );
};

export default EditorUi;
