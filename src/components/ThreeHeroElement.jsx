import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, PresentationControls } from '@react-three/drei';

function BallotBox() {
  const boxRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    boxRef.current.rotation.y = Math.sin(t / 4) / 4;
    boxRef.current.rotation.z = Math.sin(t / 4) / 4;
    boxRef.current.position.y = Math.sin(t / 1.5) / 10;
  });

  return (
    <group ref={boxRef} dispose={null}>
      {/* Box Body */}
      <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.8} />
      </mesh>
      
      {/* Box Lid */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.2, 2.2]} />
        <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.7} />
      </mesh>

      {/* Ballot Slot */}
      <mesh position={[0, 0.65, 0]}>
        <boxGeometry args={[1.2, 0.21, 0.1]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Checkmark or Paper going in */}
      <mesh position={[0, 1.2, 0]} rotation={[0.2, 0, 0]}>
        <planeGeometry args={[1, 1.5]} />
        <meshStandardMaterial color="#ffffff" side={2} emissive="#ffffff" emissiveIntensity={0.2} />
      </mesh>
      
      {/* Neon Accents */}
      <mesh position={[0, -0.5, 1.01]}>
        <planeGeometry args={[1.5, 1.5]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

export default function ThreeHeroElement() {
  return (
    <div className="w-full h-[400px] md:h-[500px] relative z-10 cursor-grab active:cursor-grabbing">
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <PresentationControls 
          global={false} 
          cursor={true} 
          snap={true} 
          speed={1} 
          zoom={1} 
          rotation={[0, 0, 0]} 
          polar={[-Math.PI / 4, Math.PI / 4]} 
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <BallotBox />
          </Float>
        </PresentationControls>
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
