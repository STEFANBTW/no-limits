import React, { useState, useRef } from 'react';
import { useCollection, Collection } from '../../context/CollectionContext';
import { useProduct } from '../../context/ProductContext';

export const CollectionsTab = ({ searchQuery = '' }: { searchQuery?: string }) => {
  const { collections, updateCollection, addCollection } = useCollection();
  const { products } = useProduct();
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter collections based on search query
  const filteredCollections = collections.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [formData, setFormData] = useState<Partial<Collection>>({});

  const openEditModal = (collection: Collection) => {
    setEditingCollection(collection);
    setFormData(collection);
  };

  const openAddModal = () => {
    setIsAdding(true);
    setFormData({
      slug: '',
      title: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200',
      productIds: []
    });
  };

  const closeModals = () => {
    setEditingCollection(null);
    setIsAdding(false);
    setFormData({});
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCollection) {
      updateCollection(editingCollection.id, formData);
    } else if (isAdding) {
      addCollection(formData as Omit<Collection, 'id'>);
    }
    closeModals();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const tempUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image: tempUrl }));
    }
  };

  const toggleProduct = (productId: string) => {
    setFormData(prev => {
      const currentIds = prev.productIds || [];
      if (currentIds.includes(productId)) {
        return { ...prev, productIds: currentIds.filter(id => id !== productId) };
      } else {
        return { ...prev, productIds: [...currentIds, productId] };
      }
    });
  };

  return (
    <div className="flex-1 overflow-y-auto animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 bg-[var(--dash-bg-page)]/50 border-b border-[var(--dash-border-subtle)] p-5 md:p-8">
        <div className="max-w-2xl">
          <h1 className="dash-font-page-title font-serif italic text-[var(--dash-text-primary)] mb-2">Curated Realms</h1>
          <p className="dash-font-body text-[var(--dash-text-muted)]">Architect and supervise the aesthetic taxonomies that define our digital landscape.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="h-11 px-8 bg-[var(--dash-accent)] text-white dash-font-action font-bold uppercase tracking-widest hover:bg-[var(--dash-accent-hover)] transition-all flex items-center gap-3 active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Manifest Domain
        </button>
      </div>

      {/* Collections Grid */}
      <div className="px-5 md:px-8 pb-8 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
        {filteredCollections.map((collection, index) => (
          <article key={collection.id} className="group bg-[var(--dash-bg-surface)] border border-[var(--dash-border-subtle)] hover:border-[var(--dash-accent)] transition-all duration-500 overflow-hidden flex flex-col">
            <div className="relative aspect-video overflow-hidden bg-[var(--dash-bg-page)]">
              <img src={collection.image} alt={collection.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--dash-bg-surface)] to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                 <span className="text-[var(--dash-accent)] dash-font-card-title font-bold uppercase tracking-widest block mb-1">/{collection.slug}</span>
                 <h3 className="dash-font-page-title font-serif italic text-[var(--dash-text-primary)]">{collection.title}</h3>
              </div>
            </div>
             
             <div className="p-5 flex-1 flex flex-col">
                <p className="dash-font-body text-[var(--dash-text-muted)] mb-8 line-clamp-2 leading-relaxed">{collection.description}</p>
                
                <div className="mt-auto pt-6 border-t border-[var(--dash-border-subtle)] flex items-center justify-between">
                   <div className="dash-font-card-title text-[var(--dash-text-muted)] font-bold uppercase tracking-widest">
                     {collection.productIds.length} ARTIFACTS
                   </div>
                   
                   <button 
                     onClick={() => openEditModal(collection)} 
                     className="h-10 w-10 border border-[var(--dash-border-subtle)] flex items-center justify-center hover:border-[var(--dash-accent)] hover:text-[var(--dash-accent)] transition-all"
                   >
                     <span className="material-symbols-outlined text-[18px]">edit</span>
                   </button>
                </div>
             </div>
          </article>
        ))}

        {/* Empty State/Add Trigger */}
        <button 
          onClick={openAddModal}
          className="group border border-dashed border-[var(--dash-border-subtle)] hover:border-[var(--dash-accent)] transition-all duration-500 flex flex-col items-center justify-center p-12 gap-4 text-[var(--dash-text-muted)] hover:bg-[var(--dash-accent-muted)]"
        >
           <span className="material-symbols-outlined text-[40px] group-hover:scale-110 transition-transform">add_circle</span>
           <span className="dash-font-action font-bold uppercase tracking-widest group-hover:text-[var(--dash-accent)]">Open New Horizons</span>
        </button>
      </div>

      {/* Modal Infrastructure */}
      {(editingCollection || isAdding) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 px-4 md:px-0 animate-in fade-in duration-300">
          <div className="bg-[var(--dash-bg-surface)] border border-[var(--dash-border-subtle)] w-full max-w-4xl max-h-[90vh] flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-300">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-5 md:p-7 border-b border-[var(--dash-border-subtle)] bg-[var(--dash-bg-page)]/30">
               <div>
                 <span className="text-[var(--dash-accent)] dash-font-card-title font-bold uppercase tracking-widest mb-1 block">Logistics</span>
                 <h2 className="dash-font-page-title font-serif italic text-[var(--dash-text-primary)]">
                   {isAdding ? 'Manifest Domain' : 'Refine Domain Topology'}
                 </h2>
               </div>
               <button onClick={closeModals} className="h-10 w-10 border border-[var(--dash-border-subtle)] flex items-center justify-center hover:border-[var(--dash-accent)] hover:text-[var(--dash-accent)] transition-all">
                 <span className="material-symbols-outlined !text-[18px]">close</span>
               </button>
            </div>

            {/* Scrollable Core */}
            <div className="flex-1 overflow-y-auto p-5 md:p-7 space-y-7 selection:bg-[var(--dash-accent-muted)]">
              <form id="collection-form" onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-3">
                    <label className="dash-font-card-title text-[var(--dash-text-muted)] font-bold uppercase tracking-widest">Formal Title</label>
                    <input required name="title" value={formData.title || ''} onChange={handleChange} className="w-full bg-[var(--dash-bg-page)] border border-[var(--dash-border-subtle)] h-12 px-5 dash-font-body outline-none focus:border-[var(--dash-accent)] transition-all placeholder:text-[var(--dash-text-muted)]/30" placeholder="e.g. Minimalist Sanctuary" />
                  </div>
                  <div className="space-y-3">
                    <label className="dash-font-card-title text-[var(--dash-text-muted)] font-bold uppercase tracking-widest">Routing Identifier</label>
                    <input required name="slug" value={formData.slug || ''} onChange={handleChange} className="w-full bg-[var(--dash-bg-page)] border border-[var(--dash-border-subtle)] h-12 px-5 dash-font-body outline-none focus:border-[var(--dash-accent)] transition-all font-mono" placeholder="slug-format" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="dash-font-card-title text-[var(--dash-text-muted)] font-bold uppercase tracking-widest">Visual Asset URI</label>
                  <div className="flex gap-4">
                    <input required name="image" value={formData.image || ''} onChange={handleChange} className="flex-1 bg-[var(--dash-bg-page)] border border-[var(--dash-border-subtle)] h-12 px-5 dash-font-body outline-none focus:border-[var(--dash-accent)] transition-all" />
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="h-12 px-6 border border-[var(--dash-border-subtle)] dash-font-action font-bold uppercase tracking-widest hover:border-[var(--dash-accent)] hover:text-[var(--dash-accent)] transition-all whitespace-nowrap">
                      Source
                    </button>
                    <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleImageUpload} />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="dash-font-card-title text-[var(--dash-text-muted)] font-bold uppercase tracking-widest">Realm Narrative</label>
                  <textarea required name="description" value={formData.description || ''} onChange={handleChange} className="w-full bg-[var(--dash-bg-page)] border border-[var(--dash-border-subtle)] p-5 dash-font-body outline-none focus:border-[var(--dash-accent)] transition-all min-h-[100px] leading-relaxed" placeholder="Detailed exposition of the collection's intent..." />
                </div>

                {/* Sub-Resource Selection */}
                <div className="pt-10 border-t border-[var(--dash-border-subtle)]">
                  <label className="dash-font-body font-serif italic text-[var(--dash-text-primary)] mb-6 block">Target Artifacts</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {products.map(product => {
                      const isSelected = formData.productIds?.includes(product.id);
                      return (
                        <div 
                          key={product.id}
                          onClick={() => toggleProduct(product.id)}
                          className={`flex items-center gap-4 p-4 border cursor-pointer transition-all ${
                            isSelected ? 'bg-[var(--dash-accent-muted)] border-[var(--dash-accent)] text-[var(--dash-text-primary)]' : 'bg-[var(--dash-bg-page)] border-[var(--dash-border-subtle)] text-[var(--dash-text-muted)] hover:border-[var(--dash-accent)]/50'
                          }`}
                        >
                          <div className={`w-4 h-4 border flex items-center justify-center shrink-0 ${isSelected ? 'border-[var(--dash-accent)] bg-[var(--dash-accent)]' : 'border-[var(--dash-text-muted)]/30'}`}>
                            {isSelected && <span className="material-symbols-outlined !text-[12px] text-white">check</span>}
                          </div>
                          <div className="w-10 h-10 bg-[var(--dash-bg-surface)] border border-[var(--dash-border-subtle)] overflow-hidden shrink-0">
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          <span className="dash-font-card-title font-semibold truncate flex-1 uppercase tracking-tight">{product.name}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </form>
            </div>

            {/* Modal Actions */}
            <div className="p-5 border-t border-[var(--dash-border-subtle)] bg-[var(--dash-bg-page)]/50 flex justify-end gap-3">
               <button type="button" onClick={closeModals} className="px-8 py-3 dash-font-action font-bold uppercase tracking-widest text-[var(--dash-text-muted)] hover:text-[var(--dash-text-primary)] transition-all">Discard Changes</button>
               <button 
                 type="submit" form="collection-form" 
                 className="px-10 py-3 bg-[var(--dash-accent)] text-white dash-font-action font-bold uppercase tracking-widest hover:bg-[var(--dash-accent-hover)] transition-all shadow-lg active:scale-[0.98]"
               >
                 Commit Form
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
