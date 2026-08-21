import { useState, useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, useGLTF, Text3D, useFont, Center } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const createTimeline = (triggerName, options = {}) => {
  return gsap.timeline({
    scrollTrigger: {
      trigger: triggerName,
      start: "top bottom",
      end: "bottom bottom",
      scrub: true,
      ...options
    },
    defaults: { ease: "none" }
  });
};

useGLTF.preload('./models/flower.glb');
useFont.preload('./fonts/Changa_One_Regular.json');




function Text(props) {
  const ref = useRef();
  const materialRef = useRef();

  useGSAP(() => {
    const tlSec1 = createTimeline(".sec1");
    tlSec1.from(materialRef.current, { opacity: 0 })
      .from(ref.current.position, { y: -1 }, 0);
  });

  return (
    <Center>
      <Text3D
        ref={ref}
        position={props.position}
        font="./fonts/Changa_One_Regular.json"
        size={props.size}
        height={0.3}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.03}
        bevelSize={0.02}
        bevelSegments={5}
      >
        {props.letter}
        <meshStandardMaterial
          ref={materialRef}
          color={props.color}
          roughness={0.2}
          metalness={0.8}
          transparent={true}
          opacity={1}
        />
      </Text3D>
    </Center>
  );
}

function Flower(props) {
  const ref = useRef();
  const model = useGLTF('./models/flower.glb');

  useGSAP(() => {

    const tlSec1 = createTimeline(".sec1");
    tlSec1.to(ref.current.position, { x: 2.5 })
      .to(ref.current.rotation, { y: Math.PI }, 0);

    const tlSec2 = createTimeline(".sec2");
    tlSec2.to(ref.current.position, { x: -2.5 })
      .to(ref.current.rotation, { x: Math.PI }, 0);
  });

  return (
    <primitive
      ref={ref}
      object={model.scene}
      position={props.position}
      scale={props.scale}
    />
  )
}

function Box(props) {
  const ref = useRef();

  return (
    <mesh ref={ref} position={props.position}>
      <boxGeometry />
      <meshStandardMaterial color={props.color} roughness={0.0} metalness={1.0} />
    </mesh>
  )
}

function Particles(props) {
  const ref = useRef();

  const count = props.num;
  const spread = props.spread || 4;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * spread;
    }
    return pos;
  }, [count, spread]);

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={props.size || 0.05}
        color={props.color}
        sizeAttenuation={true}
        transparent={true}
        depthWrite={false}
      />
    </points>
  );
}

function App() {
  // useGSAP(() => {
  //   const tlHeader = createTimeline(".header", { scrub: false });
  //   tlHeader.from(".header__logo", { y: -1, opacity: 0, delay: 1 })
  //     .from(".header__date", { y: -1, opacity: 0 });
  // });

  return (
    <>
      <div className="canvas">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Environment preset="sunset" />
          {/* <Box position={[0, 0, 0]} color="#0ff" />
          <Flower position={[0, 0, 0]} scale={0.5} />
          <Particles num={1000} color="#ff0" size={0.05} spread={4} />
          <Text letter="TWC" position={[0, 0, 0]} size={1.5} color="#f0f" /> */}
        </Canvas>
      </div>

      <header className="header">
        <h1 className="header__logo">TRIDENT WEBDESIGN CONFERENCE 2026</h1>
        <p className='header__date'>2026年8月9日(日)</p>
      </header>

      <main>
        <section className='section sec1'>
          <h2>未来のWebは、触れられる。</h2>
          <p>TRIDENT WEBDESIGN CONFERENCE 2026 は、「視覚を超える体験」をテーマに、次世代のWeb表現とその可能性に迫るカンファレンスです。</p>
          <p>WebGL、インタラクションデザイン、空間的なUI設計など、フロントエンドの新領域で活躍するクリエイターが集結し、未来のWebの「触感」を議論・共有します。</p>
          <p>現実とデジタルの境界が曖昧になる時代に、私たちが届けるべき体験とは何か──それを一緒に考え、かたちにする1日を。</p>
        </section>
        <section className='section sec2'>
          <h2>セッション</h2>
          <article>
            <img src="./images/kawaguchi.jpg" alt="" />
            <h3>Immersive Web Design 〜没入型インターフェースの最前線〜</h3>
            <dl>
              <dt>河口英生</dt>
              <dd>グラフィックデザイナー</dd>
            </dl>
          </article>
          <article>
            <img src="./images/takagi.jpg" alt="" />
            <h3>Touch, Motion, Emotion：インタラクションが動かす感情設計</h3>
            <dl>
              <dt>高木寛貴</dt>
              <dd>インタラクションエンジニア</dd>
            </dl>
          </article>
        </section>
        <section className='section sec3'>
          <h2>開催概要</h2>
          <dl>
            <div>
              <dt>日時</dt>
              <dd>2026年8月9日(日) 13:00- 17:00</dd>
            </div>
            <div>
              <dt>会場</dt>
              <dd>トライデントコンピュータ専門学校 メディアホール（名古屋市中村区）</dd>
            </div>
            <div>
              <dt>参加費</dt>
              <dd>無料（事前登録制）</dd>
            </div>
            <div>
              <dt>参加方法</dt>
              <dd>
                <ul>
                  <li>学校公式サイトまたは当ページの申込フォームより受付。</li>
                  <li>学生・一般どちらも参加可能。オンライン配信あり（URLは申込者に後日送付）</li>
                </ul>
              </dd>
            </div>
            <div>
              <dt>主催</dt>
              <dd>トライデントコンピュータ専門学校 Webデザイン学科</dd>
            </div>
          </dl>
          <p>詳細は<a href='https://computer.trident.ac.jp/'>公式サイト</a>をご覧ください。</p>
        </section>
      </main>

      <footer>
        <p>ハッシュタグ：#TWC2026</p>
        <p><small>&copy; 2026 TRIDENT WEBDESIGN CONFERENCE</small></p>
      </footer>
    </>
  );
}

export default App;