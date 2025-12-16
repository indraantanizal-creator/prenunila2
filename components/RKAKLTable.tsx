import React, { useState } from 'react';
import { ChevronRight, ChevronDown, AlertCircle, Save } from 'lucide-react';
import { BudgetHierarchy } from '../types';
import { formatCurrency } from '../constants';

interface RKAKLTableProps {
  data: BudgetHierarchy[];
}

const TableRow: React.FC<{ 
  item: BudgetHierarchy; 
  level: number; 
  onToggle: (id: string) => void;
  isExpanded: boolean;
}> = ({ item, level, onToggle, isExpanded }) => {
  
  const hasChildren = item.children && item.children.length > 0;
  const isLeaf = !hasChildren;
  const selisih = item.paguTetap - item.usulan;
  const isNegative = selisih < 0;

  // Visual Hierarchy Logic
  let bgClass = "bg-white";
  let textClass = "text-slate-600";
  let indentClass = "";

  if (item.type === 'program' || item.type === 'kegiatan') {
    bgClass = "bg-slate-800";
    textClass = "text-white font-bold";
  } else if (item.type === 'output' || item.type === 'suboutput' || item.type === 'komponen' || item.type === 'akun') {
    bgClass = "bg-slate-100";
    textClass = "text-slate-800 font-semibold";
  } else {
    // Detail/Leaf
    bgClass = "bg-white hover:bg-slate-50";
    textClass = "text-slate-600";
  }

  // Padding based on level
  const paddingLeft = `${level * 24 + 12}px`;

  return (
    <>
      <tr className={`border-b border-slate-200 transition-colors ${bgClass}`}>
        {/* Code & Description Column */}
        <td className="py-3 pr-4" style={{ paddingLeft }}>
          <div className="flex items-center gap-2">
            {hasChildren && (
              <button 
                onClick={() => onToggle(item.id)}
                className={`p-0.5 rounded focus:outline-none transition-transform ${
                    item.type === 'program' || item.type === 'kegiatan' ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
            )}
            {!hasChildren && <div className="w-4" />} {/* Spacer for alignment */}
            
            <div className={`flex flex-col ${textClass}`}>
               <div className="flex items-baseline gap-2">
                 <span className={`${item.type === 'detail' ? 'hidden' : 'inline-block'} opacity-80 font-mono text-xs mr-1`}>
                    {item.code !== '-' ? item.code : ''}
                 </span>
                 <span className="text-sm">{item.description}</span>
               </div>
            </div>
          </div>
        </td>

        {/* Volume */}
        <td className="px-4 py-3 text-center text-sm text-slate-500">
          {isLeaf && item.volume ? item.volume : ''}
        </td>

        {/* Unit */}
        <td className="px-4 py-3 text-center text-sm text-slate-500">
          {isLeaf && item.unit ? item.unit : ''}
        </td>

        {/* Harga Satuan */}
        <td className="px-4 py-3 text-right text-sm font-mono text-slate-600">
          {isLeaf && item.unitPrice ? formatCurrency(item.unitPrice) : ''}
        </td>

        {/* Pagu Tetap (Read Only) */}
        <td className="px-4 py-2 text-right">
           <div className={`py-2 px-3 rounded text-sm font-mono font-medium ${
               item.type === 'program' || item.type === 'kegiatan' ? 'text-slate-200' : 'bg-slate-100 text-slate-500 border border-transparent'
           }`}>
               {formatCurrency(item.paguTetap)}
           </div>
        </td>

        {/* Usulan (Editable) */}
        <td className="px-4 py-2 text-right">
           {isLeaf ? (
             <input 
               type="text" 
               defaultValue={formatCurrency(item.usulan)}
               className="w-32 py-1.5 px-3 text-right text-sm font-mono text-slate-800 bg-white border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm"
             />
           ) : (
             <div className={`py-2 px-3 text-sm font-mono font-bold ${
                item.type === 'program' || item.type === 'kegiatan' ? 'text-white' : 'text-slate-800'
             }`}>
                {formatCurrency(item.usulan)}
             </div>
           )}
        </td>

        {/* Selisih */}
        <td className={`px-4 py-3 text-right text-sm font-mono ${
             item.type === 'program' || item.type === 'kegiatan' ? (isNegative ? 'text-red-400 font-bold' : 'text-emerald-400') : (isNegative ? 'text-red-600 font-bold' : 'text-emerald-600')
        }`}>
          {isNegative ? `(${formatCurrency(Math.abs(selisih))})` : formatCurrency(selisih)}
        </td>
      </tr>
      
      {/* Recursive Children Rendering */}
      {isExpanded && hasChildren && item.children?.map(child => (
        <TableRow 
          key={child.id} 
          item={child} 
          level={level + 1} 
          onToggle={onToggle}
          isExpanded={isExpanded} // Simple implementation: keep children expanded based on parent for demo, or manage individual state
        />
      ))}
    </>
  );
};

export const RKAKLTable: React.FC<RKAKLTableProps> = ({ data }) => {
  // Manage expansion state
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
    <div className="flex flex-col h-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <div>
           <h2 className="text-lg font-bold text-slate-800">Rincian Kertas Kerja (RKAKL)</h2>
           <p className="text-sm text-slate-500">Detail Rincian Belanja per Output Kegiatan</p>
        </div>
        <div className="flex gap-3">
             <div className="flex items-center gap-2 text-xs px-3 py-1.5 bg-red-50 text-red-700 rounded border border-red-100">
                <AlertCircle size={14} />
                <span>Selisih Minus: Over Budget</span>
             </div>
             <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 shadow-sm">
                <Save size={16} />
                Simpan Perubahan
             </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 sticky top-0 z-10 shadow-sm text-xs uppercase text-slate-500 font-bold tracking-wider">
            <tr>
              <th className="py-4 pl-4 pr-4 w-[40%]">Kode / Uraian</th>
              <th className="py-4 px-4 text-center w-[8%]">Vol</th>
              <th className="py-4 px-4 text-center w-[8%]">Sat</th>
              <th className="py-4 px-4 text-right w-[12%]">Harga Sat</th>
              <th className="py-4 px-4 text-right w-[12%]">Pagu Tetap</th>
              <th className="py-4 px-4 text-right w-[12%]">Usulan</th>
              <th className="py-4 px-4 text-right w-[10%]">Selisih</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <TableRow 
                key={item.id} 
                item={item} 
                level={0} 
                onToggle={toggleExpand}
                isExpanded={!!expandedIds[item.id]}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};