
import React from 'react';

// Simple Area Chart component
export const AreaChart = ({ data, className }: { data: any[], className?: string }) => (
  <div className={`${className} flex items-end justify-between`}>
    {data.map((item, index) => (
      <div key={index} className="flex flex-col items-center">
        <div 
          className="bg-primary/80 w-8 rounded-t-md" 
          style={{ height: `${(item.value / 4000) * 100}%` }}
        ></div>
        <span className="text-xs mt-1">{item.name}</span>
      </div>
    ))}
  </div>
);

// Simple Bar Chart component
export const BarChart = ({ data, className }: { data: any[], className?: string }) => (
  <div className={`${className} flex items-end justify-between`}>
    {data.map((item, index) => (
      <div key={index} className="flex flex-col items-center">
        <div 
          className="bg-primary/80 w-8 rounded-t-md" 
          style={{ height: `${item.value}%` }}
        ></div>
        <span className="text-xs mt-1">{item.name}</span>
      </div>
    ))}
  </div>
);
