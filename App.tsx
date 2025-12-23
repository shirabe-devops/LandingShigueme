
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
import { TaxManagementPage } from './components/TaxManagementPage';

type Page = 'home' | 'privacy' | 'service-detail' | 'tax-management';

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

  const navigateToTaxManagement = () => {
    setCurrentPage('tax-management');
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    setSelectedServiceId(null);
    window.scrollTo(0, 0); 
  };

  const navigateToSection = (sectionId: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setSelectedServiceId(null);
      // Pequeno delay para garantir que a Home renderizou antes de tentar o scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 scroll-smooth">
      
      {(currentPage === 'home' || currentPage === 'tax-management' || currentPage === 'service-detail') && (
        <Navbar 
          onNavigateAtuacao={navigateToTaxManagement} 
          onNavigateHome={navigateToHome}
          onNavigateSection={navigateToSection}
        />
      )}

      {currentPage === 'home' && (
        <>
          <main className="flex-grow">
            <Hero />
            <Clients />
            <Services onSelectService={navigateToService} />
            <About />
          </main>
          <Footer onOpenPrivacy={navigateToPrivacy} onSelectService={navigateToService} onSelectAtuacao={navigateToTaxManagement} />
          <AIAssistant />
        </>
      )}

      {currentPage === 'tax-management' && (
        <>
          <TaxManagementPage 
            onBack={navigateToHome} 
            onGoToServices={() => navigateToSection('services')} 
          />
          <Footer onOpenPrivacy={navigateToPrivacy} onSelectService={navigateToService} onSelectAtuacao={navigateToTaxManagement} />
          <AIAssistant />
        </>
      )}

      {currentPage === 'privacy' && (
        <PrivacyPolicy onBack={navigateToHome} />
      )}

      {currentPage === 'service-detail' && selectedServiceId && (
        <>
          <ServiceDetailPage 
            serviceId={selectedServiceId} 
            onBack={() => navigateToSection('services')} 
            onNavigateToService={navigateToService}
          />
          <Footer onOpenPrivacy={navigateToPrivacy} onSelectService={navigateToService} onSelectAtuacao={navigateToTaxManagement} />
          <AIAssistant />
        </>
      )}
    </div>
  );
}

export default App;
