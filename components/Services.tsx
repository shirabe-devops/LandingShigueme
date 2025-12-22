import React from 'react';
import { StickyScroll } from './ui/sticky-scroll-reveal';
import { IconChart, IconCircleDollar, IconLayers, IconTrendingUp } from './Icons';

const content = [
  {
    title: "Adequação à Reforma",
    description:
      "Prepare-se para o IBS e CBS. Realizamos uma análise preditiva detalhada do impacto da unificação tributária no seu ecossistema financeiro, garantindo que sua empresa esteja pronta para a transição fiscal de 2026.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" 
          alt="Adequação à Reforma" 
          className="h-full w-full object-cover"
        />
      </div>
    ),
  },
  {
    title: "Recuperação de Créditos",
    description:
      "Nossos algoritmos avançados identificam e resgatam ativos fiscais ocultos. Através de uma auditoria digital minuciosa, recuperamos valores pagos indevidamente, injetando caixa imediato na sua operação.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800" 
          alt="Recuperação de Créditos" 
          className="h-full w-full object-cover"
        />
      </div>
    ),
  },
  {
    title: "BPO Financeiro 4.0",
    description:
      "Terceirização digital completa para sua retaguarda financeira. Oferecemos dashboards em tempo real e conformidade automatizada, permitindo que você foque no crescimento do seu negócio enquanto cuidamos da gestão.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" 
          alt="BPO Financeiro" 
          className="h-full w-full object-cover"
        />
      </div>
    ),
  },
  {
    title: "Planejamento Estratégico",
    description:
      "Navegação inteligente pelo período de transição (2026-2033). Otimizamos sua carga tributária considerando as novas regras do Imposto Seletivo e a desoneração de investimentos.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?auto=format&fit=crop&q=80&w=800" 
          alt="Planejamento Estratégico" 
          className="h-full w-full object-cover"
        />
      </div>
    ),
  },
];

export const Services: React.FC = () => {
  return (
    <div id="services" className="bg-slate-950 py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16">
          <h2 className="text-cyan-400 font-semibold tracking-widest uppercase text-xs mb-3 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-cyan-400"></span>
            Inovação Fiscal
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Soluções do <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Futuro</span>
          </h3>
          <p className="text-slate-400 text-lg max-w-2xl">
            Tecnologia de ponta aplicada à inteligência tributária para navegar a nova era econômica com segurança e eficiência.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden">
          <StickyScroll content={content} />
        </div>
      </div>
    </div>
  );
};
