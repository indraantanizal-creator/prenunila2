import React from 'react';
import { StatsCard } from './StatsCard';
import { Target, BarChart2, ShieldAlert, Users, TrendingUp, Clock, FileCheck, Activity } from 'lucide-react';
import { BSCPerspective, BSCActivity } from '../types';

// Mock Data for BSC View
const MOCK_PERSPECTIVES: BSCPerspective[] = [
  { id: 'cust', name: 'Perspektif Pelanggan', targetCount: 12, achievement: 85, color: 'bg-blue-500' },
  { id: 'fin', name: 'Perspektif Keuangan', targetCount: 8, achievement: 92, color: 'bg-emerald-500' },
  { id: 'proc', name: 'Proses Internal Bisnis', targetCount: 15, achievement: 78, color: 'bg-amber-500' },
  { id: 'learn', name: 'Pembelajaran & Pertumbuhan', targetCount: 10, achievement: 65, color: 'bg-purple-500' },
];

const MOCK_ACTIVITIES: BSCActivity[] = [
  { id: 1, user: 'Admin BPHM', action: 'Update Realisasi', target: 'Peningkatan Akreditasi Internasional', time: '10 mins ago', type: 'update' },
  { id: 2, user: 'Ka. Biro', action: 'Approval Sasaran', target: 'Optimalisasi Aset BLU', time: '2 hours ago', type: 'review' },
  { id: 3, user: 'Admin FT', action: 'Input IKU Baru', target: 'Riset Terapan Dosen', time: '5 hours ago', type: 'create' },
  { id: 4, user: 'Admin FEB', action: 'Delete Target', target: 'Kerjasama UMKM Binaan', time: '1 day ago', type: 'delete' },
];

const MOCK_STRATEGIC_GOALS = [
  { id: 'SS-01', name: 'Meningkatkan Kualitas Lulusan Berdaya Saing', perspective: 'Pelanggan', weight: 20, pic: 'Wakil Rektor 1' },
  { id: 'SS-02', name: 'Menguatkan Tata Kelola Keuangan BLU', perspective: 'Keuangan', weight: 15, pic: 'Wakil Rektor 2' },
  { id: 'SS-03', name: 'Modernisasi Infrastruktur IT Kampus', perspective: 'Proses Internal', weight: 15, pic: 'Kepala UPT TIK' },
  { id: 'SS-04', name: 'Pengembangan Kompetensi SDM Dosen', perspective: 'Pembelajaran', weight: 10, pic: 'Wakil Rektor 2' },
  { id: 'SS-05', name: 'Hilirisasi Hasil Riset dan Inovasi', perspective: 'Pelanggan', weight: 20, pic: 'Ketua LPPM' },
];

export const BSCStrategic: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Total Sasaran Strategis" 
          value="45" 
          icon={<Target />} 
          colorClass="bg-blue-600" 
          trend="+5 Target Baru" 
        />
        <StatsCard 
          title="Total Indikator IKU" 
          value="128" 
          icon={<BarChart2 />} 
          colorClass="bg-indigo-600" 
          trend="92% Terukur" 
        />
        <StatsCard 
          title="Unit Kerja Terdaftar" 
          value="18" 
          icon={<Users />} 
          colorClass="bg-teal-600" 
          trend="Aktif" 
        />
        <StatsCard 
          title="Risiko Teridentifikasi" 
          value="12" 
          icon={<ShieldAlert />} 
          colorClass="bg-rose-500" 
          trend="3 High Risk" 
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column: Perspectives Chart */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Sebaran Sasaran per Perspektif</h2>
              <p className="text-sm text-slate-500">Distribusi target strategis dan capaian kinerja</p>
            </div>
            <button className="text-sm text-blue-600 font-medium hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
              Lihat Detail
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            {MOCK_PERSPECTIVES.map((p) => (
              <div key={p.id}>
                <div className="flex justify-between items-end mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${p.color}`}></span>
                    <span className="font-semibold text-slate-700 text-sm">{p.name}</span>
                    <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{p.targetCount} Sasaran</span>
                  </div>
                  <span className="text-sm font-bold text-slate-800">{p.achievement}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full ${p.color} rounded-full transition-all duration-1000 ease-out`} 
                    style={{ width: `${p.achievement}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Quick Table for Strategic Goals */}
          <div className="border-t border-slate-100">
             <div className="px-6 py-4 bg-slate-50">
               <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Top 5 Sasaran Strategis Utama</h3>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-sm text-left">
                 <thead className="bg-white text-xs text-slate-400 border-b border-slate-100">
                   <tr>
                     <th className="px-6 py-3 font-medium">Kode</th>
                     <th className="px-6 py-3 font-medium">Nama Sasaran</th>
                     <th className="px-6 py-3 font-medium">Perspektif</th>
                     <th className="px-6 py-3 font-medium text-right">Bobot</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {MOCK_STRATEGIC_GOALS.map(goal => (
                      <tr key={goal.id} className="hover:bg-slate-50">
                        <td className="px-6 py-3 font-mono text-slate-500 text-xs">{goal.id}</td>
                        <td className="px-6 py-3 font-medium text-slate-700">{goal.name}</td>
                        <td className="px-6 py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase
                            ${goal.perspective === 'Pelanggan' ? 'bg-blue-50 text-blue-600' : ''}
                            ${goal.perspective === 'Keuangan' ? 'bg-emerald-50 text-emerald-600' : ''}
                            ${goal.perspective === 'Proses Internal' ? 'bg-amber-50 text-amber-600' : ''}
                            ${goal.perspective === 'Pembelajaran' ? 'bg-purple-50 text-purple-600' : ''}
                          `}>
                            {goal.perspective}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-right text-slate-600">{goal.weight}%</td>
                      </tr>
                    ))}
                 </tbody>
               </table>
             </div>
          </div>
        </div>

        {/* Right Column: Activity Stream */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
          <div className="p-5 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Clock size={18} className="text-slate-400" />
              Aktivitas Terakhir
            </h2>
          </div>
          <div className="p-0 flex-1 overflow-y-auto max-h-[500px]">
            <ul className="divide-y divide-slate-50">
              {MOCK_ACTIVITIES.map((activity, idx) => (
                <li key={activity.id} className="p-5 hover:bg-slate-50 transition-colors relative group">
                  <div className="flex gap-4">
                    <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center shrink-0 border 
                      ${activity.type === 'create' ? 'bg-blue-50 border-blue-100 text-blue-600' : ''}
                      ${activity.type === 'update' ? 'bg-amber-50 border-amber-100 text-amber-600' : ''}
                      ${activity.type === 'delete' ? 'bg-red-50 border-red-100 text-red-600' : ''}
                      ${activity.type === 'review' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : ''}
                    `}>
                      {activity.type === 'create' && <TrendingUp size={14} />}
                      {activity.type === 'update' && <Activity size={14} />}
                      {activity.type === 'delete' && <ShieldAlert size={14} />}
                      {activity.type === 'review' && <FileCheck size={14} />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        <span className="font-bold">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">"{activity.target}"</p>
                      <span className="text-[10px] text-slate-400 mt-2 block font-mono">{activity.time}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-xl">
             <button className="w-full py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-white border border-slate-200 hover:border-blue-200 rounded-lg transition-all shadow-sm">
               View All Audit Logs
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};