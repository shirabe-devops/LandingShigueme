
import React from 'react';
import { BarChart3, Coins, ClipboardList, TrendingUp, Sprout, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
    longDescription: '• Sua empresa pronta para a Reforma Tributária, sem dor de cabeça.\n• Cuidamos da transição para o novo IVA Dual (IBS e CBS).\n• Analisamos o impacto nos seus preços, custos e margens.\n• Você recebe a estratégia pronta para aplicar.',
    icon: <BarChart3 className="h-6 w-6 md:h-12 md:w-12" />,
    color: 'indigo'
  },
  'recuperacao-creditos': {
    id: 'recuperacao-creditos',
    title: 'Injeção de Caixa Descomplicada',
    shortTitle: 'Recuperação de Créditos',
    description: 'Uma solução inteligente para recuperar valores e fortalecer seu capital de giro.',
    subtitle: 'Identificamos oportunidades ocultas no seu histórico.',
    longDescription: '• Recuperamos impostos pagos a maior de forma 100% administrativa.\n• Auditoria rápida cruzando dados via inteligência artificial.\n• Zero esforço da sua equipe.\n• Fôlego financeiro imediato no seu caixa.',
    icon: <Coins className="h-6 w-6 md:h-12 md:w-12" />,
    color: 'emerald'
  },
  'consultoria-contabil': {
    id: 'consultoria-contabil',
    title: 'Gestão Financeira Inteligente',
    shortTitle: 'Consultoria Contábil',
    description: 'Simplificamos seus números para que você tenha o controle total do seu negócio.',
    subtitle: 'Clareza e precisão para decisões mais seguras.',
    longDescription: '• Seus números traduzidos em painéis intuitivos.\n• Diagnóstico rápido de gargalos financeiros e de processos.\n• Implementação de tecnologias que trazem eficiência.\n• Mais tempo livre para você focar na liderança do negócio.',
    icon: <ClipboardList className="h-6 w-6 md:h-12 md:w-12" />,
    color: 'blue'
  },
  'agro-intelligence': {
    id: 'agro-intelligence',
    title: 'Tranquilidade no Campo',
    shortTitle: 'Soluções Agro',
    description: 'Cuidamos da sua conformidade fiscal para você focar na sua safra.',
    subtitle: 'Proteção e eficiência para o produtor rural.',
    longDescription: '• Soluções específicas e ágeis para o Agronegócio.\n• Gestão completa do ITR e Livro Caixa Digital do Produtor Rural (LCDPR).\n• Estratégia dedicada para exportações e incentivos setoriais.\n• Burocracia blindada, paz de espírito no campo.',
    icon: <Sprout className="h-6 w-6 md:h-12 md:w-12" />,
    color: 'teal'
  },
  'planejamento-estrategico': {
    id: 'planejamento-estrategico',
    title: 'Estratégia Fiscal Sob Medida',
    shortTitle: 'Plan. Estratégico',
    description: 'Desenhamos o melhor caminho para otimizar seus tributos de forma legal e segura.',
    subtitle: 'A estrutura ideal para o seu momento de vida e negócio.',
    longDescription: '• Redução legal e segura da sua carga tributária.\n• Mapeamento da sua estrutura societária atual.\n• Simulação de cenários: Simples, Lucro Presumido ou Real.\n• Economia real, baseada puramente na lei e na sua realidade.',
    icon: <TrendingUp className="h-6 w-6 md:h-12 md:w-12" />,
    color: 'violet'
  }
};

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ serviceId, onNavigateToService }) => {
  const detail = SERVICE_DETAILS[serviceId];

  if (!detail) return null;

  return (
    <div id="services" className="bg-slate-50 text-slate-900 font-sans py-24 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-indigo-100/50 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 md:text-center max-w-3xl mx-auto">
          <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-3">Nossas Soluções</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Descubra como podemos transformar seu negócio.</h3>
          <p className="text-slate-600 text-lg">Selecione uma de nossas especialidades abaixo e veja os detalhes de cada solução.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-4 flex lg:flex-col overflow-x-auto lg:overflow-visible gap-3 pb-4 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {Object.values(SERVICE_DETAILS).map((service) => {
              const isActive = service.id === detail.id;
              return (
                <button
                  key={service.id}
                  onClick={() => onNavigateToService?.(service.id)}
                  className={`flex-shrink-0 flex items-center gap-4 p-4 rounded-2xl border transition-all text-left w-72 lg:w-full ${
                    isActive 
                      ? 'bg-slate-900 border-slate-900 text-white shadow-xl lg:translate-x-4'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-blue-300'
                  }`}
                >
                  <div className={`p-3 rounded-xl transition-colors ${isActive ? 'bg-white/20 text-white' : `bg-${service.color}-50 text-${service.color}-600`}`}>
                    {React.cloneElement(service.icon as React.ReactElement<{ className?: string }>, { className: 'w-6 h-6' })}
                  </div>
                  <div>
                    <h4 className={`font-bold text-sm mb-0.5 transition-colors ${isActive ? 'text-white' : 'text-slate-900'}`}>
                      {service.shortTitle}
                    </h4>
                    <p className={`text-xs line-clamp-1 transition-colors ${isActive ? 'text-white/80' : 'text-slate-500'}`}>
                      {service.title}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={detail.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="bg-white border border-slate-200 p-8 md:p-12 rounded-[2.5rem] shadow-xl w-full relative overflow-hidden"
              >
                {/* Internal Glow for Content Card */}
                <div className={`absolute -right-20 -top-20 w-64 h-64 bg-${detail.color}-100/60 rounded-full blur-[80px] pointer-events-none transition-colors duration-700`}></div>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10 relative z-10">
                  <div className={`p-6 rounded-3xl bg-${detail.color}-50 text-${detail.color}-600 shrink-0`}>
                    {React.cloneElement(detail.icon as React.ReactElement<{ className?: string }>, { className: 'w-10 h-10 md:w-12 md:h-12' })}
                  </div>
                  <div className="text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                      {detail.title}
                    </h1>
                    <p className={`text-lg md:text-xl font-medium text-${detail.color}-600 mb-4`}>
                      {detail.subtitle}
                    </p>
                    <p className="text-slate-600 text-lg leading-relaxed">
                      {detail.description}
                    </p>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100 relative z-10">
                  <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed">
                    <p className="whitespace-pre-line">
                      {detail.longDescription}
                    </p>
                  </div>
                  
                  <div className="mt-10 pt-8 flex items-center justify-center md:justify-start gap-4">
                     <button 
                       onClick={() => window.dispatchEvent(new CustomEvent('open-chat', { detail: { serviceId: detail.id, serviceName: detail.title } }))}
                       className="px-8 py-4 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                     >
                       Conversar sobre esta solução <ArrowRight className="w-5 h-5" />
                     </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};
