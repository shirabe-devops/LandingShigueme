import React from 'react';

// Logos de empresas (URLs estáveis do Wikimedia Commons)
const clients = [
  { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
  { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
  { name: 'Spotify', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg' },
  { name: 'Airbnb', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg' },
  { name: 'Uber', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' },
  { name: 'Samsung', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Samsung_Galaxy_A8_2018_logo.png' },
  { name: 'Coca-Cola', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg' },
];

export const Clients: React.FC = () => {
  return (
    <div className="bg-white py-16 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-12">
          Empresas que confiam na nossa expertise
        </p>
        
        {/* Layout em Grid (Lista e Colunas) em vez de Carrossel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center">
          {clients.map((client, index) => (
            <div 
              key={`${client.name}-${index}`} 
              className="w-full flex items-center justify-center p-4 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300 hover:scale-105"
            >
              <img 
                src={client.logo} 
                alt={`Logo ${client.name}`} 
                className="h-8 md:h-10 max-w-[120px] object-contain" 
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};