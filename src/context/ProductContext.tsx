import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { products as initialProducts } from '../data/products';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: string;
  description: string;
  details: string;
  materials: string;
  dimensions: {
    height: string;
    width: string;
    depth: string;
    seatHeight?: string;
  };
  images: string[];
  model3d?: string;
  featured?: boolean;
  itemType?: 'Piece' | 'Collection';
  collectionName?: string;
}

interface ProductContextType {
  products: Product[];
  updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('nolimits_products');
    let baseProducts = initialProducts;
    
    if (saved) {
      const parsedSaved = JSON.parse(saved);
      // Merge: keep saved data BUT ensure objects from initialProducts that have new 
      // properties (like model3d) are updated if the saved ones are missing them.
      return baseProducts.map(initial => {
        const savedProd = parsedSaved.find((p: Product) => p.id === initial.id);
        if (savedProd) {
          // If we specifically updated the Sculpture Ottoman images to fix the 'cat' issue, 
          // we should prioritize initialProducts for it right now.
          if (initial.id === '4') return initial; 
          
          return { ...initial, ...savedProd };
        }
        return initial;
      });
    }
    return baseProducts;
  });

  useEffect(() => {
    localStorage.setItem('nolimits_products', JSON.stringify(products));
  }, [products]);

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts(prevProducts => 
      prevProducts.map(p => p.id === id ? { ...p, ...updatedFields } : p)
    );
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: Math.random().toString(36).substr(2, 9),
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  return (
    <ProductContext.Provider value={{ products, updateProduct, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};
