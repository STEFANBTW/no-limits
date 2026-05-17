import React, { useRef, useEffect, useMemo, useState } from 'react';
import { motion, useTransform, MotionValue, useMotionValue, useSpring, animate } from 'framer-motion';
import { Armchair, Sofa, Lamp, Table2, Bed, Library, Coffee, DoorOpen, RockingChair, Flower2, Layers } from 'lucide-react';

const FurnitureIcon = ({ Icon, x, y, rotate, mouseX, mouseY, movementIntensity }: { Icon: any, x: number, y: number, rotate: number, mouseX: MotionValue<number>, mouseY: MotionValue<number>, movementIntensity: MotionValue<number>, key?: React.Key }) => {
  const iconRef = useRef<HTMLDivElement>(null);
  const proximity = useMotionValue(0);
  const animRef = useRef<any>(null);
  
  useEffect(() => {
    const updateProximity = () => {
      if (!iconRef.current) return;
      const rect = iconRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const dx = mouseX.get() - centerX;
      const dy = mouseY.get() - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Softer threshold for more fluid spreading
      const threshold = window.innerWidth < 768 ? 200 : 350; 
      const targetVal = Math.pow(Math.max(0, 1 - distance / threshold), 2); // Squared for more concentrated center, softer edges
      
      const currentVal = proximity.get();
      if (Math.abs(targetVal - currentVal) < 0.001) return;
      
      const isAppearing = targetVal > currentVal;
      // Faster decay but with a much smoother curve to feel like a wave passing
      const baseDuration = isAppearing ? 0.4 : 1.2; 
      
      if (animRef.current) animRef.current.stop();
      animRef.current = animate(proximity, targetVal, {
        duration: Math.max(0.1, baseDuration * (isAppearing ? 1 : 0.8)),
        ease: isAppearing ? "easeOut" : "easeInOut"
      });
    };

    const unsubscribeX = mouseX.on("change", updateProximity);
    const unsubscribeY = mouseY.on("change", updateProximity);
    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [mouseX, mouseY, proximity]);

  const activeLevel = useTransform(
    [proximity, movementIntensity],
    ([p, m]) => (p as number) * (m as number)
  );

  const color = useTransform(activeLevel, [0, 1], ["var(--theme-panel-furniture, #1a1a1a)", "#E8A843"]);
  const opacity = useTransform(activeLevel, [0, 1], [0.2, 0.7]); 
  const scale = useTransform(activeLevel, [0, 1], [0.85, 1.15]); 
  const blur = useTransform(activeLevel, [0, 0.4, 1], [3, 1, 0]); 

  return (
    <motion.div
      ref={iconRef}
      className="absolute pointer-events-none z-0 p-2 border border-theme-border/10 rounded-[2px]"
      style={{ left: `${x}%`, top: `${y}%`, rotate, scale, opacity, filter: useTransform(blur, b => `blur(${b}px)`) }}
    >
      <div className="relative">
         <motion.div style={{ color }} className="transition-colors duration-400">
           <Icon 
              className="w-9 h-9 md:w-10 md:h-10 lg:w-11 lg:h-11" 
              strokeWidth={1} 
              strokeLinecap="round"
              strokeLinejoin="round"
           />
         </motion.div>
      </div>
    </motion.div>
  );
};

export const FurnitureBackground = () => {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const movementIntensity = useMotionValue(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const globalAnimRef = useRef<any>(null);
  
  useEffect(() => {
    const triggerIntensity = () => {
      const currentVal = movementIntensity.get();
      if (currentVal < 0.99) {
        if (globalAnimRef.current) globalAnimRef.current.stop();
        globalAnimRef.current = animate(movementIntensity, 1, { 
          duration: 0.6, // Slower intensity build up for "richer" feel
          ease: "easeOut" 
        });
      }
      
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (globalAnimRef.current) globalAnimRef.current.stop();
        globalAnimRef.current = animate(movementIntensity, 0, { 
          duration: 2.5, // Faster than 6s to not stay on too long
          ease: "easeInOut" 
        });
      }, 150); 
    };

    const handleInputMove = (x: number, y: number) => {
      mouseX.set(x);
      mouseY.set(y);
      triggerIntensity();
    };

    const handleMouseMove = (e: MouseEvent) => handleInputMove(e.clientX, e.clientY);
    const handleTouchUpdate = (e: TouchEvent) => {
      if (e.touches.length > 0) handleInputMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchstart", handleTouchUpdate, { passive: true });
    window.addEventListener("touchmove", handleTouchUpdate, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchUpdate);
      window.removeEventListener("touchmove", handleTouchUpdate);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [mouseX, mouseY, movementIntensity]);

  const furnitureTypes = [
    Armchair, Sofa, Lamp, Table2, Bed, Library, 
    Coffee, DoorOpen, RockingChair, Flower2
  ];
  
  const generateGrid = () => {
    if (typeof window === 'undefined') return [];
    
    const items = [];
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    const isMobile = width < 768;
    const gap = isMobile ? 30 : 60; // Reduced gap
    const iconSize = isMobile ? 31 : 40; // Increased size by 10%
    const cellSize = iconSize + gap;
    
    const cols = Math.ceil(width / cellSize) + 2;
    const rows = Math.ceil(height / cellSize) + 2;
    
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Brick layout: shift every other row
        const rowShift = (r % 2 === 1) ? cellSize / 2 : 0;
        
        // Increased scatter
        const scatterX = Math.random() * 40 - 20;
        const scatterY = Math.random() * 40 - 20;
        
        const physicalX = c * cellSize + rowShift + scatterX;
        const physicalY = r * cellSize + scatterY;
        
        const x = (physicalX / width) * 100;
        const y = (physicalY / height) * 100;
        
        const Icon = furnitureTypes[(r * cols + c) % furnitureTypes.length];
        const rotate = Math.random() * 60 - 30; 
        
        items.push({ Icon, x, y, rotate, id: `${r}-${c}-${width}` });
      }
    }
    return items;
  };

  const [iconData, setIconData] = useState<any[]>([]);

  useEffect(() => {
    setIconData(generateGrid());
    
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setIconData(generateGrid());
      }, 300);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
      {iconData.map((item) => (
        <FurnitureIcon 
          key={item.id} 
          Icon={item.Icon} 
          x={item.x} 
          y={item.y} 
          rotate={item.rotate} 
          mouseX={mouseX}
          mouseY={mouseY}
          movementIntensity={movementIntensity}
        />
      ))}
    </div>
  );
};

export default FurnitureBackground;
