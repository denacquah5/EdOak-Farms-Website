/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import FarmForMe from './pages/FarmForMe';
import Services from './pages/Services';
import Operations from './pages/Operations';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ClientDashboard from './pages/dashboard/ClientDashboard';
import { Notifications } from './pages/dashboard/Notifications';
import AdminDashboard from './pages/admin/AdminDashboard';

function ProtectedRoute({ children, requireAdmin = false }: { children: React.ReactNode, requireAdmin?: boolean }) {
  const { user, profile, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  
  // Allow access if the user has the admin role OR if they are the designated default admin
  const isDefaultAdmin = user.email === 'denacquah5@gmail.com';
  if (requireAdmin && profile?.role !== 'admin' && !isDefaultAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/farm-for-me" element={<PublicLayout><FarmForMe /></PublicLayout>} />
          <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
          <Route path="/operations" element={<PublicLayout><Operations /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
          <Route path="/signup" element={<PublicLayout><Signup /></PublicLayout>} />

          {/* Protected Client Routes */}
          <Route path="/dashboard/*" element={
            <ProtectedRoute>
              <ClientDashboard />
            </ProtectedRoute>
          } />

          {/* Protected Admin Routes */}
          <Route path="/admin/*" element={
            <ProtectedRoute requireAdmin>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
