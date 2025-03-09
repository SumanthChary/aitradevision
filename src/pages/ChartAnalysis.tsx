import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, ChartCandlestick, AlertTriangle, Check, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageUploader from '@/components/ImageUploader';
import AnalysisResults from '@/components/AnalysisResults';
import { analyzeChartImage } from '@/utils/analyzeImage';

const ChartAnalysis: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const { toast } = useToast();

  const handleAnalyzeChart = async () => {
    if (!image) {
      toast({
        title: "No image",
        description: "Please upload a chart image first",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const results = await analyzeChartImage(image);
      setAnalysisResults(results);
    } catch (error) {
      console.error("Error analyzing chart:", error);
      toast({
        title: "Analysis failed",
        description: "Could not analyze chart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setAnalysisResults(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 opacity-30 grid-pattern"></div>
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-radial from-primary/5 to-transparent opacity-30"></div>
          </div>
          
          <div className="container mx-auto max-w-7xl px-6 md:px-10 relative z-10">
            <div className="text-center mb-12 animate-fade-in">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary-foreground ring-1 ring-inset ring-primary/20 mb-4">
                <span className="flex h-1.5 w-1.5 rounded-full bg-primary mr-1.5 animate-pulse"></span>
                AI Chart Analysis
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Analyze Any Trading Chart</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Upload your trading chart or candlestick pattern and let our AI identify patterns, support/resistance 
                levels, and provide actionable trading insights.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="glassmorphism rounded-xl p-6 animate-fade-in delay-75">
                <div className="mb-6">
                  <h3 className="text-xl font-medium mb-3 flex items-center">
                    <ChartCandlestick className="h-5 w-5 text-primary mr-2" />
                    Chart Upload
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Upload a screenshot of any trading chart or candlestick pattern. Supported formats: JPG, PNG
                  </p>
                  
                  <ImageUploader 
                    image={image} 
                    setImage={setImage} 
                    maxSizeMB={5}
                  />
                </div>
                
                <div className="flex flex-col space-y-3">
                  <Button 
                    onClick={handleAnalyzeChart} 
                    disabled={!image || isAnalyzing}
                    className="w-full"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing Chart...
                      </>
                    ) : (
                      <>
                        <ChartCandlestick className="h-4 w-4 mr-2" />
                        Analyze Chart
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={handleReset}
                    disabled={!image || isAnalyzing}
                    className="w-full"
                  >
                    Reset
                  </Button>
                </div>
                
                <div className="mt-6 text-xs text-muted-foreground">
                  <div className="flex items-start mb-1">
                    <AlertTriangle className="h-3.5 w-3.5 mr-1.5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span>
                      This is not financial advice. Always use your own judgment when making trading decisions.
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="glassmorphism rounded-xl p-6 animate-fade-in delay-150">
                <h3 className="text-xl font-medium mb-4">Analysis Results</h3>
                
                {!image && !analysisResults && (
                  <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground py-10">
                    <ChartCandlestick className="h-12 w-12 mb-4 opacity-20" />
                    <p>Upload a chart to see AI analysis results</p>
                  </div>
                )}
                
                {image && !analysisResults && isAnalyzing && (
                  <div className="h-full flex flex-col items-center justify-center text-center py-10">
                    <Loader2 className="h-12 w-12 mb-4 animate-spin text-primary opacity-70" />
                    <p>Analyzing your chart...</p>
                    <p className="text-sm text-muted-foreground mt-2">This may take a few moments</p>
                  </div>
                )}
                
                {analysisResults && (
                  <AnalysisResults results={analysisResults} image={image} />
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ChartAnalysis;
