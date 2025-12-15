import React, { useState, useEffect, useCallback } from 'react';
import { IconTrendingUp, IconCircleDollar, IconLayers, IconChart, IconArrowRight } from './Icons';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    id: '1',
    title: 'Adequação à Reforma',
    description: 'Prepare-se para o IBS e CBS. Análise preditiva de impacto da unificação tributária no seu ecossistema financeiro.',
    icon: <IconChart className="w-6 h-6 text-cyan-400" />,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'Recuperação de Créditos',
    description: 'Algoritmos avançados para identificação e resgate de ativos fiscais ocultos antes da transição de modelo.',
    icon: <IconCircleDollar className="w-6 h-6 text-cyan-400" />,
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'BPO Financeiro 4.0',
    description: 'Terceirização digital completa. Dashboards em tempo real e conformidade automatizada com as novas regras fiscais.',
    icon: <IconLayers className="w-6 h-6 text-cyan-400" />,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    title: 'Planejamento Estratégico',
    description: 'Navegação inteligente pelo período de transição (2026-2033). Otimização fiscal considerando o novo Imposto Seletivo.',
    icon: <IconTrendingUp className="w-6 h-6 text-cyan-400" />,
    image: 'https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?auto=format&fit=crop&q=80&w=800'
  }
];

export const Services: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  
  // Touch States for Swipe
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  
  // Duplicamos a lista para criar o efeito de loop infinito
  const displayServices = [...services, ...services];

  const openChat = () => {
    window.dispatchEvent(new CustomEvent('open-chat'));
  };

  // Responsive logic strict: 1 for mobile, 2 for tablet, 3 for desktop
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsPerPage(1);
      } else if (width < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lógica do Próximo Slide (Loop Infinito)
  const nextSlide = useCallback(() => {
    // CORREÇÃO: Previne overflow do índice além do ponto de reset.
    // Se já estivermos no "clone" final (index == services.length), 
    // aguardamos o useEffect fazer o reset para 0.
    if (currentIndex >= services.length) return;
    
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev + 1);
  }, [isTransitioning, currentIndex]);

  const prevSlide = () => {
    if (currentIndex === 0) return;
    setCurrentIndex((prev) => prev - 1);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Efeito de "Snap" (Pulo silencioso) para o loop infinito
  useEffect(() => {
    // Quando atingimos o índice que corresponde ao início do clone
    if (currentIndex === services.length) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false); // Desliga animação
        setCurrentIndex(0); // Reseta para o 0 real
      }, 700); // Tempo igual ao da transição CSS

      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  // Religador da transição após o snap
  useEffect(() => {
    if (!isTransitioning) {
      const timeout = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  // Auto-play Logic
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // --- Touch / Swipe Handlers ---
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true); // Pause auto-play on touch
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    
    // Swipe Left (Show Next)
    if (distance > minSwipeDistance) {
      nextSlide();
    } 
    // Swipe Right (Show Prev)
    else if (distance < -minSwipeDistance) {
      prevSlide();
    }
    
    // Reset values
    setTouchStart(0);
    setTouchEnd(0);
    setIsPaused(false); // Resume auto-play
  };

  return (
    <div id="services" className="bg-slate-950 py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-900/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-cyan-400 font-semibold tracking-widest uppercase text-xs mb-3 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-cyan-400"></span>
              Inovação Fiscal
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Soluções do <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Futuro</span>
            </h3>
            <p className="text-slate-400 text-lg">
              Tecnologia de ponta aplicada à inteligência tributária para navegar a nova era econômica.
            </p>
          </div>
        </div>

        {/* Default Carousel View (Search Removed) */}
        <div 
          className="overflow-hidden py-4 w-full touch-pan-y"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="flex w-full"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
              transition: isTransitioning ? 'transform 700ms cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
            }}
          >
            {displayServices.map((service, index) => (
              <div 
                key={`${service.id}-${index}`} 
                className="flex-shrink-0 px-2 md:px-4 box-border"
                style={{ width: `${100 / itemsPerPage}%` }}
              >
                {/* 
                   UPDATED CARD HEIGHT:
                   Changed h-[500px] to h-[420px] on mobile to prevent full-screen occupancy.
                */}
                <div className="group relative h-[420px] md:h-[520px] rounded-2xl overflow-hidden cursor-pointer shadow-xl shadow-black/50 border border-slate-800 hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-2">
                  {/* Image Background */}
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95"></div>
                  
                  {/* Content - Adjusted spacing and sizing for mobile */}
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                    <div className="mb-2 md:mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-slate-800/80 backdrop-blur-md border border-slate-700 flex items-center justify-center mb-4 md:mb-5 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/50 transition-colors">
                        {service.icon}
                      </div>
                      <h4 className="text-xl md:text-3xl font-bold text-white mb-2 md:mb-3">{service.title}</h4>
                      <p className="text-slate-400 text-sm md:text-lg leading-relaxed mb-4 md:mb-6 line-clamp-3 md:line-clamp-4 group-hover:text-slate-300">
                        {service.description}
                      </p>
                      
                      <button onClick={openChat} className="inline-flex items-center text-cyan-400 font-semibold text-xs md:text-sm uppercase tracking-wider group-hover:text-cyan-300 bg-cyan-950/30 py-2 px-4 rounded-full border border-cyan-900/50 hover:bg-cyan-900/50 transition-colors">
                        Explorar Solução <IconArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-2" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 border-2 border-cyan-500/0 rounded-2xl group-hover:border-cyan-500/20 pointer-events-none transition-all duration-200"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar / Dots */}
        <div className="flex justify-center mt-10 gap-3">
            {services.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`h-1.5 transition-all duration-500 rounded-full ${
                  (currentIndex % services.length) === idx 
                    ? 'w-10 bg-cyan-500' 
                    : 'w-3 bg-slate-700 hover:bg-slate-600'
                }`}
                aria-label={`Ir para o slide ${idx + 1}`}
              />
            ))}
        </div>

        {/* --- CHART SECTION (Dark Mode Integration) --- */}
        <div className="mt-32 pt-16 border-t border-slate-800/50">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            
            {/* Context Text */}
            <div className="mb-12 lg:mb-0">
               <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                 Entenda o Impacto da <span className="text-cyan-400">Reforma Tributária</span>
               </h3>
               <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                  A transição para o modelo de IVA Dual (IBS e CBS) simplifica o sistema, mas exige adaptação profunda. Nosso gráfico detalha a composição da nova estrutura tributária, onde quase metade das normas se refere a regimes específicos.
               </p>
               <ul className="space-y-4 text-slate-300">
                 <li className="flex items-start">
                   <span className="w-2 h-2 mt-2 bg-red-500 rounded-full mr-3 flex-shrink-0"></span>
                   <span><strong>Regimes Específicos (48%):</strong> Setores com tratamento diferenciado exigem atenção redobrada.</span>
                 </li>
                 <li className="flex items-start">
                   <span className="w-2 h-2 mt-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                   <span><strong>Normas Gerais (24%):</strong> A base do novo sistema unificado IBS e CBS.</span>
                 </li>
                 <li className="flex items-start">
                   <span className="w-2 h-2 mt-2 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></span>
                   <span><strong>Transição (13%):</strong> Período crucial de adaptação até 2033.</span>
                 </li>
               </ul>
            </div>

            {/* Chart - Adapted for Dark Theme */}
            <div className="relative">
              <div className="bg-slate-900/50 rounded-3xl p-6 md:p-10 border border-slate-800 shadow-2xl relative min-h-[400px] flex items-center justify-center backdrop-blur-sm">
                
                <div className="absolute top-0 left-0 -ml-4 -mt-4 w-24 h-24 bg-blue-500/10 rounded-full z-0 blur-xl"></div>
                <div className="absolute bottom-0 right-0 -mr-4 -mb-4 w-32 h-32 bg-cyan-500/10 rounded-full z-0 blur-xl"></div>

                <div className="relative z-10 w-full max-w-[450px] aspect-square">
                  <h4 className="absolute top-0 left-0 text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 z-20">Estrutura da Reforma</h4>

                  <div className="relative w-full h-full flex items-center justify-center">
                    
                    {/* Circle */}
                    <div className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)] border-4 border-slate-900 relative z-10"
                         style={{
                           background: `conic-gradient(
                             #3b82f6 0% 9%, 
                             #22c55e 9% 33%, 
                             #eab308 33% 46%, 
                             #a855f7 46% 52%, 
                             #ef4444 52% 100%
                           )`
                         }}
                    ></div>

                    {/* Labels - Dark Mode Styled */}
                    <div className="absolute inset-0 hidden md:block pointer-events-none">
                      
                      {/* Revogações */}
                      <div className="absolute top-[5%] right-[30%] flex flex-col items-center transform translate-x-1/2">
                        <div className="bg-slate-800 px-3 py-2 rounded-lg shadow-lg border border-slate-700 border-l-4 border-l-blue-500 mb-1">
                          <p className="text-[10px] font-bold text-slate-300 leading-tight">Revogações e<br/>alterações</p>
                          <p className="text-xs font-bold text-blue-400">9%</p>
                        </div>
                        <div className="h-10 w-px bg-slate-600"></div>
                      </div>

                      {/* Normas */}
                      <div className="absolute top-[25%] -right-[2%] flex items-center">
                        <div className="w-10 h-px bg-slate-600"></div>
                        <div className="bg-slate-800 px-3 py-2 rounded-lg shadow-lg border border-slate-700 border-l-4 border-l-green-500 ml-1">
                          <p className="text-[10px] font-bold text-slate-300 leading-tight">Normas gerais<br/>IBS e CBS</p>
                          <p className="text-xs font-bold text-green-400">24%</p>
                        </div>
                      </div>

                      {/* Transição */}
                      <div className="absolute bottom-[25%] -right-[2%] flex items-center">
                        <div className="w-8 h-px bg-slate-600"></div>
                        <div className="bg-slate-800 px-3 py-2 rounded-lg shadow-lg border border-slate-700 border-l-4 border-l-yellow-500 ml-1">
                          <p className="text-[10px] font-bold text-slate-300 leading-tight">Transição para o<br/>novo modelo</p>
                          <p className="text-xs font-bold text-yellow-500">13%</p>
                        </div>
                      </div>

                      {/* Seletivo */}
                      <div className="absolute bottom-[2%] right-[35%] flex flex-col items-center">
                        <div className="h-8 w-px bg-slate-600"></div>
                        <div className="bg-slate-800 px-3 py-2 rounded-lg shadow-lg border border-slate-700 border-l-4 border-l-purple-500 mt-1">
                          <p className="text-[10px] font-bold text-slate-300 leading-tight">Imposto<br/>Seletivo</p>
                          <p className="text-xs font-bold text-purple-400">6%</p>
                        </div>
                      </div>

                      {/* Regimes */}
                      <div className="absolute top-[40%] -left-[10%] flex items-center justify-end w-[140px]">
                        <div className="bg-slate-800 px-3 py-2 rounded-lg shadow-lg border border-slate-700 border-l-4 border-l-red-500 mr-1 text-right">
                          <p className="text-[10px] font-bold text-slate-300 leading-tight">Regimes específicos e<br/>diferenciados etc.</p>
                          <p className="text-xs font-bold text-red-500">48%</p>
                        </div>
                        <div className="w-6 h-px bg-slate-600"></div>
                      </div>

                    </div>

                  </div>
                </div>
                
                {/* Mobile Legend - Dark Mode */}
                <div className="md:hidden absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-2 text-[10px] text-slate-400">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500"></div><span>Regimes (48%)</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500"></div><span>Normas (24%)</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-yellow-500"></div><span>Transição (13%)</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500"></div><span>Revogações (9%)</span></div>
                  <div className="flex items-center gap-1.5 col-span-2 justify-center"><div className="w-2 h-2 rounded-full bg-purple-500"></div><span>Seletivo (6%)</span></div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};