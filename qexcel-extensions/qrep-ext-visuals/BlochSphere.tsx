import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

interface BlochVectorProps {
  theta: number; // Polar angle in radians
  phi: number;   // Azimuthal angle in radians
}

/**
 * Animated 3D Quantum State Vector tracking the exact coordinates inside the Bloch Sphere.
 */
const QuantumStateVector: React.FC<BlochVectorProps> = ({ theta, phi }) => {
  const lineRef = useRef<any>(null);

  // Compute standard spherical coordinates mapping onto Cartesian space coordinates
  const x = Math.sin(theta) * Math.cos(phi);
  const z = Math.cos(theta); // Mapping vertical axis standard representation
  const y = Math.sin(theta) * Math.sin(phi);

  const vectorTarget = new THREE.Vector3(x * 2, z * 2, y * 2);

  return (
    <group>
      {/* Dynamic Main Pointer Arrow Line */}
      <Line 
        points={[[0, 0, 0], [vectorTarget.x, vectorTarget.y, vectorTarget.z]]} 
        color="#22d3ee" 
        lineWidth={3} 
      />
      {/* End Point Indicator Orb */}
      <Sphere args={[0.08, 16, 16]} position={[vectorTarget.x, vectorTarget.y, vectorTarget.z]}>
        <meshBasicMaterial color="#38bdf8" />
      </Sphere>
    </group>
  );
};

/**
 * High-performance 3D WebGL Bloch Sphere extension module tailored for advanced users.
 */
export const BlochSphereVisualizer: React.FC<BlochVectorProps> = ({ theta, phi }) => {
  return (
    <div className="w-full h-80 bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-4 left-4 z-10">
        <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase bg-cyan-950/40 px-2 py-1 rounded border border-cyan-500/20">
          Bloch Sphere Visual Engine Extension
        </span>
      </div>

      <Canvas camera={{ position:, fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        
        {/* Core Wireframe Bloch Sphere Outer Shell */}
        <Sphere args={[2, 32, 32]}>
          <meshStandardMaterial 
            color="#334155" 
            wireframe 
            transparent 
            opacity={0.15} 
          />
        </Sphere>

        {/* Spatial Axis Guideline System (X, Y, Z coordinates layout) */}
        {/* Z-Axis: Computational Base States |0> and |1> */}
        <Line points={[[0, -2.5, 0], [0, 2.5, 0]]} color="#64748b" lineWidth={1} />
        {/* X-Axis: Superposition Phase Boundary Mapping */}
        <Line points={[[-2.5, 0, 0], [2.5, 0, 0]]} color="#475569" lineWidth={1} />
        {/* Y-Axis: Complex Imaginary Coordinate Interface */}
        <Line points={[[0, 0, -2.5], [0, 0, 2.5]]} color="#475569" lineWidth={1} />

        {/* Dynamic State Vector Layer */}
        <QuantumStateVector theta={theta} phi={phi} />

        {/* Interactive camera orbit controls mapping constraint guidelines */}
        <OrbitControls enableZoom={true} enablePan={false} maxDistance={8} minDistance={3} />
      </Canvas>

      {/* Sphere State Vector Mathematical Callout Badges */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between font-mono text-[10px] text-slate-500 bg-slate-900/40 p-2 rounded-lg border border-slate-800/60 backdrop-blur-sm">
        <div><span className="text-slate-400">|0⟩ (North Pole):</span> Pure Zero State</div>
        <div><span className="text-slate-400">|1⟩ (South Pole):</span> Pure One State</div>
      </div>
    </div>
  );
};
