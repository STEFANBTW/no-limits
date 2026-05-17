import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Stage, PerspectiveCamera, Center, Float } from '@react-three/drei';

// Initialize Draco decoder from Google GStatic for speed and compatibility
// This handles the compression you mentioned perfectly.
function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url, 'https://www.gstatic.com/draco/versioned/decoders/1.5.5/');
  
  // Basic material optimization for mobile
  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = false;
        child.receiveShadow = false;
        // Ensure materials aren't excessively heavy
        if (child.material) {
          child.material.precision = 'lowp';
        }
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={1.2} />;
}

const Loader = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-theme-panel/80 z-20 backdrop-blur-md">
    <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
    <span className="text-[10px] uppercase tracking-[0.4em] text-theme-text opacity-40 font-bold">Initializing Artifact</span>
  </div>
);

const ModelViewer = ({ modelUrl, title }: { modelUrl: string, title: string }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  return (
    <div className="w-full h-full bg-theme-panel relative overflow-hidden group">
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <h3 className="text-theme-text font-serif italic text-2xl group-hover:text-primary transition-colors duration-500">{title}</h3>
        <p className="text-theme-text-subtle text-[10px] uppercase tracking-[0.3em] mt-1 italic">3D Interactive Portfolio</p>
      </div>
      
      <div className="absolute bottom-6 left-6 z-10 flex gap-4 text-theme-text-subtle text-[9px] uppercase tracking-widest font-bold opacity-30 hover:opacity-100 transition-opacity duration-500">
        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">open_in_full</span> Drag to Explore</span>
        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">pinch</span> Pinch to Scale</span>
      </div>

      <Suspense fallback={<Loader />}>
        <Canvas 
          flat={isMobile} // Disable light calculations if on mobile
          shadows={!isMobile} 
          dpr={isMobile ? [1, 1] : [1, 2]} // Force 1x pixel ratio on mobile to save GPU memory
          gl={{ 
            antialias: !isMobile, // Disable antialiasing on mobile
            powerPreference: 'high-performance',
            alpha: true
          }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={isMobile ? 65 : 45} />
          <ambientLight intensity={1.5} />
          <Center top>
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
              <Model url={modelUrl} />
            </Float>
          </Center>
          <OrbitControls 
            enablePan={false} 
            enableZoom={true} 
            makeDefault 
            minPolarAngle={Math.PI / 4} 
            maxPolarAngle={Math.PI / 1.75} 
            minDistance={3}
            maxDistance={8}
          />
        </Canvas>
      </Suspense>

      {/* Decorative frame */}
      <div className="absolute inset-4 pointer-events-none border border-theme-border/20 z-0"></div>
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-theme-border/30 to-transparent"></div>
    </div>
  );
};

export default ModelViewer;
