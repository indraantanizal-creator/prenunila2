
import React, { useState } from 'react';
import { 
  Target, 
  TrendingUp, 
  Search, 
  Filter, 
  Download,
  BarChart3,
  ListFilter,
  ArrowRight,
  Wallet,
  Coins,
  LayoutList,
  Trophy,
  PieChart,
  Activity
} from 'lucide-react';
import { formatCurrency } from '../constants';

// --- TYPES ---
interface IKUData {
  id: string; // IKU.1
  indicator: string;
  unit: string;
  baseline2024: string;
  target2025: string;
  target2026: string;
  target2027: string;
  target2028: string;
  target2029: string;
}

interface SasaranGroup {
  sasaran: string;
  ikus: IKUData[];
}

// --- DATA FROM PROMPT ---
const IKU_DATASET: SasaranGroup[] = [
  {
    sasaran: "Meningkatnya kualitas pembelajaran unggul berkelas dunia",
    ikus: [
      {
        id: "IKU.1",
        indicator: "Persentase program studi S1 dan Diploma yang memiliki akreditasi atau sertifikasi internasional yang diakui pemerintah.",
        unit: "Total %",
        baseline2024: "20%", target2025: "23%", target2026: "26%", target2027: "27%", target2028: "28%", target2029: "29%"
      }
    ]
  },
  {
    sasaran: "Meningkatnya kualitas lulusan pada level internasional",
    ikus: [
      {
        id: "IKU.2",
        indicator: "Persentase lulusan S1 dan Diploma yang berhasil memiliki pekerjaan, melanjutkan studi, dan menjadi wiraswasta",
        unit: "Total %",
        baseline2024: "62,43%", target2025: "65,12%", target2026: "72,23%", target2027: "79,85%", target2028: "88,30%", target2029: "92,29%"
      },
      {
        id: "IKU.3",
        indicator: "Persentase mahasiswa S1 dan Diploma yang menjalankan kegiatan pembelajaran di luar program studi dan meraih prestasi",
        unit: "Total %",
        baseline2024: "30%", target2025: "35%", target2026: "35%", target2027: "35%", target2028: "35%", target2029: "35%"
      }
    ]
  },
  {
    sasaran: "Meningkatnya riset berorientasi inovasi",
    ikus: [
      {
        id: "IKU.4",
        indicator: "Jumlah keluaran dosen yang berhasil mendapat rekognisi internasional atau diterapkan oleh masyarakat/industri/pemerintah per jumlah dosen.",
        unit: "Luaran/Dosen",
        baseline2024: "1,3", target2025: "1,4", target2026: "1,5", target2027: "1,6", target2028: "1,7", target2029: "1,8"
      }
    ]
  },
  {
    sasaran: "Meningkatkan hilirisasi dan kolaborasi pengabdian masyarakat untuk mewujudkan dampak sosial dan ekonomi",
    ikus: [
      {
        id: "IKU.5",
        indicator: "Persentase dosen yang berkegiatan tridharma di perguruan tinggi lain, bekerja sebagai praktisi di dunia industri, atau membimbing mahasiswa berkegiatan di luar program studi",
        unit: "Total %",
        baseline2024: "40,1%", target2025: "45,00%", target2026: "46%", target2027: "48%", target2028: "50%", target2029: "52%"
      }
    ]
  },
  {
    sasaran: "Meningkatnya kualitas kerja sama dan penyelenggaraan program baik skala nasional dan internasional",
    ikus: [
      {
        id: "IKU.6",
        indicator: "Jumlah kerjasama program studi S1 dan Diploma.",
        unit: "Kerjasama/Prodi",
        baseline2024: "0,74", target2025: "0,9", target2026: "1", target2027: "1,2", target2028: "1,5", target2029: "1,6"
      }
    ]
  },
  {
    sasaran: "Meningkatnya kualitas sumber daya manusia untuk mengembangkan IPTEK yang unggul dan berkelanjutan",
    ikus: [
      {
        id: "IKU.7",
        indicator: "Persentase dosen yang memiliki sertifikat kompetensi/profesi yang diakui oleh dunia usaha dan dunia industri; atau pengajar yang berasal dari kalangan praktisi profesional.",
        unit: "Total %",
        baseline2024: "26%", target2025: "29%", target2026: "33%", target2027: "38%", target2028: "42%", target2029: "48%"
      },
      {
        id: "IKU.8",
        indicator: "Persentase mata kuliah S1 dan Diploma yang menggunakan metode pembelajaran pemecahan kasus (case method) atau team-based project.",
        unit: "Total %",
        baseline2024: "53%", target2025: "54%", target2026: "54%", target2027: "55%", target2028: "55%", target2029: "56%"
      }
    ]
  },
  {
    sasaran: "Meningkatnya tata kelola universitas yang berkualitas dan berkelanjutan",
    ikus: [
      {
        id: "IKU.9",
        indicator: "Indeks Kepuasan Masyarakat pengguna layanan Kerumahtanggaan, seperti Sarana Prasarana, Infrastruktur, dan layanan lainnya.",
        unit: "Total %",
        baseline2024: "3,5", target2025: "3,85", target2026: "4,2", target2027: "4,5", target2028: "4,5", target2029: "4,5"
      },
      {
        id: "IKU.10",
        indicator: "Rata-rata predikat SAKIP",
        unit: "Predikat",
        baseline2024: "A", target2025: "A", target2026: "A", target2027: "A", target2028: "AA", target2029: "AA"
      }
    ]
  },
  {
    sasaran: "Meningkatnya kecukupan Finansial",
    ikus: [
      {
        id: "IKU.11",
        indicator: "Jumlah Pendapatan PNBP",
        unit: "Miliar Rupiah",
        baseline2024: "448", target2025: "450", target2026: "460", target2027: "600", target2028: "650", target2029: "700"
      }
    ]
  }
];

