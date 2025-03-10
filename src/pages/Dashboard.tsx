
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { supabase } from '@/integrations/supabase/client';

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardAnalytics from '@/components/dashboard/DashboardAnalytics';
import DashboardContent from '@/components/dashboard/DashboardContent';

const Dashboard: React.FC = () => {
  const { user, loading } = useAuth();
  const [analyses, setAnalyses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchAnalyses();
    }
  }, [user]);

  const fetchAnalyses = async () => {
    try {
      const { data, error } = await supabase
        .from('trading_analyses')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Error fetching analyses:', error);
        return;
      }

      setAnalyses(data || []);
    } catch (error) {
      console.error('Error fetching analyses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // If still checking auth status, show loading
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect if not logged in
  if (!user && !loading) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <DashboardHeader user={user} />
        <DashboardAnalytics analysesCount={analyses.length} />
        <DashboardContent analyses={analyses} isLoading={isLoading} />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
