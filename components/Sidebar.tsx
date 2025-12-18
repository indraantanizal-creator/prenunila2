
import React, { useState } from 'react';
import { 
  Calendar, 
  Wallet, 
  Layers, 
  FileText, 
  Activity, 
  CheckSquare, 
  Settings, 
  LogOut,
  ChevronRight,
  ChevronDown,
  Target,
  Flag,
  TrendingUp,
  LayoutDashboard,
  ShieldAlert,
  Users,
  Trophy,
  Map,
  BarChart2,
  LineChart
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const [isBscOpen, setIsBscOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMonitoringOpen, setIsMonitoringOpen] = useState(true); // Default open as requested

  const bscSubItems = [
    { id: 'visi-misi', icon: <Flag size={16} />, label: 'Visi & Misi' },
    { id: 'peta-strategis', icon: <Map size={16} />, label: 'Peta Strategis' },
    { id: 'tujuan-strategis', icon: <Target size={16} />, label: 'Tujuan Strategis' },
    { id: 'sasaran-strategis', icon: <Layers size={16} />, label: 'Sasaran Strategis (CSF)' },
    { id: 'indikator-iku', icon: <TrendingUp size={16} />, label: 'Indikator (IKU)' },
    { id: 'program-bestrong', icon: <FileText size={16} />, label: 'Program BE STRONG' },
    { id: 'manajemen-risiko', icon: <ShieldAlert size={16} />, label: 'Manajemen Risiko' },
  ];

  const monitoringSubItems = [
    { id: 'monitoring', icon: <Activity size={16} />, label: 'Dashboard Monitoring' },
    { id: 'rpd', icon: <LineChart size={16} />, label: 'Rencana Penarikan Dana' },
  ];

  const userSubItems = [
    { id: 'manage-user', icon: <Users size={16} />, label: 'Data Pengguna' },
    { id: 'manage-role', icon: <ShieldAlert size={16} />, label: 'Role & Hak Akses' },
    { id: 'stats-card', icon: <BarChart2 size={16} />, label: 'Statistik Aplikasi' },
  ];

  return (
    <aside className="w-64 bg-[#0f172a] text-slate-400 hidden md:flex flex-col h-full flex-shrink-0 z-40 shadow-2xl border-r border-slate-800">
      <div className="h-24 flex flex-col justify-center px-6 bg-[#00458e] gap-2 border-b border-blue-800/30">
        <div className="h-8 w-full">
          <img 
            src="https://www.unila.ac.id/storage/2024/08/logo-header-2024-normal-1536x299.png" 
            alt="Unila Logo" 
            className="h-full w-auto object-contain"
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-black text-white leading-none tracking-tight">SIMREN</span>
          <span className="text-[9px] bg-blue-600/50 text-blue-100 font-bold px-1.5 py-0.5 rounded border border-blue-400/30 uppercase tracking-tighter">v2.5</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 custom-scrollbar">
        <div className="px-6 mb-3 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Dashboard Utama</div>
        
        <nav className="space-y-1 px-3 mb-6">
          {/* Dashboard Anggaran */}
          <button
            onClick={() => onNavigate('dashboard')}
            className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all group text-left ${
              currentView === 'dashboard' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <span className={`mr-3 ${currentView === 'dashboard' ? 'text-white' : 'text-slate-500'}`}><LayoutDashboard size={20} /></span>
            Dashboard Anggaran
          </button>

          {/* Dashboard BSC */}
          <button
            onClick={() => onNavigate('bsc-strategic')}
            className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all group text-left ${
              currentView === 'bsc-strategic' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <span className={`mr-3 ${currentView === 'bsc-strategic' ? 'text-white' : 'text-slate-500'}`}><Trophy size={20} /></span>
            Dashboard BSC
          </button>
        </nav>

        <div className="px-6 mb-3 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Perencanaan & Monitoring</div>
        
        <nav className="space-y-1 px-3">
          {/* BSC STRATEGIC DROPDOWN */}
          <div>
            <button
              onClick={() => setIsBscOpen(!isBscOpen)}
              className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all group text-left ${
                isBscOpen || bscSubItems.some(item => item.id === currentView) ? 'text-blue-400' : 'hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <span className={`mr-3 ${isBscOpen ? 'text-blue-400' : 'text-slate-500'}`}><Target size={20} /></span>
              KONTEN STRATEGIS
              <span className="ml-auto">{isBscOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</span>
            </button>
            {isBscOpen && (
              <div className="pl-4 mt-1 space-y-1">
                {bscSubItems.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => onNavigate(sub.id)}
                    className={`flex items-center w-full px-4 py-2 text-xs font-medium rounded-lg transition-all text-left ${
                      currentView === sub.id ? 'text-blue-400 bg-blue-400/10' : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    <span className="mr-3">{sub.icon}</span>
                    {sub.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => onNavigate('tahun-anggaran')}
            className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all group text-left ${
              currentView === 'tahun-anggaran' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <span className={`mr-3 ${currentView === 'tahun-anggaran' ? 'text-white' : 'text-slate-500'}`}><Calendar size={20} /></span>
            Tahun Anggaran
          </button>

          <button
            onClick={() => onNavigate('manage-pagu')}
            className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all group text-left ${
              currentView === 'manage-pagu' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <span className={`mr-3 ${currentView === 'manage-pagu' ? 'text-white' : 'text-slate-500'}`}><Wallet size={20} /></span>
            Manage Pagu
          </button>

          <button
            onClick={() => onNavigate('manage-unit')}
            className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all group text-left ${
              currentView === 'manage-unit' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <span className={`mr-3 ${currentView === 'manage-unit' ? 'text-white' : 'text-slate-500'}`}><Layers size={20} /></span>
            Manage Unit
          </button>

          <button
            onClick={() => onNavigate('rkakl')}
            className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all group text-left ${
              currentView === 'rkakl' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <span className={`mr-3 ${currentView === 'rkakl' ? 'text-white' : 'text-slate-500'}`}><FileText size={20} /></span>
            RKAKL Renstra
          </button>

          {/* MONITORING DROPDOWN (UPDATED) */}
          <div>
            <button
              onClick={() => setIsMonitoringOpen(!isMonitoringOpen)}
              className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all group text-left ${
                isMonitoringOpen || monitoringSubItems.some(item => item.id === currentView) ? 'text-blue-400' : 'hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <span className={`mr-3 ${isMonitoringOpen ? 'text-blue-400' : 'text-slate-500'}`}><Activity size={20} /></span>
              MONITORING
              <span className="ml-auto">{isMonitoringOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</span>
            </button>
            {isMonitoringOpen && (
              <div className="pl-4 mt-1 space-y-1">
                {monitoringSubItems.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => onNavigate(sub.id)}
                    className={`flex items-center w-full px-4 py-2 text-xs font-medium rounded-lg transition-all text-left ${
                      currentView === sub.id ? 'text-blue-400 bg-blue-400/10' : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    <span className="mr-3">{sub.icon}</span>
                    {sub.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => onNavigate('review')}
            className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all group text-left ${
              currentView === 'review' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <span className={`mr-3 ${currentView === 'review' ? 'text-white' : 'text-slate-500'}`}><CheckSquare size={20} /></span>
            Manajemen Review
          </button>

          {/* MANAGE USER DROPDOWN */}
          <div>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all group text-left ${
                isUserMenuOpen || userSubItems.some(item => item.id === currentView) ? 'text-blue-400' : 'hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <span className={`mr-3 ${isUserMenuOpen ? 'text-blue-400' : 'text-slate-500'}`}><Settings size={20} /></span>
              MANAGE USER
              <span className="ml-auto">{isUserMenuOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</span>
            </button>
            {isUserMenuOpen && (
              <div className="pl-4 mt-1 space-y-1">
                {userSubItems.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => onNavigate(sub.id)}
                    className={`flex items-center w-full px-4 py-2 text-xs font-medium rounded-lg transition-all text-left ${
                      currentView === sub.id ? 'text-blue-400 bg-blue-400/10' : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    <span className="mr-3">{sub.icon}</span>
                    {sub.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <button className="flex items-center w-full px-4 py-2.5 text-sm font-bold text-slate-400 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all group">
          <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center mr-3 group-hover:bg-red-500/20 group-hover:text-red-400"><LogOut size={18} /></div>
          Keluar Sistem
        </button>
      </div>
    </aside>
  );
};
