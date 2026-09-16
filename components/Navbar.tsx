
import React, { useState } from 'react';
import { IconMenu, IconX } from './Icons';

interface NavbarProps {
  onNavigateHome?: () => void;
  onNavigateSection?: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateHome, onNavigateSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openChat = () => {
    window.dispatchEvent(new CustomEvent('open-chat'));
    setIsOpen(false);
  };

  const handleLinkClick = (e: React.MouseEvent, action?: () => void) => {
    if (action) {
      e.preventDefault();
      action();
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm transition-all duration-300 supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <button 
              onClick={(e) => handleLinkClick(e, onNavigateHome)}
              className="group font-bold text-xl md:text-2xl text-slate-900 tracking-tight hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <span className="text-slate-900">
                Shigueme
              </span>
              <span className="text-blue-600 font-semibold whitespace-nowrap">Consultoria Tributária</span>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1 items-center">
            <button onClick={(e) => handleLinkClick(e, onNavigateHome)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-all duration-200">Início</button>
            <button 
              onClick={(e) => handleLinkClick(e, () => onNavigateSection?.('services'))} 
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-all duration-200"
            >
              Soluções
            </button>
            <button 
              onClick={(e) => handleLinkClick(e, () => onNavigateSection?.('about'))} 
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-all duration-200"
            >
              Nossa Experiência
            </button>
            
            <div className="pl-4">
              <button 
                onClick={openChat}
                className="px-5 py-2.5 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition-all shadow-md"
              >
                Fale Conosco
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-slate-600 hover:text-slate-900 focus:outline-none p-2 rounded-md hover:bg-slate-100 transition-colors"
              aria-label="Menu principal"
              aria-expanded={isOpen}
            >
              {isOpen ? <IconX className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-xl border-t border-slate-200 px-4 pt-4 pb-6 space-y-2 flex flex-col shadow-lg">
          <button 
            onClick={(e) => handleLinkClick(e, onNavigateHome)} 
            className="text-left block px-4 py-3 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors border-l-4 border-transparent hover:border-blue-600"
          >
            Início
          </button>
          <button 
            onClick={(e) => handleLinkClick(e, () => onNavigateSection?.('services'))} 
            className="text-left block px-4 py-3 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors border-l-4 border-transparent hover:border-blue-600"
          >
            Soluções
          </button>
          <button 
            onClick={(e) => handleLinkClick(e, () => onNavigateSection?.('about'))} 
            className="text-left block px-4 py-3 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors border-l-4 border-transparent hover:border-blue-600"
          >
            Nossa Experiência
          </button>
          <div className="pt-4 mt-2 border-t border-slate-100">
            <button 
              onClick={openChat} 
              className="block w-full text-center px-5 py-4 rounded-lg bg-slate-900 text-white font-bold hover:bg-slate-800 transition-transform active:scale-95 shadow-md"
            >
              Fale Conosco
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
