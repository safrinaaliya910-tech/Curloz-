'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export default function CameraRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    
    // Smoothly follow mouse
    const target = new THREE.Vector3(
      (state.pointer.x * state.viewport.width) / 10,
      (state.pointer.y * state.viewport.height) / 10,
      0
    );
    
    group.current.position.lerp(target, 0.05);
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      state.pointer.x / 5,
      0.05
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -state.pointer.y / 10,
      0.05
    );
  });

  return <group ref={group}>{children}</group>;
}
