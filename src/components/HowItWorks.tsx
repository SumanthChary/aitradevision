
import React from 'react';
import { UploadCloud, Cpu, BarChart, Zap, MessageSquareText } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Upload a Trading Chart",
    description: "Upload any trading chart, screenshot or candlestick pattern with a single click.",
    icon: <UploadCloud className="h-10 w-10 text-primary" />,
    delay: "delay-75"
  },
  {
    id: 2,
    title: "AI Analyzes the Pattern",
    description: "Our advanced AI system analyzes the pattern and market data using YOLO + OpenAI Vision API.",
    icon: <Cpu className="h-10 w-10 text-primary" />,
    delay: "delay-150"
  },
  {
    id: 3,
    title: "Get Instant Predictions",
    description: "Receive instant predictions including pump/dump probability and buy/sell signals.",
    icon: <BarChart className="h-10 w-10 text-primary" />,
    delay: "delay-300"
  },
  {
    id: 4,
    title: "Make Smart Trading Decisions",
    description: "Make informed trading decisions with AI confidence scores and market insights.",
    icon: <Zap className="h-10 w-10 text-primary" />,
    delay: "delay-500"
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-background to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background to-transparent"></div>
        <div className="absolute inset-0 opacity-30 grid-pattern"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl px-6 md:px-10 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How AITradeVision Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Follow these simple steps to leverage AI for your trading strategy
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div 
              key={step.id}
              className={`glassmorphism rounded-xl p-6 flex flex-col items-center text-center animate-fade-in ${step.delay} group hover:border-primary/30 transition-all duration-300`}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/5 border border-white/10 mb-5 group-hover:border-primary/20 transition-colors group-hover:light-glow">
                {step.icon}
              </div>
              <span className="inline-block px-3 py-1 text-xs font-medium bg-white/5 rounded-full mb-4">
                Step {step.id}
              </span>
              <h3 className="text-xl font-medium mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.description}</p>
            </div>
          ))}
        </div>
        
        {/* Bonus Feature */}
        <div className="mt-16 animate-fade-in delay-700">
          <div className="glassmorphism rounded-xl p-6 md:p-8 lg:p-10 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-6 md:mb-0 md:mr-8 flex-shrink-0">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-primary/10 border border-primary/20 light-glow">
                  <MessageSquareText className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-medium mb-2">AI Chat Assistant</h3>
                <p className="text-muted-foreground mb-4">
                  In addition to chart analysis, users can interact with our AI Chat Assistant to ask trading-related questions, get market insights, and learn about trading strategies.
                </p>
                <div className="inline-flex items-center text-primary text-sm font-medium">
                  <span className="mr-2">Available for Pro and Elite plans</span>
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 rounded-full border border-primary/20">
                    BONUS FEATURE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
