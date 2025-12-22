
import React, { useState } from 'react';
import { IconMenu, IconX } from './Icons';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Função para abrir o chat flutuante
  const openChat = () => {
    window.dispatchEvent(new CustomEvent('open-chat'));
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-slate-950/60 backdrop-blur-xl border-b border-white/10 shadow-lg transition-all duration-300 supports-[backdrop-filter]:bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#home" className="group font-bold text-xl md:text-2xl text-white tracking-tight hover:opacity-90 transition-opacity flex items-center gap-2">
              {/* Efeito de brilho sutil no texto */}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300 group-hover:to-white">
                Shigueme
              </span>
              <span className="text-blue-400 font-semibold whitespace-nowrap">Consultoria Tributária</span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1 items-center">
            <a href="#home" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200">Início</a>
            <a href="#services" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200">Serviços</a>
            <a href="#about" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200">Sobre Nós</a>
            
            <div className="pl-4">
              <button 
                onClick={openChat}
                className="px-5 py-2.5 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-500 transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] border border-blue-500/50"
              >
                Fale Conosco
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-slate-300 hover:text-white focus:outline-none p-2 rounded-md hover:bg-white/10 transition-colors"
              aria-label="Menu principal"
              aria-expanded={isOpen}
            >
              {isOpen ? <IconX className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown (Glass Effect) */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-slate-900/95 backdrop-blur-xl border-t border-white/10 px-4 pt-4 pb-6 space-y-2 flex flex-col shadow-2xl">
          <a 
            href="#home" 
            onClick={() => setIsOpen(false)} 
            className="block px-4 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors border-l-4 border-transparent hover:border-blue-500"
          >
            Início
          </a>
          <a 
            href="#services" 
            onClick={() => setIsOpen(false)} 
            className="block px-4 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors border-l-4 border-transparent hover:border-blue-500"
          >
            Serviços
          </a>
          <a 
            href="#about" 
            onClick={() => setIsOpen(false)} 
            className="block px-4 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors border-l-4 border-transparent hover:border-blue-500"
          >
            Sobre Nós
          </a>
          <div className="pt-4 mt-2 border-t border-white/10">
            <button 
              onClick={openChat} 
              className="block w-full text-center px-5 py-4 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-500 transition-transform active:scale-95 shadow-lg shadow-blue-900/50"
            >
              Fale Conosco
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
