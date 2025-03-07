
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChartCandlestick, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 md:px-10',
        scrolled ? 'py-3 glassmorphism border-b border-white/5' : 'py-5 bg-transparent'
      )}
    >
      <div className="container max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <a 
            href="#" 
            className="flex items-center space-x-2 group"
          >
            <div className="h-9 w-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:border-primary/30 transition-all duration-300">
              <ChartCandlestick size={20} className="text-primary" />
            </div>
            <span className="text-foreground font-semibold text-xl tracking-tight">AITradeVision</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-white transition-colors">How It Works</a>
            <a href="#features" className="text-sm text-muted-foreground hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-white transition-colors">Pricing</a>
            <a href="#testimonials" className="text-sm text-muted-foreground hover:text-white transition-colors">Testimonials</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" className="border-white/10 hover:border-white/20 bg-white/5">Log In</Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">Get Started</Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 glassmorphism border-b border-white/5 mt-3 p-4 space-y-4 animate-fade-in">
            <nav className="flex flex-col space-y-4 mb-6 px-2">
              <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-white transition-colors py-2">How It Works</a>
              <a href="#features" className="text-sm text-muted-foreground hover:text-white transition-colors py-2">Features</a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-white transition-colors py-2">Pricing</a>
              <a href="#testimonials" className="text-sm text-muted-foreground hover:text-white transition-colors py-2">Testimonials</a>
            </nav>
            <div className="flex flex-col space-y-3 px-2">
              <Button variant="outline" className="border-white/10 hover:border-white/20 bg-white/5 w-full">Log In</Button>
              <Button className="bg-primary hover:bg-primary/90 w-full">Get Started</Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