// --- MOCK SUMMARY STATS ---
const SUMMARY_STATS = {
    budget: 450000000000,
    realization: 382500000000,
    activityCount: 156,
    achievementScore: 88.5
};

export const IndikatorIKU: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter Logic
  const filteredData = IKU_DATASET.map(group => {
    const matchingIkus = group.ikus.filter(iku => 
      iku.indicator.toLowerCase().includes(searchQuery.toLowerCase()) || 
      iku.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (matchingIkus.length > 0) {
      return { ...group, ikus: matchingIkus };
    }
    return null;
  }).filter(group => group !== null) as SasaranGroup[];

  const realizationPercent = (SUMMARY_STATS.realization / SUMMARY_STATS.budget) * 100;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-[#0f172a] -m-6 p-8 min-h-screen text-slate-300 pb-20">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-2">
        <div>
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-2">
             <Target size={14} />
             Key Performance Indicators
           </div>
           <h1 className="text-4xl font-black text-white tracking-tight mb-2">Indikator Kinerja Utama</h1>
           <p className="text-slate-400 max-w-3xl text-sm leading-relaxed">
             Matriks target kinerja universitas tahun 2024-2029 sebagai tolak ukur keberhasilan pencapaian Sasaran Strategis (Renstra).
           </p>
        </div>
        
        <div className="flex gap-4">
           <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col items-center min-w-[140px]">
              <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Total Indikator</span>
              <span className="text-3xl font-black text-white">11</span>
           </div>
           <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col items-center min-w-[140px]">
              <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Periode Renstra</span>
              <span className="text-3xl font-black text-blue-400">5 <span className="text-sm font-bold text-slate-500">Tahun</span></span>
           </div>
        </div>
      </div>

      {/* NEW: SUMMARY DASHBOARD SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Anggaran */}
          <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50 relative overflow-hidden group hover:bg-slate-800 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Wallet size={64} />
              </div>
              <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
                      <Wallet size={20} />
                  </div>
                  <span className="text-xs font-bold uppercase text-slate-400 tracking-widest">Anggaran IKU</span>
              </div>
              <div className="relative z-10">
                  <p className="text-2xl font-black text-white font-mono">Rp {formatCurrency(SUMMARY_STATS.budget)}</p>
                  <p className="text-[10px] text-slate-500 mt-1 font-medium">Total Pagu Pendukung IKU</p>
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
                  <p className="text-2xl font-black text-emerald-400 font-mono">Rp {formatCurrency(SUMMARY_STATS.realization)}</p>
                  <div className="flex items-center gap-2 mt-1">
                      <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: `${realizationPercent}%` }}></div>
                      </div>
                      <p className="text-[10px] text-emerald-500 font-bold">{realizationPercent.toFixed(1)}% Terserap</p>
                  </div>
              </div>
          </div>

          {/* Card 3: Kegiatan */}
          <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50 relative overflow-hidden group hover:bg-slate-800 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <LayoutList size={64} />
              </div>
              <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
                      <LayoutList size={20} />
                  </div>
                  <span className="text-xs font-bold uppercase text-slate-400 tracking-widest">Kegiatan</span>
              </div>
              <div className="relative z-10">
                  <p className="text-2xl font-black text-white">{SUMMARY_STATS.activityCount}</p>
                  <p className="text-[10px] text-slate-500 mt-1 font-medium">Program Kerja Terhubung</p>
              </div>
          </div>

          {/* Card 4: Capaian Sasaran (High Prominence) */}
          <div className="bg-gradient-to-br from-amber-600 to-orange-700 p-6 rounded-2xl shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:rotate-12 transition-transform duration-500">
                  <Trophy size={100} className="text-white" />
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
              
              <div className="relative z-10 flex flex-col justify-between h-full">
                  <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-white/20 text-white rounded-lg backdrop-blur-sm">
                          <Activity size={20} />
                      </div>
                      <span className="text-xs font-black uppercase text-amber-100 tracking-widest opacity-90">Capaian Sasaran</span>
                  </div>
                  
                  <div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-black text-white tracking-tighter drop-shadow-lg">
                            {SUMMARY_STATS.achievementScore}
                        </span>
                        <span className="text-2xl font-bold text-amber-200">%</span>
                    </div>
                    <p className="text-[10px] font-bold text-amber-100 uppercase tracking-widest mt-1 opacity-80">
                        Akumulasi Semua Perspektif
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/20 flex items-center gap-2">
                     <div className="px-2 py-0.5 rounded bg-white/20 backdrop-blur-sm text-[9px] font-bold text-white border border-white/20">
                        SANGAT BAIK
                     </div>
                     <span className="text-[10px] text-amber-100 font-medium">Target Renstra Terlampaui</span>
                  </div>
              </div>
          </div>
      </div>

      {/* Control Bar */}
      <div className="bg-[#1e293b] p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
         <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Cari kode IKU atau nama indikator..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-200 placeholder:text-slate-600 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
            />
         </div>
         <div className="flex gap-3 w-full md:w-auto">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs font-bold border border-slate-700 hover:bg-slate-700 transition-all">
                <Filter size={14} /> Filter Sasaran
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
                <Download size={14} /> Export Excel
            </button>
         </div>
      </div>

      {/* Main Data Table */}
      <div className="bg-[#1e293b] rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-slate-900 border-b border-slate-800">
                     <th className="px-6 py-5 text-xs font-black uppercase text-slate-400 tracking-widest min-w-[350px]">
                        Sasaran & Indikator
                     </th>
                     <th className="px-4 py-5 text-center text-xs font-black uppercase text-slate-500 tracking-widest bg-slate-900/50">
                        Satuan
                     </th>
                     <th className="px-4 py-5 text-center text-xs font-black uppercase text-slate-400 tracking-widest border-l border-r border-slate-800 bg-slate-800/30 w-24">
                        Baseline<br/><span className="text-slate-500">2024</span>
                     </th>
                     <th className="px-4 py-5 text-center text-xs font-black uppercase text-blue-400 tracking-widest bg-blue-500/10 border-r border-slate-800 w-24 relative">
                        Target<br/>2025
                        <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                     </th>
                     <th className="px-4 py-5 text-center text-xs font-black uppercase text-slate-500 tracking-widest w-20">2026</th>
                     <th className="px-4 py-5 text-center text-xs font-black uppercase text-slate-500 tracking-widest w-20">2027</th>
                     <th className="px-4 py-5 text-center text-xs font-black uppercase text-slate-500 tracking-widest w-20">2028</th>
                     <th className="px-4 py-5 text-center text-xs font-black uppercase text-slate-500 tracking-widest w-20">2029</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-800">
                  {filteredData.map((group, groupIdx) => (
                     <React.Fragment key={groupIdx}>
                        {/* Group Header - Sasaran */}
                        <tr className="bg-slate-800/40 border-b border-slate-800">
                           <td colSpan={8} className="px-6 py-3">
                              <div className="flex items-center gap-2">
                                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                 <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                                    Sasaran Strategis:
                                 </span>
                                 <span className="text-xs font-semibold text-slate-300">
                                    {group.sasaran}
                                 </span>
                              </div>
                           </td>
                        </tr>

                        {/* IKU Rows */}
                        {group.ikus.map((iku) => (
                           <tr key={iku.id} className="hover:bg-slate-800/30 transition-colors group">
                              <td className="px-6 py-5 align-top">
                                 <div className="flex gap-4">
                                    <span className="px-2 py-1 rounded bg-slate-800 text-slate-400 text-[10px] font-black h-fit border border-slate-700 whitespace-nowrap">
                                       {iku.id}
                                    </span>
                                    <p className="text-sm font-medium text-slate-200 leading-relaxed group-hover:text-white transition-colors">
                                       {iku.indicator}
                                    </p>
                                 </div>
                              </td>
                              <td className="px-4 py-5 text-center align-top">
                                 <span className="text-[10px] font-bold text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                                    {iku.unit}
                                 </span>
                              </td>
                              <td className="px-4 py-5 text-center align-top border-l border-r border-slate-800 bg-slate-900/20">
                                 <span className="text-sm font-mono font-bold text-slate-400">{iku.baseline2024}</span>
                              </td>
                              <td className="px-4 py-5 text-center align-top bg-blue-500/5 border-r border-blue-500/20">
                                 <span className="text-sm font-mono font-black text-blue-400">{iku.target2025}</span>
                              </td>
                              <td className="px-4 py-5 text-center align-top">
                                 <span className="text-xs font-mono font-medium text-slate-500">{iku.target2026}</span>
                              </td>
                              <td className="px-4 py-5 text-center align-top">
                                 <span className="text-xs font-mono font-medium text-slate-500">{iku.target2027}</span>
                              </td>
                              <td className="px-4 py-5 text-center align-top">
                                 <span className="text-xs font-mono font-medium text-slate-500">{iku.target2028}</span>
                              </td>
                              <td className="px-4 py-5 text-center align-top">
                                 <div className="flex items-center justify-center gap-1">
                                    <span className="text-xs font-mono font-bold text-emerald-500">{iku.target2029}</span>
                                    {iku.target2029 !== 'AA' && <ArrowRight size={10} className="text-emerald-500 -rotate-45" />}
                                 </div>
                              </td>
                           </tr>
                        ))}
                     </React.Fragment>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
      
      {/* Legend Footer */}
      <div className="flex flex-wrap gap-6 justify-center pt-8 border-t border-slate-800/50">
         <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-3 h-3 bg-blue-500/20 border border-blue-500/50 rounded-sm"></span>
            Target Tahun Berjalan (2025)
         </div>
         <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-3 h-3 bg-slate-800 border border-slate-700 rounded-sm"></span>
            Baseline Data (2024)
         </div>
      </div>
    </div>
  );
};
