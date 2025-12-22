import React, { useEffect } from 'react';
import { IconArrowRight, IconCheck, IconShield, IconChart, IconCalculator, IconTrendingUp, IconLayers } from './Icons';
import { BarChart3, Coins, Layers, TrendingUp, ShieldCheck, ArrowLeft } from 'lucide-react';

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
  benefits: string[];
  features: { title: string; desc: string }[];
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
    color: 'blue',
    benefits: [
      'Eliminação da cumulatividade tributária',
      'Redução de custos de conformidade',
      'Maior transparência na carga efetiva',
      'Desoneração de investimentos e exportações'
    ],
    features: [
      { title: 'Simulação de Impacto', desc: 'Cálculo comparativo entre o sistema atual e o novo regime de débitos e créditos.' },
      { title: 'Revisão de Cadeia', desc: 'Análise de fornecedores e logística para otimizar o aproveitamento de créditos de IBS/CBS.' },
      { title: 'Treinamento de Equipe', desc: 'Capacitação técnica para os novos departamentos fiscal e contábil.' }
    ]
  },
  'recuperacao-creditos': {
    id: 'recuperacao-creditos',
    title: 'Recuperação de Créditos',
    description: 'Recupere valores pagos indevidamente e injete caixa imediato no seu negócio.',
    subtitle: 'Inteligência Administrativa para Ativos Fiscais',
    longDescription: 'Muitas empresas recolhem tributos sobre bases de cálculo incorretas. Nossa metodologia foca na recuperação administrativa de créditos de PIS, COFINS, ICMS e encargos previdenciários, utilizando tecnologia para cruzar milhares de dados em segundos.',
    icon: <Coins className="h-12 w-12" />,
    color: 'cyan',
    benefits: [
      'Geração de caixa sem necessidade de empréstimos',
      'Segurança jurídica total com base em teses firmadas',
      'Retorno financeiro em curto prazo (via compensação)',
      'Identificação de oportunidades futuras de economia'
    ],
    features: [
      { title: 'Auditoria Eletrônica', desc: 'Varredura de XMLs e arquivos SPED dos últimos 5 anos.' },
      { title: 'Exclusão do ICMS', desc: 'Aplicação da "Tese do Século" com precisão milimétrica.' },
      { title: 'Créditos de Insumos', desc: 'Análise criteriosa de essencialidade e relevância para PIS/COFINS.' }
    ]
  },
  'bpo-financeiro': {
    id: 'bpo-financeiro',
    title: 'BPO Financeiro 4.0',
    description: 'Foque no seu core business enquanto cuidamos da sua gestão financeira.',
    subtitle: 'Terceirização Estratégica com Foco em Resultados',
    longDescription: 'O BPO (Business Process Outsourcing) Financeiro da Shigueme vai além do contas a pagar e receber. Integramos tecnologia de ponta para oferecer dashboards em tempo real, fluxo de caixa projetado e integração total com a contabilidade.',
    icon: <Layers className="h-12 w-12" />,
    color: 'indigo',
    benefits: [
      'Redução de custos fixos com equipe interna',
      'Informações precisas para tomada de decisão',
      'Processos padronizados e à prova de erros',
      'Conformidade bancária e fiscal automatizada'
    ],
    features: [
      { title: 'Gestão de Fluxo de Caixa', desc: 'Visibilidade total de entradas e saídas futuras.' },
      { title: 'Conciliação Bancária', desc: 'Fechamento diário com automação via API.' },
      { title: 'Relatórios Gerenciais', desc: 'KPIs financeiros mensais comentados por especialistas.' }
    ]
  },
  'planejamento-estrategico': {
    id: 'planejamento-estrategico',
    title: 'Planejamento Estratégico',
    description: 'Estruturação inteligente para a menor carga tributária possível dentro da lei.',
    subtitle: 'Engenharia Tributária e Societária',
    longDescription: 'O planejamento tributário é uma ferramenta de sobrevivência. Analisamos a estrutura societária e operacional para identificar o regime mais vantajoso (Simples, Presumido ou Real) e incentivos fiscais específicos do setor.',
    icon: <TrendingUp className="h-12 w-12" />,
    color: 'emerald',
    benefits: [
      'Maximização da margem de lucro líquida',
      'Prevenção de contingências fiscais',
      'Eficiência na distribuição de dividendos',
      'Vantagem competitiva perante o mercado'
    ],
    features: [
      { title: 'Estudo de Regimes', desc: 'Comparativo anual detalhado entre regimes de tributação.' },
      { title: 'Análise de Incentivos', desc: 'Identificação de benefícios estaduais e federais (ex: Lei do Bem).' },
      { title: 'Holding Patrimonial', desc: 'Proteção de ativos e planejamento sucessório inteligente.' }
    ]
  },
  'auditoria-inteligente': {
    id: 'auditoria-inteligente',
    title: 'Auditoria Inteligente',
    description: 'Monitoramento preventivo para garantir conformidade total e risco zero.',
    subtitle: 'Compliance Preventivo com Inteligência Artificial',
    longDescription: 'No ambiente fiscal brasileiro, um erro pequeno pode gerar multas gigantescas. Nossa auditoria inteligente monitora seus arquivos digitais continuamente, simulando a malha fina do fisco para corrigir inconsistências antes que se tornem problemas.',
    icon: <ShieldCheck className="h-12 w-12" />,
    color: 'purple',
    benefits: [
      'Tranquilidade total perante fiscalizações',
      'Correção imediata de erros de emissão',
      'Qualidade total nos arquivos SPED',
      'Redução drástica do risco de multas'
    ],
    features: [
      { title: 'Check-up de XML', desc: 'Validação técnica de todas as notas fiscais em tempo real.' },
      { title: 'Cruzamento de Obrigações', desc: 'Verificação de batimento entre DCTF, EFD e Contabilidade.' },
      { title: 'Alertas de Vencimento', desc: 'Gestão rigorosa de prazos e certidões negativas.' }
    ]
  }
};

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ serviceId, onBack }) => {
  const detail = SERVICE_DETAILS[serviceId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  if (!detail) return null;

  const openChat = () => {
    window.dispatchEvent(new CustomEvent('open-chat'));
  };

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
            <div className={`p-6 rounded-3xl bg-slate-900 border border-slate-800 text-${detail.color}-400 shadow-2xl`}>
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-white mb-6">Visão Geral</h2>
              <p className="text-slate-400 leading-relaxed text-lg mb-8">
                {detail.longDescription}
              </p>

              <h2 className="text-2xl font-bold text-white mb-8">Principais Características</h2>
              <div className="space-y-6">
                {detail.features.map((feature, i) => (
                  <div key={i} className="flex gap-4 p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
                    <div className="mt-1">
                      <IconCheck className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{feature.title}</h4>
                      <p className="text-sm text-slate-400">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-8">
                <div className="p-8 rounded-3xl bg-blue-600/10 border border-blue-500/20">
                  <h3 className="text-xl font-bold text-white mb-6">Benefícios</h3>
                  <ul className="space-y-4">
                    {detail.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center">
                  <h3 className="text-lg font-bold text-white mb-4">Pronto para começar?</h3>
                  <p className="text-sm text-slate-400 mb-6">
                    Fale com um especialista agora mesmo para um diagnóstico gratuito.
                  </p>
                  <button 
                    onClick={openChat}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95"
                  >
                    Falar com Especialista
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Back Button (Footer style) */}
      <div className="max-w-4xl mx-auto px-4 mt-12 pt-12 border-t border-slate-800 flex justify-center">
         <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors group px-6 py-3 rounded-full hover:bg-white/5"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Voltar para Soluções</span>
          </button>
      </div>
    </div>
  );
};