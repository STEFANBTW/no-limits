import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useInView, MotionValue, useMotionValue, useSpring } from 'framer-motion';
import { useProduct } from '../context/ProductContext';
import BespokeInquiryModal from '../components/BespokeInquiryModal';
import { Armchair, Sofa, Lamp, Table2, Bed, Library, Boxes, Coffee, Monitor, DoorOpen, Construction, Bath, Key, Tv, Fan, Heater, Utensils, RockingChair, Warehouse } from 'lucide-react';

const FurnitureIcon = ({ Icon, x, y, rotate, size = 64, mouseX, mouseY, movementIntensity }: { Icon: any, x: number, y: number, rotate: number, size?: number, mouseX: MotionValue<number>, mouseY: MotionValue<number>, movementIntensity: MotionValue<number>, key?: React.Key }) => {
  const iconRef = useRef<HTMLDivElement>(null);
  
  // Spring for liquid flow feeling
  const proximity = useSpring(0, { stiffness: 60, damping: 25 });
  
  useEffect(() => {
    const updateProximity = () => {
      if (!iconRef.current) return;
      const rect = iconRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const dx = mouseX.get() - centerX;
      const dy = mouseY.get() - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Illumination radius ~300px
      const threshold = 300;
      const val = Math.max(0, 1 - distance / threshold);
      proximity.set(val);
    };

    const unsubscribeX = mouseX.on("change", updateProximity);
    return () => unsubscribeX();
  }, [mouseX, mouseY, proximity]);

  // Combine proximity with global movement intensity
  // If intensity is 0 (stopped), proximity contribution is nulled
  const activeLevel = useTransform(
    [proximity, movementIntensity],
    ([p, m]) => (p as number) * (m as number)
  );

  // Transform activeLevel into visual states
  const color = useTransform(activeLevel, [0, 1], ["var(--theme-panel-furniture)", "var(--color-primary)"]);
  const opacity = useTransform(activeLevel, [0, 1], [0.3, 0.7]); // 70% transparency when active
  const scale = useTransform(activeLevel, [0, 1], [1, 1.15]);
  const glowOpacity = useTransform(activeLevel, [0.3, 1], [0, 0.4]);

  return (
    <motion.div
      ref={iconRef}
      className="absolute pointer-events-auto z-0"
      style={{ left: `${x}%`, top: `${y}%`, rotate, scale, opacity }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <motion.div className="relative p-4">
         <motion.div style={{ color }} className="transition-colors duration-200">
           <Icon 
             size={size} 
             strokeWidth={0.8} 
             strokeLinecap="square"
             strokeLinejoin="miter"
             className="sharp-vector"
           />
         </motion.div>
         
         {/* Illumination Bloom Effect */}
         <motion.div 
            style={{ opacity: glowOpacity }}
            className="absolute inset-0 border border-primary/30 rounded-none blur-2xl scale-150" 
         />
      </motion.div>
    </motion.div>
  );
};

const FurnitureBackground = () => {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const movementIntensity = useSpring(0, { stiffness: 40, damping: 20 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      // Mark as moving
      movementIntensity.set(1);
      
      // Clear previous timeout and set a new one to detect stopping
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        movementIntensity.set(0);
      }, 150); // Short grace period for "stopping"
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [mouseX, mouseY, movementIntensity]);

  const furnitureTypes = [
    Armchair, Sofa, Lamp, Table2, Bed, Library, Boxes, 
    Coffee, Monitor, DoorOpen, Construction, Bath, 
    Key, Tv, Fan, Heater, Utensils, RockingChair, Warehouse
  ];
  
  // Generate a dense, scattered grid
  const iconData = useMemo(() => {
    const items = [];
    const rows = 7;
    const cols = 9;
    
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Add random jitter 
        const x = (c / cols) * 100 + (Math.random() * 6 - 3);
        const y = (r / rows) * 100 + (Math.random() * 6 - 3);
        
        // Cycle through icons
        const Icon = furnitureTypes[(r * cols + c) % furnitureTypes.length];
        const rotate = Math.random() * 40 - 20;
        const size = 45 + Math.random() * 40;
        
        items.push({ Icon, x, y, rotate, size, id: `${r}-${c}` });
      }
    }
    return items;
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none opacity-60 select-none">
      {iconData.map((item) => (
        <FurnitureIcon 
          key={item.id} 
          Icon={item.Icon} 
          x={item.x} 
          y={item.y} 
          rotate={item.rotate} 
          size={item.size}
          mouseX={mouseX}
          mouseY={mouseY}
          movementIntensity={movementIntensity}
        />
      ))}
    </div>
  );
};

