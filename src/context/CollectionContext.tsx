import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Collection {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  productIds: string[];
}

interface CollectionContextType {
  collections: Collection[];
  addCollection: (collection: Omit<Collection, 'id'>) => void;
  updateCollection: (id: string, collection: Partial<Collection>) => void;
  deleteCollection: (id: string) => void;
}

const CollectionContext = createContext<CollectionContextType | undefined>(undefined);

const initialCollections: Collection[] = [
  {
    id: 'c-1',
    title: 'The Vanguard Lounge',
    slug: 'vanguard-lounge',
    description: 'A curated selection of robust, minimal seating and sculptural accents designed for private lounges.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200',
    productIds: ['1', '3']
  },
  {
    id: 'c-2',
    title: 'Silent Dining',
    slug: 'silent-dining',
    description: 'Architectural dining tables and accompanying forms crafted from sustainable deep-woods.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
    productIds: ['2']
  }
];

export const CollectionProvider = ({ children }: { children: ReactNode }) => {
  const [collections, setCollections] = useState<Collection[]>(() => {
    const saved = localStorage.getItem('collections');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialCollections;
      }
    }
    return initialCollections;
  });

  // Save to persistence on change
  React.useEffect(() => {
    localStorage.setItem('collections', JSON.stringify(collections));
  }, [collections]);

  const addCollection = (collection: Omit<Collection, 'id'>) => {
    const newCollection: Collection = {
      ...collection,
      id: `c-${Date.now()}`
    };
    setCollections(prev => [...prev, newCollection]);
  };

  const updateCollection = (id: string, updates: Partial<Collection>) => {
    setCollections(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteCollection = (id: string) => {
    setCollections(prev => prev.filter(c => c.id !== id));
  };

  return (
    <CollectionContext.Provider value={{ collections, addCollection, updateCollection, deleteCollection }}>
      {children}
    </CollectionContext.Provider>
  );
};

export const useCollection = () => {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error('useCollection must be used within a CollectionProvider');
  }
  return context;
};
