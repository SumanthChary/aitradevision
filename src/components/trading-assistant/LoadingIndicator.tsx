
import React from 'react';
import { BarChart3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-3 animate-fade-in">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        <BarChart3 className="h-4 w-4 text-primary" />
      </div>
      <Card className="max-w-[80%]">
        <CardContent className="p-3 flex items-center">
          <div className="flex space-x-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-150"></div>
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-300"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadingIndicator;
