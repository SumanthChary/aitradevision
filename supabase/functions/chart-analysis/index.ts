
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const apiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData = await req.json();
    const imageBase64 = requestData.image;
    
    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: "Missing image in request body" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log("Processing chart analysis request");
    
    // Extract the image data part from the base64 string
    let imageData = imageBase64;
    if (imageBase64.includes(',')) {
      imageData = imageBase64.split(',')[1];
    }

    console.log("Preparing Gemini API request");
    
    // Call Gemini API with the image using a simpler prompt
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { 
                text: "You are a financial chart analyst. Analyze this trading chart and provide the following information:\n\nPattern: [pattern name]\nConfidence: [number between 0-100]%\nPrediction: [Buy/Sell/Hold]\nPrice Target: [price range]\nTime Frame: [Short/Medium/Long term]\nSupport Levels: [comma separated values]\nResistance Levels: [comma separated values]\nAnalysis: [2-3 sentence analysis]" 
              },
              { 
                inline_data: {
                  mime_type: "image/jpeg",
                  data: imageData
                }
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 32,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    console.log("Gemini API status:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error response:", errorText);
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("Gemini API response received");

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0] || !data.candidates[0].content.parts[0].text) {
      console.error("Invalid response structure:", JSON.stringify(data));
      throw new Error("Invalid response structure from Gemini API");
    }

    const analysisText = data.candidates[0].content.parts[0].text;
    console.log("Successfully extracted analysis text from Gemini response");

    // Parse the response into structured data
    const parseAnalysisText = (text) => {
      const lines = text.split('\n');
      const result = {
        pattern: "Unknown Pattern",
        confidence: 70,
        prediction: "Hold",
        priceTarget: "N/A",
        timeFrame: "Short-term",
        supportLevels: [],
        resistanceLevels: [],
        analysis: ""
      };

      let inAnalysisSection = false;
      let analysisLines = [];

      for (const line of lines) {
        const cleanLine = line.trim();
        
        if (cleanLine.toLowerCase().startsWith('pattern:')) {
          result.pattern = cleanLine.split(':')[1]?.trim() || "Unknown Pattern";
        } else if (cleanLine.toLowerCase().startsWith('confidence:')) {
          const confStr = cleanLine.split(':')[1]?.trim() || "";
          result.confidence = parseInt(confStr.replace('%', '')) || 70;
        } else if (cleanLine.toLowerCase().startsWith('prediction:')) {
          result.prediction = cleanLine.split(':')[1]?.trim() || "Hold";
        } else if (cleanLine.toLowerCase().startsWith('price target:')) {
          result.priceTarget = cleanLine.split(':')[1]?.trim() || "N/A";
        } else if (cleanLine.toLowerCase().startsWith('time frame:')) {
          result.timeFrame = cleanLine.split(':')[1]?.trim() || "Short-term";
        } else if (cleanLine.toLowerCase().startsWith('support levels:')) {
          const levelsStr = cleanLine.split(':')[1]?.trim() || "";
          result.supportLevels = levelsStr.split(',').map(s => s.trim()).filter(s => s !== "");
        } else if (cleanLine.toLowerCase().startsWith('resistance levels:')) {
          const levelsStr = cleanLine.split(':')[1]?.trim() || "";
          result.resistanceLevels = levelsStr.split(',').map(s => s.trim()).filter(s => s !== "");
        } else if (cleanLine.toLowerCase().startsWith('analysis:')) {
          inAnalysisSection = true;
        } else if (inAnalysisSection && cleanLine) {
          analysisLines.push(cleanLine);
        }
      }

      if (analysisLines.length > 0) {
        result.analysis = analysisLines.join(' ').trim();
      }

      return result;
    };

    const analysisResult = parseAnalysisText(analysisText);
    console.log("Parsed analysis:", analysisResult);

    return new Response(
      JSON.stringify(analysisResult),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error in chart-analysis function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
