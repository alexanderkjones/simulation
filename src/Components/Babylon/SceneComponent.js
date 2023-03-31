import React, { useEffect, useRef, useMemo } from 'react';
import { Engine, Scene } from '@babylonjs/core';
import * as BABYLON from '@babylonjs/core';
import {
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
} from '@babylonjs/core';
import { products } from '../../Info/products';
import { useSelector } from 'react-redux';

const selectedObj = products.filter((e) => {
  return e.id === 'G1677744748794';
});

const subProdFilter = selectedObj[0].subProducts.filter((e) => {
  return e.id === 'S1677744811741';
});
const subProd = subProdFilter[0];

const SceneComponent = ({
  antialias,
  engineOptions,
  adaptToDeviceRatio,
  sceneOptions,
  // Added onSceneReady back in
  onSceneReady,
  onRender,
  state,
  ...rest
}) => {
  const reactCanvas = useRef(null);

  // const onSceneReady = (scene) => {
  //   var camera = new BABYLON.ArcRotateCamera(
  //     'camera1',
  //     Math.PI / 2,
  //     Math.PI / 2,
  //     100,
  //     new BABYLON.Vector3(0, 0, 0),
  //     scene
  //   );

  //   camera.setTarget(Vector3.Zero());

  //   const canvas = scene.getEngine().getRenderingCanvas();

  //   camera.attachControl(canvas, true);

  //   const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);

  //   light.intensity = 0.7;

  //   const marker = new BABYLON.TransformNode('marker');
  //   // marker.scaling = new BABYLON.Vector3(0.001, 0.001, 0.001);
  //   marker.position.y = -25;

  //   let modelParent;
  //   let modelMesh;

  //   BABYLON.SceneLoader.ImportMesh(
  //     '',
  //     '/scenes/',
  //     subProd.model,
  //     scene,
  //     (meshes) => {
  //       modelParent = meshes[0];
  //       modelParent.parent = marker;

  //       // modelMesh = meshes[2];
  //       modelMesh = scene.getMeshByName('front');

  //       var decalMaterial = new BABYLON.StandardMaterial('decalMat', scene);
  //       decalMaterial.diffuseTexture = new BABYLON.Texture(
  //         'logo512.png',
  //         scene
  //       );
  //       decalMaterial.diffuseTexture.hasAlpha = true;
  //       decalMaterial.zOffset = -2;
  //       decalMaterial.backFaceCulling = false;

  //       var onPointerDown = (evt) => {
  //         if (evt.button !== 0) {
  //           return;
  //         }

  //         var pickInfo = scene.pick(scene.pointerX, scene.pointerY, (mesh) => {
  //           return mesh === modelMesh;
  //         });
  //         if (pickInfo.hit) {
  //           var decalSize = new BABYLON.Vector3(5, 5, 5);

  //           var decalModel = BABYLON.MeshBuilder.CreateDecal(
  //             'decalModel',
  //             modelMesh,
  //             {
  //               position: pickInfo.pickedPoint,
  //               normal: pickInfo.getNormal(true),
  //               size: decalSize,
  //             }
  //           );
  //           decalModel.material = decalMaterial;
  //         }
  //       };
  //       canvas.addEventListener('pointerdown', onPointerDown, false);
  //     }
  //   );
  // };

  // set up basic engine and scene
  useEffect(() => {
    const { current: canvas } = reactCanvas;

    if (!canvas) return;

    const engine = new Engine(
      canvas,
      antialias,
      engineOptions,
      adaptToDeviceRatio
    );
    const scene = new Scene(engine, sceneOptions);
    if (scene.isReady()) {
      onSceneReady(scene);
    } else {
      scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
    }

    engine.runRenderLoop(() => {
      if (typeof onRender === 'function') onRender(scene);
      scene.render();
    });

    const resize = () => {
      scene.getEngine().resize();
    };

    if (window) {
      window.addEventListener('resize', resize);
    }

    return () => {
      scene.getEngine().dispose();

      if (window) {
        window.removeEventListener('resize', resize);
      }
    };
  }, [
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    onRender,
    onSceneReady,
  ]);

  return <canvas ref={reactCanvas} {...rest} />;
};

export default React.memo(SceneComponent);
