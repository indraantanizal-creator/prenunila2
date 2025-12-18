
import React, { useState } from 'react';
import { 
  Layers, 
  Target, 
  TrendingUp, 
  Users, 
  Wallet, 
  Zap, 
  BookOpen, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal,
  PieChart,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Building2
} from 'lucide-react';
import { formatCurrency } from '../constants';

// --- TYPES ---
type PerspectiveType = 'customer' | 'finance' | 'internal' | 'learning';

interface SasaranObj {
  id: string;
  code: string;
  perspective: PerspectiveType;
  title: string;
  pic: string; // Unit Penanggung Jawab
  bobot: number; // Weight in %
  target: string;
  realization: string;
  score: number; // 0-100
  trend: 'up' | 'down' | 'stable';
  status: 'on-track' | 'warning' | 'critical';
}

// --- MOCK DATA ---
const SASARAN_DATA: SasaranObj[] = [
  // CUSTOMER PERSPECTIVE
  {
    id: 'ss-1', code: 'SS.C1', perspective: 'customer',
    title: 'Meningkatnya Reputasi Akademik & Rekognisi Global',
    pic: 'LP3M', bobot: 15, target: 'Rank 800 QS', realization: 'Rank 1200', score: 65, trend: 'up', status: 'warning'
  },
  {
    id: 'ss-2', code: 'SS.C2', perspective: 'customer',
    title: 'Meningkatnya Kualitas & Keterserapan Lulusan',
    pic: 'CCED', bobot: 15, target: '85%', realization: '82%', score: 92, trend: 'up', status: 'on-track'
  },
  
  // FINANCIAL PERSPECTIVE
  {
    id: 'ss-3', code: 'SS.F1', perspective: 'finance',
    title: 'Kemandirian Finansial melalui Optimalisasi Aset & Usaha',
    pic: 'BPU', bobot: 10, target: 'Rp 150 M (Income)', realization: 'Rp 120 M', score: 80, trend: 'up', status: 'on-track'
  },
  {
    id: 'ss-4', code: 'SS.F2', perspective: 'finance',
    title: 'Efektivitas & Akuntabilitas Pengelolaan Anggaran',
    pic: 'Biro Keuangan', bobot: 10, target: '98% Serapan', realization: '92% Serapan', score: 94, trend: 'stable', status: 'on-track'
  },

  // INTERNAL PROCESS PERSPECTIVE
  {
    id: 'ss-5', code: 'SS.I1', perspective: 'internal',
    title: 'Penguatan Ekosistem Riset & Inovasi Berdampak',
    pic: 'LPPM', bobot: 20, target: '1500 Scopus', realization: '1100 Scopus', score: 73, trend: 'down', status: 'warning'
  },
  {
    id: 'ss-6', code: 'SS.I2', perspective: 'internal',
    title: 'Transformasi Tata Kelola & Layanan Digital Terintegrasi',
    pic: 'UPT TIK', bobot: 10, target: 'Indeks SPBE 3.5', realization: '2.8', score: 60, trend: 'up', status: 'critical'
  },

  // LEARNING & GROWTH PERSPECTIVE
  {
    id: 'ss-7', code: 'SS.L1', perspective: 'learning',
    title: 'Peningkatan Kompetensi & Profesionalitas SDM',
    pic: 'Kepegawaian', bobot: 10, target: '60% Doktor', realization: '52% Doktor', score: 86, trend: 'up', status: 'warning'
  },
  {
    id: 'ss-8', code: 'SS.L2', perspective: 'learning',
    title: 'Budaya Organisasi Unggul & Agile',
    pic: 'Rektorat', bobot: 10, target: 'Indeks A', realization: 'Indeks B+', score: 90, trend: 'stable', status: 'on-track'
  }
];

