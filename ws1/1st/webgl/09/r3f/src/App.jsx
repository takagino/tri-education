import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import './App.css';

function Box(props) {
  // 2. meshを直接操作するための「目印（ref）」を入れる箱を作る
  const meshRef = useRef();

  // 3. useFrame: 毎フレーム（1秒間に約60回）自動で実行されるループ処理
  useFrame(() => {
    // もし meshRef の中身がちゃんと存在していれば...
    if (meshRef.current) {
      // XYZ軸の回転を少しずつ増やす
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    // 4. ref={meshRef} をつけて、「このメッシュを操作するよ」と宣言する
    <mesh ref={meshRef} position={props.position}>
      <boxGeometry />
      <meshStandardMaterial color={props.color} />
    </mesh>
  );
}

function App() {
  return (
    <div className="container">
      <Canvas camera={{ position: [0, 2, 5] }}>
        <OrbitControls />
        <Environment preset="city" />
        <ContactShadows position={[0, -1.2, 0]} opacity={0.6} scale={10} blur={2.5} />

        <Box position={[-2, 0, 0]} color="hotpink" />
        <Box position={[0, 0, 0]} color="orange" />
        <Box position={[2, 0, 0]} color="cyan" />

      </Canvas>
    </div>
  );
}

export default App;