const ScrollRevealText = ({ text, progress }: { text: string, progress: MotionValue<number> }) => {
  const words = text.split(" ");
  return (
    <p className="font-sans text-[19px] sm:text-[26px] md:text-[34px] font-light leading-[1.4] text-center max-w-3xl mx-auto">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        const isHighlight = word.toLowerCase().includes("artifacts");
        return (
          <React.Fragment key={i}>
            <RevealedWord word={word} progress={progress} range={[start, end]} isHighlight={isHighlight} />
            {i < words.length - 1 && " "}
          </React.Fragment>
        );
      })}
    </p>
  );
};

interface RevealedWordProps {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  isHighlight?: boolean;
  key?: React.Key;
}

const RevealedWord = ({ word, progress, range, isHighlight }: RevealedWordProps) => {
  const opacity = useTransform(progress, range, [0.05, isHighlight ? 1 : 0.75]);
  const color = isHighlight ? '#E8A843' : 'currentColor';
  const italic = isHighlight ? 'italic font-serif' : '';
  
  return (
    <motion.span 
      style={{ opacity }} 
      className={`inline-block text-theme-text ${italic}`}
      transition={{ duration: 0.5 }}
    >
      <span style={{ color: isHighlight ? color : undefined }}>{word}</span>
    </motion.span>
  );
};

