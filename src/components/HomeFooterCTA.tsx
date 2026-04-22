import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import FurnitureBackground from './FurnitureBackground';
import BespokeInquiryModal from './BespokeInquiryModal';

const HomeFooterCTA = () => {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  return (
    <section className="relative w-full bg-theme-panel py-40 px-6 overflow-hidden">
      {/* Abstract background detail */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <FurnitureBackground />
      
      <div className="mx-auto max-w-4xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-8"
        >
          <div className="flex flex-col gap-6">
            <h2 className="text-[54px] md:text-[84px] font-serif text-theme-text italic leading-[1.05] tracking-tight">
              Crafting the boundless<br />future of living.
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 w-full px-6">
            <button 
              onClick={() => setIsInquiryOpen(true)}
              className="group relative w-full sm:w-auto px-12 py-5 bg-transparent overflow-hidden transition-all flex items-center justify-center border-none outline-none"
            >
              <div className="absolute inset-0 bg-theme-text transition-colors duration-300" />
              <div className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              
              <span className="relative z-10 font-sans text-[11px] font-bold tracking-[0.3em] uppercase transition-all duration-500 text-theme-text-inverse group-hover:text-theme-text-inverse">
                Inquire
              </span>
            </button>
            
            <Link 
              to="/bespoke" 
              onClick={() => window.scrollTo(0, 0)}
              className="group relative w-full sm:w-auto px-10 py-5 bg-transparent overflow-hidden transition-all flex items-center justify-center border-none outline-none"
            >
              <div className="absolute inset-0 bg-theme-text-inverse transition-colors duration-300" />
              <div className="absolute inset-0 bg-theme-text -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              
              <span className="relative z-10 font-sans text-[11px] font-bold tracking-[0.3em] uppercase transition-all duration-500 text-theme-text group-hover:text-theme-text-inverse">
                Bespoke
              </span>
            </Link>
          </div>

          <p className="max-w-md text-theme-text-muted text-sm font-light leading-relaxed mt-4">
            Join the select few who live without limits. Our master artisans are ready to translate your vision into an architectural reality.
          </p>
        </motion.div>
      </div>

      <BespokeInquiryModal 
        isOpen={isInquiryOpen} 
        onClose={() => setIsInquiryOpen(false)} 
      />
    </section>
  );
};

export default HomeFooterCTA;
