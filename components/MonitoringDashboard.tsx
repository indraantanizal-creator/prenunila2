
import React, { useMemo } from 'react';
import { 
  Activity, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  BarChart3, 
  PieChart as PieIcon,
  ArrowUpRight,
  Timer,
  FileText,
  Search,
  Filter
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Cell, 
  PieChart, 
  Pie,
  Legend,
  BarChart,
  Bar
} from 'recharts';
import { MOCK_DATA, formatCurrency } from '../constants';

// Mock Data untuk Visualisasi Tren (Simulasi)
const TREND_DATA = [
  { day: 'Senin', usulan: 15, review: 10 },
  { day: 'Selasa', usulan: 35, review: 25 },
  { day: 'Rabu', usulan: 48, review: 40 },
  { day: 'Kamis', usulan: 65, review: 55 },
  { day: 'Jumat', usulan: 82, review: 70 },
  { day: 'Sabtu', usulan: 90, review: 85 },
  { day: 'Minggu', usulan: 100, review: 92 },
];

const STATUS_DATA = [
  { name: 'Final', value: 8, color: '#10b981' }, // Emerald
  { name: 'Review', value: 4, color: '#f59e0b' }, // Amber
  { name: 'Draft', value: 3, color: '#3b82f6' }, // Blue
  { name: 'Belum', value: 1, color: '#ef4444' }, // Red
];

const RECENT_ACTIVITY = [
  { unit: 'FEB', action: 'Submit Usulan Final', time: '10 menit yll', type: 'success' },
  { unit: 'Fakultas Teknik', action: 'Revisi RAB Gedung A', time: '25 menit yll', type: 'warning' },
  { unit: 'BKKU', action: 'Blokir Pagu FH', time: '1 jam yll', type: 'danger' },
  { unit: 'LPPM', action: 'Sinkronisasi Data', time: '2 jam yll', type: 'info' },
];

