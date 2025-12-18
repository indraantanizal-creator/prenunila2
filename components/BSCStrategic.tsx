
import React, { useMemo } from 'react';
import { 
  Users, 
  Zap, 
  BookOpen, 
  Wallet, 
  Trophy, 
  Target, 
  Activity,
  Coins,
  LayoutList
} from 'lucide-react';
import { formatCurrency } from '../constants';

// --- TYPES ---
interface IKUDetail {
  name: string;
  target: string;
  realization: string;
  score: number; // 0-100
}

interface StrategicObjective {
  id: string;
  title: string;
  ikus: IKUDetail[];
}

interface PerspectiveData {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  theme: 'blue' | 'amber' | 'purple' | 'emerald';
  achievement: number;
  budgetPagu: number;
  budgetRealization: number;
  objectives: StrategicObjective[];
}

// --- DATA ---
const BSC_DATA: PerspectiveData[] = [
  {
    id: 'cust',
    title: 'Perspektif Pelanggan (Customer)',
    subtitle: 'Kepuasan Mahasiswa, Mitra & Pemangku Kepentingan',
    icon: <Users size={32} />,
    theme: 'blue',
    achievement: 78.5,
    budgetPagu: 45000000000,
    budgetRealization: 38500000000,
    objectives: [
      {
        id: 'SS.C1',
        title: 'Meningkatnya Kualitas Lulusan & Reputasi Akademik',
        ikus: [
          { name: 'Lulusan Bekerja < 6 Bulan', target: '80%', realization: '75%', score: 93 },
          { name: 'Reputasi Employer (QS Rank)', target: 'Top 500', realization: 'Rank 650', score: 70 }
        ]
      },
      {
        id: 'SS.C2',
        title: 'Meningkatnya Kualitas Mahasiswa & Prestasi',
        ikus: [
          { name: 'Mahasiswa Berprestasi Nasional', target: '50 Org', realization: '55 Org', score: 110 }
        ]
      }
    ]
  },
  {
    id: 'internal',
    title: 'Perspektif Proses Internal',
    subtitle: 'Keunggulan Operasional, Riset & Tata Kelola',
    icon: <Zap size={32} />,
    theme: 'amber',
    achievement: 82.0,
    budgetPagu: 120000000000,
    budgetRealization: 98000000000,
    objectives: [
      {
        id: 'SS.I1',
        title: 'Penguatan Kualitas Riset & Inovasi',
        ikus: [
          { name: 'Publikasi Scopus Q1/Q2', target: '400 Judul', realization: '350 Judul', score: 87 },
          { name: 'Hilirisasi Produk Inovasi', target: '20 Produk', realization: '15 Produk', score: 75 }
        ]
      },
      {
        id: 'SS.I2',
        title: 'Transformasi Layanan Digital (Smart Campus)',
        ikus: [
          { name: 'Indeks Kepuasan Layanan IT', target: '3.5', realization: '3.2', score: 91 },
          { name: 'Integrasi Data (One Data)', target: '100%', realization: '80%', score: 80 }
        ]
      }
    ]
  },
  {
    id: 'learning',
    title: 'Perspektif Pembelajaran (Learning & Growth)',
    subtitle: 'Kapabilitas SDM, Kultur Organisasi & Infrastruktur',
    icon: <BookOpen size={32} />,
    theme: 'purple',
    achievement: 64.5,
    budgetPagu: 85000000000,
    budgetRealization: 45000000000,
    objectives: [
      {
        id: 'SS.L1',
        title: 'Peningkatan Kompetensi Dosen & Tendik',
        ikus: [
          { name: 'Dosen Bergelar Doktor', target: '60%', realization: '52%', score: 86 },
          { name: 'Sertifikasi Kompetensi Tendik', target: '100 Org', realization: '40 Org', score: 40 }
        ]
      },
      {
        id: 'SS.L2',
        title: 'Penguatan Infrastruktur Riset & Pendidikan',
        ikus: [
          { name: 'Laboratorium Terakreditasi', target: '15 Lab', realization: '10 Lab', score: 66 }
        ]
      }
    ]
  },
  {
    id: 'finance',
    title: 'Perspektif Keuangan (Financial)',
    subtitle: 'Sustainabilitas Finansial & Efisiensi Anggaran',
    icon: <Wallet size={32} />,
    theme: 'emerald',
    achievement: 92.0,
    budgetPagu: 250000000000,
    budgetRealization: 245000000000,
    objectives: [
      {
        id: 'SS.F1',
        title: 'Kemandirian Finansial (Revenue Generating)',
        ikus: [
          { name: 'Pertumbuhan PNBP Non-UKT', target: '15%', realization: '18%', score: 120 },
          { name: 'Pendapatan Aset Bisnis', target: 'Rp 10 M', realization: 'Rp 9.5 M', score: 95 }
        ]
      },
      {
        id: 'SS.F2',
        title: 'Efektivitas Pengelolaan Anggaran',
        ikus: [
          { name: 'Serapan Anggaran Tahunan', target: '95%', realization: '98%', score: 103 }
        ]
      }
    ]
  }
];

