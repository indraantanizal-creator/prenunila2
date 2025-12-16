import React from 'react';
import { StatCardProps } from '../types';

export const StatsCard: React.FC<StatCardProps> = ({ title, value, icon, trend, colorClass }) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-24 h-24 -mr-6 -mt-6 rounded-full opacity-10 ${colorClass} group-hover:scale-110 transition-transform duration-500`}></div>
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`p-2 rounded-lg ${colorClass} bg-opacity-10 text-opacity-100`}>
          {React.isValidElement(icon) ? (
            React.cloneElement(icon as React.ReactElement<{ className?: string }>, {
              className: `w-5 h-5 ${colorClass.replace('bg-', 'text-')}`,
            })
          ) : (
            icon
          )}
        </div>
        {trend && (
           <span className="text-xs font-medium px-2 py-1 bg-green-50 text-green-700 rounded-full border border-green-100 flex items-center gap-1">
             {trend}
           </span>
        )}
      </div>
      
      <div className="relative z-10">
        <h3 className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">{title}</h3>
        <p className="text-2xl font-bold text-slate-800 font-mono tracking-tight">{value}</p>
      </div>
    </div>
  );
};