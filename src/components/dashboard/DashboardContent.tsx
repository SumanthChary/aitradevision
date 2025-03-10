
import React from 'react';
import RecentAnalyses from '@/components/dashboard/RecentAnalyses';
import AIConversations from '@/components/dashboard/AIConversations';

interface DashboardContentProps {
  analyses: any[];
  isLoading: boolean;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ analyses, isLoading }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <RecentAnalyses analyses={analyses} isLoading={isLoading} />
      <AIConversations />
    </div>
  );
};

export default DashboardContent;
