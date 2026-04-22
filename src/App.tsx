import React from 'react';
import { BrowserRouter as Router, useRoutes, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { WishlistProvider } from './context/WishlistContext';
import { ProductProvider } from './context/ProductContext';
import { CollectionProvider } from './context/CollectionContext';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Archive from './pages/Archive';
import Bespoke from './pages/Bespoke';
import Cellar from './pages/Cellar';
import Sanctuary from './pages/Sanctuary';
import Study from './pages/Study';
import Wellness from './pages/Wellness';
import Entryway from './pages/Entryway';
import Dining from './pages/Dining';
import Living from './pages/Living';
import Outdoor from './pages/Outdoor';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';

function AnimatedRoutes() {
  const location = useLocation();
  const element = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/shop', element: <Shop /> },
        { path: '/product/:slug', element: <ProductDetail /> },
        { path: '/archive', element: <Archive /> },
        { path: '/bespoke', element: <Bespoke /> },
        { path: '/cellar', element: <Cellar /> },
        { path: '/sanctuary', element: <Sanctuary /> },
        { path: '/study', element: <Study /> },
        { path: '/wellness', element: <Wellness /> },
        { path: '/entryway', element: <Entryway /> },
        { path: '/dining', element: <Dining /> },
        { path: '/living', element: <Living /> },
        { path: '/outdoor', element: <Outdoor /> },
        { path: '/login', element: <Login /> },
        { path: '/signup', element: <Signup /> },
        { path: '/cart', element: <Cart /> },
        { path: '/checkout', element: <Checkout /> },
        { path: '/account', element: <UserDashboard /> },
        { path: '/dashboard', element: <Navigate to="/account" replace /> },
      ],
    },
    { path: '/admin', element: <AdminDashboard /> },
  ]);

  if (!element) return null;

  return element;
}

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CollectionProvider>
          <CartProvider>
            <OrderProvider>
              <WishlistProvider>
                <Router>
                  <ScrollToTop />
                  <AnimatedRoutes />
                </Router>
              </WishlistProvider>
            </OrderProvider>
          </CartProvider>
        </CollectionProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
