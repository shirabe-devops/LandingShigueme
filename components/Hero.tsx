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

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-32 pb-20 md:pt-40 md:pb-24 w-full">
        <div className="relative flex flex-col lg:flex-row items-center lg:min-h-[500px]">
          
          {/* Left Column: Text Overlapping */}
          <div className="relative z-10 text-left max-w-2xl mx-auto lg:mx-0 pointer-events-none w-full lg:-mt-32">
            <div className="pointer-events-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight [text-shadow:0_4px_24px_rgba(0,0,0,0.5)]">
                Menos imposto. <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 drop-shadow-md">
                  Mais resultado.
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed [text-shadow:0_2px_10px_rgba(0,0,0,0.8)]">
                Descomplicamos sua gestão tributária para você focar no que importa: <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 font-medium">o crescimento do seu negócio.</span>
              </p>

              <div className="flex flex-col sm:flex-row items-start justify-start gap-4 relative z-30">
                <button 
                  onClick={() => onNavigateSection?.('services')}
                  className="w-full sm:w-auto px-6 py-3 text-sm rounded-full bg-white text-slate-900 font-medium hover:bg-slate-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2"
                >
                  Conheça nossas soluções <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
                  className="w-full sm:w-auto px-6 py-3 text-sm rounded-full bg-slate-800/80 text-white font-medium hover:bg-slate-800 transition-all border border-slate-700 shadow-[0_4px_14px_rgba(0,0,0,0.5)] flex items-center justify-center gap-2 backdrop-blur-md"
                >
                  Falar com especialista
                </button>
              </div>
            </div>
          </div>

          {/* Right Column / Background Orbit Animation */}
          <div className="relative lg:absolute lg:inset-0 flex items-center justify-center lg:justify-end lg:-mr-[10%] w-full mt-4 mb-6 sm:mt-6 sm:mb-8 lg:my-0 h-[310px] sm:h-[360px] lg:h-auto pointer-events-none opacity-100 overflow-visible">
            <div className="pointer-events-auto flex items-center justify-center">
              <TaxOrbit />
            </div>
          </div>
        </div>

        {/* Feature Cards below */}
        <div className="mt-16 sm:mt-20 lg:mt-24 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto w-full relative z-20">
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
