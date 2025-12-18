
import React, { useState } from 'react';
import { ChevronRight, ChevronDown, AlertCircle, Save, Calculator } from 'lucide-react';
import { BudgetHierarchy } from '../types';
import { formatCurrency } from '../constants';

interface TableRowProps {
  item: BudgetHierarchy;
  level: number;
  onToggle: (id: string) => void;
  expandedIds: Record<string, boolean>;
}

const TableRow: React.FC<TableRowProps> = ({ item, level, onToggle, expandedIds }) => {
  const isExpanded = !!expandedIds[item.id];
  const hasChildren = item.children && item.children.length > 0;
  const isLeaf = !hasChildren;
  const selisih = item.paguTetap - item.usulan;
  const isNegative = selisih < 0;

  // --- LOGIC VISUALISASI HIERARKI ---
  let rowClass = "";
  let textClass = "";
  let paguTetapClass = "";
  let iconClass = "";

  if (item.type === 'program' || item.type === 'kegiatan') {
    // Level 1: Program (Abu-abu Gelap)
    rowClass = "bg-slate-800 border-b border-slate-700 hover:bg-slate-700";
    textClass = "text-white font-bold tracking-wide";
    paguTetapClass = "bg-black/20 text-slate-300"; // Read-only look dark mode
    iconClass = "text-slate-400 hover:text-white";
  } else if (['output', 'suboutput', 'komponen', 'akun'].includes(item.type)) {
    // Level 2: Output/Komponen (Abu-abu Terang)
    rowClass = "bg-slate-100 border-b border-slate-200 hover:bg-slate-200/70";
    textClass = "text-slate-800 font-semibold";
    paguTetapClass = "bg-slate-200 text-slate-600"; // Read-only look light mode
    iconClass = "text-slate-500 hover:text-blue-600";
  } else {
    // Level 3: Rincian/Detail (Putih)
    rowClass = "bg-white border-b border-slate-100 hover:bg-blue-50/30";
    textClass = "text-slate-600 font-medium";
    paguTetapClass = "bg-slate-50 text-slate-500"; // Read-only look clean
    iconClass = "text-slate-400";
  }

  // Indentasi Hierarki
  const paddingLeft = `${level * 24 + 16}px`;

  return (
    <>
      <tr className={`transition-colors duration-200 ${rowClass}`}>
        {/* Kolom 1: Kode & Uraian (Tree Control) */}
        <td className="py-3 pr-4" style={{ paddingLeft }}>
          <div className="flex items-center gap-3">
            {hasChildren ? (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle(item.id);
                }}
                className={`p-1 rounded transition-all focus:outline-none ${iconClass}`}
              >
                {isExpanded ? <ChevronDown size={16} className="stroke-[3px]" /> : <ChevronRight size={16} className="stroke-[3px]" />}
              </button>
            ) : (
              <div className="w-6" /> // Spacer agar rata
            )}
            
            <div className={`flex flex-col ${textClass}`}>
               <div className="flex items-start gap-2">
                 <span className={`${item.type === 'detail' ? 'hidden' : 'inline-block'} opacity-70 font-mono text-[11px] mt-0.5 min-w-[30px]`}>
                    {item.code !== '-' ? item.code : ''}
                 </span>
                 <span className="text-sm">{item.description}</span>
               </div>
            </div>
          </div>
        </td>

        {/* Kolom 2: Volume */}
        <td className={`px-4 py-3 text-center text-xs ${item.type === 'program' ? 'text-slate-400' : 'text-slate-500'}`}>
          {isLeaf && item.volume ? item.volume : ''}
        </td>

        {/* Kolom 3: Satuan */}
        <td className={`px-4 py-3 text-center text-xs uppercase ${item.type === 'program' ? 'text-slate-400' : 'text-slate-500'}`}>
          {isLeaf && item.unit ? item.unit : ''}
        </td>

        {/* Kolom 4: Harga Satuan */}
        <td className={`px-4 py-3 text-right text-xs font-mono ${item.type === 'program' ? 'text-slate-400' : 'text-slate-500'}`}>
          {isLeaf && item.unitPrice ? formatCurrency(item.unitPrice) : ''}
        </td>

        {/* Kolom 5: Pagu Tetap (Read Only - Background Abu) */}
        <td className="px-2 py-2">
           <div className={`w-full py-2 px-3 rounded text-right text-xs font-mono font-bold ${paguTetapClass}`}>
               {formatCurrency(item.paguTetap)}
           </div>
        </td>

        {/* Kolom 6: Usulan (Editable - Border Putih/Aktif) */}
        <td className="px-2 py-2">
           {isLeaf ? (
             <input 
               type="text" 
               defaultValue={formatCurrency(item.usulan)}
               className="w-full py-2 px-3 text-right text-xs font-mono font-bold text-slate-800 bg-white border-2 border-white focus:border-blue-500 rounded shadow-sm focus:ring-2 focus:ring-blue-200 outline-none transition-all"
               placeholder="0"
             />
           ) : (
             <div className={`py-2 px-3 text-right text-xs font-mono font-bold border-2 border-transparent ${
                item.type === 'program' || item.type === 'kegiatan' ? 'text-emerald-400' : 'text-slate-700'
             }`}>
                {formatCurrency(item.usulan)}
             </div>
           )}
        </td>

        {/* Kolom 7: Selisih (Merah Tebal jika Minus) */}
        <td className="px-4 py-3 text-right">
            <span className={`text-xs font-mono ${
                isNegative 
                ? 'text-red-500 font-black bg-red-100/10 px-2 py-0.5 rounded' 
                : (item.type === 'program' ? 'text-emerald-400 font-bold' : 'text-emerald-600 font-bold')
            }`}>
              {isNegative ? `(${formatCurrency(Math.abs(selisih))})` : (selisih === 0 ? '-' : formatCurrency(selisih))}
            </span>
        </td>
      </tr>
      
      {/* Recursive Rendering */}
      {isExpanded && hasChildren && item.children?.map(child => (
        <TableRow 
          key={child.id} 
          item={child} 
          level={level + 1} 
          onToggle={onToggle}
          expandedIds={expandedIds}
        />
      ))}
    </>
  );
};

