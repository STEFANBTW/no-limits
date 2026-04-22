import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronRight, ChevronLeft, Box, Rotate3d, Maximize2, X as CloseIcon, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProduct } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import ModelViewer from '../components/ModelViewer';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { products } = useProduct();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart, items, updateQuantity, removeFromCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();
  const [is3DModalOpen, setIs3DModalOpen] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveImage(emblaApi.selectedScrollSnap());
  }, [emblaApi, setActiveImage]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const product = products.find((p) => p.slug === slug);
  const cartItem = product ? items.find(item => item.id === product.id) : undefined;
  const inCart = !!cartItem;

  // Ensure 5 images plus potential 3D model slide
  const displayImages = useMemo(() => {
    if (!product) return [];
    const imgs = [...product.images];
    // Pad to 5 if needed
    while (imgs.length < 5 && imgs.length > 0) {
      imgs.push(imgs[0]); 
    }
    return imgs.slice(0, 5);
  }, [product]);

  useEffect(() => {
    if (!product) {
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-theme-panel flex items-center justify-center text-theme-text">
        <div className="text-center">
          <h1 className="text-4xl font-serif italic mb-4">Product Not Found</h1>
          <Link to="/shop" className="text-primary underline uppercase tracking-widest text-xs">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const toggleWishlist = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const totalSlides = displayImages.length + (product.model3d ? 1 : 0);

  return (
    <div className="bg-theme-panel text-theme-text-muted antialiased selection:bg-primary/30 selection:text-theme-text font-sans">
      {/* 3D Immersive Modal */}
      <AnimatePresence>
        {is3DModalOpen && product.model3d && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-theme-panel flex flex-col"
          >
            <div className="absolute top-4 md:top-8 left-4 md:left-12 z-[110]">
              <h2 className="text-theme-text font-serif italic text-3xl">{product.name}</h2>
            </div>
            
            <button 
              onClick={() => setIs3DModalOpen(false)}
              className="absolute top-4 md:top-8 right-4 md:right-12 z-[110] w-10 h-10 bg-theme-base/50 backdrop-blur-md border border-theme-border flex items-center justify-center hover:bg-primary hover:text-theme-text transition-all group"
            >
              <CloseIcon size={20} />
            </button>

            <div className="flex-1 w-full relative">
              <ModelViewer modelUrl={product.model3d} title="" />
            </div>

            <div className="absolute bottom-6 md:bottom-12 left-4 md:left-12 z-[110] flex flex-col gap-2">
               <div className="flex items-center gap-2 text-theme-text-subtle group">
                 <div className="w-8 h-8 rounded-full border border-theme-border flex items-center justify-center">
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:rotate-12 transition-transform"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                 </div>
                 <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase">Drag to Rotate</span>
               </div>
               <div className="flex items-center gap-2 text-theme-text-subtle group">
                 <div className="w-8 h-8 rounded-full border border-theme-border flex items-center justify-center">
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:scale-110 transition-transform"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                 </div>
                 <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase">Pinch to Zoom</span>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Breadcrumbs */}
      <div id="sticky-breadcrumb" className="sticky top-0 z-40 bg-theme-panel/95 backdrop-blur-md pt-4 md:pt-8 pb-3 md:pb-4 px-4 md:px-12 max-w-[1440px] mx-auto border-b border-theme-border/20">
        <div className="flex items-center gap-3 text-[9px] md:text-[10px] font-bold tracking-widest text-theme-text-subtle uppercase">
          <Link to="/" className="hover:text-theme-text transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-theme-text transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-theme-text">{product.name}</span>
        </div>
      </div>

      <main className="relative min-h-screen pb-20 md:pb-32 pt-4">
        <div className="layout-container max-w-[1440px] mx-auto px-4 md:px-12">
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-24 relative">
            {/* Left: Product Images */}
            {/* Using 70px as it accounts for the revised height of the breadcrumbs block above */}
            <div className="lg:w-[60%] w-full lg:sticky lg:top-[90px] self-start z-30">
              <div className="w-full aspect-[4/5] max-h-[calc(100vh-100px)] bg-theme-surface relative group overflow-hidden border border-theme-border flex items-center justify-center">
                
                <div className="overflow-hidden w-full h-full" ref={emblaRef}>
                  <div className="flex w-full h-full">
                    {displayImages.map((img, idx) => (
                      <div className="flex-[0_0_100%] min-w-0 h-full relative" key={idx}>
                        <img 
                          src={img}
                          alt={`${product.name} - view ${idx + 1}`} 
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                    {product.model3d && (
                      <div 
                        className="flex-[0_0_100%] min-w-0 h-full relative z-50 bg-theme-panel cursor-pointer group/threed overflow-hidden" 
                        onClick={() => setIs3DModalOpen(true)}
                      >
                        {/* Persistent Prompt - Removed as requested */}
                        {/* Background Model Preview */}
                        <div className="w-full h-full opacity-40 group-hover/threed:opacity-100 transition-all duration-700">
                          <ModelViewer modelUrl={product.model3d} title="" />
                        </div>

                        {/* Corner Accents */}
                        <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-primary/40" />
                        <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-primary/40" />
                        <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-primary/40" />
                        <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-primary/40" />
                      </div>
                    )}
                  </div>
                </div>

                {totalSlides > 1 && (
                  <>
                    <button 
                      onClick={scrollPrev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-theme-overlay/20 backdrop-blur-md rounded-full flex items-center justify-center text-theme-text opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-primary"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      onClick={scrollNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-theme-overlay/20 backdrop-blur-md rounded-full flex items-center justify-center text-theme-text opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-primary"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                <button 
                  onClick={toggleWishlist}
                  className="absolute top-4 right-4 z-20 w-10 h-10 bg-theme-overlay/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white hover:text-primary transition-all group/heart"
                >
                  <span className={`material-symbols-outlined text-lg transition-colors ${isInWishlist(product.id) ? 'text-primary fill-current' : 'text-theme-text group-hover/heart:text-primary'}`}>
                    favorite
                  </span>
                </button>
              </div>
               {/* Thumbnails */}
              {(displayImages.length > 0 || product.model3d) && (
                <div className="mt-4 flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {displayImages.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => emblaApi?.scrollTo(idx)}
                      className={`w-24 h-24 shrink-0 border transition-all ${activeImage === idx ? 'border-primary opacity-100' : 'border-transparent opacity-40 hover:opacity-100'}`}
                    >
                      <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
                    </button>
                  ))}
                  {product.model3d && (
                    <button 
                      onClick={() => emblaApi?.scrollTo(5)}
                      className={`w-24 h-24 shrink-0 border flex flex-col items-center justify-center bg-theme-base gap-2 transition-all ${activeImage === 5 ? 'border-primary opacity-100' : 'border-transparent opacity-40 hover:opacity-100'}`}
                    >
                      <Rotate3d size={24} className="text-primary" strokeLinecap="square" strokeLinejoin="miter" />
                      <span className="text-[8px] font-bold uppercase tracking-widest text-theme-text-subtle">3D View</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Right: Product Info */}
            <div className="lg:w-[40%] w-full flex flex-col mt-0 pt-0">
              <div className="mb-6 md:mb-8 border-b border-theme-border pb-6 md:pb-8 mt-0 pt-0">
                <div className="flex justify-between items-start mb-3 md:mb-4">
                  <h1 className="text-theme-text font-serif text-3xl md:text-4xl lg:text-5xl italic leading-tight">
                    {product.name}
                  </h1>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-primary text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">{product.category}</span>
                  <span className="text-theme-text text-lg md:text-xl font-light">{product.price}</span>
                </div>

                {product.model3d && (
                   <button 
                     onClick={() => setIs3DModalOpen(true)}
                     className="group relative mt-6 md:mt-8 w-full h-14 md:h-16 bg-transparent border border-primary text-theme-text overflow-hidden transition-all flex items-center justify-center gap-3"
                   >
                     <div className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                     <div className="relative z-10 flex items-center gap-3 group-hover:text-black transition-colors duration-500">
                       <Maximize2 size={16} strokeLinecap="square" strokeLinejoin="miter" className="group-hover:rotate-12 transition-transform" />
                       <span className="text-[10px] md:text-[11px] font-bold tracking-[0.4em] uppercase">Launch 3D Explorer</span>
                     </div>
                   </button>
                )}
              </div>

              <div className="mb-8 md:mb-10 space-y-4 md:space-y-6">
                <p className="text-theme-text-muted text-lg md:text-xl leading-relaxed font-light italic">
                  {product.description}
                </p>
                <p className="text-theme-text-subtle text-base md:text-lg leading-relaxed font-light">
                  {product.details}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {inCart && cartItem ? (
                  <div className="flex items-center justify-between w-full h-14 md:h-16 bg-green-600 text-white border border-green-700 px-4 md:px-6 transition-all duration-500 shadow-lg">
                    <button 
                      onClick={() => cartItem.quantity === 1 ? removeFromCart(product.id) : updateQuantity(product.id, cartItem.quantity - 1)}
                      className="w-10 h-10 border border-white/30 flex items-center justify-center hover:bg-white hover:text-green-600 transition-colors rounded-full"
                    >
                      <Minus size={16} />
                    </button>
                    
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] uppercase tracking-widest font-bold opacity-80 leading-none mb-1">In Collection</span>
                      <span className="text-[16px] md:text-[18px] font-bold font-mono">
                        {cartItem.quantity}
                      </span>
                    </div>
                    
                    <button 
                      onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                      className="w-10 h-10 border border-white/30 flex items-center justify-center hover:bg-white hover:text-green-600 transition-colors rounded-full"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => addToCart(product)}
                    className="group relative w-full h-14 md:h-16 border border-theme-border overflow-hidden transition-all duration-500 bg-white dark:bg-theme-panel text-theme-text flex items-center justify-center gap-3"
                  >
                    <div className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                    <div className="relative z-10 flex items-center gap-3 group-hover:text-black transition-colors duration-500">
                      <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase">Add to Collection</span>
                      <span className="material-symbols-outlined text-xs md:text-sm">shopping_bag</span>
                    </div>
                  </button>
                )}
                <p className="text-center italic text-theme-text-subtle text-sm">
                  Handcrafted to order. Lead times vary by region.
                </p>
              </div>

              <div className="mt-8 md:mt-12 border-t border-theme-border">
                <details className="group py-4 md:py-6 border-b border-theme-border cursor-pointer">
                  <summary className="flex justify-between items-center list-none outline-none px-4">
                    <span className="text-[9px] md:text-[10px] font-bold tracking-widest text-theme-text uppercase">Dimensions</span>
                    <span className="material-symbols-outlined text-theme-text-subtle group-open:rotate-180 transition-transform">expand_more</span>
                  </summary>
                  <div className="pt-4 md:pt-6 px-4 text-theme-text-subtle text-xs md:text-sm space-y-2">
                    <p className="flex justify-between"><span>Height</span> <span>{product.dimensions.height}</span></p>
                    <p className="flex justify-between"><span>Width</span> <span>{product.dimensions.width}</span></p>
                    <p className="flex justify-between"><span>Depth</span> <span>{product.dimensions.depth}</span></p>
                    {product.dimensions.seatHeight && (
                      <p className="flex justify-between"><span>Seat Height</span> <span>{product.dimensions.seatHeight}</span></p>
                    )}
                  </div>
                </details>
                <details className="group py-4 md:py-6 border-b border-theme-border cursor-pointer">
                  <summary className="flex justify-between items-center list-none outline-none px-4">
                    <span className="text-[9px] md:text-[10px] font-bold tracking-widest text-theme-text uppercase">Materials & Origin</span>
                    <span className="material-symbols-outlined text-theme-text-subtle group-open:rotate-180 transition-transform">expand_more</span>
                  </summary>
                  <div className="pt-4 md:pt-6 px-4 text-theme-text-subtle text-xs md:text-sm leading-relaxed">
                    <p>{product.materials}</p>
                    <p className="mt-4 italic">Manufactured locally to global standards.</p>
                  </div>
                </details>
                <details className="group py-4 md:py-6 border-b border-theme-border cursor-pointer">
                  <summary className="flex justify-between items-center list-none outline-none px-4">
                    <span className="text-[9px] md:text-[10px] font-bold tracking-widest text-theme-text uppercase">The Acquisition Journey</span>
                    <span className="material-symbols-outlined text-theme-text-subtle group-open:rotate-180 transition-transform">expand_more</span>
                  </summary>
                  <div className="pt-4 md:pt-6 px-4 text-theme-text-subtle text-xs md:text-sm leading-relaxed">
                    <p>Every artifact is professionally crated and dispatched via our specialist logistics partners. We include white-glove inspection, room-of-choice placement, and ecological debris removal.</p>
                    <p className="mt-4 italic">Curated arrival, engineered for absolute precision.</p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="layout-container max-w-[1440px] mx-auto px-4 md:px-12 mt-20 md:mt-32">
          <div className="flex justify-between items-end mb-8 md:mb-12 border-b border-theme-border pb-4">
            <h3 className="text-2xl md:text-3xl font-serif italic text-theme-text">Curator Perspectives</h3>
            <span className="text-primary text-[9px] md:text-[10px] font-bold tracking-widest uppercase flex items-center gap-1">
              4.9 <span className="material-symbols-outlined text-[9px] md:text-[10px] fill-current">star</span> (12 Reviews)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Image Lifestyle Review */}
            <div className="bg-theme-surface border border-theme-border p-5 md:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 mb-4 text-primary">
                  {[...Array(5)].map((_, i) => <span key={i} className="material-symbols-outlined text-xs md:text-sm fill-current">star</span>)}
                </div>
                <p className="text-theme-text-subtle text-xs md:text-sm italic mb-6 leading-relaxed">
                  "It commands the room without overwhelming it. The craftsmanship is evident in every joint, and it perfectly matches my minimalist aesthetic. Highly recommended."
                </p>
                <div className="w-full aspect-[4/3] bg-black mb-6 relative group overflow-hidden border border-theme-border">
                  <img src={`https://picsum.photos/seed/${product.slug}-room1/600/400?blur=1`} alt="Customer style" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-theme-base/80 to-transparent flex items-end p-3">
                    <span className="text-[9px] md:text-[10px] text-theme-text font-bold uppercase tracking-widest flex items-center gap-1"><span className="material-symbols-outlined text-[10px] md:text-xs">verified</span> Verified Placement</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-theme-border/50 pt-4">
                <p className="text-theme-text text-xs md:text-sm font-bold tracking-wider uppercase">— Eleanor V.</p>
                <p className="text-[9px] md:text-[10px] text-theme-text-subtle tracking-widest mt-1">October 12, 2025</p>
              </div>
            </div>

            {/* Video Placeholder Review */}
            <div className="bg-theme-surface border border-theme-border p-5 md:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 mb-4 text-primary">
                  {[...Array(5)].map((_, i) => <span key={i} className="material-symbols-outlined text-xs md:text-sm fill-current">star</span>)}
                </div>
                <p className="text-theme-text-subtle text-xs md:text-sm italic mb-6 leading-relaxed">
                  "I was hesitant to purchase without seeing it in person, but the unboxing experience alone convinced me. Here is a quick look at the finish in natural morning light."
                </p>
                <div className="w-full aspect-[4/3] bg-theme-panel mb-6 relative group cursor-pointer border border-theme-border flex items-center justify-center">
                  <img src={`https://picsum.photos/seed/${product.slug}-video/600/400`} alt="Video Thumbnail" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" referrerPolicy="no-referrer" />
                  <div className="absolute w-10 h-10 md:w-12 md:h-12 rounded-full border border-theme-text flex items-center justify-center bg-theme-base/50 backdrop-blur-sm group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-theme-text pl-1 text-lg md:text-xl">play_arrow</span>
                  </div>
                  <div className="absolute bottom-3 left-3 text-[9px] md:text-[10px] text-theme-text font-bold uppercase tracking-widest bg-theme-base/80 px-2 py-1 rounded-sm">0:45</div>
                </div>
              </div>
              <div className="border-t border-theme-border/50 pt-4">
                <p className="text-theme-text text-xs md:text-sm font-bold tracking-wider uppercase">— Sarah L.</p>
                <p className="text-[9px] md:text-[10px] text-theme-text-subtle tracking-widest mt-1">August 14, 2025</p>
              </div>
            </div>

            {/* Audio Placeholder Review */}
            <div className="bg-theme-surface border border-theme-border p-5 md:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 mb-4 text-primary">
                  {[...Array(5)].map((_, i) => <span key={i} className="material-symbols-outlined text-xs md:text-sm fill-current">star</span>)}
                </div>
                <p className="text-theme-text-subtle text-xs md:text-sm italic mb-6 leading-relaxed">
                  "Listen to the audio note for my full thoughts, but long story short: incredible quality. It completely anchors my study room. Worth every penny."
                </p>
                <div className="w-full bg-theme-panel mb-6 p-3 md:p-4 border border-theme-border flex items-center gap-3 md:gap-4">
                  <button className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full bg-primary flex items-center justify-center hover:bg-primary-light transition-colors">
                    <span className="material-symbols-outlined text-theme-base text-lg md:text-xl">play_arrow</span>
                  </button>
                  <div className="flex-1 flex items-center gap-1">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="w-1 bg-theme-text-subtle rounded-full" style={{ height: `${Math.max(4, Math.random() * 20)}px` }}></div>
                    ))}
                    <div className="text-[9px] md:text-[10px] text-theme-text-muted ml-2 font-mono">1:12</div>
                  </div>
                </div>
              </div>
              <div className="border-t border-theme-border/50 pt-4">
                <p className="text-theme-text text-sm font-bold tracking-wider uppercase">— Marcus T.</p>
                <p className="text-[10px] text-theme-text-subtle tracking-widest mt-1">September 28, 2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* The Provenance Section */}
        <div className="layout-container max-w-[1440px] mx-auto px-4 md:px-12 mt-20 md:mt-32 mb-12">
          <div className="mb-8 md:mb-12 border-b border-theme-border pb-4 flex justify-between items-end">
            <h3 className="font-serif text-2xl md:text-3xl italic text-theme-text">The Provenance</h3>
            <span className="hidden md:block font-sans text-xs tracking-widest text-theme-text-subtle font-medium uppercase mb-1">Handcrafted Tradition</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="group relative aspect-[4/5] bg-theme-surface overflow-hidden border border-theme-border">
              <img alt="Wood grain" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Macro shot of rich walnut wood grain texture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWJj3pGS70hVWzpcDA-Bvsb600BEPqro4nKtiMW0ubANl10u3FPefIu24KMA9g2AxIM0HbED96b86WkOcIpznvHyYrc9Uhbv6fhfY9Rl4PX4BaiONmvGQ7VhEGM1wH1JSQWN-ghAQx2qy-gN-wpnuh3H34ch5BxV2vMht9z50cNfP-b2MR3IvwD-M7fwoYWDelmStfnV5g3841etYt5jRKJmd2MAZ6hQV4GIPdWRyIia7I2LlIIC2Z9tVPrSbXMTAMZMQXzy_kyy4"/>
              <div className="absolute inset-0 bg-gradient-to-t from-theme-base/90 via-theme-base/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <h4 className="font-serif text-xl md:text-2xl italic text-theme-text mb-2 drop-shadow-sm">American Walnut</h4>
                <p className="font-sans text-theme-text-muted text-base md:text-lg leading-snug max-w-[240px] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 font-medium">
                  Sourced from sustainable forests in Pennsylvania, aged for stability and character.
                </p>
              </div>
            </div>
            
            <div className="group relative aspect-[4/5] bg-theme-surface overflow-hidden border border-theme-border">
              <img alt="Leather stitching detail" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Close up of hand stitching on brown leather" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAO0cXtQaG7PeDhLPln-KwLHtJO1rwi0b3FrkObgQjBUzOhNTmWW_i6KPoq6XSh5Jo7A4JLebMDrk9RiyDqkxRTudBGiqcX6P6M6H3DAlyeAr0HA__0cyJ7XrXoEf_UwHdYyrx1JVPVnqZ9zvKeCwD3tS51541NuN3hPmPbY7egFT-frDiunSPFB__yqIVeAlyaoTIgybU4CDArr-_f7FqT4ALo_o6PZJA9GtpkZz1C4_5ZPMS0xd7-0G828H1Djy37F1eI0QcuYvw"/>
              <div className="absolute inset-0 bg-gradient-to-t from-theme-base/90 via-theme-base/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <h4 className="font-serif text-xl md:text-2xl italic text-theme-text mb-2 drop-shadow-sm">Saddle Stitching</h4>
                <p className="font-sans text-theme-text-muted text-base md:text-lg leading-snug max-w-[240px] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 font-medium">
                  Hand-stitched by artisans with over 30 years of experience in leatherworking.
                </p>
              </div>
            </div>

            <div className="group relative aspect-[4/5] bg-theme-surface overflow-hidden border border-theme-border">
              <img alt="Mortise and tenon joint" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Macro detail of traditional wood joinery" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKiS9FGBHQ8ZhFF45Uoy-cnf8ACM9HxMX7PY8uwb8i3keN85OtsYQ988q-nP_d2ZZQ8Xxc4Jeibm9oZY7wZ3Q6WkTfYqC9WtmhaEA1xnBCNCPkGD34E7yfLw6kDu5YRP5cAp745imjOeaB6miFyWq1s4TKxR2wEKGrsyFFO_taPGIoVz0r2pXVVzH1DhP-UutmuLLG6S0vwGlKrbah33T6HOQnG8isEpGixJ4hIROoirAvzkncg-jKTBR2hbOA9lDlf03Jt8bEV1o"/>
              <div className="absolute inset-0 bg-gradient-to-t from-theme-base/90 via-theme-base/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <h4 className="font-serif text-xl md:text-2xl italic text-theme-text mb-2 drop-shadow-sm">Mortise &amp; Tenon</h4>
                <p className="font-sans text-theme-text-muted text-base md:text-lg leading-snug max-w-[240px] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 font-medium">
                  Traditional joinery techniques that eliminate the need for screws or nails.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products -> Ideally Paired With */}
        <div className="layout-container max-w-[1440px] mx-auto px-6 md:px-12 mb-12">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-serif text-2xl italic text-theme-text">Ideally Paired With</h3>
            <Link to="/shop" className="text-primary font-sans text-[10px] tracking-widest uppercase hover:underline font-medium">View Collection</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.filter(p => p.id !== product.id).slice(0, 4).map((p) => (
              <Link key={p.id} to={`/product/${p.slug}`} className="group block">
                <div className="aspect-square bg-theme-surface mb-4 overflow-hidden relative shadow-sm border border-theme-border">
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" loading="lazy" />
                </div>
                <h5 className="font-serif text-lg text-theme-text italic">{p.name}</h5>
                <span className="font-sans text-xs text-theme-text-subtle block mt-1 font-medium">{p.price}</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
