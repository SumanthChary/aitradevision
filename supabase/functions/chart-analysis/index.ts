
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
              { text: "Analyze this trading chart and identify patterns, support/resistance levels, and potential price movements. Structure your response in this format: Pattern: [Name], Confidence: [%], Prediction: [Buy/Sell/Hold], Price Target: [Value], Time Frame: [Short/Medium/Long], Support Levels: [List], Resistance Levels: [List], Analysis: [Detailed analysis]" },
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
          maxOutputTokens: 1024,
        }
      })
    });

    const data = await response.json();
    console.log("Gemini API response:", data);

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error("Invalid response from Gemini API");
    }

    const analysisText = data.candidates[0].content.parts[0].text;

    // Parse the response into structured data
    const parseAnalysisText = (text: string) => {
      const lines = text.split('\n');
      const result: Record<string, any> = {
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
      let analysisLines: string[] = [];

      for (const line of lines) {
        if (line.toLowerCase().startsWith('pattern:')) {
          result.pattern = line.split(':')[1]?.trim() || "Unknown Pattern";
        } else if (line.toLowerCase().startsWith('confidence:')) {
          const confStr = line.split(':')[1]?.trim() || "";
          result.confidence = parseInt(confStr.replace('%', '')) || 70;
        } else if (line.toLowerCase().startsWith('prediction:')) {
          result.prediction = line.split(':')[1]?.trim() || "Hold";
        } else if (line.toLowerCase().startsWith('price target:')) {
          result.priceTarget = line.split(':')[1]?.trim() || "N/A";
        } else if (line.toLowerCase().startsWith('time frame:')) {
          result.timeFrame = line.split(':')[1]?.trim() || "Short-term";
        } else if (line.toLowerCase().startsWith('support levels:')) {
          const levelsStr = line.split(':')[1]?.trim() || "";
          result.supportLevels = levelsStr.split(',').map(s => s.trim()).filter(s => s !== "");
        } else if (line.toLowerCase().startsWith('resistance levels:')) {
          const levelsStr = line.split(':')[1]?.trim() || "";
          result.resistanceLevels = levelsStr.split(',').map(s => s.trim()).filter(s => s !== "");
        } else if (line.toLowerCase().startsWith('analysis:')) {
          inAnalysisSection = true;
        } else if (inAnalysisSection) {
          analysisLines.push(line);
        }
      }

      if (analysisLines.length > 0) {
        result.analysis = analysisLines.join('\n').trim();
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
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
