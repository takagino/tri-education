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
camera.position.set(0, 0, 20);

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// 1. 基本となる形は1つだけ作っておく（今回は少し広げて、分割数を減らして軽くします）
const waveGeometry = new THREE.PlaneGeometry(20, 20, 20, 20);

const material = new THREE.MeshStandardMaterial({
  wireframe: true,
  transparent: true,
  opacity: 0.5, // たくさん重なるので、かなり薄くしておく
});

// 2. 作った波をしまっておくための配列（空の箱）
const waves = [];
const waveCount = 10; // 波の数

for (let i = 0; i < waveCount; i++) {
  // 【超重要】 geometryは必ず .clone() で自分専用のコピーを持たせる！
  const wave = new THREE.Mesh(waveGeometry.clone(), material);
  wave.rotation.x = -Math.PI / 2;
  wave.position.y = -i * 0.3; // 下に向かって少しずつズラして配置（ミルフィーユ状）

  scene.add(wave); // 画面に出す
  waves.push(wave); // あとで動かすために配列に保存
}

const clock = new THREE.Clock();
const update = () => {
  window.requestAnimationFrame(update);
  stats.update();

  const elapsedTime = clock.getElapsedTime();

  // 配列（waves）の中身を1つずつ取り出して処理する
  // wave: 取り出した波のメッシュ / index: 今何番目の波か（0〜9）
  waves.forEach((wave, index) => {
    const pos = wave.geometry.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = Math.sin(elapsedTime + x * 0.5 + index * 0.5) * 2;
      pos.setZ(i, z);
    }

    // 更新を知らせる
    pos.needsUpdate = true;
  });

  renderer.render(scene, camera);
};

update();

const onWindowResize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

window.addEventListener('resize', onWindowResize);
