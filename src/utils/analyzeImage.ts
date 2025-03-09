
import { supabase } from "@/integrations/supabase/client";

export interface AnalysisResult {
  pattern: string;
  confidence: number;
  prediction: string;
  priceTarget: string;
  timeFrame: string;
  supportLevels: string[];
  resistanceLevels: string[];
  analysis: string;
}

export async function analyzeChartImage(imageBase64: string): Promise<AnalysisResult> {
  try {
    console.log("Sending chart image for analysis");
    
    // Create form data
    const formData = new FormData();
    formData.append('image', imageBase64);
    
    // Call our Supabase edge function
    const { data, error } = await supabase.functions.invoke('chart-analysis', {
      body: formData
    });
    
    if (error) {
      console.error("Edge function error:", error);
      throw new Error(error.message);
    }
    
    if (!data) {
      throw new Error("No response data received from the AI service");
    }
    
    console.log("Analysis result:", data);
    
    return data as AnalysisResult;
  } catch (error) {
    console.error("Error analyzing chart image:", error);
    throw new Error("Failed to analyze chart: " + error.message);
  }
}
