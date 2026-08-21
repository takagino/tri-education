import { useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, useTexture } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

function Particles() {
  const pointsRef = useRef();

  const texture = useTexture('./textures/1.png');

  const count = 1000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, [count]);

  const scrollProps = {
    start: "top bottom",
    end: "bottom bottom",
    scrub: true
  }

  useGSAP(() => {
    const tlSec1 = gsap.timeline({
      scrollTrigger: { trigger: ".sec1", ...scrollProps }
    });
    tlSec1.to(pointsRef.current.scale, { x: 10, y: 10, z: 10, ease: "none" });

    const tlSec2 = gsap.timeline({
      scrollTrigger: { trigger: ".sec2", ...scrollProps }
    });
    tlSec2.to(pointsRef.current.rotation, { y: Math.PI * 2, ease: "none" });

    const tlSec3 = gsap.timeline({
      scrollTrigger: { trigger: ".sec3", ...scrollProps }
    });
    tlSec3.set(pointsRef.current.scale, { x: 10, y: 10, z: 10 })
      .to(pointsRef.current.scale, { x: 0.5, y: 0.5, z: 0.5, ease: "none" });
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.2}
        alphaMap={texture}
        color="#ffffff"
        sizeAttenuation={true}
        transparent={true}
        depthWrite={false}
      />
    </points>
  );
}

function AnimatedCube() {
  const meshRef = useRef();

  useGSAP(() => {
    const tlSec1 = gsap.timeline({
      scrollTrigger: { trigger: ".sec1", start: "top bottom", end: "bottom bottom", scrub: true }
    });
    tlSec1.to(meshRef.current.position, { x: 2.5, ease: "none" })
      .to(meshRef.current.rotation, { y: Math.PI, ease: "none" }, 0);

    const tlSec2 = gsap.timeline({
      scrollTrigger: { trigger: ".sec2", start: "top bottom", end: "bottom bottom", scrub: true }
    });
    tlSec2.to(meshRef.current.position, { x: -2.5, ease: "none" })
      .to(meshRef.current.rotation, { y: Math.PI * 2, ease: "none" }, 0);

    const tlSec3 = gsap.timeline({
      scrollTrigger: { trigger: ".sec3", start: "top bottom", end: "bottom bottom", scrub: true }
    });
    tlSec3.to(meshRef.current.position, { x: 0, ease: "none" })
      .to(meshRef.current.scale, { x: 2, y: 2, z: 2, ease: "none" }, 0);
  });


  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshStandardMaterial color="#ff6b6b" roughness={0.2} />
    </mesh>
  );
}

function App() {

  return (
    <div className="wrapper">
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Environment preset="city" />
          <AnimatedCube />
          <Particles />
        </Canvas>
      </div>

      <main className="scroll-content">
        <section className='section'>
          <h1>下にスクロールしてね ↓</h1>
        </section>
        <section className="section sec1">
          <p>SEC.1</p>
        </section>
        <section className="section sec2">
          <p>SEC.2</p>
        </section>
        <section className="section sec3">
          <p>SEC.3</p>
        </section>
      </main>
    </div>
  );
}

export default App;