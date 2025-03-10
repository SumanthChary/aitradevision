
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnalysisResults from '@/components/AnalysisResults';
import AnalysisTitleInput from '@/components/chart-analysis/AnalysisTitleInput';
import ChartUploader from '@/components/chart-analysis/ChartUploader';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useChartAnalysis } from '@/hooks/useChartAnalysis';

const ChartAnalysis: React.FC = () => {
  const { user, loading } = useAuth();
  const {
    image,
    setImage,
    isAnalyzing,
    analysis,
    analysisTitle,
    setAnalysisTitle,
    isSaving,
    handleAnalyze,
    handleSaveAnalysis
  } = useChartAnalysis(user?.id);
  
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
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Chart Analysis</h1>
          <p className="text-muted-foreground">Upload any trading chart and let our AI identify patterns and provide insights</p>
        </div>
        
        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upload">Upload Chart</TabsTrigger>
            <TabsTrigger value="results" disabled={!analysis}>Analysis Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-6 animate-fade-in">
            <ChartUploader
              image={image}
              setImage={setImage}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
            />
          </TabsContent>
          
          <TabsContent value="results" className="animate-fade-in">
            {analysis && (
              <div className="space-y-6">
                <AnalysisTitleInput
                  title={analysisTitle}
                  onTitleChange={setAnalysisTitle}
                  onSave={handleSaveAnalysis}
                  isSaving={isSaving}
                />
                <AnalysisResults 
                  analysis={analysis}
                  image={image}
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ChartAnalysis;
