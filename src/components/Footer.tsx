
import React from 'react';
import { ChartCandlestick, Twitter, Github, Linkedin, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/10">
      {/* CTA Section */}
      <div className="relative z-10 py-16 md:py-24 overflow-hidden bg-gradient-to-b from-background to-[#0a101f]">
        <div className="container mx-auto max-w-7xl px-6 md:px-10">
          <div className="glassmorphism rounded-xl p-8 md:p-12 relative overflow-hidden">
            {/* Background gradient effects */}
            <div className="absolute inset-0 z-0">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-30"></div>
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary/10 to-transparent opacity-30"></div>
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Start Making Smart Trades Today!</h2>
                <p className="text-muted-foreground max-w-xl">
                  Join AITradeVision and stay ahead of the market with AI-powered trading intelligence.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  Try AI Predictions for Free
                </Button>
                <Button size="lg" variant="outline" className="border-white/10 hover:border-white/20 bg-white/5">
                  Upgrade to Pro
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer */}
      <div className="bg-[#0a101f] py-12 md:py-16 relative z-10">
        <div className="container mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <a href="#" className="flex items-center space-x-2 mb-6">
                <div className="h-9 w-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <ChartCandlestick size={20} className="text-primary" />
                </div>
                <span className="text-foreground font-semibold text-xl tracking-tight">AITradeVision</span>
              </a>
              
              <p className="text-muted-foreground mb-6 max-w-md">
                AITradeVision combines advanced AI technology with real-time market data to provide accurate trading predictions and insights.
              </p>
              
              <div className="flex space-x-4">
                <a href="#" className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Twitter size={18} className="text-muted-foreground" />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Linkedin size={18} className="text-muted-foreground" />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Github size={18} className="text-muted-foreground" />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Youtube size={18} className="text-muted-foreground" />
                </a>
              </div>
            </div>
            
            <div className="md:col-span-7">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-medium mb-4">Platform</h3>
                  <ul className="space-y-3">
                    <li><a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">How It Works</a></li>
                    <li><a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Features</a></li>
                    <li><a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Pricing</a></li>
                    <li><a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Testimonials</a></li>
                    <li><a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">API</a></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium mb-4">Resources</h3>
                  <ul className="space-y-3">
                    <li><a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Documentation</a></li>
                    <li><a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Blog</a></li>
                    <li><a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Trading Guides</a></li>
                    <li><a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Market Analysis</a></li>
                    <li><a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">FAQ</a></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium mb-4">Company</h3>
                  <ul className="space-y-3">
                    <li><a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">About Us</a></li>
                    <li><a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Careers</a></li>
                    <li><a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Contact</a></li>
                    <li><a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Privacy Policy</a></li>
                    <li><a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Terms of Service</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {new Date().getFullYear()} AITradeVision. All rights reserved.
            </p>
            
            <div className="flex space-x-6">
              <a href="#" className="text-xs text-muted-foreground hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs text-muted-foreground hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-xs text-muted-foreground hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
