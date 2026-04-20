import React, { useState } from 'react';
import { useProduct, Product } from '../../context/ProductContext';

export const ProductsTab = () => {
  const { products, updateProduct, addProduct } = useProduct();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);

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

  return (
    <div className="flex-1 p-6 md:p-12 pt-28 max-w-7xl mx-auto w-full overflow-y-auto">
      {/* Page Header & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div className="max-w-2xl">
          <h1 className="font-headline text-4xl md:text-5xl text-on-surface mb-3 tracking-tight">Products & Collections</h1>
          <p className="font-body text-on-surface-variant text-base">Curate and manage your atelier's offerings. Edit products directly from the CMS.</p>
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

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        
        {products.map((product) => (
          <article key={product.id} className="group relative bg-surface-container border border-outline-variant/10 rounded-xl overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-500 h-[400px] flex flex-col">
            <div className="relative h-2/3 w-full overflow-hidden bg-surface-container-low">
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 mix-blend-luminosity hover:mix-blend-normal"
                referrerPolicy="no-referrer"
              />
              {/* Top Actions (Glassmorphism overlay on hover) */}
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <button 
                   onClick={() => openEditModal(product)}
                   className="material-symbols-outlined text-on-surface bg-surface-bright/60 backdrop-blur-md p-2 rounded-full cursor-pointer hover:bg-primary hover:text-on-primary transition-colors text-[18px]"
                >
                  edit
                </button>
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-1 justify-between bg-surface-container">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-headline text-xl text-on-surface">{product.name}</h3>
                  <span className="bg-primary-container/20 text-primary border border-primary/30 px-2 py-0.5 rounded text-[10px] font-label uppercase tracking-widest">Active</span>
                </div>
                <p className="font-body text-sm text-on-surface-variant truncate">{product.category}</p>
              </div>
              <div className="flex justify-between items-end mt-4">
                <span className="font-label font-medium text-primary">{product.price}</span>
                <span className="font-label text-[10px] text-secondary-fixed-dim uppercase">SKU: {product.id.slice(0, 6).toUpperCase()}</span>
              </div>
            </div>
          </article>
        ))}

        {/* Action/Empty State Card */}
        <article 
          onClick={openAddModal}
          className="group relative bg-surface-container-low border border-outline-variant/15 border-dashed rounded-xl overflow-hidden cursor-pointer hover:bg-surface-container hover:border-outline-variant/40 transition-all duration-300 h-[400px] flex flex-col items-center justify-center p-8 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
            <span className="material-symbols-outlined text-primary text-[32px]">add</span>
          </div>
          <h3 className="font-headline text-2xl text-on-surface mb-2">Add New Piece</h3>
          <p className="font-body text-sm text-on-surface-variant max-w-xs mx-auto">Create a new product listing for the catalog.</p>
        </article>
      </div>

      {/* Edit / Add Modal */}
      {(editingProduct || isAdding) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-surface-container border border-outline-variant/20 rounded-xl p-8 max-w-2xl w-full shadow-2xl relative my-8">
            <button 
              onClick={closeModals}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-error transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h2 className="text-3xl font-headline text-on-surface mb-6">
              {isAdding ? 'Add New Product' : 'Edit Product'}
            </h2>

            <form onSubmit={handleSave} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Product Name</label>
                  <input required name="name" value={formData.name || ''} onChange={handleChange} className="bg-surface-container-highest border-0 border-b border-outline-variant/40 text-on-surface font-body p-3 focus:ring-0 focus:border-primary focus:bg-surface-bright/20" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Price (e.g. ₦4,500)</label>
                  <input required name="price" value={formData.price || ''} onChange={handleChange} className="bg-surface-container-highest border-0 border-b border-outline-variant/40 text-on-surface font-body p-3 focus:ring-0 focus:border-primary focus:bg-surface-bright/20" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Category</label>
                  <input required name="category" value={formData.category || ''} onChange={handleChange} className="bg-surface-container-highest border-0 border-b border-outline-variant/40 text-on-surface font-body p-3 focus:ring-0 focus:border-primary focus:bg-surface-bright/20" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Slug (URL)</label>
                  <input required name="slug" value={formData.slug || ''} onChange={handleChange} className="bg-surface-container-highest border-0 border-b border-outline-variant/40 text-on-surface font-body p-3 focus:ring-0 focus:border-primary focus:bg-surface-bright/20" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Image URL</label>
                <input required name="image" value={formData.images?.[0] || ''} onChange={handleChange} className="bg-surface-container-highest border-0 border-b border-outline-variant/40 text-on-surface font-body p-3 focus:ring-0 focus:border-primary focus:bg-surface-bright/20" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Materials</label>
                <input required name="materials" value={formData.materials || ''} onChange={handleChange} className="bg-surface-container-highest border-0 border-b border-outline-variant/40 text-on-surface font-body p-3 focus:ring-0 focus:border-primary focus:bg-surface-bright/20" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Description</label>
                <textarea required name="description" value={formData.description || ''} onChange={handleChange} className="bg-surface-container-highest border-0 border-b border-outline-variant/40 text-on-surface font-body p-3 focus:ring-0 focus:border-primary focus:bg-surface-bright/20 min-h-[80px]" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Details</label>
                <textarea required name="details" value={formData.details || ''} onChange={handleChange} className="bg-surface-container-highest border-0 border-b border-outline-variant/40 text-on-surface font-body p-3 focus:ring-0 focus:border-primary focus:bg-surface-bright/20 min-h-[80px]" />
              </div>

              <div className="pt-6 flex justify-end gap-4">
                <button type="button" onClick={closeModals} className="px-6 py-2 rounded font-label text-sm text-on-surface-variant hover:bg-surface-container-high transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-2 rounded font-label font-bold text-sm bg-primary text-on-primary hover:bg-primary-dim transition-colors">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
