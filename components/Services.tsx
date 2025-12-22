import React from 'react';
import { ThreeDPhotoCarousel } from './ui/3d-carousel';

export const Services: React.FC = () => {
  return (
    <div id="services" className="bg-slate-950 py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-cyan-400 font-semibold tracking-widest uppercase text-xs mb-3 flex items-center justify-center md:justify-start gap-2">
            <span className="w-8 h-[1px] bg-cyan-400"></span>
            Nossas Soluções
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Ecossistema de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Inteligência</span>
          </h3>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto md:mx-0">
            Navegue por nossas verticais de atuação através da nossa vitrine interativa. Clique em uma solução para detalhes ou arraste para girar.
          </p>
        </div>

        {/* 3D Carousel Section */}
        <div className="w-full mt-8">
          <div className="min-h-[400px] md:min-h-[500px] flex flex-col justify-center border border-slate-800/50 rounded-3xl bg-slate-900/20 backdrop-blur-sm p-4 md:p-8">
            <ThreeDPhotoCarousel />
          </div>
        </div>

        {/* Quick List of Services below the carousel for context */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 border-t border-slate-800 pt-12">
           <div className="group cursor-default">
              <h4 className="text-white font-bold mb-2 group-hover:text-cyan-400 transition-colors">Reforma 2026</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Transição suave para o IVA Dual (IBS/CBS).</p>
           </div>
           <div className="group cursor-default">
              <h4 className="text-white font-bold mb-2 group-hover:text-cyan-400 transition-colors">Recuperação</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Algoritmos para resgate de créditos fiscais.</p>
           </div>
           <div className="group cursor-default">
              <h4 className="text-white font-bold mb-2 group-hover:text-cyan-400 transition-colors">BPO 4.0</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Gestão financeira digital e automatizada.</p>
           </div>
           <div className="group cursor-default">
              <h4 className="text-white font-bold mb-2 group-hover:text-cyan-400 transition-colors">Estratégico</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Blindagem e eficiência na carga tributária.</p>
           </div>
        </div>
      </div>
    </div>
  );
};
