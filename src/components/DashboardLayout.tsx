
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  BarChart3,
  Home,
  Settings,
  MessageSquare,
  Image,
} from 'lucide-react';
import { NavigationItem } from '@/types/navigation';
import Sidebar from './dashboard/Sidebar';
import MobileHeader from './dashboard/MobileHeader';
import MobileMenu from './dashboard/MobileMenu';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation: NavigationItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Chart Analysis', href: '/chart-analysis', icon: Image },
    { name: 'Trading Assistant', href: '/trading-assistant', icon: MessageSquare },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const isActive = (href: string) => location.pathname === href;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar for desktop */}
      <Sidebar 
        user={user} 
        navigation={navigation} 
        isActive={isActive} 
        handleSignOut={handleSignOut} 
      />

      {/* Mobile header */}
      <MobileHeader 
        user={user} 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
        handleSignOut={handleSignOut} 
      />

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <MobileMenu 
          navigation={navigation} 
          isActive={isActive} 
          handleSignOut={handleSignOut} 
          setIsMobileMenuOpen={setIsMobileMenuOpen} 
        />
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 md:pl-64">
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
