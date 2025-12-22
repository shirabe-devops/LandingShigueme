import React, { useEffect } from 'react';
import { BarChart3, Coins, ClipboardList, TrendingUp, Sprout, ArrowLeft } from 'lucide-react';

interface ServiceDetailPageProps {
  serviceId: string;
  onBack: () => void;
}

interface ServiceDetail {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  icon: React.ReactNode;
  color: string;
}

const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  'adequacao-reforma': {
    id: 'adequacao-reforma',
    title: 'Adequação à Reforma Tributária',
    subtitle: 'Navegando pela Transição para o IVA Dual (IBS e CBS)',
    description: 'Prepare sua empresa para o maior marco fiscal da história recente do Brasil.',
    longDescription: 'A Reforma Tributária aprovada introduz o IVA Dual, unificando tributos federais (PIS/COFINS/IPI) na CBS e estaduais/municipais (ICMS/ISS) no IBS. Esta transição, que inicia em 2026 e se completa em 2033, exige uma revisão profunda dos processos de compra, precificação e logística.',
    icon: <BarChart3 className="h-12 w-12" />,
    color: 'blue'
  },
  'recuperacao-creditos': {
    id: 'recuperacao-creditos',
    title: 'Recuperação de Créditos',
    description: 'Recupere valores pagos indevidamente e injete caixa imediato no seu negócio.',
    subtitle: 'Inteligência Administrativa para Ativos Fiscais',
    longDescription: 'Muitas empresas recolhem tributos sobre bases de cálculo incorretas. Nossa metodologia foca na recuperação administrativa de créditos de PIS, COFINS, ICMS e encargos previdenciários, utilizando tecnologia para cruzar milhares de dados em segundos.',
    icon: <Coins className="h-12 w-12" />,
    color: 'cyan'
  },
  'diagnostico-contabil': {
    id: 'diagnostico-contabil',
    title: 'Diagnóstico Contábil e Financeiro',
    description: 'Mapeamento estratégico para decisões mais assertivas e processos otimizados.',
    subtitle: 'Mapeamento Estratégico e Otimização de Processos',
    longDescription: 'Realizamos uma investigação minuciosa dos processos contábeis e financeiros da sua empresa, coletando e analisando informações estratégicas para mapear a real posição empresarial. Por meio deste diagnóstico, identificamos pontos críticos e oportunidades, recomendando a adoção de ferramentas tecnológicas integradas que otimizem seus processos operacionais, além de propor melhorias na estrutura estratégica e implementar soluções de inteligência gerencial para suportar decisões mais assertivas.',
    icon: <ClipboardList className="h-12 w-12" />,
    color: 'indigo'
  },
  'agro-intelligence': {
    id: 'agro-intelligence',
    title: 'Soluções para o Agronegócio',
    description: 'Consultoria especializada para produtores rurais e empresas do setor agro.',
    subtitle: 'Gestão Rural, LCDPR e Estratégia Tributária no Campo',
    longDescription: 'O agronegócio possui particularidades que exigem um olhar especializado. Atuamos na elaboração e revisão do Livro Caixa Digital do Produtor Rural (LCDPR), otimização do ITR e planejamento para a exportação de commodities. Nosso foco é garantir que o produtor aproveite todos os incentivos fiscais do setor, mantendo a conformidade absoluta com as normas do INCRA e da Receita Federal.',
    icon: <Sprout className="h-12 w-12" />,
    color: 'emerald'
  },
  'planejamento-estrategico': {
    id: 'planejamento-estrategico',
    title: 'Planejamento Estratégico',
    description: 'Estruturação inteligente para a menor carga tributária possível dentro da lei.',
    subtitle: 'Engenharia Tributária e Societária',
    longDescription: 'O planejamento tributário é uma ferramenta de sobrevivência. Analisamos a estrutura societária e operacional para identificar o regime mais vantajoso (Simples, Presumido ou Real) e incentivos fiscais específicos do setor.',
    icon: <TrendingUp className="h-12 w-12" />,
    color: 'blue'
  }
};

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ serviceId, onBack }) => {
  const detail = SERVICE_DETAILS[serviceId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  if (!detail) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans pb-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className={`absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-${detail.color}-900/10 rounded-full blur-[120px]`}></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Voltar para Serviços</span>
          </button>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className={`p-6 rounded-3xl bg-slate-900 border border-slate-800 text-${detail.color}-400 shadow-2xl shrink-0`}>
              {detail.icon}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                {detail.title}
              </h1>
              <p className={`text-xl font-medium text-${detail.color}-400/80 mb-6`}>
                {detail.subtitle}
              </p>
              <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
                {detail.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simplified Content Section: Only Visão Geral */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900/30 border border-slate-800/50 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className={`w-1.5 h-8 bg-${detail.color}-500 rounded-full`}></span>
              Visão Geral
            </h2>
            <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed">
              <p className="whitespace-pre-line">
                {detail.longDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 mt-8 flex justify-center">
         <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors group px-6 py-3 rounded-full hover:bg-white/5 border border-transparent hover:border-slate-800"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Explorar outras soluções</span>
          </button>
      </div>
    </div>
  );
};