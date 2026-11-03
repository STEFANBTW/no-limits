import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { AtelierEnvironment, AtmosphereMode } from './scene3d/AtelierEnvironment';
import { ChairModel } from './scene3d/ChairModel';
import { CameraRig, CameraPreset } from './scene3d/CameraRig';
import { Sun, Sunset, Moon, RotateCw, X } from 'lucide-react';

interface ModelViewerProps {
  modelUrl: string;
  title?: string;
  product?: {
    name?: string;
    category?: string;
    materials?: string;
    dimensions?: {
      height?: string;
      width?: string;
      depth?: string;
    };
    price?: string;
  };
  isModal?: boolean;
  onClose?: () => void;
}

const Loader = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#12100e]/90 z-20 backdrop-blur-sm">
    <div className="w-10 h-10 border border-primary/20 border-t-primary rounded-full animate-spin mb-3" />
    <span className="text-[10px] uppercase tracking-[0.35em] text-white/60 font-mono">
      Loading Scene
    </span>
  </div>
);

const ModelViewer = ({ modelUrl, title, product, isModal = false, onClose }: ModelViewerProps) => {
  const [atmosphere, setAtmosphere] = useState<AtmosphereMode>('golden');
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('hero');
  const [autoRotate, setAutoRotate] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  // Broadcast 3D modal state so NavBar hides the mobile hamburger button and moves AI chat out of the way
  useEffect(() => {
    if (!isModal) return;
    document.body.classList.add('is-3d-modal-open');
    window.dispatchEvent(new CustomEvent('3d-modal-change', { detail: { isOpen: true } }));
    return () => {
      document.body.classList.remove('is-3d-modal-open');
      window.dispatchEvent(new CustomEvent('3d-modal-change', { detail: { isOpen: false } }));
    };
  }, [isModal]);

  const displayTitle = title || product?.name || '';

  return (
    <div className="w-full h-full bg-[#12100e] relative overflow-hidden select-none">
      {/* ---------------- TOP LEFT TITLE ONLY (NO EYEBROW, NO SUBHEADING) ---------------- */}
      {displayTitle && (
        <div className="absolute top-6 left-5 md:top-7 md:left-8 right-16 z-20 pointer-events-none">
          <h3 className="text-white/95 font-serif italic text-xl sm:text-2xl md:text-3xl tracking-wide drop-shadow-sm truncate">
            {displayTitle}
          </h3>
        </div>
      )}

      {/* ---------------- TOP RIGHT CLOSE ACTION ---------------- */}
      {onClose && (
        <div className="absolute top-5 right-5 md:top-6 md:right-8 z-30">
          <button
            onClick={onClose}
            className="w-9 h-9 md:w-10 md:h-10 bg-black/50 border border-white/15 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:border-white/40 transition-all"
            title="Close"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* ---------------- 3D WEBGL CANVAS ---------------- */}
      <Suspense fallback={<Loader />}>
        <Canvas
          shadows
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            alpha: false,
          }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <PerspectiveCamera makeDefault position={[0, 0.95, 2.7]} fov={isMobile ? 55 : 42} />

          <AtelierEnvironment
            atmosphere={atmosphere}
            lampOn={true}
            sceneMode="full"
          />

          <ChairModel url={modelUrl} />

          <CameraRig preset={cameraPreset} autoRotate={autoRotate} />
        </Canvas>
      </Suspense>

      {/* ---------------- ULTRA-MINIMALIST BOTTOM BAR (DESKTOP & MOBILE) ---------------- */}
      <div className="absolute bottom-5 md:bottom-7 left-1/2 -translate-x-1/2 z-30 max-w-[94vw]">
        <div className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-1.5 bg-black/75 border border-white/15 rounded-full shadow-2xl overflow-x-auto scrollbar-none">
          {/* Camera Angles: Front, Room, Angle, Plan */}
          <button
            onClick={() => setCameraPreset('hero')}
            className={`px-2.5 sm:px-3.5 py-1.5 rounded-full text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-all shrink-0 ${
              cameraPreset === 'hero'
                ? 'bg-white text-black font-semibold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Front
          </button>
          <button
            onClick={() => setCameraPreset('atelier')}
            className={`px-2.5 sm:px-3.5 py-1.5 rounded-full text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-all shrink-0 ${
              cameraPreset === 'atelier'
                ? 'bg-white text-black font-semibold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Room
          </button>
          <button
            onClick={() => setCameraPreset('profile')}
            className={`px-2.5 sm:px-3.5 py-1.5 rounded-full text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-all shrink-0 ${
              cameraPreset === 'profile'
                ? 'bg-white text-black font-semibold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Angle
          </button>
          <button
            onClick={() => setCameraPreset('top_down')}
            className={`px-2.5 sm:px-3.5 py-1.5 rounded-full text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-all shrink-0 ${
              cameraPreset === 'top_down'
                ? 'bg-white text-black font-semibold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Plan
          </button>

          <div className="w-px h-3.5 bg-white/15 mx-1 shrink-0" />

          {/* Lighting Moods (Minimal Icons) */}
          <button
            onClick={() => setAtmosphere('daylight')}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all shrink-0 ${
              atmosphere === 'daylight'
                ? 'bg-white/15 text-amber-200'
                : 'text-white/45 hover:text-white/80'
            }`}
            title="Daylight"
          >
            <Sun size={13} />
          </button>
          <button
            onClick={() => setAtmosphere('golden')}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all shrink-0 ${
              atmosphere === 'golden'
                ? 'bg-white/15 text-amber-400'
                : 'text-white/45 hover:text-white/80'
            }`}
            title="Golden Hour"
          >
            <Sunset size={13} />
          </button>
          <button
            onClick={() => setAtmosphere('nocturne')}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all shrink-0 ${
              atmosphere === 'nocturne'
                ? 'bg-white/15 text-indigo-300'
                : 'text-white/45 hover:text-white/80'
            }`}
            title="Night"
          >
            <Moon size={13} />
          </button>

          <div className="w-px h-3.5 bg-white/15 mx-1 shrink-0" />

          {/* Auto-Orbit Toggle */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all shrink-0 ${
              autoRotate
                ? 'bg-primary text-black'
                : 'text-white/45 hover:text-white/80'
            }`}
            title="Orbit"
          >
            <RotateCw size={13} className={autoRotate ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModelViewer;
