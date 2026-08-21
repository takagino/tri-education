import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'stats.js';
import GUI from 'lil-gui';

const scene = new THREE.Scene();

const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

// const gridHelper = new THREE.GridHelper(10, 10);
// scene.add(gridHelper);

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

const particleCount = 300;
const positions = new Float32Array(particleCount * 3);
const velocities = []; // 2. スピード用の配列（空の箱）を追加

for (let i = 0; i < particleCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 20;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

  // --- ここから追加 ---
  // XYZそれぞれにランダムなスピードを持たせて、箱（配列）に保存する
  velocities.push({
    x: (Math.random() - 0.5) * 0.02,
    y: (Math.random() - 0.5) * 0.02,
    z: (Math.random() - 0.5) * 0.02,
  });
}

// 3. ジオメトリの作成と座標データの流し込み
const pointsGeo = new THREE.BufferGeometry();
pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// 4. マテリアル（点の見た目）の設定
const pointsMat = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.1
});

// 5. メッシュ化（Points）してシーンに追加
const particles = new THREE.Points(pointsGeo, pointsMat);
scene.add(particles);

// 1. 線（Lines）のための空っぽのジオメトリを用意
const linesGeo = new THREE.BufferGeometry();

// 2. 線のマテリアル（半透明の水色にする）
const linesMat = new THREE.LineBasicMaterial({
  color: 0x00ffff,
  transparent: true,
  opacity: 0.4
});

// 3. 複数の短い線を引くための専用メッシュ：LineSegments
const lines = new THREE.LineSegments(linesGeo, linesMat);
scene.add(lines);

const clock = new THREE.Clock();
const update = () => {
  window.requestAnimationFrame(update);
  stats.update();

  const elapsedTime = clock.getElapsedTime();

  // 頂点データの配列を取得
  const posArray = particles.geometry.attributes.position.array;

  // すべてのパーティクルに対して処理を行う
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;

    // 現在の座標に、記憶しておいたスピードを足す
    posArray[i3] += velocities[i].x; // X
    posArray[i3 + 1] += velocities[i].y; // Y
    posArray[i3 + 2] += velocities[i].z; // Z

    // --- ここから追加 ---
    // 画面外（10 または -10）に出たら、反対側からワープさせる
    if (posArray[i3] > 10) posArray[i3] = -10;
    if (posArray[i3] < -10) posArray[i3] = 10;

    if (posArray[i3 + 1] > 10) posArray[i3 + 1] = -10;
    if (posArray[i3 + 1] < -10) posArray[i3 + 1] = 10;

    if (posArray[i3 + 2] > 10) posArray[i3 + 2] = -10;
    if (posArray[i3 + 2] < -10) posArray[i3 + 2] = 10;
    // ------------------
  }

  // GPUに変更を知らせる
  particles.geometry.attributes.position.needsUpdate = true;

  const linePositions = [];

  // --- ここから追加 ---
  // 点と点の「距離」を測るための 2重のfor文
  for (let i = 0; i < particleCount; i++) {
    for (let j = i + 1; j < particleCount; j++) {

      const i3 = i * 3;
      const j3 = j * 3;

      // i番目の点と、j番目の点の、X, Y, Zそれぞれの距離（差）を計算
      const dx = posArray[i3] - posArray[j3];
      const dy = posArray[i3 + 1] - posArray[j3 + 1];
      const dz = posArray[i3 + 2] - posArray[j3 + 2];

      // ピタゴラスの定理で、直線の距離を計算
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

      // --- ここから追加 ---
      // 距離が「3.0」よりも近ければ、その2点間に線を引く！
      if (distance < 3.0) {
        // スタート地点(i) と ゴール地点(j) の座標を配列に追加
        linePositions.push(
          posArray[i3], posArray[i3 + 1], posArray[i3 + 2], // iの XYZ
          posArray[j3], posArray[j3 + 1], posArray[j3 + 2]  // jの XYZ
        );
      }
    }
  }

  lines.geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(linePositions, 3)
  );

  particles.geometry.attributes.position.needsUpdate = true;
  renderer.render(scene, camera);

  renderer.render(scene, camera);
};

update();

const onWindowResize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

window.addEventListener('resize', onWindowResize);