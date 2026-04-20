import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from './admin/AdminLayout';
import { DashboardTab } from './admin/DashboardTab';
import { ProductsTab } from './admin/ProductsTab';
import { OrdersTab } from './admin/OrdersTab';
import { TeamTab } from './admin/TeamTab';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

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
      case 'collections':
        return <ProductsTab />;
      case 'inquiries':
        return <OrdersTab />;
      case 'team':
        return <TeamTab />;
      default:
        return (
          <div className="pt-28 pb-12 px-6 md:px-12 flex-1 flex items-center justify-center">
            <p className="text-on-surface-variant font-headline text-2xl">This module is under construction.</p>
          </div>
        );
    }
  };

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </AdminLayout>
  );
};

export default AdminDashboard;
