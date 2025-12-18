import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle, CheckCircle2, Info, Landmark, Calculator } from 'lucide-react';
import { formatRupiah, terbilang } from '../utils/formatters';

interface BudgetFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BudgetFormModal: React.FC<BudgetFormModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    tahun: '2025',
    unit: '',
    uraian: '',
    paguDisplay: '', 
    paguValue: 0,   
  });

  const [terbilangText, setTerbilangText] = useState('');
  const [isTouched, setIsTouched] = useState<Record<string, boolean>>({});

  // Reset state saat modal dibuka
  useEffect(() => {
    if (isOpen) {
      setFormData({
        tahun: '2025',
        unit: '',
        uraian: '',
        paguDisplay: '',
        paguValue: 0,
      });
      setTerbilangText('');
      setIsTouched({});
    }
  }, [isOpen]);

  // Modal tidak dirender jika isOpen false (Fitur Hidden by Default)
  if (!isOpen) return null;

  const handlePaguChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const numericString = val.replace(/[^0-9]/g, '');
    const numberVal = parseInt(numericString, 10) || 0;

    // Smart Currency Input: Rp + Pemisah Ribuan
    const formatted = formatRupiah(numericString);

    setFormData(prev => ({
      ...prev,
      paguDisplay: formatted,
      paguValue: numberVal
    }));

    // Fitur Terbilang Otomatis
    if (numberVal > 0) {
        setTerbilangText(terbilang(numberVal));
    } else {
        setTerbilangText('');
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: string) => {
    setIsTouched(prev => ({ ...prev, [field]: true }));
  };

  // Logic Validasi Visual
  const isPaguInvalid = isTouched.paguDisplay && formData.paguValue <= 0;
  const isUnitInvalid = isTouched.unit && !formData.unit;
  const isUraianInvalid = isTouched.uraian && formData.uraian.length < 5;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md transition-all duration-300">
      {/* Container Modal dengan Animasi Zoom & Fade */}
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 fade-in duration-300">
        
        {/* Header Modal */}
        <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center bg-white relative">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-600/30">
               <Calculator size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-none mb-1">INPUT PAGU ANGGARAN</h2>
              <p className="text-sm text-slate-500 font-medium">Lengkapi rincian finansial untuk usulan tahun anggaran 2025</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-3 text-slate-400 hover:bg-slate-100 hover:text-slate-800 rounded-full transition-all active:scale-90"
          >
            <X size={28} />
          </button>
        </div>

        {/* Layout 2 Kolom: Kiri (Info) | Kanan (Nominal) */}
        <div className="flex-1 overflow-y-auto flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            
            {/* Kolom Kiri: Informasi Program/Kegiatan */}
            <div className="lg:w-[55%] p-10 space-y-8 bg-slate-50/40">
                <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black rounded-full uppercase tracking-tighter">Langkah 01</span>
                    <h3 className="font-bold text-slate-800 uppercase tracking-widest text-sm">Informasi Pelaksana</h3>
                </div>

                <div className="space-y-7">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Tahun Anggaran</label>
                            <div className="relative">
                                <Landmark className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <select 
                                    value={formData.tahun}
                                    onChange={(e) => handleChange('tahun', e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-200 rounded-2xl text-slate-700 font-bold focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm"
                                >
                                    <option value="2025">TA 2025</option>
                                    <option value="2024">TA 2024</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-2 text-right">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Ref. ID</label>
                            <div className="px-4 py-4 bg-slate-100 border-2 border-slate-200 rounded-2xl text-slate-400 font-mono text-sm text-center">
                                PR-2025-0822
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${isUnitInvalid ? 'text-rose-500' : 'text-slate-400'}`}>
                            Unit Kerja Pelaksana <span className="text-rose-500">*</span>
                        </label>
                        <select 
                            value={formData.unit}
                            onChange={(e) => handleChange('unit', e.target.value)}
                            onBlur={() => handleBlur('unit')}
                            className={`w-full px-5 py-4 border-2 rounded-2xl text-sm font-bold transition-all outline-none ${
                                isUnitInvalid 
                                ? 'bg-rose-50 border-rose-300 text-rose-900' 
                                : 'bg-white border-slate-200 text-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 shadow-sm'
                            }`}
                        >
                            <option value="">-- Pilih Unit Kerja --</option>
                            <option value="FEB">Fakultas Ekonomi & Bisnis</option>
                            <option value="FH">Fakultas Hukum</option>
                            <option value="FKIP">Fakultas Keguruan</option>
                            <option value="FT">Fakultas Teknik</option>
                            <option value="BPKHM">Biro Perencanaan</option>
                        </select>
                        {isUnitInvalid && (
                            <div className="mt-2 flex items-center gap-1.5 text-rose-600 animate-in fade-in slide-in-from-top-1">
                                <AlertCircle size={14} />
                                <span className="text-[10px] font-bold">Wajib memilih unit kerja</span>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${isUraianInvalid ? 'text-rose-500' : 'text-slate-400'}`}>
                            Uraian / Deskripsi Pagu <span className="text-rose-500">*</span>
                        </label>
                        <textarea 
                            value={formData.uraian}
                            onChange={(e) => handleChange('uraian', e.target.value)}
                            onBlur={() => handleBlur('uraian')}
                            rows={6}
                            placeholder="Deskripsikan rincian usulan anggaran secara detail..."
                            className={`w-full px-5 py-4 border-2 rounded-2xl text-sm font-medium leading-relaxed transition-all outline-none resize-none ${
                                isUraianInvalid 
                                ? 'bg-rose-50 border-rose-300 text-rose-900 placeholder:text-rose-300' 
                                : 'bg-white border-slate-200 text-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 shadow-sm'
                            }`}
                        ></textarea>
                    </div>
                </div>
            </div>

            {/* Kolom Kanan: Nominal Anggaran */}
            <div className="lg:w-[45%] p-10 space-y-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-8">
                      <span className="px-3 py-1 bg-emerald-600 text-white text-[10px] font-black rounded-full uppercase tracking-tighter">Langkah 02</span>
                      <h3 className="font-bold text-slate-800 uppercase tracking-widest text-sm">Nominal Finansial</h3>
                  </div>

                  <div className={`p-8 rounded-[2.5rem] border-2 transition-all duration-500 ${isPaguInvalid ? 'bg-rose-50 border-rose-200 shadow-xl shadow-rose-100' : 'bg-slate-50 border-slate-100'}`}>
                      <label className={`block text-[10px] font-black uppercase tracking-[0.4em] mb-6 text-center ${isPaguInvalid ? 'text-rose-500' : 'text-slate-500'}`}>
                          Jumlah Alokasi (PAGU)
                      </label>
                      
                      {/* Smart Input: Rp + Bold + Large Text */}
                      <div className="relative mb-8">
                          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-slate-400 select-none">Rp</div>
                          <input 
                              type="text"
                              value={formData.paguDisplay}
                              onChange={handlePaguChange}
                              onBlur={() => handleBlur('paguDisplay')}
                              placeholder="0"
                              className={`w-full pl-20 pr-8 py-7 rounded-3xl text-4xl font-black font-mono shadow-inner transition-all outline-none text-right tracking-tighter ${
                                  isPaguInvalid 
                                  ? 'bg-white border-rose-300 text-rose-600 focus:ring-rose-500/20' 
                                  : 'bg-white border-slate-200 text-slate-800 focus:border-blue-500 focus:ring-blue-500/20'
                              }`}
                          />
                      </div>

                      {/* Teks Terbilang Otomatis (Validasi Ganda) */}
                      <div className="p-5 bg-white/60 border border-slate-200/50 rounded-2xl relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600"></div>
                          <div className="flex gap-4">
                              <Info size={20} className="text-blue-500 shrink-0 mt-0.5" />
                              <div className="space-y-2">
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Terbilang (Ejaan Otomatis)</p>
                                  <p className={`text-sm font-bold italic leading-relaxed capitalize ${terbilangText ? 'text-blue-800' : 'text-slate-300 lowercase'}`}>
                                      {terbilangText || "Nol rupiah"}
                                  </p>
                              </div>
                          </div>
                      </div>
                  </div>
                </div>

                {/* Validasi Visual Checklist */}
                <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Status Verifikasi Sistem</h4>
                    <div className="grid grid-cols-1 gap-2.5">
                        <ValidationStep label="Unit Kerja Terseleksi" isValid={!!formData.unit} />
                        <ValidationStep label="Uraian Minimal 5 Karakter" isValid={formData.uraian.length >= 5} />
                        <ValidationStep label="Nominal Pagu Positif" isValid={formData.paguValue > 0} />
                    </div>
                </div>
            </div>
        </div>

        {/* Footer Modal: Tombol Batal & Simpan */}
        <div className="px-10 py-7 border-t border-slate-100 bg-white flex justify-end items-center gap-5">
            <button 
                onClick={onClose}
                className="px-8 py-3.5 rounded-2xl font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-all flex items-center gap-2"
            >
                Batalkan
            </button>
            <button 
                disabled={!formData.unit || formData.uraian.length < 5 || formData.paguValue <= 0}
                className="px-12 py-4 bg-blue-600 text-white font-black text-sm rounded-2xl shadow-2xl shadow-blue-600/40 hover:bg-blue-700 active:scale-95 disabled:opacity-20 disabled:grayscale disabled:scale-100 transition-all flex items-center gap-3 tracking-[0.2em] uppercase"
            >
                <Save size={20} className="stroke-[3px]" />
                Simpan Data
            </button>
        </div>
      </div>
    </div>
  );
};

// Sub-komponen Checklist Validasi
const ValidationStep: React.FC<{ label: string; isValid: boolean }> = ({ label, isValid }) => (
    <div className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${isValid ? 'bg-emerald-50 border-emerald-100 text-emerald-800 shadow-sm' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
        <span className="text-xs font-bold tracking-tight">{label}</span>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${isValid ? 'bg-emerald-500 text-white scale-110' : 'border-2 border-slate-200'}`}>
            {isValid && <CheckCircle2 size={16} className="stroke-[3px]" />}
        </div>
    </div>
);