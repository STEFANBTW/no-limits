import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import FilterPanel from '../components/FilterPanel';
import { SlidersHorizontal, ChevronRight, Box, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Shop = () => {
  const { products } = useProduct();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 20000],
    materials: [],
    colors: [],
    rating: 0,
    model3dOnly: false
  });

  const categories = useMemo(() => ['All', ...Array.from(new Set(products.map(p => p.category)))], []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search Query Filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.materials.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Horizontal category bar filter
      if (activeCategory !== 'All' && product.category !== activeCategory) return false;

      // Slide-out panel filters
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) return false;
      
      const priceVal = parseInt(product.price.replace(/[$,]/g, ''));
      if (priceVal < filters.priceRange[0] || priceVal > filters.priceRange[1]) return false;

      if (filters.materials.length > 0) {
        const matchesMaterial = filters.materials.some(m => product.materials.toLowerCase().includes(m.toLowerCase()));
        if (!matchesMaterial) return false;
      }

      if (filters.colors.length > 0) {
        const matchesColor = filters.colors.some(c => 
          product.name.toLowerCase().includes(c.toLowerCase()) || 
          product.details.toLowerCase().includes(c.toLowerCase()) ||
          product.materials.toLowerCase().includes(c.toLowerCase())
        );
        if (!matchesColor) return false;
      }

      if (filters.model3dOnly && !product.model3d) return false;

      return true;
    });
  }, [activeCategory, filters, searchQuery]);

  const toggleWishlist = (e: React.MouseEvent, product: any) => {
    e.preventDefault(); // Prevent navigation
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

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-theme-base text-theme-text-muted font-sans antialiased selection:bg-primary/30 selection:text-theme-text">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=60&w=1200" 
              alt="No Limits Furniture Collection" 
              className="h-full w-full object-cover opacity-50"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-theme-overlay opacity-80"></div>
          </div>
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <span className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-4 md:mb-6 block">The Gallery</span>
            <h1 className="text-4xl sm:text-4xl md:text-8xl font-serif italic font-normal text-theme-text mb-6 md:mb-8 leading-tight">
              The Shop
            </h1>
            <p className="text-theme-text-muted text-base sm:text-lg md:text-4xl max-w-3xl font-light leading-relaxed mx-auto px-4 md:px-0">
              A definitive archive of sculptural form and architectural precision. 
              Available for acquisition.
            </p>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="sticky top-0 z-40 bg-theme-surface/95 backdrop-blur-md border-b border-theme-border">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-4 flex flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 md:gap-12 overflow-x-auto scrollbar-hide flex-1">
              {['All', 'Seating', 'Tables', 'Lighting', 'Lounge'].map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 relative py-2 whitespace-nowrap ${
                    activeCategory === cat ? 'text-primary' : 'text-theme-text-subtle hover:text-theme-text'
                  }`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
                  )}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="relative flex items-center h-full">
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 240, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      className="absolute right-0 top-1/2 -translate-y-1/2 overflow-hidden"
                    >
                      <input 
                        type="text"
                        autoFocus
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search collection..."
                        className="w-full bg-theme-panel border border-theme-border pl-4 pr-10 py-2.5 text-[10px] font-bold tracking-widest uppercase text-theme-text focus:outline-none focus:border-primary transition-all shadow-sm"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <button 
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className={`z-10 p-2.5 transition-all rounded-full hover:bg-theme-border/30 flex items-center justify-center ${
                    isSearchOpen ? 'text-primary' : 'text-theme-text-muted hover:text-theme-text'
                  }`}
                >
                  {isSearchOpen ? <X size={16} /> : <Search size={16} />}
                </button>
              </div>

              <button 
                onClick={() => setIsFilterOpen(true)}
                className="group relative flex items-center gap-3 bg-white dark:bg-theme-border/30 px-6 py-3 transition-all text-[10px] font-bold tracking-[0.2em] uppercase text-theme-text border border-theme-border overflow-hidden whitespace-nowrap"
              >
                <div className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <div className="relative z-10 flex items-center gap-3 group-hover:text-black transition-colors duration-500">
                  <SlidersHorizontal size={14} />
                  <span className="hidden sm:inline">Refine Collection</span>
                  <span className="sm:hidden">Filters</span>
                </div>
              </button>
            </div>
          </div>
        </section>

        <FilterPanel 
          isOpen={isFilterOpen} 
          onClose={() => setIsFilterOpen(false)}
          onApply={setFilters}
          currentFilters={filters}
          categories={categories.filter(c => c !== 'All')}
        />

        {/* Product Grid */}
        <div className="px-6 md:px-12 max-w-[1600px] mx-auto pb-32 pt-16">
          <div className="mb-12 flex justify-between items-end">
            <div>
              <h2 className="text-sm font-bold tracking-[0.4em] uppercase text-theme-text-subtle mb-2">The Collection</h2>
              <p className="text-3xl font-serif italic text-theme-text">{activeCategory === 'All' ? 'All Pieces' : activeCategory}</p>
            </div>
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-theme-text-subtle">
              {filteredProducts.length} Results
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {filteredProducts.map((product, index) => (
              <React.Fragment key={product.id}>
                {/* Disruptive Collection Banner 1 */}
                {index === 2 && (
                  <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 w-full group relative overflow-hidden bg-theme-panel border border-theme-border flex flex-col md:flex-row-reverse items-center justify-between mb-8 shadow-2xl">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-out group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=1600')" }}></div>
                    <div className="absolute inset-0 bg-theme-panel/70 backdrop-blur-[2px] transition-all duration-700 group-hover:backdrop-blur-none group-hover:bg-theme-panel/40"></div>
                    <div className="relative z-10 p-12 md:p-24 flex flex-col items-start w-full md:w-1/2">
                      <h4 className="text-[#8a6d3b] text-xs font-bold tracking-[0.4em] uppercase mb-4 flex items-center gap-4">
                        <span className="w-8 h-px bg-[#8a6d3b]"></span>
                        Featured Exhibition
                      </h4>
                      <h3 className="text-4xl text-theme-text font-serif italic mb-6 shadow-sm">The Curvature Collection</h3>
                      <p className="text-theme-text-subtle/90 font-light leading-relaxed mb-8 max-w-sm drop-shadow-md">
                        Soft edges meeting brutalist materials. Discover the collection that redefines fluid motion within static space.
                      </p>
                      <button className="group relative px-10 py-5 bg-transparent border border-white/40 text-theme-text overflow-hidden transition-all">
                        <div className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                        <span className="relative z-10 font-sans text-[11px] font-bold tracking-[0.3em] uppercase group-hover:text-theme-panel transition-colors duration-500">View Collection</span>
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Architectural Inspiration Banner after the 4th item */}
                {index === 5 && (
                  <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 w-full group relative overflow-hidden bg-theme-panel border border-theme-border flex flex-col md:flex-row items-center justify-between mb-8 shadow-2xl">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-out group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&q=80&w=1600')" }}></div>
                    <div className="absolute inset-0 bg-theme-panel/70 backdrop-blur-[2px] transition-all duration-700 group-hover:backdrop-blur-none group-hover:bg-theme-panel/40"></div>
                    <div className="relative z-10 p-12 md:p-24 flex flex-col items-start w-full md:w-1/2">
                      <h4 className="text-primary text-xs font-bold tracking-[0.4em] uppercase mb-4 flex items-center gap-4">
                        <span className="w-8 h-px bg-primary"></span>
                        Architectural Context
                      </h4>
                      <h3 className="text-4xl text-theme-text font-serif italic mb-6 shadow-sm">Defining The Volume</h3>
                      <p className="text-theme-text-subtle/90 font-light leading-relaxed mb-8 max-w-sm drop-shadow-md">
                        Our pieces are not designed in isolation. They are built to communicate with the architectural geometry of their final resting space.
                      </p>
                      <button className="group relative px-10 py-5 bg-transparent border border-white/40 text-theme-text overflow-hidden transition-all">
                        <div className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                        <span className="relative z-10 font-sans text-[11px] font-bold tracking-[0.3em] uppercase group-hover:text-primary transition-colors duration-500">Explore Commissions</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Material Focus Banner 3 */}
                {index === 8 && (
                  <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 w-full group relative overflow-hidden bg-theme-panel border border-theme-border flex flex-col items-center justify-center text-center mb-8 shadow-2xl min-h-[400px]">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-out group-hover:scale-105 grayscale" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&q=80&w=1600')" }}></div>
                    <div className="absolute inset-0 bg-theme-panel/80 transition-all duration-700 group-hover:bg-theme-panel/60"></div>
                    <div className="relative z-10 p-12 md:p-24 flex flex-col items-center max-w-2xl mx-auto">
                      <h4 className="text-[#8a6d3b] text-xs font-bold tracking-[0.4em] uppercase mb-4">
                        Material Focus
                      </h4>
                      <h3 className="text-4xl md:text-5xl text-theme-text font-serif italic mb-6">Patinated Bronze</h3>
                      <p className="text-theme-text-subtle/90 font-light leading-relaxed mb-8">
                        A living material that ages beautifully over time. Each fingerprint and shadow tells a story of interaction.
                      </p>
                      <button className="border-b border-theme-text-subtle hover:border-[#8a6d3b] hover:text-[#8a6d3b] text-theme-text transition-all duration-300 pb-1 uppercase tracking-[0.3em] text-[10px] font-bold">
                        Learn More
                      </button>
                    </div>
                  </div>
                )}

                <Link 
                  to={`/product/${product.slug}`}
                  className="group flex flex-col relative"
                >
                  <div className="relative overflow-hidden bg-theme-panel aspect-[3/4] mb-6 border border-theme-border">
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 z-10" 
                      referrerPolicy="no-referrer" loading="lazy"
                    />
                    <div className="absolute inset-0 bg-theme-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none z-20">
                      <span className="border border-theme-border-strong text-theme-text px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-sm shadow-xl bg-theme-panel/20">
                        View Details
                      </span>
                    </div>
                    <button 
                      onClick={(e) => toggleWishlist(e, product)}
                      className="absolute top-4 right-4 z-30 w-8 h-8 bg-theme-overlay/60 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-theme-surface hover:text-primary transition-all opacity-0 group-hover:opacity-100 duration-300"
                    >
                      <span className={`material-symbols-outlined text-sm transition-colors ${isInWishlist(product.id) ? 'text-primary fill-current' : 'text-white'}`}>
                        favorite
                      </span>
                    </button>
                    {product.featured && (
                      <div className="absolute top-4 left-4 z-30 bg-primary text-theme-text-inverse text-[8px] font-bold uppercase tracking-widest px-2 py-1">
                        Featured
                      </div>
                    )}
                    {product.model3d && (
                      <div className="absolute bottom-4 left-4 z-30 bg-theme-panel/80 backdrop-blur-md text-theme-text text-[8px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 flex items-center gap-2 border border-theme-border-strong">
                        <Box size={10} className="text-primary" strokeLinecap="square" strokeLinejoin="miter" />
                        3D View Available
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <span className="text-primary text-[10px] uppercase tracking-widest font-bold">
                        {product.category}
                      </span>
                      <span className="text-theme-text-muted text-sm font-light">
                        {product.price}
                      </span>
                    </div>
                    <h3 className="text-4xl text-theme-text font-serif italic group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-theme-text-subtle text-xs font-light tracking-wide truncate">
                      {product.materials}
                    </p>
                  </div>
                </Link>
              </React.Fragment>
            ))}
          </div>

          {/* Load More / Discovery */}
          <div className="flex flex-col items-center justify-center gap-8 py-32 border-t border-theme-border mt-16">
            <p className="text-theme-text-subtle text-sm font-light italic">End of current curation</p>
            <button className="border border-theme-border-strong text-theme-text hover:border-primary hover:text-primary transition-all duration-500 px-16 py-5 uppercase tracking-[0.3em] text-[10px] font-bold">
              Request Archive Access
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Shop;
