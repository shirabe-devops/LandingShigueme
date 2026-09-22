"use client";

import React from "react";
import { ShieldCheck, Layers, DollarSign, Percent, Calculator, TrendingDown, Activity, Coins, FileCheck } from "lucide-react";

export const TaxOrbit = () => {
  return (
    <div className="tax-orbit-container relative w-[700px] h-[700px] flex items-center justify-center scale-[0.38] sm:scale-[0.48] md:scale-[0.62] lg:scale-[0.80] xl:scale-[0.88] origin-center">
      <style>{`
        .tax-orbit-container {
          --orbit-item-scale: 1.15;
        }
        @media (min-width: 1024px) {
          .tax-orbit-container {
            --orbit-item-scale: 0.75; /* -50% em desktop em relacao ao 1.5 */
          }
        }
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

      {/* Halo de Profundidade Atmosférica (Glow Tecnológico Discreto) */}
      <div className="absolute w-[340px] h-[340px] rounded-full bg-blue-600/10 blur-[90px] pointer-events-none" />

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

      {/* ============================================================== */}
      {/* --- CADA ELEMENTO EM SEU PRÓPRIO ANEL INDEPENDENTE (1 a 11) --- */}
      {/* Elementos aumentados em +50% para alta legibilidade e impacto visual */}
      {/* ============================================================== */}

      {/* ANEL 1: Raio 90px (Sentido Horário - CW) | Ângulo: 0° | Duração: 20s (Mais rápido) */}
      <OrbitNode radius={90} angle={0} duration={20}>
        <div className="w-[42px] h-[42px] rounded-xl bg-[#0b1329]/95 border border-slate-700/80 flex items-center justify-center text-slate-300 shadow-xl">
          <Calculator className="w-[21px] h-[21px]" />
        </div>
      </OrbitNode>

      {/* ANEL 2: Raio 116px (Sentido Anti-Horário - CCW) | Ângulo: 130° | Duração: 24s */}
      <OrbitNode radius={116} angle={130} duration={24} reverse>
        <div className="flex items-center gap-2 bg-[#0b1329]/95 border border-blue-500/40 rounded-full py-1.5 px-4 shadow-xl whitespace-nowrap">
          <ShieldCheck className="w-[21px] h-[21px] text-blue-400 shrink-0" />
          <span className="text-[14px] font-bold text-white tracking-tight">Risco 0%</span>
        </div>
      </OrbitNode>

      {/* ANEL 3: Raio 142px (Sentido Horário - CW) | Ângulo: 260° | Duração: 29s */}
      <OrbitNode radius={142} angle={260} duration={29}>
        <div className="flex items-center gap-1.5 bg-[#0b1329]/95 border border-emerald-500/30 rounded-full py-1 px-3 shadow-lg whitespace-nowrap">
          <TrendingDown className="w-[18px] h-[18px] text-emerald-400 shrink-0" />
          <span className="text-[14px] font-bold text-emerald-400">-12% Carga</span>
        </div>
      </OrbitNode>

      {/* ANEL 4: Raio 168px (Sentido Anti-Horário - CCW) | Ângulo: 35° | Duração: 34s */}
      <OrbitNode radius={168} angle={35} duration={34} reverse>
        <div className="flex items-center gap-2.5 bg-[#0b1329]/95 border border-indigo-500/30 rounded-full py-1.5 px-4 shadow-xl whitespace-nowrap">
          <Activity className="w-[21px] h-[21px] text-indigo-400 shrink-0" />
          <span className="text-[13px] font-bold text-indigo-300 uppercase tracking-wider">Revisão Fiscal</span>
        </div>
      </OrbitNode>

      {/* ANEL 5: Raio 194px (Sentido Horário - CW) | Ângulo: 165° | Duração: 40s */}
      <OrbitNode radius={194} angle={165} duration={40}>
        <div className="w-[42px] h-[42px] rounded-xl bg-[#0b1329]/95 border border-teal-500/30 flex items-center justify-center text-teal-400 shadow-xl">
          <Percent className="w-[21px] h-[21px]" />
        </div>
      </OrbitNode>

      {/* ANEL 6: Raio 220px (Sentido Anti-Horário - CCW) | Ângulo: 295° | Duração: 46s */}
      <OrbitNode radius={220} angle={295} duration={46} reverse>
        <div className="flex items-center gap-3 bg-[#0b1329]/95 border border-emerald-500/40 rounded-2xl py-2 px-5 shadow-2xl whitespace-nowrap">
          <div className="w-[42px] h-[42px] rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div className="leading-tight">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Economia</p>
            <p className="text-[20px] font-bold text-white">R$ 1.25 M</p>
          </div>
        </div>
      </OrbitNode>

      {/* ANEL 7: Raio 246px (Sentido Horário - CW) | Ângulo: 70° | Duração: 53s */}
      <OrbitNode radius={246} angle={70} duration={53}>
        <div className="flex items-center gap-2 bg-[#0b1329]/95 border border-slate-700/80 rounded-xl py-1.5 px-4 shadow-xl whitespace-nowrap">
          <div className="flex items-end gap-1 h-5">
            <div className="w-1.5 bg-slate-600 rounded-t-xs h-1/3" />
            <div className="w-1.5 bg-slate-500 rounded-t-xs h-1/2" />
            <div className="w-1.5 bg-slate-400 rounded-t-xs h-3/4" />
            <div className="w-1.5 bg-emerald-400 rounded-t-xs h-full shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
          </div>
          <span className="text-[13px] font-bold text-slate-300 uppercase tracking-wider">Projeção 2026</span>
        </div>
      </OrbitNode>

      {/* ANEL 8: Raio 272px (Sentido Anti-Horário - CCW) | Ângulo: 200° | Duração: 60s */}
      <OrbitNode radius={272} angle={200} duration={60} reverse>
        <div className="flex items-center gap-2.5 bg-[#0b1329]/95 border border-amber-500/30 rounded-full py-1.5 px-4 shadow-xl whitespace-nowrap">
          <Coins className="w-[21px] h-[21px] text-amber-400 shrink-0" />
          <span className="text-[14px] font-bold text-amber-300">Créditos PIS/COFINS</span>
        </div>
      </OrbitNode>

      {/* ANEL 9: Raio 298px (Sentido Horário - CW) | Ângulo: 330° | Duração: 68s */}
      <OrbitNode radius={298} angle={330} duration={68}>
        <div className="flex items-center gap-2.5 bg-[#0b1329]/95 border border-cyan-500/30 rounded-full py-1.5 px-4 shadow-xl whitespace-nowrap">
          <FileCheck className="w-[21px] h-[21px] text-cyan-400 shrink-0" />
          <span className="text-[14px] font-bold text-cyan-300">CND 100% Regular</span>
        </div>
      </OrbitNode>

      {/* ANEL 10: Raio 324px (Sentido Anti-Horário - CCW) | Ângulo: 100° | Duração: 77s */}
      <OrbitNode radius={324} angle={100} duration={77} reverse>
        <div className="flex items-center gap-3 bg-[#0b1329]/95 border border-teal-500/40 rounded-2xl py-2 px-5 shadow-2xl whitespace-nowrap">
          <div className="w-[42px] h-[42px] rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div className="leading-tight">
            <p className="text-[11px] font-bold text-teal-300 uppercase tracking-wider">Simulação IVA</p>
            <p className="text-[17px] font-bold text-white">Cenário Otimizado</p>
          </div>
        </div>
      </OrbitNode>

      {/* ANEL 11: Raio 350px (Sentido Horário - CW) | Ângulo: 230° | Duração: 86s (Mais lento) */}
      <OrbitNode radius={350} angle={230} duration={86}>
        <div className="flex items-center gap-2.5 bg-[#0b1329]/95 border border-blue-500/40 rounded-full py-1.5 px-4 shadow-2xl whitespace-nowrap">
          <ShieldCheck className="w-[21px] h-[21px] text-blue-400 shrink-0" />
          <span className="text-[14px] font-bold text-blue-300">Blindagem Ativa</span>
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
                transform: `rotate(${-angle}deg) scale(var(--orbit-item-scale, 1))`,
                transformOrigin: 'center center',
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
