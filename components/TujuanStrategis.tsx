
import React, { useState } from 'react';
import { 
  Target, 
  TrendingUp, 
  Award, 
  Users, 
  Globe, 
  Zap, 
  ChevronDown, 
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  BarChart3
} from 'lucide-react';

interface KPI {
  id: string;
  name: string;
  target: string;
  realization: string;
  status: 'on-track' | 'at-risk' | 'completed';
}

interface StrategicGoal {
  id: string;
  title: string;
  description: string;
  category: 'Pendidikan' | 'Penelitian' | 'Pengabdian' | 'Tata Kelola';
  progress: number;
  icon: React.ReactNode;
  color: string; // Tailwind text color class
  bgGradient: string; // Tailwind gradient class
  kpis: KPI[];
}

const STRATEGIC_GOALS: StrategicGoal[] = [
  {
    id: 'TS-1',
    title: 'Meningkatkan Kualitas Lulusan Berstandar Internasional',
    description: 'Menghasilkan lulusan yang kompeten, berkarakter, dan memiliki daya saing global melalui kurikulum berbasis OBE.',
    category: 'Pendidikan',
    progress: 85,
    icon: <Users size={24} />,
    color: 'text-blue-400',
    bgGradient: 'from-blue-600 to-indigo-600',
    kpis: [
      { id: 'IKU-1.1', name: 'Persentase Lulusan Langsung Bekerja (< 6 Bulan)', target: '80%', realization: '78%', status: 'on-track' },
      { id: 'IKU-1.2', name: 'Mahasiswa Meraih Prestasi Internasional', target: '50 Org', realization: '42 Org', status: 'on-track' },
      { id: 'IKU-1.3', name: 'Program Studi Terakreditasi Internasional', target: '15 Prodi', realization: '12 Prodi', status: 'at-risk' }
    ]
  },
  {
    id: 'TS-2',
    title: 'Meningkatkan Kualitas Dosen & Tenaga Kependidikan',
    description: 'Penguatan kapasitas SDM melalui sertifikasi, studi lanjut, dan mobilitas internasional.',
    category: 'Pendidikan',
    progress: 72,
    icon: <Award size={24} />,
    color: 'text-emerald-400',
    bgGradient: 'from-emerald-600 to-teal-600',
    kpis: [
      { id: 'IKU-2.1', name: 'Dosen Bergelar Doktor (S3)', target: '60%', realization: '52%', status: 'at-risk' },
      { id: 'IKU-2.2', name: 'Dosen Memiliki Sertifikasi Kompetensi', target: '40%', realization: '45%', status: 'completed' },
      { id: 'IKU-2.3', name: 'Praktisi Mengajar di Kampus', target: '100 Org', realization: '120 Org', status: 'completed' }
    ]
  },
  {
    id: 'TS-3',
    title: 'Meningkatkan Kualitas Riset dan Inovasi',
    description: 'Mendorong hilirisasi hasil riset yang berdampak pada masyarakat dan industri.',
    category: 'Penelitian',
    progress: 65,
    icon: <Zap size={24} />,
    color: 'text-amber-400',
    bgGradient: 'from-amber-600 to-orange-600',
    kpis: [
      { id: 'IKU-3.1', name: 'Publikasi Terindeks Scopus/WoS', target: '1200', realization: '980', status: 'on-track' },
      { id: 'IKU-3.2', name: 'Karya Ilmiah/Seni yang Dihilirisasi', target: '50 Produk', realization: '25 Produk', status: 'at-risk' },
      { id: 'IKU-3.3', name: 'Perolehan KI (Paten/Hak Cipta)', target: '200', realization: '215', status: 'completed' }
    ]
  },
  {
    id: 'TS-4',
    title: 'Penguatan Tata Kelola & Kemitraan Global',
    description: 'Transformasi tata kelola universitas yang transparan, akuntabel, dan berjejaring luas.',
    category: 'Tata Kelola',
    progress: 90,
    icon: <Globe size={24} />,
    color: 'text-purple-400',
    bgGradient: 'from-purple-600 to-fuchsia-600',
    kpis: [
      { id: 'IKU-4.1', name: 'Kerjasama Mitra Kelas Dunia (QS100)', target: '20 Mitra', realization: '22 Mitra', status: 'completed' },
      { id: 'IKU-4.2', name: 'Efektivitas Anggaran (Serapan)', target: '95%', realization: '92%', status: 'on-track' }
    ]
  }
];

