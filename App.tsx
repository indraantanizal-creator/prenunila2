import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { StatsCard } from './components/StatsCard';
import { BudgetChart } from './components/BudgetChart';
import { BudgetTable } from './components/BudgetTable';
import { RKAKLTable } from './components/RKAKLTable';
import { UserTable } from './components/UserTable'; // Import UserTable
import { BudgetFormModal } from './components/BudgetFormModal';
import { MOCK_DATA, MOCK_RKAKL_DATA, MOCK_USERS } from './constants';
import { DollarSign, FileInput, PieChart, Activity, Plus, Table2, LayoutDashboard, UserPlus } from 'lucide-react';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Default view is dashboard, but can be 'rkakl' or 'manage-user'
  const [currentView, setCurrentView] = useState<string>('dashboard');
  
  const totalPagu = "428.2 M";
  const totalUsulan = "428.2 M";

  const renderContent = () => {
    switch(currentView) {
      case 'manage-user':
        return <UserTable data={MOCK_USERS} />;
      case 'rkakl':
        return (
           <div className="h-[calc(100vh-180px)]">
             <RKAKLTable data={MOCK_RKAKL_DATA} />
           </div>
        );
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
    switch(currentView) {
      case 'manage-user': return 'Manajemen User';
      case 'rkakl': return 'Input RKAKL';
      default: return 'Dashboard Anggaran';
    }
  };
  
  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden">
      <Sidebar currentView={currentView} onNavigate={setCurrentView} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">{getPageTitle()}</h1>
                    <p className="text-slate-500 mt-1">Tahun Anggaran 2025</p>
                </div>
                <div className="flex items-center gap-3">
                    {/* View Switcher for Demo Purposes (Optional since we have Sidebar now) */}
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
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm shadow-md shadow-blue-600/20 flex items-center gap-2 transition-all active:scale-95"
                        >
                        <Plus size={18} />
                        Tambah Pagu
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

            {/* Content Render */}
            {renderContent()}

          </div>
        </main>
      </div>

      {/* Render Modal */}
      <BudgetFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;