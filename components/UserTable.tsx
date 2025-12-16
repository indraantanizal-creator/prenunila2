import React, { useState } from 'react';
import { User } from '../types';
import { Edit2, Key, Trash2, Shield, Search } from 'lucide-react';
import { ResetPasswordModal } from './ResetPasswordModal';

interface UserTableProps {
  data: User[];
}

export const UserTable: React.FC<UserTableProps> = ({ data }) => {
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleResetClick = (user: User) => {
    setSelectedUser(user);
    setResetModalOpen(true);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      
      {/* Toolbar */}
      <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50">
        <div>
           <h2 className="text-lg font-bold text-slate-800">Manajemen User</h2>
           <p className="text-sm text-slate-500">Kelola akun pengguna dan hak akses sistem</p>
        </div>
        <div className="relative">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
           <input 
             type="text" 
             placeholder="Cari user..." 
             className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none w-64 shadow-sm"
           />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 sticky top-0 z-10 shadow-sm text-xs uppercase text-slate-500 font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4 w-12">No</th>
              <th className="px-6 py-4">User Info</th>
              <th className="px-6 py-4">NIP</th>
              <th className="px-6 py-4">Unit Kerja</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {data.map((user, index) => (
              <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4 text-slate-400 font-medium">{index + 1}</td>
                
                <td className="px-6 py-4">
                  <div>
                    <div className="font-bold text-slate-800">{user.username}</div>
                    <div className="text-xs text-slate-500">{user.name}</div>
                  </div>
                </td>

                <td className="px-6 py-4 font-mono text-sm text-slate-600">
                  {user.nip}
                </td>

                <td className="px-6 py-4 text-sm text-slate-700">
                  {user.unit}
                </td>

                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                    <Shield size={10} />
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold capitalize ${
                    user.status === 'active' 
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                    : 'bg-slate-100 text-slate-500 border border-slate-200'
                  }`}>
                    {user.status}
                  </span>
                </td>

                {/* Quick Actions */}
                <td className="px-6 py-4">
                  <div className="flex justify-end items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button 
                      className="p-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
                      title="Edit User"
                    >
                      <Edit2 size={16} />
                    </button>
                    
                    <button 
                      onClick={() => handleResetClick(user)}
                      className="p-1.5 text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-lg border border-amber-200 transition-colors"
                      title="Reset Password"
                    >
                      <Key size={16} />
                    </button>

                    <button 
                      className="p-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors"
                      title={user.status === 'active' ? 'Non-Aktifkan' : 'Aktifkan'}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ResetPasswordModal 
        isOpen={resetModalOpen} 
        onClose={() => setResetModalOpen(false)}
        user={selectedUser}
      />
    </div>
  );
};