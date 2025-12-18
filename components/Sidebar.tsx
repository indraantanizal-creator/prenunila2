import React from 'react';
import { 
  Home, 
  Calendar, 
  Wallet, 
  Layers, 
  FileText, 
  Activity, 
  CheckSquare, 
  Settings, 
  LogOut,
  ChevronRight,
  Target
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const menuItems = [
    { id: 'dashboard', icon: <Home size={20} />, label: 'Home' },
    { id: 'bsc-strategic', icon: <Target size={20} />, label: 'BSC STRATEGIC' },
    { id: 'tahun-anggaran', icon: <Calendar size={20} />, label: 'Tahun Anggaran' },
    { id: 'manage-pagu', icon: <Wallet size={20} />, label: 'Manage Pagu' },
    { id: 'manage-unit', icon: <Layers size={20} />, label: 'Manage Unit' },
    { id: 'rkakl', icon: <FileText size={20} />, label: 'RKAKL Renstra' },
    { id: 'monitoring', icon: <Activity size={20} />, label: 'Monitoring' },
    { id: 'review', icon: <CheckSquare size={20} />, label: 'Manajemen Review' },
    { id: 'manage-user', icon: <Settings size={20} />, label: 'Manage User' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col h-full flex-shrink-0 z-40 shadow-xl">
      {/* Branding Section with Unila Blue Background */}
      <div className="h-24 flex flex-col justify-center px-6 bg-[#00458e] gap-2 border-b border-blue-800/30">
        <div className="h-8 w-full">
          <img 
            src="https://www.unila.ac.id/storage/2024/08/logo-header-2024-normal-1536x299.png" 
            alt="Unila Logo" 
            className="h-full w-auto object-contain drop-shadow-sm"
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-black text-white leading-none tracking-tight">
            SIMREN
          </span>
          <span className="text-[9px] bg-blue-600/50 text-blue-100 font-bold px-1.5 py-0.5 rounded border border-blue-400/30 uppercase tracking-tighter">v2.5</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6">
        <div className="px-6 mb-3 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          Menu Utama
        </div>
        <nav className="space-y-1 px-3">
          {menuItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all group text-left ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                }`}
              >
                <span className={`mr-3 transition-colors ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-500'}`}>
                  {item.icon}
                </span>
                {item.label}
                {!isActive && (
                  <ChevronRight size={14} className="ml-auto text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity translate-x-1" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="mb-4 px-2">
           <div className="p-3 bg-white rounded-xl border border-slate-200 text-center shadow-sm">
             <p className="text-[9px] font-bold text-slate-400 uppercase mb-1 tracking-widest">Motto</p>
             <p className="text-xs font-serif italic font-bold text-[#00458e]">"Be Strong!"</p>
           </div>
        </div>
        <button className="flex items-center w-full px-4 py-2.5 text-sm font-bold text-red-500 rounded-xl hover:bg-red-50 transition-all group">
          <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center mr-3 group-hover:bg-red-100 transition-colors">
            <LogOut size={18} />
          </div>
          Keluar Sistem
        </button>
      </div>
    </aside>
  );
};