
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import MarketInsights from '@/components/MarketInsights';
import PricingTable from '@/components/PricingTable';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  // Smooth scroll implementation
  useEffect(() => {
    const handleScrollToAnchor = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.hasAttribute('href')) {
        const href = target.getAttribute('href') || '';
        if (href.startsWith('#') && href.length > 1) {
          e.preventDefault();
          const targetElement = document.getElementById(href.substring(1));
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 100,
              behavior: 'smooth'
            });
            
            // Update URL without page jump
            window.history.pushState({}, '', href);
          }
        }
      }
    };

    document.addEventListener('click', handleScrollToAnchor);
    
    return () => {
      document.removeEventListener('click', handleScrollToAnchor);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <div className="container mx-auto max-w-7xl px-6 md:px-10 py-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-6 animate-fade-in delay-700">
            <Link to="/chart-analysis" className="glassmorphism rounded-xl p-6 hover:bg-white/[0.05] transition-colors group">
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">Chart Analysis</h3>
              <p className="text-muted-foreground mb-4">Upload any trading chart and let our AI identify patterns, support/resistance levels, and provide actionable insights.</p>
              <div className="text-primary font-medium flex items-center">
                Try Chart Analysis 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </Link>
            
            <Link to="/trading-assistant" className="glassmorphism rounded-xl p-6 hover:bg-white/[0.05] transition-colors group">
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">AI Trading Assistant</h3>
              <p className="text-muted-foreground mb-4">Chat with our AI assistant to get insights on market trends, trading strategies, and specific asset predictions.</p>
              <div className="text-primary font-medium flex items-center">
                Try Trading Assistant
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
        <HowItWorks />
        <Features />
        <MarketInsights />
        <PricingTable />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
