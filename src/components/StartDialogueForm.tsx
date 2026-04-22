import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Send, Check } from 'lucide-react';
import FurnitureBackground from './FurnitureBackground';

const interests = [
  { value: "furniture", label: "MASTERPIECE FURNITURE" },
  { value: "architecture", label: "ARCHITECTURAL INSTALLATION" },
  { value: "curation", label: "FULL SPACE CURATION" },
  { value: "other", label: "OTHER INQUIRY" }
];

const spaces = [
  { value: "entryway", label: "ENTRYWAY" },
  { value: "living", label: "LIVING STUDIO" },
  { value: "dining", label: "DINING ATELIER" },
  { value: "kitchen", label: "KITCHEN" },
  { value: "study", label: "THE STUDY" },
  { value: "sanctuary", label: "MASTER SANCTUARY" },
  { value: "wellness", label: "WELLNESS RESERVE" },
  { value: "cellar", label: "THE CELLAR" },
  { value: "outdoor", label: "EN PLEIN AIR" },
];

const StartDialogueForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [interest, setInterest] = useState('');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  
  const [space, setSpace] = useState('');
  const [isSpaceSelectOpen, setIsSpaceSelectOpen] = useState(false);

  const selectRef = useRef<HTMLDivElement>(null);
  const spaceSelectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsSelectOpen(false);
      }
      if (spaceSelectRef.current && !spaceSelectRef.current.contains(event.target as Node)) {
        setIsSpaceSelectOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section className="py-12 px-5 md:px-6 relative overflow-hidden flex flex-col justify-center items-center w-full min-h-[100dvh] bg-transparent">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-primary/5 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />
      
      <FurnitureBackground />

      <div className="max-w-3xl w-full relative z-10 flex flex-col justify-center flex-grow">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="p-4 md:p-8 lg:p-12 md:bg-theme-surface md:border md:border-theme-border md:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4),0_0_1px_rgba(255,255,255,0.05)] bg-transparent border-none shadow-none w-full min-h-[90vh] max-h-[95vh] flex flex-col justify-center overflow-y-auto"
            >
              <div className="text-center mb-6 md:mb-10">
                <span className="text-primary font-sans tracking-[0.3em] uppercase text-[10px] md:text-xs mb-1 md:mb-4 block">Inquiry</span>
                <h2 className="font-serif text-3xl md:text-4xl mb-1 md:mb-3">Start a Dialogue</h2>
                <p className="text-theme-text-muted text-sm md:text-base font-light">Tell us about the space you wish to transform.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="relative group">
                    <input 
                      type="text" 
                      required
                      className="w-full bg-transparent border-b border-theme-border py-2 md:py-3 px-2 md:px-4 text-theme-text focus:outline-none focus:border-primary transition-all duration-500 peer placeholder-transparent"
                      placeholder="Name"
                    />
                    <label className="absolute left-2 md:left-4 -top-4 text-[0.6rem] font-sans tracking-[0.2em] uppercase text-stone-700 dark:text-stone-300 transition-all duration-500 peer-focus:text-primary pointer-events-none">
                      Full Name
                    </label>
                  </div>
                  <div className="relative group">
                    <input 
                      type="email" 
                      required
                      className="w-full bg-transparent border-b border-theme-border py-2 md:py-3 px-2 md:px-4 text-theme-text focus:outline-none focus:border-primary transition-all duration-500 peer placeholder-transparent"
                      placeholder="Email"
                    />
                    <label className="absolute left-2 md:left-4 -top-4 text-[0.6rem] font-sans tracking-[0.2em] uppercase text-stone-700 dark:text-stone-300 transition-all duration-500 peer-focus:text-primary pointer-events-none">
                      Email Address
                    </label>
                  </div>
                </div>

                <div className="relative group" ref={selectRef}>
                  <div 
                    onClick={() => setIsSelectOpen(!isSelectOpen)}
                    className={`w-full bg-transparent border-b py-3 md:py-4 px-2 md:px-4 text-theme-text cursor-pointer flex items-center justify-between group transition-all duration-500 ${isSelectOpen ? 'border-primary' : 'border-theme-border'}`}
                  >
                    <span className={`text-[13px] ${!interest ? 'text-stone-700 dark:text-stone-300 font-light' : 'text-theme-text'}`}>
                      {interest ? interests.find(i => i.value === interest)?.label : "Select Interest"}
                    </span>
                    <div className={`transition-transform duration-300 ${isSelectOpen ? 'rotate-180' : ''}`}>
                      <ChevronDown className="w-4 h-4 text-primary" />
                    </div>
                    <label className={`absolute left-2 md:left-4 -top-4 text-[0.6rem] transition-all duration-500 pointer-events-none uppercase tracking-[0.2em] font-sans ${isSelectOpen ? 'text-primary' : 'text-stone-700 dark:text-stone-300'}`}>
                      Primary Interest
                    </label>
                  </div>

                  <AnimatePresence>
                    {isSelectOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute left-0 right-0 top-full mt-2 bg-theme-surface border border-theme-border shadow-2xl z-50 overflow-hidden"
                      >
                        {interests.map((opt) => (
                          <div
                            key={opt.value}
                            onClick={() => {
                              setInterest(opt.value);
                              setIsSelectOpen(false);
                            }}
                            className="px-6 py-4 hover:bg-primary/10 cursor-pointer flex items-center justify-between group transition-colors border-b border-theme-border last:border-0"
                          >
                            <span className={`text-[11px] font-sans tracking-widest uppercase transition-colors ${interest === opt.value ? 'text-primary' : 'text-theme-text-muted group-hover:text-theme-text'}`}>
                              {opt.label}
                            </span>
                            {interest === opt.value && <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(255,165,0,0.8)]" />}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {interest && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="relative group" 
                    ref={spaceSelectRef}
                  >
                    <div 
                      onClick={() => setIsSpaceSelectOpen(!isSpaceSelectOpen)}
                      className={`w-full bg-transparent border-b py-3 md:py-4 px-2 md:px-4 text-theme-text cursor-pointer flex items-center justify-between group transition-all duration-500 ${isSpaceSelectOpen ? 'border-primary' : 'border-theme-border'}`}
                    >
                      <span className={`text-[13px] ${!space ? 'text-stone-700 dark:text-stone-300 font-light' : 'text-theme-text'}`}>
                        {space ? spaces.find(i => i.value === space)?.label : "Select Curated Space"}
                      </span>
                      <div className={`transition-transform duration-300 ${isSpaceSelectOpen ? 'rotate-180' : ''}`}>
                        <ChevronDown className="w-4 h-4 text-primary" />
                      </div>
                      <label className={`absolute left-2 md:left-4 -top-4 text-[0.6rem] transition-all duration-500 pointer-events-none uppercase tracking-[0.2em] font-sans ${isSpaceSelectOpen ? 'text-primary' : 'text-stone-700 dark:text-stone-300'}`}>
                        Secondary Interest (Space)
                      </label>
                    </div>

                    <AnimatePresence>
                      {isSpaceSelectOpen && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute left-0 right-0 top-full mt-2 bg-theme-surface border border-theme-border shadow-2xl z-50 overflow-hidden"
                        >
                          {spaces.map((opt) => (
                            <div
                              key={opt.value}
                              onClick={() => {
                                setSpace(opt.value);
                                setIsSpaceSelectOpen(false);
                              }}
                              className="px-6 py-4 hover:bg-primary/10 cursor-pointer flex items-center justify-between group transition-colors border-b border-theme-border last:border-0"
                            >
                              <span className={`text-[11px] font-sans tracking-widest uppercase transition-colors ${space === opt.value ? 'text-primary' : 'text-theme-text-muted group-hover:text-theme-text'}`}>
                                {opt.label}
                              </span>
                              {space === opt.value && <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(255,165,0,0.8)]" />}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}

                <div className="relative group">
                  <textarea 
                    required
                    rows={3}
                    className="w-full bg-transparent border-b border-theme-border py-2 md:py-3 px-2 md:px-4 text-theme-text focus:outline-none focus:border-primary transition-all duration-500 peer placeholder-transparent resize-none"
                    placeholder="Message"
                  />
                  <label className="absolute left-2 md:left-4 -top-4 text-[0.6rem] font-sans tracking-[0.2em] uppercase text-stone-700 dark:text-stone-300 transition-all duration-500 peer-focus:text-primary pointer-events-none">
                    Your Vision
                  </label>
                </div>

                <button 
                  type="submit"
                  className="w-full group relative overflow-hidden bg-transparent text-theme-text py-5 flex items-center justify-center gap-3 transition-all border border-[#E8A843]"
                >
                  <span className="relative z-10 font-sans text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase group-hover:text-theme-base transition-colors duration-500">Send Inquiry</span>
                  <Send className="relative z-10 w-4 h-4 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-theme-base" />
                  <div className="absolute inset-0 bg-[#E8A843] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 md:p-16 text-center md:bg-theme-surface md:border md:border-theme-border md:shadow-2xl bg-transparent border-none shadow-none"
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
  );
};

export default StartDialogueForm;
