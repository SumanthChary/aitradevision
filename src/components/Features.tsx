
import React from 'react';
import { ChartCandlestick, Clock, BarChart, MessageSquareText, History, Trophy } from 'lucide-react';

const features = [
  {
    title: "AI-Powered Pattern Recognition",
    description: "Instantly identify over 100+ candlestick patterns with advanced AI recognition technology.",
    icon: <ChartCandlestick className="h-6 w-6 text-primary" />,
    delay: "delay-75"
  },
  {
    title: "Real-Time Market Data",
    description: "Access real-time data and predictions for crypto, stocks, forex and commodities markets.",
    icon: <Clock className="h-6 w-6 text-primary" />,
    delay: "delay-150"
  },
  {
    title: "Confidence Score & Accuracy",
    description: "Get detailed confidence scores and accuracy percentage for every trading prediction.",
    icon: <BarChart className="h-6 w-6 text-primary" />,
    delay: "delay-300"
  },
  {
    title: "AI Chat Assistant",
    description: "Ask trading questions and get personalized market insights from your AI trading assistant.",
    icon: <MessageSquareText className="h-6 w-6 text-primary" />,
    delay: "delay-75"
  },
  {
    title: "Historical Backtesting",
    description: "Test AI predictions against historical data to validate trading strategies and performance.",
    icon: <History className="h-6 w-6 text-primary" />,
    delay: "delay-150"
  },
  {
    title: "Leaderboards & Rankings",
    description: "Compare your performance with other traders and climb the community leaderboard.",
    icon: <Trophy className="h-6 w-6 text-primary" />,
    delay: "delay-300"
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-radial from-primary/5 to-transparent opacity-40"></div>
        <div className="absolute inset-0 opacity-20 grid-pattern"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl px-6 md:px-10 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary-foreground ring-1 ring-inset ring-primary/20 mb-4">
            Premium Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Trading Intelligence</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Leverage cutting-edge AI technology to make smarter trading decisions
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`glassmorphism rounded-xl p-6 animate-fade-in ${feature.delay} group hover:border-primary/30 transition-all duration-300`}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 mr-4 group-hover:border-primary/20 group-hover:bg-primary/5 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium">{feature.title}</h3>
              </div>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* Demo Feature */}
        <div className="mt-20 animate-fade-in delay-700">
          <div className="glassmorphism rounded-xl overflow-hidden">
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-center border-b border-white/5">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h3 className="text-2xl font-bold mb-2">AI Chart Analysis</h3>
                <p className="text-muted-foreground max-w-xl">
                  See how our AI identifies patterns, support/resistance levels, and provides actionable trading insights with confidence scores.
                </p>
              </div>
              <div className="flex-shrink-0 ml-auto">
                <span className="inline-flex items-center rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20">
                  LIVE DEMO
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="bg-black/50 aspect-[16/9]">
                <img 
                  src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1740&auto=format&fit=crop"
                  alt="AI Trading Analysis Demo"
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-primary/90 flex items-center justify-center cursor-pointer hover:bg-primary transition-colors light-glow">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-8 w-8 text-white ml-1" 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* AI Analysis Overlay */}
              <div className="absolute top-4 right-4 glassmorphism rounded-lg p-4 max-w-xs">
                <div className="flex items-center mb-3">
                  <span className="text-sm font-medium">AI Market Analysis</span>
                  <span className="ml-auto inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                    LIVE
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Pattern:</span>
                    <span className="text-xs font-medium">Double Bottom</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Signal:</span>
                    <span className="text-xs font-medium text-green-400">Strong Buy</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Confidence:</span>
                    <span className="text-xs font-medium">92%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Target:</span>
                    <span className="text-xs font-medium">$68,240</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
