import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import { formatRupiah, parseRupiah, terbilang } from '../utils/formatters';

interface BudgetFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BudgetFormModal: React.FC<BudgetFormModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    tahun: '2025',
    unit: '',
    uraian: '',
    paguDisplay: '', // Stores the "1.000.000" string
    paguValue: 0,    // Stores the actual number
  });

  const [terbilangText, setTerbilangText] = useState('');
  const [isTouched, setIsTouched] = useState<Record<string, boolean>>({});

  // Reset form when modal opens
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

  if (!isOpen) return null;

  const handlePaguChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Remove non-digit characters
    const numericString = val.replace(/[^0-9]/g, '');
    const numberVal = parseInt(numericString, 10) || 0;

    // Format with dots
    const formatted = formatRupiah(numericString);

    setFormData(prev => ({
      ...prev,
      paguDisplay: formatted,
      paguValue: numberVal
    }));

    // Update terbilang text
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Tambah Anggaran Baru</h2>
            <p className="text-sm text-slate-500">Silakan lengkapi form di bawah ini dengan teliti.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-600 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body - Grid Layout */}
        <div className="flex-1 overflow-y-auto p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:divide-x md:divide-slate-100">
                
                {/* Left Column: Data Kegiatan */}
                <div className="space-y-6 md:pr-4">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">1</span>
                        <h3 className="text-lg font-semibold text-slate-800">Data Kegiatan</h3>
                    </div>

                    <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                    Tahun Anggaran
                                </label>
                                <select 
                                    value={formData.tahun}
                                    onChange={(e) => handleChange('tahun', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all cursor-not-allowed opacity-80"
                                    disabled
                                >
                                    <option value="2025">2025</option>
                                    <option value="2024">2024</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                    Kode
                                </label>
                                <input 
                                    type="text" 
                                    value="AUTO-GEN" 
                                    disabled
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 font-mono text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Unit Pelaksana <span className="text-red-500">*</span>
                            </label>
                            <select 
                                value={formData.unit}
                                onChange={(e) => handleChange('unit', e.target.value)}
                                onBlur={() => handleBlur('unit')}
                                className={`w-full px-4 py-2.5 bg-white border rounded-lg text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all ${
                                    isTouched.unit && !formData.unit 
                                    ? 'border-red-300 focus:border-red-500' 
                                    : 'border-slate-200 focus:border-blue-500'
                                }`}
                            >
                                <option value="">-- Pilih Unit Kerja --</option>
                                <option value="FEB">Fakultas Ekonomi & Bisnis</option>
                                <option value="FH">Fakultas Hukum</option>
                                <option value="FKIP">Fakultas Keguruan</option>
                                <option value="FT">Fakultas Teknik</option>
                                <option value="BPHM">Biro Perencanaan</option>
                            </select>
                            {isTouched.unit && !formData.unit && (
                                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle size={12} /> Unit kerja wajib dipilih
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Uraian Kegiatan <span className="text-red-500">*</span>
                            </label>
                            <textarea 
                                value={formData.uraian}
                                onChange={(e) => handleChange('uraian', e.target.value)}
                                onBlur={() => handleBlur('uraian')}
                                rows={4}
                                placeholder="Contoh: Belanja Modal Peralatan Komputer untuk Laboratorium..."
                                className={`w-full px-4 py-3 bg-white border rounded-lg text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none ${
                                    isTouched.uraian && !formData.uraian 
                                    ? 'border-red-300 focus:border-red-500' 
                                    : 'border-slate-200 focus:border-blue-500'
                                }`}
                            ></textarea>
                            <p className="mt-1.5 text-xs text-slate-400 text-right">Maksimal 250 karakter</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Data Anggaran */}
                <div className="space-y-6 md:pl-4">
                     <div className="flex items-center gap-2 mb-4">
                        <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">2</span>
                        <h3 className="text-lg font-semibold text-slate-800">Data Anggaran</h3>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                            Nominal Pagu (Rp) <span className="text-red-500">*</span>
                        </label>
                        
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="text-slate-500 font-bold">Rp</span>
                            </div>
                            <input 
                                type="text"
                                value={formData.paguDisplay}
                                onChange={handlePaguChange}
                                placeholder="0"
                                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-300 rounded-lg text-2xl font-mono font-bold text-slate-800 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm placeholder:text-slate-300 text-right"
                            />
                        </div>

                        <div className="mt-3 min-h-[1.5rem]">
                            {terbilangText ? (
                                <div className="flex gap-2 items-start animate-in fade-in slide-in-from-top-1 duration-300">
                                    <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                                    <p className="text-sm font-medium text-emerald-700 italic leading-snug">
                                        {terbilangText}
                                    </p>
                                </div>
                            ) : (
                                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                                    <AlertCircle size={14} />
                                    Sistem akan otomatis menambahkan titik pemisah ribuan.
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <h4 className="text-sm font-semibold text-blue-800 mb-2">Ringkasan Validasi</h4>
                        <ul className="space-y-2 text-xs text-blue-700">
                            <li className="flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${formData.unit ? 'bg-blue-600' : 'bg-blue-200'}`}></div>
                                {formData.unit ? 'Unit Kerja terpilih' : 'Mohon pilih Unit Kerja'}
                            </li>
                            <li className="flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${formData.uraian.length > 5 ? 'bg-blue-600' : 'bg-blue-200'}`}></div>
                                {formData.uraian.length > 5 ? 'Uraian kegiatan valid' : 'Uraian kegiatan minimal 5 karakter'}
                            </li>
                            <li className="flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${formData.paguValue > 0 ? 'bg-blue-600' : 'bg-blue-200'}`}></div>
                                {formData.paguValue > 0 ? 'Nominal anggaran valid' : 'Nominal anggaran belum diisi'}
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 sticky bottom-0 z-10">
            <button 
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg font-medium text-slate-600 hover:bg-white hover:shadow-sm hover:text-slate-800 border border-transparent hover:border-slate-200 transition-all"
            >
                Batal
            </button>
            <button 
                className="px-6 py-2.5 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all flex items-center gap-2"
                disabled={!formData.unit || !formData.uraian || formData.paguValue <= 0}
            >
                <Save size={18} />
                Simpan Data
            </button>
        </div>
      </div>
    </div>
  );
};