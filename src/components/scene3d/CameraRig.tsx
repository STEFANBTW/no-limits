import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

export type CameraPreset = 'hero' | 'atelier' | 'profile' | 'top_down';

interface CameraRigProps {
  preset: CameraPreset;
  autoRotate: boolean;
}

const PRESET_CONFIG: Record<CameraPreset, { position: [number, number, number]; target: [number, number, number] }> = {
  hero: {
    position: [0, 0.95, 2.7],
    target: [0, 0.45, 0],
  },
  atelier: {
    position: [2.2, 1.5, 2.6],
    target: [0, 0.55, 0],
  },
  profile: {
    position: [-2.0, 1.05, 2.2],
    target: [0, 0.45, 0],
  },
  top_down: {
    position: [0, 3.8, 0.6],
    target: [0, 0.1, 0],
  },
};

// Room interior boundaries: walls are at ±3.8, so clamp camera safely inside [-3.2, 3.2]
const ROOM_BOUND_MIN_X = -3.2;
const ROOM_BOUND_MAX_X = 3.2;
const ROOM_BOUND_MIN_Z = -3.2;
const ROOM_BOUND_MAX_Z = 3.2;
const ROOM_BOUND_MIN_Y = 0.25;
const ROOM_BOUND_MAX_Y = 4.2;

export function CameraRig({ preset, autoRotate }: CameraRigProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();

  const isTransitioning = useRef(true);
  const targetPos = useRef(new THREE.Vector3(...PRESET_CONFIG[preset].position));
  const targetLookAt = useRef(new THREE.Vector3(...PRESET_CONFIG[preset].target));

  useEffect(() => {
    const config = PRESET_CONFIG[preset];
    targetPos.current.set(...config.position);
    targetLookAt.current.set(...config.target);
    isTransitioning.current = true;
  }, [preset]);

  useFrame((_, delta) => {
    if (!controlsRef.current) return;

    if (isTransitioning.current) {
      // Smooth frame-rate independent exponential damping
      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetPos.current.x, 3.8, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetPos.current.y, 3.8, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetPos.current.z, 3.8, delta);

      const currentTarget = controlsRef.current.target;
      currentTarget.x = THREE.MathUtils.damp(currentTarget.x, targetLookAt.current.x, 3.8, delta);
      currentTarget.y = THREE.MathUtils.damp(currentTarget.y, targetLookAt.current.y, 3.8, delta);
      currentTarget.z = THREE.MathUtils.damp(currentTarget.z, targetLookAt.current.z, 3.8, delta);

      controlsRef.current.update();

      // Check if settled
      if (
        camera.position.distanceTo(targetPos.current) < 0.05 &&
        currentTarget.distanceTo(targetLookAt.current) < 0.05
      ) {
        isTransitioning.current = false;
      }
    }

    // Strictly keep camera inside the room walls during full 360° rotation
    camera.position.x = THREE.MathUtils.clamp(camera.position.x, ROOM_BOUND_MIN_X, ROOM_BOUND_MAX_X);
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, ROOM_BOUND_MIN_Z, ROOM_BOUND_MAX_Z);
    camera.position.y = THREE.MathUtils.clamp(camera.position.y, ROOM_BOUND_MIN_Y, ROOM_BOUND_MAX_Y);
  });

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enablePan={false}
      enableDamping
      dampingFactor={0.06}
      autoRotate={autoRotate}
      autoRotateSpeed={0.85}
      minPolarAngle={0.08} // Allow near-vertical top-down Plan view
      maxPolarAngle={Math.PI / 2 - 0.05} // Never clip beneath the floor
      minDistance={1.6}
      maxDistance={3.25} // Keep 360° orbit radius strictly inside the ±3.8m room walls
      onStart={() => {
        isTransitioning.current = false;
      }}
    />
  );
}
