
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image, MessageSquare } from 'lucide-react';

interface RecentAnalysesProps {
  analyses: any[];
  isLoading: boolean;
}

const RecentAnalyses: React.FC<RecentAnalysesProps> = ({ analyses, isLoading }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Chart Analyses</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : analyses.length > 0 ? (
          <div className="space-y-4">
            {analyses.map((analysis) => (
              <div key={analysis.id} className="flex items-center space-x-4 p-3 hover:bg-secondary/10 rounded-md">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                  <Image className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{analysis.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(analysis.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Image className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="font-medium">No analyses yet</p>
            <p className="text-sm text-muted-foreground mb-4">Upload your first chart for analysis</p>
            <Link to="/chart-analysis">
              <Button variant="outline" size="sm">
                Analyze Chart
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentAnalyses;
