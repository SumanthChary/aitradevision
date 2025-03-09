
import React from 'react';
import { User } from '@supabase/supabase-js';

interface DashboardHeaderProps {
  user: User | null;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2">
        Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}!
      </h1>
      <p className="text-muted-foreground">
        Here's an overview of your trading insights and activities.
      </p>
    </div>
  );
};

export default DashboardHeader;
