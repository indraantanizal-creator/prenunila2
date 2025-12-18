
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Users, 
  Wallet, 
  Zap, 
  BookOpen, 
  Edit3, 
  Filter, 
  Search,
  Map,
  X,
  Info
} from 'lucide-react';
import { formatCurrency } from '../constants';

// --- TYPES & DATA ---
interface Unit {
  id: string;
  name: string;
  color: string;
}

const UNITS: Unit[] = [
  { id: 'FEB', name: 'Fak. Ekonomi', color: '#3b82f6' }, // blue-500
  { id: 'FH', name: 'Fak. Hukum', color: '#ef4444' },    // red-500
  { id: 'FT', name: 'Fak. Teknik', color: '#f59e0b' },   // amber-500
  { id: 'FKIP', name: 'Fak. Keguruan', color: '#10b981' }, // emerald-500
  { id: 'LPPM', name: 'LPPM', color: '#8b5cf6' },        // violet-500
  { id: 'TIK', name: 'UPT TIK', color: '#ec4899' },      // pink-500
  { id: 'BPU', name: 'BPU', color: '#06b6d4' },          // cyan-500
];

interface Contribution {
  unitId: string;
  value: number; // Represents budget or activity count
}

interface Target {
  id: string;
  code: string;
  name: string;
  perspective: 'finance' | 'customer' | 'internal' | 'learning';
  contributions: Contribution[];
  connectsTo: string[]; // IDs of targets this one impacts (upwards)
}

const STRATEGY_DATA: Target[] = [
  // --- FINANCIAL ---
  {
    id: 'F1', code: 'F1', perspective: 'finance',
    name: 'Meningkatnya Kecukupan Finansial (Revenue Generating)',
    connectsTo: [],
    contributions: [
      { unitId: 'BPU', value: 450 },
      { unitId: 'LPPM', value: 200 },
      { unitId: 'FT', value: 150 },
      { unitId: 'FEB', value: 100 }
    ]
  },
  {
    id: 'F2', code: 'F2', perspective: 'finance',
    name: 'Efisiensi Biaya & Akuntabilitas Anggaran',
    connectsTo: ['F1'],
    contributions: [
      { unitId: 'FEB', value: 200 },
      { unitId: 'FH', value: 150 },
      { unitId: 'TIK', value: 100 }
    ]
  },

  // --- CUSTOMER ---
  {
    id: 'C1', code: 'C1', perspective: 'customer',
    name: 'Meningkatnya Kualitas Lulusan & Reputasi Akademik',
    connectsTo: ['F1'],
    contributions: [
      { unitId: 'FEB', value: 300 },
      { unitId: 'FH', value: 250 },
      { unitId: 'FT', value: 300 },
      { unitId: 'FKIP', value: 350 }
    ]
  },
  {
    id: 'C2', code: 'C2', perspective: 'customer',
    name: 'Kepuasan Mitra Kerjasama & Industri',
    connectsTo: ['F1'],
    contributions: [
      { unitId: 'LPPM', value: 150 },
      { unitId: 'FT', value: 200 }
    ]
  },

  // --- INTERNAL PROCESS ---
  {
    id: 'I1', code: 'I1', perspective: 'internal',
    name: 'Penguatan Riset & Inovasi Berdampak',
    connectsTo: ['C1', 'C2', 'F1'],
    contributions: [
      { unitId: 'LPPM', value: 500 },
      { unitId: 'FT', value: 300 },
      { unitId: 'FEB', value: 200 }
    ]
  },
  {
    id: 'I2', code: 'I2', perspective: 'internal',
    name: 'Transformasi Layanan Digital (Smart Campus)',
    connectsTo: ['C1', 'F2'],
    contributions: [
      { unitId: 'TIK', value: 600 },
      { unitId: 'FKIP', value: 100 }
    ]
  },
  {
    id: 'I3', code: 'I3', perspective: 'internal',
    name: 'Modernisasi Infrastruktur Laboratorium',
    connectsTo: ['I1', 'C1'],
    contributions: [
      { unitId: 'FT', value: 400 },
      { unitId: 'FKIP', value: 200 }
    ]
  },

  // --- LEARNING & GROWTH ---
  {
    id: 'L1', code: 'L1', perspective: 'learning',
    name: 'Kapabilitas SDM Unggul (Human Capital)',
    connectsTo: ['I1', 'I3'],
    contributions: [
      { unitId: 'FEB', value: 150 },
      { unitId: 'FT', value: 150 },
      { unitId: 'FKIP', value: 200 },
      { unitId: 'FH', value: 100 }
    ]
  },
  {
    id: 'L2', code: 'L2', perspective: 'learning',
    name: 'Budaya Organisasi & Tata Kelola Agile',
    connectsTo: ['I2', 'F2'],
    contributions: [
      { unitId: 'TIK', value: 100 },
      { unitId: 'BPU', value: 100 }
    ]
  }
];

