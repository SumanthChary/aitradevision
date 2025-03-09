
import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import ImageUploader from '@/components/ImageUploader';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnalysisResults from '@/components/AnalysisResults';
import { analyzeChartImage, AnalysisResult } from '@/utils/analyzeImage';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
    if (!image) return;
    
    setIsAnalyzing(true);
    
    try {
      const result = await analyzeChartImage(image);
      setAnalysis(result);
      
      // Generate a default title based on the analysis pattern
      if (result.pattern) {
        setAnalysisTitle(`${result.pattern} Pattern Analysis`);
      }
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
  
  const saveAnalysis = async () => {
    if (!user || !analysis || !image) return;
    
    setIsSaving(true);
    
    try {
      // Convert the analysis object to a valid format for Supabase
      const analysisJson = JSON.parse(JSON.stringify(analysis));
      
      const { error } = await supabase
        .from('trading_analyses')
        .insert({
          user_id: user.id,
          title: analysisTitle || 'Chart Analysis',
          chart_image: image,
          result: analysisJson
        });
      
      if (error) {
        console.error('Error saving analysis:', error);
        toast({
          title: "Failed to save analysis",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Chart Analysis</h1>
          <p className="text-muted-foreground">Upload any trading chart and let our AI identify patterns and provide insights</p>
        </div>
        
        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upload">Upload Chart</TabsTrigger>
            <TabsTrigger value="results" disabled={!analysis}>Analysis Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <ImageUploader 
                  image={image} 
                  setImage={setImage} 
                />
                
                <div className="mt-6 flex justify-center">
                  <Button 
                    onClick={handleAnalyze} 
                    disabled={!image || isAnalyzing}
                    className="w-full sm:w-auto"
                  >
                    {isAnalyzing ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Analyzing...
                      </>
                    ) : (
                      'Analyze Chart'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="results">
            {analysis && (
              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <label className="text-sm font-medium">
                        Analysis Title
                      </label>
                      <input
                        type="text"
                        value={analysisTitle}
                        onChange={(e) => setAnalysisTitle(e.target.value)}
                        placeholder="Enter a title for this analysis"
                        className="w-full p-2 rounded-md border border-input bg-background"
                      />
                      <div className="flex justify-end">
                        <Button
                          onClick={saveAnalysis}
                          disabled={isSaving}
                          className="mt-2"
                        >
                          {isSaving ? "Saving..." : "Save Analysis"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <AnalysisResults analysis={analysis} />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ChartAnalysis;
