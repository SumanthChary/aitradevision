
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
    
    // Create system context for chart analysis
    const systemContext = `You are an expert trading chart analyst. Analyze the provided trading chart image and identify patterns, support/resistance levels, and potential price movements. 
    Structure your response in this format:
    1. Pattern: [Identified pattern, e.g., Double Bottom, Head and Shoulders, etc.]
    2. Confidence: [A percentage of confidence in your analysis]
    3. Prediction: [Buy/Sell/Hold recommendation]
    4. Price Target: [Potential price target]
    5. Time Frame: [Expected time for the target to be reached]
    6. Support Levels: [Key support levels]
    7. Resistance Levels: [Key resistance levels]
    8. Analysis: [Detailed analysis with reasoning]
    
    Keep your analysis professional and data-driven.`;

    // Extract the image data part from the base64 string
    let imageData = imageBase64;
    if (imageBase64.includes(',')) {
      imageData = imageBase64.split(',')[1];
    }

    // Call Gemini API with the image
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: systemContext },
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
          topP: 0.8,
          maxOutputTokens: 800,
        }
      })
    });

    const data = await response.json();
    console.log("Gemini API response received");

    // Extract the response text from Gemini API and parse it into structured data
    let analysisText = "";
    
    if (data.candidates && 
        data.candidates[0] && 
        data.candidates[0].content && 
        data.candidates[0].content.parts && 
        data.candidates[0].content.parts[0] && 
        data.candidates[0].content.parts[0].text) {
      analysisText = data.candidates[0].content.parts[0].text;
    } else {
      console.error("Failed to generate analysis:", JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: "Failed to generate analysis from the image", details: data }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Parse the text response into structured data
    const parseAnalysisText = (text: string) => {
      const lines = text.split('\n');
      const result: Record<string, any> = {
        pattern: "",
        confidence: 0,
        prediction: "",
        priceTarget: "",
        timeFrame: "",
        supportLevels: [],
        resistanceLevels: [],
        analysis: ""
      };

      let inAnalysisSection = false;
      let analysisLines: string[] = [];

      for (const line of lines) {
        if (inAnalysisSection) {
          analysisLines.push(line);
          continue;
        }

        if (line.toLowerCase().includes('pattern:')) {
          result.pattern = line.split(':')[1]?.trim() || "";
        } else if (line.toLowerCase().includes('confidence:')) {
          const confStr = line.split(':')[1]?.trim() || "";
          result.confidence = parseInt(confStr.replace('%', '')) || 0;
        } else if (line.toLowerCase().includes('prediction:')) {
          result.prediction = line.split(':')[1]?.trim() || "";
        } else if (line.toLowerCase().includes('price target:')) {
          result.priceTarget = line.split(':')[1]?.trim() || "";
        } else if (line.toLowerCase().includes('time frame:')) {
          result.timeFrame = line.split(':')[1]?.trim() || "";
        } else if (line.toLowerCase().includes('support levels:')) {
          const levelsStr = line.split(':')[1]?.trim() || "";
          result.supportLevels = levelsStr.split(',').map(s => s.trim());
        } else if (line.toLowerCase().includes('resistance levels:')) {
          const levelsStr = line.split(':')[1]?.trim() || "";
          result.resistanceLevels = levelsStr.split(',').map(s => s.trim());
        } else if (line.toLowerCase().includes('analysis:')) {
          inAnalysisSection = true;
        }
      }

      if (analysisLines.length > 0) {
        result.analysis = analysisLines.join('\n').trim();
      }

      return result;
    };

    const analysisResult = parseAnalysisText(analysisText);
    console.log("Parsed analysis result:", analysisResult);
    
    return new Response(
      JSON.stringify(analysisResult),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error in chart-analysis function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
