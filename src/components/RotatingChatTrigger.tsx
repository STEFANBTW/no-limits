import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Hammer } from 'lucide-react';

const RotatingChatTrigger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 5000);
    }, 5 * 60 * 1000); // 5 minutes
    return () => clearInterval(interval);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: input,
        config: {
          systemInstruction: "You are Sawyer, a helpful assistant for No Limits Furniture, a carpentry and architectural design firm. Answer questions about our products, commissions, and history."
        }
      });
      setMessages(prev => [...prev, { role: 'bot', text: response.text || "I'm sorry, I couldn't understand that." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "I'm having trouble connecting right now." }]);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Auto-popup */}
      <AnimatePresence>
        {showPopup && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-20 right-0 mb-2 bg-theme-text text-theme-base p-3 rounded-none shadow-xl text-[10px] font-sans tracking-widest uppercase"
          >
            Can I help you?
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rotating Trigger */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="group relative h-24 w-24 cursor-pointer"
      >
        <div className="absolute inset-0 animate-[spin_20s_linear_infinite] group-hover:[animation-play-state:paused]">
          <svg height="100%" viewBox="0 0 100 100" width="100%">
            <defs>
              <path d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" id="circle"></path>
            </defs>
            <text className="fill-theme-text" fontFamily="Montserrat, sans-serif" fontSize="10" fontWeight="500" letterSpacing="2">
              <textPath xlinkHref="#circle">
                HERITAGE • ARCHITECTURE • EST. 2023 • 
              </textPath>
            </text>
          </svg>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Hammer className="text-primary w-8 h-8" />
        </div>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-28 right-0 w-[calc(100vw-4rem)] sm:w-80 bg-theme-surface border border-theme-border shadow-2xl rounded-none overflow-hidden"
          >
            <div className="p-4 bg-theme-panel text-theme-text font-sans text-xs tracking-widest uppercase flex justify-between items-center border-b border-theme-border">
                <span>Sawyer</span>
                <button onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors"><X size={16}/></button>
            </div>
            <div className="h-64 overflow-y-auto p-4 space-y-4 font-sans text-sm scrollbar-thin">
              {messages.map((m, i) => (
                <div key={i} className={`p-3 ${m.role === 'user' ? 'bg-theme-border/20 text-theme-text ml-8' : 'bg-theme-panel/50 text-theme-text-muted mr-8'} border border-theme-border`}>
                  {m.text}
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-theme-border flex gap-2 bg-theme-panel/30">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow bg-transparent border-b border-theme-border text-theme-text focus:outline-none placeholder:text-theme-text-subtle font-sans text-xs"
                placeholder="Ask Sawyer..."
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button onClick={handleSend} className="text-primary hover:text-[#e86e42] transition-colors"><Send size={16}/></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RotatingChatTrigger;
