import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Clients } from './components/Clients';
import { Services } from './components/Services';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { AIAssistant } from './components/AIAssistant';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { ServiceDetailPage } from './components/ServiceDetailPage';

type Page = 'home' | 'privacy' | 'service-detail';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  const navigateToPrivacy = () => {
    setCurrentPage('privacy');
    window.scrollTo(0, 0);
  };
  
  const navigateToService = (id: string) => {
    setSelectedServiceId(id);
    setCurrentPage('service-detail');
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    setSelectedServiceId(null);
    window.scrollTo(0, 0); 
  };
  
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 scroll-smooth">
      
      {currentPage === 'home' && (
        <>
          <Navbar />
          <main className="flex-grow">
            <Hero />
            <Clients />
            <Services onSelectService={navigateToService} />
            <About />
          </main>
          <Footer onOpenPrivacy={navigateToPrivacy} />
          <AIAssistant />
        </>
      )}

      {currentPage === 'privacy' && (
        <PrivacyPolicy onBack={navigateToHome} />
      )}

      {currentPage === 'service-detail' && selectedServiceId && (
        <ServiceDetailPage 
          serviceId={selectedServiceId} 
          onBack={() => {
            navigateToHome();
            // Pequeno delay para permitir que o scroll para o topo aconteça antes de tentar ir para a seção
            setTimeout(() => {
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }} 
        />
      )}
    </div>
  );
}

export default App;