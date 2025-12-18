import React, { useState, useEffect } from 'react';
import { X, Copy, RefreshCw, ShieldCheck, Check, Info, AlertTriangle, Key } from 'lucide-react';
import { User } from '../types';

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

export const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({ isOpen, onClose, user }) => {
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Function to generate strong random password
  const generatePassword = () => {
    setIsGenerating(true);
    const chars = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%^&*";
    let pass = "";
    // Ensure we pick at least one from each category for strength
    for (let i = 0; i < 14; i++) {
      pass += chars[Math.floor(Math.random() * chars.length)];
    }
    
    setTimeout(() => {
        setPassword(pass);
        setCopied(false);
        setIsGenerating(false);
    }, 400);
  };

  useEffect(() => {
    if (isOpen) {
      generatePassword();
    }
  }, [isOpen]);

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-300">
        
        {/* Header Section */}
        <div className="relative px-6 py-8 bg-blue-600 text-white text-center">
            <div className="absolute top-4 right-4">
               <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                  <X size={20} />
               </button>
            </div>
            
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30 shadow-inner">
               <Key size={32} />
            </div>
            
            <h3 className="text-xl font-black tracking-tight mb-1">RESET KATA SANDI</h3>
            <p className="text-blue-100 text-xs font-medium uppercase tracking-[0.2em] opacity-80">Protokol Keamanan User</p>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-6">
          
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">
               {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Target User</p>
                <p className="text-sm font-bold text-slate-800 truncate">{user.name}</p>
                <p className="text-[10px] font-mono text-blue-600">ID: {user.username}</p>
            </div>
          </div>

          <div className="space-y-3">
             <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Password Baru Ter-enkripsi</label>
             <div className="relative group">
                <div className={`w-full px-4 py-4 bg-slate-900 border-2 rounded-xl font-mono text-xl tracking-widest text-emerald-400 shadow-inner transition-all flex items-center justify-center min-h-[64px] ${isGenerating ? 'opacity-50' : 'opacity-100'}`}>
                   {isGenerating ? (
                       <RefreshCw className="animate-spin text-blue-400" size={24} />
                   ) : (
                       password
                   )}
                </div>
                
                <button 
                  onClick={generatePassword}
                  disabled={isGenerating}
                  className="absolute -right-3 -top-3 p-2.5 bg-white text-slate-600 border border-slate-200 rounded-full shadow-lg hover:text-blue-600 hover:border-blue-300 transition-all active:scale-90"
                  title="Generate Ulang"
                >
                  <RefreshCw size={18} className={isGenerating ? 'animate-spin' : ''} />
                </button>
             </div>
             
             <div className="flex justify-between items-center gap-4">
                <button 
                   onClick={handleCopy}
                   className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition-all border-2 ${
                    copied 
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-500 shadow-emerald-100 shadow-inner' 
                    : 'bg-white text-slate-600 border-slate-200 hover:border-blue-500 hover:text-blue-600'
                   }`}
                >
                   {copied ? <Check size={18} /> : <Copy size={18} />}
                   {copied ? 'KODE TERSALIN!' : 'SALIN PASSWORD'}
                </button>
             </div>
          </div>

          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3">
             <AlertTriangle size={20} className="text-amber-600 shrink-0" />
             <div className="text-[11px] text-amber-800 leading-relaxed font-medium">
               <p className="font-bold mb-1 uppercase tracking-tight">Perhatian Keamanan:</p>
               Harap salin password di atas dan berikan secara aman kepada pemilik akun. Sistem tidak akan menyimpan plain-text password ini setelah jendela ditutup.
             </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-5 bg-slate-50 border-t border-slate-100 flex flex-col gap-3">
           <button 
             onClick={onClose}
             className="w-full py-3.5 bg-blue-600 text-white font-black text-sm rounded-xl shadow-xl shadow-blue-600/20 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 tracking-widest"
           >
             <ShieldCheck size={18} />
             KONFIRMASI PERUBAHAN
           </button>
           <button 
             onClick={onClose} 
             className="text-[10px] font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-colors"
           >
             Batalkan Proses
           </button>
        </div>

      </div>
    </div>
  );
};