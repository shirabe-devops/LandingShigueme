
import React, { useEffect } from 'react';
import { ArrowLeft, ShieldCheck, MessageSquarePlus, Globe, TrendingUp, AlertCircle, Link2, Zap, CheckCircle2 } from 'lucide-react';

interface TaxManagementPageProps {
  onBack: () => void;
  onGoToServices: () => void;
}

export const TaxManagementPage: React.FC<TaxManagementPageProps> = ({ onBack, onGoToServices }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openChat = () => {
    window.dispatchEvent(new CustomEvent('open-chat'));
  };

  const topics = [
    "ENGENHARIA E PLANEJAMENTO FISCAL",
    "ANÁLISE INTEGRAL DA CADEIA DE SUPRIMENTOS",
    "CONSULTORIA E RECUPERAÇÃO DE ATIVOS TRIBUTÁRIOS",
    "AUDITORIA DE APURAÇÕES: PIS, COFINS, IRPJ, CSLL, IPI, ICMS E ISS",
    "CONSULTORIA EM TRANSFER PRICING (PREÇOS DE TRANSFERÊNCIA)",
    "SUPORTE CONSULTIVO PARA DEMANDAS FISCAIS COTIDIANAS"
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      {/* Header / Hero Section */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-600/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Voltar para Início</span>
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
             <ShieldCheck className="w-4 h-4" />
             Área de Atuação
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-8">
            Gestão <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Tributária Estratégica</span>
          </h1>

          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-xl text-slate-300 leading-relaxed border-l-4 border-blue-600 pl-6">
              A expansão da globalização, a competitividade acirrada e a escalada da carga tributária transformaram o compliance fiscal em um pilar central da estratégia corporativa moderna.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Gestão Estratégica */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
            <div className="bg-slate-900/40 p-8 md:p-12 rounded-[2.5rem] border border-slate-800 backdrop-blur-sm relative overflow-hidden">
              <TrendingUp className="absolute top-8 right-8 text-blue-500/20 w-24 h-24" />
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Eficiência Através da Gestão de Tributos</h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-6">
                Enxergamos a administração de impostos como um meio de obter diferencial competitivo. Ao otimizar os custos fiscais que incidem sobre a operação, impulsionamos diretamente a lucratividade e a sustentabilidade financeira da sua empresa.
              </p>
              <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-2xl flex items-start gap-4">
                <AlertCircle className="text-blue-400 shrink-0 w-6 h-6 mt-1" />
                <p className="text-slate-300">
                  O cenário fiscal brasileiro é um dos mais intrincados do globo, com mais de 60 tributos ativos e uma carga que supera 40% do PIB nacional. Estes dados isolados já ratificam a necessidade vital de um acompanhamento técnico de excelência.
                </p>
              </div>
            </div>
          </div>

          {/* Cadeia Produtiva e Paradigmas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <Link2 className="text-cyan-400" />
                Visão Além da Operação
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Nossa atuação transcende os limites físicos da empresa. Analisamos cada conexão da sua cadeia produtiva para identificar as rotas tributárias mais vantajosas e seguras.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Através de análises profundas, demonstramos que é viável alcançar economias substanciais operando rigorosamente dentro dos marcos legais e normativos.
              </p>
            </div>
            
            <div className="bg-slate-900/60 p-8 rounded-3xl border border-slate-800 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <Zap className="text-yellow-400" />
                Desconstruindo Mitos
              </h3>
              <p className="text-slate-400 mb-4">
                Muitos gestores assumem que regimes simplificados são sempre o melhor caminho para PMEs. No entanto, na esfera fiscal, não existem dogmas.
              </p>
              <p className="text-slate-300 font-medium">
                O que potencializa uma organização pode ser o entrave de outra, independentemente da similaridade de setor ou porte. A solução ideal de ontem pode não atender às demandas do presente ou do futuro.
              </p>
            </div>
          </div>

          {/* Tópicos de Atuação */}
          <div className="pt-8">
            <h2 className="text-2xl font-bold text-white mb-8 text-center md:text-left">Frentes de trabalho para otimização da carga tributária:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topics.map((topic, index) => (
                <div key={index} className="flex items-center gap-4 bg-slate-900/30 p-5 rounded-xl border border-slate-800 hover:border-blue-500/40 transition-all group">
                  <CheckCircle2 className="text-blue-500 w-5 h-5 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-bold text-slate-300 tracking-wide uppercase">{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Banner */}
          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-[2.5rem] p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_20px_50px_rgba(37,99,235,0.2)]">
            <div className="max-w-xl">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Sua empresa está operando no regime ideal?</h3>
              <p className="text-blue-50/80 text-lg">Solicite uma consultoria inicial e agende uma reunião.</p>
            </div>
            <button 
              onClick={openChat}
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-slate-100 transition-all flex items-center gap-2 whitespace-nowrap shadow-xl active:scale-95"
            >
              <MessageSquarePlus className="w-5 h-5" />
              Agendar Consultoria
            </button>
          </div>

        </div>
      </section>

      {/* Footer Navigation */}
      <div className="max-w-4xl mx-auto py-20 px-4 flex flex-col md:flex-row gap-8 items-center justify-center border-t border-slate-900">
         <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-white transition-all group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Voltar ao Início</span>
          </button>
          <button 
            onClick={onGoToServices}
            className="text-slate-500 hover:text-white transition-all font-medium"
          >
            Explorar Outras Soluções
          </button>
      </div>
    </div>
  );
};
