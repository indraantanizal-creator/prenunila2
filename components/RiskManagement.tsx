
import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Wallet, 
  Activity, 
  Coins, 
  Search, 
  Filter, 
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  TrendingDown,
  Info
} from 'lucide-react';
import { formatCurrency } from '../constants';

interface RiskItem {
  id: string;
  riskCode: string;
  riskEvent: string;
  level: 'Low' | 'Medium' | 'High' | 'Extreme';
  likelihood: number; // 1-5
  impact: number; // 1-5
  mitigationActivity: string; // Kegiatan
  pic: string;
  budgetPagu: number; // Anggaran
  budgetRealization: number; // Realisasi
  target: string; // Target Capaian
  achievementScore: number; // Capaian %
}

const RISK_DATA: RiskItem[] = [
  {
    id: '1', riskCode: 'R-01', riskEvent: 'Kegagalan sistem server pusat saat periode registrasi mahasiswa baru.',
    level: 'High', likelihood: 3, impact: 5,
    mitigationActivity: 'Pengadaan Server Backup & Load Balancer',
    pic: 'UPT TIK',
    budgetPagu: 1500000000,
    budgetRealization: 1200000000,
    target: 'Uptime 99.9%',
    achievementScore: 90
  },
  {
    id: '2', riskCode: 'R-02', riskEvent: 'Penurunan jumlah pendaftar mahasiswa internasional.',
    level: 'Medium', likelihood: 3, impact: 3,
    mitigationActivity: 'Roadshow Promosi Internasional & Beasiswa Asing',
    pic: 'IO / KUI',
    budgetPagu: 800000000,
    budgetRealization: 400000000,
    target: '50 Maba Asing',
    achievementScore: 60
  },
  {
    id: '3', riskCode: 'R-03', riskEvent: 'Kerusakan aset laboratorium vital akibat maintenance yang buruk.',
    level: 'Extreme', likelihood: 4, impact: 5,
    mitigationActivity: 'Kontrak Maintenance Terpadu & Asuransi Aset',
    pic: 'UPA LAB',
    budgetPagu: 2000000000,
    budgetRealization: 1950000000,
    target: 'Zero Downtime',
    achievementScore: 95
  },
  {
    id: '4', riskCode: 'R-04', riskEvent: 'Temuan audit keuangan (WDP) akibat kesalahan administrasi.',
    level: 'High', likelihood: 4, impact: 4,
    mitigationActivity: 'Pelatihan Sertifikasi Bendahara & Auditor Internal',
    pic: 'SPI',
    budgetPagu: 250000000,
    budgetRealization: 100000000,
    target: 'Opini WTP',
    achievementScore: 80
  },
  {
    id: '5', riskCode: 'R-05', riskEvent: 'Kebocoran data pribadi mahasiswa (Cybersecurity Breach).',
    level: 'Extreme', likelihood: 2, impact: 5,
    mitigationActivity: 'Audit Keamanan ISO 27001 & Penetration Testing',
    pic: 'UPT TIK',
    budgetPagu: 500000000,
    budgetRealization: 500000000,
    target: 'Sertifikasi ISO',
    achievementScore: 100
  },
  {
    id: '6', riskCode: 'R-06', riskEvent: 'Keterlambatan penyelesaian studi mahasiswa > 5 tahun.',
    level: 'Medium', likelihood: 4, impact: 2,
    mitigationActivity: 'Program Monitoring Tugas Akhir Intensif',
    pic: 'Akademik',
    budgetPagu: 150000000,
    budgetRealization: 50000000,
    target: 'Lulus Tepat Waktu 70%',
    achievementScore: 45
  }
];

