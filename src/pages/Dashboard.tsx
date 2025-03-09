
import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, LineChart as LineChartIcon, TrendingUp, Activity, Image, MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// Create custom chart components since we don't have access to the ones imported previously
const AreaChart = ({ data, className }: { data: any[], className?: string }) => (
  <div className={`${className} flex items-end justify-between`}>
    {data.map((item, index) => (
      <div key={index} className="flex flex-col items-center">
        <div 
          className="bg-primary/80 w-8 rounded-t-md" 
          style={{ height: `${(item.value / 4000) * 100}%` }}
        ></div>
        <span className="text-xs mt-1">{item.name}</span>
      </div>
    ))}
  </div>
);

const BarChart = ({ data, className }: { data: any[], className?: string }) => (
  <div className={`${className} flex items-end justify-between`}>
    {data.map((item, index) => (
      <div key={index} className="flex flex-col items-center">
        <div 
          className="bg-primary/80 w-8 rounded-t-md" 
          style={{ height: `${item.value}%` }}
        ></div>
        <span className="text-xs mt-1">{item.name}</span>
      </div>
    ))}
  </div>
);

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}!</h1>
          <p className="text-muted-foreground">Here's an overview of your trading insights and activities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Analyses</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyses.length}</div>
              <p className="text-xs text-muted-foreground">Your saved trading analyses</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Performance</CardTitle>
              <LineChartIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12.5%</div>
              <p className="text-xs text-muted-foreground">Last 30 days trading performance</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Market Sentiment</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Bullish</div>
              <p className="text-xs text-muted-foreground">Current market trend analysis</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <AreaChart
                data={[
                  { name: 'Jan', value: 2500 },
                  { name: 'Feb', value: 3000 },
                  { name: 'Mar', value: 2800 },
                  { name: 'Apr', value: 3200 },
                  { name: 'May', value: 4000 },
                  { name: 'Jun', value: 3800 },
                ]}
                className="h-72"
              />
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Trade Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart
                data={[
                  { name: 'Forex', value: 45 },
                  { name: 'Crypto', value: 30 },
                  { name: 'Stocks', value: 15 },
                  { name: 'Commodities', value: 10 },
                ]}
                className="h-72"
              />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          <Card>
            <CardHeader>
              <CardTitle>Recent AI Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <MessageSquare className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                <p className="font-medium">No conversations yet</p>
                <p className="text-sm text-muted-foreground mb-4">Start chatting with our AI assistant</p>
                <Link to="/trading-assistant">
                  <Button variant="outline" size="sm">
                    Chat with AI
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
