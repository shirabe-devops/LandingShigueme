import React from 'react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

// Tipos atualizados para o Chatbot
export interface ChatOption {
  label: string;
  value: string;
}

export interface ChatMessage {
  id: string;
  role: 'bot' | 'user';
  content: string | React.ReactNode;
  type?: 'text' | 'options' | 'input';
  options?: ChatOption[];
  inputType?: 'text' | 'email' | 'tel' | 'number';
  isTyping?: boolean;
}

export interface UserData {
  service: string; // Novo campo para o serviço selecionado
  documentType: 'CPF' | 'CNPJ' | '';
  documentValue: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  company: string;
  revenue: string;
  regime: string;
  sector: string;
  mainNeed: string;
  message: string;
}