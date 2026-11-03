import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, ShoppingBag, Heart, Sparkles, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EstateSpaceProductsProps {
  space: 'living' | 'dining' | 'sanctuary' | 'study' | 'cellar' | 'wellness' | 'entryway' | 'outdoor';
  spaceTitle: string;
  subtitle?: string;
  collection1: {
    title: string;
    description: string;
  };
  collection2: {
    title: string;
    description: string;
  };
}

const EstateSpaceProducts: React.FC<EstateSpaceProductsProps> = ({
  space,
  spaceTitle,
  subtitle,
  collection1,
  collection2
}) => {
  const { products } = useProduct();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();

  const [activeFilter, setActiveFilter] = useState<'all' | 'col1' | 'col2' | 'signature'>('all');
  const [addedId, setAddedId] = useState<string | null>(null);

  // Filter 10 products for this space
  const spaceProducts = products.filter(
    (p) => p.estateSpace === space || p.collectionName?.toLowerCase() === space.toLowerCase()
  );

  const col1Products = spaceProducts.filter(
    (p) => p.subCollection === collection1.title
  );

  const col2Products = spaceProducts.filter(
    (p) => p.subCollection === collection2.title
  );

  const signatureProducts = spaceProducts.filter(
    (p) => p.subCollection !== collection1.title && p.subCollection !== collection2.title
  );

  const displayedProducts = 
    activeFilter === 'col1' ? col1Products :
    activeFilter === 'col2' ? col2Products :
    activeFilter === 'signature' ? signatureProducts :
    spaceProducts;

  const handleQuickAdd = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    const success = addToCart(product);
    if (success) {
      setAddedId(product.id);
      setTimeout(() => setAddedId(null), 1800);
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <section className="py-28 px-6 md:px-12 lg:px-20 bg-theme-panel border-t border-theme-border relative z-20">
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-primary"></span>
              <span className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase">
                Curated Estate Catalog • 10 Dedicated Pieces
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif italic text-theme-text leading-tight">
              {spaceTitle} <span className="not-italic font-light">Inventory</span>
            </h2>
            <p className="text-theme-text-muted text-base md:text-lg font-light leading-relaxed mt-4">
              {subtitle || `Explore the complete architectural ensemble of 10 bespoke pieces curated specifically for the ${spaceTitle} environment, featuring two distinct collections and signature single commissions.`}
            </p>
          </div>

          <Link
            to={`/shop?collection=${space.charAt(0).toUpperCase() + space.slice(1)}`}
            className="flex-shrink-0 group relative px-8 py-4 bg-transparent border border-theme-border text-theme-text overflow-hidden transition-all inline-flex items-center gap-3 w-fit"
          >
            <div className="absolute inset-0 bg-theme-text -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            <span className="relative z-10 font-sans text-[10px] font-bold tracking-[0.3em] uppercase group-hover:text-theme-base transition-colors duration-500">
              View In Atelier Shop
            </span>
            <ArrowRight size={14} className="relative z-10 group-hover:text-theme-base" />
          </Link>
        </div>

        {/* The Two Curated Collections Spotlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Collection 1 Card */}
          <div 
            onClick={() => setActiveFilter('col1')}
            className={`p-8 md:p-10 border transition-all cursor-pointer relative overflow-hidden group ${
              activeFilter === 'col1' 
                ? 'border-primary bg-primary/5 shadow-xl' 
                : 'border-theme-border bg-theme-surface hover:border-theme-border-strong'
            }`}
          >
            <div className="flex justify-between items-start mb-6">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">
                Collection 01 • {col1Products.length} Pieces
              </span>
              <span className="text-xs font-serif italic text-theme-text-muted">Curated Ensemble</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-serif text-theme-text mb-3">
              {collection1.title}
            </h3>
            <p className="text-theme-text-muted text-sm font-light leading-relaxed mb-6">
              {collection1.description}
            </p>
            <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-primary group-hover:translate-x-1 transition-transform">
              <span>Filter This Collection</span>
              <ArrowRight size={12} />
            </div>
          </div>

          {/* Collection 2 Card */}
          <div 
            onClick={() => setActiveFilter('col2')}
            className={`p-8 md:p-10 border transition-all cursor-pointer relative overflow-hidden group ${
              activeFilter === 'col2' 
                ? 'border-primary bg-primary/5 shadow-xl' 
                : 'border-theme-border bg-theme-surface hover:border-theme-border-strong'
            }`}
          >
            <div className="flex justify-between items-start mb-6">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">
                Collection 02 • {col2Products.length} Pieces
              </span>
              <span className="text-xs font-serif italic text-theme-text-muted">Curated Ensemble</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-serif text-theme-text mb-3">
              {collection2.title}
            </h3>
            <p className="text-theme-text-muted text-sm font-light leading-relaxed mb-6">
              {collection2.description}
            </p>
            <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-primary group-hover:translate-x-1 transition-transform">
              <span>Filter This Collection</span>
              <ArrowRight size={12} />
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between border-b border-theme-border pb-6 mb-12 gap-4">
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-5 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase transition-all rounded-full border ${
                activeFilter === 'all'
                  ? 'bg-primary text-black border-primary'
                  : 'bg-transparent text-theme-text-muted border-theme-border hover:border-primary/40'
              }`}
            >
              All {spaceTitle} Pieces ({spaceProducts.length})
            </button>
            <button
              onClick={() => setActiveFilter('col1')}
              className={`px-5 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase transition-all rounded-full border ${
                activeFilter === 'col1'
                  ? 'bg-primary text-black border-primary'
                  : 'bg-transparent text-theme-text-muted border-theme-border hover:border-primary/40'
              }`}
            >
              {collection1.title} ({col1Products.length})
            </button>
            <button
              onClick={() => setActiveFilter('col2')}
              className={`px-5 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase transition-all rounded-full border ${
                activeFilter === 'col2'
                  ? 'bg-primary text-black border-primary'
                  : 'bg-transparent text-theme-text-muted border-theme-border hover:border-primary/40'
              }`}
            >
              {collection2.title} ({col2Products.length})
            </button>
            {signatureProducts.length > 0 && (
              <button
                onClick={() => setActiveFilter('signature')}
                className={`px-5 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase transition-all rounded-full border ${
                  activeFilter === 'signature'
                    ? 'bg-primary text-black border-primary'
                    : 'bg-transparent text-theme-text-muted border-theme-border hover:border-primary/40'
                }`}
              >
                Signature Standalone ({signatureProducts.length})
              </button>
            )}
          </div>

          <span className="text-[11px] font-mono text-theme-text-muted">
            Displaying {displayedProducts.length} of {spaceProducts.length} artifacts
          </span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {displayedProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group flex flex-col bg-theme-surface border border-theme-border hover:border-primary/50 transition-all duration-500 overflow-hidden relative"
              >
                {/* Image Container */}
                <Link to={`/product/${product.slug}`} className="relative aspect-[4/5] overflow-hidden bg-theme-panel block">
                  <img
                    src={product.images[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800'}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-1 z-10">
                    {product.stock !== undefined && product.stock <= 0 ? (
                      <span className="px-2.5 py-1 text-[8px] font-bold tracking-widest uppercase bg-red-950/95 text-red-300 border border-red-800 shadow-md">
                        Sold Out
                      </span>
                    ) : product.stock !== undefined && product.stock <= 2 ? (
                      <span className="px-2.5 py-1 text-[8px] font-bold tracking-widest uppercase bg-amber-950/90 text-amber-300 border border-amber-700/80 shadow-md">
                        Only {product.stock} Left
                      </span>
                    ) : null}
                    <span className="px-2.5 py-1 text-[8px] font-bold tracking-widest uppercase bg-theme-panel/90 backdrop-blur-md text-primary border border-theme-border">
                      {product.subCollection || spaceTitle}
                    </span>
                    {product.model3d && (
                      <span className="px-2 py-0.5 text-[7px] font-bold tracking-widest uppercase bg-black/80 text-white border border-white/20">
                        3D Inspect
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => handleToggleWishlist(e, product)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-theme-panel/80 backdrop-blur-md border border-theme-border flex items-center justify-center text-theme-text hover:text-primary transition-all duration-300 z-10"
                    title={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart
                      size={15}
                      className={isInWishlist(product.id) ? "fill-primary text-primary" : ""}
                    />
                  </button>

                  {/* Quick Add Overlay */}
                  <div className="absolute bottom-4 inset-x-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 translate-y-2 group-hover:translate-y-0">
                    {product.stock !== undefined && product.stock <= 0 ? (
                      <button
                        disabled
                        className="flex-1 py-3 px-4 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 bg-stone-900/90 text-stone-500 border border-stone-800 cursor-not-allowed shadow-lg"
                      >
                        Sold Out
                      </button>
                    ) : (
                      <button
                        onClick={(e) => handleQuickAdd(e, product)}
                        className={`flex-1 py-3 px-4 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all ${
                          addedId === product.id
                            ? 'bg-green-600 text-white'
                            : 'bg-primary text-black hover:bg-primary-hover shadow-lg'
                        }`}
                      >
                        {addedId === product.id ? (
                          <>
                            <Check size={14} /> Added
                          </>
                        ) : (
                          <>
                            <ShoppingBag size={14} /> Quick Acquire
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </Link>

                {/* Details Section */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-[10px] font-mono tracking-widest uppercase text-theme-text-muted">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-2">
                        {product.stock !== undefined && product.stock <= 0 && (
                          <span className="text-[9px] font-mono font-bold uppercase text-red-400 bg-red-950/40 px-1.5 py-0.5 border border-red-900/40">
                            Depleted
                          </span>
                        )}
                        <span className="text-sm font-semibold text-primary font-mono">
                          {product.price}
                        </span>
                      </div>
                    </div>

                    <Link to={`/product/${product.slug}`}>
                      <h3 className="text-lg font-serif italic text-theme-text group-hover:text-primary transition-colors leading-tight mb-2">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-xs text-theme-text-muted font-light line-clamp-2 leading-relaxed mb-4">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-theme-border flex items-center justify-between text-[10px] text-theme-text-muted">
                    <span className="truncate max-w-[160px] font-light">
                      {product.materials.split(',')[0]}
                    </span>
                    <Link
                      to={`/product/${product.slug}`}
                      className="font-bold tracking-widest uppercase hover:text-primary transition-colors flex items-center gap-1"
                    >
                      Inspect <ArrowRight size={10} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default EstateSpaceProducts;
