
import React from 'react';

// Simple Area Chart component with animations
export const AreaChart = ({ data, className }: { data: any[], className?: string }) => (
  <div className={`${className} flex items-end justify-between`}>
    {data.map((item, index) => (
      <div key={index} className="flex flex-col items-center group">
        <div 
          className="bg-primary/80 w-8 rounded-t-md transition-all duration-700 hover:bg-primary" 
          style={{ 
            height: `${(item.value / 4000) * 100}%`,
            animation: `grow ${0.5 + index * 0.1}s ease-out forwards`,
          }}
        ></div>
        <span className="text-xs mt-1 opacity-70 group-hover:opacity-100 transition-opacity">{item.name}</span>
      </div>
    ))}
    <style jsx>{`
      @keyframes grow {
        from { height: 0; }
        to { height: ${(data[0].value / 4000) * 100}%; }
      }
    `}</style>
  </div>
);

// Simple Bar Chart component with animations
export const BarChart = ({ data, className }: { data: any[], className?: string }) => (
  <div className={`${className} flex items-end justify-between`}>
    {data.map((item, index) => (
      <div key={index} className="flex flex-col items-center group">
        <div 
          className="bg-primary/80 w-8 rounded-t-md transition-all duration-300 hover:bg-primary hover:scale-105" 
          style={{ 
            height: `${item.value}%`,
            animation: `slideUp ${0.3 + index * 0.1}s ease-out forwards`,
            opacity: 0,
          }}
        ></div>
        <span className="text-xs mt-1 opacity-70 group-hover:opacity-100 transition-opacity">{item.name}</span>
        <span className="text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6">{item.value}%</span>
      </div>
    ))}
    <style jsx>{`
      @keyframes slideUp {
        from { 
          transform: translateY(20px);
          opacity: 0;
        }
        to { 
          transform: translateY(0);
          opacity: 1;
        }
      }
    `}</style>
  </div>
);

// Animated Line Chart component (new)
export const LineChart = ({ data, className }: { data: any[], className?: string }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((item.value / maxValue) * 100);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className={`${className} relative`}>
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary"
          style={{
            strokeDasharray: 200,
            strokeDashoffset: 200,
            animation: "drawLine 1.5s ease-out forwards",
          }}
        />
        {data.map((item, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = 100 - ((item.value / maxValue) * 100);
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="1.5"
              className="text-primary fill-current"
              style={{
                opacity: 0,
                animation: `fadeIn 0.3s ease-out ${0.2 + index * 0.1}s forwards`,
              }}
            />
          );
        })}
      </svg>
      <div className="flex justify-between mt-2">
        {data.map((item, index) => (
          <div key={index} className="text-xs text-center opacity-70">
            {item.name}
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes drawLine {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

// Animated Donut Chart component (new)
export const DonutChart = ({ data, className }: { data: any[], className?: string }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercent = 0;
  
  return (
    <div className={`${className} relative`}>
      <svg width="100%" height="100%" viewBox="0 0 42 42" className="donut">
        <circle
          className="donut-hole"
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="transparent"
        ></circle>
        
        {data.map((item, index) => {
          const percent = (item.value / total) * 100;
          const startPercent = cumulativePercent;
          cumulativePercent += percent;
          
          return (
            <circle
              key={index}
              className={`donut-segment`}
              cx="21"
              cy="21"
              r="15.91549430918954"
              fill="transparent"
              stroke={`hsl(${index * 40}, 70%, 50%)`}
              strokeWidth="5"
              strokeDasharray={`${percent} ${100 - percent}`}
              strokeDashoffset={100 - startPercent}
              style={{
                animation: `donutFade 1s ease-in-out forwards, donutSpin${index} 1s ease-in-out forwards`,
              }}
            ></circle>
          );
        })}
        
        <g className="chart-text">
          <text x="50%" y="50%" className="chart-number" textAnchor="middle" alignmentBaseline="middle">
            {total}%
          </text>
        </g>
      </svg>
      
      <div className="flex flex-col mt-4 gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center text-xs">
            <span 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: `hsl(${index * 40}, 70%, 50%)` }}
            ></span>
            <span>{item.name}: {item.value}%</span>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .donut {
          animation: donutFade 1s ease;
        }
        @keyframes donutFade {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        ${data.map((_, index) => `
          @keyframes donutSpin${index} {
            0% { transform: rotate(-90deg); transform-origin: center; }
            100% { transform: rotate(0); transform-origin: center; }
          }
        `).join('\n')}
      `}</style>
    </div>
  );
};
