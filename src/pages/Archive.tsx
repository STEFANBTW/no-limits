import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HomeFooterCTA from '../components/HomeFooterCTA';

const Archive = () => {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-theme-base text-theme-text font-display overflow-x-hidden antialiased">


      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[100dvh] w-full flex overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-theme-overlay z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=60&w=1200" 
              alt="Grand historic architectural archive with floor-to-ceiling wooden shelves and blueprints" 
              className="h-full w-full object-cover opacity-70" 
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative z-20 flex flex-col items-center justify-center text-center px-8 w-full transition-all duration-300">
            <div className="max-w-4xl mx-auto flex flex-col items-center -translate-x-1 md:translate-x-0">
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
                className="text-6xl md:text-9xl lg:text-[140px] font-serif text-theme-text mb-8 italic leading-none"
              >
                The Archive
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-theme-text-muted font-light max-w-2xl leading-relaxed"
              >
                A century of uncompromising architectural vision. From a single drafting table in Lyon to a global standard of living.
              </motion.p>
            </div>
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
            <div className="flex flex-col justify-center text-center md:text-right pr-0 md:pr-16 relative order-2 md:order-1 mt-8 md:mt-0">
              {/* Background Year Number */}
              <span className="absolute -top-10 md:-top-20 right-auto left-0 md:right-10 text-[80px] md:text-[180px] font-serif font-bold text-white/5 -z-10 select-none leading-none w-full text-center md:text-right">2023</span>
              <h3 className="text-3xl md:text-4xl font-serif text-theme-text mb-6 relative z-10">The Foundation</h3>
              <p className="text-theme-text-muted font-sans font-light leading-relaxed text-lg relative z-10 max-w-xl mx-auto md:ml-auto md:mr-0">
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

        {/* Trust Markers Section */}
        <section className="bg-theme-base py-24 border-t border-theme-border overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <span className="block text-primary text-sm font-bold tracking-[0.2em] uppercase mb-4">Our Promise</span>
              <h2 className="text-4xl md:text-5xl font-serif italic text-theme-text font-normal">The Pillars of Excellence</h2>
            </div>
            
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              { 
                title: "High-Quality Products", 
                desc: "Premium materials and expert craftsmanship create durable furniture that stands the test of time, providing excellent value for your investment.",
                icon: "verified"
              },
              { 
                title: "Reliable Service", 
                desc: "Our dedicated team ensures your journey from selection to installation is seamless, transparent, and personalized to your needs.",
                icon: "support_agent"
              },
              { 
                title: "Functional Design", 
                desc: "We blend architectural aesthetics with ergonomic precision, ensuring every piece is as functional as it is visually striking.",
                icon: "architecture"
              },
              { 
                title: "Timely Delivery", 
                desc: "Our white-glove logistics team ensures your artifacts arrive and are installed with the care and punctuality they deserve.",
                icon: "local_shipping"
              }
            ].map((benefit, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                className="group p-4 md:p-8 border border-theme-border bg-theme-panel hover:border-primary transition-all duration-500 flex flex-col items-center text-center shadow-sm hover:shadow-xl"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-theme-border flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary/10 group-hover:border-primary transition-all duration-500">
                  <span className="material-symbols-outlined text-primary text-2xl md:text-3xl">{benefit.icon}</span>
                </div>
                <h4 className="text-sm md:text-xl font-serif text-theme-text mb-2 md:mb-4 italic">{benefit.title}</h4>
                <p className="text-[10px] md:text-sm text-theme-text-muted font-light leading-relaxed">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>
          </div>
        </section>

        {/* Meet the Makers Section */}
        <section className="bg-theme-panel border-y border-theme-border py-24 relative overflow-hidden">
          {/* Background texture overlay */}
          <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] pointer-events-none"></div>
          <div className="layout-container max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="block text-primary text-sm font-bold tracking-[0.2em] uppercase mb-4">The Hands Behind The History</span>
              <h2 className="text-4xl md:text-5xl font-serif italic text-theme-text font-normal">Meet the Maker</h2>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="relative group"
                >
                  <div className="relative aspect-[3/4] overflow-hidden border border-theme-border bg-theme-base">
                    <img 
                      src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=60&w=800" 
                      alt="Portrait of Lawrence Ngene" 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                      referrerPolicy="no-referrer" loading="lazy"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 md:w-48 md:h-48 border border-theme-border bg-theme-panel p-6 flex flex-col justify-center items-center shadow-2xl z-10">
                    <span className="text-primary font-serif italic text-4xl md:text-6xl mb-2">13+</span>
                    <span className="text-[8px] md:text-[10px] tracking-widest uppercase text-theme-text-muted text-center font-bold">Years of Architectural Vision</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <h4 className="text-3xl font-serif text-theme-text italic mb-1">Lawrence Ngene</h4>
                    <p className="text-primary text-xs uppercase tracking-[0.3em] font-bold">CEO & Visionary Architect</p>
                  </div>
                  
                  <div className="space-y-4 text-theme-text-muted font-light leading-relaxed text-lg">
                    <p>
                      Lawrence Ngene, CEO of No Limits Furniture in Jos and Abuja, has turned his business into a thriving brand, defying the challenges of Nigeria's business environment. A Business Administration graduate from the University of Jos, Lawrence launched his showroom in 2011 and has since seen significant growth.
                    </p>
                    <p>
                      Raised in a family of carpenters, Lawrence's early passion for furniture was nurtured in his father's workshop. His creativity and hands-on experience have driven the brand's success. Lawrence attributes this to producing durable furniture, offering competitive pricing, and running strategic promotions.
                    </p>
                    <p>
                      "True luxury is found in resilience and local craftsmanship," Lawrence states. His journey exemplifies how passion and determination can overcome challenges and drive local manufacturing success in Nigeria, creating artifacts designed to age as gracefully as the trees from which they came.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <HomeFooterCTA />
      </main>
    </div>
  );
};

export default Archive;
