
import React, { useState, useMemo } from 'react';
import { 
  LineChart, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle2, 
  Search, 
  Filter,
  Download,
  Calendar,
  Wallet,
  ArrowRight
} from 'lucide-react';
import { formatCurrency, MOCK_DATA } from '../constants';

// Helper to generate distributed target and random realization
const generateMonthlyDetails = (totalPagu: number) => {
  const details = [];
  let remainingTarget = totalPagu;
  
  for (let i = 0; i < 12; i++) {
    // 1. Generate Target (Rencana) - skewed slightly towards end of year
    let target = 0;
    if (i === 11) {
       target = remainingTarget;
    } else {
       // Random distribution between 2% to 15% per month
       const factor = Math.random() * (0.15 - 0.02) + 0.02; 
       target = Math.floor(totalPagu * factor);
       // Ensure we don't exceed remaining
       if (target > remainingTarget) target = remainingTarget;
       remainingTarget -= target;
    }

    // 2. Generate Realization based on Target (Performance variation)
    // Performance factor between 0% (failed) to 110% (over-performance/catchup)
    const performanceFactor = Math.random() * (1.1 - 0.0) + 0.0;
    const actual = Math.floor(target * performanceFactor);

    details.push({
      monthIndex: i,
      target: target,
      actual: actual,
      achievement: target > 0 ? (actual / target) * 100 : 0
    });
  }
  return details;
};

