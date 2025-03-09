
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { User as UserType } from '@supabase/supabase-js';
import { NavigationItem } from '@/types/navigation';

interface SidebarProps {
  user: UserType | null;
  navigation: NavigationItem[];
  isActive: (href: string) => boolean;
  handleSignOut: () => Promise<void>;
}

const Sidebar: React.FC<SidebarProps> = ({ user, navigation, isActive, handleSignOut }) => {
  return (
    <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 z-80 glassmorphism">
      <div className="flex flex-col flex-1 min-h-0 border-r border-white/5">
        <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-white/5">
          <Link to="/" className="flex items-center">
            <BarChart3 className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-semibold">TradeInsight</span>
          </Link>
        </div>
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 space-y-1">
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
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <item.icon
                    className={`${
                      isItemActive ? 'text-primary' : 'text-gray-400 group-hover:text-primary'
                    } mr-3 flex-shrink-0 h-5 w-5`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-white/5 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white truncate">
                {user?.email}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto"
              onClick={handleSignOut}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
