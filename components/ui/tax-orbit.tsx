"use client";

import React from "react";
import { ShieldCheck, Layers, DollarSign, Percent, Calculator, TrendingDown, Activity, Coins, FileCheck } from "lucide-react";

export const TaxOrbit = () => {
  return (
    <div className="relative w-[600px] h-[600px] flex items-center justify-center scale-[0.56] sm:scale-[0.65] md:scale-75 lg:scale-[0.85]">
      <style>{`
        @keyframes orbit-cw {
          from { transform: rotate(var(--start-angle)) translateX(var(--radius)) rotate(calc(-1 * var(--start-angle))); }
          to { transform: rotate(calc(var(--start-angle) + 360deg)) translateX(var(--radius)) rotate(calc(-1 * (var(--start-angle) + 360deg))); }
        }
        @keyframes orbit-ccw {
          from { transform: rotate(var(--start-angle)) translateX(var(--radius)) rotate(calc(-1 * var(--start-angle))); }
          to { transform: rotate(calc(var(--start-angle) - 360deg)) translateX(var(--radius)) rotate(calc(-1 * (var(--start-angle) - 360deg))); }
        }
      `}</style>

      {/* Orbits */}
      <div className="absolute w-[280px] h-[280px] rounded-full border border-slate-700/60" />
      <div className="absolute w-[440px] h-[440px] rounded-full border border-slate-700/60" />
      <div className="absolute w-[600px] h-[600px] rounded-full border border-slate-700/60" />

      {/* --- INNER ORBIT (140px radius) --- */}
      <OrbitNode radius={140} angle={-45} duration={40}>
        <div className="flex items-center gap-3 bg-[#0f172a] border border-slate-700/80 rounded-full p-2 pr-5 shadow-xl whitespace-nowrap">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-tight">Risco Fiscal</p>
            <p className="text-sm font-bold text-white leading-tight">0% Detectado</p>
          </div>
        </div>
      </OrbitNode>

      <OrbitNode radius={140} angle={160} duration={40}>
        <div className="flex items-center gap-3 bg-[#0f172a]/90 backdrop-blur-sm border border-indigo-500/30 rounded-2xl p-3 shadow-[0_0_15px_rgba(99,102,241,0.15)] whitespace-nowrap">
          <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider leading-tight">Revisão Fiscal</p>
            <p className="text-xs font-mono text-slate-300 leading-tight">EM PROCESSO...</p>
          </div>
        </div>
      </OrbitNode>
      
      <OrbitNode radius={140} angle={80} duration={40}>
        <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400 shadow-lg">
          <Calculator className="w-4 h-4" />
        </div>
      </OrbitNode>

      {/* --- MIDDLE ORBIT (220px radius) --- */}
      <OrbitNode radius={220} angle={135} duration={50} reverse>
        <div className="flex items-center gap-4 bg-[#0f172a] border border-slate-700/80 rounded-2xl p-4 shadow-xl whitespace-nowrap">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 leading-tight">Economia Anual</p>
            <p className="text-2xl font-bold text-white leading-tight">R$ 1.25 M</p>
          </div>
        </div>
      </OrbitNode>

      <OrbitNode radius={220} angle={-150} duration={50} reverse>
        <div className="flex flex-col gap-2 bg-[#0f172a]/90 backdrop-blur-sm border border-slate-700/80 rounded-2xl p-4 shadow-xl w-32">
          <div className="flex items-end gap-1.5 h-10 mb-1 justify-center">
            <div className="w-3 bg-slate-600 rounded-t-sm h-1/3" />
            <div className="w-3 bg-slate-500 rounded-t-sm h-1/2" />
            <div className="w-3 bg-slate-400 rounded-t-sm h-3/4" />
            <div className="w-3 bg-emerald-400 rounded-t-sm h-full shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Projeção 2026</p>
        </div>
      </OrbitNode>

      <OrbitNode radius={220} angle={50} duration={50} reverse>
        <div className="flex flex-col gap-1 bg-[#0f172a]/90 backdrop-blur-sm border border-slate-700/80 rounded-xl p-3 shadow-xl">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Carga Ef.</p>
           <div className="flex items-center gap-1 text-emerald-400">
             <TrendingDown className="w-4 h-4" />
             <span className="font-bold">-12%</span>
           </div>
        </div>
      </OrbitNode>

      <OrbitNode radius={220} angle={-50} duration={50} reverse>
        <div className="flex items-center gap-3 bg-[#0f172a]/95 backdrop-blur-sm border border-amber-500/30 rounded-2xl p-3 shadow-[0_0_15px_rgba(245,158,11,0.15)] whitespace-nowrap">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
            <Coins className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-amber-300 uppercase tracking-wider leading-tight">Créditos Tributários</p>
            <p className="text-xs font-bold text-white leading-tight">PIS / COFINS / ICMS</p>
          </div>
        </div>
      </OrbitNode>

      {/* --- OUTER ORBIT (300px radius) --- */}
      <OrbitNode radius={300} angle={15} duration={60}>
        <div className="flex flex-col gap-2 bg-[#0f172a]/90 backdrop-blur-sm border border-teal-500/30 rounded-2xl p-4 shadow-[0_0_15px_rgba(20,184,166,0.1)] w-48">
          <div className="flex items-center gap-2 text-teal-400">
            <Layers className="w-5 h-5" />
            <span className="font-bold text-white text-sm">Simulação IVA</span>
          </div>
          <div className="w-full h-[1px] bg-slate-700 my-1" />
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Cenário</span>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Otimizado</span>
          </div>
        </div>
      </OrbitNode>

      <OrbitNode radius={300} angle={175} duration={60}>
        <div className="flex items-center gap-3 bg-[#0f172a]/95 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-3 shadow-[0_0_15px_rgba(6,182,212,0.15)] whitespace-nowrap">
          <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
            <FileCheck className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider leading-tight">Conformidade Fiscal</p>
            <p className="text-xs font-bold text-white leading-tight">CND 100% Regular</p>
          </div>
        </div>
      </OrbitNode>

      <OrbitNode radius={300} angle={240} duration={60}>
        <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center text-emerald-400 shadow-lg">
          <DollarSign className="w-4 h-4" />
        </div>
      </OrbitNode>

      <OrbitNode radius={300} angle={100} duration={60}>
        <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center text-teal-400 shadow-lg">
          <Percent className="w-4 h-4" />
        </div>
      </OrbitNode>

    </div>
  );
};

interface OrbitNodeProps {
  radius: number;
  angle: number;
  duration: number;
  reverse?: boolean;
  children: React.ReactNode;
}

const OrbitNode: React.FC<OrbitNodeProps> = ({ radius, angle, duration, reverse, children }) => {
  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{
        '--radius': `${radius}px`,
        '--start-angle': `${angle}deg`,
        animation: `orbit-${reverse ? 'ccw' : 'cw'} ${duration}s linear infinite`
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};
