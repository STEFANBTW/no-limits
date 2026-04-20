import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Archive = () => {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-theme-base text-theme-text font-display overflow-x-hidden antialiased">


      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-theme-overlay z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=60&w=1200" 
              alt="Grand historic architectural archive with floor-to-ceiling wooden shelves and blueprints" 
              className="h-full w-full object-cover opacity-70" 
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative z-20 text-center px-4 max-w-4xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="block text-primary text-xs font-bold tracking-[0.4em] uppercase mb-2"
            >
              Est. 2023
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-8xl lg:text-9xl font-serif text-theme-text mb-8 italic"
            >
              The Archive
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-theme-text-muted font-light max-w-2xl mx-auto leading-relaxed"
            >
              A century of uncompromising architectural vision. From a single drafting table in Lyon to a global standard of living.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-16 flex flex-col items-center gap-4"
            >
              <span className="text-[0.6rem] font-sans tracking-[0.3em] text-[#54524F] uppercase">Scroll to Explore</span>
            </motion.div>
          </div>
        </section>

        {/* Timeline Container */}
        <div className="relative w-full max-w-7xl mx-auto px-6 py-24 md:py-40">
          {/* Vertical Spine Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-theme-border/50 transform -translate-x-1/2 hidden md:block"></div>
          
          {/* Timeline Item: 2023 */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 mb-40 group">
            {/* Center Node */}
            <div className="absolute left-1/2 top-12 size-4 bg-theme-base border-2 border-primary rotate-45 transform -translate-x-1/2 z-10 hidden md:block"></div>
            {/* Left Content (Text) */}
            <div className="flex flex-col justify-center text-left md:text-right pr-0 md:pr-16 relative order-2 md:order-1 mt-8 md:mt-0">
              {/* Background Year Number */}
              <span className="absolute -top-10 md:-top-20 right-auto left-0 md:left-auto md:right-10 text-[80px] md:text-[180px] font-serif font-bold text-white/5 -z-10 select-none leading-none">2023</span>
              <h3 className="text-3xl md:text-4xl font-serif text-theme-text mb-6 relative z-10">The Foundation</h3>
              <p className="text-theme-text-muted font-sans font-light leading-relaxed text-lg relative z-10">
                No Limits Furniture begins its journey with a clear vision: to revolutionize design and craftsmanship in Nigeria. We set out to prove that world-class furniture can be manufactured locally, challenging the reliance on imports.
              </p>
            </div>
            {/* Right Content (Image) */}
            <div className="relative h-[500px] w-full overflow-hidden order-1 md:order-2 border border-theme-border">
              <img 
                src="https://images.unsplash.com/photo-1516962215378-7fa2e1372cd6?auto=format&fit=crop&q=60&w=800" 
                alt="Vintage architectural sketch on aged parchment" 
                className="h-full w-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000" 
                referrerPolicy="no-referrer" loading="lazy"
              />
              <div className="absolute bottom-6 left-6 bg-theme-overlay/80 backdrop-blur-md px-4 py-2 text-[10px] tracking-widest uppercase text-theme-text-muted border border-theme-border">
                Original Blueprint, Lyon Studio
              </div>
            </div>
          </div>

          {/* Timeline Item: 2024 */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 mb-40 group">
            {/* Center Node */}
            <div className="absolute left-1/2 top-12 size-4 bg-theme-base border-2 border-primary rotate-45 transform -translate-x-1/2 z-10 hidden md:block"></div>
            {/* Left Content (Image) */}
            <div className="relative h-[500px] w-full overflow-hidden order-1 border border-theme-border">
              <img 
                src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=60&w=800" 
                alt="Vintage blueprint sketches of mid-century furniture chairs" 
                className="h-full w-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000" 
                referrerPolicy="no-referrer" loading="lazy"
              />
              <div className="absolute bottom-6 right-6 bg-theme-overlay/80 backdrop-blur-md px-4 py-2 text-[10px] tracking-widest uppercase text-theme-text-muted border border-theme-border">
                The Vanguard Series, 1955
              </div>
            </div>
            {/* Right Content (Text) */}
            <div className="flex flex-col justify-center text-left pl-0 md:pl-16 relative order-2 mt-8 md:mt-0">
              {/* Background Year Number */}
              <span className="absolute -top-10 md:-top-20 left-0 md:left-10 text-[80px] md:text-[180px] font-serif font-bold text-white/5 -z-10 select-none leading-none">2024</span>
              <h3 className="text-3xl md:text-4xl font-serif text-theme-text mb-6 relative z-10">Rapid Expansion</h3>
              <p className="text-theme-text-muted font-sans font-light leading-relaxed text-lg relative z-10">
                Driven by our commitment to "manufacture what others import," we expanded our operations and opened state-of-the-art showrooms in Abuja and Jos. Our collections began to redefine boundless living for our growing clientele.
              </p>
            </div>
          </div>

          {/* Timeline Item: 2025 */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 mb-40 group">
            {/* Center Node */}
            <div className="absolute left-1/2 top-12 size-4 bg-theme-base border-2 border-primary rotate-45 transform -translate-x-1/2 z-10 hidden md:block"></div>
            {/* Left Content (Text) */}
            <div className="flex flex-col justify-center text-left md:text-right pr-0 md:pr-16 relative order-2 md:order-1 mt-8 md:mt-0">
              {/* Background Year Number */}
              <span className="absolute -top-10 md:-top-20 right-auto left-0 md:left-auto md:right-10 text-[80px] md:text-[180px] font-serif font-bold text-white/5 -z-10 select-none leading-none">2025</span>
              <h3 className="text-3xl md:text-4xl font-serif text-theme-text mb-6 relative z-10">Setting the Standard</h3>
              <p className="text-theme-text-muted font-sans font-light leading-relaxed text-lg relative z-10">
                Our dedication to uncompromising quality establishes No Limits Furniture as a premier brand. We continue to source the finest materials globally while maintaining our core philosophy of local manufacturing excellence.
              </p>
            </div>
            {/* Right Content (Image) */}
            <div className="relative h-[500px] w-full overflow-hidden order-1 md:order-2 border border-theme-border">
              <img 
                src="https://images.unsplash.com/photo-1628592102751-ba83b0314276?auto=format&fit=crop&q=60&w=800" 
                alt="Large slabs of premium white marble in a quarry" 
                className="h-full w-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000" 
                referrerPolicy="no-referrer" loading="lazy"
              />
              <div className="absolute bottom-6 left-6 bg-theme-overlay/80 backdrop-blur-md px-4 py-2 text-[10px] tracking-widest uppercase text-theme-text-muted border border-theme-border">
                Carrara Quarry Inspection
              </div>
            </div>
          </div>

          {/* Timeline Item: Present */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 group">
            {/* Center Node */}
            <div className="absolute left-1/2 top-12 size-4 bg-primary rotate-45 transform -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(255,165,0,0.5)] hidden md:block"></div>
            {/* Left Content (Image) */}
            <div className="relative h-[400px] w-full overflow-hidden order-1">
              <img 
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=60&w=800" 
                alt="Modern minimalist living room with No Limits furniture piece" 
                className="h-full w-full object-cover" 
                referrerPolicy="no-referrer" loading="lazy"
              />
              <div className="absolute bottom-4 right-4 bg-background-dark/80 backdrop-blur px-3 py-1 text-xs text-text-muted border border-border-subtle">
                The Boundless Collection
              </div>
            </div>
            {/* Right Content (Text) */}
            <div className="flex flex-col justify-center text-left pl-0 md:pl-16 relative order-2 mt-8 md:mt-0">
              {/* Background Year Number */}
              <span className="absolute -top-10 md:-top-20 left-0 md:left-10 text-[80px] md:text-[160px] font-display font-bold text-surface-dark/50 -z-10 select-none leading-none opacity-40">Today</span>
              <h3 className="text-3xl font-display font-medium text-text-main mb-4 relative z-10">The Modern Atelier</h3>
              <p className="text-text-muted font-body leading-loose text-lg relative z-10">
                Today, No Limits Furniture stands at the forefront of design innovation. We continue to push boundaries, creating pieces that transform spaces and elevate the standard of living.
              </p>
            </div>
          </div>
        </div>

        {/* Meet the Makers Section */}
        <section className="bg-surface-dark border-y border-border-subtle py-24 relative overflow-hidden">
          {/* Background texture overlay */}
          <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] pointer-events-none"></div>
          <div className="layout-container max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="block text-primary text-sm font-bold tracking-[0.2em] uppercase mb-4">The Hands Behind The History</span>
              <h2 className="text-4xl md:text-4xl font-display font-medium text-text-main italic">Meet the Makers</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Maker 1 */}
              <div className="group flex flex-col items-center">
                <div className="relative w-full aspect-[3/4] overflow-hidden mb-6 bg-background-dark border border-border-subtle">
                  <img 
                    src="https://images.unsplash.com/photo-1506803048088-33d3746a263e?auto=format&fit=crop&q=60&w=800" 
                    alt="Portrait of an elderly craftsman smiling with wrinkles" 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                    referrerPolicy="no-referrer" loading="lazy"
                  />
                </div>
                <h4 className="text-xl font-display text-text-main">Elias Thorne</h4>
                <p className="text-sm text-primary uppercase tracking-widest mt-1 mb-3">Master Woodworker</p>
                <p className="text-text-muted text-center font-light text-sm px-4">
                  "The wood dictates the shape. I am merely the listener." With No Limits since 2023.
                </p>
              </div>
              {/* Maker 2 */}
              <div className="group flex flex-col items-center">
                <div className="relative w-full aspect-[3/4] overflow-hidden mb-6 bg-background-dark border border-border-subtle">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=60&w=800" 
                    alt="Portrait of a focused artisan woman inspecting leather" 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                    referrerPolicy="no-referrer" loading="lazy"
                  />
                </div>
                <h4 className="text-xl font-display text-text-main">Sarah Jenkins</h4>
                <p className="text-sm text-primary uppercase tracking-widest mt-1 mb-3">Head Tanner</p>
                <p className="text-text-muted text-center font-light text-sm px-4">
                  "Leather remembers. Every scar tells a story of resilience." With No Limits since 2023.
                </p>
              </div>
              {/* Maker 3 */}
              <div className="group flex flex-col items-center">
                <div className="relative w-full aspect-[3/4] overflow-hidden mb-6 bg-background-dark border border-border-subtle">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=60&w=800" 
                    alt="Portrait of a young man polishing wood intently" 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                    referrerPolicy="no-referrer" loading="lazy"
                  />
                </div>
                <h4 className="text-xl font-display text-text-main">Marco Rossini</h4>
                <p className="text-sm text-primary uppercase tracking-widest mt-1 mb-3">Finishing Specialist</p>
                <p className="text-text-muted text-center font-light text-sm px-4">
                  "The perfect finish is invisible. It should feel like nothing but the wood itself." With No Limits since 2023.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-20 text-center">
          <Link to="/shop" onClick={() => window.scrollTo(0, 0)} className="inline-flex items-center gap-2 text-4xl md:text-3xl font-display italic text-text-main hover:text-primary transition-colors">
            Explore The Collection
            <span className="material-symbols-outlined text-3xl">arrow_forward</span>
          </Link>
        </section>
      </main>
    </div>
  );
};

export default Archive;