const PERSPECTIVES = [
  { id: 'finance', name: 'Financial Perspective', color: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300', icon: Wallet },
  { id: 'customer', name: 'Stakeholder / Customer', color: 'bg-blue-500/10 border-blue-500/30 text-blue-300', icon: Users },
  { id: 'internal', name: 'Internal Business Process', color: 'bg-amber-500/10 border-amber-500/30 text-amber-300', icon: Zap },
  { id: 'learning', name: 'Learning & Growth', color: 'bg-purple-500/10 border-purple-500/30 text-purple-300', icon: BookOpen },
];

// --- COMPONENTS ---

// 1. Contribution Block Visualization (Treemap-ish)
const ContributionViz: React.FC<{ contributions: Contribution[] }> = ({ contributions }) => {
  const total = contributions.reduce((acc, c) => acc + c.value, 0);
  
  // Sort by value desc
  const sorted = [...contributions].sort((a, b) => b.value - a.value);

  return (
    <div className="w-full h-24 bg-slate-800 rounded-lg overflow-hidden flex flex-wrap content-start p-1 gap-0.5 relative group cursor-help mt-2">
      {sorted.map((c, i) => {
        const unit = UNITS.find(u => u.id === c.unitId);
        const percent = (c.value / total) * 100;
        // Calculate rough area in pixels (total area approx 220px width x 96px height = 21120px)
        // We use flex-basis logic approximation
        
        return (
          <div 
            key={i}
            className="h-full hover:opacity-80 transition-opacity relative"
            style={{ 
              backgroundColor: unit?.color || '#94a3b8',
              flex: `1 1 ${percent}%`,
              minWidth: '5px' 
            }}
            title={`${unit?.name}: ${c.value} (${percent.toFixed(1)}%)`}
          >
          </div>
        );
      })}
      
      {/* Tooltip on Hover Container */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/60 transition-opacity pointer-events-none">
         <span className="text-[10px] font-bold text-white bg-black px-2 py-1 rounded">Total: {total} Poin</span>
      </div>
    </div>
  );
};

// 2. SVG Arrow Layer
const ConnectionLayer: React.FC<{ targets: Target[], boxRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>> }> = ({ targets, boxRefs }) => {
  const [lines, setLines] = useState<React.ReactElement[]>([]);

  useEffect(() => {
    // Debounce resize
    const calculateLines = () => {
      const newLines: React.ReactElement[] = [];
      const containerRect = document.getElementById('strategy-map-container')?.getBoundingClientRect();

      if (!containerRect) return;

      targets.forEach(source => {
        const sourceEl = boxRefs.current[source.id];
        if (!sourceEl) return;
        const sourceRect = sourceEl.getBoundingClientRect();

        source.connectsTo.forEach(targetId => {
          const targetEl = boxRefs.current[targetId];
          if (!targetEl) return;
          const targetRect = targetEl.getBoundingClientRect();

          // Coordinates relative to container
          const x1 = sourceRect.left + sourceRect.width / 2 - containerRect.left;
          const y1 = sourceRect.top - containerRect.top; // Start from top of source
          const x2 = targetRect.left + targetRect.width / 2 - containerRect.left;
          const y2 = targetRect.bottom - containerRect.top; // End at bottom of target

          // Bezier Curve
          const controlY1 = y1 - 40;
          const controlY2 = y2 + 40;

          newLines.push(
            <path
              key={`${source.id}-${targetId}`}
              d={`M ${x1} ${y1} C ${x1} ${controlY1}, ${x2} ${controlY2}, ${x2} ${y2}`}
              fill="none"
              stroke="#64748b" // slate-500
              strokeWidth="2"
              strokeOpacity="0.3"
              markerEnd="url(#arrowhead)"
            />
          );
        });
      });
      setLines(newLines);
    };

    // Calculate initially and on resize
    setTimeout(calculateLines, 500); // Delay for layout render
    window.addEventListener('resize', calculateLines);
    return () => window.removeEventListener('resize', calculateLines);
  }, [targets, boxRefs]);

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ minHeight: '1200px' }}>
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" fillOpacity="0.5" />
        </marker>
      </defs>
      {lines}
    </svg>
  );
};

