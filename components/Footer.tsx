
import React from 'react';
import { IconLinkedIn, IconFacebook, IconInstagram } from './Icons';

interface FooterProps {
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy }) => {
  const openChat = () => {
    window.dispatchEvent(new CustomEvent('open-chat'));
  };

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
             <a href="#home" className="font-bold text-xl md:text-2xl text-white tracking-tight block mb-4 hover:opacity-80 transition-opacity">
               Shigueme<span className="text-blue-500"> Consultoria Tributária</span>
             </a>
             <p className="text-sm mb-4">
               Soluções inteligentes para contabilidade estratégica, compliance agro e planejamento tributário.
             </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Serviços</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Consultoria Agro</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Diagnóstico Contábil</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Planejamento Estratégico</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Recuperação de Créditos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Empresa</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="hover:text-blue-400 transition-colors">Sobre Nós</a></li>
              <li>
                <button onClick={onOpenPrivacy} className="hover:text-blue-400 transition-colors text-left">
                  Política de Privacidade
                </button>
              </li>
               <li>
                <button onClick={onOpenPrivacy} className="hover:text-blue-400 transition-colors text-left">
                  Termos de Uso
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Social</h4>
            <div className="flex space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1">
                <IconLinkedIn className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1">
                <IconFacebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1">
                <IconInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} Shigueme Ltda. Todos os direitos reservados.</p>
          <p className="mt-2 md:mt-0">Desenvolvido com React</p>
        </div>
      </div>
    </footer>
  );
};
