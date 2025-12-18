import React from 'react';
import { Bell, Search, User } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="h-16 bg-[#00458e] border-b border-blue-800/30 flex items-center justify-between px-6 sticky top-0 z-30 shadow-md">
      <div className="flex items-center gap-4 h-full">
        {/* Unila New Banner Logo - Now Visible with Blue Background */}
        <div className="flex items-center group cursor-pointer h-full py-2">
            <div className="h-full max-w-[280px] transition-transform duration-300 group-hover:scale-[1.02]">
             <img 
              src="https://www.unila.ac.id/storage/2024/08/logo-header-2024-normal-1536x299.png" 
              alt="Logo Universitas Lampung" 
              className="h-full w-auto object-contain"
             />
            </div>
            
            <div className="h-8 w-px bg-blue-700/50 mx-4 hidden lg:block"></div>
            
            <div className="hidden xl:block">
                <span className="text-[10px] font-bold text-blue-100 uppercase tracking-[0.2em] opacity-80">Sistem Informasi Perencanaan</span>
                <div className="flex items-center gap-2 text-white">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="text-xs font-semibold">Integrity & Excellence</span>
                </div>
            </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-200/60" size={16} />
          <input 
            type="text" 
            placeholder="Cari Unit Kerja..." 
            className="pl-10 pr-4 py-2 bg-blue-900/30 border border-blue-700/50 rounded-full text-sm text-white placeholder:text-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-blue-900/50 transition-all w-64 shadow-inner"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <button className="relative p-2 text-blue-100 hover:bg-blue-700/50 rounded-full transition-colors">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#00458e]"></span>
          </button>
          
          <div className="h-8 w-px bg-blue-700/50 mx-1"></div>
          
          <div className="flex items-center gap-3 pl-2 cursor-pointer group">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-white group-hover:text-blue-100 transition-colors">Admin BPHM</p>
              <p className="text-[10px] text-blue-200/70 font-medium">Super Administrator</p>
            </div>
            <div className="w-9 h-9 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center text-white shadow-lg transition-all overflow-hidden">
               <User size={18} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};