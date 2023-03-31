import * as BABYLON from '@babylonjs/core';
import { Vector3, HemisphericLight, PointerEventTypes } from '@babylonjs/core';
import { products } from '../../Info/products';

export default class MyController {
  constructor() {
    this._scene = null;
    this._store = {};
    this._pointerObserver = null;
  }

  attachScene(scene) {
    this._scene = scene;
    this._store['enabledMesh'] = 'front';
    this._pointerObserver = this.attachPointerObserver(scene);
    this.getModel();
    this.loadScene(scene);
    this.loadMaterials(scene);
  }

  // Callbacks used by react must be
  // an arrow function to maintain reference to "this"
  setEnabledMesh = (enabledMeshName) => {
    this._store['enabledMesh'] = enabledMeshName;
    console.log(
      'store is set to: ',
      enabledMeshName,
      this._store['enabledMesh']
    );
  };

  getModel() {
    const selectedObj = products.filter((e) => {
      return e.id === 'G1677744748794';
    });

    const subProdFilter = selectedObj[0].subProducts.filter((e) => {
      return e.id === 'S1677744811741';
    });
    const subProd = subProdFilter[0];

    this._store['model'] = subProd.model;
  }

  loadScene(scene) {
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
    // Moving this logic down below
    //let modelMesh;

    BABYLON.SceneLoader.ImportMesh(
      '',
      '/scenes/',
      this._store['model'],
      scene,
      (meshes) => {
        modelParent = meshes[0];
        modelParent.parent = marker;

        // Moving this down below
        //modelMesh = scene.getMeshByName('front');

        // Moving this down below
        // var decalMaterial = new BABYLON.StandardMaterial('decalMat', scene);
        // decalMaterial.diffuseTexture = new BABYLON.Texture(
        //   'logo512.png',
        //   scene
        // );
        // decalMaterial.diffuseTexture.hasAlpha = true;
        // decalMaterial.zOffset = -2;
        // decalMaterial.backFaceCulling = false;
      }
    );
  }

  attachPointerObserver = (scene) => {
    if (!scene) return;
    const pointerObserver = scene.onPointerObservable.add((pointerInfo) => {
      if (pointerInfo.type != PointerEventTypes.POINTERDOWN) return;
      if (
        pointerInfo.pickInfo.pickedMesh &&
        pointerInfo.pickInfo.pickedMesh.name === this._store['enabledMesh']
      ) {
        const decalSize = new BABYLON.Vector3(5, 5, 5);
        const decalModel = BABYLON.MeshBuilder.CreateDecal(
          'decalModel',
          pointerInfo.pickInfo.pickedMesh,
          {
            position: pointerInfo.pickInfo.pickedPoint,
            normal: pointerInfo.pickInfo.getNormal(true),
            size: decalSize,
          }
        );
        decalModel.material = this._store['decalMaterial'];
      }
    });
    return pointerObserver;
  };

  loadMaterials(scene) {
    var decalMaterial = new BABYLON.StandardMaterial('decalMat', scene);
    decalMaterial.diffuseTexture = new BABYLON.Texture('logo512.png', scene);
    decalMaterial.diffuseTexture.hasAlpha = true;
    decalMaterial.zOffset = -2;
    decalMaterial.backFaceCulling = false;
    this._store['decalMaterial'] = decalMaterial;
  }
}