export const RPDManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Enrich Data with RPD specifics
  const rpdData = useMemo(() => {
    return MOCK_DATA.map(unit => {
      const monthlyData = generateMonthlyDetails(unit.pagu);
      
      // Calculate totals from the monthly breakdown
      const totalRealization = monthlyData.reduce((acc, m) => acc + m.actual, 0);
      const achievement = (totalRealization / unit.pagu) * 100;
      
      return {
        ...unit,
        realization: totalRealization,
        achievement,
        monthlyData: monthlyData
      };
    });
  }, []);

  const filteredData = rpdData.filter(item => 
    item.unitName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.unitCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Summary Calculations
  const totalPagu = rpdData.reduce((acc, curr) => acc + curr.pagu, 0);
  const totalRealization = rpdData.reduce((acc, curr) => acc + curr.realization, 0);
  const totalAchievement = (totalRealization / totalPagu) * 100;

  const getStatusColor = (percent: number) => {
    if (percent >= 90) return 'bg-emerald-500';
    if (percent >= 70) return 'bg-blue-500';
    if (percent >= 50) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const getStatusText = (percent: number) => {
    if (percent >= 90) return 'text-emerald-600';
    if (percent >= 70) return 'text-blue-600';
    if (percent >= 50) return 'text-amber-600';
    return 'text-rose-600';
  };

  const getBadgeColor = (percent: number) => {
    if (percent >= 100) return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (percent >= 80) return 'bg-blue-100 text-blue-700 border-blue-200';
    if (percent >= 50) return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-rose-100 text-rose-700 border-rose-200';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      
      {/* Header & Summary Box */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
         <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4 w-full md:w-auto">
               <div className="p-4 bg-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-600/20">
                  <LineChart size={32} />
               </div>
               <div>
                  <h2 className="text-2xl font-black text-slate-800 tracking-tight">Rencana Penarikan Dana</h2>
                  <p className="text-sm text-slate-500 font-medium">Monitoring performa penyerapan anggaran unit kerja TA 2025</p>
               </div>
            </div>

            {/* Summary Gauge / Big Number */}
            <div className="flex items-center gap-8 w-full md:w-auto bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="text-right">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Rencana (Pagu)</p>
                   <p className="text-lg font-bold text-slate-800 font-mono">Rp {formatCurrency(totalPagu)}</p>
                </div>
                
                {/* Visual Gauge Representation */}
                <div className="relative w-24 h-24 flex items-center justify-center">
                   <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        className="text-slate-200"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className={`${totalAchievement >= 80 ? 'text-emerald-500' : totalAchievement >= 50 ? 'text-amber-500' : 'text-rose-500'} transition-all duration-1000 ease-out`}
                        strokeDasharray={`${totalAchievement}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                   </svg>
                   <div className="absolute flex flex-col items-center">
                      <span className="text-sm font-black text-slate-800">{totalAchievement.toFixed(1)}%</span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase">Terserap</span>
                   </div>
                </div>

                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Realisasi (Cair)</p>
                   <p className={`text-lg font-bold font-mono ${getStatusText(totalAchievement)}`}>Rp {formatCurrency(totalRealization)}</p>
                </div>
            </div>
         </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
         <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Cari Unit Kerja..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all shadow-sm"
            />
         </div>
         <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all">
               <Calendar size={14} /> Filter Bulan
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">
               <Download size={14} /> Export Excel
            </button>
         </div>
      </div>

      {/* SPLIT TABLE IMPLEMENTATION */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col relative">
         <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-black uppercase text-slate-500 tracking-widest">
                     {/* STICKY HEADER COLUMNS */}
                     <th className="px-4 py-4 w-12 text-center sticky left-0 bg-slate-50 z-20 border-r border-slate-200">No</th>
                     <th className="px-4 py-4 min-w-[200px] sticky left-[48px] bg-slate-50 z-20 border-r border-slate-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">Unit Kerja</th>
                     <th className="px-4 py-4 text-right min-w-[140px] sticky left-[248px] bg-slate-50 z-20 border-r border-slate-200">Target Total</th>
                     <th className="px-4 py-4 text-right min-w-[140px] sticky left-[388px] bg-slate-50 z-20 border-r border-slate-200">Realisasi Total</th>
                     <th className="px-4 py-4 text-center min-w-[120px] sticky left-[528px] bg-slate-50 z-20 border-r border-slate-200 shadow-[4px_0_10px_-4px_rgba(0,0,0,0.1)]">Pencapaian</th>
                     
                     {/* SCROLLABLE MONTHLY HEADERS */}
                     {['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'].map(m => (
                        <th key={m} className="px-4 py-4 text-center min-w-[160px] border-r border-slate-100">{m}</th>
                     ))}
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filteredData.map((item, idx) => (
                     <tr key={item.id} className="hover:bg-indigo-50/30 transition-colors group">
                        
                        {/* STICKY DATA COLUMNS */}
                        <td className="px-4 py-3 text-center text-xs font-bold text-slate-400 sticky left-0 bg-white group-hover:bg-indigo-50/30 z-10 border-r border-slate-100">
                           {idx + 1}
                        </td>
                        <td className="px-4 py-3 sticky left-[48px] bg-white group-hover:bg-indigo-50/30 z-10 border-r border-slate-100 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                           <div className="font-bold text-slate-700 text-xs">{item.unitName}</div>
                           <div className="text-[10px] text-slate-400 font-black">{item.unitCode}</div>
                        </td>
                        <td className="px-4 py-3 text-right sticky left-[248px] bg-white group-hover:bg-indigo-50/30 z-10 border-r border-slate-100">
                           <span className="font-mono text-xs font-bold text-slate-600">{formatCurrency(item.pagu)}</span>
                        </td>
                        <td className="px-4 py-3 text-right sticky left-[388px] bg-white group-hover:bg-indigo-50/30 z-10 border-r border-slate-100">
                           <span className={`font-mono text-xs font-bold ${getStatusText(item.achievement)}`}>
                              {formatCurrency(item.realization)}
                           </span>
                        </td>
                        <td className="px-4 py-3 sticky left-[528px] bg-white group-hover:bg-indigo-50/30 z-10 border-r border-slate-100 shadow-[4px_0_10px_-4px_rgba(0,0,0,0.05)]">
                           <div className="flex flex-col gap-1.5">
                              <div className="flex justify-between items-center">
                                 <span className={`text-[10px] font-black ${getStatusText(item.achievement)}`}>{item.achievement.toFixed(1)}%</span>
                                 {item.achievement < 50 && <AlertCircle size={10} className="text-rose-500" />}
                                 {item.achievement > 80 && <CheckCircle2 size={10} className="text-emerald-500" />}
                              </div>
                              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                 <div 
                                    className={`h-full rounded-full ${getStatusColor(item.achievement)}`} 
                                    style={{ width: `${item.achievement}%` }}
                                 ></div>
                              </div>
                           </div>
                        </td>

                        {/* SCROLLABLE MONTHLY DATA (REVISED) */}
                        {item.monthlyData.map((m, mIdx) => (
                           <td key={mIdx} className="px-3 py-3 border-r border-slate-50 align-top">
                              <div className="flex flex-col justify-between h-full min-h-[40px]">
                                 {/* Top: Actual & Badge */}
                                 <div className="flex justify-between items-start mb-1">
                                    <span className={`font-mono text-xs font-bold ${m.actual >= m.target ? 'text-slate-800' : 'text-slate-500'}`}>
                                       {formatCurrency(m.actual)}
                                    </span>
                                    {m.target > 0 && (
                                       <span className={`text-[9px] font-black px-1.5 py-0.5 rounded border ${getBadgeColor(m.achievement)}`}>
                                          {m.achievement.toFixed(0)}%
                                       </span>
                                    )}
                                 </div>
                                 
                                 {/* Bottom: Target */}
                                 <div className="flex justify-between items-center">
                                    <span className="text-[9px] text-slate-400 font-medium">Renc:</span>
                                    <span className="font-mono text-[10px] text-slate-400">
                                       {formatCurrency(m.target)}
                                    </span>
                                 </div>
                                 
                                 {/* Micro Progress Bar per Month */}
                                 {m.target > 0 && (
                                    <div className="w-full h-1 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                                       <div 
                                          className={`h-full rounded-full ${getStatusColor(m.achievement)}`} 
                                          style={{ width: `${Math.min(m.achievement, 100)}%` }}
                                       ></div>
                                    </div>
                                 )}
                              </div>
                           </td>
                        ))}
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      <div className="flex flex-wrap gap-6 justify-center text-xs font-bold text-slate-500 pt-4 border-t border-slate-200/50">
         <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500"></div> Optimal ({'>'}90%)</div>
         <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500"></div> Baik (70-90%)</div>
         <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-500"></div> Perlu Perhatian (50-70%)</div>
         <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-rose-500"></div> Kurang ({'<'}50%)</div>
      </div>
    </div>
  );
};
