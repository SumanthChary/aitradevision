
import React from 'react';
import { ChartCandlestick, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AnalysisResult } from '@/utils/analyzeImage';

export interface AnalysisResultsProps {
  results: AnalysisResult;
  image?: string | null;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ results, image }) => {
  const isPredictionBuy = results.prediction.toLowerCase() === 'buy';
  
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center">
            <ChartCandlestick className="h-4 w-4 text-primary mr-2" />
            <span className="font-medium">Pattern:</span>
          </div>
          <div className="text-xl font-semibold mt-1">{results.pattern}</div>
        </div>
        
        <div className="text-right">
          <div className="text-xs text-muted-foreground mb-1">Confidence</div>
          <div className={`text-lg font-medium ${
            results.confidence >= 80 ? 'text-green-400' : 
            results.confidence >= 60 ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {results.confidence}%
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        <div className={`p-3 rounded-lg ${
          isPredictionBuy ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'
        } hover-scale`}>
          <div className="text-xs text-muted-foreground mb-1">Signal</div>
          <div className="font-semibold flex items-center">
            {isPredictionBuy ? (
              <>
                <TrendingUp className="h-3.5 w-3.5 text-green-400 mr-1 animate-pulse" />
                <span className="text-green-400">{results.prediction}</span>
              </>
            ) : (
              <>
                <TrendingDown className="h-3.5 w-3.5 text-red-400 mr-1 animate-pulse" />
                <span className="text-red-400">{results.prediction}</span>
              </>
            )}
          </div>
        </div>
        
        <div className="p-3 rounded-lg bg-white/5 border border-white/10 hover-scale">
          <div className="text-xs text-muted-foreground mb-1">Target</div>
          <div className="font-medium">{results.priceTarget}</div>
        </div>
        
        <div className="p-3 rounded-lg bg-white/5 border border-white/10 hover-scale">
          <div className="text-xs text-muted-foreground mb-1">Time Frame</div>
          <div className="font-medium">{results.timeFrame}</div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 p-3 rounded-lg bg-white/5 border border-white/10 animate-fade-in">
          <div className="text-xs text-muted-foreground mb-2">Support Levels</div>
          <div className="space-y-1">
            {results.supportLevels.map((level, index) => (
              <div key={index} className="flex items-center">
                <ArrowDownRight className="h-3.5 w-3.5 text-green-400 mr-1" />
                <span className="font-mono">{level}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex-1 p-3 rounded-lg bg-white/5 border border-white/10 animate-fade-in">
          <div className="text-xs text-muted-foreground mb-2">Resistance Levels</div>
          <div className="space-y-1">
            {results.resistanceLevels.map((level, index) => (
              <div key={index} className="flex items-center">
                <ArrowUpRight className="h-3.5 w-3.5 text-red-400 mr-1" />
                <span className="font-mono">{level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-4 rounded-lg bg-white/[0.03] border border-white/10 animate-fade-in">
        <div className="text-xs text-muted-foreground mb-2">AI Analysis</div>
        <p className="text-sm">{results.analysis}</p>
      </div>
    </div>
  );
};

export default AnalysisResults;
