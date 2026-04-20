import React from 'react';

const Outdoor = () => {
  return (
    <div className="bg-theme-panel text-theme-text font-sans selection:bg-primary/30 selection:text-theme-text overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&display=swap');
        .font-display { font-family: 'Newsreader', serif; }
      `}</style>

      {/* HERO SECTION (From Block 2) */}
      <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-theme-overlay/50 z-10"></div>
          <div className="w-full h-[120vh] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=60&w=1200')", backgroundAttachment: 'fixed' }}></div>
        </div>
        <div className="relative z-20 flex flex-col items-center justify-center text-center h-full max-w-5xl mx-auto px-6 mt-20">
          <p className="text-primary text-sm uppercase tracking-[0.3em] mb-6 font-medium">Outdoor &amp; Courtyard Architecture</p>
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-display font-medium leading-none mb-8 drop-shadow-2xl">
            En Plein Air
          </h1>
          <p className="text-xl md:text-4xl text-theme-text-muted max-w-3xl font-light leading-relaxed mb-12">
            Elevating outdoor living with seamless architectural integration. Where limestone courtyards meet unbreakable elegance.
          </p>
          <div className="animate-bounce absolute bottom-12">
            <span className="material-symbols-outlined text-4xl text-primary font-light">arrow_downward</span>
          </div>
        </div>
      </section>

      {/* ARCHITECTURAL LANDSCAPES (From Block 2) */}
      <section className="min-h-screen bg-theme-panel flex flex-col justify-center py-24 px-8 lg:px-24">
        <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-center">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h2 className="text-4xl md:text-7xl font-display font-medium mb-4">Architectural<br/><span className="text-primary italic">Landscapes</span></h2>
            </div>
            <p className="text-theme-text-subtle max-w-md text-lg font-light leading-relaxed">
              Curated environments showcasing the harmonious blend of robust masonry and refined exterior furnishings.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[60vh] min-h-[500px]">
            <div className="md:col-span-7 h-full relative group overflow-hidden rounded-sm">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=60&w=1200')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <p className="text-primary text-xs uppercase tracking-[0.2em] mb-2">01 / The Estate</p>
                <h3 className="text-3xl font-display mb-2">Limestone Courtyard</h3>
                <p className="text-theme-text-muted text-sm max-w-sm">Monumental scale meets intimate seating arrangements.</p>
              </div>
            </div>
            <div className="md:col-span-5 flex flex-col gap-6 h-full">
              <div className="flex-1 relative group overflow-hidden rounded-sm">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?auto=format&fit=crop&q=60&w=1200')" }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="text-primary text-xs uppercase tracking-[0.2em] mb-1">02 / The Terrace</p>
                  <h3 className="text-xl font-display">Teak Balcony Retreat</h3>
                </div>
              </div>
              <div className="flex-1 relative group overflow-hidden rounded-sm">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=60&w=1200')" }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="text-primary text-xs uppercase tracking-[0.2em] mb-1">03 / The Water Feature</p>
                  <h3 className="text-xl font-display">Reflecting Pool Pavilion</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MATERIAL SCIENCE (From Block 2) */}
      <section className="min-h-screen bg-theme-surface relative overflow-hidden flex flex-col justify-center py-24 px-8 lg:px-24">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-primary/5 blur-[150px] rounded-full"></div>
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-16 h-full relative z-10">
          <div className="w-full md:w-1/2">
            <p className="text-primary text-sm uppercase tracking-[0.2em] mb-4">Indestructible Elegance</p>
            <h2 className="text-4xl md:text-5xl font-display font-medium mb-8 leading-tight">Material<br/>Science</h2>
            <p className="text-theme-text-subtle text-lg font-light leading-relaxed mb-10 max-w-lg">
              Engineered to withstand the elements without compromising on luxury. Our architectural settings are defined by the uncompromising quality of their fundamental elements.
            </p>
            <div className="space-y-8">
              <div className="border-t border-theme-border pt-6">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xl font-display">Marine-Grade Teak</h4>
                  <span className="text-primary text-sm tracking-widest">Tectona Grandis</span>
                </div>
                <p className="text-theme-text-subtle text-sm font-light">Impervious to moisture, naturally resisting decay and structural warping under extreme thermal fluctuations.</p>
              </div>
              <div className="border-t border-theme-border pt-6">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xl font-display">Architectural Bronze</h4>
                  <span className="text-primary text-sm tracking-widest">CuSn8</span>
                </div>
                <p className="text-theme-text-subtle text-sm font-light">Develops a protective living patina while maintaining absolute tensile strength in coastal environments.</p>
              </div>
              <div className="border-t border-theme-border pt-6 pb-6">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xl font-display">Performance Textiles</h4>
                  <span className="text-primary text-sm tracking-widest">Solution-Dyed Acrylic</span>
                </div>
                <p className="text-theme-text-subtle text-sm font-light">UV-stabilized, hydro-repellent woven structures offering interior-grade tactile softness.</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-[70vh] grid grid-cols-2 grid-rows-2 gap-4">
            <div className="bg-cover bg-center rounded-sm row-span-2" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?auto=format&fit=crop&q=60&w=800')" }}></div>
            <div className="bg-cover bg-center rounded-sm" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507473888900-52e1adad5452?auto=format&fit=crop&q=60&w=800')" }}></div>
            <div className="bg-cover bg-center rounded-sm" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1617364852223-75f57e78dc96?auto=format&fit=crop&q=60&w=800')" }}></div>
          </div>
        </div>
      </section>

      {/* THE BLUE HOUR (From Block 2) */}
      <section className="min-h-screen bg-[#0a1128] text-theme-text relative flex flex-col justify-center py-24">
        <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&q=60&w=1200')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1128]/80 via-transparent to-[#0a1128]/90"></div>
        <div className="max-w-7xl mx-auto w-full h-full flex flex-col items-center justify-center text-center relative z-10">
          <p className="text-primary text-sm uppercase tracking-[0.3em] mb-6">Transition to Dusk</p>
          <h2 className="text-5xl md:text-8xl font-display font-medium mb-8">The Blue Hour</h2>
          <p className="text-gray-300 text-xl font-light max-w-2xl leading-relaxed mb-16">
            As twilight descends, integrated architectural lighting transforms the exterior landscape, highlighting the structural elegance of every piece against the encroaching night.
          </p>
          <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl justify-center">
            <div className="w-full md:w-1/3 aspect-[3/4] bg-cover bg-center rounded-sm shadow-2xl relative group" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=60&w=800')" }}>
              <div className="absolute inset-0 bg-theme-overlay/40 group-hover:bg-black/10 transition-colors duration-500"></div>
              <div className="absolute bottom-6 left-6 text-left">
                <h4 className="font-display text-xl">Coastal Illumination</h4>
              </div>
            </div>
            <div className="w-full md:w-1/3 aspect-[3/4] bg-cover bg-center rounded-sm shadow-2xl relative group md:-translate-y-12" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=60&w=800')" }}>
              <div className="absolute inset-0 bg-theme-overlay/40 group-hover:bg-black/10 transition-colors duration-500"></div>
              <div className="absolute bottom-6 left-6 text-left">
                <h4 className="font-display text-xl">Courtyard Ambience</h4>
              </div>
            </div>
            <div className="w-full md:w-1/3 aspect-[3/4] bg-cover bg-center rounded-sm shadow-2xl relative group" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=60&w=800')" }}>
              <div className="absolute inset-0 bg-theme-overlay/40 group-hover:bg-black/10 transition-colors duration-500"></div>
              <div className="absolute bottom-6 left-6 text-left">
                <h4 className="font-display text-xl">Lantern Integration</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BESPOKE COMMISSION (From Block 2) */}
      <section className="min-h-screen bg-theme-panel flex flex-col justify-center py-24 px-8 lg:px-24">
        <div className="max-w-7xl mx-auto w-full h-full flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-5/12">
            <p className="text-primary text-sm uppercase tracking-[0.2em] mb-4">Private Estate Collection</p>
            <h2 className="text-4xl md:text-4xl font-display font-medium mb-6">Bespoke<br/>Commission</h2>
            <p className="text-theme-text-subtle font-light leading-relaxed mb-10">
              Engage our architectural consultation team to design custom exterior living solutions tailored to your estate's unique vernacular.
            </p>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-theme-text-subtle mb-2">First Name</label>
                  <input className="w-full bg-transparent border-b border-theme-border-strong pb-2 text-theme-text focus:outline-none focus:border-primary transition-colors font-light" type="text"/>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-theme-text-subtle mb-2">Last Name</label>
                  <input className="w-full bg-transparent border-b border-theme-border-strong pb-2 text-theme-text focus:outline-none focus:border-primary transition-colors font-light" type="text"/>
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-theme-text-subtle mb-2">Email Address</label>
                <input className="w-full bg-transparent border-b border-theme-border-strong pb-2 text-theme-text focus:outline-none focus:border-primary transition-colors font-light" type="email"/>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-theme-text-subtle mb-2">Project Details</label>
                <textarea className="w-full bg-transparent border-b border-theme-border-strong pb-2 text-theme-text focus:outline-none focus:border-primary transition-colors font-light resize-none" rows={3}></textarea>
              </div>
              <button className="w-full py-4 bg-primary/10 border border-primary text-primary uppercase tracking-[0.2em] text-sm hover:bg-primary hover:text-theme-text transition-all duration-300 mt-8" type="button">
                Request Consultation
              </button>
            </form>
          </div>
          <div className="w-full md:w-7/12 h-[80vh] grid grid-cols-2 gap-4">
            <div className="bg-cover bg-center rounded-sm" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=60&w=800')" }}></div>
            <div className="grid grid-rows-2 gap-4">
              <div className="bg-cover bg-center rounded-sm" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?auto=format&fit=crop&q=60&w=800')" }}></div>
              <div className="bg-theme-surface p-8 flex flex-col justify-center rounded-sm">
                <h4 className="font-display text-4xl mb-4">Global Reach</h4>
                <p className="text-theme-text-subtle text-sm font-light">From the French Riviera to the California coastline, our architectural integrations define the world's most exclusive private estates.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Outdoor;
