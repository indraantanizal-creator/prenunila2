
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { StatsCard } from './components/StatsCard';
import { BudgetChart } from './components/BudgetChart';
import { BudgetTable } from './components/BudgetTable';
import { RKAKLTable } from './components/RKAKLTable';
import { UserTable } from './components/UserTable';
import { BSCStrategic } from './components/BSCStrategic'; 
import { VisiMisi } from './components/VisiMisi';
import { TujuanStrategis } from './components/TujuanStrategis';
import { SasaranStrategis } from './components/SasaranStrategis';
import { IndikatorIKU } from './components/IndikatorIKU';
import { RiskManagement } from './components/RiskManagement'; 
import { StrategyMap } from './components/StrategyMap'; 
import { AppStatistics } from './components/AppStatistics'; 
import { RPDManagement } from './components/RPDManagement'; // New Import
import { BudgetFormModal } from './components/BudgetFormModal';
import { RoleMatrix } from './components/RoleMatrix';
import { UnitManagement } from './components/UnitManagement';
import { PaguManagement } from './components/PaguManagement';
import { TahunAnggaran } from './components/TahunAnggaran';
import { ReviewManagement } from './components/ReviewManagement';
import { MonitoringDashboard } from './components/MonitoringDashboard';
import { BeStrongProgram } from './components/BeStrongProgram';
import { MOCK_DATA, MOCK_RKAKL_DATA, MOCK_USERS } from './constants';
import { DollarSign, FileInput, PieChart, Activity, Plus, Table2, UserPlus, Target, ShieldCheck, Building2, Calendar, CheckSquare, RefreshCw, Wallet, Map } from 'lucide-react';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<string>('dashboard');
  
  const totalPagu = "428.2 M";
  const totalUsulan = "428.2 M";

  const isBscView = [
    'bsc-strategic', 
    'visi-misi', 
    'tujuan-strategis', 
    'sasaran-strategis', 
    'indikator-iku', 
    'program-bestrong',
    'manajemen-risiko',
    'peta-strategis'
  ].includes(currentView);

  const renderContent = () => {
    switch(currentView) {
      case 'manage-user':
        return <UserTable data={MOCK_USERS} />;
      case 'manage-role':
        return <RoleMatrix />;
      case 'stats-card': 
        return <AppStatistics />;
      case 'manage-unit':
        return <UnitManagement />;
      case 'manage-pagu':
        return <PaguManagement />;
      case 'tahun-anggaran':
        return <TahunAnggaran />;
      case 'review':
        return <ReviewManagement />;
      case 'monitoring':
        return <MonitoringDashboard />;
      case 'rpd': // New Case
        return <RPDManagement />;
      case 'rkakl':
        return (
           <div className="h-[calc(100vh-180px)]">
             <RKAKLTable data={MOCK_RKAKL_DATA} />
           </div>
        );
      case 'visi-misi':
        return <VisiMisi />;
      case 'tujuan-strategis':
        return <TujuanStrategis />;
      case 'sasaran-strategis':
        return <SasaranStrategis />;
      case 'indikator-iku':
        return <IndikatorIKU />; 
      case 'program-bestrong':
        return <BeStrongProgram />;
      case 'manajemen-risiko':
        return <RiskManagement />;
      case 'peta-strategis': 
        return <StrategyMap />;
      case 'bsc-strategic':
        return <BSCStrategic />;
      case 'dashboard':
      default:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard title="Total Pagu" value={`Rp ${totalPagu}`} icon={<DollarSign />} colorClass="bg-blue-500" trend="+12% vs 2024" />
              <StatsCard title="Total Usulan" value={`Rp ${totalUsulan}`} icon={<FileInput />} colorClass="bg-indigo-500" trend="100% Terkirim" />
              <StatsCard title="Progress Review" value="100%" icon={<PieChart />} colorClass="bg-emerald-500" trend="Completed" />
              <StatsCard title="Status Sistem" value="Active" icon={<Activity />} colorClass="bg-amber-500" trend="Online" />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-auto xl:h-[600px]">
              <div className="xl:col-span-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <BudgetChart data={MOCK_DATA} />
              </div>
              <div className="xl:col-span-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col h-[600px] xl:h-auto">
                <BudgetTable data={MOCK_DATA} />
              </div>
            </div>
          </>
        );
    }
  };

  const getPageTitle = () => {
    if (currentView === 'manage-user') return 'Manajemen User';
    if (currentView === 'manage-role') return 'Konfigurasi Role & Hak Akses';
    if (currentView === 'stats-card') return 'Statistik Aplikasi';
    if (currentView === 'manage-unit') return 'Manajemen Struktur Unit Kerja';
    if (currentView === 'manage-pagu') return 'Alokasi Pagu Anggaran';
    if (currentView === 'tahun-anggaran') return 'Pengaturan Tahun Anggaran';
    if (currentView === 'review') return 'Manajemen Review Usulan';
    if (currentView === 'monitoring') return 'Monitoring & Evaluasi Terpadu';
    if (currentView === 'rpd') return 'Rencana Penarikan Dana (RPD)'; // New Title
    if (currentView === 'rkakl') return 'Input RKAKL';
    if (isBscView) {
      const titles: Record<string, string> = {
        'visi-misi': 'Visi & Misi Universitas',
        'tujuan-strategis': 'Tujuan Strategis (Renstra)',
        'sasaran-strategis': 'Sasaran Strategis (CSF)',
        'indikator-iku': 'Indikator Kinerja Utama (IKU)',
        'program-bestrong': 'Program Kerja BE STRONG',
        'manajemen-risiko': 'Manajemen Risiko Strategis',
        'peta-strategis': 'Peta Strategis (Strategy Map)',
        'bsc-strategic': 'Dashboard BSC Strategic'
      };
      return titles[currentView] || 'Dashboard BSC';
    }
    return 'Dashboard Anggaran';
  };
  
  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden">
      <Sidebar currentView={currentView} onNavigate={setCurrentView} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className={`flex-1 overflow-y-auto p-6 scroll-smooth ${isBscView ? 'bg-[#0f172a]' : ''}`}>
          <div className="max-w-7xl mx-auto space-y-6">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div className={isBscView && currentView === 'bsc-strategic' ? 'hidden' : ''}>
                    <h1 className={`text-2xl font-bold ${isBscView ? 'text-white' : 'text-slate-900'}`}>{getPageTitle()}</h1>
                    <p className="text-slate-500 mt-1">Tahun Anggaran 2025</p>
                </div>
                <div className="flex items-center gap-3 ml-auto">
                    {currentView === 'dashboard' && (
                       <button 
                         onClick={() => setCurrentView('rkakl')}
                         className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm"
                       >
                         <Table2 size={16} />
                         View RKAKL
                       </button>
                    )}

                    <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block"></div>

                    <div className="bg-white text-blue-800 px-4 py-2 rounded-lg font-bold text-sm shadow-sm border border-slate-200">
                        TAHUN 2025
                    </div>
                    
                    {currentView === 'dashboard' && (
                        <button 
                          onClick={() => setIsModalOpen(true)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all active:scale-95 hover:translate-y-[-1px]"
                        >
                          <Plus size={20} className="stroke-[3px]" />
                          Tambah Pagu
                        </button>
                    )}

                    {currentView === 'manage-pagu' && (
                        <button 
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg shadow-indigo-600/20 flex items-center gap-2 transition-all active:scale-95"
                        >
                          <Wallet size={18} />
                          Simpan Distribusi
                        </button>
                    )}

                    {currentView === 'review' && (
                        <button 
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition-all active:scale-95"
                        >
                          <CheckSquare size={18} />
                          Finalisasi Semua Review
                        </button>
                    )}

                    {currentView === 'monitoring' && (
                        <button 
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg shadow-indigo-600/20 flex items-center gap-2 transition-all active:scale-95"
                        >
                          <RefreshCw size={18} />
                          Refresh Data Live
                        </button>
                    )}

                    {currentView === 'tahun-anggaran' && (
                        <button 
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg shadow-indigo-600/20 flex items-center gap-2 transition-all active:scale-95"
                        >
                          <Calendar size={18} />
                          Salin Data TA Sebelumnya
                        </button>
                    )}

                    {currentView === 'manage-role' && (
                        <button 
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition-all active:scale-95"
                        >
                          <ShieldCheck size={18} />
                          Simpan Konfigurasi RBAC
                        </button>
                    )}

                    {currentView === 'manage-unit' && (
                        <button 
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg shadow-indigo-600/20 flex items-center gap-2 transition-all active:scale-95"
                        >
                          <Building2 size={18} />
                          Sinkronisasi Unit (SIAKAD)
                        </button>
                    )}
                    
                    {isBscView && (
                        <button 
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm shadow-md shadow-blue-600/20 flex items-center gap-2 transition-all active:scale-95"
                        >
                          <Target size={18} />
                          Update Data
                        </button>
                    )}

                    {currentView === 'manage-user' && (
                        <button 
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm shadow-md shadow-blue-600/20 flex items-center gap-2 transition-all active:scale-95"
                        >
                          <UserPlus size={18} />
                          Add New User
                        </button>
                    )}
                </div>
            </div>

            {renderContent()}

          </div>
        </main>
      </div>

      <BudgetFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default App;
