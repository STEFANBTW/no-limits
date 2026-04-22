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
    <div className="flex-1 p-0 sm:p-6 md:p-12 pt-20 sm:pt-24 md:pt-28 max-w-7xl mx-auto w-full overflow-y-auto">
      {/* Page Header & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6 px-4 sm:px-0 mt-4 sm:mt-0">
        <div className="max-w-2xl">
          <h1 className="font-headline text-3xl md:text-5xl text-on-surface mb-2 md:mb-3 tracking-tight">Curated Worlds</h1>
          <p className="font-body text-on-surface-variant text-sm md:text-base">Organize and manage the thematic collections presented across the digital gallery.</p>
        </div>
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <button 
            onClick={openAddModal}
            className="bg-primary text-on-primary font-body font-semibold text-sm py-2 px-5 rounded-md hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Create Collection
          </button>
        </div>
      </div>

      {/* Content List */}
      <div className="flex flex-col gap-[2px] w-full">
        
        {filteredCollections.map((collection, index) => (
          <article key={collection.id} className="group bg-surface hover:bg-surface-container-low border border-outline-variant/10 rounded-md transition-all duration-300 flex p-3 pr-4 sm:pr-5 items-center gap-3 md:gap-6 w-full">
            <div className="w-20 sm:w-24 md:w-32 lg:w-48 h-16 sm:h-20 md:h-24 bg-surface-container-lowest shrink-0 rounded-md sm:rounded-lg overflow-hidden relative">
              <img src={collection.image} alt={collection.title} className="w-full h-full object-cover transition-all duration-500" referrerPolicy="no-referrer" />
            </div>
             
             <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-6">
                <div className="min-w-0">
                   <h3 className="font-headline text-lg md:text-xl text-on-surface truncate">{collection.title}</h3>
                   <div className="flex items-center gap-3 mt-1">
                     <span className="font-body text-xs md:text-sm text-on-surface-variant block truncate">{collection.description}</span>
                   </div>
                </div>
                
                <div className="flex items-center gap-4 md:gap-8 justify-between md:justify-end mt-1 md:mt-0">
                   <div className="text-left md:text-right hidden md:block">
                      <div className="font-label text-[10px] text-secondary-fixed-dim uppercase mb-1 tracking-widest">{collection.productIds.length} Items</div>
                      <div className="font-label font-medium text-primary text-sm md:text-base">/{collection.slug}</div>
                   </div>
                   
                   <button onClick={() => openEditModal(collection)} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-surface-container-highest flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all text-on-surface shrink-0">
                     <span className="material-symbols-outlined text-[16px] sm:text-[18px]">edit</span>
                   </button>
                </div>
             </div>
          </article>
        ))}

        {/* Action/Empty State Card */}
        <article onClick={openAddModal} className="group bg-surface border border-dashed border-outline-variant/20 rounded-md hover:border-primary/50 transition-all duration-300 flex items-center justify-center p-6 md:p-8 gap-4 cursor-pointer hover:bg-surface-container-high w-full mt-[2px]">
           <span className="material-symbols-outlined text-primary text-[24px] md:text-[32px] group-hover:scale-110 transition-transform">add_circle</span>
           <span className="font-headline text-lg md:text-xl text-on-surface">Create New Space</span>
        </article>
      </div>

      {/* Edit / Add Modal */}
      {(editingCollection || isAdding) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/80 pb-0 pt-0">
          <div className="bg-theme-surface border-0 md:border md:border-outline-variant/20 flex flex-col w-full h-[100dvh] md:h-[95vh] md:max-w-4xl md:rounded-none shadow-2xl relative overflow-hidden">
            
            {/* Sticky Header */}
            <div className="flex justify-between items-center p-4 md:p-6 border-b border-outline-variant/20 shrink-0 bg-theme-panel">
               <h2 className="text-xl md:text-2xl font-headline text-on-surface m-0">
                 {isAdding ? 'Create Collection' : 'Edit Collection'}
               </h2>
               <button 
                 onClick={closeModals}
                 className="text-on-surface-variant hover:text-error transition-colors flex items-center justify-center w-8 h-8 rounded-full hover:bg-surface-container-highest m-0 p-0"
               >
                 <span className="material-symbols-outlined text-[20px] m-0 p-0">close</span>
               </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4">
              <form id="collection-form" onSubmit={handleSave} className="flex flex-col gap-3 md:gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div className="flex flex-col gap-1 md:gap-2">
                    <label className="text-[9px] text-on-surface-variant uppercase tracking-widest font-bold">Collection Title</label>
                    <input required name="title" value={formData.title || ''} onChange={handleChange} className="bg-theme-base border border-transparent md:border-outline-variant/10 rounded-md text-on-surface font-body p-3 outline-none focus:border-primary transition-colors shadow-inner" />
                  </div>
                  <div className="flex flex-col gap-1 md:gap-2">
                    <label className="text-[9px] text-on-surface-variant uppercase tracking-widest font-bold">Slug (URL Route)</label>
                    <input required name="slug" value={formData.slug || ''} onChange={handleChange} className="bg-theme-base border border-transparent md:border-outline-variant/10 rounded-md text-on-surface font-body p-3 outline-none focus:border-primary transition-colors shadow-inner" />
                  </div>
                </div>

                <div className="flex flex-col gap-1 md:gap-2">
                  <label className="text-[9px] text-on-surface-variant uppercase tracking-widest font-bold">Hero Image URL</label>
                  <div className="flex gap-2">
                    <input required name="image" value={formData.image || ''} onChange={handleChange} className="bg-theme-base border border-transparent md:border-outline-variant/10 rounded-md text-on-surface font-body p-3 outline-none focus:border-primary transition-colors shadow-inner flex-1" />
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="px-4 py-3 bg-theme-base border border-outline-variant/20 hover:border-primary hover:text-primary transition-colors rounded-md font-label text-xs flex items-center justify-center shrink-0">
                      Upload
                    </button>
                    <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleImageUpload} />
                  </div>
                </div>

                <div className="flex flex-col gap-1 md:gap-2">
                  <label className="text-[9px] text-on-surface-variant uppercase tracking-widest font-bold">Brief Description</label>
                  <textarea required name="description" value={formData.description || ''} onChange={handleChange} className="bg-theme-base border border-transparent md:border-outline-variant/10 rounded-md text-on-surface font-body p-3 outline-none focus:border-primary transition-colors shadow-inner min-h-[60px]" />
                </div>

                {/* Products Assignment */}
                <div className="flex flex-col gap-2 pt-4 border-t border-outline-variant/10">
                  <label className="text-[11px] text-on-surface font-headline uppercase tracking-widest font-bold mb-1">Assigned Products</label>
                  <div className="flex flex-wrap gap-2">
                    {products.map(product => {
                      const isSelected = formData.productIds?.includes(product.id);
                      return (
                        <div 
                          key={product.id}
                          onClick={() => toggleProduct(product.id)}
                          className={`flex items-center gap-3 p-2 rounded-lg border cursor-pointer transition-colors w-full sm:w-[calc(50%-0.25rem)] md:w-[calc(33.333%-0.333rem)] ${
                            isSelected ? 'bg-primary/10 border-primary text-primary' : 'bg-theme-base border-outline-variant/10 text-on-surface-variant hover:border-outline-variant/30'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center ${isSelected ? 'border-primary bg-primary' : 'border-outline-variant/50'}`}>
                            {isSelected && <span className="material-symbols-outlined text-[12px] text-on-primary">check</span>}
                          </div>
                          <div className="w-8 h-8 rounded bg-theme-surface shrink-0 overflow-hidden">
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          <span className="font-body text-[10px] md:text-xs truncate flex-1">{product.name}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

              </form>
            </div>

            {/* Sticky Footer */}
            <div className="p-4 md:p-6 border-t border-outline-variant/20 shrink-0 bg-theme-panel flex justify-end gap-3 md:gap-4">
               <button type="button" onClick={closeModals} className="px-5 py-2.5 rounded font-label text-xs md:text-sm text-on-surface-variant hover:bg-theme-base transition-colors border border-transparent">Cancel</button>
               <button type="submit" form="collection-form" className="px-5 md:px-8 py-2.5 rounded font-label font-bold text-xs md:text-sm bg-primary text-theme-text-inverse hover:bg-primary/90 transition-colors shadow-sm">Save Collection</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