export const MonitoringDashboard: React.FC = () => {
  
  // Computed High-Level Stats
  const totalPagu = MOCK_DATA.reduce((acc, curr) => acc + curr.pagu, 0);
  const totalUsulan = MOCK_DATA.reduce((acc, curr) => acc + curr.usulan, 0);
  const utilization = (totalUsulan / totalPagu) * 100;
  const unitCount = MOCK_DATA.length;
  const submittedCount = MOCK_DATA.filter(u => u.percentUsulan === 100).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      
      {/* Top Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Submission Progress */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Progress Pengajuan</h3>
            <div className="flex items-baseline gap-2">
               <span className="text-4xl font-black text-slate-800">{submittedCount}</span>
               <span className="text-lg font-medium text-slate-400">/ {unitCount} Unit</span>
            </div>
            <div className="mt-4 w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
               <div className="bg-blue-600 h-full rounded-full transition-all duration-1000" style={{ width: `${(submittedCount/unitCount)*100}%` }}></div>
            </div>
            <p className="text-xs text-blue-600 font-bold mt-2 flex items-center gap-1">
               <Activity size={12} /> {(submittedCount/unitCount*100).toFixed(0)}% Partisipasi Unit
            </p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-5">
             <FileText size={100} />
          </div>
        </div>

        {/* Card 2: Financial Absorption */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
           <div className="relative z-10">
             <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Total Nilai Usulan</h3>
             <span className="text-2xl font-black text-slate-800 tracking-tight">Rp {formatCurrency(totalUsulan)}</span>
             
             <div className="mt-4 flex items-center gap-4">
                <div className="px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-100">
                   <p className="text-[9px] font-black text-emerald-600 uppercase">Efisiensi Review</p>
                   <p className="text-sm font-bold text-emerald-700">98.2%</p>
                </div>
                <div className="px-3 py-1.5 bg-rose-50 rounded-lg border border-rose-100">
                   <p className="text-[9px] font-black text-rose-600 uppercase">Pagu Blokir</p>
                   <p className="text-sm font-bold text-rose-700">1.2%</p>
                </div>
             </div>
           </div>
           <div className="absolute -right-4 -top-4 opacity-5 rotate-12">
             <PieIcon size={120} />
           </div>
        </div>

        {/* Card 3: Live Feed */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl text-white relative overflow-hidden">
           <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Aktivitas Terbaru
              </h3>
              <Timer size={14} className="text-slate-500" />
           </div>
           <div className="space-y-4">
              {RECENT_ACTIVITY.map((act, idx) => (
                <div key={idx} className="flex gap-3 items-start group">
                   <div className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${
                      act.type === 'success' ? 'bg-emerald-500' :
                      act.type === 'warning' ? 'bg-amber-500' :
                      act.type === 'danger' ? 'bg-rose-500' : 'bg-blue-500'
                   }`} />
                   <div>
                      <p className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors">
                        <span className="text-slate-400 mr-1">[{act.unit}]</span>
                        {act.action}
                      </p>
                      <p className="text-[9px] text-slate-500">{act.time}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[350px]">
         {/* Line Chart: Velocity */}
         <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
               <div>
                  <h3 className="font-bold text-slate-800">Tren Pemasukan Data</h3>
                  <p className="text-xs text-slate-500">Kecepatan input usulan vs finalisasi review (7 Hari Terakhir)</p>
               </div>
               <div className="flex gap-2 text-[10px] font-bold">
                  <span className="flex items-center gap-1 text-blue-600"><div className="w-2 h-2 rounded-full bg-blue-600"></div> Usulan</span>
                  <span className="flex items-center gap-1 text-emerald-500"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Reviewed</span>
               </div>
            </div>
            <div className="flex-1 w-full min-h-0">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={TREND_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorUsulan" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorReview" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b'}} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="usulan" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorUsulan)" />
                    <Area type="monotone" dataKey="review" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorReview)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Donut Chart: Status Distribution */}
         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
            <h3 className="font-bold text-slate-800 mb-1">Status Unit</h3>
            <p className="text-xs text-slate-500 mb-4">Distribusi status penyelesaian RKAKL</p>
            <div className="flex-1 relative">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={STATUS_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {STATUS_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '10px', fontWeight: 'bold' }} />
                  </PieChart>
               </ResponsiveContainer>
               {/* Center Text */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center -mt-4">
                  <span className="block text-3xl font-black text-slate-800">{unitCount}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Unit</span>
               </div>
            </div>
         </div>
      </div>

      {/* Detailed Monitoring Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
         <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
               <h3 className="font-bold text-slate-800 flex items-center gap-2">
                 <BarChart3 size={18} className="text-blue-600" />
                 Matriks Kepatuhan & Performa Unit
               </h3>
               <p className="text-xs text-slate-500 mt-1">Monitoring detail deviasi pagu dan progres review</p>
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
               <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input 
                    type="text" 
                    placeholder="Filter Unit..." 
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500/20 outline-none"
                  />
               </div>
               <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500">
                  <Filter size={16} />
               </button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-slate-50 border-b border-slate-100 text-[10px] uppercase font-black text-slate-500 tracking-widest">
                  <tr>
                     <th className="px-6 py-4 w-16 text-center">Rank</th>
                     <th className="px-6 py-4">Unit Kerja</th>
                     <th className="px-6 py-4 text-center">Progress Input</th>
                     <th className="px-6 py-4 text-right">Pagu Dasar</th>
                     <th className="px-6 py-4 text-right">Deviasi (Usulan)</th>
                     <th className="px-6 py-4 text-center">Status</th>
                     <th className="px-6 py-4 text-center">Detail</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {MOCK_DATA.map((unit, idx) => {
                     const deviation = unit.usulan - unit.pagu;
                     const isOver = deviation > 0;
                     const status = idx % 4 === 0 ? 'Review' : idx % 3 === 0 ? 'Draft' : 'Final';
                     
                     return (
                        <tr key={unit.id} className="hover:bg-blue-50/20 transition-colors group">
                           <td className="px-6 py-4 text-center text-xs font-bold text-slate-400">#{idx + 1}</td>
                           <td className="px-6 py-4">
                              <div className="font-bold text-slate-800 text-xs">{unit.unitCode}</div>
                              <div className="text-[10px] text-slate-500">{unit.unitName}</div>
                           </td>
                           <td className="px-6 py-4 align-middle">
                              <div className="flex items-center gap-2">
                                 <div className="flex-1 bg-slate-100 rounded-full h-1.5 w-24 overflow-hidden">
                                    <div 
                                      className={`h-full rounded-full ${unit.percentUsulan === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} 
                                      style={{ width: `${unit.percentUsulan}%` }}
                                    ></div>
                                 </div>
                                 <span className="text-[10px] font-bold text-slate-600">{unit.percentUsulan}%</span>
                              </div>
                           </td>
                           <td className="px-6 py-4 text-right text-xs font-mono text-slate-500">
                              {formatCurrency(unit.pagu)}
                           </td>
                           <td className="px-6 py-4 text-right text-xs font-mono">
                              <span className={isOver ? 'text-rose-500 font-bold' : 'text-emerald-600 font-bold'}>
                                 {isOver ? '+' : ''}{formatCurrency(deviation)}
                              </span>
                           </td>
                           <td className="px-6 py-4 text-center">
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wide border ${
                                 status === 'Final' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                                 status === 'Review' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                                 'bg-slate-100 text-slate-500 border-slate-200'
                              }`}>
                                 {status}
                              </span>
                           </td>
                           <td className="px-6 py-4 text-center">
                              <button className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-blue-600 transition-colors">
                                 <ArrowUpRight size={16} />
                              </button>
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </div>
         
         <div className="p-4 border-t border-slate-100 bg-slate-50 text-xs text-slate-500 text-center font-medium">
            Menampilkan data real-time per {new Date().toLocaleTimeString()}
         </div>
      </div>
    </div>
  );
};
