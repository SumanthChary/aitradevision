
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
    
    // Call our Supabase edge function
    const { data, error } = await supabase.functions.invoke('chart-analysis', {
      body: { image: imageBase64 }
    });
    
    if (error) {
      console.error("Edge function error:", error);
      throw new Error(error.message || "Failed to analyze chart");
    }
    
    if (!data) {
      throw new Error("No response data received from the AI service");
    }
    
    console.log("Analysis result:", data);
    
    // Ensure all required fields are present with defaults if needed
    const result: AnalysisResult = {
      pattern: data.pattern || "Unknown Pattern",
      confidence: data.confidence || 0,
      prediction: data.prediction || "Neutral",
      priceTarget: data.priceTarget || "N/A",
      timeFrame: data.timeFrame || "Short-term",
      supportLevels: Array.isArray(data.supportLevels) ? data.supportLevels : [],
      resistanceLevels: Array.isArray(data.resistanceLevels) ? data.resistanceLevels : [],
      analysis: data.analysis || "No detailed analysis available."
    };
    
    return result;
  } catch (error: any) {
    console.error("Error analyzing chart image:", error);
    throw new Error("Failed to analyze chart: " + (error.message || "Unknown error"));
  }
}
