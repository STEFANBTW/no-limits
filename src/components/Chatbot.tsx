import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Send, X, MessageSquare, Hammer } from 'lucide-react';
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { useProduct } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

const Chatbot = () => {
  const { products } = useProduct();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { itemCount } = useCart();
  const hasCart = itemCount > 0;
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Greetings. I am Sawyer, the Master Joiner of No Limits Furniture. How may I assist you in your architectural journey today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show popup after 5 seconds
    const timer = setTimeout(() => {
      if (!isOpen) setShowPopup(true);
    }, 5000);

    // Hide popup after 10 seconds
    const hideTimer = setTimeout(() => {
      setShowPopup(false);
    }, 15000);

    const handleOpen = () => {
      setIsOpen(true);
      setShowPopup(false);
    };

    window.addEventListener('open-chatbot', handleOpen);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
      window.removeEventListener('open-chatbot', handleOpen);
    };
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setShowPopup(false);

    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
      
      const navigateToProductTool = {
        functionDeclarations: [{
          name: "navigateToProduct",
          description: "Navigate the user to a specific product's detail page. Use this when the user asks to see a product, wants to view a 3D model, or wants more details about a specific piece.",
          parameters: {
            type: SchemaType.OBJECT,
            properties: {
              slug: {
                type: SchemaType.STRING,
                description: "The unique slug of the product to navigate to (e.g., 'sculpture-ottoman').",
              },
              message: {
                type: SchemaType.STRING,
                description: "A short, sophisticated confirmation message to tell the user while navigating (e.g., 'Moving to the Sculpture Ottoman gallery. Observe the sixth slide for the interactive 3D portal.').",
              }
            },
            required: ["slug", "message"],
          },
        }]
      };

      const productDescriptions = products.map(p => `- ${p.name} (Slug: ${p.slug}): ${p.description} ${p.model3d ? '[3D MODEL AVAILABLE]' : ''}`).join('\n');

      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        tools: [navigateToProductTool as any],
        systemInstruction: `You are Sawyer, the Master Joiner and AI assistant for 'No Limits Furniture'. You are sophisticated, knowledgeable about carpentry, furniture design, and architectural history. 
          
          CURRENT CATALOG:
          ${productDescriptions}
          
          IMPORTANT GUIDELINES:
          1. If a user asks to see a product or a 3D model, USE the navigateToProduct tool immediately.
          2. When guiding to a 3D model, EXPLICITLY mention it is on the SIXTH SLIDE of the gallery.
          3. Tone: Professional, slightly poetic, and helpful. 
          4. Keep responses concise but elegant.`,
      });

      const chat = model.startChat({
        history: messages.slice(1).map(m => ({ // Skip first greeting as it's not from model-history
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        })),
      });

      const result = await chat.sendMessage(input);
      const response = result.response;
      
      const functionCalls = response.functionCalls();
      if (functionCalls && functionCalls.length > 0) {
        const call = functionCalls[0];
        if (call.name === "navigateToProduct") {
          const { slug, message } = call.args as { slug: string, message: string };
          navigate(`/product/${slug}`);
          setMessages(prev => [...prev, { role: 'assistant', content: message }]);
          setIsLoading(false);
          return;
        }
      }

      const aiContent = response.text() || "I apologize, but I seem to have lost my train of thought. How else can I help?";
      setMessages(prev => [...prev, { role: 'assistant', content: aiContent }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting to the atelier right now. Please try again shortly." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Click Outside Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9998] bg-black/20"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Trigger Button (The Rotating Seal) - Desktop Only */}
      {!isOpen && (
        <div 
          className="fixed bottom-[26px] right-8 z-[9998] hidden md:block cursor-pointer group"
          onClick={() => {
            setIsOpen(true);
            setShowPopup(false);
          }}
        >
          <AnimatePresence>
            {showPopup && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              className="absolute -top-16 right-0 bg-white text-theme-text-inverse px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-black/5"
            >
              Need help? Inquire with Sawyer
              <div className="absolute -bottom-1 right-8 w-2 h-2 bg-white rotate-45"></div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative h-24 w-24 animate-[spin_20s_linear_infinite] group-hover:pause transition-all">
          <svg height="100%" viewBox="0 0 100 100" width="100%">
            <defs>
              <path d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" id="circle"></path>
            </defs>
            <text fill="currentColor" className="text-theme-text-muted" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="500" letterSpacing="2">
              <textPath xlinkHref="#circle">
                NO LIMITS • FURNITURE • EST. 2023 • 
              </textPath>
            </text>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-primary"
            >
              <Hammer size={24} fill="currentColor" fillOpacity={0.2} />
            </motion.div>
          </div>
        </div>
      </div>
      )}

      {/* Mobile Chat Trigger - Removed here, integrated into NavBar's unified dock */}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 md:bottom-8 md:left-auto md:translate-x-0 md:right-8 z-[9999] pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 20, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="w-[85vw] h-[75vh] md:w-[380px] md:h-[600px] max-h-[85vh] md:max-h-[80vh] pointer-events-auto bg-[#0a0a0a]/95 backdrop-blur-3xl border border-theme-border-strong shadow-[0_0_1px_rgba(255,255,255,0.1),0_12px_40px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-theme-border flex justify-between items-center bg-transparent">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-theme-border/50 border border-theme-border flex items-center justify-center text-primary shadow-inner">
                  <Hammer size={18} fill="currentColor" fillOpacity={0.2} />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-theme-text font-serif text-lg tracking-wide leading-none mb-1">Sawyer</h3>
                  <span className="text-[9px] text-theme-text-subtle uppercase tracking-[0.2em] font-medium">Master Joiner</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-theme-border/50 hover:bg-theme-border flex items-center justify-center text-theme-text-subtle hover:text-theme-text transition-all duration-300"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-none">
              <AnimatePresence initial={false}>
                {messages.map((msg, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} w-full border-b border-theme-border pb-4 last:border-0`}
                  >
                    <div className={`w-full px-2 text-[14px] leading-relaxed tracking-wide ${
                      msg.role === 'user' 
                        ? 'text-theme-text font-sans text-right' 
                        : 'text-theme-text-muted font-serif italic text-left'
                    }`}>
                      {msg.role === 'assistant' && <span className="block text-primary text-[9px] uppercase tracking-[0.2em] font-sans not-italic mb-2">Sawyer</span>}
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex justify-start"
                  >
                    <div className="bg-theme-border/50 text-theme-text-subtle border border-theme-border px-5 py-4 rounded-2xl rounded-tl-sm flex gap-1.5 items-center h-[46px]">
                      <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-current rounded-full" />
                      <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-current rounded-full" />
                      <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-current rounded-full" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="bg-transparent mt-auto pt-4 pb-6 px-6">
              <form onSubmit={handleSend} className="relative flex items-center border-b border-theme-border-strong focus-within:border-white transition-colors duration-300 pb-1">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Inquire with Sawyer..."
                  className="w-full bg-transparent py-3 pl-2 pr-10 text-[13px] text-theme-text focus:outline-none placeholder:text-slate-600 font-serif italic tracking-wide rounded-none"
                />
                <button 
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-0 w-8 h-8 flex items-center justify-center text-primary disabled:opacity-30 transition-opacity"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
