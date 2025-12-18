import React, { useState, useMemo } from 'react';
import { User } from '../types';
import { Edit2, Key, Ban, Shield, Search, Filter, UserCheck, UserX, ChevronRight } from 'lucide-react';
import { ResetPasswordModal } from './ResetPasswordModal';

interface UserTableProps {
  data: User[];
}

export const UserTable: React.FC<UserTableProps> = ({ data }) => {
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [unitFilter, setUnitFilter] = useState('all');

  // Extract unique roles and units for filters
  const roles = useMemo(() => Array.from(new Set(data.map(u => u.role))), [data]);
  const units = useMemo(() => Array.from(new Set(data.map(u => u.unit))), [data]);

  // Filter Logic
  const filteredData = useMemo(() => {
    return data.filter(user => {
      const matchSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.nip.includes(searchQuery);
      const matchRole = roleFilter === 'all' || user.role === roleFilter;
      const matchUnit = unitFilter === 'all' || user.unit === unitFilter;
      return matchSearch && matchRole && matchUnit;
    });
  }, [data, searchQuery, roleFilter, unitFilter]);

  const handleResetClick = (user: User) => {
    setSelectedUser(user);
    setResetModalOpen(true);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      
      {/* Smart Filter Header */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
        <div className="relative flex-1">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
           <input 
             type="text" 
             placeholder="Cari Nama, NIP, atau Username..." 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
           />
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600">
                <Filter size={14} className="text-slate-400" />
                <span className="font-semibold text-xs uppercase tracking-wider">Role:</span>
                <select 
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="bg-transparent border-none p-0 focus:ring-0 cursor-pointer font-medium text-blue-600"
                >
                    <option value="all">Semua Role</option>
                    {roles.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600">
                <span className="font-semibold text-xs uppercase tracking-wider">Unit:</span>
                <select 
                  value={unitFilter}
                  onChange={(e) => setUnitFilter(e.target.value)}
                  className="bg-transparent border-none p-0 focus:ring-0 cursor-pointer font-medium text-blue-600"
                >
                    <option value="all">Semua Unit</option>
                    {units.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
            </div>

            <div className="h-8 w-px bg-slate-200 mx-1 hidden lg:block"></div>
            
            <p className="text-xs text-slate-400 font-medium">
              Menampilkan <span className="text-slate-800 font-bold">{filteredData.length}</span> User
            </p>
        </div>
      </div>

      {/* Modern Table Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-slate-50/50 text-[11px] uppercase text-slate-500 font-bold tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 w-12 text-center">No</th>
                <th className="px-6 py-4">Informasi User</th>
                <th className="px-6 py-4">NIP / Identitas</th>
                <th className="px-6 py-4">Unit Kerja</th>
                <th className="px-6 py-4">Role & Hak Akses</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right pr-8">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredData.map((user, index) => (
                <tr key={user.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-6 py-4 text-slate-300 font-mono text-center text-xs">{index + 1}</td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                        <span className="text-xs font-bold uppercase">{user.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors">{user.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">@{user.username}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-slate-600">{user.nip}</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-tight">{user.jabatan}</div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-slate-600 px-2 py-1 bg-slate-100 rounded border border-slate-200 whitespace-nowrap">
                      {user.unit}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm">
                      <Shield size={10} />
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        user.status === 'active' 
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                        : 'bg-rose-100 text-rose-700 border border-rose-200'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></div>
                        {user.status === 'active' ? 'Aktif' : 'Non-Aktif'}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end items-center gap-2">
                      <button 
                        className="p-2 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-all border border-blue-100 hover:shadow-lg hover:shadow-blue-600/20"
                        title="Edit Profil"
                      >
                        <Edit2 size={16} />
                      </button>
                      
                      <button 
                        onClick={() => handleResetClick(user)}
                        className="p-2 text-amber-500 hover:bg-amber-500 hover:text-white rounded-lg transition-all border border-amber-100 hover:shadow-lg hover:shadow-amber-500/20"
                        title="Reset Keamanan"
                      >
                        <Key size={16} />
                      </button>

                      <button 
                        className={`p-2 rounded-lg transition-all border shadow-sm ${
                          user.status === 'active' 
                          ? 'text-rose-500 border-rose-100 hover:bg-rose-500 hover:text-white hover:shadow-rose-600/20' 
                          : 'text-emerald-500 border-emerald-100 hover:bg-emerald-500 hover:text-white hover:shadow-emerald-600/20'
                        }`}
                        title={user.status === 'active' ? 'Non-Aktifkan Akun' : 'Aktifkan Akun'}
                      >
                        <Ban size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                   <td colSpan={7} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-2 text-slate-400">
                         <Search size={48} className="opacity-10 mb-2" />
                         <p className="font-bold">Tidak ada user ditemukan</p>
                         <p className="text-xs">Coba ubah filter atau kata kunci pencarian Anda</p>
                      </div>
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Custom Footer Pagination Placeholder */}
        <div className="mt-auto p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500 font-medium">
            <div>
              Menampilkan {filteredData.length} dari {data.length} entitas pengguna
            </div>
            <div className="flex items-center gap-2">
               <button className="px-3 py-1.5 border border-slate-200 rounded bg-white hover:bg-slate-100 transition-colors disabled:opacity-50" disabled>Previous</button>
               <div className="flex gap-1">
                 <button className="w-8 h-8 rounded bg-blue-600 text-white font-bold">1</button>
               </div>
               <button className="px-3 py-1.5 border border-slate-200 rounded bg-white hover:bg-slate-100 transition-colors disabled:opacity-50" disabled>Next</button>
            </div>
        </div>
      </div>

      <ResetPasswordModal 
        isOpen={resetModalOpen} 
        onClose={() => setResetModalOpen(false)}
        user={selectedUser}
      />
    </div>
  );
};