export const TujuanStrategis: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('TS-1');

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-[#0f172a] -m-6 p-8 min-h-screen text-slate-300 pb-20">
      
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 shadow-2xl">
         <div className="absolute top-0 right-0 p-10 opacity-5">
            <Target size={200} />
         </div>
         <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-4">
               <TrendingUp size={14} />
               Renstra 2025-2029
            </div>
            <h1 className="text-4xl font-black text-white mb-2">Tujuan Strategis</h1>
            <p className="text-slate-400 max-w-2xl leading-relaxed">
               Peta jalan strategis Universitas Lampung untuk mencapai keunggulan akademik dan operasional. 
               Setiap tujuan diturunkan menjadi Indikator Kinerja Utama (IKU) yang terukur.
            </p>
         </div>

         {/* Summary Stats */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 backdrop-blur-sm">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Tujuan</p>
               <p className="text-2xl font-black text-white">{STRATEGIC_GOALS.length}</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 backdrop-blur-sm">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Rata-rata Capaian</p>
               <p className="text-2xl font-black text-emerald-400">78%</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 backdrop-blur-sm">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Indikator</p>
               <p className="text-2xl font-black text-blue-400">11</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 backdrop-blur-sm">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Status Renstra</p>
               <p className="text-2xl font-black text-amber-400">On Track</p>
            </div>
         </div>
      </div>

      {/* Strategic Goals List */}
      <div className="space-y-4">
         {STRATEGIC_GOALS.map((goal) => {
            const isExpanded = expandedId === goal.id;
            
            return (
              <div 
                key={goal.id} 
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded 
                  ? 'bg-[#1e293b] border-slate-700 ring-1 ring-slate-600 shadow-2xl' 
                  : 'bg-[#1e293b]/50 border-slate-800 hover:bg-[#1e293b] hover:border-slate-700'
                }`}
              >
                 {/* Card Header (Clickable) */}
                 <div 
                    onClick={() => toggleExpand(goal.id)}
                    className="p-6 cursor-pointer flex flex-col md:flex-row gap-6 items-start md:items-center"
                 >
                    {/* Icon Box */}
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${goal.bgGradient} text-white shadow-lg shrink-0`}>
                       {goal.icon}
                    </div>

                    {/* Main Info */}
                    <div className="flex-1">
                       <div className="flex items-center gap-3 mb-1">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border border-current bg-opacity-10 ${goal.color} bg-current`}>
                             {goal.id}
                          </span>
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-800 px-2 py-0.5 rounded">
                             {goal.category}
                          </span>
                       </div>
                       <h3 className={`text-xl font-bold mb-1 ${isExpanded ? 'text-white' : 'text-slate-200'}`}>
                          {goal.title}
                       </h3>
                       <p className="text-sm text-slate-400 line-clamp-2 md:line-clamp-1">
                          {goal.description}
                       </p>
                    </div>

                    {/* Progress Section */}
                    <div className="w-full md:w-48 shrink-0">
                       <div className="flex justify-between items-end mb-2">
                          <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Capaian</span>
                          <span className={`text-xl font-black ${goal.color}`}>{goal.progress}%</span>
                       </div>
                       <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full bg-gradient-to-r ${goal.bgGradient}`} 
                            style={{ width: `${goal.progress}%` }}
                          ></div>
                       </div>
                    </div>

                    {/* Chevron */}
                    <div className="hidden md:block text-slate-500">
                       {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                 </div>

                 {/* Expanded Content (KPI Details) */}
                 {isExpanded && (
                    <div className="px-6 pb-6 pt-0 animate-in slide-in-from-top-2 duration-300">
                       <div className="pl-0 md:pl-[88px]"> {/* Indent to align with text */}
                          <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-5">
                             <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <BarChart3 size={14} /> Indikator Kinerja Utama (IKU)
                             </h4>
                             
                             <div className="grid grid-cols-1 gap-3">
                                {goal.kpis.map((kpi) => (
                                   <div key={kpi.id} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4">
                                      <div className="flex items-center gap-4 flex-1">
                                         <div className={`p-2 rounded-lg ${
                                            kpi.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' :
                                            kpi.status === 'at-risk' ? 'bg-rose-500/10 text-rose-500' :
                                            'bg-blue-500/10 text-blue-500'
                                         }`}>
                                            {kpi.status === 'completed' ? <CheckCircle2 size={16} /> : 
                                             kpi.status === 'at-risk' ? <AlertCircle size={16} /> : 
                                             <TrendingUp size={16} />}
                                         </div>
                                         <div>
                                            <div className="flex items-center gap-2">
                                               <span className="text-[10px] font-mono text-slate-500">{kpi.id}</span>
                                               <h5 className="text-sm font-bold text-slate-200">{kpi.name}</h5>
                                            </div>
                                         </div>
                                      </div>
                                      
                                      <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-700 pt-3 md:pt-0">
                                         <div className="text-center">
                                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Target</p>
                                            <p className="text-sm font-bold text-slate-300">{kpi.target}</p>
                                         </div>
                                         <div className="text-center">
                                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Realisasi</p>
                                            <p className={`text-sm font-bold ${
                                                kpi.status === 'at-risk' ? 'text-rose-400' : 'text-emerald-400'
                                            }`}>{kpi.realization}</p>
                                         </div>
                                         <div className="w-20 text-right">
                                             <span className={`text-[10px] font-bold px-2 py-1 rounded border uppercase ${
                                                 kpi.status === 'completed' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                                                 kpi.status === 'at-risk' ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' :
                                                 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                                             }`}>
                                                 {kpi.status.replace('-', ' ')}
                                             </span>
                                         </div>
                                      </div>
                                   </div>
                                ))}
                             </div>

                             <div className="mt-4 flex justify-end">
                                <button className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
                                   Lihat Laporan Detail <ArrowRight size={14} />
                                </button>
                             </div>
                          </div>
                       </div>
                    </div>
                 )}
              </div>
            );
         })}
      </div>
    </div>
  );
};
