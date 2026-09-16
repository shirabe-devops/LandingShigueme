import React, { useEffect } from 'react';
import { IconArrowRight } from './Icons';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  
  // Rola para o topo ao abrir a página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
      
      {/* Botão Voltar Flutuante/Fixo no Topo Mobile ou Cabeçalho */}
      <div className="max-w-4xl mx-auto mb-8">
        <button 
          onClick={onBack}
          className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors group"
        >
          <div className="bg-white p-2 rounded-full shadow-md mr-3 group-hover:shadow-lg transition-all border border-slate-100 rotate-180">
            <IconArrowRight className="w-5 h-5" />
          </div>
          Voltar para a Página Inicial
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-slate-900 px-8 py-10 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Termos de Uso e Privacidade</h1>
          <p className="text-slate-300">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
        </div>

        <div className="p-8 md:p-12 space-y-12">
          
          {/* Seção 1: Política de Privacidade */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <span className="w-2 h-8 bg-blue-600 rounded-full mr-3"></span>
              1. Política de Privacidade
            </h2>
            
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
              <p>
                A sua privacidade é importante para nós. É política da <strong>Shigueme Consultoria Tributária</strong> respeitar a sua privacidade em relação a qualquer informação que possamos coletar no site.
              </p>
              
              <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">Coleta de Dados</h3>
              <p>
                Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado (ex: formulário de contato para retorno comercial).
              </p>

              <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">Retenção de Dados</h3>
              <p>
                Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
              </p>

              <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">Compartilhamento</h3>
              <p>
                Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
              </p>

              <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">Cookies</h3>
              <p>
                O nosso site usa cookies para melhorar a experiência do usuário. Ao continuar navegando, você concorda com o uso de cookies necessários para o funcionamento técnico do site e análise de tráfego anônima.
              </p>
            </div>
          </section>

          <hr className="border-slate-200" />

          {/* Seção 2: Termos de Uso */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <span className="w-2 h-8 bg-cyan-500 rounded-full mr-3"></span>
              2. Termos de Uso
            </h2>
            
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
              <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">Aceitação dos Termos</h3>
              <p>
                Ao acessar ao site Shigueme Consultoria Tributária, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site.
              </p>

              <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">Licença de Uso</h3>
              <p>
                É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Shigueme Consultoria Tributária, apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título.
              </p>

              <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">Isenção de Responsabilidade</h3>
              <p>
                Os materiais no site da Shigueme Consultoria Tributária são fornecidos 'como estão'. Shigueme Consultoria Tributária não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.
              </p>

              <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">Aviso Legal sobre Serviços Consultivos</h3>
              <div className="bg-white p-6 rounded-2xl border-l-4 border-l-blue-600 border border-slate-200 shadow-sm mt-4 mb-6">
                <p className="text-slate-700 m-0 font-medium leading-relaxed">
                  Todo serviço e produto consultivo está passível de falhas, erros e particularidades mercadológicas. A identificação de oportunidades (como a recuperação de créditos) depende exclusivamente do histórico de cada empresa, podendo ocorrer também a não recuperação de valores ou o não sucesso da estratégia em alguns casos. Alinhamos sempre as expectativas com transparência antes de qualquer execução.
                </p>
              </div>
              
              <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">Modificações</h3>
              <p>
                A Shigueme Consultoria Tributária pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.
              </p>

              <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">Lei Aplicável</h3>
              <p>
                Estes termos e condições são regidos e interpretados de acordo com as leis do Brasil e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.
              </p>
            </div>
          </section>
        </div>
        
        <div className="bg-slate-50 px-8 py-6 border-t border-slate-200 flex justify-end">
             <button 
                onClick={onBack}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg hover:shadow-blue-600/30"
              >
                Entendi e Voltar
              </button>
        </div>
      </div>
    </div>
  );
};