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
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const menuItems = [
    { id: 'dashboard', icon: <Home size={20} />, label: 'Home' },
    { id: 'tahun-anggaran', icon: <Calendar size={20} />, label: 'Tahun Anggaran' },
    { id: 'manage-pagu', icon: <Wallet size={20} />, label: 'Manage Pagu' },
    { id: 'manage-unit', icon: <Layers size={20} />, label: 'Manage Unit' },
    { id: 'rkakl', icon: <FileText size={20} />, label: 'RKAKL Renstra' },
    { id: 'monitoring', icon: <Activity size={20} />, label: 'Monitoring' },
    { id: 'review', icon: <CheckSquare size={20} />, label: 'Manajemen Review' },
    { id: 'manage-user', icon: <Settings size={20} />, label: 'Manage User' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col h-full flex-shrink-0 z-20">
      <div className="h-16 flex items-center px-6 border-b border-slate-100">
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
          SIMREN
        </span>
        <span className="ml-1 text-slate-400 font-medium text-sm">v2.5</span>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <div className="px-4 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Main Menu
        </div>
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors group text-left ${
                  isActive
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span className={`mr-3 ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-500'}`}>
                  {item.icon}
                </span>
                {item.label}
                {!isActive && (
                  <ChevronRight size={14} className="ml-auto text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-100">
        <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors">
          <LogOut size={20} className="mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
};