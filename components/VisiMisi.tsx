import React from 'react';
import { Flag, Target, Award, Rocket, CheckCircle2, Globe, ShieldCheck, Zap, Heart, Handshake, Landmark } from 'lucide-react';

export const VisiMisi: React.FC = () => {
  const misiItems = [
    { text: "Meningkatkan pendidikan unggul berkelas dunia", icon: <Globe size={18} /> },
    { text: "Menghasilkan lulusan dengan kapasitas kepemimpinan global", icon: <ShieldCheck size={18} /> },
    { text: "Mengembangkan inovasi penelitian yang berdampak pada solusi berkelanjutan", icon: <Zap size={18} /> },
    { text: "Mengembangkan pengabdian masyarakat berbasis inovasi unggulan dan berkelanjutan", icon: <Heart size={18} /> },
    { text: "Mengembangkan kemitraan strategis global", icon: <Handshake size={18} /> },
    { text: "Meningkatkan tata kelola berbasis nilai-nilai berkelanjutan dan keunggulan lokal", icon: <Landmark size={18} /> }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-[#0f172a] -m-6 p-8 min-h-screen text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 to-indigo-950 p-12 border border-blue-800/50 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-widest mb-6">
            <Flag size={14} />
            Landasan Strategis
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            Visi & Misi <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Universitas Lampung</span>
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed font-medium italic border-l-4 border-emerald-500 pl-6 py-2">
            "Universitas Lampung Berkelas Dunia, Unggul dan Berkelanjutan"
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Visi Card */}
        <div className="lg:col-span-4 bg-[#1e293b] p-8 rounded-2xl border border-slate-800 shadow-xl hover:border-blue-500/30 transition-all group flex flex-col">
          <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
            <Target className="text-white" size={28} />
          </div>
          <h2 className="text-2xl font-bold mb-4">Visi Universitas</h2>
          <div className="flex-1 p-6 bg-slate-900/50 rounded-xl border border-slate-700/50 italic text-slate-200 text-lg leading-relaxed flex items-center">
            "Universitas Lampung Berkelas Dunia, Unggul dan Berkelanjutan"
          </div>
        </div>

        {/* Misi Card */}
        <div className="lg:col-span-8 bg-[#1e293b] p-8 rounded-2xl border border-slate-800 shadow-xl hover:border-emerald-500/30 transition-all group">
          <div className="w-14 h-14 bg-emerald-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-600/20 group-hover:scale-110 transition-transform">
            <Rocket className="text-white" size={28} />
          </div>
          <h2 className="text-2xl font-bold mb-6">Misi Universitas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {misiItems.map((misi, index) => (
              <div key={index} className="flex gap-4 items-start p-4 bg-slate-900/30 hover:bg-slate-800/50 rounded-xl transition-all border border-slate-800 hover:border-emerald-500/30 group/item">
                <div className="mt-0.5 shrink-0 text-emerald-500 p-2 bg-emerald-500/10 rounded-lg group-hover/item:scale-110 transition-transform">
                  {misi.icon}
                </div>
                <p className="text-sm text-slate-300 font-medium leading-relaxed">
                  {misi.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Motto / Slogan Section */}
      <div className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] p-10 rounded-2xl border border-slate-800 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 flex items-center justify-center pointer-events-none uppercase font-black text-8xl tracking-tighter">
          Be Strong!
        </div>
        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
              <Award className="text-blue-400" size={32} />
            </div>
          </div>
          <h3 className="text-xl font-bold text-slate-400 uppercase tracking-[0.3em] mb-2">Motto Utama</h3>
          <p className="text-5xl font-serif italic font-black text-white">"Be Strong!"</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {["Excellence", "Integrity", "Innovation", "Sustainability"].map((val) => (
              <span key={val} className="px-4 py-2 bg-slate-800 text-slate-400 text-xs font-bold uppercase tracking-widest rounded-lg border border-slate-700">
                {val}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};