import React, { useEffect, useRef, useState } from 'react';
import EditorUi from './editor/EditorUi';
// import ModelL from './Asc';
import EditorFunction from './EditorFunction';
import SceneComponent from './SceneComponent';

const Parent = () => {
  const editor = new EditorFunction();

  return (
    <div>
      <EditorUi />
      <div style={{ height: '70vh' }}>
        <SceneComponent
          antialias
          id='my-canvas'
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
};

export default Parent;
