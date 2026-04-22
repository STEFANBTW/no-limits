import React from 'react';
import CollectionSpotlight from '../components/CollectionSpotlight';
import StartDialogueForm from '../components/StartDialogueForm';

const Wellness = () => {
  return (
    <div className="bg-stone-950 text-stone-200 antialiased font-['Public_Sans'] overflow-x-hidden">
      <main className="w-full relative">
        {/* Section 1: Hero */}
        <section className="min-h-[100dvh] w-full relative flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <img 
              alt="Luxurious restorative spa environment" 
              className="w-full h-full object-cover object-center opacity-60" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAguI-dpjwiVGIGttp6Xeje2Xc3lYRiGteQtVqyAT-XIvwY7EJUJ8-6bkSQpaN7xrjyUrLKFBj17GUThmPe5ZieU3GHHvCtwiiA13ojbQOOZgYyvDaRQjZn5_Un_bA1Rxu0BcfbCYS9JaJlK3bt7ldh7QCWJLjRrMJt-J-iH_D7iy3EgkLvJK6zqgaKblfyr91W6FEhZed7AR3wXJFmEsh8mQ9QoatJxe8Q7w3Hybugx-x46vCgF84HM_Lj1QSIS-iftJC8wmcZXhM" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-stone-950/20 to-stone-950"></div>
          </div>
          <div className="relative z-10 text-center px-8 max-w-5xl mx-auto flex flex-col items-center">
            <span className="font-['Playfair_Display'] italic text-stone-400 tracking-widest mb-6 block text-lg">A Sanctuary of Senses</span>
            <h1 className="font-serif italic text-7xl md:text-9xl lg:text-[140px] text-stone-100 font-light tracking-tight mb-8 leading-none">The Wellness Suite</h1>
            <div className="w-px h-32 bg-stone-700 mt-12 opacity-50"></div>
          </div>
        </section>

        {/* Section 2: Restorative Materials */}
        <section className="min-h-screen w-full bg-stone-950 relative flex items-center py-32 px-8 md:px-16 lg:px-24">
          <div className="max-w-7xl mx-auto w-full">
            <div className="mb-24 md:w-1/2">
              <h2 className="font-['Playfair_Display'] text-4xl md:text-6xl text-stone-100 font-light mb-6">Restorative Materials</h2>
              <p className="text-stone-400 font-light text-lg md:text-xl leading-relaxed max-w-xl">Curated elements forged by nature, refined for resilience. Every surface is an invitation to tactile tranquility.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-auto md:h-[614px]">
              {/* Material 1 */}
              <div className="relative group overflow-hidden h-[400px] md:h-full flex flex-col justify-end p-8 bg-stone-900/50">
                <img 
                  alt="Macro shot of dark teak wood" 
                  className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-60" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCW041SIa_YlhlczvGGGHhau0Vbk_pL3uemMm0SBPxI4_x9UBSjfFhBPSPOwzCJ2Vkbc_95FnHcbaeRMBMwuwfaCpRTueQvCV-6cSwcDw8whT0hbgfgeVWWd7GbP1v4L_SdzB0tmKb10sR1S5MToxvYIuQn0WJLdzHepWLn3dBBNyCLEnxWHBrEQA2FueSVu-6gTPaQK6UGZQI4Ny46iWSk38_dINJC496pfuq0VZj7HgAXVp5TKWSg76E1HVPTBz1xtheUNPBHYxM" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent"></div>
                <div className="relative z-10">
                  <h3 className="font-['Playfair_Display'] text-2xl text-stone-200 mb-2">Waterproof Teak</h3>
                  <p className="text-stone-500 text-sm font-light leading-relaxed">Responsibly sourced heartwood, naturally resistant to moisture and imbued with warmth.</p>
                </div>
              </div>
              {/* Material 2 */}
              <div className="relative group overflow-hidden h-[400px] md:h-full flex flex-col justify-end p-8 bg-stone-900/50 md:-translate-y-12">
                <img 
                  alt="Honed dark basalt stone" 
                  className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-60" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIYvelEtfpVSZUqAP0iEl2Zm6qh3d0c6GM5k4p7fxM0n82-heIb1MFJ4z1f_wg49ySVTpj_tOQWfp0Tzctzr5UfekskfFTDVUt2PY0oh_iCu38HDrMQnHD2avo1_DxToKh_p5osUmEGoCciRgKiB70ZSDlAZdbeec74Ee4uG2m2G2wf4UEh95N2T9qEG4hS8ZiFMFkEkcgvj01XzM3j079In734364eYlWiSESlB5VB6h0aUxyVQ-RaeqC61yfCfaYtZHNkCUbxYc" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent"></div>
                <div className="relative z-10">
                  <h3 className="font-['Playfair_Display'] text-2xl text-stone-200 mb-2">Honed Basalt</h3>
                  <p className="text-stone-500 text-sm font-light leading-relaxed">Volcanic stone finished to a matte silk texture, grounding the space with thermal mass.</p>
                </div>
              </div>
              {/* Material 3 */}
              <div className="relative group overflow-hidden h-[400px] md:h-full flex flex-col justify-end p-8 bg-stone-900/50">
                <img 
                  alt="Deep charcoal linen textile" 
                  className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-60" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaCBHjWyfq26w968gkZQSmP7S7RTmniH4mkhjHdT4arIzDj-cCWiz5GaVya1FQ2Kx4IUeBwDxiudl7c04Wlr6ZxX12uWfKaW_oEocjYGCyLQUhHG44zCWV9DQ0jwtnsY60otSuzemkPMmoUSH9_nHH2VStIYsmfCRFRRdDKexjSSkuPaHwg856qZA_WPAf-5JTItmm-yX_YLVbPktyag9a5sdBXG9zOLMoITCmwlByBqCvJRPa4gTAnzhoIYU5zu3M2baxPMlDyKE" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent"></div>
                <div className="relative z-10">
                  <h3 className="font-['Playfair_Display'] text-2xl text-stone-200 mb-2">Breathable Linen</h3>
                  <p className="text-stone-500 text-sm font-light leading-relaxed">Heavyweight organic textiles designed to perform in humid microclimates without compromise.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Integrated Repose */}
        <section className="min-h-screen w-full relative flex items-center justify-center py-32 overflow-hidden bg-stone-900">
          <div className="absolute inset-0 z-0">
            <img 
              alt="Minimalist steam room" 
              className="w-full h-[120%] object-cover object-center opacity-40 -translate-y-[10%]" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyum_QLBEJAdMWX9-YjSzroBnrg4ZpyfoSjr1TU9yeZ5xmSOl1O7b8K3wfX1gLEfmU6Ezc8NHKUDu9eIsMuyvFEi9moVUfF1e3NS4pBvPGuVPbiII-_30IIJxDridkcAGoMmkbaCYC2WeTsJKy8V_54OnkkipZafArRpOvT3gkDGSTwm_NvUDHX8CTRr4oJP_nMmZxo96WMa67FT09oQPgX4bCxew4MtDYyMPEut3HkmxWqPlDFqXNVntUtfjITIYDHZlQthW-lxA" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-stone-950/60"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <img 
                alt="Sculptural lounge chair" 
                className="w-full h-auto aspect-[4/5] object-cover rounded-sm shadow-2xl opacity-80 border border-stone-800" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjdODjUaQsFyjphBbTUo6SVP6EubdYiOPd-YhmJbEBkJiBhxsgSPl7nRP-LA70YvKs9DNlk2S13CFVDROGNYFXgaV1wr_R4GuOWjN3qyPRCsPBBaYe_6WG65j9qh6hclfLYmWbDx7v7tzx2uDnavifMBXAoVOzNMYqozrCkfcc7RCMhDJ3JgtqWQAeNnsX8ba0MnyrQsfdBXfyIRo8w46sAqnPxMC7QIO4hrV6IxxEE61tcUW_GR4lcJlMFm6GgED5LRZ3aEa980c" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="order-1 md:order-2 pl-0 md:pl-12">
              <span className="font-['Playfair_Display'] italic text-stone-500 tracking-widest mb-4 block text-lg">The Ritual</span>
              <h2 className="font-['Playfair_Display'] text-5xl md:text-7xl text-stone-100 font-light mb-8">Integrated<br/>Repose</h2>
              <p className="text-stone-400 font-light text-lg leading-relaxed mb-12 max-w-md">Our pieces are conceived not merely to occupy a space, but to dissolve the boundaries between architecture and furniture within wet environments.</p>
              <button className="flex items-center text-stone-300 hover:text-stone-100 transition-colors group">
                <span className="uppercase tracking-widest text-sm border-b border-stone-700 pb-1 group-hover:border-stone-400 transition-colors">Explore Configurations</span>
                <span className="material-symbols-outlined ml-4 opacity-50 group-hover:opacity-100 transition-opacity">arrow_right_alt</span>
              </button>
            </div>
          </div>
        </section>

        {/* Section 4: Private Sanctuary */}
        <section className="min-h-screen w-full bg-stone-950 py-32 px-8 md:px-16 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24">
              <div>
                <h2 className="font-['Playfair_Display'] text-4xl md:text-6xl text-stone-100 font-light mb-4">Private Sanctuary</h2>
                <p className="text-stone-500 font-light text-lg max-w-xl">A gallery of bespoke commissions realizing the ultimate home spa experience.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[716px]">
              <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden bg-stone-900 min-h-[300px]">
                <img 
                  alt="Expansive dark home gym" 
                  className="w-full h-full object-cover opacity-70 transition-transform duration-1000 group-hover:scale-105" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7A3jY-UiyDmQNWh2i2kT5GvqXyLFl4hptlLolZdRiTppDk2nI6jvQ6t0cjk3Kv_62pAJf9Tjc9DEqMvz_J9FIcXXdlThq9g50Ub5hi1zpJMOtOukKh9H3tEvebhMyWtbk6gQXThHRFu8VqZFZep-hzc0GusKW1DMlSsAH6UTODUTK0T6gr5hXSkkoTOBfUl5F89D3QmOusFuPaOFIwd8Wqn1uCnbZiOPMEo-_U3M9btjnutMIv-sYUleJkI6p-saixnHGH6ebKDA" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-transparent transition-colors duration-500"></div>
                <div className="absolute bottom-8 left-8">
                  <p className="font-['Playfair_Display'] text-stone-200 text-xl">The Aspen Commission</p>
                </div>
              </div>
              <div className="md:col-span-2 md:row-span-1 relative group overflow-hidden bg-stone-900 min-h-[200px]">
                <img 
                  alt="Monolithic stone soaking tub" 
                  className="w-full h-full object-cover opacity-70 transition-transform duration-1000 group-hover:scale-105" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdccxt4g3tuDfLB--2hqKEos6xj0IYp1CX9jVaF2lC5UaOcvT9gF9e8L2Sloz-tjUM_a4IlrPGSsqzLPT9_JalRr2AFB3yr7tlMzypxxGjcFZBxleyKQRxkOkbPpXsmZsZvs1047UkdySo8ClStGoKc-3M0vlYPte_hGKSURE-DBTyMCY5q98OozwoO3BfBZw68Ducv0T2p_zPModE78Yv50h0CQ8jjxAAuVjeOG2N2WNYZhSa55XGv5HcY8BFfLG0N2y0qXYC3Zk" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden bg-stone-900 min-h-[200px]">
                <img 
                  alt="Minimalist dark wood vanity" 
                  className="w-full h-full object-cover opacity-70 transition-transform duration-1000 group-hover:scale-105" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAbD8YRS0mAdJFf8AlcsNtW0hOGjP75j1G-eVsdgmDGTg1EEnU72t7g7-UXCu2Em4e2oxMDd8K6-sRXxJ3EbyoG8s2c0y_vYO6pLToQ5haqOLH2Dipx2rDHRFxTF2SHWf_kuaR6gbNRbOd-yE5r-hE66gDznKAHpOhB6-rhZD_ELM3jrdLPmVzKuZodC9QwD8S8ZDfhUxe3hEi22ibvrr27wWHQOU92GArOx41XE-sdWjg-X0g1QnErkM5UrxinFyR0LZK6QOY3ZM" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden bg-stone-900 min-h-[200px]">
                <img 
                  alt="Ambient light fixture" 
                  className="w-full h-full object-cover opacity-70 transition-transform duration-1000 group-hover:scale-105" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZrFh5AN1ZH532HMcEu9x4ND1x9Y7DxpHnyiQmuAokiPuGIX8EhRgv6ZLky_Qipdu1YESp8c_WTNzaK56NYmUN7UwlKkcH2W3MDg79ST6H3CSQXJnSbV7bs0XLkA_Z8r7Lk6hswc-6zNcuWJSsiCkp6qKPGYF7kMsKAVEy_Mnhxc2eIrYR7b7izbkd3yhRYD9WsyIz8_BY0PwdtHR929qY9h-j07Cat4BAX0tXgrIy5wLB4_ljkzkwJUahmAVgbwrEVqeW4VSaJtw" 
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Spotlight and Form */}
        <CollectionSpotlight collectionName="Wellness" />
        <StartDialogueForm />
      </main>

      {/* Footer */}
      <footer className="w-full py-24 border-t border-stone-900 bg-stone-950 flex flex-col items-center gap-12 max-w-7xl mx-auto px-8 font-['Playfair_Display'] italic text-sm tracking-widest text-stone-400">
        <div className="text-xl font-serif tracking-[0.2em] text-stone-300 uppercase not-italic">HERITAGE</div>
        <div className="flex flex-wrap justify-center gap-8">
          <a className="text-stone-600 hover:text-stone-300 transition-colors duration-300" href="#">The Collection</a>
          <a className="text-stone-600 hover:text-stone-300 transition-colors duration-300" href="#">Sustainability</a>
          <a className="text-stone-600 hover:text-stone-300 transition-colors duration-300" href="#">Private Atelier</a>
          <a className="text-stone-600 hover:text-stone-300 transition-colors duration-300" href="#">Press</a>
          <a className="text-stone-600 hover:text-stone-300 transition-colors duration-300" href="#">Contact</a>
        </div>
        <p className="mt-4 opacity-60">© 2024 No Limits Furniture. Crafted for the Exceptional.</p>
      </footer>
    </div>
  );
};

export default Wellness;

