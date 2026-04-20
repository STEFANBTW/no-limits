import React from 'react';
import { motion, useInView } from 'motion/react';

interface HighlightTextProps {
  text: string;
  active: boolean;
}

const HighlightText: React.FC<HighlightTextProps> = ({ text, active }) => (
  <motion.p
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: active ? 1 : 0, y: active ? 0 : 10 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className={`text-xl md:text-2xl font-light text-white leading-relaxed italic absolute inset-0 transition-opacity duration-500 ${active ? 'z-10' : 'z-0'}`}
  >
    {text}
  </motion.p>
);

interface DetailItemProps {
  item: any;
  onInView: () => void;
}

const DetailItem: React.FC<DetailItemProps> = ({ item, onInView }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { amount: 0.6, margin: "-10% 0px -10% 0px" });

  React.useEffect(() => {
    if (isInView) {
      onInView();
    }
  }, [isInView, onInView]);

  return (
    <div ref={ref} className="flex flex-col gap-8 group">
      <div className="w-full aspect-[4/5] bg-cover bg-center rounded-xl shadow-lg overflow-hidden relative border border-white/5" style={{backgroundImage: `url('${item.img}')`}}>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
      </div>
      <div className="space-y-4">
        <span className="text-[#d48311] font-bold uppercase tracking-[0.2em] text-[10px]">{item.focus}</span>
        <h3 className="text-2xl md:text-3xl font-light text-white">{item.title}</h3>
        <p className="text-theme-text-muted font-light leading-relaxed text-lg">{item.desc}</p>
      </div>
    </div>
  );
};

