import React, { useState } from 'react';
import { IconCheck, IconX } from './Icons';

interface ContactProps {
  onSuccess: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    revenue: '',   // Novo: Qualificação de Porte
    regime: '',    // Novo: Qualificação Técnica
    sector: '',    // Novo: Contexto de Mercado
    mainNeed: '',  // Novo: Dor do Cliente / Problema Tributário
    message: ''
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Regras de validação atualizadas para qualificação
  const validate = (name: string, value: string) => {
    switch (name) {
      case 'name':
        return value.trim().length >= 3;
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'phone':
        return value.replace(/\D/g, '').length >= 10;
      case 'message':
        return value.trim().length >= 10;
      // Novos campos de qualificação são obrigatórios para análise
      case 'revenue': 
      case 'regime': 
      case 'sector': 
      case 'mainNeed':
        return value !== ''; 
      case 'company':
        return true; 
      default:
        return true;
    }
  };

  const isFieldValid = (name: string) => validate(name, formData[name as keyof typeof formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const requiredFields = ['name', 'email', 'phone', 'message', 'revenue', 'regime', 'sector', 'mainNeed'];
    const hasErrors = requiredFields.some(field => !validate(field, formData[field as keyof typeof formData]));

    if (hasErrors) {
      const allTouched = requiredFields.reduce((acc, curr) => ({ ...acc, [curr]: true }), {});
      setTouched(prev => ({ ...prev, ...allTouched }));
      
      const firstError = requiredFields.find(field => !validate(field, formData[field as keyof typeof formData]));
      if (firstError) {
        const element = document.getElementById(firstError);
        element?.focus();
      }
      return;
    }

    setIsSubmitting(true);

    // =================================================================================
    // CONFIGURAÇÃO DE ENVIO DE DADOS (WEBHOOK N8N)
    // =================================================================================
    
    // 1. URL DO WEBHOOK N8N
    // Insira abaixo a URL do seu workflow "Production" do N8N.
    // O N8N deverá ter um nó "Webhook" (POST) conectado a um nó "Email" (Gmail/SMTP).
    const N8N_WEBHOOK_URL = "https://n8nwebhook.shirabe.com.br/webhook/lpshigueme"; 


    try {
      // Preparando o Payload (JSON) organizado para o N8N
      const payload = {
        data_envio: new Date().toLocaleString('pt-BR'),
        origem: 'Formulário Site - Shigueme',
        contato: {
          nome: formData.name,
          email: formData.email,
          telefone: formData.phone,
          empresa: formData.company || 'Não informada'
        },
        qualificacao_lead: {
          faturamento_estimado: formData.revenue,
          regime_tributario: formData.regime,
          setor_atuacao: formData.sector,
          necessidade_principal: formData.mainNeed
        },
        mensagem: formData.message
      };

      // Descomente a linha abaixo quando tiver a URL do N8N configurada
      const response = await fetch(N8N_WEBHOOK_URL, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(payload)
       });

       if (!response.ok) throw new Error('Erro na comunicação com N8N');

      setFormData({ 
        name: '', email: '', phone: '', company: '', message: '',
        revenue: '', regime: '', sector: '', mainNeed: ''
      });
      setTouched({});
      onSuccess();

    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      alert("Houve uma falha ao enviar seus dados. Por favor, tente novamente ou entre em contato via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTouched({
      ...touched,
      [e.target.name]: true
    });
  };

  const getInputClasses = (fieldName: string) => {
    const baseClasses = "w-full rounded-lg border p-3 outline-none transition-all duration-200 pr-10 bg-white text-slate-900 appearance-none"; 
    const isTouched = touched[fieldName];
    const isValid = isFieldValid(fieldName);

    if (!isTouched && fieldName !== 'company') {
      return `${baseClasses} border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`;
    }

    if (fieldName === 'company') {
       return `${baseClasses} border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`;
    }

    return isValid
      ? `${baseClasses} border-green-500 bg-green-50 text-slate-900 focus:ring-2 focus:ring-green-500 focus:border-green-500`
      : `${baseClasses} border-red-500 bg-red-50 text-slate-900 focus:ring-2 focus:ring-red-500 focus:border-red-500`;
  };

