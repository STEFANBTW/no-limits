import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, SlidersHorizontal, ChevronDown, Star } from 'lucide-react';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
  currentFilters: any;
  categories: string[];
}

const FilterPanel: React.FC<FilterPanelProps> = ({ isOpen, onClose, onApply, currentFilters, categories }) => {
  const [filters, setFilters] = useState(currentFilters);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('categories');

  useEffect(() => {
    if (isOpen) {
      setFilters(currentFilters);
    }
  }, [isOpen, currentFilters]);

  const toggleCategory = (cat: string) => {
    const newCats = filters.categories.includes(cat)
      ? filters.categories.filter((c: string) => c !== cat)
      : [...filters.categories, cat];
    setFilters({ ...filters, categories: newCats });
  };

  const toggleMaterial = (mat: string) => {
    const newMats = filters.materials.includes(mat)
      ? filters.materials.filter((m: string) => m !== mat)
      : [...filters.materials, mat];
    setFilters({ ...filters, materials: newMats });
  };

  const materials = ['Walnut', 'Oak', 'Brass', 'Velvet', 'Leather', 'Ash', 'Beech'];
  const colors = [
    { name: 'Obsidian', hex: '#1a1a1a' },
    { name: 'Cognac', hex: '#8b4513' },
    { name: 'Midnight', hex: '#191970' },
    { name: 'Natural', hex: '#d2b48c' },
    { name: 'Bronze', hex: '#cd7f32' },
    { name: 'Ebonized', hex: '#000000' }
  ];

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      categories: [],
      priceRange: [0, 20000],
      materials: [],
      colors: [],
      rating: 0,
      model3dOnly: false
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-theme-overlay backdrop-blur-sm z-[100]"
          />
          
          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-[400px] bg-theme-base border-l border-theme-border z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="px-8 pt-2 pb-2 border-b border-theme-border flex items-center justify-between">
              <h2 className="text-xl font-serif italic text-theme-text tracking-wide">Refine Curation</h2>
              <button onClick={onClose} className="p-2 hover:bg-theme-surface rounded-full transition-colors text-theme-text-muted hover:text-primary">
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-8 pt-8 pb-6 scrollbar-none space-y-12">
              {/* Categories / Type */}
              <div className="relative group">
                <span className="absolute -top-6 left-0 text-[0.6rem] font-sans tracking-[0.2em] uppercase text-[#54524F] transition-colors group-hover:text-primary">
                  Artifact Classification
                </span>
                <div className="flex flex-wrap gap-2 pt-2">
                  {['All', ...categories].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        if (cat === 'All') {
                          setFilters({ ...filters, categories: [] });
                        } else {
                          toggleCategory(cat);
                        }
                      }}
                      className={`text-[9px] py-2 px-5 transition-all border ${
                        (cat === 'All' && filters.categories.length === 0) || filters.categories.includes(cat)
                          ? 'bg-primary text-theme-text-inverse border-primary'
                          : 'bg-transparent text-theme-text-muted border-theme-border hover:border-theme-border-strong hover:text-theme-text'
                      } font-black tracking-widest uppercase`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Architectural Origin Dropdown Pattern */}
              <div className="relative group">
                <div className="w-full bg-transparent border-b border-theme-border py-3 px-0 text-theme-text flex items-center justify-between cursor-not-allowed">
                  <span className="text-[13px] text-theme-text-muted">Global Selection</span>
                  <ChevronDown className="w-4 h-4 text-theme-text-subtle" />
                </div>
                <label className="absolute -top-4 left-0 text-[0.6rem] transition-all pointer-events-none uppercase tracking-[0.2em] font-sans text-[#54524F]">
                  Region of Origin
                </label>
              </div>

              {/* Price Range */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                   <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-theme-text-subtle">Price Threshold</span>
                   <span className="text-[10px] font-mono text-primary">${filters.priceRange[0]} — ${filters.priceRange[1]}</span>
                </div>
                <div className="relative h-1 bg-theme-border/50 rounded-full mt-4">
                  <input 
                    type="range" 
                    min="0" 
                    max="20000" 
                    step="500"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters({ ...filters, priceRange: [filters.priceRange[0], parseInt(e.target.value)] })}
                    className="absolute inset-0 w-full h-1 bg-transparent appearance-none cursor-pointer accent-primary"
                  />
                  <div 
                    className="h-full bg-primary/40 rounded-full" 
                    style={{ width: `${(filters.priceRange[1] / 20000) * 100}%` }}
                  />
                </div>
              </div>

              {/* Materials - Accordion style from Image 2 */}
              <div className="space-y-4 pt-4 border-t border-theme-border">
                <button 
                  onClick={() => toggleAccordion('materials')}
                  className="w-full flex items-center justify-between text-[10px] font-bold tracking-[0.3em] uppercase text-theme-text-subtle hover:text-theme-text transition-colors"
                >
                  Substance & Composition
                  <ChevronDown size={14} className={`transform transition-transform ${activeAccordion === 'materials' ? 'rotate-180' : ''}`} />
                </button>
                {activeAccordion === 'materials' && (
                  <div className="grid grid-cols-2 gap-y-4 pt-4">
                    {materials.map((mat) => (
                      <button
                        key={mat}
                        onClick={() => toggleMaterial(mat)}
                        className="flex items-center gap-3 group"
                      >
                        <div className={`w-5 h-5 border transition-all flex items-center justify-center ${
                          filters.materials.includes(mat) ? 'bg-primary border-primary' : 'border-theme-border group-hover:border-white/30'
                        }`}>
                          {filters.materials.includes(mat) && <X size={12} className="text-theme-text" />}
                        </div>
                        <span className={`text-[10px] font-bold tracking-widest uppercase ${
                          filters.materials.includes(mat) ? 'text-theme-text' : 'text-theme-text-subtle group-hover:text-theme-text-muted'
                        }`}>
                          {mat}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Tones / Colors */}
              <div className="space-y-6 pt-4 border-t border-theme-border">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-theme-text-subtle">Color Palette</span>
                  <button className="text-[9px] font-bold text-primary uppercase tracking-widest hover:underline">Show All</button>
                </div>
                <div className="flex flex-wrap gap-5 pt-2">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => {
                        const newColors = filters.colors.includes(color.name)
                          ? filters.colors.filter((c: string) => c !== color.name)
                          : [...filters.colors, color.name];
                        setFilters({ ...filters, colors: newColors });
                      }}
                      className="group flex flex-col items-center gap-3"
                    >
                      <div 
                        className={`w-10 h-10 rounded-full border transition-all duration-300 shadow-xl ${
                          filters.colors.includes(color.name) ? 'border-primary ring-4 ring-primary/10 scale-110' : 'border-theme-border'
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className={`text-[7px] font-bold tracking-widest uppercase transition-colors ${
                        filters.colors.includes(color.name) ? 'text-theme-text' : 'text-slate-600 group-hover:text-theme-text-subtle'
                      }`}>
                        {color.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Exclusivity Rating */}
              <div className="space-y-6 pt-4 border-t border-theme-border">
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-theme-text-subtle block">Exclusivity Rating</span>
                <div className="flex flex-col gap-4">
                  {[5, 4, 3].map((r) => (
                    <button
                      key={r}
                      onClick={() => setFilters({ ...filters, rating: r })}
                      className="flex items-center gap-4 group"
                    >
                      <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${
                        filters.rating === r ? 'border-primary bg-primary' : 'border-theme-border-strong group-hover:border-theme-border-strong'
                      }`}>
                        {filters.rating === r && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                      <div className="flex items-center gap-1.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={i < r ? 'text-primary fill-current' : 'text-theme-surface'} />
                        ))}
                      </div>
                      <span className={`text-[9px] font-bold tracking-[0.2em] uppercase transition-colors ${
                        filters.rating === r ? 'text-theme-text' : 'text-theme-text-muted group-hover:text-primary'
                      }`}>
                        {r === 5 ? 'Private Selection' : '& Above'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive 3D Feature */}
              <div className="space-y-6 pt-4 border-t border-theme-border">
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-theme-text-subtle block">Digital Experience</span>
                <button
                  onClick={() => setFilters({ ...filters, model3dOnly: !filters.model3dOnly })}
                  className="flex items-center gap-4 group w-full"
                >
                  <div className={`w-10 h-5 border transition-all relative ${
                    filters.model3dOnly ? 'bg-primary border-primary' : 'bg-theme-surface border-theme-border'
                  }`}>
                    <div className={`absolute top-0.5 w-3.5 h-3.5 bg-white transition-all ${
                      filters.model3dOnly ? 'left-[22px]' : 'left-0.5'
                    }`} />
                  </div>
                  <span className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors ${
                    filters.model3dOnly ? 'text-theme-text' : 'text-theme-text-muted group-hover:text-theme-text'
                  }`}>
                    Interactive 3D Models Only
                  </span>
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-6 border-t border-theme-border bg-theme-base flex items-center gap-4">
              <button 
                onClick={handleReset}
                className="group relative flex-1 h-14 border border-theme-border overflow-hidden transition-all text-theme-text-muted hover:text-theme-text"
              >
                <div className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10 text-[9px] font-bold uppercase tracking-[0.2em] group-hover:text-black transition-colors duration-500">Reset</span>
              </button>
              <button 
                onClick={handleApply}
                className="group relative flex-[2] h-14 bg-white dark:bg-theme-panel border border-theme-border overflow-hidden transition-all text-theme-text"
              >
                <div className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.3em] group-hover:text-black transition-colors duration-500">Apply Filters</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FilterPanel;
