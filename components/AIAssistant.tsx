import React, { useState, useEffect, useRef } from 'react';
import { IconMessageCircle, IconX, IconSend, IconShield, IconUser } from './Icons';
import { ChatMessage, ChatOption, UserData } from '../types';

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

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState<ChatStep>('INTRO');
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  
  const [userData, setUserData] = useState<UserData>({
    name: '', email: '', phone: '', company: '', 
    revenue: '', regime: '', sector: '', mainNeed: '', message: ''
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Listener para abrir o chat via botões externos (Navbar, Hero, etc)
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
      setShowNotification(false);
    };

    window.addEventListener('open-chat', handleOpenChat);
    return () => window.removeEventListener('open-chat', handleOpenChat);
  }, []);

  // Notificação inicial (balãozinho)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && !hasOpened) {
        setShowNotification(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen, hasOpened]);

  // Scroll automático
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  // Inicializa o chat quando aberto pela primeira vez
  useEffect(() => {
    if (isOpen && !hasOpened) {
      setHasOpened(true);
      setShowNotification(false);
      startConversation();
    }
  }, [isOpen]);

  // Foco no input
  useEffect(() => {
    if (isOpen && !isTyping && currentStep !== 'INTRO' && currentStep !== 'SUBMITTING' && currentStep !== 'SUCCESS') {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isTyping, currentStep, isOpen]);

  const startConversation = () => {
    addBotMessage("Olá! Sou a IA da Shigueme. 🤖", 500);
    addBotMessage("Posso fazer um diagnóstico rápido da sua empresa?", 1500, () => setCurrentStep('NAME'));
  };

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
    switch (currentStep) {
      case 'NAME':
        if (value.length < 3) {
            addBotMessage("Por favor, digite um nome válido.", 500);
            return;
        }
        setUserData(prev => ({ ...prev, name: value }));
        addBotMessage(`Prazer, ${value.split(' ')[0]}! Qual o nome da empresa?`, 600, () => setCurrentStep('COMPANY'));
        break;

      case 'COMPANY':
        setUserData(prev => ({ ...prev, company: value }));
        addBotMessage("Qual seu e-mail corporativo?", 600, () => setCurrentStep('EMAIL'));
        break;

      case 'EMAIL':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            addBotMessage("E-mail inválido. Tente novamente.", 500);
            return;
        }
        setUserData(prev => ({ ...prev, email: value }));
        addBotMessage("Qual seu WhatsApp (com DDD)?", 600, () => setCurrentStep('PHONE'));
        break;

      case 'PHONE':
        const phoneClean = value.replace(/\D/g, '');
        if (phoneClean.length < 10) {
            addBotMessage("Número inválido. Digite DDD + Número.", 500);
            return;
        }
        setUserData(prev => ({ ...prev, phone: value }));
        
        const revenueOptions: ChatOption[] = [
            { label: 'Até R$ 80k', value: 'ate_50k' },
            { label: 'R$ 80k - 300k', value: '50k_300k' },
            { label: 'R$ 300k - 1M', value: '300k_1m' },
            { label: 'Acima de R$ 1M', value: 'acima_1m' },
        ];
        addBotMessage("Qual o faturamento mensal estimado?", 600, () => setCurrentStep('REVENUE'), revenueOptions);
        break;

      case 'REVENUE':
        setUserData(prev => ({ ...prev, revenue: value }));
        
        const regimeOptions: ChatOption[] = [
            { label: 'Simples', value: 'simples' },
            { label: 'Presumido', value: 'presumido' },
            { label: 'Lucro Real', value: 'real' },
            { label: 'Não sei', value: 'nao_sei' },
        ];
        addBotMessage("Qual o Regime Tributário?", 600, () => setCurrentStep('REGIME'), regimeOptions);
        break;

      case 'REGIME':
        setUserData(prev => ({ ...prev, regime: value }));
        
        const sectorOptions: ChatOption[] = [
            { label: 'Indústria', value: 'industria' },
            { label: 'Comércio', value: 'comercio' },
            { label: 'Serviços', value: 'servicos' },
            { label: 'Outro', value: 'outro' },
        ];
        addBotMessage("Qual seu setor?", 600, () => setCurrentStep('SECTOR'), sectorOptions);
        break;

      case 'SECTOR':
        setUserData(prev => ({ ...prev, sector: value }));

        const needOptions: ChatOption[] = [
            { label: 'Reduzir Impostos', value: 'reduzir_carga' },
            { label: 'Dívidas', value: 'dividas' },
            { label: 'Recup. Créditos', value: 'recuperacao_credito' },
            { label: 'BPO', value: 'bpo' },
        ];
        addBotMessage("Qual seu maior objetivo?", 600, () => setCurrentStep('MAIN_NEED'), needOptions);
        break;

      case 'MAIN_NEED':
        setUserData(prev => ({ ...prev, mainNeed: value }));
        addBotMessage("Descreva brevemente sua necessidade.", 600, () => setCurrentStep('MESSAGE'));
        break;

      case 'MESSAGE':
        setUserData(prev => {
            const finalData = { ...prev, message: value };
            submitToN8N(finalData);
            return finalData;
        });
        setCurrentStep('SUBMITTING');
        break;
        
      default:
        break;
    }
  };

  const submitToN8N = async (data: UserData) => {
    addBotMessage("Enviando seus dados...", 500);

    try {
        const response = await fetch('/api/n8n-proxy.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Network error');

        setCurrentStep('SUCCESS');
        addBotMessage("✅ Recebido! Um consultor entrará em contato.", 1000);
        
    } catch (error) {
        console.error("Erro envio chat:", error);
        setCurrentStep('ERROR');
        addBotMessage("Erro ao conectar. Tente novamente mais tarde.", 1000);
    }
  };

  // Renderiza opções
  const renderOptions = () => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === 'bot' && lastMessage?.options && !isTyping && currentStep !== 'SUBMITTING' && currentStep !== 'SUCCESS') {
        return (
            <div className="flex flex-wrap gap-2 mt-2 px-1">
                {lastMessage.options.map((opt) => (
                    <button
                        key={opt.value}
                        onClick={() => handleOptionSelect(opt)}
                        className="bg-blue-600 text-white text-xs py-1.5 px-3 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Balão de Notificação (Se fechado) */}
      {!isOpen && (
        <div 
          className={`bg-white text-slate-800 px-4 py-3 rounded-2xl shadow-xl border border-slate-100 max-w-[250px] mb-3 transition-all duration-500 origin-bottom-right ${
            showNotification ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-4 pointer-events-none'
          }`}
        >
          <div className="flex items-start gap-3">
             <div className="bg-blue-100 p-1.5 rounded-full shrink-0">
                <IconShield className="w-4 h-4 text-blue-600" />
             </div>
             <div>
                <p className="text-xs font-bold mb-1">Diagnóstico Gratuito</p>
                <p className="text-xs text-slate-500 leading-tight">
                  Posso analisar o perfil tributário da sua empresa agora?
                </p>
             </div>
             <button 
                onClick={(e) => { e.stopPropagation(); setShowNotification(false); }}
                className="text-slate-400 hover:text-slate-600"
             >
               <IconX className="w-3 h-3" />
             </button>
          </div>
        </div>
      )}

      {/* JANELA DO CHAT */}
      <div 
        className={`bg-slate-900 border border-slate-700 w-[320px] sm:w-[380px] h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none hidden'
        }`}
      >
         {/* Header */}
         <div className="bg-slate-950 p-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
               <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center border border-blue-400/30">
                     <IconShield className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-slate-900"></div>
               </div>
               <div>
                  <h4 className="font-bold text-white text-sm">Assistente IA</h4>
                  <p className="text-[10px] text-blue-400">Shigueme Consultoria</p>
               </div>
            </div>
            <button 
               onClick={() => setIsOpen(false)}
               className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
            >
               <IconX className="w-5 h-5" />
            </button>
         </div>

         {/* Messages Area */}
         <div className="flex-grow p-4 overflow-y-auto bg-slate-900 scrollbar-hide space-y-3">
            {messages.map((msg) => (
                <div key={msg.id} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`max-w-[85%] text-xs md:text-sm p-3 rounded-2xl ${
                      msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                   }`}>
                      {msg.content}
                   </div>
                </div>
            ))}
            
            {isTyping && (
                <div className="flex justify-start">
                   <div className="bg-slate-800 p-3 rounded-2xl rounded-bl-none border border-slate-700 flex gap-1">
                      <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
                   </div>
                </div>
            )}

            <div className="pl-2">
                {renderOptions()}
            </div>
            
            <div ref={messagesEndRef} />
         </div>

         {/* Input Area */}
         <div className="p-3 bg-slate-950 border-t border-slate-800">
            <form onSubmit={handleTextSubmit} className="flex gap-2">
               <input
                  ref={inputRef}
                  type={currentStep === 'PHONE' ? 'tel' : currentStep === 'EMAIL' ? 'email' : 'text'}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={isInputDisabled ? "Aguarde..." : "Digite aqui..."}
                  disabled={isInputDisabled}
                  className="flex-grow bg-slate-900 text-white text-sm rounded-lg px-3 py-2 outline-none border border-slate-800 focus:border-blue-500 transition-colors disabled:opacity-50"
                  autoComplete="off"
               />
               <button 
                  type="submit"
                  disabled={isInputDisabled || !userInput.trim()}
                  className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
               >
                  <IconSend className="w-5 h-5" />
               </button>
            </form>
         </div>
      </div>

      {/* FAB (Floating Action Button) - Botão de Abrir */}
      <button
        onClick={() => {
            setIsOpen(!isOpen);
            setShowNotification(false);
        }}
        className={`group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl transition-all duration-300 z-50 ${
            isOpen ? 'bg-slate-700 rotate-90' : 'bg-blue-600 hover:bg-blue-500 hover:scale-110'
        }`}
        aria-label="Abrir Chat"
      >
        {isOpen ? (
            <IconX className="w-6 h-6 text-white" />
        ) : (
            <>
                <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-20 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></span>
                <IconMessageCircle className="w-7 h-7 text-white relative z-10" />
                {showNotification && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full"></span>
                )}
            </>
        )}
      </button>
    </div>
  );
};