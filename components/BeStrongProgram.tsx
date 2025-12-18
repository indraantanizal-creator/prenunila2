
import React, { useState, useMemo } from 'react';
import { 
  Briefcase, 
  Users, 
  HeartHandshake, 
  BookOpen, 
  Microscope, 
  Globe, 
  Wifi, 
  Landmark, 
  ChevronRight, 
  Wallet,
  ArrowUpRight,
  Target,
  BarChart3
} from 'lucide-react';
import { formatCurrency } from '../constants';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

// --- TYPE DEFINITIONS ---
interface ActivityBudget {
  id: string;
  name: string; // Nama Kegiatan Konkrit
  unit: string;
  pagu: number; // Anggaran
  realization: number;
}

interface StrategicPoint {
  code: string; // e.g., B.1
  text: string;
  activities: ActivityBudget[]; // Kegiatan yang mendukung poin ini
}

interface Pillar {
  id: string; // B, E, S, T...
  letter: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  points: StrategicPoint[];
}

// --- MOCK DATA BASED ON PROMPT ---
const BE_STRONG_DATA: Pillar[] = [
  {
    id: 'B',
    letter: 'B',
    title: 'Business Sector, Finance, Investment and Assets',
    icon: <Briefcase size={24} />,
    color: 'text-blue-500',
    gradient: 'from-blue-500 to-blue-600',
    points: [
      { 
        code: 'B.1', 
        text: 'Mengembangkan sumber-sumber pendapatan baru Unila melalui pemanfaatan sumber daya yang dimiliki (aset lahan, SDM, infrastruktur).',
        activities: [
            { id: 'act-b1-1', name: 'Revitalisasi Wisma Unila & GSG', unit: 'BPU', pagu: 1500000000, realization: 800000000 },
            { id: 'act-b1-2', name: 'Sewa Kantin & Pujasera Terpadu', unit: 'BPU', pagu: 250000000, realization: 200000000 }
        ]
      },
      { 
        code: 'B.2', 
        text: 'Membangun kerjasama dunia usaha & industri untuk hilirisasi hasil penelitian dan HKI (Royalti).',
        activities: [
            { id: 'act-b2-1', name: 'Pameran Hilirisasi Produk Inovasi', unit: 'LPPM', pagu: 350000000, realization: 150000000 }
        ]
      },
      { 
        code: 'B.3', 
        text: 'Melaksanakan skim investasi menguntungkan jangka pendek/panjang berbasis manajemen risiko.',
        activities: []
      },
      { 
        code: 'B.4', 
        text: 'Meningkatkan pengelolaan unit bisnis (BUA & BUNA).',
        activities: [
             { id: 'act-b4-1', name: 'Pengembangan Laboratorium Terpadu Komersial', unit: 'UPA LAB', pagu: 5000000000, realization: 4200000000 }
        ]
      },
       { 
        code: 'B.5', 
        text: 'Menambah aset melalui kerjasama atau hibah.',
        activities: []
      }
    ]
  },
  {
    id: 'E',
    letter: 'E',
    title: 'Empowerment of Human Resources',
    icon: <Users size={24} />,
    color: 'text-emerald-500',
    gradient: 'from-emerald-500 to-emerald-600',
    points: [
      { 
        code: 'E.1', 
        text: 'Menyusun HR Planning karir dosen & tendik, serta beasiswa degree/non-degree.',
        activities: [
            { id: 'act-e1-1', name: 'Beasiswa S3 Dosen ke Luar Negeri', unit: 'Kepegawaian', pagu: 8000000000, realization: 6500000000 },
            { id: 'act-e1-2', name: 'Pelatihan Sertifikasi Tendik', unit: 'Kepegawaian', pagu: 750000000, realization: 500000000 }
        ]
      },
      { 
        code: 'E.3', 
        text: 'Meningkatkan kesejahteraan dosen & tendik (Sistem Remunerasi).',
        activities: [
            { id: 'act-e3-1', name: 'Insentif Kinerja Remunerasi', unit: 'Keuangan', pagu: 45000000000, realization: 22000000000 }
        ]
      },
      { 
        code: 'E.6', 
        text: 'Grand design kompetensi kewirausahaan mahasiswa (Target 30% alumni wirausaha).',
        activities: [
            { id: 'act-e6-1', name: 'Program Mahasiswa Wirausaha (PMW)', unit: 'Kemahasiswaan', pagu: 1200000000, realization: 1200000000 }
        ]
      }
    ]
  },
  {
    id: 'S',
    letter: 'S',
    title: 'Services for Community',
    icon: <HeartHandshake size={24} />,
    color: 'text-rose-500',
    gradient: 'from-rose-500 to-rose-600',
    points: [
      { 
        code: 'S.1', 
        text: 'Pelayanan prima (service excellence) dan akses inklusif disabilitas.',
        activities: [
            { id: 'act-s1-1', name: 'Pembangunan Jalur Ramah Disabilitas Gedung A-F', unit: 'Rumah Tangga', pagu: 950000000, realization: 300000000 },
            { id: 'act-s1-2', name: 'Pelatihan Service Excellence Front Office', unit: 'BAK', pagu: 150000000, realization: 150000000 }
        ]
      },
      { 
        code: 'S.4', 
        text: 'Pencegahan dan Penanganan Kekerasan Seksual (PPKS).',
        activities: [
            { id: 'act-s4-1', name: 'Operasional Satgas PPKS', unit: 'Rektorat', pagu: 200000000, realization: 120000000 }
        ]
      }
    ]
  },
  {
    id: 'T',
    letter: 'T',
    title: 'Teaching',
    icon: <BookOpen size={24} />,
    color: 'text-amber-500',
    gradient: 'from-amber-500 to-amber-600',
    points: [
      { 
        code: 'T.2', 
        text: 'Sistem pembelajaran digital (LMS, MOOCs, Smart Classroom).',
        activities: [
            { id: 'act-t2-1', name: 'Pengadaan Smart Classroom (10 Unit)', unit: 'UPT TIK', pagu: 3500000000, realization: 0 },
            { id: 'act-t2-2', name: 'Langganan Zoom Premium & Cloud Storage', unit: 'UPT TIK', pagu: 1200000000, realization: 1200000000 }
        ]
      },
      { 
        code: 'T.3', 
        text: 'Akreditasi program studi (nasional/internasional) dan institusi unggul.',
        activities: [
             { id: 'act-t3-1', name: 'Pendampingan Akreditasi FIBAA', unit: 'LP3M', pagu: 1500000000, realization: 900000000 }
        ]
      },
      { 
        code: 'T.5', 
        text: 'Program Praktisi Mengajar.',
        activities: [
             { id: 'act-t5-1', name: 'Honorarium Praktisi Mengajar', unit: 'Akademik', pagu: 850000000, realization: 400000000 }
        ]
      }
    ]
  },
  {
    id: 'R',
    letter: 'R',
    title: 'Research',
    icon: <Microscope size={24} />,
    color: 'text-purple-500',
    gradient: 'from-purple-500 to-purple-600',
    points: [
       { 
        code: 'R.4', 
        text: 'Insentif publikasi jurnal nasional terakreditasi dan internasional bereputasi.',
        activities: [
             { id: 'act-r4-1', name: 'Insentif Publikasi Q1/Q2', unit: 'LPPM', pagu: 4000000000, realization: 3800000000 }
        ]
      },
      { 
        code: 'R.6', 
        text: 'Hibah riset internal dan eksternal kolaboratif.',
        activities: [
             { id: 'act-r6-1', name: 'Hibah Penelitian Dosen Pemula & Lanjut', unit: 'LPPM', pagu: 6500000000, realization: 5000000000 }
        ]
      }
    ]
  },
  {
    id: 'O',
    letter: 'O',
    title: 'Organizational Partnerships',
    icon: <Globe size={24} />,
    color: 'text-cyan-500',
    gradient: 'from-cyan-500 to-cyan-600',
    points: [
      { 
        code: 'O.1', 
        text: 'Mengembangkan kerjasama yang teraktualisasi (MoU/MoA Aktif).',
        activities: [
            { id: 'act-o1-1', name: 'Perjalanan Dinas Kerjasama Luar Negeri', unit: 'UPT PKLI', pagu: 1200000000, realization: 800000000 }
        ]
      },
      { 
        code: 'O.3', 
        text: 'Matching fund (Kedai Reka).',
        activities: [
            { id: 'act-o3-1', name: 'Dana Pendamping Matching Fund', unit: 'LPPM', pagu: 2000000000, realization: 1500000000 }
        ]
      }
    ]
  },
  {
    id: 'N',
    letter: 'N',
    title: 'Network Infrastructure',
    icon: <Wifi size={24} />,
    color: 'text-indigo-500',
    gradient: 'from-indigo-500 to-indigo-600',
    points: [
      { 
        code: 'N.1', 
        text: 'Peningkatan jaringan digital & LMS Vclass.',
        activities: [
            { id: 'act-n1-1', name: 'Peningkatan Bandwidth Internet 10Gbps', unit: 'UPT TIK', pagu: 4200000000, realization: 3000000000 }
        ]
      },
      { 
        code: 'N.4', 
        text: 'Sistem informasi berbasis one data (One Gate System).',
        activities: [
            { id: 'act-n4-1', name: 'Integrasi Database SIAKAD & Kepegawaian', unit: 'UPT TIK', pagu: 500000000, realization: 200000000 }
        ]
      }
    ]
  },
  {
    id: 'G',
    letter: 'G',
    title: 'Good University Governance',
    icon: <Landmark size={24} />,
    color: 'text-slate-500',
    gradient: 'from-slate-500 to-slate-600',
    points: [
      { 
        code: 'G.1', 
        text: 'Menyusun NSPK (Norma, Standar, Prosedur, Kriteria).',
        activities: [
            { id: 'act-g1-1', name: 'Workshop Penyusunan SOP Terintegrasi', unit: 'Hukum', pagu: 150000000, realization: 150000000 }
        ]
      },
      { 
        code: 'G.2', 
        text: 'Manajemen Risiko (Identifikasi, Analisis, Evaluasi).',
        activities: [
            { id: 'act-g2-1', name: 'Pendampingan SPI & Manajemen Risiko', unit: 'SPI', pagu: 300000000, realization: 250000000 }
        ]
      }
    ]
  }
];

