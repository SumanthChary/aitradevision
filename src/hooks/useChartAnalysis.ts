
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AnalysisResult } from '@/utils/analyzeImage';
import { performChartAnalysis, saveAnalysis } from '@/services/chartAnalysisService';

export const useChartAnalysis = (userId: string | undefined) => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [analysisTitle, setAnalysisTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

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
    if (!userId || !analysis || !image) return;
    
    setIsSaving(true);
    
    try {
      await saveAnalysis({
        userId,
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

  return {
    image,
    setImage,
    isAnalyzing,
    analysis,
    analysisTitle,
    setAnalysisTitle,
    isSaving,
    handleAnalyze,
    handleSaveAnalysis
  };
};
