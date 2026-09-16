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
               src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop" 
               alt="Equipe prestando consultoria em um ambiente de negócios moderno" 
               className="relative z-10 rounded-3xl shadow-lg w-full h-auto object-cover"
             />
             
             <div className="absolute bottom-8 right-8 z-20 bg-white p-6 rounded-2xl shadow-xl max-w-xs hidden md:block border border-slate-100">
               <div className="flex items-center gap-3 mb-2">
                 <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-700">JD</div>
                    <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs font-bold text-blue-700">AM</div>
                    <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs text-slate-500">+5</div>
                 </div>
               </div>
               <p className="text-slate-900 font-bold text-sm">Experiência que transforma</p>
               <p className="text-slate-600 text-xs mt-1">Sua conveniência em primeiro lugar.</p>
             </div>
          </div>
          
          <div>
            <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-3">Nossa Experiência</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">O fim da burocracia. O início dos resultados.</h3>
            
            <div className="prose prose-lg text-slate-600">
              <p className="mb-6">
                Na <strong>Shigueme Consultoria Tributária</strong>, acreditamos que lidar com impostos não precisa ser um obstáculo diário para o empresário. Nossa missão é oferecer <strong>soluções completas e experiências premium</strong> que tirem o peso da burocracia dos seus ombros.
              </p>
              <p className="mb-6">
                Combinamos inteligência de dados com um atendimento consultivo para criar estratégias que não apenas mantêm sua empresa em total conformidade, mas também geram caixa e eficiência. Desde a transição pacífica para o <strong>IVA Dual</strong> até a estruturação inteligente do agronegócio.
              </p>
              <p>
                Entregamos mais que planilhas e relatórios: entregamos conveniência. Você foca na sua paixão e no crescimento do seu negócio, enquanto nós cuidamos da sua segurança fiscal com agilidade e excelência.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};