export const BeStrongProgram: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('B');

  const activePillar = BE_STRONG_DATA.find(p => p.id === activeId) || BE_STRONG_DATA[0];

  // Calculate Aggregates for Chart
  const chartData = BE_STRONG_DATA.map(p => {
    const totalPagu = p.points.reduce((acc, point) => 
      acc + point.activities.reduce((sum, act) => sum + act.pagu, 0)
    , 0);
    return { name: p.letter, value: totalPagu, fill: p.color.replace('text-', 'bg-').replace('-500', '-500') };
  });

  // Calculate Grand Total for All Pillars
  const grandTotalBudget = useMemo(() => {
    return BE_STRONG_DATA.reduce((total, pillar) => {
      const pillarTotal = pillar.points.reduce((pTotal, point) => {
        return pTotal + point.activities.reduce((aTotal, act) => aTotal + act.pagu, 0);
      }, 0);
      return total + pillarTotal;
    }, 0);
  }, []);

  const activeTotalBudget = useMemo(() => {
    return activePillar.points.reduce((acc, point) => 
        acc + point.activities.reduce((sum, act) => sum + act.pagu, 0)
    , 0);
  }, [activePillar]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-[#0f172a] -m-6 p-8 min-h-screen text-slate-300 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div>
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-widest mb-2">
             <Target size={14} />
             Program Kerja Unggulan
           </div>
           <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">BE STRONG</span>
           </h1>
           <p className="text-slate-400 max-w-2xl text-sm leading-relaxed">
             Inisiatif strategis Universitas Lampung untuk mencapai visi World Class University melalui 8 pilar utama pengembangan.
           </p>
        </div>

        {/* Mini Chart for Budget Distribution */}
        <div className="bg-[#1e293b] p-5 rounded-2xl border border-slate-800 w-full md:w-96 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Wallet size={80} />
            </div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                   <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                       <Wallet size={12} className="text-emerald-500" /> Total Anggaran BE STRONG
                   </h4>
                   <p className="text-2xl font-black text-white font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                       Rp {formatCurrency(grandTotalBudget)}
                   </p>
                </div>
            </div>

            <div className="h-28 relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                            {chartData.map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={
                                   entry.name === 'B' ? '#3b82f6' : 
                                   entry.name === 'E' ? '#10b981' : 
                                   entry.name === 'S' ? '#f43f5e' : 
                                   entry.name === 'T' ? '#f59e0b' : 
                                   entry.name === 'R' ? '#a855f7' : 
                                   entry.name === 'O' ? '#06b6d4' : 
                                   entry.name === 'N' ? '#6366f1' : '#64748b'
                               } />
                            ))}
                        </Bar>
                        <Tooltip 
                            formatter={(val: number) => formatCurrency(val)}
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '10px' }}
                            cursor={{fill: 'white', opacity: 0.1}}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>

      {/* Navigation / Acronym Cards */}
      <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
        {BE_STRONG_DATA.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={`relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 group overflow-hidden h-28 ${
                isActive 
                ? `bg-gradient-to-b ${item.gradient} border-transparent text-white shadow-xl shadow-${item.color.split('-')[1]}-500/20 scale-105 z-10` 
                : 'bg-[#1e293b] border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300'
              }`}
            >
              <div className={`text-3xl font-black mb-1 ${isActive ? 'text-white' : item.color}`}>
                {item.letter}
              </div>
              <div className="text-[9px] font-bold uppercase text-center leading-tight opacity-80 line-clamp-2">
                {item.title.split(' ')[0]} {/* Show first word only on card for cleaner look */}
              </div>
              
              {isActive && <div className="absolute inset-0 bg-white/10 animate-pulse"></div>}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="bg-[#1e293b]/50 backdrop-blur-md rounded-3xl border border-slate-800 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
         
         {/* Pillar Header */}
         <div className="p-8 border-b border-slate-700/50 bg-slate-900/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-5">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${activePillar.gradient} text-white shadow-2xl`}>
                    {activePillar.icon}
                </div>
                <div>
                    <h2 className="text-2xl font-black text-white tracking-tight">{activePillar.title}</h2>
                    <p className="text-slate-400 text-sm mt-1">Daftar inisiatif strategis dan dukungan anggaran RKAKL</p>
                </div>
            </div>
            
            <div className="bg-slate-800/80 px-5 py-3 rounded-xl border border-slate-700 text-right">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Alokasi Pilar {activePillar.letter}</p>
                <p className={`text-xl font-mono font-black ${activePillar.color}`}>
                    Rp {formatCurrency(activeTotalBudget)}
                </p>
            </div>
         </div>

         {/* Strategic Points List */}
         <div className="divide-y divide-slate-800">
            {activePillar.points.map((point) => (
                <div key={point.code} className="p-6 md:p-8 hover:bg-white/5 transition-colors group">
                    <div className="flex gap-4 items-start mb-6">
                        <span className={`px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-sm font-black ${activePillar.color}`}>
                            {point.code}
                        </span>
                        <p className="text-lg text-slate-200 font-medium leading-relaxed">
                            {point.text}
                        </p>
                    </div>

                    {/* Resume Kegiatan Table */}
                    <div className="pl-0 md:pl-14">
                        {point.activities.length > 0 ? (
                            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                                <div className="px-4 py-3 bg-slate-800/50 border-b border-slate-700 flex items-center justify-between">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <BarChart3 size={14} /> Resume Kegiatan Pendukung (RKAKL)
                                    </h4>
                                    <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded">
                                        {point.activities.length} Kegiatan
                                    </span>
                                </div>
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-slate-800 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                                            <th className="px-4 py-3">Nama Kegiatan</th>
                                            <th className="px-4 py-3 w-32">Unit Kerja</th>
                                            <th className="px-4 py-3 w-40 text-right">Pagu Anggaran</th>
                                            <th className="px-4 py-3 w-40 text-right">Realisasi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800 text-slate-300">
                                        {point.activities.map(act => (
                                            <tr key={act.id} className="hover:bg-slate-800/50">
                                                <td className="px-4 py-3 font-medium">{act.name}</td>
                                                <td className="px-4 py-3 text-slate-500 text-xs">{act.unit}</td>
                                                <td className="px-4 py-3 text-right font-mono text-emerald-400">
                                                    {formatCurrency(act.pagu)}
                                                </td>
                                                <td className="px-4 py-3 text-right font-mono text-slate-400 text-xs">
                                                    {formatCurrency(act.realization)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-800/50 border-dashed text-slate-500 text-xs italic flex items-center gap-2">
                                <ArrowUpRight size={14} /> Belum ada kegiatan RKAKL spesifik yang di-tagging ke poin strategi ini pada TA berjalan.
                            </div>
                        )}
                    </div>
                </div>
            ))}
         </div>
      </div>
    </div>
  );
};
