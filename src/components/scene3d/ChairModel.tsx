import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

interface ChairModelProps {
  url: string;
}

export function ChairModel({ url }: ChairModelProps) {
  const { scene } = useGLTF(url, 'https://www.gstatic.com/draco/versioned/decoders/1.5.5/');

  const { clonedScene, transform } = useMemo(() => {
    const cloned = scene.clone(true);
    cloned.updateMatrixWorld(true);

    // Compute exact bounding box of the loaded mesh
    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    // Normalize width/max-dimension to ~1.6m for a statement seating piece
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = maxDim > 0 ? 1.6 / maxDim : 1.5;

    // Ground the bottom of the bounding box flush at y = 0.015 (top of the flat bouclé rug)
    const posX = -center.x * scale;
    const posY = -box.min.y * scale + 0.015;
    const posZ = -center.z * scale;

    cloned.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material = child.material.clone();
          child.material.envMapIntensity = 1.35;
          child.material.needsUpdate = true;
        }
      }
    });

    return {
      clonedScene: cloned,
      transform: {
        scale,
        position: [posX, posY, posZ] as [number, number, number],
      },
    };
  }, [scene]);

  return (
    <primitive
      object={clonedScene}
      scale={transform.scale}
      position={transform.position}
    />
  );
}
