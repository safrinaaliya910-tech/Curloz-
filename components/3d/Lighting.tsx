'use client';

import { Environment, ContactShadows } from '@react-three/drei';

export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.5}
        color="#D89A5C" // copper-light
        castShadow
        shadow-mapSize={1024}
      />
      <directionalLight
        position={[-5, 5, -5]}
        intensity={0.8}
        color="#ffffff" // rim light
      />
      <Environment preset="studio" />
      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.6}
        scale={10}
        blur={2}
        far={4}
        color="#1A1712"
      />
    </>
  );
}