export const StrategyMap: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  
  const boxRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Filter Logic
  const filteredTargets = useMemo(() => {
    return STRATEGY_DATA.map(t => {
      // If filtering by unit, filter the contributions inside
      if (selectedUnit !== 'all') {
         const hasUnit = t.contributions.some(c => c.unitId === selectedUnit);
         if (!hasUnit) return { ...t, isDimmed: true };
         return t;
      }
      if (searchQuery) {
         if (!t.name.toLowerCase().includes(searchQuery.toLowerCase())) return { ...t, isDimmed: true };
         return t;
      }
      return { ...t, isDimmed: false };
    });
  }, [searchQuery, selectedUnit]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 bg-[#0f172a] -m-6 p-8 min-h-screen pb-20 text-slate-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-2">
        <div>
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-2">
             <Map size={14} />
             Strategy Map (Peta Strategis)
           </div>
           <h1 className="text-4xl font-black text-white tracking-tight mb-2">Peta Strategis Universitas</h1>
           <p className="text-slate-400 max-w-3xl text-sm leading-relaxed">
             Visualisasi hubungan sebab-akibat antar sasaran strategis dan kontribusi unit kerja terhadap pencapaian kinerja (Balanced Scorecard).
           </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                <input 
                  type="text" 
                  placeholder="Cari Sasaran..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:ring-1 focus:ring-indigo-500 outline-none"
                />
             </div>
             <div className="flex items-center gap-2 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg">
                <Filter size={14} className="text-slate-500" />
                <select 
                   value={selectedUnit}
                   onChange={(e) => setSelectedUnit(e.target.value)}
                   className="bg-transparent border-none text-xs font-bold text-slate-300 focus:ring-0 cursor-pointer outline-none"
                >
                   <option value="all">Semua Unit Kontributor</option>
                   {UNITS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                </select>
             </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 p-4 bg-slate-900/50 rounded-xl border border-slate-800">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mr-2 flex items-center">
             <Info size={14} className="mr-1" /> Legenda Unit:
          </span>
          {UNITS.map(u => (
             <div 
               key={u.id} 
               className={`flex items-center gap-1.5 px-2 py-1 rounded border border-white/5 cursor-pointer hover:bg-white/10 transition-colors ${selectedUnit === u.id ? 'ring-1 ring-white' : ''}`}
               onClick={() => setSelectedUnit(selectedUnit === u.id ? 'all' : u.id)}
             >
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: u.color }}></div>
                <span className="text-[10px] font-bold text-slate-300">{u.name}</span>
             </div>
          ))}
      </div>

      {/* STRATEGY MAP CONTAINER */}
      <div className="relative bg-[#1e293b]/50 rounded-3xl border border-slate-800 p-8 overflow-x-auto" id="strategy-map-container">
          
          {/* SVG Connection Layer */}
          <ConnectionLayer targets={STRATEGY_DATA} boxRefs={boxRefs} />

          <div className="relative z-10 flex flex-col gap-12 min-w-[900px]">
             {PERSPECTIVES.map((persp) => {
                const targetsInPersp = filteredTargets.filter(t => t.perspective === persp.id);
                
                return (
                   <div key={persp.id} className={`relative flex items-stretch rounded-2xl border-2 border-dashed ${persp.color.replace('bg-', 'bg-opacity-5 ')} p-4 min-h-[200px]`}>
                      {/* Perspective Label (Vertical) */}
                      <div className="absolute -left-4 top-1/2 -translate-y-1/2 -rotate-90 origin-center translate-x-[-50%] whitespace-nowrap">
                         <div className={`flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-md border ${persp.color} shadow-lg`}>
                            {React.createElement(persp.icon, { size: 16 })}
                            <span className="text-sm font-black uppercase tracking-widest">{persp.name}</span>
                         </div>
                      </div>

                      {/* Target Cards Area */}
                      <div className="flex-1 flex justify-center items-center gap-6 ml-12">
                         {targetsInPersp.length === 0 ? (
                            <div className="text-slate-600 italic text-sm">Tidak ada sasaran strategis di perspektif ini</div>
                         ) : (
                            targetsInPersp.map(target => (
                               <div
                                  key={target.id}
                                  ref={(el) => (boxRefs.current[target.id] = el)}
                                  className={`relative w-64 bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-xl transition-all duration-300 hover:scale-105 hover:border-indigo-500 hover:shadow-indigo-500/20 z-10 flex flex-col ${
                                    (target as any).isDimmed ? 'opacity-20 blur-[1px]' : 'opacity-100'
                                  }`}
                               >
                                  {/* Header */}
                                  <div className="flex justify-between items-start mb-2">
                                     <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-slate-800 border border-slate-600 text-slate-400">
                                        {target.code}
                                     </span>
                                     <button className="text-slate-600 hover:text-white transition-colors">
                                        <Edit3 size={12} />
                                     </button>
                                  </div>
                                  
                                  {/* Title */}
                                  <h4 className="text-xs font-bold text-slate-200 leading-snug min-h-[40px] mb-2">
                                     {target.name}
                                  </h4>

                                  {/* Contribution Viz */}
                                  <div className="mt-auto">
                                     <div className="flex justify-between items-end mb-1">
                                        <span className="text-[9px] font-bold text-slate-500 uppercase">Kontribusi Unit</span>
                                        <span className="text-[9px] font-mono text-emerald-500">
                                           {target.contributions.reduce((a,b) => a + b.value, 0)} Poin
                                        </span>
                                     </div>
                                     <ContributionViz contributions={target.contributions} />
                                  </div>

                                  {/* Connection Point (Visual only) */}
                                  {target.connectsTo.length > 0 && (
                                     <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-indigo-500 rounded-full"></div>
                                  )}
                                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-600 rounded-full"></div>
                               </div>
                            ))
                         )}
                      </div>
                   </div>
                );
             })}
          </div>
      </div>
    </div>
  );
};
