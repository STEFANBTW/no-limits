import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Stage, PerspectiveCamera } from '@react-three/drei';

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.5} />;
}

const ModelViewer = ({ modelUrl, title }: { modelUrl: string, title: string }) => {
  return (
    <div className="w-full h-full bg-theme-panel relative">
      <div className="absolute top-6 left-6 z-10">
        <h3 className="text-theme-text font-serif italic text-2xl">{title}</h3>
        <p className="text-theme-text-subtle text-[10px] uppercase tracking-[0.3em] mt-1 italic">3D Interactive Model</p>
      </div>
      
      <div className="absolute bottom-6 left-6 z-10 flex gap-4 text-theme-text-subtle text-[9px] uppercase tracking-widest font-bold opacity-60">
        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">open_in_full</span> Drag to Rotate</span>
        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">pinch</span> Pinch to Zoom</span>
      </div>

      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6}>
            <Model url={modelUrl} />
          </Stage>
        </Suspense>
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
      </Canvas>

      <div className="absolute inset-0 pointer-events-none border border-theme-border/50"></div>
    </div>
  );
};

export default ModelViewer;
