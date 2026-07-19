'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { fadeInUp } from '@/lib/utils/animations';

function LogoEmblem3D() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1) * 0.1;
  });

  return (
    <group ref={groupRef}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[2, 2, 0.2, 64]} />
        <meshPhysicalMaterial 
          color="#B8722D" // Copper
          metalness={1}
          roughness={0.2}
          clearcoat={1}
        />
      </mesh>
      {/* Inner dark circle to simulate the logo background */}
      <mesh position={[0, 0.11, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.8, 64]} />
        <meshStandardMaterial color="#0D0B08" roughness={0.8} />
      </mesh>
    </group>
  );
}

export default function ContactMap() {
  return (
    <motion.div variants={fadeInUp} className="w-full h-full flex flex-col justify-center">
      <div className="mb-12">
        <h3 className="font-serif text-3xl text-charcoal mb-6">Get in Touch</h3>
        <p className="font-sans text-charcoal/70 leading-relaxed mb-8">
          Whether you have a question about our ingredients, need help building your routine, or want to inquire about orders, our concierges are here for you.
        </p>
        
        <div className="space-y-6 font-sans text-charcoal/80">
          <div className="flex items-start gap-4">
            <Mail className="text-copper mt-1" size={20} />
            <div>
              <p className="font-medium text-charcoal">Email</p>
              <a href="mailto:concierge@curloz.com" className="hover:text-copper transition-colors">concierge@curloz.com</a>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <Phone className="text-copper mt-1" size={20} />
            <div>
              <p className="font-medium text-charcoal">Phone</p>
              <a href="tel:+18005550199" className="hover:text-copper transition-colors">1-800-555-0199</a>
              <p className="text-xs text-charcoal/50 mt-1">Mon-Fri, 9am - 5pm EST</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <MapPin className="text-copper mt-1" size={20} />
            <div>
              <p className="font-medium text-charcoal">Headquarters</p>
              <p>123 Royal Crescent<br/>New York, NY 10001</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating 3D Emblem */}
      <div className="relative h-64 w-full bg-off-white rounded-sm overflow-hidden flex items-center justify-center border border-copper/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-copper/5 to-transparent z-0" />
        <div className="w-full h-full z-10">
          <Canvas camera={{ position: [0, 5, 5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 10, 5]} intensity={1.5} color="#D89A5C" />
              <Environment preset="studio" />
              <LogoEmblem3D />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </motion.div>
  );
}