interface RKAKLTableProps {
  data: BudgetHierarchy[];
}

export const RKAKLTable: React.FC<RKAKLTableProps> = ({ data }) => {
  // State untuk expand/collapse
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
      'prog-1': true,
      'keg-1': true,
      'out-1': true,
      'out-2': true,
      'comp-1': true,
      'comp-2': true,
      'comp-3': true
  });

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in duration-500">
      
      {/* Header Panel */}
      <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white">
        <div>
           <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
             <Calculator className="text-blue-600" />
             Rincian Kertas Kerja (RKAKL)
           </h2>
           <p className="text-xs text-slate-500 font-medium mt-0.5 ml-8">Detail Rincian Belanja per Output Kegiatan TA 2025</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
             <div className="flex items-center gap-2 text-[10px] font-bold px-3 py-2 bg-red-50 text-red-600 rounded-xl border border-red-100 shadow-sm">
                <AlertCircle size={14} />
                <span className="uppercase tracking-wider">Selisih Minus: Over Budget</span>
             </div>
             <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-xs font-black rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all active:scale-95 uppercase tracking-widest">
                <Save size={16} className="stroke-[3px]" />
                Simpan Perubahan
             </button>
        </div>
      </div>
      
      {/* Table Area */}
      <div className="flex-1 overflow-auto custom-scrollbar bg-slate-50">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white sticky top-0 z-20 shadow-sm border-b border-slate-200">
            <tr className="text-[10px] uppercase text-slate-500 font-black tracking-[0.1em]">
              <th className="py-4 pl-6 pr-4 w-[35%]">Kode / Uraian</th>
              <th className="py-4 px-4 text-center w-[5%]">Vol</th>
              <th className="py-4 px-4 text-center w-[5%]">Sat</th>
              <th className="py-4 px-4 text-right w-[10%]">Hrg Satuan</th>
              <th className="py-4 px-2 text-right w-[15%] bg-slate-50">Pagu Tetap</th>
              <th className="py-4 px-2 text-right w-[15%]">Usulan</th>
              <th className="py-4 px-4 text-right w-[15%]">Selisih</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.map(item => (
              <TableRow 
                key={item.id} 
                item={item} 
                level={0} 
                onToggle={toggleExpand}
                expandedIds={expandedIds}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
