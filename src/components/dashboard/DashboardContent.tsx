
import React from 'react';
import RecentAnalyses from '@/components/dashboard/RecentAnalyses';
import AIConversations from '@/components/dashboard/AIConversations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, DonutChart } from '@/components/dashboard/SimpleCharts';
import { performanceData, tradeDistributionData } from '@/components/dashboard/PerformanceData';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

interface DashboardContentProps {
  analyses: any[];
  isLoading: boolean;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ analyses, isLoading }) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Market Overview Section - New */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
        <Card className="hover-scale transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-base">
              <TrendingUp className="h-4 w-4 mr-2 text-primary" />
              Market Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart data={performanceData} className="h-40" />
            <div className="mt-2 flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Last 6 months</span>
              <div className="flex items-center text-green-400">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+24.8%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-scale transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Trading Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChart data={tradeDistributionData} className="h-40" />
          </CardContent>
        </Card>
      </div>

      {/* Analyses and Conversations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentAnalyses analyses={analyses} isLoading={isLoading} />
        <AIConversations />
      </div>
    </div>
  );
};

export default DashboardContent;
