import React, { useState } from 'react';
import SceneComponent from './SceneComponent';
import * as BABYLON from '@babylonjs/core';
import {
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
} from '@babylonjs/core';
import { products } from '../../Info/products';

const selectedObj = products.filter((e) => {
  return e.id === 'G1677744748794';
});

const subProdFilter = selectedObj[0].subProducts.filter((e) => {
  return e.id === 'S1677744811741';
});
const subProd = subProdFilter[0];

class Model extends React.Component {
  constructor(props) {
    super(props);
    this.state = { face: 'front' };
  }

  componentDidUpdate() {
    // console.log(this.props.number); //2
    // console.log(this.state.face);
  }

  onSceneReady(scene) {
    var camera = new BABYLON.ArcRotateCamera(
      'camera1',
      Math.PI / 2,
      Math.PI / 2,
      100,
      new BABYLON.Vector3(0, 0, 0),
      scene
    );

    camera.setTarget(Vector3.Zero());

    const canvas = scene.getEngine().getRenderingCanvas();

    camera.attachControl(canvas, true);

    const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);

    light.intensity = 0.7;

    const marker = new BABYLON.TransformNode('marker');
    // marker.scaling = new BABYLON.Vector3(0.001, 0.001, 0.001);
    marker.position.y = -25;

    let modelParent;
    let modelMesh;

    BABYLON.SceneLoader.ImportMesh(
      '',
      '/scenes/',
      subProd.model,
      scene,
      (meshes) => {
        modelParent = meshes[0];
        modelParent.parent = marker;

        // modelMesh = meshes[this.res(meshes)];
        // modelMesh = meshes[this.props.number]; //undefined
        modelMesh = meshes[2];

        var decalMaterial = new BABYLON.StandardMaterial('decalMat', scene);
        decalMaterial.diffuseTexture = new BABYLON.Texture(
          'logo512.png',
          scene
        );
        decalMaterial.diffuseTexture.hasAlpha = true;
        decalMaterial.zOffset = -2;
        decalMaterial.backFaceCulling = false;

        var onPointerDown = (evt) => {
          if (evt.button !== 0) {
            return;
          }

          var pickInfo = scene.pick(scene.pointerX, scene.pointerY, (mesh) => {
            return mesh === modelMesh;
          });
          if (pickInfo.hit) {
            var decalSize = new BABYLON.Vector3(5, 5, 5);

            var decalModel = BABYLON.MeshBuilder.CreateDecal(
              'decalModel',
              modelMesh,
              {
                position: pickInfo.pickedPoint,
                normal: pickInfo.getNormal(true),
                size: decalSize,
              }
            );
            decalModel.material = decalMaterial;
          }
        };
        canvas.addEventListener('pointerdown', onPointerDown, false);
      }
    );
  }

  render() {
    return (
      <>
        <SceneComponent
          antialias
          onSceneReady={this.onSceneReady}
          state={this.state.face}
          id='my-canvas'
          style={{ width: '100%', height: '100%' }}
        />
        <button
          onClick={() => {
            this.setState({ face: 'front' });
          }}
        >
          front
        </button>
        <div>{this.state.face}</div>
        <button
          onClick={() => {
            this.setState({ face: 'back' });
          }}
        >
          back
        </button>
      </>
    );
  }
}

export default Model;
