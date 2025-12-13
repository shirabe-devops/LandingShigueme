import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Clients } from './components/Clients';
import { Services } from './components/Services';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AIAssistant } from './components/AIAssistant';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { SuccessPage } from './components/SuccessPage';

type Page = 'home' | 'privacy' | 'success';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigateToPrivacy = () => setCurrentPage('privacy');
  
  const navigateToHome = () => {
    setCurrentPage('home');
    window.scrollTo(0, 0); // Correção: Força o scroll para o topo ao voltar para a home
  };
  
  const navigateToSuccess = () => setCurrentPage('success');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 scroll-smooth">
      {/* 
        Logica de renderização das páginas.
        A Navbar e Footer geralmente não aparecem na página de sucesso para focar na conversão/mensagem.
      */}
      
      {currentPage === 'home' && (
        <>
          <Navbar />
          <main className="flex-grow">
            <Hero />
            <Clients />
            <Services />
            <About />
            <Contact onSuccess={navigateToSuccess} />
          </main>
          <Footer onOpenPrivacy={navigateToPrivacy} />
          <AIAssistant />
        </>
      )}

      {currentPage === 'privacy' && (
        <PrivacyPolicy onBack={navigateToHome} />
      )}

      {currentPage === 'success' && (
        <SuccessPage onBack={navigateToHome} />
      )}
    </div>
  );
}

export default App;