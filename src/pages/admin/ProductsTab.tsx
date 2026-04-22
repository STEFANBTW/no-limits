import React, { useState, useRef } from 'react';
import { useProduct, Product } from '../../context/ProductContext';

export const ProductsTab = ({ searchQuery = '' }: { searchQuery?: string }) => {
  const { products, updateProduct, addProduct } = useProduct();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter products based on search query
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.materials.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [formData, setFormData] = useState<Partial<Product>>({});

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
  };

  const openAddModal = () => {
    setIsAdding(true);
    setFormData({
      slug: '',
      name: '',
      category: 'Seating',
      price: '',
      description: '',
      details: '',
      materials: '',
      images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200']
    });
  };

  const closeModals = () => {
    setEditingProduct(null);
    setIsAdding(false);
    setFormData({});
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
    } else if (isAdding) {
      addProduct(formData as Omit<Product, 'id'>);
    }
    closeModals();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'image') {
      setFormData(prev => ({ ...prev, images: [value] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setFormData(prev => ({ ...prev, images: [...(prev.images || []), ...newImages] }));
    }
  };

  const handleImageUrlAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = e.currentTarget.value;
      if (val) {
        setFormData(prev => ({ ...prev, images: [...(prev.images || []), val] }));
        e.currentTarget.value = '';
      }
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({ ...prev, images: prev.images?.filter((_, i) => i !== index) }));
  };

  return (
    <div className="flex-1 p-0 sm:p-6 md:p-12 pt-20 sm:pt-24 md:pt-28 max-w-7xl mx-auto w-full overflow-y-auto">
      {/* Page Header & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6 px-4 sm:px-0 mt-4 sm:mt-0">
        <div className="max-w-2xl">
          <h1 className="font-headline text-3xl md:text-5xl text-on-surface mb-2 md:mb-3 tracking-tight">Products & Collections</h1>
          <p className="font-body text-on-surface-variant text-sm md:text-base">Curate and manage your atelier's offerings. Edit products directly from the CMS.</p>
        </div>
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <button 
            onClick={openAddModal}
            className="bg-primary text-on-primary font-body font-semibold text-sm py-2 px-5 rounded-md hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Add New Piece
          </button>
        </div>
      </div>

      {/* Content Grid -> Content List */}
      <div className="flex flex-col gap-[2px] w-full">
        
        {filteredProducts.map((product, index) => (
          <article key={product.id} className="group bg-surface hover:bg-surface-container-low border border-outline-variant/10 rounded-md transition-all duration-300 flex p-3 pr-4 sm:pr-5 items-center gap-3 md:gap-6 w-full">
             <div className="w-20 sm:w-24 md:w-32 lg:w-48 h-16 sm:h-20 md:h-24 bg-surface-container-lowest shrink-0 rounded-md sm:rounded-lg overflow-hidden relative">
               <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition-all duration-500" referrerPolicy="no-referrer" />
             </div>
             
             <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-6">
                <div className="min-w-0">
                   <h3 className="font-headline text-lg md:text-xl text-on-surface truncate">{product.name}</h3>
                   <div className="flex items-center gap-3 mt-1">
                     <span className="font-body text-xs md:text-sm text-on-surface-variant block truncate">{product.category}</span>
                     <span className="bg-primary-container/20 text-primary border border-primary/30 px-1.5 py-0.5 rounded text-[9px] font-label uppercase tracking-widest leading-none">Active</span>
                   </div>
                </div>
                
                <div className="flex items-center gap-4 md:gap-8 justify-between md:justify-end mt-1 md:mt-0">
                   <div className="text-left md:text-right">
                      <div className="font-label text-[10px] text-secondary-fixed-dim uppercase hidden md:block mb-1 tracking-widest">SKU: {product.id.slice(0,6)}</div>
                      <div className="font-label font-medium text-primary text-sm md:text-base">{product.price}</div>
                   </div>
                   
                   <button onClick={() => openEditModal(product)} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-surface-container-highest flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all text-on-surface shrink-0">
                     <span className="material-symbols-outlined text-[16px] sm:text-[18px]">edit</span>
                   </button>
                </div>
             </div>
          </article>
        ))}

        {/* Action/Empty State Card */}
        <article onClick={openAddModal} className="group bg-surface border border-dashed border-outline-variant/20 rounded-md hover:border-primary/50 transition-all duration-300 flex items-center justify-center p-6 md:p-8 gap-4 cursor-pointer hover:bg-surface-container-high w-full mt-[2px]">
           <span className="material-symbols-outlined text-primary text-[24px] md:text-[32px] group-hover:scale-110 transition-transform">add_circle</span>
           <span className="font-headline text-lg md:text-xl text-on-surface">Add New Piece</span>
        </article>
      </div>

      {/* Edit / Add Modal */}
      {(editingProduct || isAdding) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/80 pb-0 pt-0">
          <div className="bg-theme-surface border-0 md:border md:border-outline-variant/20 flex flex-col w-full h-[100dvh] md:h-[95vh] md:max-w-4xl md:rounded-none shadow-2xl relative overflow-hidden">
            
            {/* Sticky Header */}
            <div className="flex justify-between items-center p-4 md:p-6 border-b border-outline-variant/20 shrink-0 bg-theme-panel">
               <h2 className="text-xl md:text-2xl font-headline text-on-surface m-0">
                 {isAdding ? 'Add New Product' : 'Edit Product'}
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
              <form id="product-form" onSubmit={handleSave} className="flex flex-col gap-3 md:gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div className="flex flex-col gap-1 md:gap-2">
                    <label className="text-[9px] text-on-surface-variant uppercase tracking-widest font-bold">Product Name</label>
                    <input required name="name" value={formData.name || ''} onChange={handleChange} className="bg-theme-base border border-transparent md:border-outline-variant/10 rounded-md text-on-surface font-body p-3 outline-none focus:border-primary transition-colors shadow-inner" />
                  </div>
                  <div className="flex flex-col gap-1 md:gap-2">
                    <label className="text-[9px] text-on-surface-variant uppercase tracking-widest font-bold">Price (e.g. ₦4,500)</label>
                    <input required name="price" value={formData.price || ''} onChange={handleChange} className="bg-theme-base border border-transparent md:border-outline-variant/10 rounded-md text-on-surface font-body p-3 outline-none focus:border-primary transition-colors shadow-inner" />
                  </div>
                  <div className="flex flex-col gap-1 md:gap-2">
                    <label className="text-[9px] text-on-surface-variant uppercase tracking-widest font-bold">Category</label>
                    <input required name="category" value={formData.category || ''} onChange={handleChange} className="bg-theme-base border border-transparent md:border-outline-variant/10 rounded-md text-on-surface font-body p-3 outline-none focus:border-primary transition-colors shadow-inner" />
                  </div>
                  <div className="flex flex-col gap-1 md:gap-2">
                    <label className="text-[9px] text-on-surface-variant uppercase tracking-widest font-bold">Slug (URL)</label>
                    <input required name="slug" value={formData.slug || ''} onChange={handleChange} className="bg-theme-base border border-transparent md:border-outline-variant/10 rounded-md text-on-surface font-body p-3 outline-none focus:border-primary transition-colors shadow-inner" />
                  </div>
                </div>

                <div className="flex flex-col gap-1 md:gap-2">
                  <label className="text-[9px] text-on-surface-variant uppercase tracking-widest font-bold">Image URLs (Press Enter to add)</label>
                  <div className="flex gap-2">
                    <input name="imageInput" placeholder="Paste URL and press Enter..." onKeyDown={handleImageUrlAdd} className="bg-theme-base border border-transparent md:border-outline-variant/10 rounded-md text-on-surface font-body p-3 outline-none focus:border-primary transition-colors shadow-inner flex-1" />
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="px-4 py-3 bg-theme-base border border-outline-variant/20 hover:border-primary hover:text-primary transition-colors rounded-md font-label text-xs flex items-center justify-center shrink-0">
                      Upload Files
                    </button>
                    <input type="file" multiple ref={fileInputRef} hidden accept="image/*" onChange={handleImageUpload} />
                  </div>
                  
                  {/* Thumbnails Row */}
                  {(formData.images?.length || 0) > 0 && (
                    <div className="flex flex-wrap gap-2 py-2 max-w-full">
                      {formData.images?.map((img, i) => (
                        <div key={i} className="relative w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-md overflow-hidden bg-theme-base group">
                          <img src={img} className="w-full h-full object-cover" alt="Product" />
                          <button 
                            type="button" 
                            onClick={() => {
                              const newImages = formData.images?.filter((_, index) => index !== i);
                              setFormData(prev => ({ ...prev, images: newImages }));
                            }} 
                            className="absolute top-1 right-1 bg-red-600/80 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] opacity-100 transition-opacity"
                          >
                            <span className="material-symbols-outlined text-[12px]">delete</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1 md:gap-2">
                  <label className="text-[9px] text-on-surface-variant uppercase tracking-widest font-bold">Materials</label>
                  <input required name="materials" value={formData.materials || ''} onChange={handleChange} className="bg-theme-base border border-transparent md:border-outline-variant/10 rounded-md text-on-surface font-body p-3 outline-none focus:border-primary transition-colors shadow-inner" />
                </div>

                <div className="flex flex-col gap-1 md:gap-2">
                  <label className="text-[9px] text-on-surface-variant uppercase tracking-widest font-bold">Description</label>
                  <textarea required name="description" value={formData.description || ''} onChange={handleChange} className="bg-theme-base border border-transparent md:border-outline-variant/10 rounded-md text-on-surface font-body p-3 outline-none focus:border-primary transition-colors shadow-inner min-h-[60px]" />
                </div>

                <div className="flex flex-col gap-1 md:gap-2">
                  <label className="text-[9px] text-on-surface-variant uppercase tracking-widest font-bold">Details</label>
                  <textarea required name="details" value={formData.details || ''} onChange={handleChange} className="bg-theme-base border border-transparent md:border-outline-variant/10 rounded-md text-on-surface font-body p-3 outline-none focus:border-primary transition-colors shadow-inner min-h-[60px]" />
                </div>
              </form>
            </div>

            {/* Sticky Footer */}
            <div className="p-4 md:p-6 border-t border-outline-variant/20 shrink-0 bg-theme-panel flex justify-end gap-3 md:gap-4">
               <button type="button" onClick={closeModals} className="px-5 py-2.5 rounded font-label text-xs md:text-sm text-on-surface-variant hover:bg-theme-base transition-colors border border-transparent">Cancel</button>
               <button type="submit" form="product-form" className="px-5 md:px-8 py-2.5 rounded font-label font-bold text-xs md:text-sm bg-primary text-theme-text-inverse hover:bg-primary/90 transition-colors shadow-sm">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
