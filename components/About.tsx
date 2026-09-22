import React from 'react';

export const About: React.FC = () => {
  return (
    <div id="about" className="py-24 bg-white overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          
          {/* Image Section */}
          <div className="mb-12 lg:mb-0 relative">
             <div className="absolute top-0 left-0 -ml-4 -mt-4 w-24 h-24 bg-blue-50 rounded-full z-0"></div>
             <div className="absolute bottom-0 right-0 -mr-4 -mb-4 w-32 h-32 bg-indigo-50 rounded-full z-0"></div>
             
             <img 
               src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop" 
               alt="Equipe prestando consultoria em um ambiente de negócios moderno" 
               width={800}
               height={533}
               loading="lazy"
               decoding="async"
               className="relative z-10 rounded-3xl shadow-lg w-full h-auto object-cover"
             />
          </div>
          
          <div>
            <h2 className="text-blue-700 font-bold tracking-wide uppercase text-sm mb-3">Nossa Experiência</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">O fim da burocracia. O início dos resultados.</h3>
            
            <div className="prose prose-lg text-slate-700">
              <p className="mb-6">
                Lidar com impostos não deve travar o seu dia a dia. A <strong>Shigueme Consultoria Tributária</strong> une inteligência de dados e atendimento personalizado para simplificar sua vida empresarial.
              </p>
              <p className="mb-6">
                Mais do que manter sua empresa em conformidade, nós entregamos eficiência, recuperação de caixa e segurança para o futuro (incluindo a transição sem sustos para a nova <strong>Reforma Tributária</strong>).
              </p>
              <p>
                Nosso papel é assumir a burocracia pesada. O seu é continuar crescendo.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-200/80 shadow-sm flex flex-col justify-center">
                <h4 className="text-lg font-bold text-slate-900 mb-1">Transparência</h4>
                <p className="text-sm text-slate-700 leading-relaxed">Clareza total sobre a incidência de IBS e CBS.</p>
              </div>
              
              <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-200/80 shadow-sm flex flex-col justify-center">
                <h4 className="text-lg font-bold text-slate-900 mb-1">Eficiência</h4>
                <p className="text-sm text-slate-700 leading-relaxed">Eliminação da cumulatividade e resíduos tributários.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};