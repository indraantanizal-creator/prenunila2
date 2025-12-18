import React from 'react';
import { ShieldCheck, CheckCircle2, XCircle, Info, Users, Database, FileText, Activity, Landmark, Calculator } from 'lucide-react';

interface Permission {
  label: string;
  icon: React.ReactNode;
}

const PERMISSIONS: Permission[] = [
  { label: 'Kelola User', icon: <Users size={14} /> },
  { label: 'Master Data', icon: <Database size={14} /> },
  { label: 'Setting Pagu', icon: <Landmark size={14} /> },
  { label: 'Input Usulan', icon: <FileText size={14} /> },
  { label: 'Reviewer', icon: <Activity size={14} /> },
  { label: 'Approver', icon: <ShieldCheck size={14} /> },
  { label: 'Keuangan', icon: <Calculator size={14} /> },
];

const ROLES = [
  { 
    id: 'sysadmin', 
    name: 'System Admin', 
    unit: 'UPT TIK', 
    access: [true, true, false, false, false, false, false],
    desc: 'Fokus pada manajemen teknis, pemeliharaan infrastruktur, dan kontrol akses user. Tidak mencampuri substansi anggaran.'
  },
  { 
    id: 'planadmin', 
    name: 'Planning Admin', 
    unit: 'BPKHM', 
    access: [true, true, true, true, true, true, true],
    desc: 'Pemegang kendali penuh perencanaan universitas. Mengelola Renstra, IKU, dan alokasi pagu dasar semua unit.'
  },
  { 
    id: 'planreviewer', 
    name: 'Planning Reviewer', 
    unit: 'Tim BPKHM/BAK', 
    access: [false, false, false, false, true, false, false],
    desc: 'Memberikan catatan teknis dan evaluasi terhadap usulan yang masuk tanpa hak mengubah angka usulan secara langsung.'
  },
  { 
    id: 'unitoperator', 
    name: 'Unit Operator', 
    unit: 'Operasional Unit', 
    access: [false, false, false, true, false, false, false],
    desc: 'Garda terdepan penginputan data usulan dan RAB unit kerja masing-masing. Terikat pada pagu unit yang telah ditentukan.'
  },
  { 
    id: 'unitapprover', 
    name: 'Unit Approver', 
    unit: 'Manajemen Unit', 
    access: [false, false, false, true, false, true, false],
    desc: 'Pimpinan unit (Dekan/Lembaga) yang bertanggung jawab memvalidasi keselarasan usulan unit dengan visi unit.'
  },
  { 
    id: 'pimpinan', 
    name: 'Pimpinan Univ.', 
    unit: 'Rektorat', 
    access: [false, false, false, false, false, false, false],
    desc: 'Hak akses "Read-Only" tingkat tinggi. Fokus pada monitoring dashboard strategis dan laporan eksekutif.'
  },
  { 
    id: 'finance', 
    name: 'Finance Controller', 
    unit: 'BKKU', 
    access: [false, false, false, false, false, true, true],
    desc: 'Melakukan validasi dari aspek akuntabilitas keuangan dan kesesuaian jenis belanja (CAPEX/OPEX).'
  },
];

export const RoleMatrix: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex gap-4 items-start">
        <div className="p-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-600/20">
          <ShieldCheck size={24} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-blue-900">Arsitektur Hak Akses Baru</h2>
          <p className="text-sm text-blue-700 leading-relaxed max-w-3xl">
            Sistem sekarang menggunakan pendekatan <strong>Role-Based Access Control (RBAC)</strong> yang lebih ketat untuk menjamin integritas data perencanaan antar unit kerja dan kantor pusat.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] w-[250px]">Role Jabatan</th>
                {PERMISSIONS.map((p, i) => (
                  <th key={i} className="px-4 py-5 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <div className="text-slate-400">{p.icon}</div>
                      <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider whitespace-nowrap">{p.label}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {ROLES.map((role) => (
                <tr key={role.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="font-bold text-slate-800">{role.name}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{role.unit}</div>
                  </td>
                  {role.access.map((hasAccess, i) => (
                    <td key={i} className="px-4 py-5 text-center">
                      <div className="flex justify-center">
                        {hasAccess ? (
                          <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg shadow-sm">
                            <CheckCircle2 size={16} className="stroke-[3px]" />
                          </div>
                        ) : (
                          <div className="p-1.5 bg-slate-100 text-slate-300 rounded-lg opacity-40">
                            <XCircle size={16} />
                          </div>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="px-6 py-5 bg-amber-50/30">
                   <div className="font-bold text-amber-800 italic">Pimpinan Univ. (Khusus)</div>
                   <div className="text-[10px] text-amber-600 font-bold uppercase">View Only</div>
                </td>
                <td colSpan={7} className="px-6 py-5 bg-amber-50/30">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-amber-700 italic">
                    <Info size={14} />
                    Akses Dashboard Monitoring Terpadu (Seluruh Unit) - Tanpa Hak Modifikasi Data.
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
        {ROLES.map((role) => (
          <div key={role.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
               <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <ShieldCheck size={20} />
               </div>
               <span className="text-[9px] font-black px-2 py-1 bg-slate-100 rounded text-slate-500 uppercase tracking-widest">{role.unit}</span>
            </div>
            <h4 className="font-black text-slate-800 mb-2">{role.name}</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              {role.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};