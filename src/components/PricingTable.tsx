
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

type PricingPeriod = 'monthly' | 'yearly';

const PricingTable: React.FC = () => {
  const [period, setPeriod] = useState<PricingPeriod>('monthly');

  const plans = [
    {
      name: "Free Plan",
      price: { monthly: "$0", yearly: "$0" },
      description: "Perfect for trying out the platform",
      features: [
        { name: "3 AI Predictions Per Day", included: true },
        { name: "Real-Time Market Data", included: true },
        { name: "Leaderboard Access", included: true },
        { name: "Confidence Score", included: false },
        { name: "AI Chat Assistant", included: false },
        { name: "Historical Backtesting", included: false },
        { name: "Exclusive Market Reports", included: false },
        { name: "Pump/Dump Alerts", included: false },
        { name: "Early Access to New Features", included: false },
      ],
      ctaText: "Get Started Free",
      popular: false
    },
    {
      name: "Pro Trader",
      price: { monthly: "$29.99", yearly: "$24.99" },
      description: "For active traders seeking an edge",
      features: [
        { name: "Unlimited AI Predictions", included: true },
        { name: "Real-Time Market Data", included: true },
        { name: "Leaderboard Access", included: true },
        { name: "Confidence Score", included: true },
        { name: "AI Chat Assistant", included: true },
        { name: "Historical Backtesting", included: true },
        { name: "Exclusive Market Reports", included: true },
        { name: "Pump/Dump Alerts", included: true },
        { name: "Early Access to New Features", included: false },
      ],
      ctaText: "Upgrade to Pro",
      popular: true
    },
    {
      name: "Elite AI",
      price: { monthly: "$79.99", yearly: "$69.99" },
      description: "For professional traders and institutions",
      features: [
        { name: "Unlimited AI Predictions", included: true },
        { name: "Real-Time Market Data", included: true },
        { name: "Leaderboard Access", included: true },
        { name: "Confidence Score", included: true },
        { name: "AI Chat Assistant", included: true },
        { name: "Historical Backtesting", included: true },
        { name: "Exclusive Market Reports", included: true },
        { name: "Pump/Dump Alerts", included: true },
        { name: "Early Access to New Features", included: true },
      ],
      ctaText: "Get Elite Access",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-30 grid-pattern"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary/5 to-transparent opacity-40"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl px-6 md:px-10 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary-foreground ring-1 ring-inset ring-primary/20 mb-4">
            Choose Your Plan
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Subscription Plans & Pricing</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select the perfect plan for your trading needs
          </p>
        </div>
        
        <div className="flex justify-center mb-10 animate-fade-in delay-150">
          <div className="inline-flex items-center p-1 bg-white/5 rounded-lg border border-white/10">
            <button
              onClick={() => setPeriod('monthly')}
              className={`px-4 py-2 text-sm rounded-md transition-all duration-200 ${
                period === 'monthly' 
                ? 'bg-primary text-white shadow-sm' 
                : 'text-muted-foreground hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setPeriod('yearly')}
              className={`px-4 py-2 text-sm rounded-md transition-all duration-200 ${
                period === 'yearly' 
                ? 'bg-primary text-white shadow-sm' 
                : 'text-muted-foreground hover:text-white'
              }`}
            >
              Yearly
              <span className="ml-1.5 inline-flex items-center rounded-full bg-green-500/10 px-1.5 py-0.5 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20">
                Save 20%
              </span>
            </button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`glassmorphism rounded-xl overflow-hidden animate-fade-in delay-${300 + index * 150} relative flex flex-col ${
                plan.popular ? 'border-primary/30 md:scale-105 z-10' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0">
                  <div className="bg-primary text-white text-xs font-medium text-center py-1.5">
                    MOST POPULAR
                  </div>
                </div>
              )}
              
              <div className={`px-6 pt-8 pb-6 ${plan.popular ? 'mt-6' : ''}`}>
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold">
                    {period === 'monthly' ? plan.price.monthly : plan.price.yearly}
                  </span>
                  <span className="text-muted-foreground ml-2">
                    /{period === 'monthly' ? 'month' : 'month, billed yearly'}
                  </span>
                </div>
                
                <Button 
                  className={`w-full ${
                    plan.popular 
                    ? 'bg-primary hover:bg-primary/90' 
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {plan.ctaText}
                </Button>
              </div>
              
              <div className="bg-white/[0.02] px-6 py-6 border-t border-white/5 flex-grow">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground mr-3 flex-shrink-0" />
                      )}
                      <span className={feature.included ? 'text-sm' : 'text-sm text-muted-foreground'}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center animate-fade-in delay-700">
          <div className="glassmorphism rounded-xl p-6 max-w-3xl mx-auto">
            <h3 className="text-xl font-medium mb-3">Enterprise Solutions</h3>
            <p className="text-muted-foreground mb-5">
              Need a custom solution for your trading firm or financial institution? We offer tailored AI trading solutions with dedicated support.
            </p>
            <Button variant="outline" className="border-white/10 hover:border-white/20 bg-white/5">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingTable;
