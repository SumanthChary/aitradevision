
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { BarChart3, LineChart as LineChartIcon, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// Import refactored components
import StatCard from '@/components/dashboard/StatCard';
import ChartCard from '@/components/dashboard/ChartCard';
import { AreaChart, BarChart } from '@/components/dashboard/SimpleCharts';
import RecentAnalyses from '@/components/dashboard/RecentAnalyses';
import AIConversations from '@/components/dashboard/AIConversations';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { performanceData, tradeDistributionData } from '@/components/dashboard/PerformanceData';

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            title="Total Analyses" 
            value={analyses.length} 
            description="Your saved trading analyses" 
            icon={BarChart3} 
          />
          
          <StatCard 
            title="Performance" 
            value="+12.5%" 
            description="Last 30 days trading performance" 
            icon={LineChartIcon} 
          />
          
          <StatCard 
            title="Market Sentiment" 
            value="Bullish" 
            description="Current market trend analysis" 
            icon={TrendingUp} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard title="Performance Overview">
            <AreaChart data={performanceData} className="h-72" />
          </ChartCard>

          <ChartCard title="Trade Distribution">
            <BarChart data={tradeDistributionData} className="h-72" />
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RecentAnalyses analyses={analyses} isLoading={isLoading} />
          <AIConversations />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
