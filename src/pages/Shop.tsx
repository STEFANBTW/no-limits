import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import FilterPanel from '../components/FilterPanel';
import { SlidersHorizontal, ChevronRight, Box, Search, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Shop = () => {
  const { products } = useProduct();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const urlCollection = searchParams.get('collection');
  const urlCategory = searchParams.get('category');
  const urlView3d = searchParams.get('view3d');
  
  const [mainFilter, setMainFilter] = useState<'All' | 'Pieces' | 'Collections'>('All');
  const [subFilter, setSubFilter] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: [0, 20000],
    materials: [] as string[],
    colors: [] as string[],
    rating: 0,
    model3dOnly: urlView3d === 'true'
  });

  useEffect(() => {
    if (urlCollection) {
      setMainFilter('Collections');
      setSubFilter(urlCollection);
    } else if (urlCategory) {
      setMainFilter('Pieces');
      setSubFilter(urlCategory);
    } else {
      setMainFilter('All');
      setSubFilter(null);
    }
    
    setFilters(prev => ({
      ...prev,
      model3dOnly: urlView3d === 'true'
    }));
  }, [urlCollection, urlCategory, urlView3d]);

  const handleMainFilterSelect = (filter: 'All' | 'Pieces' | 'Collections') => {
    setMainFilter(filter);
    setSubFilter(null);
    setSearchParams({}); // Clear URLs
  };

  const handleSubFilterSelect = (filterType: 'Pieces' | 'Collections', value: string) => {
    setMainFilter(filterType);
    setSubFilter(value);
    if (filterType === 'Pieces') setSearchParams({ category: value });
    if (filterType === 'Collections') setSearchParams({ collection: value });
  };

  const categories = useMemo(() => ['All', ...Array.from(new Set(products.map(p => p.category)))], [products]);

  const filteredProducts = useMemo(() => {
    // We shuffle pieces internally for random order but we sort collections? The user said:
    // "but the categories of pieces will just be random orders."
    // We can just rely on the original array order or randomize it here. Let's just use original array and perhaps reverse or something if we really want, but original order usually feels random enough if unsorted by name.
    
    let result = products.filter(product => {
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

      // Main filter (All, Pieces, Collections)
      const isCollection = product.itemType === 'Collection';
      if (mainFilter === 'Pieces' && isCollection) return false;
      if (mainFilter === 'Collections' && !isCollection) return false;
      
      // Sub filter
      if (subFilter) {
        if (mainFilter === 'Pieces' && product.category !== subFilter) return false;
        if (mainFilter === 'Collections' && product.collectionName !== subFilter) return false;
      }

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
    
    // Sort logic to randomize piece categories slightly, or just return as is.
    // For now returning filtered result.
    return result;
  }, [mainFilter, subFilter, filters, searchQuery, products]);

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
        {/* Navigation spacer for mobile removed since nav is at bottom, keep minimal desktop pt if needed or just let it sit flush */}
        {/* Hero Section */}
        <section className="relative h-[40vh] md:h-[60vh] w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=60&w=1200" 
              alt="No Limits Furniture Collection" 
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-theme-overlay"></div>
          </div>
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
            <span className="text-primary text-[var(--text-micro)] font-bold tracking-[0.4em] uppercase mb-4 md:mb-6 block">The Gallery</span>
            <h1 className="text-6xl md:text-9xl lg:text-[140px] font-serif italic font-normal text-theme-text mb-6 md:mb-8 leading-none text-center">
              The Shop
            </h1>
            <p className="text-theme-text-muted text-[var(--text-body)] max-w-2xl font-light leading-relaxed mx-auto px-4 md:px-0 text-center">
              A definitive archive of sculptural form and architectural precision. 
              Available for acquisition.
            </p>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="sticky top-0 z-40 bg-theme-surface/95 backdrop-blur-md border-b border-theme-border">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-4 flex flex-row justify-between items-center gap-2 md:gap-4 leading-none">
            <div className="hidden md:flex items-center gap-6 md:gap-12 overflow-x-visible flex-1">
              <button 
                onClick={() => handleMainFilterSelect('All')}
                className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 relative py-2 whitespace-nowrap ${mainFilter === 'All' ? 'text-primary' : 'text-theme-text-subtle hover:text-theme-text'}`}
              >
                All
                {mainFilter === 'All' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
              </button>

              <div className="relative group/pieces py-2">
                <button 
                  onClick={() => handleMainFilterSelect('Pieces')}
                  className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 flex items-center gap-1 ${mainFilter === 'Pieces' ? 'text-primary' : 'text-theme-text-subtle hover:text-theme-text'}`}
                >
                  Pieces <ChevronDown size={12} className="group-hover/pieces:rotate-180 transition-transform"/>
                  {mainFilter === 'Pieces' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
                </button>
                <div className="absolute top-full left-0 mt-2 bg-theme-panel border border-theme-border shadow-2xl opacity-0 invisible group-hover/pieces:opacity-100 group-hover/pieces:visible transition-all duration-300 min-w-[200px] py-4 flex flex-col z-50">
                  {['Seating', 'Tables', 'Lighting', 'Lounge', 'Stools', 'Cupboards', 'Wardrobes', 'Cabinets', 'Beds', 'Dining', 'Decor'].map(cat => (
                    <button key={cat} onClick={() => handleSubFilterSelect('Pieces', cat)} className="text-left px-6 py-2 text-[10px] font-bold tracking-widest uppercase text-theme-text-subtle hover:text-primary hover:bg-theme-border/20 transition-colors">
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative group/collections py-2">
                <button 
                  onClick={() => handleMainFilterSelect('Collections')}
                  className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 flex items-center gap-1 ${mainFilter === 'Collections' ? 'text-primary' : 'text-theme-text-subtle hover:text-theme-text'}`}
                >
                  Collections <ChevronDown size={12} className="group-hover/collections:rotate-180 transition-transform"/>
                  {mainFilter === 'Collections' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
                </button>
                <div className="absolute top-full left-0 mt-2 bg-theme-panel border border-theme-border shadow-2xl opacity-0 invisible group-hover/collections:opacity-100 group-hover/collections:visible transition-all duration-300 min-w-[200px] py-4 flex flex-col z-50">
                  {['Entryway', 'Living', 'Dining', 'Study', 'Sanctuary', 'Wellness', 'Cellar', 'Outdoor', 'Kitchen'].map(cat => (
                    <button key={cat} onClick={() => handleSubFilterSelect('Collections', cat)} className="text-left px-6 py-2 text-[10px] font-bold tracking-widest uppercase text-theme-text-subtle hover:text-primary hover:bg-theme-border/20 transition-colors">
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 md:gap-4 flex-1 md:flex-none justify-end">
              {/* Search Bar */}
              <div className="relative flex items-center h-full flex-1 md:flex-none">
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: typeof window !== 'undefined' && window.innerWidth < 768 ? '100%' : 240, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      className="absolute right-0 md:relative md:right-auto top-1/2 md:top-auto -translate-y-1/2 md:translate-y-0 overflow-hidden z-50 w-full md:w-auto"
                    >
                      <input 
                        type="text"
                        autoFocus
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        className="w-full bg-theme-panel border border-theme-border pl-4 pr-10 py-2 md:py-2.5 text-[10px] font-bold tracking-widest uppercase text-theme-text focus:outline-none focus:border-primary transition-all shadow-sm"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <button 
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className={`z-10 p-2 md:p-2.5 transition-all rounded-full hover:bg-theme-border/30 flex items-center justify-center ${
                    isSearchOpen ? 'text-primary' : 'text-theme-text-muted hover:text-theme-text'
                  }`}
                >
                  {isSearchOpen ? <X size={16} /> : <Search size={16} />}
                </button>
              </div>

              <button 
                onClick={() => setIsFilterOpen(true)}
                className="group relative flex items-center gap-3 bg-white dark:bg-theme-border/30 px-4 md:px-6 py-2 md:py-3 transition-all text-[10px] font-bold tracking-[0.2em] uppercase text-theme-text border border-theme-border overflow-hidden whitespace-nowrap"
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
              <p className="text-3xl font-serif italic text-theme-text">{subFilter ? subFilter : (mainFilter === 'All' ? 'All Items' : mainFilter)}</p>
            </div>
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-theme-text-subtle">
              {filteredProducts.length} Results
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16">
            {filteredProducts.map((product, index) => (
              <React.Fragment key={product.id}>
                {/* Disruptive Collection Banner 1 */}
                {index === 2 && (
                  <div className="col-span-2 md:col-span-2 lg:col-span-3 xl:col-span-4 w-full group relative overflow-hidden bg-theme-panel border border-theme-border flex flex-col md:flex-row-reverse items-center justify-between mb-8 shadow-2xl">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-out group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=1600')" }}></div>
                    <div className="absolute inset-0 bg-theme-panel/40 backdrop-blur-[1px] transition-all duration-700 group-hover:backdrop-blur-none group-hover:bg-theme-panel/20"></div>
                    <div className="relative z-10 p-8 md:p-24 flex flex-col items-start w-full md:w-1/2">
                      <h4 className="text-[#8a6d3b] text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-4 flex items-center gap-4">
                        <span className="w-8 h-px bg-[#8a6d3b]"></span>
                        Featured Exhibition
                      </h4>
                      <h3 className="text-3xl md:text-4xl text-theme-text font-serif italic mb-6 shadow-sm">The Curvature Collection</h3>
                      <p className="text-theme-text-subtle/90 text-sm md:text-base font-light leading-relaxed mb-8 max-w-sm drop-shadow-md">
                        Soft edges meeting brutalist materials. Discover the collection that redefines fluid motion within static space.
                      </p>
                      <button className="group relative px-10 py-5 bg-transparent border border-white/40 text-theme-text overflow-hidden transition-all">
                        <div className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                        <span className="relative z-10 font-sans text-[11px] font-bold tracking-[0.3em] uppercase group-hover:text-theme-panel transition-colors duration-500">View Collection</span>
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Architectural Inspiration Banner after the 5th item */}
                {index === 5 && (
                  <div className="col-span-2 md:col-span-2 lg:col-span-3 xl:col-span-4 w-full group relative overflow-hidden bg-theme-panel border border-theme-border flex flex-col md:flex-row items-center justify-between mb-8 shadow-2xl">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-out group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&q=80&w=1600')" }}></div>
                    <div className="absolute inset-0 bg-theme-panel/40 backdrop-blur-[1px] transition-all duration-700 group-hover:backdrop-blur-none group-hover:bg-theme-panel/20"></div>
                    <div className="relative z-10 p-8 md:p-24 flex flex-col items-start w-full md:w-1/2">
                      <h4 className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-4 flex items-center gap-4">
                        <span className="w-8 h-px bg-primary"></span>
                        Architectural Context
                      </h4>
                      <h3 className="text-3xl md:text-4xl text-theme-text font-serif italic mb-6 shadow-sm">Defining The Volume</h3>
                      <p className="text-theme-text-subtle/90 text-sm md:text-base font-light leading-relaxed mb-8 max-w-sm drop-shadow-md">
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
                  <div className="col-span-2 md:col-span-2 lg:col-span-3 xl:col-span-4 w-full group relative overflow-hidden bg-theme-panel border border-theme-border flex flex-col items-center justify-center text-center mb-8 shadow-2xl min-h-[300px] md:min-h-[400px]">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-out group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&q=80&w=1600')" }}></div>
                    <div className="absolute inset-0 bg-theme-panel/50 transition-all duration-700 group-hover:bg-theme-panel/30"></div>
                    <div className="relative z-10 p-8 md:p-24 flex flex-col items-center max-w-2xl mx-auto">
                      <h4 className="text-[#8a6d3b] text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-4">
                        Material Focus
                      </h4>
                      <h3 className="text-3xl md:text-5xl text-theme-text font-serif italic mb-6">Patinated Bronze</h3>
                      <p className="text-theme-text-subtle/90 text-sm md:text-base font-light leading-relaxed mb-8">
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
                  className={`group flex flex-col relative ${index === 0 || index % 5 === 0 ? 'col-span-2' : 'col-span-1'} md:${index % 7 === 0 ? 'col-span-2' : 'col-span-1'}`}
                >
                  <div className={`relative overflow-hidden bg-theme-panel ${index === 0 || index % 5 === 0 || index % 7 === 0 ? 'aspect-[16/9]' : 'aspect-square'} mb-4 md:mb-6 border-[0.5px] border-theme-border flex items-center justify-center`}>
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 z-10" 
                      referrerPolicy="no-referrer" loading="lazy"
                    />
                    <div className="absolute inset-0 bg-theme-overlay/20 group-hover:bg-theme-overlay/40 transition-colors duration-500 z-15"></div>
                    <div className="absolute inset-0 bg-theme-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none z-20">
                      <span className="border-[0.5px] border-theme-border-strong text-theme-text px-6 md:px-8 py-3 md:py-4 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-sm shadow-xl bg-theme-panel/40">
                        View Details
                      </span>
                    </div>
                    <button 
                      onClick={(e) => toggleWishlist(e, product)}
                      className="absolute top-3 right-3 md:top-4 md:right-4 z-30 w-7 h-7 md:w-8 md:h-8 bg-theme-overlay/60 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-theme-surface hover:text-primary transition-all opacity-0 group-hover:opacity-100 duration-300"
                    >
                      <span className={`material-symbols-outlined text-xs md:text-sm transition-colors ${isInWishlist(product.id) ? 'text-primary fill-current' : 'text-white'}`}>
                        favorite
                      </span>
                    </button>
                    {product.featured && (
                      <div className="absolute top-3 left-3 md:top-4 md:left-4 z-30 bg-primary text-theme-text-inverse text-[7px] md:text-[8px] font-bold uppercase tracking-widest px-2 py-1">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 md:gap-2">
                    <div className="flex justify-between items-start">
                      <span className="text-primary text-[8px] md:text-[10px] uppercase tracking-widest font-bold">
                        {product.category}
                      </span>
                      <span className="text-theme-text-muted text-xs md:text-sm font-light">
                        {product.price}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-4xl text-theme-text font-serif italic group-hover:text-primary transition-colors truncate">
                      {product.name}
                    </h3>
                    <p className="text-theme-text-subtle text-[10px] md:text-xs font-light tracking-wide truncate">
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
