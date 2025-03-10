
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnalysisResults from '@/components/AnalysisResults';
import AnalysisTitleInput from '@/components/chart-analysis/AnalysisTitleInput';
import ChartUploader from '@/components/chart-analysis/ChartUploader';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { AnalysisResult } from '@/utils/analyzeImage';
import { performChartAnalysis, saveAnalysis } from '@/services/chartAnalysisService';

const ChartAnalysis: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [analysisTitle, setAnalysisTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { user, loading } = useAuth();
  const { toast } = useToast();
  
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

  const handleAnalyze = async () => {
    if (!image) {
      toast({
        title: "No image selected",
        description: "Please upload a chart image first",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      const result = await performChartAnalysis(image);
      setAnalysis(result);
      
      // Generate a default title based on the analysis pattern
      if (result.pattern) {
        setAnalysisTitle(`${result.pattern} Pattern Analysis`);
      }
      
      toast({
        title: "Analysis complete",
        description: `Identified ${result.pattern} pattern with ${result.confidence}% confidence`,
      });
      
    } catch (error: any) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleSaveAnalysis = async () => {
    if (!user || !analysis || !image) return;
    
    setIsSaving(true);
    
    try {
      await saveAnalysis({
        userId: user.id,
        title: analysisTitle || 'Chart Analysis',
        image,
        analysis
      });
      
      toast({
        title: "Analysis saved",
        description: "Your chart analysis has been saved successfully.",
      });
    } catch (error: any) {
      console.error('Error saving analysis:', error);
      toast({
        title: "Failed to save analysis",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

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
                
                <AnalysisResults results={analysis} image={image} />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ChartAnalysis;
