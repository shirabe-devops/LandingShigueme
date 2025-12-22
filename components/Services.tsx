import React from 'react';
import { MorphingCardStack, type CardData } from './ui/morphing-card-stack';
import { BarChart3, Coins, ClipboardList, TrendingUp, Sprout } from 'lucide-react';

const serviceCards: CardData[] = [
  {
    id: "diagnostico-contabil",
    title: "Diagnóstico Contábil",
    description: "Investigação minuciosa para mapear a posição empresarial, identificar gargalos operacionais e implementar inteligência gerencial.",
    icon: <ClipboardList className="h-6 w-6" />,
  },
  {
    id: "adequacao-reforma",
    title: "Adequação à Reforma",
    description: "Prepare-se para o IBS e CBS. Análise preditiva de impacto da unificação tributária no seu ecossistema financeiro para 2026.",
    icon: <BarChart3 className="h-6 w-6" />,
  },
  {
    id: "recuperacao-creditos",
    title: "Recuperação de Créditos",
    description: "Algoritmos avançados para identificação e resgate de ativos fiscais ocultos e verbas previdenciárias indevidas.",
    icon: <Coins className="h-6 w-6" />,
  },
  {
    id: "agro-intelligence",
    title: "Soluções para o Agro",
    description: "Gestão técnica de LCDPR, ITR e planejamento para o produtor rural. Transformando a lida no campo em eficiência fiscal.",
    icon: <Sprout className="h-6 w-6" />,
  },
  {
    id: "planejamento-estrategico",
    title: "Planejamento Estratégico",
    description: "Engenharia societária para a menor carga tributária possível, alinhada à legislação vigente e tendências fiscais.",
    icon: <TrendingUp className="h-6 w-6" />,
  },
];

interface ServicesProps {
  onSelectService?: (id: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <div id="services" className="bg-slate-950 py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-cyan-400 font-semibold tracking-widest uppercase text-xs mb-3 flex items-center justify-center md:justify-start gap-2">
            <span className="w-8 h-[1px] bg-cyan-400"></span>
            Especialidades Tributárias
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
            Nossas <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Soluções</span>
          </h3>
        </div>

        {/* Morphing Card Stack Section */}
        <div className="w-full flex justify-center items-center py-2">
          <MorphingCardStack 
            cards={serviceCards} 
            className="w-full" 
            onCardClick={(card) => onSelectService?.(card.id)}
          />
        </div>
      </div>
    </div>
  );
};