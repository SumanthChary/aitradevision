
declare module '@/utils/analyzeImage' {
  export interface AnalysisResult {
    pattern?: string;
    trend?: string;
    support?: number[];
    resistance?: number[];
    indicators?: {
      name: string;
      value: string | number;
      interpretation: string;
    }[];
    recommendation?: string;
    confidence?: number;
    timeframe?: string;
    [key: string]: any; // Allow for additional properties
  }

  export function analyzeChartImage(image: string): Promise<AnalysisResult>;
}