const Sanctuary = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const dressingItems = [
    { 
      title: 'Velvet-Lined Protection', 
      desc: 'Luxurious soft-close cabinetry protects your most treasured pieces in individual, velvet-lined compartments.', 
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAfyNRgf36LwmqqTSWDkenAzmKKmbRuw_pxZw8M7dmp15gKO_2JBnfcW4H0QABLdNdLczix3qZ5NIOZK4hAknyiUS_CvgS4S-A9M_O9LAM2EPnmYC1SPkGbkTfq5kYAizBoXc8rhmpzyqLqGKBtJcfU9O8ulZOADwKJrEU7HdQkMHCafXsh6XhedHRy6_iHZLzp4mfEfmz1sVWy33JAVOjR0ED5lCFHzS6ZuQTVNh3WbMAvwCapeZfGA7PmFKsy64p5HxZyONUWlY',
      focus: 'Seamless Integration',
      highlight: 'Every drawer glides with a silent, fluid motion, preserving the peace of your morning.'
    },
    { 
      title: 'Illuminated Display', 
      desc: 'Integrated warm lighting under glass countertops creates a boutique-like experience within your own private quarters.', 
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVoZOu5DlUbzOcSlyQpgoC1JdDiASBPlfIu-Aha4TY8ZInpRNBF3el4oRjDlcqB9BEkz_E5TnO7VGEV0v-zfHjme3nSrVSZxl0gYRezCMK8cEUIBwQHCm6y-ew_vI8AyqjLOJoNPC7UqHQtxGs9MWjD5J1d2L1YxZoet32-Jr2ePOHf9jt_iN9TXfqEEKtPJMuecBSHggo-0A4fdLo5OlNkhZEmxxOVP57925liyg3HWaksLUoKOdNT0UvSV06snUiJoFKxm1dOXM',
      focus: 'Ambient Precision',
      highlight: 'Warm lighting highlights the subtle textures of your collection with museum-grade accuracy.'
    },
    { 
      title: 'Architectural Millwork', 
      desc: 'Floor-to-ceiling custom cabinetry crafted from sustainably sourced oak, finished with a subtle alabaster wash.', 
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_x0jFtGhefMdMVr5NsoJFGs1y1txnRdiYZMGw0X6P2k0ivipy8xWmsUbnUlDak-CsSVlGd_LQCSoSwVhAwVMjYUdDV1VUt5iKNL5Ca2AuE35_i8S0NuZi77Usv1PIrSB8VTcO_mdZ0Slh6G1BlQ6jdQqVjVoompgj7DVD39QFwrgSrSpkRuRL8C15A_r32YcUy55yR84Phi_V022gSsK4fEviVBY9teDxAd5bwmopa6tWGUhqq9CvJn2m38t5AzdPSkul0j7PnGQ',
      focus: 'Signature Craft',
      highlight: 'Generations of craftsmanship embedded in every joint and surface finish.'
    }
  ];

  return (
    <div className="bg-[#221a10] text-theme-text font-['Manrope'] min-h-screen antialiased selection:bg-[#d48311]/30 selection:text-theme-text overflow-x-hidden">
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          data-alt="High-key silk-canopied bed facing floor-to-ceiling windows overlooking a misty forest" 
          style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC8nki41Ej6evPLu1jyL4FmTy51SsLR7LFYxXMQnpFgRyCmPSuz9_7WvY_I41oBqtXgm4ypZ9NDmOdwq3c8pNv3fHHOrI7TGI8dGqx-9bPaiMEutdfQDLwWi0yeltU-lD3CsArx0xmB4_KqbNwf4zAGQ9gvS58PcGxjiM_VX-nLvmCV36aQfai-Q4LP-UXlz4K9VsMkoM8qFyKzymXfgN6rOhfPTxVmzahd9SjvlJPhGRt5uYiLpMPuaju2w7M_uQEpObBGUdDYrLo')"}}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#221a10]"></div>
        </div>
        <div className="relative z-10 text-center flex flex-col items-center gap-6 max-w-4xl px-6 mt-20">
          <div className="flex items-center gap-4 mb-2">
            <span className="w-12 h-[1px] bg-white/60"></span>
            <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] text-white/80 font-medium">Master Suite Collection</h2>
            <span className="w-12 h-[1px] bg-white/60"></span>
          </div>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tighter leading-none text-white drop-shadow-2xl">The Sanctuary</h1>
          <p className="text-lg md:text-2xl font-light max-w-2xl mt-6 text-white/90 drop-shadow-md italic">A haven of tranquility wrapped in linen and alabaster, designed for the ultimate restorative experience.</p>
          <button className="mt-12 bg-[#d48311]/90 backdrop-blur-md text-white px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#d48311] transition-all duration-300 shadow-2xl hover:shadow-[#d48311]/20 hover:-translate-y-1">Explore the Suite</button>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/80 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll to discover</span>
          <span className="material-symbols-outlined animate-bounce">keyboard_arrow_down</span>
        </div>
      </section>

      {/* Chapter I: The Art of the Morning */}
      <section className="py-32 md:py-48 px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          <div className="flex-1 space-y-8 lg:pr-12">
            <span className="text-[#d48311] uppercase tracking-widest text-sm font-bold">Chapter I</span>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight text-white leading-[1.1]">The Art of <br/>the Morning</h2>
            <p className="text-lg md:text-xl text-theme-text-muted font-light leading-relaxed">Begin your day bathed in soft, natural light. Every detail, from the bespoke vanity to the dedicated coffee alcove, is crafted to elevate your morning rituals into moments of pure serenity.</p>
            <div className="pt-8">
              <button className="flex items-center gap-3 text-white border-b border-white pb-1 hover:text-[#d48311] hover:border-[#d48311] transition-colors uppercase tracking-widest text-sm font-medium">
                View Morning Amenities <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
          <div className="flex-1 w-full grid grid-cols-2 gap-4 md:gap-8">
            <div className="space-y-4 md:space-y-8 mt-12 lg:mt-24">
              <div className="w-full aspect-[4/5] bg-cover bg-center rounded-xl shadow-2xl border border-white/5" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAEislmHL-VjnvmehsOB7l0zM5IIRmCXaqWmMC_7m0nuniLu--BZHvE7GamEknJQTZ64_r_CWLYyb5Vd10zoIQjF49rslsp7J9Kh0rL-kEvX1zGzvU3HN06nKL140iXJtt_mSC3fPSehXdKnmWEtk92QkiRIwFYo4yWvzGEnjVWvTTN4V4gK5DOUsjdlICQMKy84ZbOD2zIxLQ4we1PMbgermXdekdXeR8WaNtyVyAfe_EE3mV1QwkNHjA8J6-8VX2c7LBiBY3e78U')"}}></div>
              <div className="w-full aspect-square bg-cover bg-center rounded-xl shadow-xl border border-white/5" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB0d--CDBkYNtB4S184fOpQGM2R4dd5t4as9gQ3sFGn_c-FU6bW6HZ1EW-Jc6DUVPI13Bi6OeERyIziPMtVFK-OzlVs-BYt5-qDYEtXpghAV81TC2cBZwguOT1KzTEK1IwKZ2N29ix9ZE0bJtf_A-h89uQBaNeKol_C3QBTddZCYrSduog8NwbijlrB-ig9o1WFCxnzecpE3GUKv-y-Ga9k_bPuKgiX6JTYTUtFFJS8n_MKPUjftlPh_6h7NyxsqXeX3mcgg23-_W4')"}}></div>
            </div>
            <div className="space-y-4 md:space-y-8">
              <div className="w-full aspect-square bg-cover bg-center rounded-xl shadow-xl border border-white/5" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBJ5pHOiz2_S31nItJ-t4VzAIlIh-NOJdXQrzAV-mNuTC9PHnnch4lyLIgMLTMiLlk0Y2vosOAM1qGHUwTqDyuLuydLUQz2X_22Suu5nZjcRXPRTqgzkIzl35f_3F7IvT4HMH2DAZYtjndOOdyQgvsrpAL-2-jALa1KirNbatw5yX_pZmIUn8911R9L_mRFI2UW5CyypqXo_KNkscmYr6SDfHMqlv9RuT1FAQFHAvTVQlSYoJun0cRioZqvI5fLYYy6d3kN27gmRDo')"}}></div>
              <div className="w-full aspect-[4/5] bg-white/5 backdrop-blur-sm rounded-xl flex items-center justify-center p-8 lg:p-12 text-center border border-white/10">
                <div className="space-y-6">
                  <span className="material-symbols-outlined text-[#d48311] text-4xl">wb_sunny</span>
                  <p className="text-xl md:text-2xl text-white font-light italic leading-relaxed">"A quiet corner for contemplation before the world awakens."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter II: The Dressing Suite */}
      <section className="bg-white/5 backdrop-blur-sm py-48 md:py-64 relative border-y border-white/5 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-32 md:mb-48">
            <span className="text-[#d48311] uppercase tracking-[0.3em] text-[10px] font-bold mb-6 block">Chapter II</span>
            <h2 className="text-5xl md:text-7xl font-light tracking-tight text-white mb-8">The Dressing Suite</h2>
            <p className="text-lg md:text-xl text-theme-text-muted font-light leading-relaxed">An expansive sanctuary dedicated to your wardrobe. Featuring a central island with glass tops to showcase bespoke accessories, and velvet-lined drawers that glide with a silent touch.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32 items-start relative pb-32">
            {/* Left Column: Sticky Image and Fading Highlights */}
            <div className="lg:sticky lg:top-32 h-fit mb-24 lg:mb-0">
              <div className="space-y-16">
                <div 
                  className="w-full aspect-[4/3] md:aspect-[16/10] bg-cover bg-center rounded-2xl shadow-2xl relative overflow-hidden border border-white/10" 
                  style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCUAD3aVAOQMrMsNYZ1bgm0CVWrCT_Egm2Aa7ebP50cwcTJAD6cfsePqkeMtRbXnJEcrIYtmLu_zrnbSTTWwSjHLcpJ-CN1NdwPoI_4vU68yAYn4NKetjVz-BwXVWHfzswsGsSqXGFYFTD1kj1o_tOw-T9RJLt_kCcTrLXcr8jGS1jlme5VDqWs_FOWIww5L5aTgNgBN_DOOlFDF08aFEvvtsZ2tVspciH6dHAou8Zg5EQzbyHhfoEDvjFArg7TbqrtiDvzlNq95VU')"}}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-10 left-10">
                    <p className="text-xs uppercase tracking-[0.2em] font-medium text-white/60 mb-2">Master Dressing</p>
                    <p className="text-3xl font-light text-white">The Central Island</p>
                  </div>
                </div>
                
                {/* Fading Highlights Area */}
                <div className="min-h-[160px] relative px-4">
                  <p className="text-[#d48311] font-bold uppercase tracking-[0.4em] text-[9px] mb-8 border-b border-[#d48311]/20 pb-2 w-fit">Technical Highlights</p>
                  <div className="relative h-32">
                    {dressingItems.map((item, idx) => (
                      <HighlightText key={idx} text={item.highlight} active={activeIndex === idx} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Scrolling details */}
            <div className="space-y-64 lg:pb-64">
              {dressingItems.map((item, idx) => (
                <DetailItem key={idx} item={item} onInView={() => setActiveIndex(idx)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Chapter III: Tactile Comfort */}
      <section className="py-32 md:py-48 px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-2xl">
            <span className="text-[#d48311] uppercase tracking-widest text-sm font-bold mb-4 block">Chapter III</span>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight text-white mb-6">Tactile Comfort</h2>
            <p className="text-lg md:text-xl text-theme-text-muted font-light leading-relaxed">Experience the profound difference of heritage materials. We source only the finest Mongolian cashmere, high-thread-count Egyptian cotton linens, and sustainably harvested woods.</p>
          </div>
          <button className="flex items-center gap-2 text-[#d48311] font-bold hover:text-[#d48311]/80 transition-colors uppercase tracking-widest text-sm pb-2 border-b border-[#d48311]/30">
            Material Library <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center md:text-left">
          {[
            { title: '1000-Thread Linens', desc: 'Crisp, breathable, and woven for exceptional longevity and comfort.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkwHr7Db3SyhDVR-qejmPU6ebGYWgPn3GBMnF_7cZ0cXcAskob0q9FvuLBRNcResKgfvXCavfdcWgP4nzDi8Yzpxuo54iPHBgYH8All-6G-BJ7igkAON1JilX3Y9aFbVpJdWBKZ_5wvlgscHTQ_Xfcg6PktSFi23HrA7AxlcYPwqPLvjBAo6FppYwMUn51EAExq7geB9Asdzc_kNLPI09O2qSfR9j_KNoh2ft7Yv35ClXz3o6WWUP5lzEXkVPPnsTpo2-svjM10M0', offset: '' },
            { title: 'Mongolian Cashmere', desc: 'Unrivaled softness and warmth for evening relaxation and tactile indulgence.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTRWB8ri2dENpiSswUL7PXRwIqgZAooN_3BGNsEy9FI7xRPeLYaiCrLeCWwhpvn-XrfOwD0N1vqegBMhNCzGfr4PqeQ3FaTfxcNYQfaAXec5T70uABothFIX01jp7Eliu8X89JZvcjbnstfT2Vt8Q0juwNv8q8XUgbBvs6eBhkxyuNlLyKK0ja9NNxM6WhjqwBX0dLc65wEkjzNBvQnpUH03M8YaUV8zUd40k04pRJKfomVlrYBfKGvJABnchQCISjqXgSY9G1Zzg', offset: 'md:mt-16' },
            { title: 'Master Woodwork', desc: 'Hand-finished surfaces with seamless, soft-close mechanics and hidden joints.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfKhKfubgsGSut7DtLipVk5NjR8PG2L3GNEp6EFNlqWjPe9znRUa9Iz2gbOwbyECdRhsC7501Rzew_nrQLSuk6aU4jAxz9TiE8WcKI3vO6UYqR0jmT9aXzlzMghhEOO7cHaVSX5lbzAcbBzakxehS61lTrHjC2WLrbQ4R95QGllyRhso4YzjxhVIgj9kVq-Sp9n2QMwOOoZpvwk_kOeM7pYy1f32-7hoNBcUi5gAaEgr1pvif9oAa_UiouSgaJI7pIXQNAwzTIErc', offset: 'md:mt-32' }
          ].map((item, idx) => (
            <div key={idx} className={`group cursor-pointer ${item.offset}`}>
              <div className="overflow-hidden rounded-xl mb-6 aspect-square shadow-md border border-white/5">
                <div className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{backgroundImage: `url('${item.img}')`}}></div>
              </div>
              <h3 className="text-2xl font-light text-white mb-2">{item.title}</h3>
              <p className="text-theme-text-subtle font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Chapter IV: Evening Rituals */}
      <section className="relative min-h-screen flex items-center bg-[#110e0a]">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAyUJnq4i2KyMVhEHiuMFkHwGO5rVwccKCGbu0INsTOBHWNevbJJXr6a6c_NXiEl8WYtw38gpPHpyjtF6htcdLq9VyKGhzSUIbBt52GQHa284hJjNCHvk9h1bBLz4BD0S5wWOtQcj2gpm04SBp8nfOI_9T3Snpx-Mk_UWV3ARd6tnxm4px_CkymPsN1z_OYQdFfkQS6_P_nGieV8KOm76qzkkAdHqOThNWFzafKSXIfKC-o0oGrEeTg2IHyKFaJowi-Nh6brR4Qnnk')"}}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#110e0a] via-[#110e0a]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-[#110e0a]/40 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 py-32 flex flex-col items-center text-center">
          <span className="text-[#d48311] uppercase tracking-widest text-sm font-bold mb-8">Chapter IV</span>
          <span className="material-symbols-outlined text-5xl md:text-6xl text-[#d48311]/80 mb-6 drop-shadow-[0_0_15px_rgba(212,131,17,0.5)]">nights_stay</span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-white mb-8">Evening Rituals</h2>
          <p className="text-xl md:text-2xl text-white/70 font-light max-w-3xl leading-relaxed mb-16 italic">As daylight fades, the suite transforms. Integrated, warm ambient lighting softly illuminates from the architectural bed frame, creating a cocoon of comfort designed to gently guide you toward restful sleep.</p>
          <div className="flex flex-col sm:flex-row gap-6">
            <button className="bg-[#d48311] hover:bg-white hover:text-slate-900 text-white px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(212,131,17,0.3)]">Commission a Suite</button>
            <button className="bg-transparent border border-white/30 text-white hover:bg-white/10 px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest transition-colors">Download Lookbook</button>
          </div>
        </div>
      </section>
      <style>{`
        html { scroll-behavior: smooth; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Sanctuary;
