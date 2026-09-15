import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BoxBarProps {
  position: [number, number, number];
  height: number;
  color: string;
}

/**
 * Animated 3D Mesh representing a single quantum state probability amplitude bar.
 * Runs on native WebGL via GPU for maximum interactive performance.
 */
const QuantumBar: React.FC<BoxBarProps> = ({ position, height, color }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Subtle wave animation to simulate underlying quantum fluctuations
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = (height / 2) + Math.sin(state.clock.getElapsedTime() * 2 + position[0]) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={[position[0], height / 2, position[2]]}>
      <boxGeometry args={[0.8, height, 0.8]} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.2} 
        metalness={0.8} 
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

interface ProbChartProps {
  prob0: number; // Probability of state |0> (0.0 to 1.0)
  prob1: number; // Probability of state |1> (0.0 to 1.0)
}

/**
 * 3D WebGL Canvas displaying real-time quantum state distribution models for q-excel.
 */
export const ProbChart: React.FC<ProbChartProps> = ({ prob0, prob1 }) => {
  // Scale factor to map 0-1 probabilities into readable 3D spatial heights
  const scaleHeight = 4;
  const height0 = Math.max(prob0 * scaleHeight, 0.1);
  const height1 = Math.max(prob1 * scaleHeight, 0.1);

  return (
    <div className="w-full h-64 bg-slate-950/80 rounded-xl border border-slate-800 shadow-inner relative overflow-hidden">
      <div className="absolute top-3 left-4 z-10">
        <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">WebGL 3D State Distribution Spectrum</span>
      </div>
      
      <Canvas camera={{ position:, fov: 45 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />
        
        {/* |0> State Vector Representation (Teal Bar) */}
        <QuantumBar position={[-1, 0, 0]} height={height0} color="#14b8a6" />
        
        {/* |1> State Vector Representation (Cyan Bar) */}
        <QuantumBar position={[1, 0, 0]} height={height1} color="#06b6d4" />
        
        {/* Floor Grid Guideline */}
        <gridHelper args={[10, 10, '#334155', '#1e293b']} position={[0, 0, 0]} />
      </Canvas>

      {/* Axis Value Callouts */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-around text-[10px] font-mono text-slate-500 px-12">
        <div className="text-center">
          <span className="block text-teal-400 font-bold">|0⟩ State</span>
          <span>{(prob0 * 100).toFixed(1)}%</span>
        </div>
        <div className="text-center">
          <span className="block text-cyan-400 font-bold">|1⟩ State</span>
          <span>{(prob1 * 100).toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
};
