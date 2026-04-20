import React, { useState } from 'react';

const Living = () => {
  const [activeLightMode, setActiveLightMode] = useState<'day' | 'night'>('day');

  return (
    <div className="bg-theme-panel text-theme-text font-sans selection:bg-primary/30 selection:text-theme-text overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&display=swap');
        .font-display { font-family: 'Newsreader', serif; }
        
        .fade-in-hover .hover-reveal {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        .fade-in-hover:hover .hover-reveal {
            opacity: 1;
        }
      `}</style>

      {/* HERO SECTION (From Block 2) */}
      <section className="min-h-screen relative flex items-center justify-center overflow-hidden border-b border-theme-border">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-theme-overlay/40 z-10"></div>
          <div className="w-full h-[120vh] bg-center bg-cover scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=60&w=1200')", backgroundAttachment: 'fixed' }}>
          </div>
        </div>
        <div className="relative z-20 w-full max-w-[1600px] mx-auto px-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <span className="text-primary font-sans tracking-[0.4em] uppercase text-xs mb-6 block">The Living &amp; Parlor Spaces</span>
            <h2 className="text-5xl md:text-8xl text-theme-text font-medium leading-[1.1] mb-8 font-display">
              Curating <br/> <span className="italic font-light">Conversation.</span>
            </h2>
            <p className="max-w-md text-lg text-theme-text-muted leading-relaxed font-sans font-light">
              A masterclass in interior flow, where architectural precision meets the warmth of lived-in luxury.
            </p>
          </div>
          <div className="md:col-span-5 flex-col items-end pt-24 hidden md:flex">
            <div className="bg-theme-overlay/40 backdrop-blur-xl p-8 border border-theme-border rounded-sm max-w-xs translate-y-12">
              <div className="flex items-center gap-3 mb-4 text-primary">
                <span className="material-symbols-outlined">chair</span>
                <span className="font-sans text-xs tracking-widest uppercase">Signature Layout</span>
              </div>
              <h3 className="text-xl mb-2 font-display text-theme-text">The Conversation Circle</h3>
              <p className="text-sm text-theme-text-subtle font-sans leading-relaxed">
                Intimately arranged seating anchored by a hand-carved marble hearth, designed to foster deep connection.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-theme-text-subtle z-20">
          <span className="text-[10px] tracking-[0.5em] uppercase">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/30 to-transparent"></div>
        </div>
      </section>

      {/* MATERIAL ARCHITECTURE (From Block 3) */}
      <section className="min-h-screen w-full flex flex-col justify-center px-12 relative bg-theme-base border-t border-theme-border">
        <div className="w-full max-w-[1600px] mx-auto h-full flex flex-col justify-center py-20 gap-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="max-w-2xl">
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Section 02 // Materials</span>
              <h2 className="text-theme-text text-4xl font-black leading-tight tracking-tight font-display">
                The Architect's Vision
              </h2>
              <p className="text-theme-text-subtle text-lg mt-6 leading-relaxed">
                Meticulous architectural sketches and premium material palettes define our spaces. Large-scale selections of tactile fabrics and warm woods ensure structural integrity and visual depth.
              </p>
            </div>
            <div className="text-right">
              <div className="inline-block border border-theme-border-strong p-4 bg-theme-border/50 text-sm font-mono text-theme-text-muted">
                STRUCTURAL JOINERY SKETCH // FIG. 01
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 flex-1 h-full min-h-[400px]">
            <div className="group relative flex flex-col h-full overflow-hidden min-h-[300px]">
              <div className="absolute inset-0 bg-center bg-no-repeat bg-cover transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1617364852223-75f57e78dc96?auto=format&fit=crop&q=60&w=800')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-theme-text text-3xl font-bold mb-2 font-display">Mohair</h3>
                <p className="text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">Tactile warmth and depth.</p>
              </div>
            </div>
            <div className="group relative flex flex-col h-full overflow-hidden md:col-span-2 min-h-[300px]">
              <div className="absolute inset-0 bg-center bg-no-repeat bg-cover transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=60&w=800')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-theme-text text-3xl font-bold mb-2 font-display">No Limits Walnut</h3>
                <p className="text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">Rich, deep grains forming the structural backbone of the parlor spaces.</p>
              </div>
            </div>
            <div className="group relative flex flex-col h-full overflow-hidden min-h-[300px]">
              <div className="absolute inset-0 bg-center bg-no-repeat bg-cover transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507473888900-52e1adad5452?auto=format&fit=crop&q=60&w=800')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-theme-text text-3xl font-bold mb-2 font-display">Polished Brass</h3>
                <p className="text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">Subtle accents bridging modern flow with classic joinery.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ATMOSPHERIC INTELLIGENCE (From Block 3) */}
      <section className="min-h-screen w-full flex flex-col justify-center px-12 relative bg-theme-panel border-t border-theme-border">
        <div className="w-full max-w-[1600px] mx-auto h-full max-h-[900px] flex flex-col justify-center py-20 gap-12">
          <div className="text-center max-w-4xl mx-auto mb-8">
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Section 03 // Spatial Harmony</span>
            <h2 className="text-theme-text text-4xl font-black leading-tight tracking-tight mb-6 font-display">Acoustic Architecture</h2>
            <p className="text-theme-text-subtle text-lg leading-relaxed">
              Curating spaces that are impressive for hosting and comforting for daily life. Strategic material choices ensure your parlor remains a haven of quiet conversation.
            </p>
          </div>
          <div className="relative w-full h-[60vh] bg-cover bg-center shadow-2xl group" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=60&w=1200')" }}>
            <div className="absolute inset-0 bg-theme-overlay/30 group-hover:bg-theme-overlay/50 transition-colors duration-700"></div>
            <div className="absolute top-1/3 left-1/4 fade-in-hover z-20">
              <div className="w-8 h-8 rounded-full bg-primary/80 border-2 border-white flex items-center justify-center cursor-pointer pulse-animation relative z-10">
                <span className="material-symbols-outlined text-theme-text text-sm">add</span>
              </div>
              <div className="hover-reveal absolute top-10 -left-24 bg-[#1a1a1a]/95 backdrop-blur-md p-6 border border-theme-border w-72 shadow-2xl pointer-events-none">
                <h4 className="text-theme-text font-bold text-lg mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-primary">graphic_eq</span> Acoustic Paneling</h4>
                <p className="text-theme-text-subtle text-sm">Micro-perforated walnut panels absorb mid-range frequencies, reducing echo and enhancing vocal clarity.</p>
              </div>
            </div>
            <div className="absolute top-1/2 right-1/4 fade-in-hover z-20">
              <div className="w-8 h-8 rounded-full bg-primary/80 border-2 border-white flex items-center justify-center cursor-pointer relative z-10">
                <span className="material-symbols-outlined text-theme-text text-sm">add</span>
              </div>
              <div className="hover-reveal absolute top-10 -left-24 bg-[#1a1a1a]/95 backdrop-blur-md p-6 border border-theme-border w-72 shadow-2xl pointer-events-none">
                <h4 className="text-theme-text font-bold text-lg mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-primary">shelves</span> Integrated Shelving</h4>
                <p className="text-theme-text-subtle text-sm">Floor-to-ceiling structures not only display artifacts but act as multi-depth sound diffusers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVING NARRATIVES (From Block 2) */}
      <section className="min-h-screen bg-theme-base py-32 px-12 border-t border-theme-border">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-xl">
              <span className="text-primary font-sans tracking-[0.4em] uppercase text-xs mb-4 block">Bespoke Curation</span>
              <h2 className="text-4xl md:text-5xl mb-0 font-display">Living Narratives</h2>
            </div>
            <div className="flex gap-8 md:gap-12 font-sans text-xs tracking-[0.2em] uppercase text-theme-text-subtle">
              <span className="cursor-pointer hover:text-theme-text transition-colors border-b border-primary pb-2 text-theme-text">Residential</span>
              <span className="cursor-pointer hover:text-theme-text transition-colors pb-2">Hospitality</span>
              <span className="cursor-pointer hover:text-theme-text transition-colors pb-2">Office</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[800px]">
            <div className="md:col-span-8 md:row-span-2 bg-theme-surface relative group overflow-hidden min-h-[300px]">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&q=60&w=800')" }}></div>
              <div className="absolute inset-0 bg-theme-overlay/20"></div>
            </div>
            <div className="md:col-span-4 md:row-span-3 bg-theme-surface relative group overflow-hidden min-h-[300px]">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=60&w=800')" }}></div>
              <div className="absolute inset-0 bg-theme-overlay/40 p-12 flex flex-col justify-end">
                <h4 className="text-4xl mb-2 font-display">The Sunroom Modular</h4>
                <p className="text-sm font-sans text-theme-text-muted">Adaptable configurations for light-filled environments.</p>
              </div>
            </div>
            <div className="md:col-span-4 md:row-span-1 bg-theme-surface relative group overflow-hidden min-h-[300px]">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?auto=format&fit=crop&q=60&w=800')" }}></div>
            </div>
            <div className="md:col-span-8 md:row-span-1 bg-theme-surface relative group overflow-hidden min-h-[300px]">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=60&w=800')" }}></div>
              <div className="absolute inset-0 bg-theme-overlay/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <button className="bg-theme-border backdrop-blur-md px-10 py-4 border border-theme-border-strong rounded-full tracking-widest uppercase text-xs">View Project</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AMBIANCE DAY/NIGHT (From Block 3) */}
      <section className="min-h-screen w-full flex flex-col justify-center px-12 relative bg-theme-surface border-t border-theme-border overflow-hidden">
        <div className="w-full max-w-[1600px] mx-auto h-full flex flex-col lg:flex-row items-center gap-16 py-20 z-10 relative">
          <div className="lg:w-1/3 z-20">
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Section 04 // Ambiance</span>
            <h2 className="text-theme-text text-4xl font-black leading-tight tracking-tight mb-8 font-display">Light &amp; Shadow</h2>
            <p className="text-theme-text-subtle text-lg leading-relaxed mb-8">
              Experience the interplay between furniture and architectural lighting. Watch the living room transition from bright morning light to a warm, low-light evening ambiance.
            </p>
            <div className="flex items-center gap-4 text-theme-text-subtle text-sm uppercase tracking-widest font-bold">
              <button onClick={() => setActiveLightMode('day')} className={`${activeLightMode === 'day' ? 'text-primary' : ''} hover:text-theme-text transition-colors`}>Day</button>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-white/20 to-primary/50"></div>
              <button onClick={() => setActiveLightMode('night')} className={`${activeLightMode === 'night' ? 'text-primary' : ''} hover:text-theme-text transition-colors`}>Night</button>
            </div>
          </div>
          <div className="lg:w-2/3 w-full h-[70vh] relative shadow-2xl transition-all duration-1000">
            <div className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${activeLightMode === 'day' ? 'opacity-100' : 'opacity-0'}`} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&q=60&w=1200')" }}></div>
            <div className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${activeLightMode === 'night' ? 'opacity-100' : 'opacity-0'}`} style={{ backgroundImage: "url('/images/remove_the_text_202604171859.png')" }}>
            </div>
            <div className="absolute bottom-8 right-8 bg-[#0f0f0f]/80 backdrop-blur-md p-4 border border-theme-border flex items-center gap-4">
              <span className="material-symbols-outlined text-primary text-3xl">{activeLightMode === 'day' ? 'wb_sunny' : 'wb_twilight'}</span>
              <div>
                <p className="text-theme-text font-bold text-sm">{activeLightMode === 'day' ? 'Morning Clarity' : 'Evening Ambiance'}</p>
                <p className="text-theme-text-subtle text-xs">{activeLightMode === 'day' ? 'Natural light accentuating grain' : 'Warm architectural uplighting'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVING NARRATIVES & PLANNING (Combined Block 2 & 3) */}
      <section className="min-h-screen w-full flex flex-col px-12 relative bg-theme-base border-t border-theme-border">
        <div className="w-full max-w-[1600px] mx-auto flex-1 flex flex-col lg:flex-row items-center gap-16 py-20">
          <div className="lg:w-1/2 flex flex-col justify-center">
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-8 block">Section 05 // Planning</span>
            <h2 className="text-theme-text text-4xl font-black leading-tight tracking-tight mb-12 font-display">Bespoke Parlor Planning</h2>
            
            <div className="flex items-center gap-6 mb-12">
              <div className="w-20 h-20 rounded-full bg-cover bg-center border-2 border-primary" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=60&w=800')" }}></div>
              <div>
                <h4 className="text-xl font-display text-theme-text">Marcus Vane</h4>
                <p className="text-xs tracking-widest uppercase text-primary font-sans">Lead Architectural Designer</p>
              </div>
            </div>

            <div className="relative bg-theme-panel p-12 border border-theme-border before:content-[''] before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-primary">
              <span className="material-symbols-outlined text-white/20 text-5xl absolute -top-4 -left-2">format_quote</span>
              <p className="text-theme-text-muted text-2xl font-medium leading-relaxed italic mb-8 relative z-10 font-display">
                "No Limits Furniture doesn't just design furniture; they engineer atmospheres. Their understanding of spatial flow and acoustic integration transformed our latest residential project into a masterpiece of modern luxury."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-theme-border rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-theme-text-subtle">architecture</span>
                </div>
                <div>
                  <h4 className="text-theme-text font-bold">Elena Rostova</h4>
                  <p className="text-theme-text-subtle text-sm">Principal, Rostova Architectural Firm</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 w-full max-w-lg mx-auto bg-theme-surface p-12 shadow-2xl border border-theme-border">
            <h3 className="text-theme-text text-3xl font-bold mb-2 font-display">Start Your Bespoke Project</h3>
            <p className="text-theme-text-subtle text-sm mb-8">Schedule a private consultation with our master designers.</p>
            <form className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-white/70 text-sm font-medium tracking-wide uppercase">Full Name</label>
                <input className="bg-theme-panel border border-theme-border text-theme-text p-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors w-full" placeholder="Jane Doe" type="text"/>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-white/70 text-sm font-medium tracking-wide uppercase">Email Address</label>
                <input className="bg-theme-panel border border-theme-border text-theme-text p-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors w-full" placeholder="jane@example.com" type="email"/>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-white/70 text-sm font-medium tracking-wide uppercase">Project Scope</label>
                <select className="bg-theme-panel border border-theme-border text-theme-text-subtle p-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors w-full appearance-none">
                  <option>Living &amp; Parlor Redesign</option>
                  <option>Full Home Bespoke Furniture</option>
                  <option>Architectural Collaboration</option>
                </select>
              </div>
              <button className="mt-4 bg-primary text-theme-text font-bold tracking-widest uppercase text-sm py-5 px-8 hover:bg-primary/90 transition-colors w-full flex justify-center items-center gap-2" type="button">
                Request Consultation <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Living;
