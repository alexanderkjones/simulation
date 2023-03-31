import React, { useEffect, useRef, useState } from 'react';
import EditorUi from './editor/EditorUi';
// import ModelL from './Asc';
import MyController from './MyController';
import SceneComponent from './SceneComponent';

const Parent = () => {
  const myController = new MyController();

  const onSceneReady = (scene) => {
    myController.attachScene(scene);
  };

  const onRender = (scene) => {
    // Nothing here, but could be added
  };

  return (
    <div>
      <EditorUi setEnabledMesh={myController.setEnabledMesh} />
      <div style={{ height: '70vh' }}>
        <SceneComponent
          onSceneReady={onSceneReady}
          onRender={onRender}
          antialias
          id="my-canvas"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
};

export default Parent;
