
import React, { useEffect } from 'react';
import { BarChart3, Coins, ClipboardList, TrendingUp, Sprout, ArrowLeft, ArrowRight } from 'lucide-react';

interface ServiceDetailPageProps {
  serviceId: string;
  onBack?: () => void;
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
    title: 'Transição Tributária sem Estresse',
    shortTitle: 'Reforma Tributária',
    subtitle: 'Navegamos pela complexidade para você focar no que importa.',
    description: 'Sua empresa pronta para o novo IVA Dual (IBS e CBS) com total segurança e conveniência.',
    longDescription: 'A adequação à Reforma Tributária não precisa ser uma dor de cabeça. Nós cuidamos de toda a transição do antigo sistema (PIS, COFINS, IPI, ICMS, ISS) para o novo formato, analisando o impacto nos seus preços, custos e margens. Entregamos soluções prontas, garantindo que você tenha a melhor experiência e tranquilidade durante esta mudança histórica.',
    icon: <BarChart3 className="h-6 w-6 md:h-12 md:w-12" />,
    color: 'indigo'
  },
  'recuperacao-creditos': {
    id: 'recuperacao-creditos',
    title: 'Injeção de Caixa Descomplicada',
    shortTitle: 'Recuperação de Créditos',
    description: 'Uma solução inteligente para recuperar valores e fortalecer seu capital de giro.',
    subtitle: 'Identificamos oportunidades ocultas no seu histórico.',
    longDescription: 'Através de tecnologia e análise profunda, auditamos as bases de cálculo dos seus tributos passados para identificar pagamentos indevidos. O processo é totalmente conduzido por nossa equipe, exigindo o mínimo de esforço da sua parte. O resultado é a recuperação ágil de créditos, trazendo fôlego financeiro imediato para sua empresa.',
    icon: <Coins className="h-6 w-6 md:h-12 md:w-12" />,
    color: 'emerald'
  },
  'consultoria-contabil': {
    id: 'consultoria-contabil',
    title: 'Gestão Financeira Inteligente',
    shortTitle: 'Consultoria Contábil',
    description: 'Simplificamos seus números para que você tenha o controle total do seu negócio.',
    subtitle: 'Clareza e precisão para decisões mais seguras.',
    longDescription: 'Transformamos dados complexos em painéis intuitivos e recomendações práticas. Nossa consultoria vai além dos números: diagnosticamos gargalos, sugerimos melhorias em processos e implementamos ferramentas tecnológicas que trazem eficiência e conveniência para o seu dia a dia. Você ganha tempo e segurança para liderar.',
    icon: <ClipboardList className="h-6 w-6 md:h-12 md:w-12" />,
    color: 'blue'
  },
  'agro-intelligence': {
    id: 'agro-intelligence',
    title: 'Tranquilidade no Campo',
    shortTitle: 'Soluções Agro',
    description: 'Cuidamos da sua conformidade fiscal para você focar na sua safra.',
    subtitle: 'Proteção e eficiência para o produtor rural.',
    longDescription: 'O agronegócio exige soluções específicas e ágeis. Nossa equipe cuida de obrigações como o Livro Caixa Digital do Produtor Rural (LCDPR), gestão do ITR e planejamento para exportações, garantindo que você aproveite todos os benefícios fiscais disponíveis. Uma experiência sem burocracia, pensada para trazer paz de espírito ao produtor.',
    icon: <Sprout className="h-6 w-6 md:h-12 md:w-12" />,
    color: 'teal'
  },
  'planejamento-estrategico': {
    id: 'planejamento-estrategico',
    title: 'Estratégia Fiscal Sob Medida',
    shortTitle: 'Plan. Estratégico',
    description: 'Desenhamos o melhor caminho para otimizar seus tributos de forma legal e segura.',
    subtitle: 'A estrutura ideal para o seu momento de vida e negócio.',
    longDescription: 'Cada negócio é único, e sua carga tributária também deve ser. Mapeamos sua estrutura atual e desenhamos cenários personalizados, escolhendo os regimes e benefícios fiscais mais adequados. Entregamos um planejamento claro e prático, focado em trazer eficiência financeira com total conveniência.',
    icon: <TrendingUp className="h-6 w-6 md:h-12 md:w-12" />,
    color: 'violet'
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
    <div id="services" className="bg-slate-50 text-slate-900 font-sans pb-10">
      {/* Unified Hero & Content Section */}
      <section className="relative pt-20 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className={`absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-${detail.color}-100/50 rounded-full blur-[120px]`}></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          {onBack && (
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-12 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Voltar para Início</span>
            </button>
          )}

          <div className="bg-white border border-slate-200 p-8 md:p-12 rounded-[2.5rem] shadow-sm">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
              <div className={`p-6 rounded-3xl bg-${detail.color}-50 text-${detail.color}-600 shrink-0`}>
                {detail.icon}
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                  {detail.title}
                </h1>
                <p className={`text-xl font-medium text-${detail.color}-600 mb-4`}>
                  {detail.subtitle}
                </p>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {detail.description}
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100">
              <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed">
                <p className="whitespace-pre-line">
                  {detail.longDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Service Navigator */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
             <div>
                <h3 className="text-2xl font-bold text-slate-900">Explorar mais soluções</h3>
                <p className="text-slate-500 text-sm">Descubra como podemos simplificar o seu dia a dia</p>
             </div>
             {onBack && (
               <button 
                  onClick={onBack}
                  className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1 group"
               >
                  Ver todos na Home <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </button>
             )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherServices.map((service) => (
              <button
                key={service.id}
                onClick={() => onNavigateToService?.(service.id)}
                className="relative group bg-white border border-slate-200 p-6 rounded-2xl hover:border-blue-300 hover:shadow-md transition-all text-left overflow-hidden"
              >
                {/* Glow Effect */}
                <div className={`absolute -right-4 -top-4 w-20 h-20 bg-${service.color}-100 rounded-full blur-2xl transition-all`}></div>
                
                <div className={`mb-4 text-${service.color}-600 group-hover:scale-110 transition-transform origin-left relative z-10`}>
                   {/* Fix: Casting React.ReactNode to React.ReactElement with className prop to satisfy TypeScript */}
                   {React.cloneElement(service.icon as React.ReactElement<{ className?: string }>, { className: 'w-6 h-6' })}
                </div>
                
                <h4 className="font-bold text-slate-900 text-sm mb-2 group-hover:text-blue-600 transition-colors relative z-10">
                  {service.shortTitle}
                </h4>
                
                <p className="text-slate-500 text-[11px] leading-tight line-clamp-2 relative z-10">
                  {service.description}
                </p>

                <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity relative z-10">
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
