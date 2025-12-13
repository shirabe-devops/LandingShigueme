import React, { useState, useEffect } from 'react';
import { IconCheck, IconArrowRight, IconStar, IconPhone, IconMail, IconMapPin } from './Icons';

interface SuccessPageProps {
  onBack: () => void;
}

export const SuccessPage: React.FC<SuccessPageProps> = ({ onBack }) => {
  const [showFeedback, setShowFeedback] = useState<'initial' | 'form' | 'submitted' | 'none'>('initial');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate feedback submission
    console.log("Feedback submitted:", { rating, comment });
    setShowFeedback('submitted');
    setTimeout(() => {
        // Optional: Auto close or keep submitted state
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Success Animation & Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 animate-[fadeIn_0.6s_ease-out]">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500 mb-8 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
          <IconCheck className="w-12 h-12 text-green-500" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
          Solicitação <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Confirmada!</span>
        </h1>
        
        <p className="text-xl text-slate-300 leading-relaxed">
          Você acabou de dar um passo estratégico rumo à eficiência tributária. 
          Nossa equipe de especialistas já recebeu seus dados e está analisando o perfil do seu negócio. 
          Entraremos em contato em breve para apresentar oportunidades reais de economia.
        </p>
      </div>

      {/* Contact Info Card (Previously above the form) */}
      <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-8 w-full max-w-3xl mb-12 shadow-2xl">
        <h3 className="text-lg font-semibold text-blue-400 mb-6 uppercase tracking-wider text-center">Nossos Canais Diretos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-900/50 flex items-center justify-center mb-3 text-blue-300">
                    <IconPhone className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-white mb-1">Telefone</h4>
                <p className="text-slate-400 text-sm">(44) 98860-1424</p>
                <p className="text-slate-500 text-xs">Seg-Sex, 9h às 17h</p>
            </div>

            <div className="flex flex-col items-center text-center">
                 <div className="w-12 h-12 rounded-full bg-blue-900/50 flex items-center justify-center mb-3 text-blue-300">
                    <IconMail className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-white mb-1">Email</h4>
                <p className="text-slate-400 text-sm">shigueme@shirabe.com.br</p>
            </div>

            <div className="flex flex-col items-center text-center">
                 <div className="w-12 h-12 rounded-full bg-blue-900/50 flex items-center justify-center mb-3 text-blue-300">
                    <IconMapPin className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-white mb-1">Escritório</h4>
                <p className="text-slate-400 text-sm">Rua de Floresta, 1000<br/>Floresta - PR</p>
            </div>
        </div>
      </div>

      {/* Action Button */}
      <button 
        onClick={onBack}
        className="group relative inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-1 mb-16"
      >
        <span className="mr-2">Voltar para o Início</span>
        <IconArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
      </button>

      {/* Feedback Section (Conditional) */}
      <div className="w-full max-w-lg mx-auto border-t border-slate-800 pt-10 text-center transition-all duration-500">
        
        {/* Initial Question */}
        {showFeedback === 'initial' && (
           <div className="animate-fade-in-up">
              <p className="text-slate-400 text-lg mb-6">Gostaria de avaliar nosso atendimento online?</p>
              <div className="flex gap-4 justify-center">
                  <button 
                    onClick={() => setShowFeedback('form')}
                    className="px-6 py-2 bg-slate-800 hover:bg-green-600/20 hover:text-green-400 hover:border-green-500/50 border border-slate-700 rounded-lg transition-all font-medium text-slate-300"
                  >
                    Sim, avaliar
                  </button>
                  <button 
                    onClick={() => setShowFeedback('none')}
                    className="px-6 py-2 bg-transparent hover:bg-slate-900 border border-transparent hover:border-slate-800 rounded-lg transition-all text-slate-500 hover:text-slate-400"
                  >
                    Não, obrigado
                  </button>
              </div>
           </div>
        )}

        {/* Feedback Form */}
        {showFeedback === 'form' && (
            <form onSubmit={handleFeedbackSubmit} className="bg-slate-900/30 p-6 rounded-xl border border-slate-800 animate-fade-in-up">
                <h4 className="text-white font-semibold mb-4">Sua opinião é muito importante!</h4>
                
                {/* Star Rating */}
                <div className="flex justify-center gap-2 mb-6" onMouseLeave={() => setHoverRating(0)}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            type="button"
                            key={star}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            className="focus:outline-none transition-transform hover:scale-110 p-1"
                        >
                            <IconStar 
                                className={`w-8 h-8 ${
                                    star <= (hoverRating || rating) 
                                    ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]' 
                                    : 'text-slate-600'
                                } transition-colors duration-200`} 
                            />
                        </button>
                    ))}
                </div>
                <div className="text-center mb-6 text-sm text-slate-400 min-h-[20px]">
                    {(hoverRating || rating) === 1 && 'Ruim'}
                    {(hoverRating || rating) === 2 && 'Regular'}
                    {(hoverRating || rating) === 3 && 'Bom'}
                    {(hoverRating || rating) === 4 && 'Muito Bom'}
                    {(hoverRating || rating) === 5 && 'Excelente'}
                </div>

                {/* Optional Comment */}
                <textarea
                    placeholder="Sugestão ou reclamação (opcional)"
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none mb-4 text-sm"
                ></textarea>

                <div className="flex gap-3">
                    <button 
                        type="button"
                        onClick={() => setShowFeedback('initial')}
                        className="flex-1 py-2.5 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-800 transition-colors text-sm"
                    >
                        Cancelar
                    </button>
                    <button 
                        type="submit"
                        disabled={rating === 0}
                        className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg text-sm"
                    >
                        Enviar Avaliação
                    </button>
                </div>
            </form>
        )}

        {/* Thank You for Feedback */}
        {showFeedback === 'submitted' && (
            <div className="animate-fade-in-up bg-green-500/10 border border-green-500/20 p-6 rounded-xl">
                <p className="text-green-400 font-semibold text-lg flex items-center justify-center gap-2">
                    <IconCheck className="w-5 h-5" />
                    Obrigado pelo feedback!
                </p>
                <p className="text-slate-400 text-sm mt-2">Sua avaliação nos ajuda a melhorar constantemente.</p>
            </div>
        )}

      </div>
    </div>
  );
};