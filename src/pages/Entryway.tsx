import React from 'react';
import CollectionSpotlight from '../components/CollectionSpotlight';
import StartDialogueForm from '../components/StartDialogueForm';

const Entryway = () => {
  return (
    <div className="bg-stone-950 text-stone-200 font-sans antialiased overflow-x-hidden selection:bg-stone-800 selection:text-stone-100">
      {/* Main Content Container for Long Scroll */}
      <main className="relative w-full">
        {/* Section 1: Cinematic Hero (0-100vh) */}
        <section className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              className="w-full h-full object-cover opacity-80" 
              alt="cinematic shot of a grand luxury foyer" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuALUueKxnFu0hQrpbuqJIDK1hXs2yil-0O96fdk2V2wXyIYrVrmdYbaSaI0PRuHY1TB7bP9a09oP-ctci6gvvEwzoWKcwbQKEaFewzT8xfPM6iq3q35V1JNenlF4o2kQl9uFWnZzz_43bIBJ1oxq70x-uZQbwyD12DD3lphzomVRikiseikiWir98pB4v58MkpEWRhAbIKhnEtbSCjyR_OIDtcWO2HWhwHZs4HGLSaPsjO7uKf7S7oIjHJfmDITdMUsva9Ac35QDb0" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-stone-950/20 via-transparent to-stone-950/40"></div>
          </div>
          <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-4xl mt-24 flex flex-col items-center -translate-x-0.5 md:translate-x-0">
            <h2 className="text-stone-400 font-sans uppercase tracking-[0.4em] text-[10px] md:text-sm mb-6 text-center">The Threshold of Elegance</h2>
            <h1 className="font-serif italic text-6xl sm:text-7xl md:text-9xl font-light text-stone-100 leading-none mb-8 text-center balance-text">
              The Grand Entryway<br/><span className="text-stone-400">&amp; Foyer</span>
            </h1>
            <p className="font-sans font-light text-stone-300 text-[15px] sm:text-lg md:text-xl max-w-2xl leading-relaxed text-center">
              The prelude to the estate. A curated space where architectural scale meets intimate detail, defining the first breath of the interior narrative.
            </p>
            <div className="mt-16 flex flex-col items-center gap-4 animate-bounce">
              <span className="text-stone-500 font-sans text-[10px] tracking-widest uppercase">Descend</span>
              <span className="material-symbols-outlined text-stone-500 text-lg">arrow_downward</span>
            </div>
          </div>
        </section>

        {/* Section 2: The First Impression (100-200vh) */}
        <section className="relative w-full min-h-screen flex items-center bg-stone-950 px-8 py-24">
          <div className="max-w-[1512px] w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
            <div className="col-span-1 md:col-span-6 flex flex-col justify-center h-full px-4 md:px-12 lg:px-20 text-center md:text-left">
              <span className="text-stone-500 font-sans uppercase tracking-[0.3em] text-xs mb-8 block">Chapter I</span>
              <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-light text-stone-100 mb-8 leading-tight">The First<br/>Impression</h2>
              <p className="font-sans font-light text-stone-400 text-lg leading-relaxed mb-12 max-w-xl mx-auto md:mx-0">
                Mirrors that capture the shifting light of the day, paired with seating that offers a momentary pause. The entryway is not merely a passage, but an arrival. Every texture, from cold marble to warm patinated bronze, is deliberately chosen to ground the visitor.
              </p>
              <div className="flex justify-center md:justify-start">
                <a className="inline-flex items-center gap-4 text-stone-200 font-sans uppercase tracking-[0.2em] text-sm group" href="#">
                  <span className="border-b border-stone-700 pb-1 group-hover:border-stone-300 transition-colors">Explore Collections</span>
                  <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_right_alt</span>
                </a>
              </div>
            </div>
            <div className="col-span-1 md:col-span-6 h-[716px] relative">
              <div className="absolute right-0 top-0 w-[80%] h-full">
                <img 
                  className="w-full h-full object-cover rounded-sm" 
                  alt="massive antique brass framed mirror" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSSalUoDgWLVoHjYQNBQ0NyR-0iucdT6J-LUJgUvkARrwwhZ6-K7PZQVnOKsK6e05ltQnq1TxDxC_Ul9ss041xBlbh2QKqR8v1QjuIIBIaelSz2Rjiv8uGt-g9X23Vme2g8L36xlSEMBHLlWpSiiRNfHN0CMSUhxI59MQhVtfCy_tBnvFRRLXQLZ0_FoTJ_1VuI0nnP_npNfYCdtY8bR87gQ_YD8ismEP20xWBHIQxn2pMLAWAeC8PanJLDT5FHxbOuSazCIZdcAo" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute left-0 bottom-12 w-[40%] h-[50%] z-10 shadow-2xl">
                <img 
                  className="w-full h-full object-cover rounded-sm" 
                  alt="custom sculpted bronze chair" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9W0UWJlzV1LTyhi_bsuhQNaIZUme9ofcSnWOlYuX_Es1HDJCkL3auCOl27abYGEtWIH6BPlo0RH0Qaax_ujaSAdtaMOkCH9Wr8Zyaz7W2jDrH1GDXyFXHgZHavmWTE4fE1QL-5tFZ5bT7e09HkJ4Yg6DjI8qEupeS6DjSGJRD4M_N7Zc6GZGNqhlP_5fKeRvx_iEwY8skMBAE7Y04nflZ8NkYGwV1YMj42h56mUANL7uYXZZiIYWi_V-3NXj4Yj2nWfdXqV7zMSI" 
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Architectural Framing (200-300vh) */}
        <section className="relative w-full min-h-screen flex items-center bg-stone-900 px-8 py-24 overflow-hidden">
          <div className="max-w-[1512px] w-full mx-auto relative h-full flex flex-col justify-center">
            <div className="absolute top-12 left-12 z-20">
              <span className="text-stone-500 font-sans uppercase tracking-[0.3em] text-xs mb-4 block">Chapter II</span>
              <h2 className="font-['Playfair_Display'] text-4xl text-stone-100">Architectural<br/><span className="italic text-stone-400">Framing</span></h2>
            </div>
            <div className="relative w-full h-[768px] mt-12 flex justify-center items-center group">
              <img 
                className="w-full h-full object-cover opacity-80" 
                alt="sweeping dark wood staircase" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKZkBM0oJMUJrTduTuL3EeEj-B4Os9yzisgrxCGUYPPSJg7PipKSOFDdaQFLE_PiZgXyExNDeEUEI6EFpGz3xm7glDw2JkGCsoK1umZlc5AH0Pq98ysNeRBHPQzv9JENLHqcqggGAycOhR8L-w8lt0XRxsbJSKAkjKXGO9mvuBDFTM_TSfIEuhqfzfYt34WBPnSzEnITFkBiiyj-2BEKYFwa23QMYcmIeN3hC1rEBxLcp8mO0PxETEpRWYicjymdo5-1QAnd7gq50" 
                referrerPolicy="no-referrer"
              />
              {/* Hotspots */}
              <div className="absolute top-[30%] left-[45%] group cursor-pointer">
                <div className="w-4 h-4 bg-stone-100 rounded-full animate-pulse shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
                <div className="absolute top-6 left-6 w-64 bg-stone-950/90 backdrop-blur border border-stone-800 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="font-['Playfair_Display'] text-stone-200 text-lg mb-1">Luminaire Cascades</h4>
                  <p className="font-sans text-stone-500 text-xs">Custom blown glass and patinated brass suspension lighting.</p>
                </div>
              </div>
              <div className="absolute bottom-[20%] right-[30%] group cursor-pointer">
                <div className="w-4 h-4 bg-stone-100 rounded-full animate-pulse shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
                <div className="absolute bottom-6 right-6 w-64 bg-stone-950/90 backdrop-blur border border-stone-800 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="font-['Playfair_Display'] text-stone-200 text-lg mb-1">Monolithic Console</h4>
                  <p className="font-sans text-stone-500 text-xs">Carved from a single block of Nero Marquina marble.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Global Entryways Gallery (300-400vh) */}
        <section className="relative w-full min-h-screen flex flex-col justify-center bg-stone-950 px-8 py-24">
          <div className="max-w-[1512px] w-full mx-auto">
            <div className="text-center mb-16">
              <span className="text-stone-500 font-sans uppercase tracking-[0.3em] text-xs mb-4 block">Chapter III</span>
              <h2 className="font-['Playfair_Display'] text-4xl text-stone-100">Global Entryways</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[665px]">
              {/* Large Feature */}
              <div className="col-span-1 md:col-span-2 md:row-span-2 relative group overflow-hidden bg-stone-900 min-h-[400px]">
                <img 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
                  alt="Milan apartment foyer" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCED85tp6dcQw6cgHx9RFI2crDBuzR7v0RWwEIWp6R7vkzBENPcDGjiXsc9_yW0ovuwep2izuVcGfyhY8XRKXqHdK2NxxLyOMfCvb0QL8njgSL8dRnpIpa9pcE2tDjmVskKg5IWHGB-rPXnRH2foliiYVdaoYDXqsr6iGk-Nr0yQZ7Uyk3LADMES-Q9jnvyKomottcPRpzEeVrrVJI8qa7doEJj2oL0bEXpWvA4cyeJRoiEF9EX3BZiyLIUoThlMdw6wBXruizLyVM" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-stone-950 to-transparent">
                  <p className="font-sans text-stone-400 text-xs tracking-[0.2em] uppercase mb-2">Milan</p>
                  <h3 className="font-['Playfair_Display'] text-2xl text-stone-200">The Brutalist Foyer</h3>
                </div>
              </div>
              {/* Top Right */}
              <div className="col-span-1 md:col-span-2 md:row-span-1 relative group overflow-hidden bg-stone-900 min-h-[250px]">
                <img 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
                  alt="London townhouse entrance" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGjVNMd_8dKII3ZsyWF1z_DpcuHg3UE1bQYUjuHbg6DGneTEAoY45m-wv6rDaf_4_aDy7cQZYJy_6EiPjs-Icua8I2sKQ4IeSvBMHXJnjZK_EbD9y6XH6r8mWNa-T88IpNFWVaC_T_mQMRg44905wc1OeBQ9yaDm4fb0DLdKwI8U4mm3Ec4Q6diYpHIqLaT37UhxAZSFo9081p27_D8z6OR6buTVMzNAggKbU64lzhNH2xQrfvrT9anm-goNjbn2SYxk0KD4z-_Ts" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-stone-950 to-transparent">
                  <p className="font-sans text-stone-400 text-xs tracking-[0.2em] uppercase mb-1">London</p>
                  <h3 className="font-['Playfair_Display'] text-xl text-stone-200">Classic Revival</h3>
                </div>
              </div>
              {/* Bottom Middle */}
              <div className="col-span-1 md:col-span-1 md:row-span-1 relative group overflow-hidden bg-stone-900 min-h-[250px]">
                <img 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
                  alt="Kyoto zen entryway" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCC2F7LvagQdqmyuPgBOp7s9XgPy_kCe79fscv7PT2yLNsGBVXsx-jTPQ-MQXqWG2huzVoH7g34-CNUndEPnjZOPXM1s7AiO2e2CoyJYVRu3p8d8A6pBw_YC7cUBWRgmdeRJdtOZiMuWYtEFu0HNmIYTm_4GfmeiJSYUBCyzaSc6ANaXR2vJ81gXcgZq62taqXchzgrAE4Varim3gVQBGR2CUR67V5c6EELDgkueMqBpSupP8CK9q9zuRGVZLIc_h4xiaB4-87UyZU" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-stone-950 to-transparent">
                  <p className="font-sans text-stone-400 text-xs tracking-[0.2em] uppercase mb-1">Kyoto</p>
                  <h3 className="font-['Playfair_Display'] text-lg text-stone-200">Shadow &amp; Light</h3>
                </div>
              </div>
              {/* Bottom Right */}
              <div className="col-span-1 md:col-span-1 md:row-span-1 relative group overflow-hidden bg-stone-900 min-h-[250px]">
                <img 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
                  alt="New York apartment entrance" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpQ4UQEdf2kNHU_WLl6NVj0yMkhZfxZupNrDFAthtlcYBXGBaD04FaQBjLcbe-4eQ2Yg58d8XW17IXQL4MF3Hn35NRKEFFX9BT6YL6-u6gGrRAC_WV-b3irL8EWcwjc1UphCPocdFZhyShkv8prgaOAdvP3tDdL-7RkLXwJ2RXXdru6ggnJuczAS45bz6aTeoTwO663w_qmgqonJdr80sW7kbfWV_zeVrl7GJSsSED2ynA6YNXq81ryY3E40UQv6K6IpzWC27PB5o" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-stone-950 to-transparent">
                  <p className="font-sans text-stone-400 text-xs tracking-[0.2em] uppercase mb-1">New York</p>
                  <h3 className="font-['Playfair_Display'] text-lg text-stone-200">Deco Noir</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Bespoke Commission & Footer (400-500vh) */}
        <CollectionSpotlight collectionName="Entryway" />
        <StartDialogueForm />

        <section className="relative w-full flex flex-col justify-between bg-stone-900 border-t border-stone-800">
          {/* Footer */}
          <footer className="w-full py-24 border-t border-stone-900 bg-stone-950">
            <div className="flex flex-col items-center gap-12 max-w-7xl mx-auto px-8">
              <div className="text-xl font-['Playfair_Display'] tracking-[0.2em] text-stone-300 uppercase">HERITAGE</div>
              <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                <a className="font-['Playfair_Display'] italic text-sm tracking-widest text-stone-600 hover:text-stone-300 transition-colors duration-300" href="#">The Collection</a>
                <a className="font-['Playfair_Display'] italic text-sm tracking-widest text-stone-600 hover:text-stone-300 transition-colors duration-300" href="#">Sustainability</a>
                <a className="font-['Playfair_Display'] italic text-sm tracking-widest text-stone-600 hover:text-stone-300 transition-colors duration-300" href="#">Private Atelier</a>
                <a className="font-['Playfair_Display'] italic text-sm tracking-widest text-stone-600 hover:text-stone-300 transition-colors duration-300" href="#">Press</a>
                <a className="font-['Playfair_Display'] italic text-sm tracking-widest text-stone-600 hover:text-stone-300 transition-colors duration-300" href="#">Contact</a>
              </div>
              <div className="font-['Playfair_Display'] italic text-sm tracking-widest text-stone-400 text-center">
                © 2024 No Limits Furniture. Crafted for the Exceptional.
              </div>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
};

export default Entryway;

