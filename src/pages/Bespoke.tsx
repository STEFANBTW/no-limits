import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Hammer, PenTool, Ruler } from 'lucide-react';
import StartDialogueForm from '../components/StartDialogueForm';

const Bespoke = () => {
  const steps = [
    {
      icon: <PenTool className="w-6 h-6" />,
      title: "The Dialogue",
      desc: "A collaborative consultation to understand your spatial vision, lifestyle, and aesthetic preferences."
    },
    {
      icon: <Ruler className="w-6 h-6" />,
      title: "Architectural Drafting",
      desc: "Precise technical drawings and 3D visualizations to refine the form and function of your piece."
    },
    {
      icon: <Hammer className="w-6 h-6" />,
      title: "Master Craftsmanship",
      desc: "Hand-forged in our atelier using rare materials and techniques passed down through generations."
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "The Installation",
      desc: "Seamless integration of the artifact into your environment, ensuring it becomes part of the architecture."
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-theme-base text-theme-text min-h-screen font-sans selection:bg-primary/30"
    >
      {/* Hero Section - Immersive Editorial */}
      <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 20, ease: "linear" }}
            className="w-full h-full bg-cover bg-center opacity-60"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=60&w=1200')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-theme-gradient-end" />
        </div>

        <div className="relative z-10 max-w-5xl px-6 text-center flex flex-col items-center mx-auto -translate-x-0.5 md:translate-x-0">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-sans tracking-[0.4em] uppercase text-[10px] md:text-xs mb-8 block"
          >
            Private Commissions
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-6xl md:text-9xl lg:text-[140px] mb-8 leading-none text-center"
          >
            The <span className="italic text-theme-text-muted">Dialogue.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto text-[15px] sm:text-lg md:text-xl text-theme-text-muted font-light leading-relaxed text-center"
          >
            True luxury is not found on a shelf. It is a collaborative journey between patron and artisan to create something that exists nowhere else.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >

        </motion.div>
      </section>

      {/* The Philosophy Section */}
      <section className="py-32 px-6 border-t border-theme-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden border border-theme-border">
              <img 
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=60&w=800" 
                alt="Artisan working with metal" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer" loading="lazy"
              />
            </div>
            <div className="absolute -bottom-12 -right-12 w-64 h-80 hidden md:block border border-theme-border overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&q=60&w=800" 
                alt="Architectural drawing" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer" loading="lazy"
              />
            </div>
          </div>
          
          <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
            <span className="text-primary font-sans tracking-[0.3em] uppercase text-[10px] md:text-xs mb-6 block">Our Ethos</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-8 leading-tight">Beyond <br /><span className="italic">Customization.</span></h2>
            <p className="text-theme-text-muted text-[15px] sm:text-lg font-light leading-relaxed mb-8 max-w-2xl">
              A Bespoke Commission at No Limits Furniture is not merely choosing a color or a size. It is an architectural endeavor. We source the finest materials and employ master craftsmen to realize pieces that are structural masterpieces, manufactured locally to global standards.
            </p>
            <div className="grid grid-cols-2 gap-8 w-full max-w-sm lg:max-w-none">
              <div>
                <span className="block font-serif text-3xl mb-2">12-16</span>
                <span className="text-[0.65rem] font-sans tracking-[0.2em] uppercase text-[#54524F]">Weeks Lead Time</span>
              </div>
              <div>
                <span className="block font-serif text-3xl mb-2">100%</span>
                <span className="text-[0.65rem] font-sans tracking-[0.2em] uppercase text-[#54524F]">Hand-Crafted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Process Section */}
      <section className="py-32 px-6 bg-theme-panel border-y border-theme-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-primary font-sans tracking-[0.3em] uppercase text-xs mb-6 block">The Journey</span>
            <h2 className="font-serif text-4xl md:text-5xl">From Vision to <span className="italic">Artifact.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center md:items-start gap-6 group text-center md:text-left"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 border border-theme-border rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-theme-text transition-all duration-500">
                  {React.cloneElement(step.icon as React.ReactElement, { size: 18, className: "md:w-6 md:h-6" } as any)}
                </div>
                <div className="flex flex-col gap-2 items-center md:items-start">
                  <span className="text-[0.55rem] md:text-[0.6rem] font-sans tracking-[0.3em] text-[#54524F] uppercase">Phase 0{index + 1}</span>
                  <h3 className="font-serif text-3xl md:text-4xl">{step.title}</h3>
                  <p className="text-xs md:text-sm text-theme-text-muted font-light leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Inquiry Form Section */}
      <StartDialogueForm />
    </motion.div>
  );
};

export default Bespoke;
