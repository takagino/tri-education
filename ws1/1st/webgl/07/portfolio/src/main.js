import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'stats.js';
import GUI from 'lil-gui';

const isDev = import.meta.env.DEV;
const scene = new THREE.Scene();

const stats = new Stats();
stats.showPanel(0);

const axesHelper = new THREE.AxesHelper(5);
const gridHelper = new THREE.GridHelper(10, 10);

if (isDev) {
  document.body.appendChild(stats.dom);
  scene.add(axesHelper);
  scene.add(gridHelper);

  // ※もし GUI (lil-gui) も使っている場合は、ここで表示/非表示を切り替えると綺麗です
  // gui.show();
} else {
  // 本番環境（npm run build）の時は GUI を隠す
  // gui.hide();
}

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 5;

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;

/* パーティクル */
const particleCount = 200;
const positions = new Float32Array(particleCount * 3);
const velocities = [];

for (let i = 0; i < particleCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 20;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

  velocities.push({
    x: (Math.random() - 0.5) * 0.02,
    y: (Math.random() - 0.5) * 0.02,
    z: (Math.random() - 0.5) * 0.02,
  });
}

const pointsGeo = new THREE.BufferGeometry();
pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const pointsMat = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.1
});

const particles = new THREE.Points(pointsGeo, pointsMat);
scene.add(particles);

/* ライン */
const linesGeo = new THREE.BufferGeometry();
const linesMat = new THREE.LineBasicMaterial({
  color: 0x00ffff,
  transparent: true,
  opacity: 0.4
});

const lines = new THREE.LineSegments(linesGeo, linesMat);
scene.add(lines);

/* 3Dモデル */
const gltfLoader = new GLTFLoader();
let myModel; // 後でアニメーションさせるために、空の変数を用意しておく

// 自分の作ったモデルファイル名（.glb）に書き換えてください！
const gltf = await gltfLoader.loadAsync('./models/dog.glb');

myModel = gltf.scene;

// モデルの大きさや位置を調整（※自分のモデルに合わせて調整してください）
myModel.scale.set(1, 1, 1);
myModel.position.set(0, 0, 0);

scene.add(myModel);

const clock = new THREE.Clock();
const update = () => {
  window.requestAnimationFrame(update);
  if (isDev) {
    stats.update();
  }

  const elapsedTime = clock.getElapsedTime();

  const posArray = particles.geometry.attributes.position.array;

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;

    posArray[i3] += velocities[i].x; // X
    posArray[i3 + 1] += velocities[i].y; // Y
    posArray[i3 + 2] += velocities[i].z; // Z

    if (posArray[i3] > 10) posArray[i3] = -10;
    if (posArray[i3] < -10) posArray[i3] = 10;

    if (posArray[i3 + 1] > 10) posArray[i3 + 1] = -10;
    if (posArray[i3 + 1] < -10) posArray[i3 + 1] = 10;

    if (posArray[i3 + 2] > 10) posArray[i3 + 2] = -10;
    if (posArray[i3 + 2] < -10) posArray[i3 + 2] = 10;
  }

  particles.geometry.attributes.position.needsUpdate = true;

  const linePositions = [];

  for (let i = 0; i < particleCount; i++) {
    for (let j = i + 1; j < particleCount; j++) {

      const i3 = i * 3;
      const j3 = j * 3;

      const dx = posArray[i3] - posArray[j3];
      const dy = posArray[i3 + 1] - posArray[j3 + 1];
      const dz = posArray[i3 + 2] - posArray[j3 + 2];

      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (distance < 4.0) {
        linePositions.push(
          posArray[i3], posArray[i3 + 1], posArray[i3 + 2],
          posArray[j3], posArray[j3 + 1], posArray[j3 + 2]
        );
      }
    }
  }

  lines.geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(linePositions, 3)
  );

  particles.geometry.attributes.position.needsUpdate = true;

  if (myModel) {
    // Y軸（縦の軸）を中心に、ゆっくり回転させる
    myModel.rotation.y = elapsedTime * 0.5;

    // （おまけ）サイン波を使って、フワフワと上下に浮遊させる
    myModel.position.y = Math.sin(elapsedTime * 2) * 0.5;
  }

  renderer.render(scene, camera);
};

update();

const onWindowResize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

window.addEventListener('resize', onWindowResize);