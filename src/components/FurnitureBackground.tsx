import React, { useRef, useEffect, useMemo, useState } from 'react';
import { motion, useTransform, MotionValue, useMotionValue, useSpring, animate } from 'framer-motion';
import { Armchair, Sofa, Lamp, Table2, Bed, Library, Boxes, Coffee, Monitor, DoorOpen, Construction, Bath, Key, Tv, Fan, Heater, Utensils, RockingChair, Warehouse } from 'lucide-react';

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
      
      // Explicit Mobile (150px) vs Desktop (250px) threshold radii
      const threshold = window.innerWidth < 768 ? 150 : 250; 
      const targetVal = Math.max(0, 1 - distance / threshold);
      
      // Asymmetric Constant-Velocity Animation Logic
      const currentVal = proximity.get();
      const delta = Math.abs(targetVal - currentVal);
      
      if (delta < 0.001) return; // Save math cycles
      
      const isAppearing = targetVal > currentVal;
      // Snappy intake (0.2s), extremely fluid and slow decay (3.0s)
      const baseDuration = isAppearing ? 0.2 : 3.0; 
      
      if (animRef.current) animRef.current.stop();
      animRef.current = animate(proximity, targetVal, {
        duration: Math.max(0.01, baseDuration * delta),
        ease: isAppearing ? "circOut" : "easeInOut"
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

  // Match the exact accent color
  // Base opacity: 0.5 (as requested) but in a "difficult to see color" (dark gray)
  const color = useTransform(activeLevel, [0, 1], ["var(--theme-panel-furniture, #1a1a1a)", "var(--color-primary, #E8A843)"]);
  const opacity = useTransform(activeLevel, [0, 1], [0.5, 0.9]); 
  const scale = useTransform(activeLevel, [0, 1], [1, 1.35]); 
  const glowOpacity = useTransform(activeLevel, [0.4, 1], [0, 0.4]); 

  return (
    <motion.div
      ref={iconRef}
      className="absolute pointer-events-none z-0"
      style={{ left: `${x}%`, top: `${y}%`, rotate, scale, opacity }}
    >
      <div className="relative">
         <motion.div style={{ color }} className="transition-colors duration-200">
           <Icon 
              className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 sharp-vector"
              strokeWidth={1} 
              strokeLinecap="square"
              strokeLinejoin="miter"
           />
         </motion.div>
         
         <motion.div 
            style={{ opacity: glowOpacity }}
            className="absolute inset-0 bg-primary/20 rounded-none blur-3xl scale-150" 
         />
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
      const delta = 1 - currentVal;
      
      if (delta > 0.001) {
        if (globalAnimRef.current) globalAnimRef.current.stop();
        globalAnimRef.current = animate(movementIntensity, 1, { 
          duration: 0.2 * delta, 
          ease: "circOut" 
        });
      }
      
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      
      // After 800ms of inactivity, fade out extremely slowly (5 seconds)
      timeoutRef.current = setTimeout(() => {
        const cVal = movementIntensity.get();
        if (cVal > 0.001) {
          if (globalAnimRef.current) globalAnimRef.current.stop();
          globalAnimRef.current = animate(movementIntensity, 0, { 
            duration: 5.0 * cVal, 
            ease: "easeInOut" 
          });
        }
      }, 800); 
    };

    const handleInputMove = (x: number, y: number) => {
      mouseX.set(x);
      mouseY.set(y);
      triggerIntensity();
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleInputMove(e.clientX, e.clientY);
    };

    const handleTouchUpdate = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleInputMove(e.touches[0].clientX, e.touches[0].clientY);
      }
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
    Armchair, Sofa, Lamp, Table2, Bed, Library, Boxes, 
    Coffee, Monitor, DoorOpen, Construction, Bath, 
    Key, Tv, Fan, Heater, Utensils, RockingChair, Warehouse
  ];
  
  const generateGrid = () => {
    if (typeof window === 'undefined') return [];
    
    const items = [];
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    const isMobile = width < 768;
    // Set 30px gap for mobile, 60px for desktop
    const gap = isMobile ? 30 : 60;
    // Icon sizes: w-8 is 32px, w-12 is 48px
    const iconSize = isMobile ? 32 : 48;
    const cellSize = iconSize + gap;
    
    // Add extra row/col to prevent empty edges
    const cols = Math.ceil(width / cellSize) + 1;
    const rows = Math.ceil(height / cellSize) + 1;
    
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Distribute strictly to keep exact cell boundaries
        // Convert to percentage for absolute positioning
        const physicalX = c * cellSize + (Math.random() * 8 - 4);
        const physicalY = r * cellSize + (Math.random() * 8 - 4);
        
        const x = (physicalX / width) * 100;
        const y = (physicalY / height) * 100;
        
        const Icon = furnitureTypes[(r * cols + c) % furnitureTypes.length];
        const rotate = Math.random() * 30 - 15; 
        
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
