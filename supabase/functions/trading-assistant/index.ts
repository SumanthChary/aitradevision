
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const apiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RequestBody {
  message: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json() as RequestBody;
    
    if (!message) {
      return new Response(
        JSON.stringify({ error: "Missing message in request body" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log("Processing trading question:", message);
    
    // Create system context for financial analysis with focus on pump/dump predictions
    const systemContext = `You are an AI Trading Assistant specialized in financial markets, trading strategies, and technical analysis. 
    Provide professional, data-driven insights about trading, market trends, and investment strategies.
    
    Your key specialities include:
    1. Identifying potential pump and dump schemes
    2. Analyzing market sentiment
    3. Providing technical analysis of assets
    4. Explaining trading concepts
    5. Suggesting trading strategies
    
    When asked about a specific asset or market condition:
    - Clearly state if you believe it shows signs of being a pump/dump scheme
    - Explain the reasoning behind your assessment
    - Provide risk levels (Low, Medium, High)
    - Suggest caution points for traders
    
    Use a confident, analytical tone. Format your responses with bullet points and clear sections.`;

    // Call Gemini API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: systemContext }]
          },
          {
            parts: [{ text: message }]
          }
        ],
        generationConfig: {
          temperature: 0.3,
          topK: 40,
          topP: 0.8,
          maxOutputTokens: 800,
        }
      })
    });

    const data = await response.json();
    console.log("Gemini API response received", JSON.stringify(data));

    // Extract the response text from Gemini API
    let content = "I couldn't generate a response. Please try again.";
    
    if (data.candidates && 
        data.candidates[0] && 
        data.candidates[0].content && 
        data.candidates[0].content.parts && 
        data.candidates[0].content.parts[0] && 
        data.candidates[0].content.parts[0].text) {
      content = data.candidates[0].content.parts[0].text;
    } else {
      console.error("Error in Gemini API response:", JSON.stringify(data));
    }

    return new Response(
      JSON.stringify({ content }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error in trading-assistant function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
