
import React, { useState } from 'react';
import { 
  Calendar, 
  Plus, 
  Edit3, 
  Lock, 
  Unlock, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  ArrowRight
} from 'lucide-react';

interface BudgetYear {
  id: number;
  year: string;
  description: string;
  status: 'planning' | 'open' | 'review' | 'finalized' | 'closed';
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

const MOCK_YEARS: BudgetYear[] = [
  { 
    id: 1, 
    year: '2025', 
    description: 'Anggaran Murni - Transformasi Digital', 
    status: 'open', 
    startDate: '01 Jan 2025', 
    endDate: '31 Mar 2025',
    isCurrent: true 
  },
  { 
    id: 2, 
    year: '2024', 
    description: 'Anggaran Murni - Infrastruktur Unggul', 
    status: 'finalized', 
    startDate: '01 Jan 2024', 
    endDate: '31 Dec 2024',
    isCurrent: false 
  },
  { 
    id: 3, 
    year: '2023', 
    description: 'Anggaran Perubahan - Pasca Pandemi', 
    status: 'closed', 
    startDate: '01 Jan 2023', 
    endDate: '31 Dec 2023',
    isCurrent: false 
  },
];

export const TahunAnggaran: React.FC = () => {
  const [years] = useState<BudgetYear[]>(MOCK_YEARS);

  const getStatusBadge = (status: BudgetYear['status']) => {
    switch (status) {
      case 'open':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-700 border border-emerald-200">
            <Unlock size={12} />
            Buka Usulan
          </span>
        );
      case 'review':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-700 border border-amber-200">
            <Clock size={12} />
            Masa Review
          </span>
        );
      case 'finalized':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-700 border border-blue-200">
            <CheckCircle2 size={12} />
            Finalisasi
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-500 border border-slate-200">
            <Lock size={12} />
            Terkunci
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-600/20">
            <Calendar size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Pengaturan Tahun Anggaran</h2>
            <p className="text-sm text-slate-500 font-medium">Kelola siklus hidup anggaran dan periode penginputan usulan unit</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white text-sm font-black rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 transition-all active:scale-95 uppercase tracking-widest">
          <Plus size={18} className="stroke-[3px]" />
          Tahun Anggaran Baru
        </button>
      </div>

      {/* Info Warning */}
      <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl flex gap-3 items-center">
        <AlertCircle className="text-amber-600" size={20} />
        <p className="text-xs font-bold text-amber-800">
          Perubahan status tahun anggaran akan mempengaruhi hak akses input bagi seluruh operator unit kerja secara real-time.
        </p>
      </div>

      {/* Years Grid */}
      <div className="grid grid-cols-1 gap-4">
        {years.map((year) => (
          <div 
            key={year.id} 
            className={`bg-white rounded-2xl border p-6 flex flex-col lg:flex-row items-center justify-between gap-6 transition-all hover:shadow-md ${
              year.isCurrent ? 'border-indigo-500 ring-4 ring-indigo-500/5' : 'border-slate-200'
            }`}
          >
            <div className="flex items-center gap-6 w-full lg:w-auto">
              <div className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center ${
                year.isCurrent ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-100 text-slate-400'
              }`}>
                <span className="text-[10px] font-black uppercase opacity-60">Tahun</span>
                <span className="text-2xl font-black">{year.year}</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-black text-slate-800 tracking-tight">{year.description}</h3>
                  {year.isCurrent && (
                    <span className="bg-indigo-100 text-indigo-700 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest">Default</span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    <span>{year.startDate}</span>
                  </div>
                  <ArrowRight size={14} className="text-slate-300" />
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} />
                    <span>{year.endDate}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              <div className="flex flex-col items-center sm:items-end gap-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status Siklus</p>
                {getStatusBadge(year.status)}
              </div>
              
              <div className="h-10 w-px bg-slate-100 hidden sm:block"></div>
              
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-all">
                  <Edit3 size={14} />
                  Edit
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition-all">
                  Status
                </button>
                <button className="p-2 text-slate-400 hover:text-slate-800 transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
           <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Masa Aktif Usulan</h4>
           <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-800">45</span>
              <span className="text-sm font-bold text-slate-500">Hari Lagi</span>
           </div>
           <div className="mt-4 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-2/3"></div>
           </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
           <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Unit Belum Input</h4>
           <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-rose-500">12</span>
              <span className="text-sm font-bold text-slate-500">Unit Kerja</span>
           </div>
           <p className="mt-4 text-[11px] text-slate-400 font-medium">Batas akhir penginputan: 31 Maret 2025</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
           <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Log Terakhir</h4>
           <p className="text-xs font-bold text-slate-700 leading-relaxed">
             "Planning Admin" mengubah status TA 2025 menjadi "Open"
           </p>
           <p className="mt-2 text-[10px] text-slate-400 font-medium">15 menit yang lalu</p>
        </div>
      </div>
    </div>
  );
};
