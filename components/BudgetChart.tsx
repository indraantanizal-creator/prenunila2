import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { UnitData } from '../types';
import { formatCurrency } from '../constants';

interface BudgetChartProps {
  data: UnitData[];
}

export const BudgetChart: React.FC<BudgetChartProps> = ({ data }) => {
  // Sort data by Pagu for better visualization
  const sortedData = [...data].sort((a, b) => b.pagu - a.pagu).slice(0, 10); // Top 10 for chart clarity

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-lg text-sm">
          <p className="font-bold text-slate-800 mb-1">{label}</p>
          <p className="text-blue-600 font-mono">
            Rp {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full min-h-[400px]">
      <div className="mb-6 flex justify-between items-center">
        <div>
           <h2 className="text-lg font-bold text-slate-800">Top 10 Anggaran Unit</h2>
           <p className="text-sm text-slate-500">Distribusi Pagu per Unit Kerja (Tahun 2025)</p>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          layout="vertical"
          data={sortedData}
          margin={{
            top: 5,
            right: 30,
            left: 40,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
          <XAxis type="number" hide />
          <YAxis 
            dataKey="unitCode" 
            type="category" 
            width={70} 
            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip cursor={{ fill: '#f1f5f9' }} content={<CustomTooltip />} />
          <Bar dataKey="pagu" radius={[0, 4, 4, 0]} barSize={20}>
            {sortedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#3b82f6' : '#60a5fa'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};