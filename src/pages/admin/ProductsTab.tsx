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
    <div className="flex-1 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-3">
        <div>
          <h1 className="dash-font-page-title font-serif italic text-[var(--dash-text-primary)] mb-1">Inventory Ledger</h1>
          <p className="text-[var(--dash-text-muted)] dash-font-body max-w-2xl">Management of physical artifacts and digital gallery presentation.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-[var(--dash-accent)] text-white dash-font-action font-medium h-11 px-6 hover:bg-[var(--dash-accent-hover)] transition-all ease-out duration-200 flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          New Listing
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-[var(--dash-bg-surface)] border border-[var(--dash-border-subtle)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[var(--dash-bg-page)]/50">
                <th className="px-6 py-4 text-left dash-font-card-title uppercase tracking-widest text-[var(--dash-text-muted)] font-bold border-b border-[var(--dash-border-subtle)]">Product</th>
                <th className="px-6 py-4 text-left dash-font-card-title uppercase tracking-widest text-[var(--dash-text-muted)] font-bold border-b border-[var(--dash-border-subtle)]">Category</th>
                <th className="px-6 py-4 text-left dash-font-card-title uppercase tracking-widest text-[var(--dash-text-muted)] font-bold border-b border-[var(--dash-border-subtle)]">Price</th>
                <th className="px-6 py-4 text-left dash-font-card-title uppercase tracking-widest text-[var(--dash-text-muted)] font-bold border-b border-[var(--dash-border-subtle)]">Status</th>
                <th className="px-6 py-4 text-right dash-font-card-title uppercase tracking-widest text-[var(--dash-text-muted)] font-bold border-b border-[var(--dash-border-subtle)]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--dash-border-subtle)]">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-[var(--dash-bg-page)] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[var(--dash-bg-page)] flex-shrink-0 overflow-hidden border border-[var(--dash-border-subtle)] group-hover:border-[var(--dash-accent)] transition-colors">
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <div className="dash-font-body font-semibold text-[var(--dash-text-primary)]">{product.name}</div>
                        <div className="dash-font-card-title text-[var(--dash-text-muted)]">SKU: {product.id.slice(0, 8)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="dash-font-body text-[var(--dash-text-muted)]">{product.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="dash-font-body font-medium text-[var(--dash-text-primary)]">{product.price}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-500/10 text-green-500 dash-font-card-title font-bold uppercase tracking-wider rounded-none border border-green-500/20">Active</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => openEditModal(product)} 
                      className="inline-flex items-center justify-center w-9 h-9 border border-[var(--dash-border-subtle)] text-[var(--dash-text-muted)] hover:text-[var(--dash-accent)] hover:border-[var(--dash-accent)] transition-all"
                    >
                      <span className="material-symbols-outlined !text-[18px]">edit_note</span>
                    </button>
                  </td>
                </tr>
              ))}
              
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-[var(--dash-text-muted)] italic">
                    No artifacts matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State / Add Placeholder */}
      <button 
        onClick={openAddModal}
        className="w-full mt-6 py-6 border border-dashed border-[var(--dash-border-subtle)] hover:bg-[var(--dash-bg-surface)] hover:border-[var(--dash-accent)] transition-all flex flex-col items-center justify-center gap-2 group"
      >
        <span className="material-symbols-outlined text-[var(--dash-text-muted)] group-hover:text-[var(--dash-accent)] transition-colors">add_circle</span>
        <span className="dash-font-body text-[var(--dash-text-muted)] uppercase tracking-widest font-bold">Incorporate New Piece</span>
      </button>

      {/* Edit / Add Modal */}
      {(editingProduct || isAdding) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-[var(--dash-bg-surface)] border border-[var(--dash-border-subtle)] w-full max-w-3xl flex flex-col max-h-[90vh] shadow-2xl animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-[var(--dash-border-subtle)] bg-[var(--dash-bg-page)]/50">
               <h2 className="dash-font-section-title font-serif italic text-[var(--dash-text-primary)]">
                 {isAdding ? 'Listing Creation' : 'Asset Management'}
               </h2>
               <button onClick={closeModals} className="text-[var(--dash-text-muted)] hover:text-[var(--dash-text-primary)] transition-colors">
                 <span className="material-symbols-outlined">close</span>
               </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-5">
              <form id="product-form" onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="dash-font-card-title font-bold text-[var(--dash-text-muted)] uppercase tracking-widest">Descriptor Title</label>
                    <input 
                      required name="name" value={formData.name || ''} onChange={handleChange} 
                      className="w-full h-11 bg-[var(--dash-bg-page)] border border-[var(--dash-border-subtle)] px-4 text-[var(--dash-text-primary)] focus:border-[var(--dash-accent)] focus:ring-1 focus:ring-[var(--dash-accent)] outline-none transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="dash-font-card-title font-bold text-[var(--dash-text-muted)] uppercase tracking-widest">Valuation (₦)</label>
                    <input 
                      required name="price" value={formData.price || ''} onChange={handleChange} 
                      className="w-full h-11 bg-[var(--dash-bg-page)] border border-[var(--dash-border-subtle)] px-4 text-[var(--dash-text-primary)] focus:border-[var(--dash-accent)] focus:ring-1 focus:ring-[var(--dash-accent)] outline-none transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="dash-font-card-title font-bold text-[var(--dash-text-muted)] uppercase tracking-widest">Collection Domain</label>
                    <input 
                      required name="category" value={formData.category || ''} onChange={handleChange} 
                      className="w-full h-11 bg-[var(--dash-bg-page)] border border-[var(--dash-border-subtle)] px-4 text-[var(--dash-text-primary)] focus:border-[var(--dash-accent)] focus:ring-1 focus:ring-[var(--dash-accent)] outline-none transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="dash-font-card-title font-bold text-[var(--dash-text-muted)] uppercase tracking-widest">URL Slug</label>
                    <input 
                      required name="slug" value={formData.slug || ''} onChange={handleChange} 
                      className="w-full h-11 bg-[var(--dash-bg-page)] border border-[var(--dash-border-subtle)] px-4 text-[var(--dash-text-primary)] focus:border-[var(--dash-accent)] focus:ring-1 focus:ring-[var(--dash-accent)] outline-none transition-all" 
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="dash-font-card-title font-bold text-[var(--dash-text-muted)] uppercase tracking-widest">Visual Assets</label>
                  <div className="flex gap-2">
                    <input 
                      name="imageInput" placeholder="Direct Image URL Integration..." onKeyDown={handleImageUrlAdd} 
                      className="flex-1 h-11 bg-[var(--dash-bg-page)] border border-[var(--dash-border-subtle)] px-4 text-[var(--dash-text-primary)] focus:border-[var(--dash-accent)] outline-none" 
                    />
                    <button 
                      type="button" onClick={() => fileInputRef.current?.click()} 
                      className="h-11 px-4 border border-[var(--dash-border-subtle)] dash-font-action font-bold uppercase tracking-widest text-[var(--dash-text-muted)] hover:bg-[var(--dash-bg-page)] transition-colors"
                    >
                      Local File
                    </button>
                    <input type="file" multiple ref={fileInputRef} hidden accept="image/*" onChange={handleImageUpload} />
                  </div>
                  
                  {/* Thumbnails Row */}
                  {(formData.images?.length || 0) > 0 && (
                    <div className="flex flex-wrap gap-3 py-2">
                      {formData.images?.map((img, i) => (
                        <div key={i} className="relative w-16 h-16 bg-[var(--dash-bg-page)] border border-[var(--dash-border-subtle)] overflow-hidden group">
                          <img src={img} className="w-full h-full object-cover" alt="Product" />
                          <button 
                            type="button" 
                            onClick={() => removeImage(i)}
                            className="absolute inset-0 bg-red-600/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <span className="material-symbols-outlined text-[16px]">remove_circle</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="dash-font-card-title font-bold text-[var(--dash-text-muted)] uppercase tracking-widest">Artifact Composition</label>
                  <input 
                    required name="materials" value={formData.materials || ''} onChange={handleChange} 
                    className="w-full h-11 bg-[var(--dash-bg-page)] border border-[var(--dash-border-subtle)] px-4 text-[var(--dash-text-primary)] focus:border-[var(--dash-accent)] outline-none" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="dash-font-card-title font-bold text-[var(--dash-text-muted)] uppercase tracking-widest">Public Narrative</label>
                  <textarea 
                    required name="description" value={formData.description || ''} onChange={handleChange} 
                    className="w-full h-24 bg-[var(--dash-bg-page)] border border-[var(--dash-border-subtle)] p-4 text-[var(--dash-text-primary)] focus:border-[var(--dash-accent)] outline-none resize-none" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="dash-font-card-title font-bold text-[var(--dash-text-muted)] uppercase tracking-widest">Technical Specifications</label>
                  <textarea 
                    required name="details" value={formData.details || ''} onChange={handleChange} 
                    className="w-full h-24 bg-[var(--dash-bg-page)] border border-[var(--dash-border-subtle)] p-4 text-[var(--dash-text-primary)] focus:border-[var(--dash-accent)] outline-none resize-none" 
                  />
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[var(--dash-border-subtle)] bg-[var(--dash-bg-page)]/50 flex justify-end gap-3">
               <button type="button" onClick={closeModals} className="px-6 py-2.5 dash-font-action font-bold uppercase tracking-widest text-[var(--dash-text-muted)] hover:text-[var(--dash-text-primary)] transition-colors">Discard</button>
               <button 
                 type="submit" form="product-form" 
                 className="px-8 py-2.5 bg-[var(--dash-accent)] text-white dash-font-action font-bold uppercase tracking-widest hover:bg-[var(--dash-accent-hover)] transition-all shadow-md active:scale-[0.98]"
               >
                 Confirm Listing
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
