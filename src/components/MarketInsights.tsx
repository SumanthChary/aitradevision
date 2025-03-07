
import React from 'react';
import { TrendingUp, TrendingDown, Bitcoin, ChartCandlestick, DollarSign, Zap } from 'lucide-react';

const marketData = [
  { 
    name: "Bitcoin", 
    symbol: "BTC", 
    price: "$63,452.78", 
    change: "+3.24%", 
    prediction: "72% Pump in 24h",
    trend: "up",
    icon: <Bitcoin className="h-5 w-5 text-[#f7931a]" />
  },
  { 
    name: "Ethereum", 
    symbol: "ETH", 
    price: "$3,245.92", 
    change: "+1.82%", 
    prediction: "65% Pump in 24h",
    trend: "up",
    icon: <ChartCandlestick className="h-5 w-5 text-[#627eea]" />
  },
  { 
    name: "NASDAQ", 
    symbol: "COMP", 
    price: "$17,842.35", 
    change: "-0.73%", 
    prediction: "54% Dump in 48h",
    trend: "down",
    icon: <DollarSign className="h-5 w-5 text-white" />
  },
  { 
    name: "S&P 500", 
    symbol: "SPX", 
    price: "$5,102.67", 
    change: "+0.21%", 
    prediction: "61% Sideways",
    trend: "up",
    icon: <ChartCandlestick className="h-5 w-5 text-white" />
  }
];

const MarketInsights: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-30 grid-pattern"></div>
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-radial from-primary/5 to-transparent opacity-30"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl px-6 md:px-10 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary-foreground ring-1 ring-inset ring-primary/20 mb-4">
            <span className="flex h-1.5 w-1.5 rounded-full bg-primary mr-1.5 animate-pulse"></span>
            Live Insights
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Live Market Insights & Predictions</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real-time market data and AI predictions to help you stay ahead
          </p>
        </div>
        
        <div className="glassmorphism rounded-xl overflow-hidden animate-fade-in delay-150">
          <div className="overflow-x-auto">
            <table className="w-full min-w-full border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Asset</th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">24h Change</th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">AI Prediction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {marketData.map((asset, index) => (
                  <tr key={index} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 mr-3 rounded-md bg-white/5 border border-white/10 flex items-center justify-center">
                          {asset.icon}
                        </div>
                        <div>
                          <div className="font-medium">{asset.name}</div>
                          <div className="text-xs text-muted-foreground">{asset.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="font-mono font-medium">{asset.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        asset.trend === 'up' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                      }`}>
                        {asset.trend === 'up' ? 
                          <TrendingUp className="h-3 w-3 mr-1" /> : 
                          <TrendingDown className="h-3 w-3 mr-1" />
                        }
                        {asset.change}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-primary/5 border border-primary/10">
                        <Zap className="h-3 w-3 text-primary mr-1.5" />
                        <span className="text-xs font-medium">{asset.prediction}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Recent Predictions and Top Traders */}
        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <div className="glassmorphism rounded-xl p-6 animate-fade-in delay-300">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <ChartCandlestick className="h-5 w-5 text-primary mr-2" />
              Recent AI Predictions
            </h3>
            <div className="space-y-4">
              {[
                { asset: "BTC/USD", pattern: "Bull Flag", signal: "Buy", confidence: "84%", time: "2h ago" },
                { asset: "ETH/USD", pattern: "Cup and Handle", signal: "Buy", confidence: "76%", time: "4h ago" },
                { asset: "AAPL", pattern: "Double Top", signal: "Sell", confidence: "82%", time: "6h ago" }
              ].map((prediction, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div>
                    <div className="font-medium">{prediction.asset}</div>
                    <div className="text-xs text-muted-foreground flex items-center">
                      <span>{prediction.pattern}</span>
                      <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground mx-1.5"></span>
                      <span>{prediction.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium mr-2 ${
                      prediction.signal === 'Buy' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                    }`}>
                      {prediction.signal}
                    </span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-white/5">
                      {prediction.confidence}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="glassmorphism rounded-xl p-6 animate-fade-in delay-500">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <Trophy className="h-5 w-5 text-primary mr-2" />
              Top Performing Traders
            </h3>
            <div className="space-y-4">
              {[
                { name: "CryptoWhale", winRate: "92%", profit: "+345%", trades: "124" },
                { name: "AlgoTrader", winRate: "88%", profit: "+276%", trades: "98" },
                { name: "AImaster", winRate: "85%", profit: "+210%", trades: "156" }
              ].map((trader, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-medium mr-3">
                      {index + 1}
                    </div>
                    <span className="font-medium">{trader.name}</span>
                  </div>
                  <div className="flex space-x-3 text-xs">
                    <div className="flex flex-col items-end">
                      <span className="text-muted-foreground">Win Rate</span>
                      <span className="font-medium">{trader.winRate}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-muted-foreground">Profit</span>
                      <span className="font-medium text-green-400">{trader.profit}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-muted-foreground">Trades</span>
                      <span className="font-medium">{trader.trades}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketInsights;
