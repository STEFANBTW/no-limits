import React from 'react';

const Study = () => {
  return (
    <div className="bg-[#1a1614] text-theme-text font-['Manrope'] min-h-screen antialiased selection:bg-[#d44211]/30 selection:text-theme-text overflow-x-hidden">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root">
        {/* Hero Section */}
        <section 
          className="relative h-screen w-full flex items-center justify-center overflow-hidden" 
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
            style={{
              backgroundImage: "linear-gradient(rgba(26, 22, 20, 0.7) 0%, rgba(26, 22, 20, 0.8) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBgCFF6QotzVwvqbPGbV27bN6aA2PejPiWlLkbYZxaBH5DYqk3NatravYe_YcB52ys4bL0tjiRmSSJS7nBqg58kVvlLzidpdasJyr7o2GHKtw2E7ag_aTgpi1I9l6GLNytU_u9ptmvIAhE7dpjykinPnWPh834wVdBB-Avx0cyHgK3ovRJSF6771fQtXLdbeq2XMDj7-QgHtZTfbchR2z1GID-BnyuiBUhAm1DSrn65xTRN1qWvs7GC_HiSd_rP_Bw4URcwgGqIQp8')"
            }}
          ></div>
          <div className="relative z-10 text-center flex flex-col items-center gap-6 max-w-4xl px-10">
            <div className="inline-flex items-center gap-4 mb-2">
              <span className="w-12 h-[1px] bg-white/40"></span>
              <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] text-white/80 font-medium">The Executive Collection</h2>
              <span className="w-12 h-[1px] bg-white/40"></span>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight text-white drop-shadow-2xl font-['Playfair_Display']">
              Commanding Presence
            </h1>
            <p className="text-lg md:text-2xl font-light max-w-3xl mt-4 text-white/90 drop-shadow-md italic leading-relaxed">
              Where profound decisions are made. A sanctuary of focus, crafted from ancient walnut, burnished brass, and quiet, unyielding design.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-6">
              <button className="bg-[#d44211] text-white px-12 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#d44211]/90 transition-all duration-300 shadow-2xl hover:shadow-[#d44211]/20 hover:-translate-y-1">
                Explore the Study
              </button>
            </div>
          </div>
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/80 flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.2em]">Scroll to discover</span>
            <span className="material-symbols-outlined animate-bounce">keyboard_arrow_down</span>
          </div>
        </section>

        {/* Section 2: The Power of Stillness */}
        <section className="py-32 md:py-48 px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            <div className="flex-1 space-y-8 lg:pr-12">
              <span className="text-[#d44211] uppercase tracking-widest text-sm font-bold">Chapter I</span>
              <h2 className="text-4xl md:text-6xl font-light tracking-tight text-white leading-[1.1] font-['Playfair_Display']">The Power of <br/><span className="italic">Stillness</span></h2>
              <p className="text-lg md:text-xl text-theme-text-muted font-light leading-relaxed">Designed for absolute focus and refined comfort, our executive environments are tailored to those who shape the world from within their private sanctums. Every surface is an invitation to deep work.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 py-8 border-y border-white/5">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-[#d44211] font-['Playfair_Display']">Leather Artifacts</h3>
                  <p className="text-theme-text-subtle text-sm">Hand-stitched leather surfaces that age with a unique patina.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-[#d44211] font-['Playfair_Display']">Ergonomic Mastery</h3>
                  <p className="text-theme-text-subtle text-sm">Precision-engineered lumbar support for sustained focus.</p>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full grid grid-cols-2 gap-4 md:gap-8">
              <div className="space-y-4 md:space-y-8 mt-12 lg:mt-24">
                <div className="w-full aspect-[4/5] bg-cover bg-center rounded-xl shadow-2xl border border-white/5" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDmqvr-vhWJR-vFcn0YfD8ItTnARePU5ufgSBuo6K3MDFFKNzUpX9yXKpzLuqlZxV5IubJyA8d3jF65RGCiVI5hDHmnHe0IpvErNq-lEso4zC8uufwPc07Tj9aj1owPWyqQ7x7DKqP0clYf5sFDZHJIbxm4wMnHXzz6ODrartBRL18rBmiyvnGhFJlgzg_toX2BwvRC4Sh2c8vkKYiToC3m-rm6dr6mVTaxEplXN0zKs7H9sgS_zqFw8Jx5FvEziN701V8vXR5Wvko')"}}></div>
                <div className="w-full aspect-square bg-cover bg-center rounded-xl shadow-xl border border-white/5" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA3uh5MyFeoqYCQ12nUMRMhX6eBHRQE9HyUmhuuGVxQdCD1gReeXpPm7IoiUnhKSoknvsWhGFEJv51MH-QSvxaB2auZkO1NqAIDumwpktvQiQJIS2xCjVrmvXpRpSX9JW7H0mSnMAldsyIIfvb9uyMEHrKTVu5SVV3UbsCKULw1qHu-D3s4LvFBVEuS2ttnQZ9sE37pF_fYCMYrzDYMHLbovso97wTD0E1Xv9FLMI36VBfnfUSE5m7LVFMQKUvksueiQzaX5QdYNUc')"}}></div>
              </div>
              <div className="space-y-4 md:space-y-8">
                <div className="w-full aspect-square bg-cover bg-center rounded-xl shadow-xl border border-white/5" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCtvHFzH3Uyjo1jfnBJV7TI2k0wZYH_ST6y-LIIa4zwmeHJcmO5kdDQfJREhbPEaBHeRLrCwgHnXKTttDxgzWWQTC6b2YPWIm9FGE18pOmZQtp7ljFYWT-mnOqkei3rX5qFGIbphm2KlHuo6g-IMyGb-U-PK1nyhgRk0kZEctRj4bhpfF6-IaYs0W0tdNTEAupMRc_zC3EYa5xNfd0_XbIyee_SrOn-Gpq0zwmDIGY1XV2B2cvQu3tXs3jJtWRazU-wJhEKyGjpE38')"}}></div>
                <div className="w-full aspect-[4/5] bg-white/5 backdrop-blur-sm rounded-xl flex items-center justify-center p-8 lg:p-12 text-center border border-white/10">
                  <div className="space-y-6">
                    <span className="material-symbols-outlined text-[#d44211] text-4xl">menu_book</span>
                    <p className="text-xl md:text-2xl text-white font-light italic leading-relaxed font-['Playfair_Display']">"Architecture is the learned game, correct and magnificent, of forms assembled in the light."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Shop the Room with Hotspots */}
        <section className="relative h-screen w-full bg-[#1a1614] overflow-hidden group">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 bg-fixed" 
            style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDRPLICUP0OKuPLz2K4GJ5GpI-0tsV_pQzZUk7JPjnVYUOB3IvGob6vqInZs2BUbGP_xxSGPH5SwtMYTBKJAPpFTU8zNtjBllZZ_rXZo4-eipmVHZOnUnbwjWLoHNhYYHuOYR05ZNYmWmd0NkRTgrZejB0XhhyHlYyZXb-VvEbRPQKZnjEjCaXWo13WU6R8DCSfMeVPrpSehyOMLhDeiOuvz0Rn78CKUx1w9ofeuVS4CaLg8Vp1vsHK5d6UVLV_qeUqiedM3ddZFFM')"}}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1614] via-transparent to-[#1a1614]/80"></div>
          
          <div className="absolute top-24 left-12 md:left-24 z-20">
            <span className="text-[#d44211] uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Interactive Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-black text-white font-['Playfair_Display'] mb-4">Shop the Room</h2>
            <p className="text-theme-text-muted max-w-sm font-light">Interact with the elements that define this curated environment. Hover over the markers to explore the collection.</p>
          </div>

          {/* Hotspots */}
          <div className="absolute top-[55%] left-[45%] shop-hotspot z-30">
            <div className="w-4 h-4 rounded-full bg-[#d44211] hotspot-glow cursor-pointer border border-white/40"></div>
            <div className="product-popover absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 bg-[#231f1d]/95 backdrop-blur-xl border border-[#d44211]/20 p-5 rounded-lg opacity-0 invisible transition-all duration-500 translate-y-2">
              <img alt="Live Edge Desk" className="w-full h-32 object-cover rounded mb-4 shadow-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAF9mN55PkdUtoxxCCU1hR7sn3w7CiZcT3t_2Wsg3K69qXM6e4qHsILzt_bnMKO3EvhHGKdAFEpH-F636t-6zpZL8J4kVmm3qGjZv7nUoVlsTS8ugv4ERlgb_QOqmpDkB-CiU7ZZRWQunWuKpzmUUET4uX43Xle2s2z1JtNVWWnLpWKPJUm9dbwF2Uw41ZqqJ1BHd0S5VBM-7-i2KfYq4A41zSxVS_jlGezwv6upzWdMw6DaSDrM0zMcgNwMzAO233nGk9VsWx1CLo" referrerPolicy="no-referrer" loading="lazy"/>
              <h4 className="text-white font-bold font-['Playfair_Display'] mb-1 text-lg">Live-Edge Walnut Desk</h4>
              <p className="text-[#d44211] font-bold mb-3">$14,500</p>
              <button className="w-full py-2 bg-[#d44211]/10 hover:bg-[#d44211] text-[#d44211] hover:text-white border border-[#d44211]/30 text-xs font-bold uppercase tracking-widest transition-all rounded">Inquire Now</button>
            </div>
          </div>

          <div className="absolute top-[65%] left-[30%] shop-hotspot z-30">
            <div className="w-4 h-4 rounded-full bg-[#d44211] hotspot-glow cursor-pointer border border-white/40"></div>
            <div className="product-popover absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 bg-[#231f1d]/95 backdrop-blur-xl border border-[#d44211]/20 p-5 rounded-lg opacity-0 invisible transition-all duration-500 translate-y-2">
              <img alt="Executive Chair" className="w-full h-32 object-cover rounded mb-4 shadow-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0INc1gcDUvzL5XslZIQno7zTqxBWSGKZmVPzDVIls_cyS1BFBfEjzJkmsZXvb1_OMQ17DVGFXtg9VztrZ5rjw_fMpkN-2T9oi6Z6PdrcwGyzNy81t7HjKBOz9NjUTr82ns7FugHZwxjYIDLYyQbI0Zb5zUiST4IB_qQZ6QMg3em-E5rneEf6SIhiyUo32agNRV7mDED_vn0F_oj9j6vMBeiI0T9JY51rxwVB-QREwAfUEGyULWjdudfzwm4UrTfwwXoBVkzuVgts" referrerPolicy="no-referrer" loading="lazy"/>
              <h4 className="text-white font-bold font-['Playfair_Display'] mb-1 text-lg">The Commander Chair</h4>
              <p className="text-[#d44211] font-bold mb-3">$4,200</p>
              <button className="w-full py-2 bg-[#d44211]/10 hover:bg-[#d44211] text-[#d44211] hover:text-white border border-[#d44211]/30 text-xs font-bold uppercase tracking-widest transition-all rounded">Inquire Now</button>
            </div>
          </div>

          <div className="absolute top-[40%] left-[75%] shop-hotspot z-30">
            <div className="w-4 h-4 rounded-full bg-[#d44211] hotspot-glow cursor-pointer border border-white/40"></div>
            <div className="product-popover absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-[#231f1d]/95 backdrop-blur-xl border border-[#d44211]/20 p-5 rounded-lg opacity-0 invisible transition-all duration-500 -translate-y-2">
              <img alt="Floor Lamp" className="w-full h-32 object-cover rounded mb-4 shadow-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuATJ7TLpJcvkhfJN-Eq42AWAFlwbxQ0BLZ7jYTALD8131s4GEXFiTzOrw8BDMnEiYU9zFUuM4pFqmV_-tQVmFjxCjmHgf9VEojxRYTHt2RXSSizjlXpZvFgN0qoNWCgxvQ6CamOd3Z7P-wJqoH6Fh_4f6lahFPV0jNGTutRX1jycMWaaAK7o1s9Hgoz6BNAkqHVkpTi1oGZ-KoseozJTn1rLBZltxRG0KawemD6qXX11Zda0FqwXDlYfkq9fIS0p8cYflcGdawU06o" referrerPolicy="no-referrer" loading="lazy"/>
              <h4 className="text-white font-bold font-['Playfair_Display'] mb-1 text-lg">Articulated Brass Lamp</h4>
              <p className="text-[#d44211] font-bold mb-3">$1,850</p>
              <button className="w-full py-2 bg-[#d44211]/10 hover:bg-[#d44211] text-[#d44211] hover:text-white border border-[#d44211]/30 text-xs font-bold uppercase tracking-widest transition-all rounded">Inquire Now</button>
            </div>
          </div>
        </section>

        {/* Section 4: Curated Knowledge */}
        <section className="relative h-[150vh] w-full bg-[#231f1d] flex flex-col justify-center items-center py-40 overflow-hidden">
          <div className="absolute inset-0 z-0 bg-cover bg-center opacity-30" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDZpBedQeFyfLGvACUIG7_ehcRhgYB1H7zMyAxiDo6BGlZnN8PeUxCeijZL46QMvRuF3x4FWVEYy8VmrulKLoMrp9ipVQXDSvJFdtbcZKzPrOA-ZboNqBiEXO921BwityrmSeGfai4_0TbTCihEa7aNFKk0WdCa90RytYYKCnpVs-6E4qjgLo_RtPYrIoMvj6hlwDvThy9TPNTADTQ4WAT9BS5a6l4xtAjpbqQOyhK60lJrcUap8V4RQL3Qweym6jxwDdRlP58Doys')", backgroundAttachment: "fixed"}}></div>
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#1a1614] via-transparent to-[#1a1614]"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center px-10 max-w-4xl gap-8">
            <span className="material-symbols-outlined text-5xl text-[#d44211] mb-2">auto_stories</span>
            <h2 className="text-5xl md:text-7xl font-black leading-tight tracking-[-0.02em] font-['Playfair_Display'] text-white">Curated <br/><span className="italic text-[#d44211]">Knowledge</span></h2>
            <p className="text-xl text-theme-text-muted max-w-2xl font-light">Floor-to-ceiling modular shelving integrated flawlessly into the architecture of the room. A lifelong archive for your most treasured volumes.</p>
          </div>

          <div className="relative z-10 w-full max-w-[1440px] mx-auto px-10 mt-32 grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: 'architecture', title: 'Modular Framework', desc: 'Customizable units designed to adapt to your growing collection, featuring magnetic joinery.' },
              { icon: 'hardware', title: 'The Brass Ladder', desc: 'Engineered with precision bearings and solid brass rails for silent, effortless movement.', offset: 'md:translate-y-12' },
              { icon: 'lightbulb', title: 'Integrated Illumination', desc: 'Concealed LED strips wash the spines of your library in perfect, glare-free warm light.' }
            ].map((item, idx) => (
              <div key={idx} className={`bg-[#1a1614]/80 backdrop-blur-xl p-10 rounded-2xl border border-white/5 flex flex-col gap-6 group hover:border-[#d44211]/30 transition-all duration-500 shadow-2xl ${item.offset || ''}`}>
                <span className="material-symbols-outlined text-4xl text-[#d44211] group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                <h3 className="text-3xl font-bold font-['Playfair_Display'] text-white">{item.title}</h3>
                <p className="text-theme-text-subtle leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Materiality & Focus */}
        <section className="py-32 md:py-48 px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto text-center">
            <div className="max-w-3xl mx-auto mb-20">
              <span className="text-[#d44211] uppercase tracking-widest text-sm font-bold mb-4 block">Chapter II</span>
              <h2 className="text-4xl md:text-6xl font-light tracking-tight text-white mb-6 font-['Playfair_Display']">Materiality & <span className="italic">Focus</span></h2>
              <p className="text-lg md:text-xl text-theme-text-muted font-light leading-relaxed">An obsession with texture. We select materials not just for their aesthetic appeal, but for their tactile feedback and how they develop a unique history over time.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: 'Aged Walnut', desc: 'Sustainably sourced and finished with natural oils for a deep, living grain.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZpBedQeFyfLGvACUIG7_ehcRhgYB1H7zMyAxiDo6BGlZnN8PeUxCeijZL46QMvRuF3x4FWVEYy8VmrulKLoMrp9ipVQXDSvJFdtbcZKzPrOA-ZboNqBiEXO921BwityrmSeGfai4_0TbTCihEa7aNFKk0WdCa90RytYYKCnpVs-6E4qjgLo_RtPYrIoMvj6hlwDvThy9TPNTADTQ4WAT9BS5a6l4xtAjpbqQOyhK60lJrcUap8V4RQL3Qweym6jxwDdRlP58Doys' },
                { title: 'Burnished Brass', desc: 'Custom-cast hardware providing a warm, tactile metallic contrast.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATJ7TLpJcvkhfJN-Eq42AWAFlwbxQ0BLZ7jYTALD8131s4GEXFiTzOrw8BDMnEiYU9zFUuM4pFqmV_-tQVmFjxCjmHgf9VEojxRYTHt2RXSSizjlXpZvFgN0qoNWCgxvQ6CamOd3Z7P-wJqoH6Fh_4f6lahFPV0jNGTutRX1jycMWaaAK7o1s9Hgoz6BNAkqHVkpTi1oGZ-KoseozJTn1rLBZltxRG0KawemD6qXX11Zda0FqwXDlYfkq9fIS0p8cYflcGdawU06o', offset: 'md:mt-12' },
                { title: 'Textured Linen', desc: 'Acoustically dampening wall coverings ensuring a silent, focused atmosphere.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ5pHOiz2_S31nItJ-t4VzAIlIh-NOJdXQrzAV-mNuTC9PHnnch4lyLIgMLTMiLlk0Y2vosOAM1qGHUwTqDyuLuydLUQz2X_22Suu5nZjcRXPRTqgzkIzl35f_3F7IvT4HMH2DAZYtjndOOdyQgvsrpAL-2-jALa1KirNbatw5yX_pZmIUn8911R9L_mRFI2UW5CyypqXo_KNkscmYr6SDfHMqlv9RuT1FAQFHAvTVQlSYoJun0cRioZqvI5fLYYy6d3kN27gmRDo', offset: 'md:mt-24' }
              ].map((item, idx) => (
                <div key={idx} className={`group cursor-pointer ${item.offset || ''}`}>
                  <div className="overflow-hidden rounded-2xl mb-8 aspect-[4/5] shadow-2xl border border-white/5">
                    <div className="w-full h-full bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-110" style={{backgroundImage: `url('${item.img}')`}}></div>
                  </div>
                  <h3 className="text-3xl font-light text-white mb-3 font-['Playfair_Display']">{item.title}</h3>
                  <p className="text-theme-text-subtle font-light leading-relaxed px-4">{item.desc}</p>
                </div>
              ))}
            </div>
        </section>

        {/* Section 6: The Private Gallery */}
        <section className="relative py-48 bg-[#110e0d] overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row items-center gap-24">
            <div className="lg:w-1/2 space-y-12">
              <div className="space-y-4">
                <span className="text-[#d44211] uppercase tracking-widest text-sm font-bold">Chapter III</span>
                <h2 className="text-5xl md:text-7xl font-light tracking-tight text-white font-['Playfair_Display']">The Private <br/><span className="italic">Gallery</span></h2>
              </div>
              <p className="text-xl text-theme-text-muted font-light leading-relaxed italic">
                "A sanctuary within a sanctuary. The seating area features twin velvet club chairs facing a minimalist marble fireplace, designed for the exchange of grand ideas."
              </p>
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <span className="material-symbols-outlined text-[#d44211] text-3xl">check_circle</span>
                  <div>
                    <h4 className="text-2xl font-light text-white mb-2 font-['Playfair_Display']">Midnight Velvet Club Chairs</h4>
                    <p className="text-theme-text-muted font-light">Deep, encompassing comfort upholstered in heritage-grade textile.</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <span className="material-symbols-outlined text-[#d44211] text-3xl">check_circle</span>
                  <div>
                    <h4 className="text-2xl font-light text-white mb-2 font-['Playfair_Display']">Monolithic Hearth</h4>
                    <p className="text-theme-text-muted font-light">A seamless slab of Nero Marquina marble framing the subtle, warm light.</p>
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-2 text-[#d44211] font-bold hover:text-white transition-colors uppercase tracking-[0.2em] text-xs pb-2 border-b border-[#d44211]/30">
                View Seating Collection <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] border border-white/5 group">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[3000ms] group-hover:scale-105" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB0INc1gcDUvzL5XslZIQno7zTqxBWSGKZmVPzDVIls_cyS1BFBfEjzJkmsZXvb1_OMQ17DVGFXtg9VztrZ5rjw_fMpkN-2T9oi6Z6PdrcwGyzNy81t7HjKBOz9NjUTr82ns7FugHZwxjYIDLYyQbI0Zb5zUiST4IB_qQZ6QMg3em-E5rneEf6SIhiyUo32agNRV7mDED_vn0F_oj9j6vMBeiI0T9JY51rxwVB-QREwAfUEGyULWjdudfzwm4UrTfwwXoBVkzuVgts')"}}></div>
                <div className="absolute inset-8 border border-white/10 rounded-2xl pointer-events-none transition-opacity duration-500 group-hover:opacity-40"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#110e0d] via-transparent to-transparent opacity-60"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-32 bg-[#1a1614] border-t border-white/5 text-center px-6">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-8 font-['Playfair_Display']">Commission Your Study</h2>
            <p className="text-lg text-theme-text-muted mb-12 max-w-xl mx-auto font-light">Collaborate with our master craftsmen to create an environment that reflects your legacy.</p>
            <button className="bg-[#d44211] text-white px-12 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#d44211]/90 transition-all duration-300 shadow-2xl hover:shadow-[#d44211]/20 hover:-translate-y-1">
              Request Consultation
            </button>
        </section>
      </div>

      <style>{`
        .serif-font { font-family: 'Playfair Display', serif; }
        .hotspot-glow {
            box-shadow: 0 0 20px rgba(212, 66, 17, 0.4);
            animation: pulse 3s infinite ease-in-out;
        }
        @keyframes pulse {
            0% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.3); opacity: 1; }
            100% { transform: scale(1); opacity: 0.6; }
        }
        .shop-hotspot:hover .product-popover {
            opacity: 1;
            visibility: visible;
            transform: translate(-50%, 0);
        }
        .product-popover {
            filter: drop-shadow(0 25px 50px rgba(0,0,0,0.5));
        }
      `}</style>
    </div>
  );
};

export default Study;
