import React from 'react';
import { Link } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import { ArrowRight } from 'lucide-react';

interface CollectionSpotlightProps {
  collectionName: string;
  title?: string;
  description?: string;
}

const CollectionSpotlight: React.FC<CollectionSpotlightProps> = ({ 
  collectionName,
  title,
  description
}) => {
  const { products } = useProduct();

  const collectionProducts = products.filter(
    (p) => p.itemType === 'Collection' && p.collectionName === collectionName
  ).slice(0, 4); // Show top 4 items

  if (collectionProducts.length === 0) return null;

  return (
    <section className="py-24 bg-theme-panel border-t border-theme-border flex flex-col items-center z-10 relative">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block">
              Curated Selection
            </span>
            <h2 className="text-4xl md:text-6xl font-serif italic text-theme-text leading-tight mb-4">
              {title || `The ${collectionName} Collection`}
            </h2>
            <p className="text-theme-text-muted text-lg font-light leading-relaxed">
              {description || `Discover the signature architectural pieces designed specifically for the ${collectionName} environment. Designed as a cohesive family of form.`}
            </p>
          </div>
          <Link 
            to={`/shop?collection=${collectionName}`}
            className="flex-shrink-0 group relative px-8 py-4 bg-transparent border border-theme-border text-theme-text overflow-hidden transition-all inline-flex items-center gap-3 w-fit"
          >
            <div className="absolute inset-0 bg-theme-text -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            <span className="relative z-10 font-sans text-[11px] font-bold tracking-[0.3em] uppercase group-hover:text-theme-base transition-colors duration-500">
              Explore Collection
            </span>
            <ArrowRight size={14} className="relative z-10 group-hover:text-theme-base" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {collectionProducts.map((product) => (
            <Link 
              key={product.id} 
              to={`/shop/${product.slug}`}
              className="group block"
            >
              <div className="aspect-[4/5] bg-theme-surface mb-6 overflow-hidden relative border border-theme-border bg-theme-surface">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-lg font-serif italic text-theme-text mb-2">{product.name}</h3>
              <p className="text-[11px] font-bold tracking-widest uppercase text-theme-text-subtle mb-4">{product.category}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionSpotlight;
