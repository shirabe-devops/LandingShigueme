
import React, { useEffect } from 'react';
import { BarChart3, Coins, ClipboardList, TrendingUp, Sprout, ArrowLeft, ArrowRight } from 'lucide-react';

interface ServiceDetailPageProps {
  serviceId: string;
  onBack: () => void;
  onNavigateToService?: (id: string) => void;
}

interface ServiceDetail {
  id: string;
  title: string;
  shortTitle: string;
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
    shortTitle: 'Reforma Tributária',
    subtitle: 'Navegando pela Transição para o IVA Dual (IBS e CBS)',
    description: 'Prepare sua empresa para o maior marco fiscal da história recente do Brasil.',
    longDescription: 'A Reforma Tributária aprovada introduz o IVA Dual, unificando tributos federais (PIS/COFINS/IPI) na CBS e estaduais/municipais (ICMS/ISS) no IBS. Esta transição, que inicia em 2026 e se completa em 2033, exige uma revisão profunda dos processos de compra, precificação e logística.',
    icon: <BarChart3 className="h-6 w-6 md:h-12 md:w-12" />,
    color: 'blue'
  },
  'recuperacao-creditos': {
    id: 'recuperacao-creditos',
    title: 'Recuperação de Créditos',
    shortTitle: 'Recuperação Créditos',
    description: 'Recupere valores pagos indevidamente e injete caixa imediato no seu negócio.',
    subtitle: 'Inteligência Administrativa para Ativos Fiscais',
    longDescription: 'Muitas empresas recolhem tributos sobre bases de cálculo incorretas. Nossa metodologia foca na recuperação administrativa de créditos de PIS, COFINS, ICMS e encargos previdenciários, utilizando tecnologia para cruzar milhares de dados em segundos.',
    icon: <Coins className="h-6 w-6 md:h-12 md:w-12" />,
    color: 'cyan'
  },
  'consultoria-contabil': {
    id: 'consultoria-contabil',
    title: 'Consultoria Contábil e Financeira',
    shortTitle: 'Consultoria Contábil',
    description: 'Mapeamento estratégico para decisões mais assertivas e processos otimizados.',
    subtitle: 'Consultoria Estratégica e Otimização de Processos',
    longDescription: 'Realizamos uma investigação minuciosa dos processos contábeis e financeiros da sua empresa, coletando e analisando informações estratégicas para mapear a real posição empresarial. Por meio desta consultoria, identificamos pontos críticos e oportunidades, recomendando a adoção de ferramentas tecnológicas integradas que otimizem seus processos operacionais, além de propor melhorias na estrutura estratégica e implementar soluções de inteligência gerencial para suportar decisões mais assertivas.',
    icon: <ClipboardList className="h-6 w-6 md:h-12 md:w-12" />,
    color: 'indigo'
  },
  'agro-intelligence': {
    id: 'agro-intelligence',
    title: 'Soluções para o Agronegócio',
    shortTitle: 'Soluções Agro',
    description: 'Consultoria especializada para produtores rurais e empresas do setor agro.',
    subtitle: 'Gestão Rural, LCDPR e Estratégia Tributária no Campo',
    longDescription: 'O agronegócio possui particularidades que exigem um olhar especializado. Atuamos na elaboração e revisão do Livro Caixa Digital do Produtor Rural (LCDPR), otimização do ITR e planejamento para a exportação de commodities. Nosso foco é garantir que o produtor aproveite todos os incentivos fiscais do setor, mantendo a conformidade absoluta com as normas do INCRA e da Receita Federal.',
    icon: <Sprout className="h-6 w-6 md:h-12 md:w-12" />,
    color: 'emerald'
  },
  'planejamento-estrategico': {
    id: 'planejamento-estrategico',
    title: 'Planejamento Estratégico',
    shortTitle: 'Plan. Estratégico',
    description: 'Estruturação inteligente para a menor carga tributária possível dentro da lei.',
    subtitle: 'Engenharia Tributária e Societária',
    longDescription: 'O planejamento tributário é uma ferramenta de sobrevivência. Analisamos a estrutura societária e operacional para identificar o regime mais vantajoso (Simples, Presumido ou Real) e incentivos fiscais específicos do setor.',
    icon: <TrendingUp className="h-6 w-6 md:h-12 md:w-12" />,
    color: 'blue'
  }
};

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ serviceId, onBack, onNavigateToService }) => {
  const detail = SERVICE_DETAILS[serviceId];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [serviceId]);

  if (!detail) return null;

  const otherServices = Object.values(SERVICE_DETAILS).filter(s => s.id !== serviceId);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans pb-10">
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
            <span>Voltar para Início</span>
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

      {/* Content Section */}
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

      {/* Modern Service Navigator */}
      <section className="py-12 px-4 border-t border-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
             <div>
                <h3 className="text-2xl font-bold text-white">Explorar outras soluções</h3>
                <p className="text-slate-500 text-sm">Conheça mais serviços da Shigueme Consultoria</p>
             </div>
             <button 
                onClick={onBack}
                className="text-blue-400 hover:text-blue-300 font-semibold text-sm flex items-center gap-1 group"
             >
                Ver todos na Home <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherServices.map((service) => (
              <button
                key={service.id}
                onClick={() => onNavigateToService?.(service.id)}
                className="relative group bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:border-blue-500/50 hover:bg-slate-900 transition-all text-left overflow-hidden"
              >
                {/* Glow Effect */}
                <div className={`absolute -right-4 -top-4 w-20 h-20 bg-${service.color}-500/10 rounded-full blur-2xl group-hover:bg-${service.color}-500/20 transition-all`}></div>
                
                <div className={`mb-4 text-${service.color}-400 group-hover:scale-110 transition-transform origin-left`}>
                   {/* Fix: Casting React.ReactNode to React.ReactElement with className prop to satisfy TypeScript */}
                   {React.cloneElement(service.icon as React.ReactElement<{ className?: string }>, { className: 'w-6 h-6' })}
                </div>
                
                <h4 className="font-bold text-white text-sm mb-2 group-hover:text-blue-400 transition-colors">
                  {service.shortTitle}
                </h4>
                
                <p className="text-slate-500 text-[10px] leading-tight line-clamp-2">
                  {service.description}
                </p>

                <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  SAIBA MAIS <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
