
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Clients } from './components/Clients';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { AIAssistant } from './components/AIAssistant';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { ServiceDetailPage } from './components/ServiceDetailPage';

type Page = 'home' | 'privacy';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('consultoria-contabil');

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  const navigateToPrivacy = () => {
    setCurrentPage('privacy');
    window.scrollTo(0, 0);
  };
  
  const navigateToService = (id: string) => {
    setSelectedServiceId(id);
    if (currentPage !== 'home') {
      setCurrentPage('home');
      window.scrollTo(0, 0);
    }
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    window.scrollTo(0, 0); 
  };

  const navigateToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      navigateToHome();
      return;
    }

    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 scroll-smooth">
      
      {currentPage === 'home' && (
        <Navbar 
          onNavigateHome={navigateToHome}
          onNavigateSection={navigateToSection}
        />
      )}

      {currentPage === 'home' && (
        <>
          <main className="flex-grow">
            <Hero onNavigateSection={navigateToSection} />
            <ServiceDetailPage 
              serviceId={selectedServiceId} 
              onNavigateToService={navigateToService}
            />
            <Clients />
            <About />
          </main>
          <Footer 
            onOpenPrivacy={navigateToPrivacy} 
            onSelectService={navigateToService} 
            onNavigateSection={navigateToSection}
          />
          <AIAssistant />
        </>
      )}

      {currentPage === 'privacy' && (
        <PrivacyPolicy onBack={navigateToHome} />
      )}
    </div>
  );
}

export default App;
