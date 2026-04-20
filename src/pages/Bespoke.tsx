import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Send, Sparkles, Hammer, PenTool, Ruler } from 'lucide-react';

const Bespoke = () => {
  const [formStep, setFormStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

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
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
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

        <div className="relative z-10 max-w-5xl px-6 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-sans tracking-[0.4em] uppercase text-xs mb-8 block"
          >
            Private Commissions
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-5xl md:text-8xl lg:text-9xl mb-8 leading-tight"
          >
            The <span className="italic text-theme-text-muted">Dialogue.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-theme-text-muted font-light leading-relaxed"
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
          
          <div className="flex flex-col justify-center">
            <span className="text-primary font-sans tracking-[0.3em] uppercase text-xs mb-6 block">Our Ethos</span>
            <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">Beyond <br /><span className="italic">Customization.</span></h2>
            <p className="text-theme-text-muted text-lg font-light leading-relaxed mb-8">
              A Bespoke Commission at No Limits Furniture is not merely choosing a color or a size. It is an architectural endeavor. We source the finest materials and employ master craftsmen to realize pieces that are structural masterpieces, manufactured locally to global standards.
            </p>
            <div className="grid grid-cols-2 gap-8">
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
                className="flex flex-col gap-6 group"
              >
                <div className="w-12 h-12 border border-theme-border rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-theme-text transition-all duration-500">
                  {step.icon}
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[0.6rem] font-sans tracking-[0.3em] text-[#54524F] uppercase">Phase 0{index + 1}</span>
                  <h3 className="font-serif text-4xl">{step.title}</h3>
                  <p className="text-sm text-theme-text-muted font-light leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Inquiry Form Section */}
      <section className="py-40 px-6 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="bg-theme-surface border border-theme-border p-8 md:p-16 shadow-2xl"
              >
                <div className="text-center mb-12">
                  <span className="text-primary font-sans tracking-[0.3em] uppercase text-xs mb-6 block">Inquiry</span>
                  <h2 className="font-serif text-4xl md:text-4xl mb-4">Start a Dialogue</h2>
                  <p className="text-theme-text-muted font-light">Tell us about the space you wish to transform.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="relative group">
                      <input 
                        type="text" 
                        required
                        className="w-full bg-transparent border-b border-theme-border py-3 text-theme-text focus:outline-none focus:border-primary transition-colors peer placeholder-transparent"
                        placeholder="Name"
                      />
                      <label className="absolute left-0 top-3 text-[0.7rem] font-sans tracking-[0.2em] uppercase text-[#54524F] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[0.6rem] peer-focus:text-primary pointer-events-none">
                        Full Name
                      </label>
                    </div>
                    <div className="relative group">
                      <input 
                        type="email" 
                        required
                        className="w-full bg-transparent border-b border-theme-border py-3 text-theme-text focus:outline-none focus:border-primary transition-colors peer placeholder-transparent"
                        placeholder="Email"
                      />
                      <label className="absolute left-0 top-3 text-[0.7rem] font-sans tracking-[0.2em] uppercase text-[#54524F] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[0.6rem] peer-focus:text-primary pointer-events-none">
                        Email Address
                      </label>
                    </div>
                  </div>

                  <div className="relative group">
                    <select 
                      required
                      className="w-full bg-transparent border-b border-theme-border py-3 text-theme-text focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-theme-surface">Select Interest</option>
                      <option value="furniture" className="bg-theme-surface">Masterpiece Furniture</option>
                      <option value="architectural" className="bg-theme-surface">Architectural Installation</option>
                      <option value="full-space" className="bg-theme-surface">Full Space Curation</option>
                      <option value="other" className="bg-theme-surface">Other Inquiry</option>
                    </select>
                    <div className="absolute right-0 top-4 pointer-events-none text-[#54524F]">
                      <ArrowRight className="w-4 h-4 rotate-90" />
                    </div>
                  </div>

                  <div className="relative group">
                    <textarea 
                      required
                      rows={4}
                      className="w-full bg-transparent border-b border-theme-border py-3 text-theme-text focus:outline-none focus:border-primary transition-colors peer placeholder-transparent resize-none"
                      placeholder="Message"
                    />
                    <label className="absolute left-0 top-3 text-[0.7rem] font-sans tracking-[0.2em] uppercase text-[#54524F] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[0.6rem] peer-focus:text-primary pointer-events-none">
                      Your Vision
                    </label>
                  </div>

                  <button 
                    type="submit"
                    className="w-full group relative overflow-hidden bg-white text-theme-text-inverse py-5 flex items-center justify-center gap-3 transition-all"
                  >
                    <span className="relative z-10 font-sans text-xs font-bold tracking-[0.3em] uppercase">Send Inquiry</span>
                    <Send className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    <div className="absolute inset-0 bg-primary transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-theme-surface border border-theme-border p-16 text-center shadow-2xl"
              >
                <div className="w-20 h-20 border border-primary rounded-full flex items-center justify-center mx-auto mb-8 text-primary">
                  <Check className="w-10 h-10" />
                </div>
                <h2 className="font-serif text-4xl mb-4">Inquiry Received</h2>
                <p className="text-theme-text-muted font-light leading-relaxed mb-8">
                  Your vision has been shared with our master artisans. We review commissions weekly and will reach out to schedule your initial dialogue.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-primary font-sans text-xs font-bold tracking-[0.2em] uppercase hover:underline"
                >
                  Send another inquiry
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </motion.div>
  );
};

export default Bespoke;