export const RiskManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate Summary Stats
  const totalBudget = RISK_DATA.reduce((acc, curr) => acc + curr.budgetPagu, 0);
  const totalRealization = RISK_DATA.reduce((acc, curr) => acc + curr.budgetRealization, 0);
  const avgAchievement = RISK_DATA.reduce((acc, curr) => acc + curr.achievementScore, 0) / RISK_DATA.length;
  const realizationPercent = (totalRealization / totalBudget) * 100;
  
  const extremeRisks = RISK_DATA.filter(r => r.level === 'Extreme').length;
  const highRisks = RISK_DATA.filter(r => r.level === 'High').length;

  const filteredData = RISK_DATA.filter(item => 
    item.riskEvent.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.mitigationActivity.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Heatmap Grid Helpers
  const getHeatmapCount = (like: number, imp: number) => {
    return RISK_DATA.filter(r => r.likelihood === like && r.impact === imp).length;
  };

  const getCellColor = (like: number, imp: number) => {
    const score = like * imp;
    if (score >= 15) return 'bg-rose-500/20 border-rose-500/50 text-rose-400';
    if (score >= 8) return 'bg-amber-500/20 border-amber-500/50 text-amber-400';
    return 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400';
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-[#0f172a] -m-6 p-8 min-h-screen text-slate-300 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-2">
        <div>
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-bold uppercase tracking-widest mb-2">
             <ShieldAlert size={14} />
             Enterprise Risk Management
           </div>
           <h1 className="text-4xl font-black text-white tracking-tight mb-2">Manajemen Risiko</h1>
           <p className="text-slate-400 max-w-3xl text-sm leading-relaxed">
             Identifikasi, analisis, dan mitigasi risiko strategis universitas dengan dukungan alokasi anggaran yang terukur.
           </p>
        </div>
      </div>

      {/* Executive Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Risk Exposure */}
          <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50 relative overflow-hidden group hover:bg-slate-800 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <AlertTriangle size={64} />
              </div>
              <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-rose-500/20 text-rose-400 rounded-lg">
                      <AlertTriangle size={20} />
                  </div>
                  <span className="text-xs font-bold uppercase text-slate-400 tracking-widest">Risk Exposure</span>
              </div>
              <div className="relative z-10">
                  <p className="text-2xl font-black text-white">{RISK_DATA.length} <span className="text-sm font-medium text-slate-500">Risiko Terdaftar</span></p>
                  <div className="flex gap-2 mt-2">
                     <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 text-[10px] font-bold border border-rose-500/30">
                        {extremeRisks} Extreme
                     </span>
                     <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-bold border border-amber-500/30">
                        {highRisks} High
                     </span>
                  </div>
              </div>
          </div>

          {/* Card 2: Anggaran Mitigasi */}
          <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50 relative overflow-hidden group hover:bg-slate-800 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Wallet size={64} />
              </div>
              <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
                      <Wallet size={20} />
                  </div>
                  <span className="text-xs font-bold uppercase text-slate-400 tracking-widest">Anggaran Mitigasi</span>
              </div>
              <div className="relative z-10">
                  <p className="text-2xl font-black text-white font-mono">Rp {formatCurrency(totalBudget)}</p>
                  <p className="text-[10px] text-slate-500 mt-1 font-medium">Alokasi Penanganan Risiko</p>
              </div>
          </div>

          {/* Card 3: Realisasi Mitigasi */}
          <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50 relative overflow-hidden group hover:bg-slate-800 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Coins size={64} />
              </div>
              <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
                      <Coins size={20} />
                  </div>
                  <span className="text-xs font-bold uppercase text-slate-400 tracking-widest">Realisasi Mitigasi</span>
              </div>
              <div className="relative z-10">
                  <p className="text-2xl font-black text-emerald-400 font-mono">Rp {formatCurrency(totalRealization)}</p>
                  <div className="flex items-center gap-2 mt-1">
                      <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: `${realizationPercent}%` }}></div>
                      </div>
                      <p className="text-[10px] text-emerald-500 font-bold">{realizationPercent.toFixed(1)}% Terserap</p>
                  </div>
              </div>
          </div>

          {/* Card 4: Efektivitas Penanganan */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-2xl shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:rotate-12 transition-transform duration-500">
                  <ShieldCheck size={100} className="text-white" />
              </div>
              
              <div className="relative z-10 flex flex-col justify-between h-full">
                  <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-white/20 text-white rounded-lg backdrop-blur-sm">
                          <Activity size={20} />
                      </div>
                      <span className="text-xs font-black uppercase text-indigo-100 tracking-widest opacity-90">Efektivitas</span>
                  </div>
                  
                  <div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-black text-white tracking-tighter drop-shadow-lg">
                            {avgAchievement.toFixed(1)}
                        </span>
                        <span className="text-2xl font-bold text-indigo-200">%</span>
                    </div>
                    <p className="text-[10px] font-bold text-indigo-100 uppercase tracking-widest mt-1 opacity-80">
                        Rata-rata Capaian Mitigasi
                    </p>
                  </div>
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* RISK MATRIX / HEATMAP */}
        <div className="bg-[#1e293b] rounded-2xl border border-slate-800 p-6 lg:col-span-1 shadow-lg">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingDown size={16} className="text-rose-500" /> Peta Risiko (Heatmap)
              </h3>
              <Info size={14} className="text-slate-500" />
           </div>

           <div className="relative">
              {/* Y-Axis Label */}
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-black uppercase text-slate-500 tracking-widest">
                 Likelihood (Kemungkinan)
              </div>
              
              <div className="ml-4">
                 <div className="grid grid-cols-5 gap-1 mb-2">
                    {[5, 4, 3, 2, 1].map((likelihood) => (
                       <React.Fragment key={likelihood}>
                          {[1, 2, 3, 4, 5].map((impact) => {
                             const count = getHeatmapCount(likelihood, impact);
                             return (
                                <div 
                                  key={`${likelihood}-${impact}`} 
                                  className={`aspect-square rounded-md border flex items-center justify-center relative group transition-transform hover:scale-105 ${getCellColor(likelihood, impact)}`}
                                >
                                   {count > 0 && (
                                     <span className="font-black text-sm drop-shadow-md">{count}</span>
                                   )}
                                   <div className="hidden group-hover:block absolute bottom-full mb-2 bg-slate-900 text-white text-[10px] p-2 rounded w-24 z-10 text-center pointer-events-none border border-slate-700">
                                      L:{likelihood} x I:{impact}
                                   </div>
                                </div>
                             );
                          })}
                       </React.Fragment>
                    ))}
                 </div>
                 {/* X-Axis Label */}
                 <div className="text-center text-[10px] font-black uppercase text-slate-500 tracking-widest mt-2">
                    Impact (Dampak)
                 </div>
              </div>
           </div>
           
           <div className="mt-6 flex justify-center gap-4 text-[10px] font-bold text-slate-400">
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Low</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Medium</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-rose-500"></div> High/Extreme</div>
           </div>
        </div>

        {/* RISK TABLE */}
        <div className="bg-[#1e293b] rounded-2xl border border-slate-800 lg:col-span-2 overflow-hidden shadow-lg flex flex-col">
           {/* Control Bar */}
           <div className="p-4 border-b border-slate-800 flex justify-between items-center gap-4 bg-slate-900/50">
              <div className="relative flex-1">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                 <input 
                   type="text" 
                   placeholder="Cari risiko atau kegiatan..." 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200 focus:ring-1 focus:ring-blue-500 outline-none"
                 />
              </div>
              <button className="flex items-center gap-2 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs font-bold text-slate-300 hover:bg-slate-700 transition-all">
                  <Filter size={12} /> Filter
              </button>
           </div>

           <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-slate-900 border-b border-slate-800 text-[10px] font-black uppercase text-slate-500 tracking-widest">
                       <th className="px-5 py-4">Identifikasi Risiko</th>
                       <th className="px-5 py-4 w-48">Kegiatan Mitigasi</th>
                       <th className="px-5 py-4 text-right">Anggaran</th>
                       <th className="px-5 py-4 text-right">Realisasi</th>
                       <th className="px-5 py-4 text-center">Capaian</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-800">
                    {filteredData.map((item) => (
                       <tr key={item.id} className="hover:bg-slate-800/30 transition-colors group">
                          <td className="px-5 py-4 align-top">
                             <div className="flex gap-3">
                                <span className={`h-fit px-1.5 py-0.5 rounded text-[9px] font-black border uppercase ${
                                   item.level === 'Extreme' ? 'bg-rose-500/10 text-rose-500 border-rose-500/30' :
                                   item.level === 'High' ? 'bg-orange-500/10 text-orange-500 border-orange-500/30' :
                                   'bg-blue-500/10 text-blue-500 border-blue-500/30'
                                }`}>
                                   {item.level}
                                </span>
                                <div>
                                   <p className="text-xs font-bold text-slate-200 mb-1">{item.riskEvent}</p>
                                   <p className="text-[10px] text-slate-500 font-mono">{item.riskCode} • {item.pic}</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-5 py-4 align-top">
                             <p className="text-xs font-medium text-slate-300">{item.mitigationActivity}</p>
                             <p className="text-[10px] text-slate-500 mt-1">Target: {item.target}</p>
                          </td>
                          <td className="px-5 py-4 align-top text-right font-mono text-xs text-blue-400">
                             {formatCurrency(item.budgetPagu)}
                          </td>
                          <td className="px-5 py-4 align-top text-right">
                             <p className="font-mono text-xs text-emerald-400">{formatCurrency(item.budgetRealization)}</p>
                             <div className="w-full bg-slate-700 h-1 rounded-full mt-1.5 overflow-hidden">
                                <div 
                                  className="h-full bg-emerald-500" 
                                  style={{ width: `${(item.budgetRealization / item.budgetPagu) * 100}%` }}
                                ></div>
                             </div>
                          </td>
                          <td className="px-5 py-4 align-top text-center">
                             <div className="inline-flex flex-col items-center">
                                <span className={`text-sm font-black ${
                                   item.achievementScore >= 90 ? 'text-emerald-400' :
                                   item.achievementScore >= 70 ? 'text-blue-400' : 'text-amber-400'
                                }`}>
                                   {item.achievementScore}%
                                </span>
                                <span className="text-[9px] text-slate-500 font-bold uppercase">Efektivitas</span>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </div>
    </div>
  );
};
