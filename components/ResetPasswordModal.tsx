import React, { useState } from 'react';
import { X, Copy, RefreshCw, Key, Check } from 'lucide-react';
import { User } from '../types';

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

export const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({ isOpen, onClose, user }) => {
  const [mode, setMode] = useState<'random' | 'manual'>('random');
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  // Generate a random password on mount or mode switch
  const generatePassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let pass = "";
    for (let i = 0; i < 12; i++) {
      pass += chars[Math.floor(Math.random() * chars.length)];
    }
    setPassword(pass);
    setCopied(false);
  };

  React.useEffect(() => {
    if (isOpen && mode === 'random') {
      generatePassword();
    } else if (isOpen) {
      setPassword('');
      setCopied(false);
    }
  }, [isOpen, mode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Key size={18} className="text-amber-500" />
              Reset Password
            </h3>
            <p className="text-xs text-slate-500">User: <span className="font-mono font-semibold text-slate-700">{user.username}</span></p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          
          {/* Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button 
              onClick={() => setMode('random')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${mode === 'random' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Generate Random
            </button>
            <button 
              onClick={() => setMode('manual')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${mode === 'manual' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Input Manual
            </button>
          </div>

          <div className="space-y-4">
             <div className="relative">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Password Baru</label>
                <div className="relative group">
                    <input 
                      type="text" 
                      value={password}
                      readOnly={mode === 'random'}
                      onChange={(e) => {
                        setMode('manual');
                        setPassword(e.target.value);
                      }}
                      className={`w-full pl-4 pr-12 py-3 bg-slate-50 border rounded-lg font-mono text-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${mode === 'random' ? 'border-slate-200' : 'border-blue-200 bg-white focus:border-blue-500'}`}
                    />
                    
                    {mode === 'random' && (
                      <button 
                        onClick={generatePassword}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        title="Regenerate"
                      >
                        <RefreshCw size={16} />
                      </button>
                    )}
                </div>
             </div>

             {/* Helper/Copy Area */}
             <div className="flex items-center justify-between">
                {mode === 'random' ? (
                   <p className="text-xs text-slate-400">Password otomatis dibuat sistem.</p>
                ) : (
                   <p className="text-xs text-slate-400">Pastikan password minimal 8 karakter.</p>
                )}
                
                {password && (
                  <button 
                    onClick={handleCopy}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      copied 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                    }`}
                  >
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    {copied ? 'Tersalin!' : 'Copy to Clipboard'}
                  </button>
                )}
             </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 flex justify-end gap-3 border-t border-slate-100">
           <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-white border border-transparent hover:border-slate-200 rounded-lg transition-all">
             Batal
           </button>
           <button className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md shadow-blue-600/20">
             Simpan Password
           </button>
        </div>

      </div>
    </div>
  );
};