import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from './admin/AdminLayout';
import { DashboardTab } from './admin/DashboardTab';
import { ProductsTab } from './admin/ProductsTab';
import { CollectionsTab } from './admin/CollectionsTab';
import { OrdersTab } from './admin/OrdersTab';
import { TeamTab } from './admin/TeamTab';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'products':
        return <ProductsTab searchQuery={searchQuery} />;
      case 'collections':
        return <CollectionsTab searchQuery={searchQuery} />;
      case 'inquiries':
        return <OrdersTab searchQuery={searchQuery} />;
      case 'team':
        return <TeamTab searchQuery={searchQuery} />;
      default:
        return (
          <div className="pt-28 pb-12 px-6 md:px-12 flex-1 flex items-center justify-center">
            <p className="text-on-surface-variant font-headline text-2xl">This module is under construction.</p>
          </div>
        );
    }
  };

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab} searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
      {renderContent()}
    </AdminLayout>
  );
};

export default AdminDashboard;
