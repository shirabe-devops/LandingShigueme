import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Clients } from './components/Clients';
import { Services } from './components/Services';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { AIAssistant } from './components/AIAssistant';
import { PrivacyPolicy } from './components/PrivacyPolicy';

type Page = 'home' | 'privacy';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigateToPrivacy = () => setCurrentPage('privacy');
  
  const navigateToHome = () => {
    setCurrentPage('home');
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
            <Services />
            <About />
          </main>
          <Footer onOpenPrivacy={navigateToPrivacy} />
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