export const SasaranStrategis: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PerspectiveType>('customer');

  // Filter logic
  const filteredData = SASARAN_DATA.filter(item => item.perspective === activeTab);

  // Helper for UI
  const getPerspectiveInfo = (type: PerspectiveType) => {
    switch (type) {
      case 'customer': return { label: 'Customer / Stakeholder', icon: <Users size={18} />, color: 'blue', desc: 'Sudut pandang kepuasan mahasiswa & mitra.' };
      case 'finance': return { label: 'Financial', icon: <Wallet size={18} />, color: 'emerald', desc: 'Kesehatan finansial & efisiensi biaya.' };
      case 'internal': return { label: 'Internal Process', icon: <Zap size={18} />, color: 'amber', desc: 'Keunggulan operasional & inovasi.' };
      case 'learning': return { label: 'Learning & Growth', icon: <BookOpen size={18} />, color: 'purple', desc: 'Kapabilitas SDM & infrastruktur.' };
    }
  };

  const currentInfo = getPerspectiveInfo(activeTab);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-[#0f172a] -m-6 p-8 min-h-screen text-slate-300 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-2">
         <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-2">
               <Layers size={14} />
               Peta Strategi (Strategy Map)
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight mb-2">Sasaran Strategis</h1>
            <p className="text-slate-400 max-w-2xl text-sm leading-relaxed">
               Critical Success Factors (CSF) yang dijabarkan ke dalam empat perspektif Balanced Scorecard untuk memastikan eksekusi strategi yang seimbang.
            </p>
         </div>
         
         <div className="flex gap-4">
             <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col items-center min-w-[120px]">
                 <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Total Sasaran</span>
                 <span className="text-2xl font-black text-white">{SASARAN_DATA.length}</span>
             </div>
             <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col items-center min-w-[120px]">
                 <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Avg. Score</span>
                 <span className="text-2xl font-black text-emerald-400">80.5</span>
             </div>
         </div>
      </div>

      {/* Perspective Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(['customer', 'finance', 'internal', 'learning'] as PerspectiveType[]).map((type) => {
           const info = getPerspectiveInfo(type);
           const isActive = activeTab === type;
           const count = SASARAN_DATA.filter(i => i.perspective === type).length;
           
           return (
             <button
               key={type}
               onClick={() => setActiveTab(type)}
               className={`relative p-5 rounded-2xl border flex flex-col items-start transition-all duration-300 overflow-hidden group ${
                 isActive 
                 ? `bg-${info.color}-600/20 border-${info.color}-500 ring-1 ring-${info.color}-400/50` 
                 : 'bg-[#1e293b]/50 border-slate-800 hover:bg-[#1e293b]'
               }`}
             >
                <div className={`p-2 rounded-lg mb-3 ${isActive ? `bg-${info.color}-500 text-white` : 'bg-slate-800 text-slate-400 group-hover:text-white'}`}>
                    {info.icon}
                </div>
                <span className={`text-xs font-black uppercase tracking-widest mb-1 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                    {info.label}
                </span>
                <span className={`text-[10px] font-medium ${isActive ? `text-${info.color}-300` : 'text-slate-500'}`}>
                    {count} Sasaran Strategis
                </span>
                
                {isActive && <div className={`absolute bottom-0 left-0 w-full h-1 bg-${info.color}-500 animate-in slide-in-from-left duration-500`}></div>}
             </button>
           );
        })}
      </div>

      {/* Main Content Area */}
      <div className="bg-[#1e293b]/40 backdrop-blur-md rounded-3xl border border-slate-800 p-8 min-h-[400px]">
         <div className="flex items-center gap-4 mb-8">
            <h2 className={`text-2xl font-black text-white flex items-center gap-3`}>
                <span className={`w-3 h-8 rounded-full bg-${currentInfo.color}-500`}></span>
                {currentInfo.label} Perspective
            </h2>
            <p className="text-sm text-slate-500 font-medium border-l border-slate-700 pl-4">
                {currentInfo.desc}
            </p>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredData.map((item) => (
                <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-600 transition-all group relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="flex gap-3">
                            <span className={`px-2 py-1 rounded-md text-[10px] font-black border bg-slate-800 border-slate-700 text-slate-400`}>
                                {item.code}
                            </span>
                            <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-slate-800 text-slate-500 flex items-center gap-1">
                                <Building2 size={10} /> PIC: {item.pic}
                            </span>
                        </div>
                        <button className="text-slate-600 hover:text-white transition-colors">
                            <MoreHorizontal size={18} />
                        </button>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-6 leading-snug group-hover:text-blue-300 transition-colors">
                        {item.title}
                    </h3>

                    <div className="grid grid-cols-3 gap-4 mb-6 relative z-10">
                        <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Bobot</p>
                            <div className="flex items-center gap-2">
                                <PieChart size={14} className="text-slate-400" />
                                <span className="text-sm font-bold text-slate-200">{item.bobot}%</span>
                            </div>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Target</p>
                            <div className="flex items-center gap-2">
                                <Target size={14} className="text-blue-400" />
                                <span className="text-sm font-bold text-white truncate">{item.target}</span>
                            </div>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Realisasi</p>
                            <div className="flex items-center gap-2">
                                <Activity size={14} className={item.status === 'on-track' ? 'text-emerald-400' : 'text-rose-400'} />
                                <span className={`text-sm font-bold ${item.status === 'on-track' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {item.realization}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="relative pt-2">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-[10px] font-bold text-slate-500 uppercase">Capaian Kinerja</span>
                            <div className="flex items-center gap-2">
                                {item.trend === 'up' && <ArrowUpRight size={14} className="text-emerald-500" />}
                                {item.trend === 'down' && <ArrowDownRight size={14} className="text-rose-500" />}
                                <span className={`text-xl font-black ${
                                    item.score >= 90 ? 'text-emerald-400' : 
                                    item.score >= 70 ? 'text-blue-400' : 
                                    item.score >= 50 ? 'text-amber-400' : 'text-rose-400'
                                }`}>{item.score}%</span>
                            </div>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full transition-all duration-1000 ${
                                    item.score >= 90 ? 'bg-emerald-500' : 
                                    item.score >= 70 ? 'bg-blue-500' : 
                                    item.score >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                                }`} 
                                style={{ width: `${item.score}%` }}
                            ></div>
                        </div>
                    </div>
                    
                    {/* Status Badge Absolute */}
                    {item.status === 'critical' && (
                        <div className="absolute bottom-4 right-4 text-rose-500 opacity-20">
                            <AlertTriangle size={64} />
                        </div>
                    )}
                </div>
            ))}
         </div>
      </div>
    </div>
  );
};
