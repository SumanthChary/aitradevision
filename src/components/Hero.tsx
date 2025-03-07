
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Bitcoin, ChartCandlestick } from 'lucide-react';

const Hero: React.FC = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      
      const rect = glowRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      glowRef.current.style.setProperty('--x', `${x}px`);
      glowRef.current.style.setProperty('--y', `${y}px`);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-screen pt-28 pb-20 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-radial from-primary/10 to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-primary/5 to-transparent opacity-40"></div>
        <div className="absolute inset-0 opacity-30 grid-pattern"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl relative z-10 px-6 md:px-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary-foreground ring-1 ring-inset ring-primary/20 mb-5">
              <span className="flex h-1.5 w-1.5 rounded-full bg-primary mr-1.5 animate-pulse"></span>
              AI-Powered Trading Intelligence
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground animate-fade-in delay-75 mb-6">
            AI-Powered Crypto & Stock Market <span className="text-primary text-glow">Predictions</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl animate-fade-in delay-150 mb-10">
            Upload any trading chart or candlestick pattern, and let AITradeVision predict the next market move with real-time insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-300 mb-16">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white group px-6">
              Try for Free
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/10 hover:border-white/20 bg-white/5">
              Get AI Predictions Now
            </Button>
          </div>
        </div>
        
        {/* Chart display with glow effect */}
        <div 
          ref={glowRef}
          className="relative max-w-5xl mx-auto animate-fade-in delay-500 glassmorphism rounded-xl overflow-hidden"
          style={{
            '--x': '50%',
            '--y': '50%',
          } as React.CSSProperties}
        >
          <div 
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              background: 'radial-gradient(circle 250px at var(--x) var(--y), rgba(56, 189, 248, 0.15), transparent)'
            }}
          ></div>
          
          <div className="p-1 sm:p-2">
            <div className="rounded-lg overflow-hidden border border-white/10 bg-card">
              <div className="bg-[#121a2e] text-white flex items-center justify-between p-4 border-b border-white/5">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Bitcoin size={18} className="text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">Bitcoin/USD</span>
                    <span className="text-xs text-muted-foreground">BTC - 1D</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 flex items-center text-sm font-medium mr-2">
                    <TrendingUp size={14} className="mr-1" />
                    +3.24%
                  </span>
                  <span className="text-sm font-mono">$63,452.78</span>
                </div>
              </div>
              <div className="grid grid-cols-3 text-center py-2 border-b border-white/5 bg-white/[0.01]">
                <div className="flex flex-col px-4 py-1">
                  <span className="text-xs text-muted-foreground">AI Prediction</span>
                  <span className="text-green-400 font-medium">BUY</span>
                </div>
                <div className="flex flex-col px-4 py-1 border-x border-white/5">
                  <span className="text-xs text-muted-foreground">Confidence</span>
                  <span className="text-white font-medium">84%</span>
                </div>
                <div className="flex flex-col px-4 py-1">
                  <span className="text-xs text-muted-foreground">Time Frame</span>
                  <span className="text-white font-medium">24h</span>
                </div>
              </div>
              <div className="relative p-4 h-[300px] overflow-hidden">
                <img 
                  src="https://assets.maccarianagency.com/screenshots/crypto-charts.png" 
                  alt="Bitcoin Price Chart"
                  className="w-full h-full object-cover rounded opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-40"></div>
                
                {/* AI Analysis Overlay */}
                <div className="absolute right-5 top-5 glassmorphism rounded-lg p-3 max-w-[200px]">
                  <div className="flex items-center mb-2">
                    <div className="h-6 w-6 rounded bg-primary/10 border border-primary/20 flex items-center justify-center mr-2">
                      <ChartCandlestick size={14} className="text-primary" />
                    </div>
                    <span className="text-xs font-medium">AI Analysis</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Bull flag pattern detected with 84% confidence. Price target: $68,500</p>
                </div>
                
                {/* Support/Resistance lines */}
                <div className="absolute top-1/4 inset-x-0 border-t border-dashed border-green-400/30"></div>
                <div className="absolute top-3/4 inset-x-0 border-t border-dashed border-red-400/30"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats bar */}
        <div className="mt-16 max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 animate-fade-in delay-700">
          {[
            { label: "Market Data Points", value: "1.2B+" },
            { label: "Prediction Accuracy", value: "87%" },
            { label: "Active Traders", value: "45K+" },
            { label: "Daily Predictions", value: "125K+" }
          ].map((stat, index) => (
            <div key={index} className="glassmorphism rounded-lg p-4 text-center">
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
