
import React, { useMemo } from 'react';
import { 
  Users, 
  Activity, 
  Target, 
  ShieldAlert, 
  Building2, 
  Wallet, 
  FileText, 
  Layers, 
  TrendingUp, 
  CheckCircle2,
  Server,
  Database
} from 'lucide-react';
import { MOCK_USERS, MOCK_DATA, formatCurrency } from '../constants';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const AppStatistics: React.FC = () => {
  // --- Data Aggregation ---
  
  // User Stats
  const userStats = useMemo(() => {
    const total = MOCK_USERS.length;
    const active = MOCK_USERS.filter(u => u.status === 'active').length;
    const inactive = total - active;
    const roles = MOCK_USERS.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return { total, active, inactive, roles };
  }, []);

  // Budget Stats
  const budgetStats = useMemo(() => {
    const totalPagu = MOCK_DATA.reduce((acc, u) => acc + u.pagu, 0);
    const totalUsulan = MOCK_DATA.reduce((acc, u) => acc + u.usulan, 0);
    const totalUnits = MOCK_DATA.length;
    const unitsComplete = MOCK_DATA.filter(u => u.percentUsulan === 100).length;
    
    return { totalPagu, totalUsulan, totalUnits, unitsComplete };
  }, []);

  // Mock Strategic Stats (Assuming data from other modules)
  const strategicStats = {
    totalGoals: 4, // Tujuan Strategis
    totalIndicators: 11, // IKU
    totalRisks: 6, // Manajemen Risiko
    riskHigh: 2,
    riskMedium: 2,
    riskLow: 0,
    riskExtreme: 2
  };

  // Mock Operational Stats
  const operationalStats = {
    programs: 8, // Program BE STRONG pillars
    activities: 24, // Estimasi Kegiatan
    outputs: 156, // Estimasi Output RKAKL
    activeSessions: 12
  };

  const roleChartData = Object.entries(userStats.roles).map(([name, value]) => ({ name: name.toUpperCase(), value }));

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
           <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-3">
             <div className="p-2 bg-indigo-600 rounded-lg text-white">
                <Activity size={24} />
             </div>
             Statistik & Kesehatan Aplikasi
           </h2>
           <p className="text-sm text-slate-500 font-medium mt-1 ml-14">
             Monitoring real-time data pengguna, inputan strategis, dan volume transaksi anggaran.
           </p>
        </div>
        <div className="flex items-center gap-3">
           <span className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100">
              <Server size={14} /> System Online
           </span>
           <span className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100">
              <Database size={14} /> DB Connected
           </span>
        </div>
      </div>

      {/* 1. User Statistics Section */}
      <div>
         <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Users size={16} /> Metrik Pengguna (User Metrics)
         </h3>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
               <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                     <Users size={24} />
                  </div>
                  <span className="text-xs font-bold text-slate-400">TOTAL</span>
               </div>
               <p className="text-3xl font-black text-slate-800">{userStats.total}</p>
               <p className="text-xs text-slate-500 font-medium mt-1">Akun Terdaftar</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
               <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                     <CheckCircle2 size={24} />
                  </div>
                  <span className="text-xs font-bold text-slate-400">ACTIVE</span>
               </div>
               <p className="text-3xl font-black text-emerald-600">{userStats.active}</p>
               <p className="text-xs text-slate-500 font-medium mt-1">User Aktif</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
               <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-slate-100 text-slate-600 rounded-xl">
                     <ShieldAlert size={24} />
                  </div>
                  <span className="text-xs font-bold text-slate-400">ROLES</span>
               </div>
               <p className="text-3xl font-black text-indigo-600">{Object.keys(userStats.roles).length}</p>
               <p className="text-xs text-slate-500 font-medium mt-1">Jenis Hak Akses</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-2">Distribusi Role</p>
               <div className="h-24 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={roleChartData}>
                        <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={20} />
                        <Tooltip cursor={{fill: 'transparent'}} contentStyle={{fontSize: '10px'}} />
                        <XAxis dataKey="name" hide />
                     </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>
         </div>
      </div>

      {/* 2. Strategic Inputs Section */}
      <div>
         <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Target size={16} /> Input Data Strategis
         </h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Goals & KPIs */}
            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
               <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Target size={20} />
                     </div>
                     <span className="text-xs font-bold text-blue-100 uppercase tracking-wider">Renstra & IKU</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <p className="text-4xl font-black">{strategicStats.totalGoals}</p>
                        <p className="text-[10px] text-blue-200 uppercase tracking-widest font-bold">Tujuan Strategis</p>
                     </div>
                     <div>
                        <p className="text-4xl font-black">{strategicStats.totalIndicators}</p>
                        <p className="text-[10px] text-blue-200 uppercase tracking-widest font-bold">Indikator (IKU)</p>
                     </div>
                  </div>
               </div>
               <div className="absolute right-0 bottom-0 opacity-10 p-4">
                  <Target size={100} />
               </div>
            </div>

            {/* Risk Management */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group">
               <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
                        <ShieldAlert size={20} />
                     </div>
                     <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Risiko Teridentifikasi</span>
                  </div>
                  <span className="text-2xl font-black text-rose-600">{strategicStats.totalRisks}</span>
               </div>
               <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                     <span className="font-bold text-slate-600">Extreme Risk</span>
                     <span className="px-2 py-0.5 bg-rose-100 text-rose-700 rounded font-black">{strategicStats.riskExtreme}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                     <div className="bg-rose-500 h-full" style={{ width: `${(strategicStats.riskExtreme/strategicStats.totalRisks)*100}%` }}></div>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-2">
                     <span className="font-bold text-slate-600">High Risk</span>
                     <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded font-black">{strategicStats.riskHigh}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                     <div className="bg-amber-500 h-full" style={{ width: `${(strategicStats.riskHigh/strategicStats.totalRisks)*100}%` }}></div>
                  </div>
               </div>
            </div>

            {/* Programs */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
               <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                     <Layers size={20} />
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Program Kerja</span>
               </div>
               <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-slate-50 rounded-xl">
                     <p className="text-2xl font-black text-slate-800">{operationalStats.programs}</p>
                     <p className="text-[10px] text-slate-400 font-bold uppercase">Pilar Utama</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                     <p className="text-2xl font-black text-purple-600">{operationalStats.activities}</p>
                     <p className="text-[10px] text-slate-400 font-bold uppercase">Kegiatan</p>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* 3. Operational Data Overview */}
      <div>
         <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Building2 size={16} /> Data Operasional & Anggaran
         </h3>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
               <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                     <Wallet size={24} />
                  </div>
                  <div>
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Usulan Anggaran</p>
                     <p className="text-2xl font-black text-slate-800 font-mono">Rp {formatCurrency(budgetStats.totalUsulan)}</p>
                  </div>
               </div>
               <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
                  <div className="bg-emerald-500 h-full w-[92%]"></div>
               </div>
               <p className="text-[10px] text-slate-400 font-bold text-right">92% dari Pagu Dasar</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
               <div className="flex justify-between items-start mb-2">
                  <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                     <Building2 size={20} />
                  </div>
               </div>
               <p className="text-3xl font-black text-slate-800">{budgetStats.totalUnits}</p>
               <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Unit Kerja</p>
               <p className="text-[10px] text-emerald-600 font-bold mt-2">{budgetStats.unitsComplete} Unit Complete</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
               <div className="flex justify-between items-start mb-2">
                  <div className="p-2 bg-cyan-100 text-cyan-600 rounded-lg">
                     <FileText size={20} />
                  </div>
               </div>
               <p className="text-3xl font-black text-slate-800">{operationalStats.outputs}</p>
               <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Output RKAKL</p>
               <p className="text-[10px] text-cyan-600 font-bold mt-2">+12 Minggu Ini</p>
            </div>
         </div>
      </div>

    </div>
  );
};
