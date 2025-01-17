import * as THREE from 'three';
import { CSS2DRenderer } from 'three/examples/jsm/Addons.js';
import './coordinates';

import CameraControls from 'camera-controls';
import { MAX_X, MAX_Y, MAX_Z, SCENE_CENTER } from './coordinates';
import './sceneManager';
import { SceneManager } from './sceneManager';

CameraControls.install({ THREE: THREE });
const clock = new THREE.Clock();
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const CAMERA_ZOOM = MAX_Y * 0.0006;
const camera = new THREE.OrthographicCamera(
  window.innerWidth * -CAMERA_ZOOM,
  window.innerWidth * CAMERA_ZOOM,
  window.innerHeight * CAMERA_ZOOM,
  window.innerHeight * -CAMERA_ZOOM,
  1,
  100000
);

// const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 100000);
camera.position.set(0, 0, MAX_Z * 2);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);

document.body.appendChild(renderer.domElement);

// const mesh = new THREE.Mesh(
//   new THREE.BoxGeometry(10, 10, 10),
//   new THREE.MeshBasicMaterial({
//     color: 0xaaff00,
//   })
// );
// mesh.position.set(0, 0, 0);
// scene.add(mesh);

// const mesh2 = new THREE.Mesh(
//   new THREE.BoxGeometry(10, 10, 10),
//   new THREE.MeshBasicMaterial({
//     color: 0x00aaff,
//   })
// );
// mesh2.position.set(MAX_X, MAX_Y, MAX_Z);
// scene.add(mesh2);

// const gridHelper = new THREE.GridHelper(MAX_X, 10);
// gridHelper.position.y = -1;
// scene.add(gridHelper);

SceneManager.renderAllChannels(scene);

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
document.body.appendChild(labelRenderer.domElement);

const cameraControls = new CameraControls(camera, labelRenderer.domElement);

cameraControls.setOrbitPoint(SCENE_CENTER.x, SCENE_CENTER.y, SCENE_CENTER.z);
cameraControls.truck(MAX_X / 2, -MAX_Y / 2);
cameraControls.zoom(
  -100 / Math.min(window.innerHeight, window.innerWidth),
  false
);

// const stats = new Stats();
// document.body.appendChild(stats.dom);

function animate() {
  const delta = clock.getDelta();
  const a = cameraControls.update(delta);
  if (a) {
    cameraControls.setOrbitPoint(
      SCENE_CENTER.x,
      SCENE_CENTER.y,
      SCENE_CENTER.z
    );
  }

  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
  // stats.update();
}
