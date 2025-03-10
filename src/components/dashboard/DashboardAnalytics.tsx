
import React from 'react';
import { BarChart3, LineChart as LineChartIcon, TrendingUp } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import ChartCard from '@/components/dashboard/ChartCard';
import { AreaChart, BarChart } from '@/components/dashboard/SimpleCharts';
import { performanceData, tradeDistributionData } from '@/components/dashboard/PerformanceData';

interface DashboardAnalyticsProps {
  analysesCount: number;
}

const DashboardAnalytics: React.FC<DashboardAnalyticsProps> = ({ analysesCount }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Total Analyses" 
          value={analysesCount} 
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
    </>
  );
};

export default DashboardAnalytics;
