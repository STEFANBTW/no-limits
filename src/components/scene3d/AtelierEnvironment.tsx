import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { ContactShadows } from '@react-three/drei';
import {
  createParquetFloorTexture,
  createBoucleRugTexture,
  createAbstractArtTexture,
  createFlutedWoodTexture,
  createTravertineTexture,
} from './proceduralTextures';

export type AtmosphereMode = 'daylight' | 'golden' | 'nocturne';

interface AtelierEnvironmentProps {
  atmosphere: AtmosphereMode;
  lampOn: boolean;
  sceneMode: 'full' | 'pedestal';
}

export function AtelierEnvironment({ atmosphere, lampOn, sceneMode }: AtelierEnvironmentProps) {
  const { gl, scene } = useThree();

  // Setup PMREM procedural RoomEnvironment for realistic PBR studio reflections
  useEffect(() => {
    const pmremGenerator = new THREE.PMREMGenerator(gl);
    pmremGenerator.compileEquirectangularShader();
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;

    return () => {
      envTexture.dispose();
      pmremGenerator.dispose();
    };
  }, [gl, scene]);

  // Create procedural textures once
  const textures = useMemo(() => {
    return {
      parquet: createParquetFloorTexture(),
      rug: createBoucleRugTexture(),
      art: createAbstractArtTexture(),
      fluted: createFlutedWoodTexture(),
      travertine: createTravertineTexture(),
    };
  }, []);

  // Cleanup textures on unmount
  useEffect(() => {
    return () => {
      Object.values(textures).forEach((tex) => tex.dispose());
    };
  }, [textures]);

  // Lighting parameters based on active atmosphere
  const lightConfig = useMemo(() => {
    switch (atmosphere) {
      case 'golden':
        return {
          ambientColor: '#4a3424',
          ambientIntensity: 0.65,
          sunColor: '#ff9838',
          sunIntensity: 4.8,
          sunPosition: [-6, 3.5, 2] as [number, number, number],
          fillColor: '#8a6442',
          fillIntensity: 0.8,
          spotIntensity: 3.0,
          coveColor: '#ff8c1a',
          coveIntensity: 2.2,
          lampMultiplier: 1.3,
        };
      case 'nocturne':
        return {
          ambientColor: '#12141a',
          ambientIntensity: 0.4,
          sunColor: '#4d5b75',
          sunIntensity: 0.6,
          sunPosition: [-5, 5, 2] as [number, number, number],
          fillColor: '#2b3345',
          fillIntensity: 0.5,
          spotIntensity: 6.2,
          coveColor: '#ff8000',
          coveIntensity: 1.8,
          lampMultiplier: 1.8,
        };
      case 'daylight':
      default:
        return {
          ambientColor: '#cfd7e3',
          ambientIntensity: 0.95,
          sunColor: '#fff5ea',
          sunIntensity: 3.6,
          sunPosition: [-6, 6, 2.5] as [number, number, number],
          fillColor: '#e0d8cc',
          fillIntensity: 1.2,
          spotIntensity: 2.5,
          coveColor: '#ffb366',
          coveIntensity: 1.0,
          lampMultiplier: 0.7,
        };
    }
  }, [atmosphere]);

  // Dedicated spotlight target for the hero chair
  const spotTargetRef = useRef<THREE.Object3D>(null);

  // If user selected "pedestal" mode, render clean minimalist museum plinth
  if (sceneMode === 'pedestal') {
    return (
      <group>
        {/* Soft studio ambient */}
        <ambientLight color={lightConfig.ambientColor} intensity={lightConfig.ambientIntensity} />
        <directionalLight 
          position={lightConfig.sunPosition} 
          intensity={lightConfig.sunIntensity * 0.8} 
          color={lightConfig.sunColor} 
          castShadow 
        />
        <directionalLight position={[4, 5, -2]} intensity={1.2} color="#fff" />

        {/* Minimalist Floating Atelier Disc Plinth */}
        <mesh receiveShadow position={[0, -0.01, 0]}>
          <cylinderGeometry args={[2.2, 2.3, 0.06, 64]} />
          <meshStandardMaterial color="#1a1816" roughness={0.4} metalness={0.1} />
        </mesh>
        
        {/* Satin Brass Edge Ring */}
        <mesh position={[0, -0.01, 0]}>
          <cylinderGeometry args={[2.31, 2.31, 0.05, 64]} />
          <meshStandardMaterial color="#c29b53" metalness={0.9} roughness={0.25} />
        </mesh>

        {/* Contact Shadow grounding */}
        <ContactShadows 
          position={[0, 0.02, 0]} 
          opacity={0.85} 
          scale={5.5} 
          blur={1.8} 
          far={2.5} 
          color="#000000" 
        />
      </group>
    );
  }

  return (
    <group>
      {/* ---------------- LIGHTING RIG ---------------- */}
      <ambientLight color={lightConfig.ambientColor} intensity={lightConfig.ambientIntensity} />
      
      {/* Directional Key Light (Streaming through window slats) */}
      <directionalLight
        position={lightConfig.sunPosition}
        intensity={lightConfig.sunIntensity}
        color={lightConfig.sunColor}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-4}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-bias={-0.0003}
      />

      {/* Gentle Fill Light */}
      <directionalLight 
        position={[4, 3, 3]} 
        intensity={lightConfig.fillIntensity} 
        color={lightConfig.fillColor} 
      />

      {/* Hero Spotlight on Chair */}
      <spotLight
        position={[0, 4.6, 1.8]}
        target={spotTargetRef.current || undefined}
        angle={0.65}
        penumbra={0.7}
        intensity={lightConfig.spotIntensity}
        color={atmosphere === 'nocturne' ? '#fff4e6' : '#ffffff'}
        castShadow
        shadow-bias={-0.0005}
      />
      <object3D ref={spotTargetRef} position={[0, 0.35, 0]} />

      {/* Gallery Ceiling Picture Light over Wall Art */}
      <spotLight
        position={[0, 4.2, -2.2]}
        position-z={-2.2}
        intensity={atmosphere === 'nocturne' ? 2.5 : 1.5}
        angle={0.55}
        penumbra={0.6}
        color="#fff1dd"
      />

      {/* ---------------- FLOOR ---------------- */}
      {/* Smoked Oak Parquet Floor */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial 
          map={textures.parquet} 
          roughness={0.38} 
          metalness={0.05} 
        />
      </mesh>

      {/* ---------------- RUG ---------------- */}
      {/* Luxury Woven Bouclé Wool Rug - Lies completely flat on the floor beneath the sofa */}
      <group position={[0, 0.008, 0]}>
        {/* Main Rug Body - Cylinder with NO rotation lies flat on the X-Z floor */}
        <mesh receiveShadow position={[0, 0.005, 0]}>
          <cylinderGeometry args={[2.5, 2.52, 0.01, 64]} />
          <meshStandardMaterial 
            map={textures.rug} 
            roughness={0.88} 
            metalness={0.02} 
          />
        </mesh>
        {/* Beveled Edge Piping Trim */}
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.51, 0.008, 16, 64]} />
          <meshStandardMaterial color="#1a1815" roughness={0.9} />
        </mesh>
      </group>

      {/* ---------------- REAR GALLERY WALL ---------------- */}
      {/* Main Back Wall */}
      <mesh receiveShadow position={[0, 2.5, -3.8]}>
        <boxGeometry args={[13, 5.0, 0.2]} />
        <meshStandardMaterial color="#1f1c19" roughness={0.92} metalness={0.05} />
      </mesh>

      {/* Architectural Recessed Center Niche Panel */}
      <mesh receiveShadow position={[0, 2.5, -3.72]}>
        <boxGeometry args={[3.2, 4.4, 0.08]} />
        <meshStandardMaterial color="#181614" roughness={0.85} metalness={0.08} />
      </mesh>

      {/* Hidden LED Cove Uplight Strip at Base of Niche */}
      <pointLight 
        position={[0, 0.2, -3.6]} 
        color={lightConfig.coveColor} 
        intensity={lightConfig.coveIntensity} 
        distance={3.5} 
        decay={2}
      />
      <mesh position={[0, 0.08, -3.65]}>
        <boxGeometry args={[3.1, 0.04, 0.06]} />
        <meshStandardMaterial 
          emissive={lightConfig.coveColor} 
          emissiveIntensity={lightConfig.coveIntensity * 0.8} 
          color="#ffb366" 
        />
      </mesh>

      {/* Architectural Wall Baseboard */}
      <mesh position={[0, 0.08, -3.68]}>
        <boxGeometry args={[13, 0.16, 0.05]} />
        <meshStandardMaterial color="#12100e" roughness={0.3} metalness={0.6} />
      </mesh>

      {/* Framed Contemporary Canvas Painting */}
      <group position={[0, 2.5, -3.62]}>
        {/* Solid Walnut Shadowbox Frame */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.9, 2.4, 0.08]} />
          <meshStandardMaterial color="#2d221a" roughness={0.45} metalness={0.1} />
        </mesh>
        {/* Stretched Art Canvas */}
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[1.76, 2.26, 0.05]} />
          <meshStandardMaterial map={textures.art} roughness={0.7} metalness={0.12} />
        </mesh>
      </group>

      {/* ---------------- LEFT ARCHITECTURAL SCREEN & WINDOW ---------------- */}
      {/* Vertical Bronze Louvers / Slats */}
      <group position={[-3.8, 2.5, 0]}>
        {Array.from({ length: 11 }).map((_, i) => (
          <mesh key={i} castShadow receiveShadow position={[0, 0, -2.5 + i * 0.5]}>
            <boxGeometry args={[0.06, 5.0, 0.04]} />
            <meshStandardMaterial color="#241e18" roughness={0.3} metalness={0.75} />
          </mesh>
        ))}
        {/* Soft Exterior Light Curtain Plane */}
        <mesh position={[-0.4, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[6.0, 5.0]} />
          <meshBasicMaterial 
            color={atmosphere === 'golden' ? '#ffcc88' : (atmosphere === 'nocturne' ? '#1c2230' : '#e6f0fa')} 
            side={THREE.DoubleSide} 
          />
        </mesh>
      </group>

      {/* ---------------- RIGHT ARCHITECTURAL PILASTER ---------------- */}
      <group position={[3.8, 2.5, -1.0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.5, 5.0, 2.8]} />
          <meshStandardMaterial color="#1d1a18" roughness={0.9} />
        </mesh>
        {/* Brass Inlay Reveal Channel */}
        <mesh position={[-0.24, 0, 0]}>
          <boxGeometry args={[0.02, 5.0, 0.04]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* ---------------- SCULPTURAL SIDE TABLE ---------------- */}
      <group position={[1.35, 0, 0.05]}>
        {/* Fluted Dark Walnut Drum */}
        <mesh castShadow receiveShadow position={[0, 0.19, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.38, 32]} />
          <meshStandardMaterial 
            map={textures.fluted} 
            roughness={0.55} 
            metalness={0.05} 
          />
        </mesh>

        {/* Satin Brass Base Rim */}
        <mesh position={[0, 0.012, 0]}>
          <cylinderGeometry args={[0.27, 0.27, 0.024, 32]} />
          <meshStandardMaterial color="#c59b48" metalness={0.9} roughness={0.25} />
        </mesh>

        {/* Honed Roman Travertine Top Slab */}
        <mesh castShadow receiveShadow position={[0, 0.395, 0]}>
          <cylinderGeometry args={[0.31, 0.31, 0.03, 32]} />
          <meshStandardMaterial 
            map={textures.travertine} 
            roughness={0.42} 
            metalness={0.08} 
          />
        </mesh>

        {/* Brushed Brass Top Bevel Collar */}
        <mesh position={[0, 0.38, 0]}>
          <cylinderGeometry args={[0.315, 0.315, 0.01, 32]} />
          <meshStandardMaterial color="#c59b48" metalness={0.85} roughness={0.25} />
        </mesh>

        {/* Stacked Hardcover Art Books */}
        <group position={[-0.04, 0.415, -0.03]} rotation={[0, 0.2, 0]}>
          {/* Bottom Monograph */}
          <mesh castShadow position={[0, 0.016, 0]}>
            <boxGeometry args={[0.22, 0.032, 0.26]} />
            <meshStandardMaterial color="#1a1816" roughness={0.7} />
          </mesh>
          {/* Top Monograph (Offset) */}
          <mesh castShadow position={[0.02, 0.04, 0.01]} rotation={[0, -0.15, 0]}>
            <boxGeometry args={[0.19, 0.026, 0.23]} />
            <meshStandardMaterial color="#4a3b32" roughness={0.65} />
          </mesh>
        </group>

        {/* Ceramic Sculptural Vessel */}
        <group position={[0.1, 0.41, 0.07]}>
          {/* Vase Body */}
          <mesh castShadow position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.035, 0.06, 0.2, 24]} />
            <meshStandardMaterial color="#8a5d3b" roughness={0.88} />
          </mesh>
          <mesh castShadow position={[0, 0.21, 0]}>
            <cylinderGeometry args={[0.024, 0.035, 0.05, 24]} />
            <meshStandardMaterial color="#7a5030" roughness={0.9} />
          </mesh>
          {/* Dried Minimalist Botanical Branch */}
          <mesh position={[0.025, 0.32, 0.02]} rotation={[0.1, 0, 0.2]}>
            <cylinderGeometry args={[0.003, 0.004, 0.2, 8]} />
            <meshStandardMaterial color="#30261f" roughness={0.95} />
          </mesh>
          <mesh position={[0.06, 0.38, 0.03]} rotation={[0.2, 0.4, 0.5]}>
            <cylinderGeometry args={[0.002, 0.003, 0.12, 8]} />
            <meshStandardMaterial color="#30261f" roughness={0.95} />
          </mesh>
        </group>
      </group>

      {/* ---------------- ARCHITECTURAL FLOOR LAMP ---------------- */}
      <group position={[-1.65, 0, -0.35]}>
        {/* Weighted Dark Marble Base */}
        <mesh castShadow receiveShadow position={[0, 0.018, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.035, 32]} />
          <meshStandardMaterial color="#141312" roughness={0.35} metalness={0.2} />
        </mesh>

        {/* Satin Brass Vertical Stem */}
        <mesh castShadow position={[0, 0.95, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 1.85, 16]} />
          <meshStandardMaterial color="#c59b48" metalness={0.9} roughness={0.22} />
        </mesh>

        {/* Cantilever Arm */}
        <mesh castShadow position={[0.22, 1.85, 0.08]} rotation={[0, 0.35, -Math.PI / 12]}>
          <cylinderGeometry args={[0.01, 0.01, 0.55, 16]} />
          <meshStandardMaterial color="#c59b48" metalness={0.9} roughness={0.22} />
        </mesh>

        {/* Conical Dark Bronze Shade */}
        <mesh castShadow position={[0.42, 1.76, 0.15]} rotation={[0, 0, Math.PI / 6]}>
          <cylinderGeometry args={[0.08, 0.18, 0.18, 24]} />
          <meshStandardMaterial color="#261e16" roughness={0.35} metalness={0.8} />
        </mesh>

        {/* Luminous Diffuser Bulb */}
        <mesh position={[0.42, 1.72, 0.15]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial 
            emissive={lampOn ? '#ffa64d' : '#221508'} 
            emissiveIntensity={lampOn ? 2.5 * lightConfig.lampMultiplier : 0.1}
            color="#ffe0b2" 
          />
        </mesh>

        {/* Real Dynamic Reading Light from Floor Lamp */}
        {lampOn && (
          <pointLight
            position={[0.42, 1.68, 0.15]}
            color="#ffaa55"
            intensity={3.8 * lightConfig.lampMultiplier}
            distance={4.2}
            decay={2}
            castShadow
            shadow-bias={-0.0008}
          />
        )}
      </group>

      {/* ---------------- BACKGROUND MODERNIST SCULPTURE ---------------- */}
      <group position={[-2.6, 0, -3.1]}>
        {/* Charcoal Gallery Plinth */}
        <mesh castShadow receiveShadow position={[0, 0.3, 0]}>
          <boxGeometry args={[0.65, 0.6, 0.65]} />
          <meshStandardMaterial color="#1a1816" roughness={0.7} />
        </mesh>
        {/* Cast Bronze Modernist Ribbon Sculpture */}
        <mesh castShadow receiveShadow position={[0, 0.8, 0]} rotation={[0.4, 0.6, 0.2]}>
          <torusKnotGeometry args={[0.18, 0.045, 64, 16]} />
          <meshStandardMaterial 
            color="#b38742" 
            metalness={0.94} 
            roughness={0.16} 
          />
        </mesh>
      </group>

      {/* ---------------- GROUND CONTACT SHADOWS ---------------- */}
      <ContactShadows
        position={[0, 0.015, 0]}
        opacity={0.82}
        scale={9.5}
        blur={2.0}
        far={3.8}
        resolution={1024}
        color="#080605"
      />
    </group>
  );
}