const PhilosophyStickySection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const revealProgress = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0.02, 0.1], [0, 1]);
  const buttonOpacity = useTransform(scrollYProgress, [0.9, 0.95], [0, 1]);

  return (
    <section ref={containerRef} className="relative w-full bg-theme-panel h-[300vh] z-10 mt-[100svh]">
      <div className="sticky top-0 left-0 md:left-[var(--sidebar-width)] h-screen w-full md:w-[calc(100%-var(--sidebar-width))] flex flex-col items-center justify-center px-12 md:px-24 overflow-hidden bg-theme-panel transition-[left,width] duration-300">
        <div className="max-w-5xl text-center flex flex-col items-center w-full ml-[100px] pl-[48px]">
          <motion.span style={{ opacity: titleOpacity }} className="text-primary font-sans tracking-[0.4em] uppercase text-[10px] md:text-[12px] font-bold mb-8 block mt-12 md:mt-0 opacity-80">
            The Philosophy
          </motion.span>
          
          <div className="mb-12">
            <ScrollRevealText 
              text="We manufacture what others import. By combining local expertise with global standards, we deliver pieces that stand the test of time, both in durability and aesthetic appeal." 
              progress={revealProgress} 
            />
          </div>

          <motion.div style={{ opacity: buttonOpacity }} className="flex justify-center mt-8 w-full sm:w-auto pb-12 md:pb-0">
            <Link to="/about" className="group relative w-full sm:w-auto px-10 py-5 bg-transparent border border-theme-border text-theme-text overflow-hidden transition-all">
              <div className="absolute inset-0 bg-theme-text -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 font-sans text-[11px] font-bold tracking-[0.3em] uppercase group-hover:text-theme-base transition-colors duration-500">Read the Journal</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const HeroSection = () => {
  const { scrollY } = useScroll();
  const textOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div className="fixed top-0 left-0 md:left-[var(--sidebar-width)] h-[100svh] w-full md:w-[calc(100%-var(--sidebar-width))] z-0 pointer-events-none transition-[left,width] duration-300">
      <section className="relative h-full w-full overflow-hidden flex flex-col items-center justify-center pointer-events-auto">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-theme-overlay/40 z-10"></div>
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            className="h-full w-full bg-cover bg-center" 
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000')" }}
          ></motion.div>
        </div>
        <motion.div style={{ opacity: textOpacity }} className="relative z-20 flex flex-1 w-full flex-col items-center justify-center text-center">
          <div className="max-w-5xl mx-auto w-full flex flex-col items-center px-6">
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mb-0 md:mb-2 font-sans text-[11px] leading-none font-light tracking-[0.3em] text-theme-text-subtle uppercase z-10"
            >
              Est. 2023
            </motion.p>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="font-serif text-[72px] md:text-[96px] lg:text-[120px] font-normal leading-[1] tracking-tight text-invariant-white z-10 text-center w-full"
            >
              Redefining <br /><span className="italic text-invariant-parchment">Boundless Living.</span>
            </motion.h1>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

const Home = () => {
  const { products } = useProduct();
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [activeSpace, setActiveSpace] = useState(0);

  // Get two featured products for the artifacts section
  const featuredArtifacts = products.slice(0, 2);

  const spaces = [
    { name: 'The Living', path: '/living', desc: 'Curating Conversation', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000' },
    { name: 'The Dining', path: '/dining', desc: 'Architectural Gastronomy', image: 'https://images.unsplash.com/photo-1604578762246-4113fae11f1a?auto=format&fit=crop&q=80&w=2000' },
    { name: 'The Sanctuary', path: '/sanctuary', desc: 'Restorative Quarters', image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=2000' },
    { name: 'The Outdoor', path: '/outdoor', desc: 'En Plein Air', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000' },
    { name: 'The Study', path: '/study', desc: 'Executive Focus', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=2000' },
    { name: 'The Cellar', path: '/cellar', desc: 'Subterranean Vault', image: '/images/The_captivating_editorial_202604170046.png' },
    { name: 'The Wellness', path: '/wellness', desc: 'Restorative Spa', image: '/images/A_Wellness__Serene_202604170150.png' },
    { name: 'The Entryway', path: '/entryway', desc: 'Grand Foyer', image: '/images/An_Entryway__Grand_202604170146.png' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative flex min-h-screen w-full flex-col bg-theme-base text-theme-text font-sans selection:bg-primary/30 selection:text-theme-text overflow-clip antialiased"
    >
      {/* Act I: The Vision (Hero) */}
      <HeroSection />

      {/* Act I.5: The Philosophy (Sticky Reveal) */}
      <PhilosophyStickySection />

      {/* Act II: The Estate (Cinematic Routing Hub) */}
      <section className="relative min-h-[calc(100svh-80px)] md:min-h-[100svh] w-full flex items-center justify-start overflow-hidden z-10 bg-theme-base">
        {/* Full Bleed Cinematic Background */}
        <div className="absolute inset-0 z-0 bg-theme-base">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSpace}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${spaces[activeSpace].image}')` }}
            />
          </AnimatePresence>
          {/* Gradients for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-theme-base/60 to-theme-base/15 w-full"></div>
        </div>

        {/* Floating Interactive List */}
        <div className="relative z-20 px-6 md:px-16 lg:px-24 w-full max-w-4xl pt-10 pb-20 md:py-12 flex flex-col justify-center">
          <span className="text-primary font-sans tracking-[0.3em] uppercase text-[10px] md:text-xs mb-8 block">Curated Spaces</span>
          
          <div className="flex flex-col gap-5 md:gap-7 lg:gap-8">
            {spaces.map((space, index) => (
              <div 
                key={space.path}
                className="group w-full cursor-pointer"
                onMouseEnter={() => setActiveSpace(index)}
                onTouchStart={() => setActiveSpace(index)}
              >
                <Link to={space.path} className="flex flex-col md:flex-row md:items-baseline md:gap-4">
                  <div className="flex items-center gap-3">
                    <span 
                      className={`h-[2px] bg-primary transition-all duration-500 ease-out ${
                        activeSpace === index ? 'w-8 md:w-12 opacity-100' : 'w-0 opacity-0 group-hover:w-4 group-hover:opacity-50'
                      }`}
                    ></span>
                    <h4 className={`font-serif text-4xl md:text-3xl lg:text-4xl transition-all duration-500 m-0 leading-none ${
                        activeSpace === index ? 'text-theme-text italic' : 'text-theme-text-subtle group-hover:text-theme-text-muted'
                      }`}
                    >
                      {space.name}
                    </h4>
                  </div>
                  <span className={`font-sans tracking-[0.2em] uppercase text-[9px] md:text-[10px] tabular-nums transition-all duration-500 mt-1 md:mt-0 ml-0 md:ml-0 md:border-l md:border-theme-border-strong md:pl-4 pl-0 ${
                    activeSpace === index ? 'text-primary opacity-100 translate-x-3 md:translate-x-0' : 'text-theme-text-subtle opacity-0 -translate-x-2 md:translate-x-0'
                  }`}>
                    {space.desc}
                  </span>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 transition-all duration-500">
            <Link 
              to={spaces[activeSpace].path}
              className="group relative w-full sm:w-auto px-10 py-5 bg-theme-border/30 backdrop-blur-md text-theme-text overflow-hidden transition-all flex items-center justify-center gap-3"
            >
              <div className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 font-sans text-[11px] font-bold tracking-[0.3em] uppercase group-hover:text-theme-base transition-colors duration-500">
                Explore The Space
              </span>
              <span className="relative z-10 material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1 group-hover:text-theme-base">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Act II.5: Featured Collection (Split Screen) */}
      <section className="grid w-full grid-cols-1 lg:grid-cols-2 bg-theme-panel relative z-30">
        {/* Image Side */}
        <div className="relative h-[45vh] sm:h-[55vh] lg:h-auto lg:min-h-[70vh] w-full overflow-hidden group">
          <motion.div 
            initial={{ height: "100%" }}
            whileInView={{ height: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} 
            className="absolute bottom-0 inset-x-0 bg-theme-base z-20 origin-bottom"
          />
          <motion.div 
            initial={{ scale: 1.15 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="h-full w-full bg-cover bg-center transition-transform duration-[2000ms] ease-out group-hover:scale-105" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA50pcXbFEaWs5XKnAJAqhMM2K2Bdg71NTPbuVWhDZKY-Ie_YlJfSQHwldvFoE6nBuiInMM4JTXzwdc2XD2btnAkk3zEHdUpQfOW9Oj9Peh9GOSkYjNYoKjNquXRh6QghyVP3b0VGxg-I4Bi843gaeT5hHhMRowxIpcLuy-1Pr7zekKRiB-H9MBH_Q538XFc1cx8quuwD30E7tBIEKUgd9nKkzCIUv3ApVnxG7LEqD4eVERuyHfroHgsEk_iHHWh05NrKfeigCfCy8')" }}
          ></motion.div>
        </div>
        {/* Content Side */}
        <div className="flex flex-col justify-center bg-theme-panel p-8 py-16 sm:p-12 lg:p-24 relative overflow-hidden text-center lg:text-left">
          {/* Decorative subtle background number */}
          <span className="absolute -right-12 top-12 font-serif text-[12rem] leading-none text-theme-text/[0.03] pointer-events-none select-none italic hidden lg:block">01</span>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative z-10 flex flex-col items-center lg:items-start gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-primary hidden lg:block opacity-60"></div>
              <span className="font-sans text-[12px] font-bold tracking-[0.4em] text-primary uppercase opacity-90">New Arrival</span>
            </div>
            <h2 className="font-serif text-[42px] sm:text-[48px] md:text-[56px] leading-[1.15] text-theme-text tracking-tight">The Vanguard Lounge.</h2>
            <p className="max-w-md font-sans text-base sm:text-[18px] font-light leading-[1.6] text-theme-text opacity-70">
              Sculpted from Italian Walnut and defined by silence. The Vanguard invites a pause in the day, featuring hand-stitched cognac leather and a silhouette that defies gravity.
            </p>
            <div className="mt-8 flex w-full sm:w-auto">
              <Link to="/shop" className="group relative w-full sm:w-auto px-10 py-5 bg-white dark:bg-theme-panel border border-theme-border text-theme-text overflow-hidden transition-all">
                <div className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10 font-sans text-[11px] font-bold tracking-[0.3em] uppercase group-hover:text-black transition-colors duration-500">View Artifact</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Act II.6: Secondary Feature (Inverted Split) */}
      <section className="grid w-full grid-cols-1 lg:grid-cols-2 bg-theme-base relative z-30">
        {/* Content Side */}
        <div className="order-2 lg:order-1 flex flex-col justify-center bg-theme-base p-8 py-16 sm:p-12 lg:p-24 relative overflow-hidden border-r border-theme-border text-center lg:text-left">
          {/* Decorative subtle background number */}
          <span className="absolute -left-12 bottom-12 font-serif text-[12rem] leading-none text-theme-text/[0.03] pointer-events-none select-none italic hidden lg:block">02</span>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative z-10 flex flex-col items-center lg:items-start gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-theme-text hidden lg:block opacity-30"></div>
              <span className="font-sans text-[12px] font-bold tracking-[0.4em] text-theme-text uppercase opacity-80">Lighting</span>
            </div>
            <h2 className="font-serif text-[42px] sm:text-[48px] md:text-[56px] leading-[1.15] text-theme-text italic tracking-tight">Lumina Series.</h2>
            <p className="max-w-md font-sans text-base sm:text-[18px] font-light leading-[1.6] text-theme-text opacity-70">
              Brass and blown glass, united in a study of balance. The Lumina floor lamp provides a warm, directional glow ideal for the reading corner.
            </p>
            <div className="mt-8 flex w-full sm:w-auto">
              <Link to="/shop" className="group relative w-full sm:w-auto px-10 py-5 bg-transparent border border-theme-border text-theme-text overflow-hidden transition-all">
                <div className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10 font-sans text-[11px] font-bold tracking-[0.3em] uppercase group-hover:text-theme-base transition-colors duration-500">Explore Lighting</span>
              </Link>
            </div>
          </motion.div>
        </div>
        {/* Image Side */}
        <div className="order-1 lg:order-2 relative h-[45vh] sm:h-[55vh] lg:h-auto lg:min-h-[70vh] w-full overflow-hidden group">
          <motion.div 
            initial={{ height: "100%" }}
            whileInView={{ height: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} 
            className="absolute bottom-0 inset-x-0 bg-theme-panel z-20 origin-bottom"
          />
          <motion.div 
            initial={{ scale: 1.15 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="h-full w-full bg-cover bg-center transition-transform duration-[2000ms] ease-out group-hover:scale-105" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAGu2AGT10EwBmvXTl2-JCbqDHD_b5EqNPekfPGezcColr_jV6aeGMhFcLjobaOeylAkf_h24zPae5sy1Ghwn_gQdtihnwqcYBdUdnj7fOxoLTrfWwU84aZeQgOkLLZa4vLh5ghdcPES7lHuawHmQTSJzVGN5EE2QFU_QX5ZJERYNcudmrjl-VTxm27YPm7aa3EldF-l10KoMlZZkZ9Jk6F_Cex--a-ysSKysPDRiXGT0Vdb1ioO7M_cEJMMhkpIo-xLrPKgjdJ7Qw')" }}
          ></motion.div>
        </div>
      </section>

      {/* Act II.7: Curated Collections (Grid) */}
      <section className="w-full bg-theme-panel py-32 px-6 md:px-12 border-t border-theme-border relative z-30">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="font-serif text-3xl md:text-5xl text-theme-text mb-2">Curated Collections</h3>
              <p className="font-serif text-theme-text-muted text-xl italic mt-2">Pieces selected for the discerning eye.</p>
            </motion.div>
            <div className="flex justify-center md:justify-end">
              <Link 
                to="/shop" 
                className="group relative w-full sm:w-auto px-10 py-5 bg-transparent border border-theme-border text-theme-text overflow-hidden transition-all flex items-center justify-center gap-3"
              >
                <div className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10 font-sans text-[11px] font-bold tracking-[0.3em] uppercase group-hover:text-theme-base transition-colors duration-500">View All Categories</span>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 px-1 bg-theme-border/30 border border-theme-border shadow-2xl">
            {/* Card 1 */}
            <Link to="/shop" className="group relative aspect-[4/5] bg-theme-surface overflow-hidden cursor-pointer">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:opacity-100" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB1i-5Y196WnzMhESZXJLWrxyo-OWYaPVt_HjPGOVY2SWdMS1CPMuKO-pi-1yyJUsBu3RBXlQD7bkwKbw6KYeVabLZ0Ql40k4H_D5or692NXWyIUAwU6gvgPhWFx0wyH7s9WBG7QxQGKZpK4cOzgFweF04-KUb6ZjdVR6m5FHXSJfHni0CQ7izLqBfuZ-JGyWjvWg0QfIDhhqL9QGsh8dGCqxSj4vxl4bYWbKI09cDvbnK-ZElGCsqQqTMHkaAuitSKl6rgnq24yPs')" }}
              ></motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-primary mb-2 block">Seating</span>
                <h4 className="font-serif text-2xl text-white italic">The Archive Chair</h4>
              </div>
            </Link>
            {/* Card 2 */}
            <Link to="/shop" className="group relative aspect-[4/5] bg-theme-surface overflow-hidden cursor-pointer">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:opacity-100" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA_sHxCIUXm0ogC_MM-gswuAfyOzR9gVMrJCwZ2_EWeREoruXjqQSPv4Xca-QuUJejssmdn08ncfuNrh1bHQQOdFyx1N9yrArxZHVLX4kc1rC4J7p2n0v4MQMmy8bUp87fNSIQmhF9LhHbfmTK3gXwh5-VdocYbI0AjKLiu8HVKbntDDTX79FzXeIyX-fo0hqtVfloV3tSIYDm588wHdPA_uyxlUt0Ssu2nsuIf5C0A6gYETIewwQU6RftTDKysiD76o1jkROI-HVI')" }}
              ></motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-primary mb-2 block">Tables</span>
                <h4 className="font-serif text-2xl text-white italic">Carrara Ovals</h4>
              </div>
            </Link>
            {/* Card 3 */}
            <Link to="/shop" className="group relative aspect-[4/5] bg-theme-surface overflow-hidden cursor-pointer">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:opacity-100" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC95FtdtJHQaQeJZwKvSKZCp87DWz-e1nlj_tGKFAetSzG9VZWL6XiVML18ZgVAmhXeI4eePghrYmn6h7asbQRntdYws3BpOUQHog5QVyk7p42L64jVNBmKfN5OYAOjwGvhneXlWLK-gHdRCnmTlarS2rMiBzSCKtUaiCMemaoUp_OvN1GRRIEwu2qm_VYUWyKYJ_vmrbvTt_3G3EgXZfqODinKcHDIY4yYlGTryaC1BViDpw7mrLVLIx9CqosJ2JkLpp2VBdMj2mc')" }}
              ></motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-primary mb-2 block">Storage</span>
                <h4 className="font-serif text-2xl text-white italic">Obsidian Sideboard</h4>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Act III: The Artifacts (Collection Highlights) */}
      <section className="w-full bg-theme-base py-32 px-6 md:px-12 relative z-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8 relative z-30">
            <div className="max-w-4xl">
              <span className="mb-6 block font-sans text-[12px] font-bold tracking-[0.4em] text-primary uppercase opacity-90">The Manifesto</span>
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8 }}
                className="font-serif text-[26px] sm:text-[29px] md:text-[38px] leading-[1.3] text-theme-text tracking-tight"
              >
                We do not manufacture. We create <em className="text-primary italic font-serif">artifacts</em> for the living space. Slow furniture for a fast world, designed to age as gracefully as the trees from which they came.
              </motion.h2>
            </div>
          <div className="flex justify-center md:justify-start">
            <Link 
              to="/shop" 
              className="group relative w-full sm:w-auto px-10 py-5 bg-white dark:bg-theme-panel border border-theme-border text-theme-text overflow-hidden transition-all flex items-center justify-center gap-3"
            >
              <div className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 font-sans text-[11px] font-bold tracking-[0.3em] uppercase group-hover:text-black transition-colors duration-500">View Full Gallery</span>
              <span className="relative z-10 material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1 group-hover:text-black">
                arrow_forward
              </span>
            </Link>
          </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative -mt-16">
            {featuredArtifacts.map((artifact, index) => (
              <Link 
                key={artifact.id} 
                to={`/product/${artifact.slug}`}
                className={`group cursor-pointer ${index === 1 ? 'md:mt-32 md:-ml-12 relative z-10' : 'relative z-0'}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden mb-8 border border-theme-border">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" 
                    style={{ backgroundImage: `url('${artifact.images[0]}')` }}
                  ></div>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-sans text-[13px] leading-[1.3] tracking-[0.2em] uppercase text-primary/80 mb-3 block">{artifact.category}</span>
                    <h4 className="font-serif text-[30px] leading-[1.3] text-theme-text mb-3">{artifact.name}</h4>
                    <p className="text-theme-text-muted text-[14px] leading-[1.4] font-light">{artifact.materials}</p>
                  </div>
                  <div className="w-12 h-12 border border-theme-border-strong rounded-full flex items-center justify-center group-hover:bg-theme-text group-hover:text-theme-base transition-all">
                    <span className="material-symbols-outlined text-[16px] text-theme-text group-hover:text-theme-base">arrow_forward</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative w-full bg-theme-panel py-40 px-6 overflow-hidden">
        {/* Abstract background detail */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <FurnitureBackground />
        
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-8"
          >
            <div className="flex flex-col gap-6">
              <h2 className="text-5xl md:text-[84px] font-serif text-theme-text italic leading-[1.05] tracking-tight">
                Crafting the boundless<br />future of living.
              </h2>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-12">
              <button 
                onClick={() => setIsInquiryOpen(true)}
                className="group relative px-10 py-5 bg-white dark:bg-theme-panel border border-theme-border text-theme-text overflow-hidden transition-all hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10 font-sans text-[11px] font-bold tracking-[0.3em] uppercase group-hover:text-black transition-all duration-500">Start My Journey</span>
              </button>

              <Link 
                to="/bespoke" 
                onClick={() => window.scrollTo(0, 0)}
                className="group relative px-10 py-5 bg-white dark:bg-theme-panel border border-theme-border text-theme-text overflow-hidden transition-all hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10 font-sans text-[11px] font-bold tracking-[0.3em] uppercase group-hover:text-black transition-all duration-500">Explore Bespoke</span>
              </Link>
            </div>

            <p className="max-w-md text-theme-text-muted text-sm font-light leading-relaxed mt-4">
              Join the select few who live without limits. Our master artisans are ready to translate your vision into an architectural reality.
            </p>
          </motion.div>
        </div>
      </section>

      <BespokeInquiryModal 
        isOpen={isInquiryOpen} 
        onClose={() => setIsInquiryOpen(false)} 
      />

    </motion.div>
  );
};

export default Home;
