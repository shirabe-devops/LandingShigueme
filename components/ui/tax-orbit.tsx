"use client";

import React from "react";
import { ShieldCheck, Layers, DollarSign, Percent, Calculator, TrendingDown, Activity, Coins, FileCheck } from "lucide-react";

export const TaxOrbit = () => {
  return (
    <div className="relative w-[720px] h-[720px] flex items-center justify-center scale-[0.52] sm:scale-[0.62] md:scale-[0.72] lg:scale-[0.82] xl:scale-[0.88]">
      <style>{`
        @keyframes orbit-spin-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-spin-ccw {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes orbit-counter-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes orbit-counter-ccw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* ============================================================== */}
      {/* --- 11 ANÉIS RADIAIS INDEPENDENTES (Guias Visuais) --- */}
      {/* ============================================================== */}
      <div className="absolute w-[180px] h-[180px] rounded-full border border-slate-700/50 pointer-events-none" />
      <div className="absolute w-[232px] h-[232px] rounded-full border border-slate-700/35 border-dashed pointer-events-none" />
      <div className="absolute w-[284px] h-[284px] rounded-full border border-slate-700/50 pointer-events-none" />
      <div className="absolute w-[336px] h-[336px] rounded-full border border-slate-700/35 border-dashed pointer-events-none" />
      <div className="absolute w-[388px] h-[388px] rounded-full border border-slate-700/50 pointer-events-none" />
      <div className="absolute w-[440px] h-[440px] rounded-full border border-slate-700/35 border-dashed pointer-events-none" />
      <div className="absolute w-[492px] h-[492px] rounded-full border border-slate-700/50 pointer-events-none" />
      <div className="absolute w-[544px] h-[544px] rounded-full border border-slate-700/35 border-dashed pointer-events-none" />
      <div className="absolute w-[596px] h-[596px] rounded-full border border-slate-700/50 pointer-events-none" />
      <div className="absolute w-[648px] h-[648px] rounded-full border border-slate-700/35 border-dashed pointer-events-none" />
      <div className="absolute w-[700px] h-[700px] rounded-full border border-slate-700/50 pointer-events-none" />

      {/* Núcleo Central Gravitacional */}
      <div className="absolute w-20 h-20 rounded-full bg-blue-600/10 border border-blue-500/20 blur-sm pointer-events-none animate-pulse" />
      <div className="absolute w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 border border-blue-400/40 flex items-center justify-center pointer-events-none shadow-[0_0_20px_rgba(59,130,246,0.3)]">
        <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping opacity-75" />
      </div>

      {/* ============================================================== */}
      {/* --- CADA ELEMENTO EM SEU PRÓPRIO ANEL INDEPENDENTE (1 a 11) --- */}
      {/* Ângulos iniciais maximamente espalhados por todo o círculo (0° a 360°) */}
      {/* ============================================================== */}

      {/* ANEL 1: Raio 90px (Sentido Horário - CW) | Ângulo: 0° (Leste) */}
      <OrbitNode radius={90} angle={0} duration={28}>
        <div className="w-7 h-7 rounded-lg bg-[#0b1329]/95 border border-slate-700/80 flex items-center justify-center text-slate-300 shadow-md">
          <Calculator className="w-3.5 h-3.5" />
        </div>
      </OrbitNode>

      {/* ANEL 2: Raio 116px (Sentido Anti-Horário - CCW) | Ângulo: 130° (Sudoeste) */}
      <OrbitNode radius={116} angle={130} duration={34} reverse>
        <div className="flex items-center gap-1.5 bg-[#0b1329]/95 border border-blue-500/40 rounded-full py-1 px-2.5 shadow-lg whitespace-nowrap">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span className="text-[10px] font-bold text-white tracking-tight">Risco 0%</span>
        </div>
      </OrbitNode>

      {/* ANEL 3: Raio 142px (Sentido Horário - CW) | Ângulo: 260° (Oeste/Noroeste) */}
      <OrbitNode radius={142} angle={260} duration={30}>
        <div className="flex items-center gap-1 bg-[#0b1329]/95 border border-emerald-500/30 rounded-full py-0.5 px-2 shadow-md whitespace-nowrap">
          <TrendingDown className="w-3 h-3 text-emerald-400 shrink-0" />
          <span className="text-[10px] font-bold text-emerald-400">-12% Carga</span>
        </div>
      </OrbitNode>

      {/* ANEL 4: Raio 168px (Sentido Anti-Horário - CCW) | Ângulo: 35° (Nordeste) */}
      <OrbitNode radius={168} angle={35} duration={40} reverse>
        <div className="flex items-center gap-2 bg-[#0b1329]/95 border border-indigo-500/30 rounded-full py-1 px-3 shadow-lg whitespace-nowrap">
          <Activity className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span className="text-[9px] font-bold text-indigo-300 uppercase tracking-wider">Revisão Fiscal</span>
        </div>
      </OrbitNode>

      {/* ANEL 5: Raio 194px (Sentido Horário - CW) | Ângulo: 165° (Sul/Sudoeste) */}
      <OrbitNode radius={194} angle={165} duration={36}>
        <div className="w-7 h-7 rounded-lg bg-[#0b1329]/95 border border-teal-500/30 flex items-center justify-center text-teal-400 shadow-md">
          <Percent className="w-3.5 h-3.5" />
        </div>
      </OrbitNode>

      {/* ANEL 6: Raio 220px (Sentido Anti-Horário - CCW) | Ângulo: 295° (Noroeste) */}
      <OrbitNode radius={220} angle={295} duration={48} reverse>
        <div className="flex items-center gap-2.5 bg-[#0b1329]/95 border border-emerald-500/40 rounded-2xl py-1.5 px-3.5 shadow-xl whitespace-nowrap">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <DollarSign className="w-4 h-4" />
          </div>
          <div className="leading-tight">
            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Economia</p>
            <p className="text-sm font-bold text-white">R$ 1.25 M</p>
          </div>
        </div>
      </OrbitNode>

      {/* ANEL 7: Raio 246px (Sentido Horário - CW) | Ângulo: 70° (Leste/Nordeste) */}
      <OrbitNode radius={246} angle={70} duration={42}>
        <div className="flex items-center gap-1.5 bg-[#0b1329]/95 border border-slate-700/80 rounded-xl py-1 px-2.5 shadow-md whitespace-nowrap">
          <div className="flex items-end gap-0.5 h-3.5">
            <div className="w-1 bg-slate-600 rounded-t-xs h-1/3" />
            <div className="w-1 bg-slate-500 rounded-t-xs h-1/2" />
            <div className="w-1 bg-slate-400 rounded-t-xs h-3/4" />
            <div className="w-1 bg-emerald-400 rounded-t-xs h-full shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
          </div>
          <span className="text-[9px] font-bold text-slate-300 uppercase tracking-wider">Projeção 2026</span>
        </div>
      </OrbitNode>

      {/* ANEL 8: Raio 272px (Sentido Anti-Horário - CCW) | Ângulo: 200° (Sul) */}
      <OrbitNode radius={272} angle={200} duration={52} reverse>
        <div className="flex items-center gap-2 bg-[#0b1329]/95 border border-amber-500/30 rounded-full py-1 px-3 shadow-lg whitespace-nowrap">
          <Coins className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="text-[10px] font-bold text-amber-300">Créditos PIS/COFINS</span>
        </div>
      </OrbitNode>

      {/* ANEL 9: Raio 298px (Sentido Horário - CW) | Ângulo: 330° (Norte/Nordeste) */}
      <OrbitNode radius={298} angle={330} duration={46}>
        <div className="flex items-center gap-2 bg-[#0b1329]/95 border border-cyan-500/30 rounded-full py-1 px-3 shadow-lg whitespace-nowrap">
          <FileCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="text-[10px] font-bold text-cyan-300">CND 100% Regular</span>
        </div>
      </OrbitNode>

      {/* ANEL 10: Raio 324px (Sentido Anti-Horário - CCW) | Ângulo: 100° (Sudeste) */}
      <OrbitNode radius={324} angle={100} duration={60} reverse>
        <div className="flex items-center gap-2.5 bg-[#0b1329]/95 border border-teal-500/40 rounded-2xl py-1.5 px-3.5 shadow-xl whitespace-nowrap">
          <div className="w-7 h-7 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
            <Layers className="w-4 h-4" />
          </div>
          <div className="leading-tight">
            <p className="text-[8px] font-bold text-teal-300 uppercase tracking-wider">Simulação IVA</p>
            <p className="text-xs font-bold text-white">Cenário Otimizado</p>
          </div>
        </div>
      </OrbitNode>

      {/* ANEL 11: Raio 350px (Sentido Horário - CW) | Ângulo: 230° (Sudoeste/Oeste) */}
      <OrbitNode radius={350} angle={230} duration={54}>
        <div className="flex items-center gap-2 bg-[#0b1329]/95 border border-blue-500/40 rounded-full py-1 px-3 shadow-xl whitespace-nowrap">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span className="text-[10px] font-bold text-blue-300">Blindagem Ativa</span>
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
      className="absolute top-1/2 left-1/2 rounded-full pointer-events-none"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        transform: `translate(-50%, -50%) rotate(${angle}deg)`,
        willChange: 'transform',
      }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          animation: `${reverse ? 'orbit-spin-ccw' : 'orbit-spin-cw'} ${duration}s linear infinite`,
          willChange: 'transform',
        }}
      >
        <div
          className="absolute top-1/2 left-full pointer-events-auto"
          style={{
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            style={{
              animation: `${reverse ? 'orbit-counter-ccw' : 'orbit-counter-cw'} ${duration}s linear infinite`,
              willChange: 'transform',
            }}
          >
            <div
              style={{
                transform: `rotate(${-angle}deg)`,
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
