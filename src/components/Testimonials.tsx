
import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    content: "AITradeVision has completely transformed my trading strategy. The AI predictions are incredibly accurate and have helped me increase my portfolio by over 200% in just 3 months.",
    author: "Michael T.",
    position: "Day Trader",
    rating: 5
  },
  {
    content: "As a professional trader, I've tried many AI tools, but AITradeVision stands apart with its pattern recognition capabilities. The confidence scores are remarkably reliable.",
    author: "Sarah Johnson",
    position: "Crypto Fund Manager",
    rating: 5
  },
  {
    content: "The AI chat assistant is like having a trading expert available 24/7. It helps me understand market trends and make better decisions based on data rather than emotions.",
    author: "David Wang",
    position: "Retail Investor",
    rating: 4
  },
  {
    content: "I was skeptical about AI trading tools, but AITradeVision's accuracy exceeded my expectations. The platform is intuitive and the predictions have been spot on.",
    author: "Elena Rodriguez",
    position: "Forex Trader",
    rating: 5
  }
];

// Logos for trust signals
const partnerLogos = [
  { name: "Binance", logo: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png" },
  { name: "TradingView", logo: "https://store-images.s-microsoft.com/image/apps.37284.13510798887933723.c8245a04-d331-432c-bd04-bf6df98472c4.7337860f-7afc-4faf-a61d-25389a14e9ce" },
  { name: "OpenAI", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1024px-OpenAI_Logo.svg.png" },
  { name: "Coinbase", logo: "https://images.ctfassets.net/q5ulk4bp65r7/3TBS4oVkD1ghowTqVQJlqj/2dfd4ea3b623a7c0d8deb2ff445dee9e/Consumer_Wordmark.svg" }
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-30 grid-pattern"></div>
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-primary/5 to-transparent opacity-40"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl px-6 md:px-10 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary-foreground ring-1 ring-inset ring-primary/20 mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hear from traders who have transformed their strategies with AITradeVision
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`glassmorphism rounded-xl p-6 flex flex-col animate-fade-in delay-${150 + index * 100}`}
            >
              <div className="flex space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted'}`} 
                  />
                ))}
              </div>
              
              <p className="text-sm italic mb-5 flex-grow">"{testimonial.content}"</p>
              
              <div>
                <div className="font-medium">{testimonial.author}</div>
                <div className="text-xs text-muted-foreground">{testimonial.position}</div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Trust Signals */}
        <div className="mt-20">
          <div className="text-center mb-10 animate-fade-in delay-500">
            <h3 className="text-xl font-medium mb-2">Trusted By Industry Leaders</h3>
            <p className="text-muted-foreground">
              Integrated with top platforms for seamless trading experiences
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-10 animate-fade-in delay-700">
            {partnerLogos.map((partner, index) => (
              <div key={index} className="grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-8 md:h-10 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Disclaimer */}
        <div className="mt-16 text-center animate-fade-in delay-700">
          <div className="glassmorphism rounded-xl p-6 max-w-4xl mx-auto">
            <h3 className="text-lg font-medium mb-3">Security & Disclaimer</h3>
            <p className="text-muted-foreground text-sm">
              AITradeVision provides market predictions and analysis based on AI technology, but does not provide financial advice. Trading involves risk, and past performance is not indicative of future results. Always do your own research before making investment decisions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
