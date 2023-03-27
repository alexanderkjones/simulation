import {
  Suspense,
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { products } from './Info/products';
import { Canvas, useThree } from '@react-three/fiber';
import Camera from './Components/Camera';
import Attributes from './Components/Attributes/Attributes';
import { ProductInfoContext } from './Context/SelectedProduct';
// import { Mesh, MeshStandardMaterial, Vector3 } from 'three';
import { DecalGeometry } from 'three-stdlib';
import { useTexture, useGLTF } from '@react-three/drei';
import { SceneLoader } from '@babylonjs/core';
import SceneComponent from './Components/Babylon/SceneComponent';
import {
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
} from '@babylonjs/core';
import { Engine, Scene, useClick, useHover } from 'react-babylonjs';
import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders';
import Model from './Components/Babylon/Model';
import { useDispatch } from 'react-redux';
import { changeFace } from './Context/redux';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

//edit proizvoda je posebna stranica koja se pravi u html

//Samo na klik mesha sa te strane se ubacuje decal
//Gizmo za pomeranje decal

const selectedObj = products.filter((e) => {
  return e.id === 'G1677744748794';
});

const subProdFilter = selectedObj[0].subProducts.filter((e) => {
  return e.id === 'S1677744811741';
});
const subProd = subProdFilter[0];

function App() {
  const face = useSelector((state) => state.selected.face);

  const [product, setProductsInfo] = ProductInfoContext();

  const [files, setFiles] = useState([]);

  const [allMeshes, setMeshes] = useState([]);
  const [selectedMesh, setSeleceted] = useState({});
  const [activeImage, setImage] = useState([]);

  let [imageIndex, setIndex] = useState(0);

  let [removeId, setId] = useState(false);

  let [trigger, setTrigger] = useState(1);
  let [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setProductsInfo({
      ...product,
      defaultObjectId: selectedObj[0].id,
      productId: subProd.id,
    });
  }, []);

  useEffect(() => {
    setIndex((imageIndex = imageIndex + 1));

    setImage(files.length > 0 ? [files[files.length - 1]] : []);
  }, [files]);

  useEffect(() => {
    setSeleceted({});
  }, [product.selectedFace]);

  const placedDecals = allMeshes.filter((e) => {
    return e.placedMesh == product.selectedFace;
  });

  const res = (meshes) => {
    return meshes.findIndex((e) => {
      return e.name === product.selectedFace;
    });
  };

  return (
    <div className='App'>
      <header className='header'>
        <Link to='/editor'>Editor</Link>
      </header>
      <div className='flex'>
        <div className='div-options'>
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              onChange={(e) => {
                const { name } = e.target.files[0];
                setFiles([...files, { id: imageIndex, name }]);
              }}
            >
              <input type='file' />
            </form>
            <div>
              {files.length > 0 &&
                files.map((e, index) => {
                  return (
                    <div
                      onClick={() => {
                        setImage(
                          files.filter((el) => {
                            return el.id == e.id;
                          })
                        );
                      }}
                      key={index}
                      style={
                        activeImage.length > 0 && activeImage[0].id === e.id
                          ? {
                              display: 'inline-flex',
                              border: '1px solid white',
                            }
                          : { border: 'none' }
                      }
                    >
                      <div
                        onClick={() => {
                          setFiles(
                            files.filter((el) => {
                              return el.id !== e.id;
                            })
                          );
                        }}
                      >
                        X
                      </div>

                      <img
                        className='selected-imgs'
                        src={'/meshes/Shirts/faces/' + e.name}
                      />
                    </div>
                  );
                })}
              <div>
                {/* {placedDecals.map((e, index) => {
                  const { x } = e.decalPoint;
                  const { y } = e.decalPoint;
                  const xPosition = x.toFixed(1);
                  const yPosition = y.toFixed(1);

                  return (
                    <div
                      style={
                        selectedMesh.id === e.name
                          ? {
                              border: '1px solid #fff',
                              padding: '5px',
                              background: '#222',
                              width: '300px',
                            }
                          : { border: 'none' }
                      }
                      key={index}
                      onClick={() => {
                        const { name } = e;
                        setSeleceted({ id: name });

                        setTrigger(e.decalSize.x == 1 ? 1 : e.decalSize.x);
                        setPosition({
                          x: 0,
                          y: 0,
                        });
                      }}
                    >
                      <div>
                        <p>{e.usersName}</p>
                      </div>
                      <div>
                        <div>Scale:</div>
                        <div>{e.decalSize.x}</div>
                        {selectedMesh.id === e.name && (
                          <div>
                            <button
                              onClick={(event) => {
                                event.stopPropagation();
                                setTrigger(trigger + 0.5);
                              }}
                            >
                              +
                            </button>
                            <button
                              onClick={(event) => {
                                event.stopPropagation();
                                setTrigger(trigger - 0.5);
                              }}
                            >
                              -
                            </button>
                          </div>
                        )}
                      </div>
                      <div>
                        <div>Position:</div>
                        <div>
                          <div>
                            <div>
                              X:
                              <div>{xPosition}</div>
                            </div>
                            {selectedMesh.id === e.name && (
                              <div>
                                <button
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    const { x } = position;
                                    setPosition({ ...position, x: 0.5 });
                                  }}
                                >
                                  +
                                </button>
                                <button
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    const { x } = position;
                                    setPosition({ ...position, x: -0.5 });
                                  }}
                                >
                                  -
                                </button>
                              </div>
                            )}
                          </div>
                          Y:
                          <div>{yPosition}</div>
                          {selectedMesh.id === e.name && (
                            <div>
                              <button
                                onClick={(event) => {
                                  event.stopPropagation();

                                  setPosition({ ...position, y: 0.5 });
                                }}
                              >
                                +
                              </button>
                              <button
                                onClick={(event) => {
                                  event.stopPropagation();

                                  setPosition({ ...position, y: -0.5 });
                                }}
                              >
                                -
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      {/* <div>
                        <div>Rotation:</div>
                      </div> */}
                {/* {selectedMesh.id === e.name && (
                        <div
                          onClick={() => {
                            setMeshes(
                              allMeshes.filter((el) => {
                                return el.name !== e.name;
                              })
                            );

                            setId(!removeId);
                            // console.log(e);
                          }}
                        >
                          X
                        </div>
                      )} */}
                {/* </div> */}
                );
                {/* })} */}
              </div>
            </div>
          </div>
        </div>
        <div className='canvas-div'>
          <div className='flex-canvas'>
            <div>Slected Side: {product.selectedFace}</div>
            <div className='bttn'>Preview</div>
          </div>
          <div>{/* <Model /> */}</div>
          {/* <Canvas shadows>
            <Suspense>
              <ambientLight intesity={0.5} />
              <KeyLight position={[-2, 0, 25]} />
              <ShirtModel
                files={files}
                allMeshes={allMeshes}
                setMeshes={setMeshes}
                selectedMesh={selectedMesh}
                setSeleceted={setSeleceted}
                setTrigger={setTrigger}
                setPosition={setPosition}
                trigger={trigger}
                position={position}
                removeId={removeId}
                activeImage={activeImage}
              />
              <Camera target={subProd.model.position} />
            </Suspense>
          </Canvas> */}
          <div className='canvas-faces'>
            {subProd.faces.map((e, index) => {
              return (
                <img
                  onClick={() => {
                    const { x, y } = product.camera;
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
        <div className='div-att'>
          <div style={{ display: 'inline' }}>
            <Attributes />
          </div>
        </div>
      </div>
    </div>
  );
}

// const ShirtModel = ({
//   files,
//   allMeshes,
//   setMeshes,
//   selectedMesh,
//   setSeleceted,
//   setTrigger,
//   setPosition,
//   trigger,
//   position,
//   removeId,
//   activeImage,
// }) => {
//   const d = new Date();
//   const ms = d.getTime();

//   const [product, setProductsInfo] = ProductInfoContext();

//   const selectedObj = products.filter((e) => {
//     return e.id === 'G1677744748794';
//   });

//   const subProdFilter = selectedObj[0].subProducts.filter((e) => {
//     return e.id === 'S1677744811741';
//   });
//   const subProd = subProdFilter[0];

//   const decalMaterial = new MeshStandardMaterial({
//     transparent: true,
//     depthWrite: false,
//     polygonOffset: true,
//     polygonOffsetFactor: -10,
//   });

//   const shirt = useRef();

//   useEffect(() => {
//     if (position.x !== 0 || position.y !== 0 || trigger != 0) {
//       const size = new Vector3(trigger, trigger, trigger);

//       const res = allMeshes.filter((e) => {
//         return e.name == selectedMesh.id;
//       });

//       if (res.length > 0) {
//         cloneDecal(
//           size,
//           new Vector3(
//             res[0].decalPoint.x + position.x,
//             res[0].decalPoint.y + position.y,
//             res[0].decalPoint.z
//           ),
//           res[0].decalFace
//         );
//       }
//     }
//   }, [trigger, position.x, position.y]);

//   useEffect(() => {
//     if (selectedMesh.id) {
//       removeDecal();
//     }
//   }, [removeId]);

//   const { nodes } = useGLTF(subProd.model);
//   const nodesArray = Object.values(nodes);
//   const state = useThree();

//   const size = new Vector3(1, 1, 1);

//   const res = allMeshes.filter((e) => {
//     return e.name == selectedMesh.id;
//   });

//   if (res.length > 0) {
//     var image = res[0].material.map;
//   }

//   const texture = useTexture(
//     activeImage.length > 0
//       ? '/meshes/Shirts/faces/' + activeImage[0].name
//       : './logo512.png'
//   );

//   function addDecal(point, face, decal, decalSize, cloned) {
//     decalMaterial.map = texture;
//     const m = new Mesh(
//       new DecalGeometry(shirt.current, point, face.normal, decalSize),
//       decal
//     );
//     m.name = ms;
//     m.usersName = m.material.map.image.src;
//     m.decalSize = decalSize;
//     m.decalPoint = point;
//     m.decalFace = face;
//     m.placedMesh = shirt.current.material.name;
//     state.scene.add(m);
//     setMeshes(
//       state.scene.children.filter((e) => {
//         return e.type == 'Mesh';
//       })
//     );
//     setSeleceted({
//       id: m.name,
//     });
//     setPosition({
//       x: 0,
//       y: 0,
//     });
//     if (!cloned) {
//       setTrigger(1);
//     }
//   }

//   function cloneDecal(size, point, face) {
//     const res = decalMaterial.clone();
//     res.map = image;

//     let objs = state.scene.getObjectByProperty('name', selectedMesh.id);

//     if (objs) {
//       objs.geometry.dispose();
//       objs.material.dispose();
//       state.scene.remove(objs);

//       addDecal(point, face, res, size, true);
//     }

//     setMeshes(
//       state.scene.children.filter((e) => {
//         return e.type == 'Mesh';
//       })
//     );
//   }

//   function removeDecal() {
//     let objs = state.scene.getObjectByProperty('name', selectedMesh.id);

//     objs.geometry.dispose();
//     objs.material.dispose();
//     state.scene.remove(objs);
//   }

//   return (
//     <group dispose={null}>
//       {nodesArray.map((e) => {
//         return (
//           <>
//             {e.type === 'Mesh' && (
//               <mesh
//                 ref={product.selectedFace === e.name ? shirt : null}
//                 geometry={e.geometry}
//                 material={e.material}
//                 scale={[0.5, 0.5, 0.5]}
//                 position={[0, -10, 0]}
//                 rotation={[300, 0, 0]}
//                 onClick={({ point, face }) => {
//                   if (product.selectedFace === e.name) {
//                     if (files.length > 0) {
//                       addDecal(point, face, decalMaterial, size);
//                     }
//                   }
//                 }}
//               />
//             )}
//           </>
//         );
//       })}
//     </group>
//   );
// };

function KeyLight({ position }) {
  return (
    <rectAreaLight
      width={31}
      height={31}
      color='#ffc9f9'
      intensity={8}
      position={position}
      lookAt={[0, 0, 0]}
      penumbra={1}
      // castShadow
    />
  );
}

export default App;
