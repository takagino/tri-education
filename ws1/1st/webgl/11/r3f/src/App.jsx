// src/App.jsx
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);


// --- ① propsで変化する3Dアニメーション・コンポーネント（スクロール連動） ---
function ScrollAnimatedBox({ color, posY, factor = 1 }) {
  const meshRef = useRef();

  const POSITIONS = {
    center: 0,
    sec2: 2.5 * factor,
    sec3: -2.5 * factor,
  };

  useGSAP(() => {
    // セクション2：左右に開く（スクロール完全連動）
    const tlSec2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".sec2",
        start: "top center",
        end: "bottom center",
        scrub: true,
      }
    });

    tlSec2.to(meshRef.current.position, { x: POSITIONS.sec2, ease: "none" }, 0)
      .to(meshRef.current.rotation, { y: (Math.PI / 4) * factor, ease: "none" }, 0);


    // セクション3：交差してサイズ変化（スクロール完全連動）
    const tlSec3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".sec3",
        start: "top center",
        end: "bottom center",
        scrub: true,
      }
    });

    tlSec3.set(meshRef.current.position, { x: POSITIONS.sec2 })
      .to(meshRef.current.position, { x: POSITIONS.sec3, ease: "none" }, 0)
      .to(meshRef.current.scale, {
        x: factor === 1 ? 3 : 0.2,
        y: factor === 1 ? 3 : 0.2,
        z: factor === 1 ? 3 : 0.2,
        ease: "none"
      }, 0);
  });

  return (
    <mesh ref={meshRef} position={[POSITIONS.center, posY, 0]}>
      <boxGeometry args={[1.0, 1.0, 1.0]} />
      <meshStandardMaterial color={color} roughness={0.2} />
    </mesh>
  );
}


// --- ② メメインのページレイアウト（DOM制御・スクロール発動） ---
export default function App() {
  const containerRef = useRef();

  useGSAP(() => {

    // 【演出A】セクション1：回転を伴う拡大フェードイン（ページ表示時）
    gsap.from(".sec1 h1", {
      opacity: 0,
      scale: 0.2,     // 縮小した状態から
      rotation: 360,  // 1回転しながら拡大
      duration: 1.2,
      ease: "power3.out",
      delay: 0.2
    });


    // 【演出B】セクション2：傾きを伴う左からの高速スライドイン（画面中央到達時）
    gsap.from(".sec2 h1", {
      opacity: 0,
      x: -300,        // 画面左側に配置
      skewX: -45,     // X軸方向に45度斜めに傾けた状態から開始
      duration: 1.0,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".sec2",
        start: "top center",
      }
    });


    // 【演出C】セクション3：上空からのバウンド落下（画面中央到達時）
    gsap.from(".sec3 h1", {
      opacity: 0,
      y: -150,        // 画面上方に配置
      duration: 1.2,
      ease: "bounce.out", // 地面で跳ねるイージングを適用
      scrollTrigger: {
        trigger: ".sec3",
        start: "top center",
      }
    });

  }, { scope: containerRef });


  return (
    <div ref={containerRef} className="wrapper">

      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <Environment preset="city" />
          <ScrollAnimatedBox color="#ff6b6b" posY={0.8} factor={1} />
          <ScrollAnimatedBox color="#4dabf7" posY={-0.8} factor={-1} />
        </Canvas>
      </div>

      <main className="scroll-content">
        <section className="section sec1">
          <h1>SECTION 1 : 中央にスタンバイ</h1>
        </section>
        <section className="section sec2">
          <h1>SECTION 2 : 左右に開く</h1>
        </section>
        <section className="section sec3">
          <h1>SECTION 3 : 交差してサイズ変化</h1>
        </section>
      </main>

    </div>
  );
}