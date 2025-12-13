import React, { useState, useEffect } from 'react';
import { IconCheck, IconTrendingUp, IconCalculator, IconCircleDollar, IconShield, IconChart, IconLayers } from './Icons';

export const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Dados Estruturados (Schema Markup)
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "name": "Shigueme Consultoria Tributária",
    "image": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2072&auto=format&fit=crop",
    "description": "Especialistas em Reforma Tributária, IVA Dual (IBS e CBS) e BPO Financeiro.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "São Paulo",
      "addressRegion": "SP",
      "addressCountry": "BR"
    },
    "priceRange": "$$"
  };

  const baseTransition = "transition-all duration-1000 ease-out transform";
  const hiddenState = "opacity-0 translate-y-8";
  const visibleState = "opacity-100 translate-y-0";

  // Shared Button Component to avoid code duplication in render
  const ActionButtons = ({ className }: { className?: string }) => (
    <div className={`${baseTransition} delay-[600ms] ${isVisible ? visibleState : hiddenState} ${className}`}>
      <a 
        href="#contact" 
        className="group relative w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg rounded-xl shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_50px_rgba(37,99,235,0.5)] transition-all overflow-hidden border border-blue-400/20 text-center"
      >
        <span className="relative z-10 flex items-center justify-center">
          Agendar Diagnóstico
        </span>
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
      </a>
      
      <a 
        href="#services" 
        className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold text-lg rounded-xl hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-md flex items-center justify-center shadow-lg text-center"
      >
        Nossos Serviços
      </a>
    </div>
  );

  return (
    <div id="home" className="relative min-h-[100dvh] flex items-center bg-slate-950 overflow-hidden pt-28 pb-12 lg:pt-0 lg:pb-0">
      <style>{`
        @keyframes orbit-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-ccw {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes counter-rotate-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes counter-rotate-ccw {
          from { transform: rotate(-360deg); }
          to { transform: rotate(0deg); }
        }
        
        .animate-orbit-cw { animation: orbit-cw 60s linear infinite; }
        .animate-orbit-ccw { animation: orbit-ccw 50s linear infinite; }
        
        /* Itens dentro do anel horário devem girar anti-horário para ficar em pé */
        .animate-item-fix-cw { animation: counter-rotate-cw 60s linear infinite; }
        
        /* Itens dentro do anel anti-horário devem girar horário */
        .animate-item-fix-ccw { animation: counter-rotate-ccw 50s linear infinite; }

        .orbit-system:hover .animate-orbit-cw,
        .orbit-system:hover .animate-orbit-ccw,
        .orbit-system:hover .animate-item-fix-cw,
        .orbit-system:hover .animate-item-fix-ccw {
          animation-play-state: paused;
        }
      `}</style>

      {/* SEO */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} 
      />

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-blue-600/05 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-600/05 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>
        
        {/* Grid Background Subtle */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          
          {/* Left Column: Text Content */}
          <div className="text-center lg:text-left relative z-30 mb-8 lg:mb-0">
            
            <div className={`${baseTransition} ${isVisible ? visibleState : hiddenState} inline-flex items-center justify-center lg:justify-start px-4 py-2 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-sm font-semibold mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.1)]`}>
              <span className="relative flex h-2 w-2 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Prontos para a Reforma Tributária 2026
            </div>

            <h1 className={`${baseTransition} delay-200 ${isVisible ? visibleState : hiddenState} text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6`}>
              Inteligência <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-white animate-pulse-slow">Tributária</span> para o seu Negócio.
            </h1>

            <p className={`${baseTransition} delay-[400ms] ${isVisible ? visibleState : hiddenState} text-lg text-slate-400 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0`}>
              Transforme a complexidade fiscal em vantagem competitiva. 
              Auditoria, compliance e planejamento estratégico para maximizar seus lucros.
            </p>

            {/* DESKTOP BUTTONS (Hidden on mobile/tablet) */}
            <ActionButtons className="hidden lg:flex flex-row gap-5 justify-start items-center w-full mb-10" />

            <div className={`${baseTransition} delay-[800ms] ${isVisible ? visibleState : hiddenState} flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-slate-500 text-sm font-medium border-t border-white/5 pt-8`}>
               <div className="flex items-center gap-2">
                  <div className="p-1 rounded-full bg-green-500/10 border border-green-500/20">
                    <IconCheck className="w-4 h-4 text-green-500" />
                  </div>
                  <span>Compliance Fiscal 100%</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="p-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                    <IconTrendingUp className="w-4 h-4 text-blue-500" />
                  </div>
                  <span>Recuperação de Créditos</span>
               </div>
            </div>

          </div>

          {/* Right Column: Abstract Calculation Orbit System */}
          <div className={`relative ${baseTransition} delay-[1000ms] ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'} flex items-center justify-center h-[380px] sm:h-[450px] lg:h-[600px] w-full overflow-visible`}>
             
             {/* 
                 ORBIT SYSTEM CONTAINER 
                 Scaled specifically for responsive devices to ensure the animation fits everywhere.
                 UPDATED: Mobile scale increased from 0.6 to 0.75 for better visibility.
             */}
             <div className="relative w-[500px] h-[500px] orbit-system scale-[0.75] sm:scale-[0.9] lg:scale-100 transition-transform duration-500 origin-center">
                
                {/* 1. The Center Point (Void/Crosshair) - No Heavy Anchor */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4">
                   <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20"></div>
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                   {/* Crosshairs */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[200px] bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"></div>
                </div>

                {/* 2. Inner Ring (Mathematical/Symbols) - Counter-Clockwise */}
                <div className="absolute inset-[15%] rounded-full border border-slate-800/60 animate-orbit-ccw">
                    <div className="absolute inset-0 rounded-full border border-dashed border-slate-700/30 opacity-50"></div>
                    
                    {/* Math Symbols Floating */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="animate-item-fix-ccw bg-slate-900/50 p-2 rounded-lg border border-slate-700 text-cyan-400 font-mono text-xs shadow-lg backdrop-blur-sm">
                            %
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                        <div className="animate-item-fix-ccw bg-slate-900/50 p-2 rounded-lg border border-slate-700 text-purple-400 font-mono text-xs shadow-lg backdrop-blur-sm">
                            Σ
                        </div>
                    </div>
                    <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2">
                        <div className="animate-item-fix-ccw bg-slate-900/50 p-2 rounded-lg border border-slate-700 text-green-400 font-mono text-xs shadow-lg backdrop-blur-sm">
                            $
                        </div>
                    </div>
                     <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
                        <div className="animate-item-fix-ccw bg-slate-900/50 p-2 rounded-lg border border-slate-700 text-blue-400 font-mono text-xs shadow-lg backdrop-blur-sm">
                            <IconCalculator className="w-3 h-3" />
                        </div>
                    </div>
                </div>

                {/* 3. Outer Ring (Main Widgets) - Clockwise */}
                <div className="absolute inset-0 rounded-full border border-slate-800 animate-orbit-cw">
                    
                    {/* Decorative Arc on Ring */}
                    <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-1/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_10px_#06b6d4]"></div>
                    <div className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-1/4 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_10px_#3b82f6]"></div>

                    {/* Widget 1: Economia (Top Right) */}
                    <div className="absolute top-[8%] right-[8%]">
                       <div className="animate-item-fix-cw bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-700/50 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex items-center gap-3 w-48 hover:border-green-500/50 transition-colors">
                           <div className="bg-green-500/20 p-2.5 rounded-xl shrink-0">
                             <IconCircleDollar className="w-5 h-5 text-green-400" />
                           </div>
                           <div>
                             <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Economia Anual</p>
                             <p className="text-white font-bold text-lg">R$ 1.25 M</p>
                           </div>
                       </div>
                    </div>

                    {/* NEW WIDGET: Tax Burden Reduction (Top Left) */}
                    <div className="absolute top-[18%] left-[5%]">
                       <div className="animate-item-fix-cw bg-slate-900/80 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-700/50 shadow-lg flex flex-col items-center gap-1 w-24 hover:scale-105 transition-transform cursor-default">
                           <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Carga Efetiva</span>
                           <div className="flex items-center gap-1 text-green-400">
                               <IconTrendingUp className="w-3 h-3 rotate-180" />
                               <span className="text-sm font-bold">-12%</span>
                           </div>
                       </div>
                    </div>

                    {/* Widget 2: Planejamento (Left) */}
                    <div className="absolute top-1/2 -left-6 -translate-y-1/2">
                       <div className="animate-item-fix-cw bg-slate-900/90 backdrop-blur-xl p-3 rounded-xl border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)] flex flex-col gap-2 w-40 hover:scale-105 transition-transform">
                          <div className="flex items-center gap-2 border-b border-slate-700/50 pb-2">
                            <IconLayers className="w-4 h-4 text-cyan-400" />
                            <span className="text-cyan-100 text-xs font-bold">Simulação IVA</span>
                          </div>
                          <div className="flex justify-between items-center">
                             <span className="text-[10px] text-slate-400">Cenário</span>
                             <span className="text-xs text-green-400 font-mono font-bold">OTIMIZADO</span>
                          </div>
                       </div>
                    </div>

                    {/* Widget 3: Compliance/Shield (Bottom Left) */}
                    <div className="absolute bottom-[10%] left-[10%]">
                       <div className="animate-item-fix-cw bg-slate-800/80 backdrop-blur-md px-4 py-3 rounded-full border border-slate-600/50 shadow-xl flex items-center gap-3">
                           <div className="bg-blue-500 rounded-full p-1">
                               <IconShield className="w-3 h-3 text-white" />
                           </div>
                           <div className="flex flex-col">
                               <span className="text-[10px] text-slate-300 uppercase font-semibold">Risco Fiscal</span>
                               <span className="text-white text-xs font-bold">0% Detectado</span>
                           </div>
                       </div>
                    </div>

                    {/* NEW WIDGET: AI Audit (Bottom Right) */}
                    <div className="absolute bottom-[20%] right-[5%]">
                         <div className="animate-item-fix-cw bg-slate-800/90 backdrop-blur-md p-2 rounded-xl border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)] flex items-center gap-2">
                             <div className="relative w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                                <IconChart className="w-4 h-4 text-purple-400" />
                                <div className="absolute inset-0 border border-purple-400/30 rounded-full animate-ping"></div>
                             </div>
                             <div className="flex flex-col">
                                 <span className="text-[8px] text-purple-200 uppercase font-bold">Auditoria IA</span>
                                 <span className="text-[10px] text-white font-mono animate-pulse">EM PROCESSO...</span>
                             </div>
                         </div>
                    </div>

                    {/* Widget 4: Graph (Right Center) */}
                    <div className="absolute top-1/2 -right-4 -translate-y-1/2">
                       <div className="animate-item-fix-cw bg-slate-900/80 backdrop-blur-md p-3 rounded-xl border border-slate-700/50 shadow-xl">
                          <div className="flex items-end gap-1.5 h-10 mb-1 border-b border-slate-700 pb-1 w-full justify-center">
                            <div className="w-2.5 bg-slate-700 h-[40%] rounded-t-sm"></div>
                            <div className="w-2.5 bg-slate-600 h-[60%] rounded-t-sm"></div>
                            <div className="w-2.5 bg-slate-500 h-[80%] rounded-t-sm"></div>
                            <div className="w-2.5 bg-gradient-to-t from-green-600 to-green-400 h-[100%] rounded-t-sm shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                          </div>
                          <p className="text-[9px] text-slate-400 text-center font-mono mt-1">PROJEÇÃO 2026</p>
                      </div>
                    </div>

                </div>

                {/* Decorative Elements around Orbit */}
                <div className="absolute top-0 right-0 w-2 h-2 bg-blue-500/50 rounded-full animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 bg-cyan-500/50 rounded-full animate-pulse delay-700"></div>

             </div>
          </div>

          {/* MOBILE/TABLET BUTTONS (Visible on mobile/tablet, hidden on desktop) 
              Placed here to appear visually below the animation on small screens */}
          <ActionButtons className="flex lg:hidden flex-col sm:flex-row gap-5 justify-center items-center w-full mt-4" />

        </div>
      </div>
    </div>
  );
};