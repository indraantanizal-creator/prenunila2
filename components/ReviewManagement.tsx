
import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Search, 
  Filter, 
  ArrowRight,
  FileText,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  CheckSquare,
  MessageSquare
} from 'lucide-react';
import { UnitData } from '../types';
import { formatCurrency, MOCK_DATA } from '../constants';

// Extended type for local UI state
interface ReviewItem extends UnitData {
  status: 'approved' | 'pending' | 'revision' | 'rejected';
  lastUpdated: string;
  notes?: string;
}

export const ReviewManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Enriching MOCK_DATA with review-specific statuses for demonstration
  const [reviewData, setReviewData] = useState<ReviewItem[]>(() => 
    MOCK_DATA.map((item, index) => ({
      ...item,
      // Simulating diverse statuses for UI demonstration
      status: index === 0 || index === 3 ? 'approved' 
            : index === 2 ? 'revision' 
            : index === 5 ? 'rejected'
            : 'pending',
      lastUpdated: '2 jam yang lalu',
      notes: index === 2 ? 'Perlu rasionalisasi belanja modal' : undefined
    }))
  );

  // Computed Stats
  const stats = useMemo(() => {
    const totalUsulan = reviewData.reduce((acc, curr) => acc + curr.usulan, 0);
    const totalReview = reviewData.reduce((acc, curr) => acc + curr.review, 0);
    const approvedCount = reviewData.filter(i => i.status === 'approved').length;
    const pendingCount = reviewData.filter(i => i.status === 'pending').length;
    
    return { totalUsulan, totalReview, approvedCount, pendingCount };
  }, [reviewData]);

  const filteredData = useMemo(() => {
    return reviewData.filter(item => {
      const matchSearch = item.unitName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.unitCode.toLowerCase().includes(searchQuery.toLowerCase());
      const matchFilter = statusFilter === 'all' || item.status === statusFilter;
      return matchSearch && matchFilter;
    });
  }, [reviewData, searchQuery, statusFilter]);

  const handleStatusChange = (id: number, newStatus: ReviewItem['status']) => {
    setReviewData(prev => prev.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-700 border border-emerald-200"><CheckCircle2 size={12} /> Disetujui</span>;
      case 'revision':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-amber-100 text-amber-700 border border-amber-200"><AlertCircle size={12} /> Revisi</span>;
      case 'rejected':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-rose-100 text-rose-700 border border-rose-200"><XCircle size={12} /> Ditolak</span>;
      default:
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-slate-100 text-slate-500 border border-slate-200"><FileText size={12} /> Menunggu</span>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Top Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Usulan Masuk</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-800">Rp {formatCurrency(stats.totalUsulan)}</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-500">
              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold">{reviewData.length} Unit</span>
              <span>Telah Mengirim Usulan</span>
            </div>
          </div>
          <div className="absolute right-0 top-0 p-6 opacity-5">
            <FileText size={80} className="text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
           <div className="relative z-10">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Hasil Review Sementara</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-emerald-600">Rp {formatCurrency(stats.totalReview)}</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-500">
               {stats.totalReview < stats.totalUsulan ? (
                 <span className="flex items-center gap-1 text-emerald-600 font-bold"><TrendingDown size={14} /> Efisiensi {(100 - (stats.totalReview/stats.totalUsulan*100)).toFixed(1)}%</span>
               ) : (
                 <span className="flex items-center gap-1 text-rose-500 font-bold"><TrendingUp size={14} /> Kenaikan</span>
               )}
               <span>dari Usulan Awal</span>
            </div>
           </div>
           <div className="absolute right-0 top-0 p-6 opacity-5">
            <CheckSquare size={80} className="text-emerald-600" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden">
           <div className="relative z-10">
              <h3 className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-4">Progress Approval</h3>
              <div className="flex justify-between items-end mb-2">
                 <span className="text-3xl font-black">{stats.approvedCount} / {reviewData.length}</span>
                 <span className="text-sm font-medium opacity-80">Unit Selesai</span>
              </div>
              <div className="w-full bg-black/20 h-2 rounded-full overflow-hidden">
                 <div 
                   className="h-full bg-emerald-400 transition-all duration-1000" 
                   style={{ width: `${(stats.approvedCount / reviewData.length) * 100}%` }}
                 ></div>
              </div>
              <p className="mt-4 text-[11px] font-medium opacity-80">
                {stats.pendingCount} Unit masih menunggu review anda.
              </p>
           </div>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Filter Unit Kerja..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
             <Filter size={18} className="text-slate-400" />
             <select 
               value={statusFilter}
               onChange={(e) => setStatusFilter(e.target.value)}
               className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 font-semibold cursor-pointer outline-none"
             >
               <option value="all">Semua Status</option>
               <option value="pending">Menunggu Review</option>
               <option value="approved">Disetujui</option>
               <option value="revision">Perlu Revisi</option>
               <option value="rejected">Ditolak</option>
             </select>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto justify-end">
           <button className="px-4 py-2.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all flex items-center gap-2">
              <FileText size={16} />
              Export Laporan
           </button>
           <button className="px-6 py-2.5 text-xs font-black text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2 uppercase tracking-wide">
              <CheckCircle2 size={16} />
              Approve Terpilih
           </button>
        </div>
      </div>

      {/* Main Review Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100">
               <tr className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                 <th className="px-6 py-4 w-12 text-center">No</th>
                 <th className="px-6 py-4">Unit Kerja</th>
                 <th className="px-6 py-4 text-right">Pagu Indikatif</th>
                 <th className="px-6 py-4 text-right">Usulan Unit</th>
                 <th className="px-6 py-4 text-right">Hasil Review</th>
                 <th className="px-6 py-4 text-center">Status</th>
                 <th className="px-6 py-4 text-center">Aksi Cepat</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredData.map((item, index) => {
                 const percentage = (item.review / item.pagu) * 100;
                 const isOver = item.usulan > item.pagu;

                 return (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 text-center font-mono text-xs text-slate-400">{index + 1}</td>
                    <td className="px-6 py-4">
                       <div className="font-bold text-slate-800">{item.unitCode}</div>
                       <div className="text-xs text-slate-500">{item.unitName}</div>
                       {item.notes && (
                         <div className="mt-1 flex items-center gap-1.5 text-[10px] font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded w-fit">
                           <MessageSquare size={10} />
                           {item.notes}
                         </div>
                       )}
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="font-mono text-xs font-bold text-slate-500">
                          {formatCurrency(item.pagu)}
                       </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className={`font-mono text-sm font-bold ${isOver ? 'text-rose-500' : 'text-slate-700'}`}>
                          {formatCurrency(item.usulan)}
                       </div>
                       {isOver && (
                         <div className="text-[9px] font-bold text-rose-500 mt-0.5">Over Budget</div>
                       )}
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="font-mono text-sm font-bold text-blue-600">
                          {formatCurrency(item.review)}
                       </div>
                       <div className="flex justify-end items-center gap-1 mt-1">
                          <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                             <div className={`h-full ${percentage > 100 ? 'bg-rose-500' : 'bg-blue-500'}`} style={{ width: `${Math.min(percentage, 100)}%` }}></div>
                          </div>
                          <span className="text-[9px] font-medium text-slate-400">{percentage.toFixed(0)}%</span>
                       </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                       {getStatusBadge(item.status)}
                       <div className="text-[9px] text-slate-400 mt-1 font-medium">{item.lastUpdated}</div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex justify-center items-center gap-2">
                          <button 
                            onClick={() => handleStatusChange(item.id, 'approved')}
                            className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 border border-transparent hover:border-emerald-100 transition-all" 
                            title="Setujui"
                          >
                             <CheckCircle2 size={18} />
                          </button>
                          <button 
                            onClick={() => handleStatusChange(item.id, 'revision')}
                            className="p-1.5 rounded-lg text-amber-500 hover:bg-amber-50 border border-transparent hover:border-amber-100 transition-all" 
                            title="Minta Revisi"
                          >
                             <AlertCircle size={18} />
                          </button>
                          <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-blue-600 transition-all">
                             <ArrowRight size={18} />
                          </button>
                       </div>
                    </td>
                  </tr>
                 );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
