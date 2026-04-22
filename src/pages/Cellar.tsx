import React from 'react';
import CollectionSpotlight from '../components/CollectionSpotlight';
import StartDialogueForm from '../components/StartDialogueForm';

const Cellar = () => {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-[#221013] font-['Epilogue'] text-theme-text selection:bg-[#d41132]/30">
      <div className="layout-container flex h-full grow flex-col">
        <main className="flex-1 w-full">
          {/* Hero Section */}
          <section className="min-h-[100dvh] flex flex-col justify-center px-4 md:px-10 lg:px-40 py-10">
            <div className="max-w-[1200px] mx-auto w-full @container">
              <div 
                className="flex min-h-[85dvh] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-4 md:p-10 relative overflow-hidden" 
                data-alt="Dark subterranean wine cellar with stone table" 
                style={{backgroundImage: "linear-gradient(rgba(34, 16, 19, 0.6) 0%, rgba(34, 16, 19, 0.8) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDRPLICUP0OKuPLz2K4GJ5GpI-0tsV_pQzZUk7JPjnVYUOB3IvGob6vqInZs2BUbGP_xxSGPH5SwtMYTBKJAPpFTU8zNtjBllZZ_rXZo4-eipmVHZOnUnbwjWLoHNhYYHuOYR05ZNYmWmd0NkRTgrZejB0XhhyHlYyZXb-VvEbRPQKZnjEjCaXWo13WU6R8DCSfMeVPrpSehyOMLhDeiOuvz0Rn78CKUx1w9ofeuVS4CaLg8Vp1vsHK5d6UVLV_qeUqiedM3ddZFFM')"}}
              >
                <div className="flex flex-col gap-4 text-center max-w-3xl z-10">
                  <h1 className="text-theme-text text-7xl md:text-9xl lg:text-[140px] font-serif italic leading-none tracking-tight">
                    The Connoisseur's <br/> Cellar
                  </h1>
                  <p className="text-theme-text-muted/90 text-lg md:text-xl font-normal leading-relaxed max-w-xl mx-auto italic">
                    Curated heritage pieces for the ultimate subterranean tasting room. Where legacy meets lifestyle in deep oak and aged stone.
                  </p>
                </div>
                <button className="z-10 mt-8 flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 md:h-14 md:px-8 bg-[#d41132] text-white text-base md:text-lg font-bold leading-normal tracking-[0.015em] hover:bg-[#d41132]/90 transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-[#d41132]/20">
                  <span className="truncate">Explore the Cellar</span>
                </button>
              </div>
            </div>
          </section>
          
          {/* Section 2: The Vintage Archive */}
          <section className="py-20 px-4 md:px-10 lg:px-40 bg-[#141615]/30">
            <div className="max-w-[1200px] mx-auto w-full">
              <div className="flex items-center gap-4 mb-10">
                <span className="material-symbols-outlined text-[#d41132] text-3xl">shelves</span>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-[-0.015em]">The Vintage Archive</h2>
              </div>
              <p className="text-lg text-theme-text-subtle mb-12 max-w-2xl">Custom climate-controlled racking systems designed to showcase and preserve your rarest bottles with architectural grace.</p>
              
              <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar">
                {[
                  { title: 'Climate-Controlled Racking', label: 'Custom mahogany systems', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAF9mN55PkdUtoxxCCU1hR7sn3w7CiZcT3t_2Wsg3K69qXM6e4qHsILzt_bnMKO3EvhHGKdAFEpH-F636t-6zpZL8J4kVmm3qGjZv7nUoVlsTS8ugv4ERlgb_QOqmpDkB-CiU7ZZRWQunWuKpzmUUET4uX43Xle2s2z1JtNVWWnLpWKPJUm9dbwF2Uw41ZqqJ1BHd0S5VBM-7-i2KfYq4A41zSxVS_jlGezwv6upzWdMw6DaSDrM0zMcgNwMzAO233nGk9VsWx1CLo' },
                  { title: 'Display Archways', label: 'Architectural stone details', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgCFF6QotzVwvqbPGbV27bN6aA2PejPiWlLkbYZxaBH5DYqk3NatravYe_YcB52ys4bL0tjiRmSSJS7nBqg58kVvlLzidpdasJyr7o2GHKtw2E7ag_aTgpi1I9l6GLNytU_u9ptmvIAhE7dpjykinPnWPh834wVdBB-Avx0cyHgK3ovRJSF6771fQtXLdbeq2XMDj7-QgHtZTfbchR2z1GID-BnyuiBUhAm1DSrn65xTRN1qWvs7GC_HiSd_rP_Bw4URcwgGqIQp8' },
                  { title: 'Reserve Collection Shelving', label: 'Secure rare bottle storage', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATXz9pZondOPEp7glMZqLwkLKCzFCM6r3Rt56Z571iDlNdiRo1G89l74UKtBFNe4u3RIY_POpfUBbEyHQVK16rQBt7m1dKroWos2MT-VtGi5RQdBO0XtjhACaoNuoPMfp8E41A6yQ2IteLHK5Wz1MKzJnXk8uEdzj921iOsj8fyS5sy7IJj_HAi9AOwIO8uKPFjdNIA4Wuax5gcdxH0RrTMKKNDiz27xaq11JeTrcrySKZIlBg1TCcj9jGMSYU3VEuHMgp2mkbP08' },
                  { title: 'Magnum Cradle', label: 'Highlighting exceptional formats', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCB4WdLr4fWaAwk5nMwPi7gDQezorqxKRd3GOsxQ3Agx4QmlRr-k2C0pgxXvQ6kvj0W0q1hql5eD4Y_xWAf6m_Dd6crduWUEoT1XKmrkhIC_7KY0B5ITOGCpYJMR7INuCxQAT2Vb_989vs_QgK3nw6XqmCfcegHiic4Gf9dsAXjsycVctswWqJ5Pd0wver2-JLuBMjo6JWMVegx2c_qkjGrOvGOKEZvENiZCJYy-u-3I7gMglt4kNjhg_5ABFao5kj72OVOvV2ec-U' }
                ].map((item, idx) => (
                  <div key={idx} className="flex-none w-[85vw] md:w-[400px] snap-center flex flex-col gap-4 group">
                    <div 
                      className="w-full aspect-[4/5] bg-center bg-no-repeat bg-cover rounded-xl overflow-hidden relative" 
                      style={{backgroundImage: `url('${item.img}')`}}
                    >
                      <div className="absolute inset-0 bg-[#221013]/20 group-hover:bg-transparent transition-colors duration-500"></div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold leading-normal mb-1">{item.title}</h3>
                      <p className="text-[#d41132] text-sm font-medium leading-normal uppercase tracking-wider">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 3: Sensory Design */}
          <section className="py-24 px-4 md:px-10 lg:px-40">
            <div className="max-w-[1200px] mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="flex items-center gap-4 mb-6">
                  <span className="material-symbols-outlined text-[#d41132] text-3xl">chair</span>
                  <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-[-0.015em]">Sensory Design</h2>
                </div>
                <h3 className="text-2xl font-medium mb-4">The Tasting Chair</h3>
                <p className="text-lg text-theme-text-subtle mb-6 leading-relaxed">
                  Experience the perfect pour in our signature low-slung leather tasting chair. Designed not just for comfort, but to position you perfectly within the acoustics of a stone-walled room, allowing the subtle notes of conversation and decanting to resonate beautifully.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    'Premium hand-stitched saddle leather',
                    'Ergonomic pitch for relaxed tasting posture',
                    'Acoustically dampening solid oak frame'
                  ].map((text, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#d41132]">check_circle</span>
                      <span className="text-theme-text-muted">{text}</span>
                    </li>
                  ))}
                </ul>
                <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-[#d41132]/10 text-[#d41132] border border-[#d41132]/30 text-base font-bold leading-normal hover:bg-[#d41132]/20 transition-colors">
                  View Seating Collection
                </button>
              </div>
              <div 
                className="order-1 md:order-2 h-[500px] md:h-[700px] rounded-xl overflow-hidden relative shadow-2xl" 
                style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB0INc1gcDUvzL5XslZIQno7zTqxBWSGKZmVPzDVIls_cyS1BFBfEjzJkmsZXvb1_OMQ17DVGFXtg9VztrZ5rjw_fMpkN-2T9oi6Z6PdrcwGyzNy81t7HjKBOz9NjUTr82ns7FugHZwxjYIDLYyQbI0Zb5zUiST4IB_qQZ6QMg3em-E5rneEf6SIhiyUo32agNRV7mDED_vn0F_oj9j6vMBeiI0T9JY51rxwVB-QREwAfUEGyULWjdudfzwm4UrTfwwXoBVkzuVgts')", backgroundSize: "cover", backgroundPosition: "center"}}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#221013]/80 via-transparent to-transparent flex items-end p-8">
                  <p className="text-white text-lg font-medium tracking-wide">Deep Burgandy Leather Finish</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Crafting the Social Hour */}
          <section className="py-24 px-4 md:px-10 lg:px-40 bg-[#141615]/30">
            <div className="max-w-[1200px] mx-auto w-full">
              <div className="text-center mb-16">
                <span className="material-symbols-outlined text-[#d41132] text-4xl mb-4">groups</span>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-[-0.015em] mb-4">Crafting the Social Hour</h2>
                <p className="text-lg text-theme-text-subtle max-w-2xl mx-auto">Where collections are shared and memories are decanted. Our integrated bar cabinets are the focal point of subterranean gatherings.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
                <div 
                  className="md:col-span-8 rounded-xl overflow-hidden relative group h-[400px] md:h-full border border-theme-border" 
                  style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDmqvr-vhWJR-vFcn0YfD8ItTnARePU5ufgSBuo6K3MDFFKNzUpX9yXKpzLuqlZxV5IubJyA8d3jF65RGCiVI5hDHmnHe0IpvErNq-lEso4zC8uufwPc07Tj9aj1owPWyqQ7x7DKqP0clYf5sFDZHJIbxm4wMnHXzz6ODrartBRL18rBmiyvnGhFJlgzg_toX2BwvRC4Sh2c8vkKYiToC3m-rm6dr6mVTaxEplXN0zKs7H9sgS_zqFw8Jx5FvEziN701V8vXR5Wvko')", backgroundSize: "cover", backgroundPosition: "center"}}
                >
                  <div className="absolute inset-0 bg-[#221013]/40 group-hover:bg-[#221013]/20 transition-colors duration-500"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-white text-2xl font-bold mb-2">The Sommelier's Island</h3>
                    <p className="text-theme-text-muted">Central tasting station with integrated chilling.</p>
                  </div>
                </div>
                <div className="md:col-span-4 flex flex-col gap-6 h-[600px] md:h-full">
                  <div 
                    className="flex-1 rounded-xl overflow-hidden relative group border border-theme-border" 
                    style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA3uh5MyFeoqYCQ12nUMRMhX6eBHRQE9HyUmhuuGVxQdCD1gReeXpPm7IoiUnhKSoknvsWhGFEJv51MH-QSvxaB2auZkO1NqAIDumwpktvQiQJIS2xCjVrmvXpRpSX9JW7H0mSnMAldsyIIfvb9uyMEHrKTVu5SVV3UbsCKULw1qHu-D3s4LvFBVEuS2ttnQZ9sE37pF_fYCMYrzDYMHLbovso97wTD0E1Xv9FLMI36VBfnfUSE5m7LVFMQKUvksueiQzaX5QdYNUc')", backgroundSize: "cover", backgroundPosition: "center"}}
                  >
                    <div className="absolute inset-0 bg-[#221013]/40 group-hover:bg-[#221013]/20 transition-colors duration-500"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white text-xl font-bold">Glassware Integration</h3>
                    </div>
                  </div>
                  <div 
                    className="flex-1 rounded-xl overflow-hidden relative group border border-theme-border" 
                    style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCtvHFzH3Uyjo1jfnBJV7TI2k0wZYH_ST6y-LIIa4zwmeHJcmO5kdDQfJREhbPEaBHeRLrCwgHnXKTttDxgzWWQTC6b2YPWIm9FGE18pOmZQtp7ljFYWT-mnOqkei3rX5qFGIbphm2KlHuo6g-IMyGb-U-PK1nyhgRk0kZEctRj4bhpfF6-IaYs0W0tdNTEAupMRc_zC3EYa5xNfd0_XbIyee_SrOn-Gpq0zwmDIGY1XV2B2cvQu3tXs3jJtWRazU-wJhEKyGjpE38')", backgroundSize: "cover", backgroundPosition: "center"}}
                  >
                    <div className="absolute inset-0 bg-[#221013]/40 group-hover:bg-[#221013]/20 transition-colors duration-500"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white text-xl font-bold">The Art of the Pour</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: The Collector's Detail */}
          <section className="py-24 px-4 md:px-10 lg:px-40">
            <div className="max-w-[1200px] mx-auto w-full">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <span className="material-symbols-outlined text-[#d41132] text-3xl">handyman</span>
                    <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-[-0.015em]">The Collector's Detail</h2>
                  </div>
                  <p className="text-lg text-theme-text-subtle">Masterful craftsmanship in every joint and gauge.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: 'Dovetail Joinery', desc: 'Traditional hand-cut joints ensuring centuries of stability in humid environments.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcLysHP30iRshDyrXB_pjxroIXVzhQZgY9dxwiK9-3O-UO1_A0QLTchL6-kkqyXkrc0rB1iLdF_hgh-R3yl5wjIdhNwD2hINEO9Swg6ObpfuwzOb6fnBAopGz50O3vFdyeGZcqTqWAfPJJJVNDaklgwcdt30DWIoao0TBE7e5SRKY69UMsOfJklpT_P6CrP0kbyJD0AjPIHl7xFZtxyKp_WOlHLINigWdSVV4NCw9-VXnddnNK2jchx71nvwcnfkOAaeoRXFAB1LQ', offset: '' },
                  { title: 'Brass Instrumentation', desc: 'Analog hygrometers and thermometers housed in aged brass bezels.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATJ7TLpJcvkhfJN-Eq42AWAFlwbxQ0BLZ7jYTALD8131s4GEXFiTzOrw8BDMnEiYU9zFUuM4pFqmV_-tQVmFjxCjmHgf9VEojxRYTHt2RXSSizjlXpZvFgN0qoNWCgxvQ6CamOd3Z7P-wJqoH6Fh_4f6lahFPV0jNGTutRX1jycMWaaAK7o1s9Hgoz6BNAkqHVkpTi1oGZ-KoseozJTn1rLBZltxRG0KawemD6qXX11Zda0FqwXDlYfkq9fIS0p8cYflcGdawU06o', offset: 'md:mt-12' },
                  { title: 'Signature Oak Finish', desc: 'Deep, penetrating stains that highlight the natural grain while protecting the wood.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZpBedQeFyfLGvACUIG7_ehcRhgYB1H7zMyAxiDo6BGlZnN8PeUxCeijZL46QMvRuF3x4FWVEYy8VmrulKLoMrp9ipVQXDSvJFdtbcZKzPrOA-ZboNqBiEXO921BwityrmSeGfai4_0TbTCihEa7aNFKk0WdCa90RytYYKCnpVs-6E4qjgLo_RtPYrIoMvj6hlwDvThy9TPNTADTQ4WAT9BS5a6l4xtAjpbqQOyhK60lJrcUap8V4RQL3Qweym6jxwDdRlP58Doys', offset: 'md:mt-24' }
                ].map((item, idx) => (
                  <div key={idx} className={`flex flex-col gap-4 ${item.offset}`}>
                    <div 
                      className="w-full aspect-square rounded-xl overflow-hidden border border-theme-border" 
                      style={{backgroundImage: `url('${item.img}')`, backgroundSize: "cover", backgroundPosition: "center"}}
                    ></div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-theme-text-subtle text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>

      <CollectionSpotlight collectionName="Cellar" />
      <StartDialogueForm />

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Cellar;