// --- COMPONENTS ---

const PerspectiveCard: React.FC<{ data: PerspectiveData }> = ({ data }) => {
  const budgetPercent = (data.budgetRealization / data.budgetPagu) * 100;
  
  const themes = {
    blue: { bg: 'bg-blue-900/20', border: 'border-blue-800', text: 'text-blue-400', bar: '#3b82f6', iconBg: 'bg-blue-600' },
    amber: { bg: 'bg-amber-900/20', border: 'border-amber-800', text: 'text-amber-400', bar: '#f59e0b', iconBg: 'bg-amber-600' },
    purple: { bg: 'bg-purple-900/20', border: 'border-purple-800', text: 'text-purple-400', bar: '#a855f7', iconBg: 'bg-purple-600' },
    emerald: { bg: 'bg-emerald-900/20', border: 'border-emerald-800', text: 'text-emerald-400', bar: '#10b981', iconBg: 'bg-emerald-600' }
  };
  const t = themes[data.theme];

  return (
    <div className={`rounded-3xl border ${t.border} ${t.bg} overflow-hidden shadow-2xl backdrop-blur-sm relative group`}>
       <div className={`absolute top-0 right-0 w-64 h-64 ${t.bg} rounded-full blur-3xl -mr-32 -mt-32 opacity-20`}></div>

       <div className="p-8">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 relative z-10">
             <div className="flex items-center gap-5">
                <div className={`w-16 h-16 rounded-2xl ${t.iconBg} text-white flex items-center justify-center shadow-lg shadow-black/20`}>
                   {data.icon}
                </div>
                <div>
                   <h2 className="text-2xl font-black text-white tracking-tight">{data.title}</h2>
                   <p className="text-slate-400 text-sm font-medium">{data.subtitle}</p>
                </div>
             </div>
             
             <div className="flex items-center gap-4 bg-slate-900/60 rounded-xl p-3 border border-slate-700/50">
                <div className="text-right">
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Capaian Perspektif</p>
                   <p className={`text-3xl font-black ${t.text}`}>{data.achievement}%</p>
                </div>
                <div className="h-10 w-10 relative flex items-center justify-center">
                   <Activity className={t.text} size={24} />
                </div>
             </div>
          </div>

          {/* FINANCIAL SECTION */}
          <div className="mb-8 bg-slate-900/40 rounded-2xl border border-slate-700/50 p-6 relative overflow-hidden">
             <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 w-full">
                   <div className="flex justify-between items-end mb-2">
                      <div className="flex items-center gap-2">
                         <Wallet size={16} className="text-slate-400" />
                         <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Serapan Anggaran</span>
                      </div>
                      <span className={`text-sm font-black ${t.text}`}>{budgetPercent.toFixed(1)}%</span>
                   </div>
                   <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner border border-slate-700">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${t.iconBg}`} 
                        style={{ width: `${budgetPercent}%` }}
                      >
                         <div className="w-full h-full bg-white/10 animate-pulse"></div>
                      </div>
                   </div>
                </div>

                <div className="flex gap-8 w-full md:w-auto justify-between md:justify-start">
                   <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Pagu Anggaran</p>
                      <p className="text-xl font-mono font-bold text-white">Rp {formatCurrency(data.budgetPagu)}</p>
                   </div>
                   <div className="text-right md:text-left">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Realisasi</p>
                      <p className={`text-xl font-mono font-bold ${t.text}`}>Rp {formatCurrency(data.budgetRealization)}</p>
                   </div>
                </div>
             </div>
          </div>

          {/* OBJECTIVES GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             {data.objectives.map((obj) => (
                <div key={obj.id} className="bg-slate-800/40 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-colors p-5">
                   <div className="flex items-center gap-3 mb-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-black bg-slate-800 border border-slate-600 text-slate-300`}>
                         {obj.id}
                      </span>
                      <h3 className="text-sm font-bold text-white leading-tight">{obj.title}</h3>
                   </div>

                   <div className="space-y-3">
                      {obj.ikus.map((iku, idx) => (
                         <div key={idx} className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 p-3 bg-slate-900/30 rounded-lg border border-slate-800">
                            <div className="flex items-start gap-2">
                               <Target size={14} className="text-slate-500 mt-0.5 shrink-0" />
                               <span className="text-xs font-medium text-slate-300">{iku.name}</span>
                            </div>
                            <div className="flex items-center gap-3 ml-6 sm:ml-0">
                               <div className="text-right">
                                  <p className="text-[9px] text-slate-500 uppercase">Target</p>
                                  <p className="text-xs font-bold text-slate-300">{iku.target}</p>
                               </div>
                               <div className="h-6 w-px bg-slate-700"></div>
                               <div className="text-right min-w-[60px]">
                                  <p className="text-[9px] text-slate-500 uppercase">Real</p>
                                  <p className={`text-xs font-bold ${iku.score >= 100 ? 'text-emerald-400' : iku.score >= 80 ? 'text-blue-400' : 'text-amber-400'}`}>
                                    {iku.realization}
                                  </p>
                               </div>
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
             ))}
          </div>
       </div>

       <div className={`h-2 w-full ${t.iconBg} opacity-80`}></div>
    </div>
  );
};

export const BSCStrategic: React.FC = () => {
  // Aggregate Calculations
  const aggStats = useMemo(() => {
    const totalBudget = BSC_DATA.reduce((acc, item) => acc + item.budgetPagu, 0);
    const totalRealization = BSC_DATA.reduce((acc, item) => acc + item.budgetRealization, 0);
    const avgAchievement = BSC_DATA.reduce((acc, item) => acc + item.achievement, 0) / BSC_DATA.length;
    // Count total IKUs as a proxy for "Kegiatan"
    const totalKPIs = BSC_DATA.reduce((acc, item) => acc + item.objectives.reduce((oAcc, obj) => oAcc + obj.ikus.length, 0), 0);
    
    return {
      budget: totalBudget,
      realization: totalRealization,
      achievement: avgAchievement,
      kpis: totalKPIs
    };
  }, []);

  const realizationPercent = (aggStats.realization / aggStats.budget) * 100;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 bg-[#0f172a] -m-6 p-8 min-h-screen text-slate-300 pb-20">
      
      {/* Title Section */}
      <div className="flex flex-col gap-4 mb-4">
        <div>
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-widest mb-2">
             <Trophy size={14} />
             Executive Dashboard
           </div>
           <h1 className="text-4xl font-black text-white tracking-tight mb-2">
             Balanced Scorecard
           </h1>
           <p className="text-slate-400 max-w-2xl text-sm leading-relaxed">
             Monitoring kinerja strategis universitas berbasis 4 perspektif utama, terintegrasi dengan data anggaran dan indikator kinerja utama (IKU).
           </p>
        </div>
      </div>

      {/* NEW: EXECUTIVE SUMMARY DASHBOARD AREA */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Total Anggaran */}
          <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50 relative overflow-hidden group hover:bg-slate-800 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Wallet size={64} />
              </div>
              <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
                      <Wallet size={20} />
                  </div>
                  <span className="text-xs font-bold uppercase text-slate-400 tracking-widest">Total Anggaran</span>
              </div>
              <div className="relative z-10">
                  <p className="text-2xl font-black text-white font-mono">Rp {formatCurrency(aggStats.budget)}</p>
                  <p className="text-[10px] text-slate-500 mt-1 font-medium">Alokasi 4 Perspektif</p>
              </div>
          </div>

          {/* Card 2: Realisasi */}
          <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50 relative overflow-hidden group hover:bg-slate-800 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Coins size={64} />
              </div>
              <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
                      <Coins size={20} />
                  </div>
                  <span className="text-xs font-bold uppercase text-slate-400 tracking-widest">Realisasi</span>
              </div>
              <div className="relative z-10">
                  <p className="text-2xl font-black text-emerald-400 font-mono">Rp {formatCurrency(aggStats.realization)}</p>
                  <div className="flex items-center gap-2 mt-1">
                      <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: `${realizationPercent}%` }}></div>
                      </div>
                      <p className="text-[10px] text-emerald-500 font-bold">{realizationPercent.toFixed(1)}% Terserap</p>
                  </div>
              </div>
          </div>

          {/* Card 3: Total Kegiatan/IKU */}
          <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50 relative overflow-hidden group hover:bg-slate-800 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <LayoutList size={64} />
              </div>
              <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
                      <LayoutList size={20} />
                  </div>
                  <span className="text-xs font-bold uppercase text-slate-400 tracking-widest">Total Indikator</span>
              </div>
              <div className="relative z-10">
                  <p className="text-2xl font-black text-white">{aggStats.kpis}</p>
                  <p className="text-[10px] text-slate-500 mt-1 font-medium">Indikator Kinerja (IKU/IKK)</p>
              </div>
          </div>

          {/* Card 4: Capaian Sasaran (HERO CARD) */}
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-6 rounded-2xl shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 border border-white/10">
              <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:rotate-12 transition-transform duration-500">
                  <Trophy size={100} className="text-white" />
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
              
              <div className="relative z-10 flex flex-col justify-between h-full">
                  <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-white/20 text-white rounded-lg backdrop-blur-sm">
                          <Activity size={20} />
                      </div>
                      <span className="text-xs font-black uppercase text-indigo-100 tracking-widest opacity-90">Capaian Sasaran</span>
                  </div>
                  
                  <div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-black text-white tracking-tighter drop-shadow-lg">
                            {aggStats.achievement.toFixed(1)}
                        </span>
                        <span className="text-2xl font-bold text-indigo-200">%</span>
                    </div>
                    <p className="text-[10px] font-bold text-indigo-100 uppercase tracking-widest mt-1 opacity-80">
                        Rata-rata 4 Perspektif
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/20 flex items-center gap-2">
                     <div className="px-2 py-0.5 rounded bg-white/20 backdrop-blur-sm text-[9px] font-bold text-white border border-white/20">
                        ON TRACK
                     </div>
                     <span className="text-[10px] text-indigo-100 font-medium">Kinerja Organisasi Sehat</span>
                  </div>
              </div>
          </div>
      </div>

      {/* Perspective Cards */}
      <div className="flex flex-col gap-8">
         <PerspectiveCard data={BSC_DATA[0]} />
         <PerspectiveCard data={BSC_DATA[1]} />
         <PerspectiveCard data={BSC_DATA[2]} />
         <PerspectiveCard data={BSC_DATA[3]} />
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 pt-8 border-t border-slate-800/50">
         <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div> On Track (>90%)
         </div>
         <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div> Warning (80-90%)
         </div>
         <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div> Lagging (&lt;80%)
         </div>
      </div>
    </div>
  );
};
