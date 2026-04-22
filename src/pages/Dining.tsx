import React from 'react';
import { Link } from 'react-router-dom';
import CollectionSpotlight from '../components/CollectionSpotlight';
import StartDialogueForm from '../components/StartDialogueForm';

const Dining = () => {
  return (
    <div className="bg-theme-panel text-theme-text font-sans selection:bg-primary/30 selection:text-theme-text overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&display=swap');
        .font-display { font-family: 'Newsreader', serif; }
        .section-100vh { min-height: 100dvh; display: flex; flex-direction: column; justify-content: center; }
      `}</style>

      {/* HERO SECTION (From Block 2) */}
      <section className="section-100vh relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f0f0f]/20 to-[#0f0f0f] z-10"></div>
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-[10s] hover:scale-105" 
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&q=60&w=1200')" }}
          ></div>
        </div>
        <div className="relative z-20 text-center max-w-5xl px-8 flex flex-col items-center">
          <span className="text-primary text-sm font-bold tracking-[0.5em] uppercase mb-6 opacity-0 animate-[fadeIn_1s_ease-out_forwards]">Established 2023</span>
          <h1 className="text-theme-text text-6xl md:text-9xl font-light italic mb-8 leading-[0.9] font-display">
            Architectural <br/><span className="font-bold not-italic">Dining Environments</span>
          </h1>
          <p className="text-theme-text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Sculpting the atmosphere where gastronomy meet architectural legacy. 
            Experience the intersection of form, light, and materiality.
          </p>
          <div className="w-px h-24 bg-gradient-to-b from-primary to-transparent"></div>
        </div>
      </section>

      {/* CURATED ELEMENTS (From Block 2 - Masonry) */}
      <section className="section-100vh bg-theme-panel flex flex-col justify-center px-8 md:px-16 py-20 border-t border-primary/10">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-primary text-xs font-bold tracking-[0.4em] uppercase mb-4">The Vocabulary of Space</h2>
            <h3 className="text-4xl md:text-4xl font-bold font-display">Curated Elements</h3>
          </div>
          <p className="text-theme-text-subtle max-w-md italic text-lg leading-relaxed font-display">
            "Architecture is the learned game, correct and magnificent, of forms assembled in the light."
          </p>
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 grid-rows-2 gap-4 h-[60vh] min-h-[500px]">
          <div className="md:col-span-8 row-span-2 group overflow-hidden relative rounded-sm">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=60&w=800')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/80 to-transparent p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <h4 className="text-4xl font-bold text-theme-text font-display">Structural Vaulting</h4>
              <p className="text-theme-text-muted">Engineering grandeur through height and geometry.</p>
            </div>
          </div>
          <div className="md:col-span-4 row-span-1 group overflow-hidden relative rounded-sm">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507473888900-52e1adad5452?auto=format&fit=crop&q=60&w=800')" }}></div>
            <div className="absolute inset-0 bg-theme-overlay/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <span className="text-xs tracking-widest uppercase font-bold border-b border-primary py-1">Ambient Light Control</span>
            </div>
          </div>
          <div className="md:col-span-4 row-span-1 group overflow-hidden relative rounded-sm">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1577140918692-788fa8a196b7?auto=format&fit=crop&q=60&w=800')" }}></div>
            <div className="absolute inset-0 bg-theme-overlay/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <span className="text-xs tracking-widest uppercase font-bold border-b border-primary py-1">Bespoke Tablescapes</span>
            </div>
          </div>
        </div>
      </section>

      {/* THE PROCESS (From Block 2) */}
      <section className="section-100vh bg-theme-surface flex items-center relative overflow-hidden p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full min-h-screen">
          <div className="flex flex-col justify-center px-12 md:px-24 bg-theme-panel border-r border-primary/10 py-20">
            <h2 className="text-primary text-xs font-bold tracking-[0.4em] uppercase mb-6">The Process</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-8 leading-tight font-display">The Master Craftsman's <br/><span className="italic font-light">Atelier</span></h3>
            <div className="space-y-8 max-w-lg">
              <div className="flex gap-6 items-start">
                <span className="text-primary text-4xl font-display">01</span>
                <div>
                  <h4 className="text-lg font-bold mb-2">Ancestral Joinery</h4>
                  <p className="text-theme-text-subtle text-sm leading-relaxed">Precision-milled mortise and tenon joints in No Limits Oak, designed to endure for centuries.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <span className="text-primary text-4xl font-display">02</span>
                <div>
                  <h4 className="text-lg font-bold mb-2">Lost-Wax Bronze Casting</h4>
                  <p className="text-theme-text-subtle text-sm leading-relaxed">Sculptural table bases and hardware cast in solid bronze, finished with a signature dark patina.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <span className="text-primary text-4xl font-display">03</span>
                <div>
                  <h4 className="text-lg font-bold mb-2">Grain Selection</h4>
                  <p className="text-theme-text-subtle text-sm leading-relaxed">Sourcing book-matched slabs of rare timbers that define the spatial geometry of the room.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative grid grid-cols-2 grid-rows-2 p-12 gap-8 bg-theme-surface min-h-[50vh] md:min-h-0">
            <div className="rounded-lg shadow-2xl bg-center bg-cover border border-theme-border" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=60&w=800')" }}></div>
            <div className="rounded-lg shadow-2xl bg-center bg-cover mt-12 border border-theme-border" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507473888900-52e1adad5452?auto=format&fit=crop&q=60&w=800')" }}></div>
            <div className="rounded-lg shadow-2xl bg-center bg-cover mb-12 border border-theme-border" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1577140918692-788fa8a196b7?auto=format&fit=crop&q=60&w=800')" }}></div>
            <div className="rounded-lg shadow-2xl bg-center bg-cover border border-theme-border" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&q=60&w=800')" }}></div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE ROOM SCAPE (From Block 1) */}
      <section className="min-h-screen w-full relative flex items-center justify-center bg-theme-panel overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img alt="Fully designed dining room" className="w-full h-full object-cover opacity-60" src="https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&q=60&w=1200" referrerPolicy="no-referrer"/>
        </div>
        <div className="relative z-10 w-full max-w-[1400px] h-full flex flex-col justify-between py-24 px-4 md:px-10">
          <div className="text-center mb-12">
            <h2 className="text-theme-text tracking-tight text-4xl font-bold leading-tight lg:text-4xl drop-shadow-lg font-display">
              Interactive Room Scape
            </h2>
            <p className="text-theme-text-muted text-xl font-light mt-4 drop-shadow-md">Explore the curated pieces within this environment.</p>
          </div>
          <div className="relative flex-grow w-full h-[60vh]">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center group">
              <div className="size-8 rounded-full bg-primary/80 border-2 border-white flex items-center justify-center cursor-pointer animate-pulse group-hover:animate-none group-hover:bg-primary transition-colors hover:scale-110">
                <span className="material-symbols-outlined text-theme-text text-sm">add</span>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 pt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-20">
                <div className="w-64 bg-[#0f0f0f]/95 backdrop-blur border border-primary/30 p-4 shadow-2xl">
                  <h4 className="text-theme-text font-bold mb-1 font-display">Modern Resin Dining Table</h4>
                  <p className="text-theme-text-subtle text-sm font-light mb-3">Poured resin over a steel skeleton, polished to a matte finish.</p>
                  <Link to="/product/modern-resin-dining-table" className="text-primary text-sm font-bold uppercase tracking-wider border-b border-primary pb-1 inline-block hover:text-white hover:border-white transition-colors cursor-pointer">View Details</Link>
                </div>
              </div>
            </div>
            <div className="absolute top-[60%] left-[30%] flex items-center justify-center group">
              <div className="size-8 rounded-full bg-primary/80 border-2 border-white flex items-center justify-center cursor-pointer animate-pulse group-hover:animate-none group-hover:bg-primary transition-colors hover:scale-110">
                <span className="material-symbols-outlined text-theme-text text-sm">add</span>
              </div>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 pb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-20">
                <div className="w-64 bg-[#0f0f0f]/95 backdrop-blur border border-primary/30 p-4 shadow-2xl">
                  <h4 className="text-theme-text font-bold mb-1 font-display">Emerald Velvet Dining Chair</h4>
                  <p className="text-theme-text-subtle text-sm font-light mb-3">Rich emerald green velvet stretched over an ergonomic curved seat.</p>
                  <Link to="/product/emerald-velvet-dining-chair" className="text-primary text-sm font-bold uppercase tracking-wider border-b border-primary pb-1 inline-block hover:text-white hover:border-white transition-colors cursor-pointer">View Details</Link>
                </div>
              </div>
            </div>
            <div className="absolute top-[20%] left-[45%] flex items-center justify-center group">
              <div className="size-8 rounded-full bg-primary/80 border-2 border-white flex items-center justify-center cursor-pointer animate-pulse group-hover:animate-none group-hover:bg-primary transition-colors hover:scale-110">
                <span className="material-symbols-outlined text-theme-text text-sm">add</span>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 pt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-20">
                <div className="w-64 bg-[#0f0f0f]/95 backdrop-blur border border-primary/30 p-4 shadow-2xl">
                  <h4 className="text-theme-text font-bold mb-1 font-display">The Statement Wall Mirror</h4>
                  <p className="text-theme-text-subtle text-sm font-light mb-3">A monolithic circular mirror that expands spatial horizons.</p>
                  <Link to="/product/statement-wall-mirror" className="text-primary text-sm font-bold uppercase tracking-wider border-b border-primary pb-1 inline-block hover:text-white hover:border-white transition-colors cursor-pointer">View Details</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CollectionSpotlight collectionName="Dining" />

      {/* ACOUSTIC & SPATIAL FLOW (From Block 2) */}
      <section className="section-100vh bg-theme-panel px-16 py-24 flex flex-col justify-center items-center">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-5 space-y-12">
            <div className="space-y-4">
              <h2 className="text-primary text-xs font-bold tracking-[0.4em] uppercase">Editorial Perspective</h2>
              <h3 className="text-4xl font-bold leading-tight font-display">Acoustic &amp; <br/>Spatial Flow</h3>
            </div>
            <div className="prose prose-invert prose-lg text-theme-text-subtle font-light leading-relaxed">
              <p>Our furniture serves as the gravitational anchor for expansive architectural spaces. By understanding the harmonics of a room, we position each piece to optimize both conversational intimacy and grand perspective.</p>
              <p>Through architectural sketches and volume studies, we ensure the table doesn't just fill space, but commands it.</p>
            </div>
            <div className="flex gap-8 border-t border-primary/20 pt-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">0.4s</div>
                <div className="text-[10px] uppercase tracking-widest text-theme-text-subtle">Reverb Goal</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">12m</div>
                <div className="text-[10px] uppercase tracking-widest text-theme-text-subtle">Vista Axis</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">24+</div>
                <div className="text-[10px] uppercase tracking-widest text-theme-text-subtle">Guest Capacity</div>
              </div>
            </div>
          </div>
          <div className="md:col-span-7 relative h-[600px] flex items-center justify-center">
            <div className="absolute inset-0 border-[0.5px] border-primary/20 pointer-events-none"></div>
            <div className="absolute top-1/2 left-0 w-full h-px bg-primary/10"></div>
            <div className="absolute top-0 left-1/2 w-px h-full bg-primary/10"></div>
            <div className="relative w-4/5 h-4/5 bg-theme-surface z-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border border-primary/30 p-2 overflow-hidden">
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&q=60&w=800')" }}></div>
            </div>
            <div className="absolute bottom-10 right-0 w-64 h-48 bg-theme-panel z-20 shadow-2xl border border-primary/20 p-1">
              <div className="w-full h-full bg-cover bg-center contrast-125 opacity-70" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=60&w=800')" }}></div>
            </div>
          </div>
        </div>
      </section>

      <StartDialogueForm />
    </div>
  );
};

export default Dining;
