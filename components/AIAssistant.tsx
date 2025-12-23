
import React, { useState, useEffect, useRef } from 'react';
import { IconMessageCircle, IconX, IconSend, IconShield } from './Icons';
import { ChatMessage, ChatOption, UserData } from '../types';
import { 
  validatePhone, 
  validateEmail, 
  formatPhone 
} from '../utils/validators';

const N8N_WEBHOOK_URL = //'https://n8nwebhook.shirabe.com.br/webhook/lpshigueme';
'https://n8n.shirabe.com.br/webhook-test/lpshigueme' 

type ChatStep = 
  | 'INTRO'
  | 'SERVICE_SELECTION' 
  | 'NAME' 
  | 'COMPANY' 
  | 'EMAIL' 
  | 'PHONE' 
  | 'CITY'
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
  
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  
  const [userData, setUserData] = useState<UserData>({
    service: '',
    name: '', 
    email: '', 
    phone: '', 
    city: '',
    company: '', 
    revenue: '', 
    regime: '', 
    sector: '', 
    mainNeed: '', 
    message: ''
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ 
            behavior, 
            block: 'end' 
        });
    }
  };

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    const handleViewportChange = () => {
      const kHeight = window.innerHeight - vv.height;
      setKeyboardHeight(kHeight > 0 ? kHeight : 0);
      setViewportHeight(vv.height);
      
      if (isOpen) {
        setTimeout(() => scrollToBottom('auto'), 50);
      }
    };

    vv.addEventListener('resize', handleViewportChange);
    vv.addEventListener('scroll', handleViewportChange);
    handleViewportChange();

    return () => {
      vv.removeEventListener('resize', handleViewportChange);
      vv.removeEventListener('scroll', handleViewportChange);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => scrollToBottom(), 100);
      return () => clearTimeout(timer);
    }
  }, [messages, isTyping, currentStep, isOpen]);

  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
      setShowNotification(false);
      if (!hasOpened) {
          setHasOpened(true);
          startConversation();
      }
    };
    window.addEventListener('open-chat', handleOpenChat);
    return () => window.removeEventListener('open-chat', handleOpenChat);
  }, [hasOpened]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && !hasOpened) {
        setShowNotification(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen, hasOpened]);

  useEffect(() => {
    if (isOpen && !hasOpened) {
      setHasOpened(true);
      setShowNotification(false);
      startConversation();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && !isTyping && currentStep !== 'INTRO' && currentStep !== 'SERVICE_SELECTION' && currentStep !== 'SUBMITTING' && currentStep !== 'SUCCESS') {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
        scrollToBottom();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isTyping, currentStep, isOpen]);

  const startConversation = () => {
    setMessages([]);
    addBotMessage("Olá! Sou o seu assistente virtual. 🤖", 500);
    
    const serviceOptions: ChatOption[] = [
        { label: 'Consultoria Contábil', value: 'consultoria-contabil' },
        { label: 'Adequação à Reforma', value: 'adequacao-reforma' },
        { label: 'Recuperação de Créditos', value: 'recuperacao-creditos' },
        { label: 'Soluções para o Agro', value: 'agro-intelligence' },
        { label: 'Planejamento Estratégico', value: 'planejamento-estrategico' },
    ];

    addBotMessage("Para começarmos, qual dessas soluções você está buscando hoje?", 1500, () => setCurrentStep('SERVICE_SELECTION'), serviceOptions);
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
      
      if (isOpen && currentStep !== 'SUBMITTING' && currentStep !== 'SUCCESS' && !options) {
          inputRef.current?.focus();
      }
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
    const cleanValue = value.trim();

    switch (currentStep) {
      case 'SERVICE_SELECTION':
        setUserData(prev => ({ ...prev, service: value }));
        addBotMessage("Ótima escolha! Para prosseguirmos com a consultoria, qual é o seu nome completo?", 600, () => setCurrentStep('NAME'));
        break;

      case 'NAME':
        if (cleanValue.length < 3 || cleanValue.split(' ').length < 2) {
            addBotMessage("Por favor, digite seu nome e sobrenome.", 500);
            return;
        }
        setUserData(prev => ({ ...prev, name: cleanValue }));
        addBotMessage(`Prazer, ${cleanValue.split(' ')[0]}! Qual o nome da sua empresa?`, 600, () => setCurrentStep('COMPANY'));
        break;

      case 'COMPANY':
        setUserData(prev => ({ ...prev, company: cleanValue }));
        addBotMessage("Agora, qual é o seu melhor e-mail corporativo?", 600, () => setCurrentStep('EMAIL'));
        break;

      case 'EMAIL':
        const emailValidation = validateEmail(cleanValue);
        if (!emailValidation.isValid) {
            addBotMessage(emailValidation.message || "E-mail inválido.", 500);
            return;
        }
        setUserData(prev => ({ ...prev, email: cleanValue.toLowerCase() }));
        addBotMessage("Qual seu WhatsApp (DDD + 9 dígitos)?", 600, () => setCurrentStep('PHONE'));
        break;

      case 'PHONE':
        const phoneValidation = validatePhone(cleanValue);
        if (!phoneValidation.isValid) {
            addBotMessage(phoneValidation.message || "Telefone inválido.", 500);
            return;
        }
        setUserData(prev => ({ ...prev, phone: formatPhone(cleanValue) }));
        addBotMessage("Qual a sua cidade e estado (ex: Maringá - PR)?", 600, () => setCurrentStep('CITY'));
        break;

      case 'CITY':
        if (cleanValue.length < 2) {
             addBotMessage("Por favor, digite o nome da cidade.", 500);
             return;
        }

        setUserData(prev => ({ ...prev, city: cleanValue }));
        
        const revenueOptions: ChatOption[] = [
            { label: 'Até R$ 80k (MEI)', value: 'ate_80k' },
            { label: 'R$ 80k - R$ 300k', value: '80k_300k' },
            { label: 'R$ 300k - R$ 1M', value: '300k_1m' },
            { label: 'R$ 1M - R$ 5M', value: '1m_5m' },
            { label: 'Acima de R$ 5M', value: 'acima_5m' },
        ];
        addBotMessage("Qual o faturamento mensal estimado da empresa?", 800, () => setCurrentStep('REVENUE'), revenueOptions);
        break;

      case 'REVENUE':
        setUserData(prev => ({ ...prev, revenue: value }));
        
        const regimeOptions: ChatOption[] = [
            { label: 'MEI', value: 'mei' },
            { label: 'Simples Nacional', value: 'simples_nacional' },
            { label: 'Lucro Presumido', value: 'lucro_presumido' },
            { label: 'Lucro Real', value: 'lucro_real' },
            { label: 'Não sei / Abertura', value: 'naosei_abertura' },
        ];
        addBotMessage("Qual o Regime Tributário atual?", 600, () => setCurrentStep('REGIME'), regimeOptions);
        break;

      case 'REGIME':
        setUserData(prev => ({ ...prev, regime: value }));
        
        const sectorOptions: ChatOption[] = [
            { label: 'Indústria', value: 'industria' },
            { label: 'Comércio/Varejo', value: 'comercio/varejo' },
            { label: 'Atacado', value: 'atacado'},
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
            { label: 'Reduzir Impostos', value: 'reduzir_impostos' },
            { label: 'Resolver Dívidas', value: 'resolver_dividas' },
            { label: 'Recuperação de Créditos', value: 'recuperacao_de_credito' },
            { label: 'Consultoria Contábil', value: 'consultoria_contabil' },
            { label: 'Reforma Tributária', value: 'reforma_tributaria' },
            { label: 'Outro', value: 'outro' },
        ];
        addBotMessage("Qual o seu maior objetivo hoje?", 600, () => setCurrentStep('MAIN_NEED'), needOptions);
        break;

      case 'MAIN_NEED':
        if (value === 'outro') {
          setUserData(prev => ({ ...prev, mainNeed: value }));
          addBotMessage("Para finalizar, descreva brevemente como podemos ajudar.", 600, () => setCurrentStep('MESSAGE'));
        } else {
          // Se não for "Outro", finaliza imediatamente
          const finalData = { ...userData, mainNeed: value, message: `Desafio selecionado via menu: ${value}` };
          setUserData(finalData);
          setCurrentStep('SUBMITTING');
          submitToN8N(finalData);
        }
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
    addBotMessage("Analisando seus dados e enviando para nossa equipe...", 500);

    try {
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            setCurrentStep('SUCCESS');
            addBotMessage("✅ Tudo certo! Recebemos sua solicitação.", 1000);
            addBotMessage("Nossos especialistas em consultoria tributária entrarão em contato em breve pelo WhatsApp.", 2000);
        } else {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        
    } catch (error) {
        console.error("Erro envio chat:", error);
        setCurrentStep('ERROR');
        addBotMessage("Ops! Houve um erro de conexão.", 1000);
        addBotMessage("Por favor, tente nos chamar diretamente no WhatsApp pelo botão no rodapé.", 2000);
    }
  };

  const renderOptions = () => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === 'bot' && lastMessage?.options && !isTyping && currentStep !== 'SUBMITTING' && currentStep !== 'SUCCESS') {
        return (
            <div className="flex flex-wrap gap-2 mt-2 px-1 pb-2">
                {lastMessage.options.map((opt) => (
                    <button
                        key={opt.value}
                        onClick={() => handleOptionSelect(opt)}
                        className="bg-blue-600 text-white text-xs py-1.5 px-3 rounded-lg hover:bg-blue-700 transition-colors shadow-sm active:scale-95"
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
        );
    }
    return null;
  };

  const isInputBusy = currentStep === 'INTRO' || currentStep === 'SUBMITTING' || currentStep === 'SUCCESS' || currentStep === 'ERROR' || isTyping || (messages[messages.length - 1]?.role === 'bot' && !!messages[messages.length - 1]?.options);

  return (
    <div 
      className="fixed z-[9999] flex flex-col items-end pointer-events-none"
      style={{ 
        bottom: keyboardHeight > 0 ? `${keyboardHeight + 10}px` : '1.5rem', 
        right: '1.5rem',
        left: '1.5rem',
        maxWidth: 'calc(100% - 3rem)',
        width: 'auto',
        transition: 'bottom 0.1s ease-out'
      }}
    >
      
      {!isOpen && (
        <div 
          onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
          className={`bg-white text-slate-800 px-4 py-3 rounded-2xl shadow-xl border border-slate-100 max-w-[250px] mb-3 transition-all duration-500 origin-bottom-right pointer-events-auto cursor-pointer ${
            showNotification ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-4 pointer-events-none'
          }`}
        >
          <div className="flex items-start gap-3">
             <div className="bg-blue-100 p-1.5 rounded-full shrink-0">
                <IconShield className="w-4 h-4 text-blue-600" />
             </div>
             <div>
                <p className="text-xs text-slate-600 font-medium leading-tight">
                  Olá, clique aqui e agende uma consultoria!
                </p>
             </div>
             <button 
                onClick={(e) => { e.stopPropagation(); setShowNotification(false); }}
                className="text-slate-400 hover:text-slate-600 shrink-0"
             >
               <IconX className="w-3 h-3" />
             </button>
          </div>
        </div>
      )}

      <div 
        className={`bg-slate-900 border-slate-700 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom pointer-events-auto w-full sm:w-[380px] h-[500px] rounded-2xl border ${
          isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none hidden'
        }`}
        style={{ 
            maxHeight: keyboardHeight > 0 ? `calc(${viewportHeight}px - 2rem)` : '500px'
        }}
      >
         <div className="bg-slate-950 p-4 flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-3">
               <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center border border-blue-400/30">
                     <IconShield className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-slate-900"></div>
               </div>
               <div>
                  <h4 className="font-bold text-white text-sm">Assistente IA</h4>
                  <p className="text-[10px] text-blue-400">Shigueme Consultoria Tributária</p>
               </div>
            </div>
            <button 
               onClick={() => setIsOpen(false)}
               className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
            >
               <IconX className="w-5 h-5" />
            </button>
         </div>

         <div 
            ref={scrollContainerRef}
            className="flex-grow p-4 overflow-y-auto bg-slate-900 scrollbar-hide space-y-3"
         >
            {messages.map((msg) => (
                <div key={msg.id} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`max-w-[85%] text-xs md:text-sm p-3 rounded-2xl ${
                      msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none shadow-lg' 
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
            
            <div ref={messagesEndRef} className="h-6 w-full clear-both" />
         </div>

         <div className="p-3 bg-slate-950 border-t border-slate-800 shrink-0">
            <form onSubmit={handleTextSubmit} className="flex gap-2">
               <input
                  ref={inputRef}
                  onFocus={() => {
                    setTimeout(scrollToBottom, 300);
                  }}
                  type={currentStep === 'PHONE' ? 'tel' : currentStep === 'EMAIL' ? 'email' : 'text'}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={isInputBusy ? "Aguarde..." : "Digite aqui..."}
                  readOnly={isInputBusy}
                  className={`flex-grow bg-slate-900 text-white text-sm rounded-lg px-3 py-2.5 outline-none border transition-colors ${
                      isInputBusy ? 'border-slate-800 opacity-60 cursor-not-allowed' : 'border-slate-800 focus:border-blue-500'
                  }`}
                  autoComplete="off"
               />
               <button 
                  type="submit"
                  disabled={isInputBusy || !userInput.trim()}
                  className="bg-blue-600 hover:bg-blue-500 text-white p-2.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg active:scale-95"
               >
                  <IconSend className="w-5 h-5" />
               </button>
            </form>
         </div>
      </div>

      <button
        onClick={() => {
            setIsOpen(!isOpen);
            setShowNotification(false);
        }}
        className={`group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl transition-all duration-300 z-50 pointer-events-auto mb-0 ${
            isOpen ? 'bg-slate-700 rotate-90 scale-0' : 'bg-blue-600 hover:bg-blue-500 hover:scale-110'
        }`}
        aria-label="Abrir Chat"
        style={{ display: isOpen ? 'none' : 'flex' }}
      >
        <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-20 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></span>
        <IconMessageCircle className="w-7 h-7 text-white relative z-10" />
        {showNotification && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full"></span>
        )}
      </button>
    </div>
  );
};
