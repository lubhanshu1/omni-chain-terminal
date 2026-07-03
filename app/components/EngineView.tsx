'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const VertexShader = `
  uniform float uTime;
  uniform float uVolatility;
  varying vec3 vPosition;
  varying float vAlpha;

  void main() {
    vPosition = position;
    
    // Create a slow, elegant twist based on height (Y-axis) and time
    float twist = position.y * 0.15;
    float angle = uTime * (0.1 + uVolatility * 0.3) + twist;
    float s = sin(angle);
    float c = cos(angle);
    
    // Apply rotation matrix
    vec3 rotatedPosition = vec3(
      position.x * c - position.z * s,
      position.y,
      position.x * s + position.z * c
    );
    
    // Subtle breathing effect based on market volatility
    rotatedPosition.x *= 1.0 + (sin(uTime + position.y) * 0.05 * uVolatility);
    rotatedPosition.z *= 1.0 + (cos(uTime + position.y) * 0.05 * uVolatility);
    
    vec4 modelViewPosition = modelViewMatrix * vec4(rotatedPosition, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;
    
    // Calculate distance from center to fade out edges smoothly
    float distanceFromCenter = length(rotatedPosition.xz);
    vAlpha = smoothstep(8.0, 0.0, distanceFromCenter);
    
    // Ultra-fine particle sizing based on depth
    gl_PointSize = 2.5 * (100.0 / -modelViewPosition.z);
  }
`;

const FragmentShader = `
  uniform float uVolatility;
  varying vec3 vPosition;
  varying float vAlpha;

  void main() {
    // Crisp circular particles
    vec2 pt = gl_PointCoord - vec2(0.5);
    if (dot(pt, pt) > 0.25) discard;
    
    // Pro-level palette: Cyan to Deep Purple
    vec3 baseColor = vec3(0.0, 0.8, 1.0); // Neon Cyan
    vec3 volatileColor = vec3(0.5, 0.0, 1.0); // Deep Violet
    
    // Color shifts slightly based on vertical position and volatility
    float mixFactor = smoothstep(-15.0, 15.0, vPosition.y) * uVolatility;
    vec3 finalColor = mix(baseColor, volatileColor, mixFactor);
    
    // Keep opacity extremely low and elegant to avoid the "glowing sun" bug
    float finalAlpha = vAlpha * 0.35; 
    
    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`;

function ParticleSwarmEngine({ volatility }: { volatility: number }) {
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    // 8,000 points is the perfect balance for a clean, sparse look without lagging
    const particleCount = 8000;

    const points = useMemo(() => {
        const coords = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            // Distribute points in a tall vertical funnel
            const y = (Math.random() - 0.5) * 40; // Height spread from -20 to 20

            // Radius pinches slightly in the middle, wider at top/bottom
            const radius = 2.0 + Math.random() * 2.5 + Math.abs(y) * 0.05;
            const angle = Math.random() * Math.PI * 2;

            coords[i * 3] = Math.cos(angle) * radius;     // X
            coords[i * 3 + 1] = y;                        // Y
            coords[i * 3 + 2] = Math.sin(angle) * radius; // Z
        }
        return coords;
    }, []);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uVolatility: { value: 0 }
    }), []);

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
            materialRef.current.uniforms.uVolatility.value = THREE.MathUtils.lerp(
                materialRef.current.uniforms.uVolatility.value,
                volatility,
                0.05
            );
        }
    });

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={points}
                    itemSize={3}
                />
            </bufferGeometry>
            <shaderMaterial
                ref={materialRef}
                vertexShader={VertexShader}
                fragmentShader={FragmentShader}
                uniforms={uniforms}
                transparent={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export default function EngineView({ marketVolatility = 0.15 }: { marketVolatility?: number }) {
    return (
        <div className="w-full h-screen bg-black fixed inset-0 z-0 flex justify-center items-center">
            {/* Pushed camera back to Z:25 to see the full majestic height of the vortex */}
            <Canvas camera={{ position: [0, 0, 25], fov: 45 }} dpr={[1, 2]}>
                <ParticleSwarmEngine volatility={marketVolatility} />
            </Canvas>
        </div>
    );
}