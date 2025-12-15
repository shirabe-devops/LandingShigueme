import React, { useState, useEffect, useRef } from 'react';
import { IconSend, IconMessageCircle, IconCheck, IconUser, IconShield } from './Icons';
import { ChatMessage, ChatOption, UserData } from '../types';

interface ContactProps {
  onSuccess?: () => void; // Mantido para compatibilidade, mas o fluxo é interno agora
}

// Define os passos do fluxo do chat
type ChatStep = 
  | 'INTRO' 
  | 'NAME' 
  | 'COMPANY' 
  | 'EMAIL' 
  | 'PHONE' 
  | 'REVENUE' 
  | 'REGIME' 
  | 'SECTOR' 
  | 'MAIN_NEED' 
  | 'MESSAGE' 
  | 'SUBMITTING' 
  | 'SUCCESS' 
  | 'ERROR';

export const Contact: React.FC<ContactProps> = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState<ChatStep>('INTRO');
  const [userInput, setUserInput] = useState('');
  const [userData, setUserData] = useState<UserData>({
    name: '', email: '', phone: '', company: '', 
    revenue: '', regime: '', sector: '', mainNeed: '', message: ''
  });
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll automático para a última mensagem
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Inicializa o chat
  useEffect(() => {
    addBotMessage("Olá! Sou o assistente virtual da Shigueme Consultoria. 🤖", 500);
    addBotMessage("Vou guiar seu diagnóstico tributário. Para começar, qual é o seu nome completo?", 1500, () => setCurrentStep('NAME'));
  }, []);

  // Foca no input quando necessário
  useEffect(() => {
    if (!isTyping && currentStep !== 'INTRO' && currentStep !== 'SUBMITTING' && currentStep !== 'SUCCESS') {
      // Pequeno delay para garantir que a UI renderizou
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isTyping, currentStep]);

  const addBotMessage = (text: string, delay: number = 0, callback?: () => void, options?: ChatOption[]) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'bot',
        content: text,
        type: options ? 'options' : 'text',
        options: options
      }]);
      if (callback) callback();
    }, delay);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      type: 'text'
    }]);
  };

  const handleOptionSelect = (option: ChatOption) => {
    addUserMessage(option.label);
    processInput(option.value);
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    addUserMessage(userInput);
    processInput(userInput);
    setUserInput('');
  };

  const processInput = (value: string) => {
    // Máquina de estados do Chat
    switch (currentStep) {
      case 'NAME':
        if (value.length < 3) {
            addBotMessage("Por favor, digite um nome válido (mínimo 3 letras).", 500);
            return;
        }
        setUserData(prev => ({ ...prev, name: value }));
        addBotMessage(`Prazer, ${value.split(' ')[0]}! Qual é o nome da sua empresa?`, 600, () => setCurrentStep('COMPANY'));
        break;

      case 'COMPANY':
        setUserData(prev => ({ ...prev, company: value }));
        addBotMessage("Perfeito. Agora, qual é o seu melhor e-mail corporativo para contato?", 600, () => setCurrentStep('EMAIL'));
        break;

      case 'EMAIL':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            addBotMessage("Hmm, esse e-mail parece inválido. Tente novamente, por favor.", 500);
            return;
        }
        setUserData(prev => ({ ...prev, email: value }));
        addBotMessage("Anotado. Qual é o seu WhatsApp ou telefone com DDD?", 600, () => setCurrentStep('PHONE'));
        break;

      case 'PHONE':
        const phoneClean = value.replace(/\D/g, '');
        if (phoneClean.length < 10) {
            addBotMessage("O número parece curto demais. Digite o DDD + Número.", 500);
            return;
        }
        setUserData(prev => ({ ...prev, phone: value }));
        
        // Pergunta com Opções - Faturamento
        const revenueOptions: ChatOption[] = [
            { label: 'Até R$ 80k (MEI)', value: 'ate_50k' },
            { label: 'R$ 80k - R$ 300k', value: '50k_300k' },
            { label: 'R$ 300k - R$ 1M', value: '300k_1m' },
            { label: 'R$ 1M - R$ 5M', value: '1m_5m' },
            { label: 'Acima de R$ 5M', value: 'acima_5m' },
        ];
        addBotMessage("Para direcionar ao especialista certo, qual é o faturamento mensal estimado da empresa?", 600, () => setCurrentStep('REVENUE'), revenueOptions);
        break;

      case 'REVENUE':
        setUserData(prev => ({ ...prev, revenue: value }));
        
        const regimeOptions: ChatOption[] = [
            { label: 'Simples Nacional', value: 'simples' },
            { label: 'Lucro Presumido', value: 'presumido' },
            { label: 'Lucro Real', value: 'real' },
            { label: 'Não sei / Abertura', value: 'nao_sei' },
        ];
        addBotMessage("Entendido. Qual é o Regime Tributário atual?", 600, () => setCurrentStep('REGIME'), regimeOptions);
        break;

      case 'REGIME':
        setUserData(prev => ({ ...prev, regime: value }));
        
        const sectorOptions: ChatOption[] = [
            { label: 'Indústria', value: 'industria' },
            { label: 'Comércio/Varejo', value: 'comercio' },
            { label: 'Serviços', value: 'servicos' },
            { label: 'Agro', value: 'agro' },
            { label: 'Saúde', value: 'saude' },
            { label: 'Outro', value: 'outro' },
        ];
        addBotMessage("Qual é o setor de atuação principal?", 600, () => setCurrentStep('SECTOR'), sectorOptions);
        break;

      case 'SECTOR':
        setUserData(prev => ({ ...prev, sector: value }));

        const needOptions: ChatOption[] = [
            { label: 'Reduzir Impostos', value: 'reduzir_carga' },
            { label: 'Resolver Dívidas', value: 'dividas' },
            { label: 'Recuperar Créditos', value: 'recuperacao_credito' },
            { label: 'BPO Financeiro', value: 'bpo' },
            { label: 'Reforma Tributária', value: 'reforma_tributaria' },
            { label: 'Outro', value: 'outro' },
        ];
        addBotMessage("Qual é o seu maior desafio ou objetivo hoje?", 600, () => setCurrentStep('MAIN_NEED'), needOptions);
        break;

      case 'MAIN_NEED':
        setUserData(prev => ({ ...prev, mainNeed: value }));
        addBotMessage("Para finalizar, descreva brevemente como podemos ajudar ou detalhes adicionais sobre o problema.", 600, () => setCurrentStep('MESSAGE'));
        break;

      case 'MESSAGE':
        setUserData(prev => {
            const finalData = { ...prev, message: value };
            submitToN8N(finalData); // Trigger submission
            return finalData;
        });
        setCurrentStep('SUBMITTING');
        break;
        
      default:
        break;
    }
  };

  const submitToN8N = async (data: UserData) => {
    addBotMessage("Aguarde um momento, estou analisando seus dados e enviando para nossa equipe...", 500);

    try {
        // Substitua '/api/n8n-proxy.php' pelo caminho real do arquivo no servidor
        // Em ambiente de desenvolvimento local (Vite), isso pode precisar de ajuste de proxy no vite.config ou URL completa
        const response = await fetch('/api/n8n-proxy.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Network error');
        }

        setCurrentStep('SUCCESS');
        addBotMessage("✅ Tudo certo! Recebemos sua solicitação com sucesso.", 1000);
        addBotMessage("Nossos especialistas em inteligência tributária analisarão seu perfil e entrarão em contato em breve pelo WhatsApp ou E-mail.", 2000);
        
    } catch (error) {
        console.error("Erro envio chat:", error);
        setCurrentStep('ERROR');
        addBotMessage("Ops! Tivemos um problema técnico ao conectar com o servidor.", 1000);
        addBotMessage("Por favor, tente nos chamar diretamente no WhatsApp pelo botão flutuante no canto da tela.", 2000);
    }
  };

  // Renderiza opções se existirem para a etapa atual e não estiver "digitando"
  const renderOptions = () => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === 'bot' && lastMessage?.options && !isTyping && currentStep !== 'SUBMITTING' && currentStep !== 'SUCCESS') {
        return (
            <div className="flex flex-wrap gap-2 mt-2 animate-fade-in-up">
                {lastMessage.options.map((opt) => (
                    <button
                        key={opt.value}
                        onClick={() => handleOptionSelect(opt)}
                        className="bg-blue-600/10 hover:bg-blue-600 hover:text-white text-blue-400 border border-blue-500/30 rounded-full px-4 py-2 text-sm font-medium transition-all"
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
        );
    }
    return null;
  };

  const isInputDisabled = currentStep === 'INTRO' || currentStep === 'SUBMITTING' || currentStep === 'SUCCESS' || currentStep === 'ERROR' || isTyping || (messages[messages.length - 1]?.role === 'bot' && !!messages[messages.length - 1]?.options);

  return (
    <div id="contact" className="bg-slate-900 py-24 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
            <h2 className="text-blue-400 font-semibold tracking-wide uppercase text-sm mb-3">Diagnóstico Tributário via Chat</h2>
            <h3 className="text-3xl font-bold mb-4">Assistente Inteligente</h3>
            <p className="text-slate-400 text-sm">Converse conosco para agilizar seu atendimento.</p>
        </div>

        {/* Chat Container */}
        <div className="bg-slate-950 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col h-[600px] md:h-[700px]">
            
            {/* Chat Header */}
            <div className="bg-slate-900 p-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                            <IconShield className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></div>
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-sm">Shigueme AI</h4>
                        <p className="text-xs text-blue-400">Online agora</p>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-grow p-4 md:p-6 overflow-y-auto space-y-4 scrollbar-hide bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-5">
                
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`flex max-w-[85%] md:max-w-[70%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            
                            {/* Avatar */}
                            <div className="flex-shrink-0 mt-auto">
                                {msg.role === 'bot' ? (
                                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                                        <IconShield className="w-4 h-4 text-blue-400" />
                                    </div>
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
                                        <IconUser className="w-4 h-4 text-slate-300" />
                                    </div>
                                )}
                            </div>

                            {/* Bubble */}
                            <div className={`
                                p-3.5 rounded-2xl text-sm leading-relaxed shadow-md
                                ${msg.role === 'user' 
                                    ? 'bg-blue-600 text-white rounded-br-none' 
                                    : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'}
                            `}>
                                {msg.content}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                    <div className="flex justify-start w-full animate-fade-in">
                         <div className="flex items-end gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                                <IconShield className="w-4 h-4 text-blue-400" />
                            </div>
                            <div className="bg-slate-800 p-4 rounded-2xl rounded-bl-none border border-slate-700 flex items-center gap-1">
                                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></span>
                            </div>
                         </div>
                    </div>
                )}

                {/* Option Chips Area */}
                <div className="pl-11">
                    {renderOptions()}
                </div>

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-slate-900 border-t border-slate-800">
                <form 
                    onSubmit={handleTextSubmit}
                    className={`flex items-center gap-3 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 transition-colors ${!isInputDisabled ? 'focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/50' : 'opacity-50 cursor-not-allowed'}`}
                >
                    <IconMessageCircle className="text-slate-500 w-5 h-5" />
                    <input
                        ref={inputRef}
                        type={currentStep === 'PHONE' ? 'tel' : currentStep === 'EMAIL' ? 'email' : 'text'}
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder={isInputDisabled ? (currentStep === 'SUCCESS' ? "Chat finalizado." : "Aguarde...") : "Digite sua resposta..."}
                        disabled={isInputDisabled}
                        className="flex-grow bg-transparent text-white placeholder-slate-500 outline-none text-sm"
                        autoComplete="off"
                    />
                    <button
                        type="submit"
                        disabled={isInputDisabled || !userInput.trim()}
                        className="p-2 bg-blue-600 rounded-lg text-white disabled:opacity-50 disabled:bg-slate-700 hover:bg-blue-500 transition-colors"
                    >
                        <IconSend className="w-4 h-4" />
                    </button>
                </form>
                <div className="text-center mt-2">
                    <p className="text-[10px] text-slate-600">
                        Shigueme Consultoria utiliza seus dados apenas para contato comercial.
                    </p>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};
