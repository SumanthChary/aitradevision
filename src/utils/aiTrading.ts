
import { supabase } from '@/integrations/supabase/client';

interface TradingQuestionParams {
  question: string;
}

interface TradingQuestionResponse {
  answer: string;
}

export async function askTradingQuestion({ question }: TradingQuestionParams): Promise<TradingQuestionResponse> {
  try {
    console.log('Sending trading question:', question);
    
    const { data, error } = await supabase.functions.invoke('trading-assistant', {
      body: { message: question }
    });
    
    if (error) {
      console.error('Error invoking trading-assistant function:', error);
      throw new Error(error.message || 'Failed to get AI response');
    }
    
    if (!data || !data.content) {
      throw new Error('No response received from AI service');
    }
    
    return { answer: data.content };
  } catch (error: any) {
    console.error('Error in askTradingQuestion:', error);
    throw new Error(`Failed to process your question: ${error.message}`);
  }
}
