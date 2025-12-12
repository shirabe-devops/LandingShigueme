import React from 'react';

// Logos de empresas (URLs estáveis do Wikimedia Commons)
const clients = [
  { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
  { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
  { name: 'Spotify', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg' },
  { name: 'Airbnb', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg' },
  { name: 'Uber', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' },
  { name: 'Samsung', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png' },
  { name: 'Coca-Cola', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg' },
];

export const Clients: React.FC = () => {
  // Duplicamos a lista para criar o efeito de loop perfeito no CSS
  // Precisamos de logos suficientes para preencher a tela + o scroll
  const displayClients = [...clients, ...clients];

  return (
    <div className="bg-white py-16 border-b border-slate-100 overflow-hidden">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-12">
          Empresas que confiam na nossa expertise
        </p>
        
        <div className="relative w-full">
          {/* Máscaras de gradiente para suavizar as bordas (efeito fade) */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          {/* Container do Carrossel Infinito */}
          <div className="flex overflow-hidden">
            <div className="flex animate-scroll w-max hover:cursor-grab">
              {displayClients.map((client, index) => (
                <div 
                  key={`${client.name}-${index}`} 
                  className="flex-shrink-0 px-8 md:px-12 flex items-center justify-center min-w-[150px] md:min-w-[200px]"
                >
                  <img 
                    src={client.logo} 
                    alt={`Logo ${client.name}`} 
                    className="h-8 md:h-10 w-auto object-contain opacity-40 grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:scale-110" 
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};