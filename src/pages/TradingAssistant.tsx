import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User, ChartCandlestick, TrendingUp, TrendingDown, AlertTriangle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { askTradingQuestion } from '@/utils/aiTrading';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const TradingAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi, I'm your AI Trading Assistant. Ask me about market trends, trading strategies, or specific assets.",
      sender: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Call our AI trading assistant
      const response = await askTradingQuestion({
        question: input
      });
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: response.answer,
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 opacity-30 grid-pattern"></div>
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-radial from-primary/5 to-transparent opacity-30"></div>
          </div>
          
          <div className="container mx-auto max-w-5xl px-6 md:px-10 relative z-10">
            <div className="text-center mb-12 animate-fade-in">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary-foreground ring-1 ring-inset ring-primary/20 mb-4">
                <span className="flex h-1.5 w-1.5 rounded-full bg-primary mr-1.5 animate-pulse"></span>
                AI Trading Assistant
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Personal Trading Advisor</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Ask questions about market trends, trading strategies, technical analysis, or get predictions for specific assets.
              </p>
            </div>
            
            <div className="glassmorphism rounded-xl overflow-hidden animate-fade-in delay-75">
              <div className="p-4 border-b border-white/10 flex items-center bg-white/[0.02]">
                <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mr-3">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">AI Trading Assistant</h3>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></span>
                    Online
                  </div>
                </div>
                <div className="ml-auto">
                  <div className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-muted-foreground">
                    <ChartCandlestick className="h-3 w-3 inline-block mr-1" />
                    Market Data Updated: 5 min ago
                  </div>
                </div>
              </div>
              
              <div className="h-[500px] overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] md:max-w-[70%] rounded-lg p-3 ${
                        message.sender === 'user' 
                          ? 'bg-primary/10 border border-primary/20 text-white' 
                          : 'bg-white/[0.03] border border-white/10'
                      }`}
                    >
                      <div className="flex items-center mb-1">
                        {message.sender === 'assistant' ? (
                          <Bot className="h-3.5 w-3.5 text-primary mr-1.5" />
                        ) : (
                          <User className="h-3.5 w-3.5 text-primary mr-1.5" />
                        )}
                        <span className="text-xs text-muted-foreground">
                          {message.sender === 'assistant' ? 'AI Assistant' : 'You'} • {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] md:max-w-[70%] rounded-lg p-3 bg-white/[0.03] border border-white/10">
                      <div className="flex items-center">
                        <Bot className="h-3.5 w-3.5 text-primary mr-1.5" />
                        <span className="text-xs text-muted-foreground">AI Assistant</span>
                      </div>
                      <div className="mt-2 flex items-center space-x-1">
                        <div className="h-2 w-2 rounded-full bg-primary/50 animate-bounce"></div>
                        <div className="h-2 w-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="h-2 w-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              <div className="p-4 border-t border-white/10 bg-white/[0.01]">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Ask about market trends, strategies, or specific assets..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                    className="flex-1 bg-white/5 border-white/10"
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoading || !input.trim()}
                    size="icon"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
                
                <div className="mt-3 flex items-start">
                  <AlertTriangle className="h-3.5 w-3.5 text-yellow-400 mr-1.5 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    This AI assistant provides general information and analysis, not financial advice. Always do your own research before making trading decisions.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 animate-fade-in delay-300">
              <div className="glassmorphism rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <ChartCandlestick className="h-4 w-4 text-primary mr-2" />
                  <h4 className="font-medium">Example Questions</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="cursor-pointer hover:text-primary transition-colors" onClick={() => setInput("What's your analysis on Bitcoin's current trend?")}>
                    "What's your analysis on Bitcoin's current trend?"
                  </p>
                  <p className="cursor-pointer hover:text-primary transition-colors" onClick={() => setInput("Explain the double bottom pattern")}>
                    "Explain the double bottom pattern"
                  </p>
                </div>
              </div>
              
              <div className="glassmorphism rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <TrendingUp className="h-4 w-4 text-green-400 mr-2" />
                  <h4 className="font-medium">Trending Bullish</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>BTC</span>
                    <span className="text-green-400">+3.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SOL</span>
                    <span className="text-green-400">+8.7%</span>
                  </div>
                </div>
              </div>
              
              <div className="glassmorphism rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <TrendingDown className="h-4 w-4 text-red-400 mr-2" />
                  <h4 className="font-medium">Trending Bearish</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>XRP</span>
                    <span className="text-red-400">-2.1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DOGE</span>
                    <span className="text-red-400">-4.5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TradingAssistant;
