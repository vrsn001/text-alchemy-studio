/* eslint-disable react/no-unknown-property */
import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { easing } from 'maath';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform float uDistortionStrength;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  
  varying vec2 vUv;
  
  // Simplex noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  
  void main() {
    vec2 uv = vUv;
    vec2 center = uMouse;
    
    // Distance from mouse
    float dist = distance(uv, center);
    
    // Create glass lens distortion
    float lensRadius = 0.35;
    float lensStrength = uDistortionStrength;
    
    // Smooth lens falloff
    float lensFactor = smoothstep(lensRadius, 0.0, dist);
    
    // Chromatic aberration offset
    vec2 distortionDir = normalize(uv - center);
    float aberration = lensFactor * 0.02;
    
    // Animated noise distortion
    float noise1 = snoise(uv * 3.0 + uTime * 0.3) * 0.5 + 0.5;
    float noise2 = snoise(uv * 5.0 - uTime * 0.2) * 0.5 + 0.5;
    float noise3 = snoise(uv * 2.0 + uTime * 0.15) * 0.5 + 0.5;
    
    // Combine noises for fluid motion
    float fluidNoise = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2;
    
    // Apply lens distortion to UV
    vec2 lensUv = uv + distortionDir * lensFactor * lensStrength * 0.1;
    
    // Color channels with chromatic aberration
    float r = snoise(lensUv * 4.0 + uTime * 0.2 + vec2(aberration, 0.0));
    float g = snoise(lensUv * 4.0 + uTime * 0.2);
    float b = snoise(lensUv * 4.0 + uTime * 0.2 - vec2(aberration, 0.0));
    
    // Create gradient based on position and noise
    vec3 color1 = uColor1;
    vec3 color2 = uColor2;
    vec3 color3 = uColor3;
    
    float gradientMix = (uv.x + uv.y) * 0.5 + fluidNoise * 0.3;
    vec3 gradient = mix(color1, color2, smoothstep(0.0, 0.5, gradientMix));
    gradient = mix(gradient, color3, smoothstep(0.5, 1.0, gradientMix));
    
    // Glass refraction highlight
    float highlight = pow(1.0 - dist, 3.0) * lensFactor * 0.5;
    float edgeGlow = pow(lensFactor, 2.0) * (1.0 - lensFactor) * 2.0;
    
    // Fresnel-like edge effect
    float fresnel = pow(1.0 - abs(dot(vec2(0.5) - uv, vec2(0.0, 1.0))), 2.0);
    
    // Combine effects
    vec3 finalColor = gradient;
    finalColor += vec3(highlight) * 0.3;
    finalColor += vec3(edgeGlow) * color2 * 0.5;
    finalColor += fresnel * 0.1;
    
    // Add subtle chromatic shift in lens area
    finalColor.r += lensFactor * (r * 0.1 + 0.05);
    finalColor.g += lensFactor * (g * 0.08);
    finalColor.b += lensFactor * (b * 0.1 + 0.05);
    
    // Glass transparency effect
    float alpha = 0.6 + fluidNoise * 0.2 + lensFactor * 0.2;
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

interface GlassPlaneProps {
  isDark: boolean;
}

function GlassPlane({ isDark }: GlassPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });
  const { size, viewport } = useThree();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uDistortionStrength: { value: 1.5 },
    uColor1: { value: new THREE.Color(isDark ? '#1a0533' : '#f3e8ff') },
    uColor2: { value: new THREE.Color(isDark ? '#7c3aed' : '#c084fc') },
    uColor3: { value: new THREE.Color(isDark ? '#ec4899' : '#f472b6') },
  }), [isDark, size.width, size.height]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    const material = meshRef.current.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value = state.clock.elapsedTime;
    
    // Smooth mouse following
    easing.damp(mouseRef.current, 'x', targetMouseRef.current.x, 0.15, delta);
    easing.damp(mouseRef.current, 'y', targetMouseRef.current.y, 0.15, delta);
    
    material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
  });

  // Handle pointer move
  const handlePointerMove = (e: THREE.Event & { uv?: THREE.Vector2 }) => {
    if (e.uv) {
      targetMouseRef.current.x = e.uv.x;
      targetMouseRef.current.y = e.uv.y;
    }
  };

  return (
    <mesh 
      ref={meshRef} 
      onPointerMove={handlePointerMove}
      scale={[viewport.width, viewport.height, 1]}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

interface GlassDistortionProps {
  className?: string;
  isDark?: boolean;
}

export function GlassDistortion({ className = '', isDark = true }: GlassDistortionProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        style={{ background: 'transparent' }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: 'high-performance'
        }}
      >
        <GlassPlane isDark={isDark} />
      </Canvas>
    </div>
  );
}

export default GlassDistortion;
