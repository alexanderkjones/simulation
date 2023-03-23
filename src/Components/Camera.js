import { useEffect, useRef } from 'react';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { ProductInfoContext } from '../Context/SelectedProduct';
import { products } from '../Info/products';

const Camera = ({ target }) => {
  const selectedObj = products.filter((e) => {
    return e.id === 'G1677744748794';
  });

  const subProdFilter = selectedObj[0].subProducts.filter((e) => {
    return e.id === 'S1677744811741';
  });
  const subProd = subProdFilter[0];

  const [product, setProductsInfo] = ProductInfoContext();
  const orbitRef = useRef();

  const radiusAngle = (deg) => (Math.PI / 180) * deg;

  const res = subProd.faces.filter((e) => {
    return e.faceName == product.selectedFace;
  });

  useEffect(() => {
    if (orbitRef.current) {
      orbitRef.current.setAzimuthalAngle(radiusAngle(res[0].camera.x));
      product.camera.y !== null &&
        orbitRef.current.setPolarAngle(radiusAngle(res[0].camera.y));
    }

    orbitRef.current.update();
  }, [product.camera.x, product.camera.y]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 50]} />
      <OrbitControls ref={orbitRef} enablePan={false} />
    </>
  );
};

export default Camera;
