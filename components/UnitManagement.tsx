
import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  MoreVertical, 
  ExternalLink,
  ChevronRight,
  Filter,
  Users2,
  Wallet2
} from 'lucide-react';
import { UnitData } from '../types';
import { formatCurrency, MOCK_DATA } from '../constants';

export const UnitManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data] = useState<UnitData[]>(MOCK_DATA);

  const filteredData = useMemo(() => {
    return data.filter(unit => 
      unit.unitName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      unit.unitCode.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header Info */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
            <Building2 size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">Manajemen Unit Kerja</h2>
            <p className="text-sm text-slate-500 font-medium">Pengelolaan struktur organisasi dan alokasi pagu dasar unit</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white text-xs font-black rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 transition-all active:scale-95 uppercase tracking-widest">
          <Plus size={16} className="stroke-[3px]" />
          Tambah Unit Baru
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Cari Kode atau Nama Unit..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Filter size={14} />
            Filter Kategori
          </button>
          <div className="h-8 w-px bg-slate-200 mx-1"></div>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
            Total: <span className="text-slate-800">{filteredData.length} Unit</span>
          </p>
        </div>
      </div>

      {/* Units Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest w-16 text-center">No</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Identitas Unit</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Alokasi Pagu (TA 2025)</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right pr-8">Opsi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredData.map((unit, index) => (
                <tr key={unit.id} className="group hover:bg-indigo-50/30 transition-colors">
                  <td className="px-6 py-5 text-center font-mono text-xs text-slate-300 group-hover:text-indigo-400">
                    {index + 1}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-all">
                        <Building2 size={18} />
                      </div>
                      <div>
                        <div className="font-black text-slate-800 group-hover:text-indigo-700 transition-colors uppercase tracking-tight">
                          {unit.unitCode}
                        </div>
                        <div className="text-xs text-slate-400 font-medium">
                          {unit.unitName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="font-mono font-bold text-slate-700 text-sm">
                      Rp {formatCurrency(unit.pagu)}
                    </div>
                    <div className="text-[9px] text-emerald-500 font-black uppercase tracking-tighter mt-0.5">
                      Aktif: Rp {formatCurrency(unit.paguAktif)}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-700 border border-emerald-200">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        Terverifikasi
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-end items-center gap-2">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Edit Unit">
                        <Edit3 size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Lihat Detail Pagu">
                        <Wallet2 size={16} />
                      </button>
                      <div className="h-4 w-px bg-slate-200 mx-1"></div>
                      <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
