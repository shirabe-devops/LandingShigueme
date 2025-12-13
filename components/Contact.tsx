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
    message: '',
    company: ''
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Regras de validação
  const validate = (name: string, value: string) => {
    switch (name) {
      case 'name':
        return value.trim().length >= 3;
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'phone':
        return value.replace(/\D/g, '').length >= 10; // Mínimo 10 dígitos (DDD + número)
      case 'message':
        return value.trim().length >= 10;
      case 'company':
        return true; // Opcional, sempre válido
      default:
        return true;
    }
  };

  const isFieldValid = (name: string) => validate(name, formData[name as keyof typeof formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificar se todos os campos obrigatórios são válidos antes de enviar
    const requiredFields = ['name', 'email', 'phone', 'message'];
    const hasErrors = requiredFields.some(field => !validate(field, formData[field as keyof typeof formData]));

    if (hasErrors) {
      // Marca todos como tocados para mostrar os erros
      const allTouched = requiredFields.reduce((acc, curr) => ({ ...acc, [curr]: true }), {});
      setTouched(prev => ({ ...prev, ...allTouched }));
      
      // Acessibilidade: Move o foco para o primeiro campo com erro
      const firstError = requiredFields.find(field => !validate(field, formData[field as keyof typeof formData]));
      if (firstError) {
        const element = document.getElementById(firstError);
        element?.focus();
      }
      return;
    }

    setIsSubmitting(true);

    // -----------------------------------------------------------------------
    // INSTRUÇÕES PARA INTEGRAÇÃO SMTP / BACKEND
    // -----------------------------------------------------------------------
    /* 
    try {
      // Seu fetch real aqui...
      const response = await fetch('...', { ... });
      if (response.ok) {
          onSuccess(); // REDIRECIONA PARA A PÁGINA DE AGRADECIMENTO
      }
    } catch (e) { ... }
    */

    // --- MODO SIMULAÇÃO (Remova este bloco quando configurar o código acima) ---
    // Simula um delay de rede
    setTimeout(() => {
      console.log("Simulação de Envio SMTP:", formData);
      setFormData({ name: '', email: '', phone: '', message: '', company: '' });
      setTouched({});
      setIsSubmitting(false);
      
      // Redireciona para a página de sucesso
      onSuccess(); 
    }, 1500);
    // ---------------------------------------------------------------------------
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched({
      ...touched,
      [e.target.name]: true
    });
  };

  // Função auxiliar para classes de estilo
  const getInputClasses = (fieldName: string) => {
    const baseClasses = "w-full rounded-lg border p-3 outline-none transition-all duration-200 pr-10"; // pr-10 para ícone
    const isTouched = touched[fieldName];
    const isValid = isFieldValid(fieldName);

    if (!isTouched && fieldName !== 'company') {
      return `${baseClasses} bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`;
    }

    if (fieldName === 'company') {
       // Corrigido: Fundo branco explícito e cor de texto
       return `${baseClasses} bg-white text-slate-900 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`;
    }

    return isValid
      ? `${baseClasses} border-green-500 bg-green-50/30 text-green-800 focus:ring-2 focus:ring-green-500 focus:border-green-500`
      : `${baseClasses} border-red-500 bg-red-50/30 text-red-800 focus:ring-2 focus:ring-red-500 focus:border-red-500`;
  };

  return (
    <div id="contact" className="bg-slate-900 py-24 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Centralizado */}
        <div className="text-center mb-12">
            <h2 className="text-blue-400 font-semibold tracking-wide uppercase text-sm mb-3">Fale Conosco</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Pronto para otimizar sua carga tributária?</h3>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Preencha o formulário para agendar um diagnóstico gratuito com um de nossos especialistas.
            </p>
        </div>

        {/* Formulário Centralizado */}
        <div className="bg-white rounded-2xl p-8 md:p-10 text-slate-800 shadow-2xl border border-slate-800/50">
            <h3 className="text-2xl font-bold mb-8 text-center text-slate-900">Solicitar Proposta</h3>
            <form onSubmit={handleSubmit} className="space-y-5" noValidate aria-label="Formulário de contato">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="relative">
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Nome Completo *</label>
                  <div className="relative">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        aria-required="true"
                        aria-invalid={touched.name && !isFieldValid('name')}
                        aria-describedby={touched.name && !isFieldValid('name') ? "error-name" : undefined}
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isSubmitting}
                        className={getInputClasses('name')}
                        placeholder="Seu nome"
                    />
                    {touched.name && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" aria-hidden="true">
                            {isFieldValid('name') ? <IconCheck className="h-5 w-5 text-green-500" /> : <IconX className="h-5 w-5 text-red-500" />}
                        </div>
                    )}
                  </div>
                  {touched.name && !isFieldValid('name') && (
                    <p id="error-name" role="alert" className="text-xs text-red-500 mt-1">Mínimo de 3 caracteres.</p>
                  )}
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1">Empresa</label>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    value={formData.company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    className={getInputClasses('company')}
                    placeholder="Nome da empresa"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Corporativo *</label>
                  <div className="relative">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        aria-required="true"
                        aria-invalid={touched.email && !isFieldValid('email')}
                        aria-describedby={touched.email && !isFieldValid('email') ? "error-email" : undefined}
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isSubmitting}
                        className={getInputClasses('email')}
                        placeholder="voce@empresa.com.br"
                    />
                    {touched.email && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" aria-hidden="true">
                            {isFieldValid('email') ? <IconCheck className="h-5 w-5 text-green-500" /> : <IconX className="h-5 w-5 text-red-500" />}
                        </div>
                    )}
                  </div>
                  {touched.email && !isFieldValid('email') && (
                    <p id="error-email" role="alert" className="text-xs text-red-500 mt-1">Digite um email válido.</p>
                  )}
                </div>
                <div className="relative">
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Telefone / WhatsApp *</label>
                  <div className="relative">
                    <input
                        type="tel"
                        name="phone"
                        id="phone"
                        required
                        aria-required="true"
                        aria-invalid={touched.phone && !isFieldValid('phone')}
                        aria-describedby={touched.phone && !isFieldValid('phone') ? "error-phone" : undefined}
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isSubmitting}
                        className={getInputClasses('phone')}
                        placeholder="(99) 99999-9999"
                    />
                    {touched.phone && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" aria-hidden="true">
                            {isFieldValid('phone') ? <IconCheck className="h-5 w-5 text-green-500" /> : <IconX className="h-5 w-5 text-red-500" />}
                        </div>
                    )}
                  </div>
                  {touched.phone && !isFieldValid('phone') && (
                    <p id="error-phone" role="alert" className="text-xs text-red-500 mt-1">Mínimo de 10 dígitos.</p>
                  )}
                </div>
              </div>

              <div className="relative">
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Como podemos ajudar? *</label>
                <div className="relative">
                    <textarea
                    name="message"
                    id="message"
                    rows={4}
                    required
                    aria-required="true"
                    aria-invalid={touched.message && !isFieldValid('message')}
                    aria-describedby={touched.message && !isFieldValid('message') ? "error-message" : undefined}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    className={getInputClasses('message')}
                    placeholder="Descreva brevemente sua necessidade..."
                    ></textarea>
                     {touched.message && (
                        <div className="absolute top-3 right-3 pointer-events-none" aria-hidden="true">
                            {isFieldValid('message') ? <IconCheck className="h-5 w-5 text-green-500" /> : <IconX className="h-5 w-5 text-red-500" />}
                        </div>
                    )}
                </div>
                {touched.message && !isFieldValid('message') && (
                  <p id="error-message" role="alert" className="text-xs text-red-500 mt-1">A mensagem deve ter pelo menos 10 caracteres.</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all shadow-lg hover:shadow-blue-600/30 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed text-lg"
              >
                {isSubmitting ? 'Processando...' : 'Enviar Solicitação'}
              </button>
              <p className="text-xs text-center text-slate-500 mt-4">
                Seus dados estão protegidos. Não enviamos spam.
              </p>
            </form>
        </div>

      </div>
    </div>
  );
};