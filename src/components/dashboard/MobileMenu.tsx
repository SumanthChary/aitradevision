
import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { NavigationItem } from '@/types/navigation';

interface MobileMenuProps {
  navigation: NavigationItem[];
  isActive: (href: string) => boolean;
  handleSignOut: () => Promise<void>;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  navigation,
  isActive,
  handleSignOut,
  setIsMobileMenuOpen,
}) => {
  return (
    <div className="md:hidden glassmorphism absolute w-full z-50">
      <nav className="px-2 pt-2 pb-3 space-y-1">
        {navigation.map((item) => {
          const isItemActive = isActive(item.href);
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`${
                isItemActive
                  ? 'bg-white/10 text-white'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <item.icon
                className={`${
                  isItemActive ? 'text-primary' : 'text-gray-400 group-hover:text-primary'
                } mr-3 flex-shrink-0 h-6 w-6`}
              />
              {item.name}
            </Link>
          );
        })}
        <button
          onClick={handleSignOut}
          className="text-gray-300 hover:bg-white/5 hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md w-full"
        >
          <LogOut className="text-gray-400 group-hover:text-primary mr-3 flex-shrink-0 h-6 w-6" />
          Sign out
        </button>
      </nav>
    </div>
  );
};

export default MobileMenu;
