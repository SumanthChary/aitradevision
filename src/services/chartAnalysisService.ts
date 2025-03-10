
import { supabase } from "@/integrations/supabase/client";
import { analyzeChartImage, AnalysisResult } from "@/utils/analyzeImage";

export interface SaveAnalysisParams {
  userId: string;
  title: string;
  image: string;
  analysis: AnalysisResult;
}

export async function saveAnalysis(params: SaveAnalysisParams): Promise<void> {
  const { userId, title, image, analysis } = params;
  
  // Convert the analysis object to a valid format for Supabase
  const analysisJson = JSON.parse(JSON.stringify(analysis));
  
  const { error } = await supabase
    .from('trading_analyses')
    .insert({
      user_id: userId,
      title: title || 'Chart Analysis',
      chart_image: image,
      result: analysisJson
    });
  
  if (error) {
    console.error('Error saving analysis:', error);
    throw new Error(error.message || "Failed to save analysis");
  }
}

export async function performChartAnalysis(image: string): Promise<AnalysisResult> {
  try {
    return await analyzeChartImage(image);
  } catch (error: any) {
    console.error('Analysis error:', error);
    throw new Error(error.message || "Failed to analyze chart");
  }
}
