import { useEffect, useRef, useState } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { ProductInfoContext } from '../Context/SelectedProduct';
import * as THREE from 'three';
import {
  Decal,
  useTexture,
  RenderTexture,
  useGLTF,
  Text,
} from '@react-three/drei';

//Izvlace se sve stranice i activna je ona na okju korisnik klikne
//Ubacuje se map za texturu
//Slike i ceo objekat o faces smestiti u sesiju
//Kako ubaciti vise textura na jedan proizvod

const Model = ({ path, renderDiv }) => {
  const ref = useRef();
  // const gltf = useLoader(GLTFLoader, path);
  const { nodes, materials } = useGLTF(path);
  // const { nodes } = useGLTF(
  //   'https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/bunny/model.gltf'
  // );

  const [product, setProductsInfo] = ProductInfoContext();

  const { scene } = useThree();

  const [pmndrs, react] = useTexture([
    '/logo512.png',
    '/meshes/Shirts/faces/frontFace.png',
    // '/three.png',
  ]);

  useEffect(() => {
    if (product.selectedFace !== '0') {
      product.activeMesh = scene.getObjectByName(product.selectedFace);
      if (product.activeMesh.material) {
        product.activeMesh.material.map = new THREE.TextureLoader().load(
          'logo512.png',
          (e) => {
            console.log(e.image.height);
          }
        );
        product.activeMesh.material.needsUpdate = true;
        // product.activeMesh.material.transparent = true;

        console.log(product.activeMesh.material.map.image);
      }
    }
  }, [product]);

  console.log(product);
  console.log(materials);

  // return (
  //   <group>
  //     <primitive
  //       ref={ref}
  //       object={gltf.scene}
  //       position={[0, -10, 0]}
  //       scale={[0.35, 0.35, 0.35]}
  //     />
  //   </group>
  // );
  return (
    <group>
      <mesh geometry={nodes.front.geometry} material={materials.front}>
        <Decal position={[0, 1.2, 0.75]}>
          <RenderTexture attach='map'>
            <Text rotation={[0, Math.PI, 0]} fontSize={4} color='black'>
              hello from drei
            </Text>
          </RenderTexture>
        </Decal>
        <Decal
          position={[0, 1, 1]}
          rotation={-0.7}
          scale={0.25}
          map={pmndrs}
          map-anisotropy={16}
        />
        <Decal
          position={[0, 1.3, 0.3]}
          rotation={0.75}
          scale={0.3}
          map={react}
          map-anisotropy={16}
        />
      </mesh>
    </group>
  );
};

export default Model;
