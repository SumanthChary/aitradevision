
import { supabase } from "@/integrations/supabase/client";

export interface TradingQuestion {
  question: string;
  context?: string;
}

export interface TradingResponse {
  answer: string;
  confidence?: number;
  relatedQuestions?: string[];
}

export async function askTradingQuestion(params: TradingQuestion): Promise<TradingResponse> {
  try {
    console.log("Processing trading question:", params.question);
    
    // Call our Supabase edge function
    const { data, error } = await supabase.functions.invoke('trading-assistant', {
      body: { message: params.question }
    });
    
    if (error) {
      console.error("Edge function error:", error);
      throw new Error(error.message || "Failed to get trading insights");
    }
    
    if (!data || !data.content) {
      throw new Error("No response data received from the AI service");
    }
    
    return {
      answer: data.content,
      confidence: data.confidence || 0.95, // Default confidence score
    };
  } catch (error: any) {
    console.error("Error processing trading question:", error);
    throw new Error("Failed to get trading insights: " + (error.message || "Unknown error"));
  }
}
