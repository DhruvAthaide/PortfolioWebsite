import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

// Generate random points in 3D space
function generatePoints(count: number) {
  const points = new Float32Array(count * 3);
  const size = 20;
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    points[i3] = (Math.random() - 0.5) * size;
    points[i3 + 1] = (Math.random() - 0.5) * size;
    points[i3 + 2] = (Math.random() - 0.5) * size;
  }
  
  return points;
}

const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { theme } = useTheme();
  
  // Create points once
  const points = useMemo(() => generatePoints(2000), []);
  
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    // Rotate the point cloud slowly
    pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.07;
    
    // Move slightly based on mouse position
    const mouseX = state.mouse.x * 0.1;
    const mouseY = state.mouse.y * 0.1;
    
    pointsRef.current.position.x += (mouseX - pointsRef.current.position.x) * 0.05;
    pointsRef.current.position.y += (-mouseY - pointsRef.current.position.y) * 0.05;
  });

  const pointColor = theme === 'dark' ? '#64FFDA' : '#0073f5';
  
  return (
    <Points ref={pointsRef} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={pointColor}
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  );
};

interface InteractiveBackgroundProps {
  speed?: number;
}

const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({ speed = 0.6 }) => {
  const { theme } = useTheme();
  
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ParticleField />
      </Canvas>
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-dark-800 z-10 pointer-events-none"
        style={{ opacity: 0.7 }}
      />
    </div>
  );
};

export default InteractiveBackground;