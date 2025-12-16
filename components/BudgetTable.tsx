import React from 'react';
import { UnitData } from '../types';
import { formatCurrency } from '../constants';
import { Download, Filter } from 'lucide-react';

interface BudgetTableProps {
  data: UnitData[];
}

export const BudgetTable: React.FC<BudgetTableProps> = ({ data }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <div>
            <h2 className="text-lg font-bold text-slate-800">Detail Anggaran</h2>
            <p className="text-sm text-slate-500">Rincian Pagu, Usulan, dan Status Review</p>
        </div>
        <div className="flex gap-2">
            <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg border border-slate-200">
                <Filter size={16} />
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <Download size={16} />
                Export
            </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto border border-slate-200 rounded-lg shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-xs text-slate-500 uppercase font-semibold sticky top-0 z-10 shadow-sm">
            <tr>
              <th className="px-6 py-4 whitespace-nowrap">No</th>
              <th className="px-6 py-4 whitespace-nowrap">Unit Kerja</th>
              <th className="px-6 py-4 text-right whitespace-nowrap">Pagu</th>
              <th className="px-6 py-4 text-right whitespace-nowrap">Usulan</th>
              <th className="px-6 py-4 text-center whitespace-nowrap">%</th>
              <th className="px-6 py-4 text-right whitespace-nowrap">Pagu Blokir</th>
              <th className="px-6 py-4 text-right whitespace-nowrap">Pagu Aktif</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {data.map((item, index) => (
              <tr key={item.id} className="hover:bg-blue-50/50 transition-colors even:bg-slate-50">
                <td className="px-6 py-3 font-medium text-slate-400">{index + 1}</td>
                <td className="px-6 py-3 font-semibold text-slate-700">
                    <div>{item.unitCode}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{item.unitName}</div>
                </td>
                <td className="px-6 py-3 text-right font-mono text-slate-700">
                  {formatCurrency(item.pagu)}
                </td>
                <td className="px-6 py-3 text-right font-mono text-slate-600">
                  {formatCurrency(item.usulan)}
                </td>
                <td className="px-6 py-3 text-center">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                    {item.percentUsulan}%
                  </span>
                </td>
                 <td className="px-6 py-3 text-right font-mono text-red-500 text-xs">
                  {formatCurrency(item.paguBlokir)}
                </td>
                <td className="px-6 py-3 text-right font-mono text-blue-600 font-medium">
                  {formatCurrency(item.paguAktif)}
                </td>
              </tr>
            ))}
          </tbody>
           <tfoot className="bg-slate-50 font-bold sticky bottom-0 border-t-2 border-slate-200">
              <tr>
                  <td colSpan={2} className="px-6 py-3 text-slate-600 text-right">TOTAL</td>
                  <td className="px-6 py-3 text-right font-mono text-slate-800">428.225.336.000</td>
                  <td className="px-6 py-3 text-right font-mono text-slate-800">428.225.336.000</td>
                  <td className="px-6 py-3 text-center text-slate-800">100%</td>
                  <td className="px-6 py-3 text-right font-mono text-red-600">35.638.281.000</td>
                  <td className="px-6 py-3 text-right font-mono text-blue-700">392.587.055.000</td>
              </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};