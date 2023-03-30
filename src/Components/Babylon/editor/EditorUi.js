import React from 'react';
import EditorStats from './EditorStats';
import { products } from '../../../Info/products';
import { useDispatch } from 'react-redux';
import { changeFace } from '../../../Context/redux';

const selectedObj = products.filter((e) => {
  return e.id === 'G1677744748794';
});

const subProdFilter = selectedObj[0].subProducts.filter((e) => {
  return e.id === 'S1677744811741';
});
const subProd = subProdFilter[0];

const EditorUi = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <EditorStats />
      <div className='canvas-faces'>
        {subProd.faces.map((e, index) => {
          return (
            <img
              onClick={() => {
                // const { x, y } = product.camera;
                // setProductsInfo({
                //   ...product,
                //   selectedFace: e.faceName,
                //   camera: {
                //     x: e.camera.x,
                //     y: e.camera.y,
                //   },
                // });
                dispatch(changeFace(e.faceName));
              }}
              key={index}
              className='face-img'
              src={e.picture}
            />
          );
        })}
      </div>
    </div>
  );
};

export default EditorUi;
