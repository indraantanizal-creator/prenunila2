
import React, { useState, useMemo } from 'react';
import { 
  Wallet, 
  PieChart as PieIcon, 
  Search, 
  Save, 
  X, 
  Edit3, 
  TrendingUp, 
  AlertCircle,
  Landmark,
  ArrowRight,
  Lock
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend 
} from 'recharts';
import { UnitData } from '../types';
import { MOCK_DATA, formatCurrency } from '../constants';

// Simulasi Total Pagu Universitas (Misal: 500 Milyar)
const TOTAL_UNIVERSITY_BUDGET = 500000000000;

export const PaguManagement: React.FC = () => {
  const [units, setUnits] = useState<UnitData[]>(MOCK_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // State sementara untuk nilai yang sedang diedit
  const [editForm, setEditForm] = useState({ pagu: 0, paguBlokir: 0 });

  // Kalkulasi Real-time
  const stats = useMemo(() => {
    const totalAllocated = units.reduce((acc, curr) => acc + curr.pagu, 0);
    const totalBlocked = units.reduce((acc, curr) => acc + curr.paguBlokir, 0);
    const remainingBudget = TOTAL_UNIVERSITY_BUDGET - totalAllocated;
    const allocationPercentage = (totalAllocated / TOTAL_UNIVERSITY_BUDGET) * 100;

    return { totalAllocated, totalBlocked, remainingBudget, allocationPercentage };
  }, [units]);

  const filteredData = useMemo(() => {
    return units.filter(unit => 
      unit.unitName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      unit.unitCode.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [units, searchQuery]);

  const chartData = [
    { name: 'Terdistribusi (Aktif)', value: stats.totalAllocated - stats.totalBlocked, color: '#3b82f6' },
    { name: 'Terblokir (Cadangan)', value: stats.totalBlocked, color: '#f43f5e' },
    { name: 'Belum Dialokasikan', value: stats.remainingBudget, color: '#e2e8f0' },
  ];

  // Handler Editing
  const startEditing = (unit: UnitData) => {
    setEditingId(unit.id);
    setEditForm({ pagu: unit.pagu, paguBlokir: unit.paguBlokir });
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const saveEditing = (id: number) => {
    setUnits(prev => prev.map(unit => {
      if (unit.id === id) {
        return {
          ...unit,
          pagu: editForm.pagu,
          paguBlokir: editForm.paguBlokir,
          paguAktif: editForm.pagu - editForm.paguBlokir // Recalculate Active
        };
      }
      return unit;
    }));
    setEditingId(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      
      {/* Top Section: Allocation Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats Card */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
           <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                  <Wallet className="text-blue-600" />
                  Distribusi Pagu Anggaran
                </h2>
                <p className="text-sm text-slate-500 font-medium mt-1">Total Dana Universitas TA 2025</p>
              </div>
              <div className="text-right">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Kapasitas</p>
                 <p className="text-2xl font-black text-slate-800 font-mono">Rp {formatCurrency(TOTAL_UNIVERSITY_BUDGET)}</p>
              </div>
           </div>

           <div className="space-y-6">
              {/* Progress Bar Visual */}
              <div className="space-y-2">
                 <div className="flex justify-between text-xs font-bold">
                    <span className="text-blue-600">Terdistribusi: {stats.allocationPercentage.toFixed(1)}%</span>
                    <span className="text-slate-400">Sisa: {(100 - stats.allocationPercentage).toFixed(1)}%</span>
                 </div>
                 <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
                    <div className="h-full bg-blue-500 transition-all duration-700 relative group" style={{ width: `${stats.allocationPercentage}%` }}>
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    {/* Visual warning if over budget (optional logic could go here) */}
                 </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                 <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Total Alokasi</p>
                    <p className="text-lg font-bold text-blue-700 font-mono">{formatCurrency(stats.totalAllocated)}</p>
                 </div>
                 <div className="p-4 bg-rose-50 rounded-xl border border-rose-100">
                    <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-1">Dana Blokir</p>
                    <p className="text-lg font-bold text-rose-700 font-mono">{formatCurrency(stats.totalBlocked)}</p>
                 </div>
                 <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Sisa Dana (Unallocated)</p>
                    <p className="text-lg font-bold text-emerald-700 font-mono">{formatCurrency(stats.remainingBudget)}</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Chart Card */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center relative">
           <h3 className="absolute top-4 left-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Komposisi Dana</h3>
           <div className="w-full h-[220px]">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={chartData}
                   cx="50%"
                   cy="50%"
                   innerRadius={60}
                   outerRadius={80}
                   paddingAngle={5}
                   dataKey="value"
                 >
                   {chartData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                   ))}
                 </Pie>
                 <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{ borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}
                 />
                 <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '10px', fontWeight: 'bold' }} />
               </PieChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* Allocation Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
         {/* Toolbar */}
         <div className="p-5 border-b border-slate-100 flex justify-between items-center gap-4 bg-slate-50/50">
            <div className="relative flex-1 max-w-md">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
               <input 
                 type="text" 
                 placeholder="Cari Unit Kerja..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all shadow-sm"
               />
            </div>
            <div className="flex items-center gap-2">
               <div className="px-3 py-1.5 bg-amber-100 text-amber-700 rounded-lg border border-amber-200 text-[10px] font-bold flex items-center gap-2">
                  <Lock size={12} />
                  Kunci Pagu Otomatis: 31 Jan 2025
               </div>
            </div>
         </div>

         {/* Table */}
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead className="bg-slate-50 border-b border-slate-100 text-[10px] uppercase font-black text-slate-500 tracking-widest">
                  <tr>
                     <th className="px-6 py-4 w-16 text-center">No</th>
                     <th className="px-6 py-4">Unit Kerja</th>
                     <th className="px-6 py-4 text-right bg-blue-50/30">Pagu Dasar</th>
                     <th className="px-6 py-4 text-right bg-rose-50/30">Blokir / Cadangan</th>
                     <th className="px-6 py-4 text-right bg-emerald-50/30">Pagu Aktif</th>
                     <th className="px-6 py-4 text-center">Aksi</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {filteredData.map((unit, idx) => {
                     const isEditing = editingId === unit.id;

                     return (
                        <tr key={unit.id} className={`transition-colors ${isEditing ? 'bg-indigo-50/30' : 'hover:bg-slate-50'}`}>
                           <td className="px-6 py-4 text-center text-xs font-bold text-slate-400">{idx + 1}</td>
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 font-black text-[10px]">
                                    {unit.unitCode}
                                 </div>
                                 <div className="font-bold text-slate-700 text-xs">{unit.unitName}</div>
                              </div>
                           </td>
                           
                           {/* Pagu Dasar Column */}
                           <td className="px-6 py-4 text-right bg-blue-50/10">
                              {isEditing ? (
                                 <input 
                                    type="number" 
                                    value={editForm.pagu}
                                    onChange={(e) => setEditForm({...editForm, pagu: Number(e.target.value)})}
                                    className="w-full text-right px-2 py-1.5 border border-blue-300 rounded bg-white font-mono text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                                 />
                              ) : (
                                 <span className="font-mono text-xs font-bold text-slate-600">{formatCurrency(unit.pagu)}</span>
                              )}
                           </td>

                           {/* Pagu Blokir Column */}
                           <td className="px-6 py-4 text-right bg-rose-50/10">
                              {isEditing ? (
                                 <input 
                                    type="number" 
                                    value={editForm.paguBlokir}
                                    onChange={(e) => setEditForm({...editForm, paguBlokir: Number(e.target.value)})}
                                    className="w-full text-right px-2 py-1.5 border border-rose-300 rounded bg-white font-mono text-xs font-bold focus:ring-2 focus:ring-rose-500 outline-none text-rose-600"
                                 />
                              ) : (
                                 <span className="font-mono text-xs font-bold text-rose-500">{formatCurrency(unit.paguBlokir)}</span>
                              )}
                           </td>

                           {/* Pagu Aktif Column (Calculated) */}
                           <td className="px-6 py-4 text-right bg-emerald-50/10">
                              <div className="flex flex-col items-end">
                                 <span className="font-mono text-sm font-black text-emerald-600">
                                    {isEditing 
                                       ? formatCurrency(editForm.pagu - editForm.paguBlokir)
                                       : formatCurrency(unit.paguAktif)
                                    }
                                 </span>
                                 <span className="text-[9px] text-slate-400 font-medium">Available</span>
                              </div>
                           </td>

                           {/* Actions */}
                           <td className="px-6 py-4 text-center">
                              {isEditing ? (
                                 <div className="flex justify-center gap-2">
                                    <button 
                                       onClick={() => saveEditing(unit.id)}
                                       className="p-1.5 bg-emerald-100 text-emerald-600 rounded hover:bg-emerald-200 transition-colors"
                                    >
                                       <Save size={16} />
                                    </button>
                                    <button 
                                       onClick={cancelEditing}
                                       className="p-1.5 bg-slate-100 text-slate-500 rounded hover:bg-slate-200 transition-colors"
                                    >
                                       <X size={16} />
                                    </button>
                                 </div>
                              ) : (
                                 <button 
                                    onClick={() => startEditing(unit)}
                                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                 >
                                    <Edit3 size={16} />
                                 </button>
                              )}
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};
