import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Check, ArrowRight } from 'lucide-react';

interface BespokeInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BespokeInquiryModal = ({ isOpen, onClose }: BespokeInquiryModalProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState("");

  const interests = [
    { id: "furniture", label: "Masterpiece Furniture" },
    { id: "architectural", label: "Architectural Installation" },
    { id: "full-space", label: "Full Space Curation" },
    { id: "other", label: "Other Inquiry" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[101] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-2xl bg-theme-surface border border-theme-border shadow-2xl overflow-hidden pointer-events-auto"
            >
              <div className="relative p-8 md:p-12">
                {/* Close Button */}
                <button 
                  onClick={onClose}
                  className="absolute top-6 right-6 text-theme-text-muted hover:text-primary transition-colors"
                >
                  <X size={24} />
                </button>

                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="text-center mb-10">
                        <span className="text-primary font-sans tracking-[0.3em] uppercase text-xs mb-4 block">Commission Inquiry</span>
                        <h2 className="font-serif text-3xl md:text-4xl mb-4">Start a Dialogue</h2>
                        <p className="text-theme-text-muted font-light text-sm max-w-md mx-auto">
                          Our master artisans review every proposal. Tell us about the space you wish to transform.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="relative group">
                            <input 
                              type="text" 
                              required
                              className="w-full bg-transparent border-b border-theme-border py-2 text-theme-text focus:outline-none focus:border-primary transition-colors peer placeholder-transparent"
                              placeholder="Name"
                            />
                            <label className="absolute left-0 top-2 text-[0.65rem] font-sans tracking-[0.2em] uppercase text-[#54524F] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-[0.6rem] peer-focus:text-primary pointer-events-none">
                              Full Name
                            </label>
                          </div>
                          <div className="relative group">
                            <input 
                              type="email" 
                              required
                              className="w-full bg-transparent border-b border-theme-border py-2 text-theme-text focus:outline-none focus:border-primary transition-colors peer placeholder-transparent"
                              placeholder="Email"
                            />
                            <label className="absolute left-0 top-2 text-[0.65rem] font-sans tracking-[0.2em] uppercase text-[#54524F] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-[0.6rem] peer-focus:text-primary pointer-events-none">
                              Email Address
                            </label>
                          </div>
                        </div>

                        <div className="relative">
                          <input type="hidden" name="interest" value={selectedInterest} required />
                          <button
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full bg-transparent border-b border-theme-border py-3 text-left text-theme-text focus:outline-none focus:border-primary transition-all flex items-center justify-between group"
                          >
                            <span className={`text-sm tracking-wide transition-opacity duration-300 ${!selectedInterest ? 'opacity-40' : 'opacity-100'}`}>
                              {selectedInterest ? interests.find(i => i.id === selectedInterest)?.label : "Select Interest"}
                            </span>
                            <ArrowRight className={`w-4 h-4 transition-transform duration-500 ${isDropdownOpen ? '-rotate-90' : 'rotate-90'} text-theme-text opacity-40 group-hover:opacity-100 group-hover:text-primary`} />
                          </button>
                          
                          <AnimatePresence>
                            {isDropdownOpen && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute z-[110] left-0 right-0 mt-1 bg-theme-surface border border-theme-border shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
                              >
                                {interests.map((interest) => (
                                  <button
                                    key={interest.id}
                                    type="button"
                                    onClick={() => {
                                      setSelectedInterest(interest.id);
                                      setIsDropdownOpen(false);
                                    }}
                                    className="w-full px-6 py-4 text-left text-[10px] tracking-[0.2em] uppercase hover:bg-primary hover:text-theme-base transition-colors border-b last:border-0 border-theme-border/50 text-theme-text opacity-70 hover:opacity-100"
                                  >
                                    {interest.label}
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                          
                          <label className={`absolute left-0 -top-4 text-[0.6rem] font-sans tracking-[0.2em] uppercase text-primary transition-all duration-300 pointer-events-none ${selectedInterest || isDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                            Select Interest
                          </label>
                        </div>

                        <div className="relative group">
                          <textarea 
                            required
                            rows={3}
                            className="w-full bg-transparent border-b border-theme-border py-2 text-theme-text focus:outline-none focus:border-primary transition-colors peer placeholder-transparent resize-none"
                            placeholder="Message"
                          />
                          <label className="absolute left-0 top-2 text-[0.65rem] font-sans tracking-[0.2em] uppercase text-[#54524F] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-[0.6rem] peer-focus:text-primary pointer-events-none">
                            Your Vision
                          </label>
                        </div>

                        <button 
                          type="submit"
                          className="group relative w-full px-10 py-5 bg-theme-text text-theme-base overflow-hidden transition-all flex items-center justify-center gap-3"
                        >
                          <div className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                          <span className="relative z-10 font-sans text-[11px] font-bold tracking-[0.3em] uppercase group-hover:text-theme-base transition-colors duration-500">Send Inquiry</span>
                          <Send className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-theme-base" />
                        </button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 border border-primary rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                        <Check className="w-8 h-8" />
                      </div>
                      <h2 className="font-serif text-3xl mb-4">Inquiry Received</h2>
                      <p className="text-theme-text-muted font-light leading-relaxed mb-8 max-w-sm mx-auto">
                        Your vision has been shared with our master artisans. We will reach out to schedule your initial dialogue shortly.
                      </p>
                      <button 
                        onClick={onClose}
                        className="group relative px-10 py-4 bg-primary text-theme-base overflow-hidden transition-all"
                      >
                        <div className="absolute inset-0 bg-theme-text -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                        <span className="relative z-10 font-sans text-[11px] font-bold tracking-[0.3em] uppercase group-hover:text-theme-base transition-colors duration-500">Close</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BespokeInquiryModal;
