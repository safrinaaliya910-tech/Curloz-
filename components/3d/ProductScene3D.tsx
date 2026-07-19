'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ProductType } from '@/lib/data/products';

interface ProductScene3DProps {
  type: ProductType;
  bottleColor: string;
  capColor: string;
  isHovered?: boolean;
}

export default function ProductScene3D({ type, bottleColor, capColor, isHovered = false }: ProductScene3DProps) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Auto-rotate slowly
    meshRef.current.rotation.y += 0.005;

    // Slight tilt on hover
    if (isHovered) {
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -0.1, 0.1);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, 0.2, 0.1);
    } else {
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, 0.1);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, 0, 0.1);
    }
  });

  const isJar = type === 'treatment';

  return (
    <group ref={meshRef} dispose={null}>
      {isJar ? (
        // Jar Geometry (Curl Cream)
        <group position={[0, -0.5, 0]}>
          {/* Jar Body */}
          <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[1, 1, 1.2, 32]} />
            <meshStandardMaterial color={bottleColor} roughness={0.7} metalness={0.1} />
          </mesh>
          {/* Jar Cap */}
          <mesh position={[0, 1.15, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[1.02, 1.02, 0.3, 32]} />
            <meshPhysicalMaterial 
              color={capColor} 
              metalness={0.9} 
              roughness={0.1} 
              clearcoat={1} 
              clearcoatRoughness={0.1} 
            />
          </mesh>
        </group>
      ) : (
        // Bottle Geometry (Shampoo/Conditioner)
        <group position={[0, -1, 0]}>
          {/* Bottle Body */}
          <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.8, 0.8, 2.4, 32]} />
            <meshStandardMaterial color={bottleColor} roughness={0.5} metalness={0.1} />
          </mesh>
          {/* Bottle Shoulder */}
          <mesh position={[0, 2.4, 0]} castShadow receiveShadow>
            <sphereGeometry args={[0.8, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color={bottleColor} roughness={0.5} metalness={0.1} />
          </mesh>
          {/* Bottle Neck */}
          <mesh position={[0, 2.6, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.3, 0.3, 0.4, 32]} />
            <meshStandardMaterial color={bottleColor} roughness={0.5} metalness={0.1} />
          </mesh>
          {/* Bottle Cap */}
          <mesh position={[0, 3.0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.32, 0.32, 0.6, 32]} />
            <meshPhysicalMaterial 
              color={capColor} 
              metalness={1} 
              roughness={0.2} 
              clearcoat={1} 
              clearcoatRoughness={0.1} 
            />
          </mesh>
        </group>
      )}
    </group>
  );
}