  return (
    <div id="contact" className="bg-slate-900 py-24 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
            <h2 className="text-blue-400 font-semibold tracking-wide uppercase text-sm mb-3">Diagnóstico Tributário</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Solicite uma Análise Especializada</h3>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Preencha os dados abaixo para que nossos analistas entendam o perfil do seu negócio e proponham as melhores soluções.
            </p>
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-10 text-slate-800 shadow-2xl border border-slate-800/50">
            <h3 className="text-2xl font-bold mb-8 text-center text-slate-900">Perfil Empresarial</h3>
            <form onSubmit={handleSubmit} className="space-y-6" noValidate aria-label="Formulário de qualificação tributária">
              
              {/* BLOCO 1: Identificação Básica */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="relative">
                  <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-1">Nome do Responsável *</label>
                  <div className="relative">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isSubmitting}
                        className={getInputClasses('name')}
                        placeholder="Nome completo"
                    />
                    {touched.name && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            {isFieldValid('name') ? <IconCheck className="h-5 w-5 text-green-500" /> : <IconX className="h-5 w-5 text-red-500" />}
                        </div>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-bold text-slate-700 mb-1">Nome da Empresa</label>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    value={formData.company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    className={getInputClasses('company')}
                    placeholder="Razão Social ou Nome Fantasia"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-1">Email Corporativo *</label>
                  <div className="relative">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isSubmitting}
                        className={getInputClasses('email')}
                        placeholder="voce@suaempresa.com.br"
                    />
                    {touched.email && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            {isFieldValid('email') ? <IconCheck className="h-5 w-5 text-green-500" /> : <IconX className="h-5 w-5 text-red-500" />}
                        </div>
                    )}
                  </div>
                </div>
                <div className="relative">
                  <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-1">WhatsApp / Telefone *</label>
                  <div className="relative">
                    <input
                        type="tel"
                        name="phone"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isSubmitting}
                        className={getInputClasses('phone')}
                        placeholder="(DD) 99999-9999"
                    />
                    {touched.phone && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            {isFieldValid('phone') ? <IconCheck className="h-5 w-5 text-green-500" /> : <IconX className="h-5 w-5 text-red-500" />}
                        </div>
                    )}
                  </div>
                </div>
              </div>

              {/* BLOCO 2: Qualificação Estratégica (Novos Campos) */}
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mt-6">
                 <h4 className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Dados para Análise Tributária</h4>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div className="relative">
                        <label htmlFor="revenue" className="block text-sm font-semibold text-slate-700 mb-1">Faturamento Mensal Estimado *</label>
                        <div className="relative">
                            <select
                                name="revenue"
                                id="revenue"
                                required
                                value={formData.revenue}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled={isSubmitting}
                                className={getInputClasses('revenue')}
                            >
                                <option value="">Selecione uma opção</option>
                                <option value="ate_50k">Até R$ 80 mil (MEI/Micro)</option>
                                <option value="50k_300k">R$ 80 mil a R$ 300 mil</option>
                                <option value="300k_1m">R$ 300 mil a R$ 1 Milhão</option>
                                <option value="1m_5m">R$ 1 Milhão a R$ 5 Milhões</option>
                                <option value="acima_5m">Acima de R$ 5 Milhões</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <label htmlFor="regime" className="block text-sm font-semibold text-slate-700 mb-1">Regime Tributário Atual *</label>
                        <div className="relative">
                            <select
                                name="regime"
                                id="regime"
                                required
                                value={formData.regime}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled={isSubmitting}
                                className={getInputClasses('regime')}
                            >
                                <option value="">Selecione o regime</option>
                                <option value="simples">Simples Nacional</option>
                                <option value="presumido">Lucro Presumido</option>
                                <option value="real">Lucro Real</option>
                                <option value="nao_sei">Não sei / Em abertura</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                     <div className="relative">
                        <label htmlFor="sector" className="block text-sm font-semibold text-slate-700 mb-1">Setor de Atuação *</label>
                        <div className="relative">
                            <select
                                name="sector"
                                id="sector"
                                required
                                value={formData.sector}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled={isSubmitting}
                                className={getInputClasses('sector')}
                            >
                                <option value="">Selecione o setor</option>
                                <option value="industria">Indústria (Transformação)</option>
                                <option value="comercio">Comércio / Varejo</option>
                                <option value="servicos">Prestação de Serviços</option>
                                <option value="agro">Agronegócio</option>
                                <option value="transporte">Transporte / Logística</option>
                                <option value="saude">Saúde / Clínicas</option>
                                <option value="outro">Outro</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <label htmlFor="mainNeed" className="block text-sm font-semibold text-slate-700 mb-1">Objetivo Principal *</label>
                        <div className="relative">
                            <select
                                name="mainNeed"
                                id="mainNeed"
                                required
                                value={formData.mainNeed}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled={isSubmitting}
                                className={getInputClasses('mainNeed')}
                            >
                                <option value="">Qual o seu maior desafio?</option>
                                <option value="reduzir_carga">Reduzir Impostos (Planejamento)</option>
                                <option value="dividas">Regularização de Dívidas / Parcelamento</option>
                                <option value="recuperacao_credito">Recuperação de Créditos (Passado)</option>
                                <option value="reforma_tributaria">Adequação à Reforma Tributária</option>
                                <option value="bpo">Terceirização Financeira (BPO)</option>
                                <option value="fiscalizacao">Estou sob Fiscalização / Autuação</option>
                                <option value="abertura">Abertura de Empresa</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>
                 </div>
              </div>

              {/* BLOCO 3: Mensagem */}
              <div className="relative">
                <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-1">Detalhes do Problema *</label>
                <div className="relative">
                    <textarea
                    name="message"
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    className={getInputClasses('message')}
                    placeholder="Descreva brevemente sua situação atual ou o problema que deseja resolver..."
                    ></textarea>
                     {touched.message && (
                        <div className="absolute top-3 right-3 pointer-events-none">
                            {isFieldValid('message') ? <IconCheck className="h-5 w-5 text-green-500" /> : <IconX className="h-5 w-5 text-red-500" />}
                        </div>
                    )}
                </div>
                {touched.message && !isFieldValid('message') && (
                  <p id="error-message" className="text-xs text-red-500 mt-1">A mensagem deve ter pelo menos 10 caracteres.</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all shadow-lg hover:shadow-blue-600/30 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed text-lg"
              >
                {isSubmitting ? 'Analisando perfil...' : 'Solicitar Diagnóstico Gratuito'}
              </button>
              <p className="text-xs text-center text-slate-500 mt-4">
                Seus dados comerciais são confidenciais e protegidos pela LGPD.
              </p>
            </form>
        </div>

      </div>
    </div>
  );
};