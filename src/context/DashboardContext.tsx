import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useOrder } from './OrderContext';
import { useAuth } from './AuthContext';
import { Product } from './ProductContext';

export type UIMood = 'Standard' | 'Satin Night' | 'Brutalist Raw';

interface MoodboardProject {
  id: string;
  name: string;
  products: Product[];
}

interface DashboardContextType {
  mood: UIMood;
  setMood: (mood: UIMood) => void;
  projects: MoodboardProject[];
  addToProject: (projectId: string, product: Product) => void;
  createProject: (name: string) => void;
  userTier: 'Client' | 'Patron';
  totalSpend: number;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const { getUserOrders } = useOrder();
  const [mood, setMood] = useState<UIMood>(() => {
    return (localStorage.getItem('dash_mood') as UIMood) || 'Standard';
  });
  const [projects, setProjects] = useState<MoodboardProject[]>(() => {
    const saved = localStorage.getItem('dash_projects');
    return saved ? JSON.parse(saved) : [
      { id: 'proj-1', name: 'The West Wing Lounge', products: [] },
      { id: 'proj-2', name: 'Master Sanctuary', products: [] }
    ];
  });

  const orders = user ? getUserOrders(user.id) : [];
  const totalSpend = orders.reduce((sum, order) => sum + order.total, 0);
  const userTier = totalSpend > 5000000 ? 'Patron' : 'Client'; // 5M Naira threshold for Patron

  useEffect(() => {
    localStorage.setItem('dash_mood', mood);
  }, [mood]);

  useEffect(() => {
    localStorage.setItem('dash_projects', JSON.stringify(projects));
  }, [projects]);

  const createProject = (name: string) => {
    const newProject: MoodboardProject = {
      id: `proj-${Math.random().toString(36).substr(2, 9)}`,
      name,
      products: []
    };
    setProjects(prev => [...prev, newProject]);
  };

  const addToProject = (projectId: string, product: Product) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        // Prevent duplicates
        if (p.products.find(prod => prod.id === product.id)) return p;
        return { ...p, products: [...p.products, product] };
      }
      return p;
    }));
  };

  return (
    <DashboardContext.Provider value={{ mood, setMood, projects, addToProject, createProject, userTier, totalSpend }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
