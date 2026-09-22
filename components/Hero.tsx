import React, { useEffect, useState } from 'react';
import { ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { TaxOrbit } from './ui/tax-orbit';

interface HeroProps {
  onNavigateSection?: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigateSection }) => {
  return (
    <section id="hero" className="w-full relative min-h-screen bg-[#060913] flex flex-col justify-center overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-36 md:pb-24 w-full">
        <div className="relative flex flex-col lg:flex-row items-center justify-between min-h-[auto] lg:min-h-[500px]">
          
          {/* Top Stage on Mobile (50%) / Left Column on Desktop */}
          <div className="relative z-20 text-center lg:text-left max-w-xl mx-auto lg:mx-0 w-full mb-2 sm:mb-4 lg:mb-0 lg:-mt-24">
            <h1 className="text-[28px] sm:text-3xl md:text-5xl font-extrabold text-white mb-2.5 sm:mb-4 tracking-tight leading-[1.15]">
              Menos imposto.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-teal-300">
                Mais resultado.
              </span>
            </h1>
            
            <p className="text-[14px] sm:text-base md:text-lg text-slate-300 mb-4 sm:mb-6 leading-relaxed max-w-md mx-auto lg:mx-0">
              Descomplicamos sua gestão tributária para você focar no que importa:{" "}
              <span className="text-white font-medium">o crescimento do seu negócio.</span>
            </p>

            <div className="flex flex-row flex-wrap sm:flex-nowrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 relative z-30 max-w-md mx-auto lg:mx-0">
              <button 
                onClick={() => onNavigateSection?.('services')}
                className="flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm rounded-full bg-white text-slate-900 font-semibold hover:bg-slate-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.12)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 whitespace-nowrap"
              >
                Conheça soluções <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
                className="flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm rounded-full bg-slate-900/90 text-slate-200 font-medium hover:bg-slate-800 transition-all border border-slate-700/80 shadow-[0_2px_12px_rgba(0,0,0,0.4)] flex items-center justify-center gap-1.5 backdrop-blur-md cursor-pointer active:scale-95 whitespace-nowrap"
              >
                Falar com especialista
              </button>
            </div>
          </div>

          {/* Bottom Stage on Mobile (50%) / Right Column on Desktop */}
          <div className="relative lg:absolute lg:inset-0 flex items-center justify-center lg:justify-end lg:-mr-[10%] w-full h-[270px] sm:h-[310px] lg:h-auto pointer-events-none opacity-100 overflow-visible z-10 my-1 sm:my-2 lg:my-0">
            <div className="pointer-events-auto flex items-center justify-center">
              <TaxOrbit />
            </div>
          </div>

        </div>

        {/* Feature Cards below */}
        <div className="mt-8 sm:mt-12 lg:mt-24 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto w-full relative z-20">
          <div className="bg-[#0f172a]/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800 text-center flex flex-col items-center">
            <div className="w-10 h-10 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Agilidade</h3>
            <p className="text-sm text-slate-400">Respostas rápidas e execuções diretas ao ponto. Sem enrolação.</p>
          </div>
          
          <div className="bg-[#0f172a]/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800 text-center flex flex-col items-center">
            <div className="w-10 h-10 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Conveniência</h3>
            <p className="text-sm text-slate-400">Nós assumimos a burocracia. Você recebe as soluções prontas na mão.</p>
          </div>
          
          <div className="bg-[#0f172a]/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800 text-center flex flex-col items-center">
            <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Segurança</h3>
            <p className="text-sm text-slate-400">Blindagem fiscal e compliance total para proteger o seu patrimônio.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
