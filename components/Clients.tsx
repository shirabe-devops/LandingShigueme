import React, { useState } from 'react';

// Logos de empresas
// NOTA: Para as imagens personalizadas, certifique-se de usar URLs públicas acessíveis 
// ou coloque as imagens na pasta 'public' do projeto e use caminhos como '/clientes/logo.png'
const clients = [
/* 
  { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
  { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
  { name: 'Spotify', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg' },
  { name: 'Airbnb', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg' },
  { name: 'Uber', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' },
  { name: 'Samsung', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Samsung_Galaxy_A8_2018_logo.png' },
  { name: 'Coca-Cola', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg' },
  */
  // Clientes personalizados (Se a imagem falhar, o nome será exibido)
  { name: 'Amidos Crestani', logo: 'https://res.cloudinary.com/dw9ohxxgw/image/upload/v1765898977/amidoscrestani_qj5fpx.jpg' },
  { name: 'Amidos Nova Era', logo: 'https://res.cloudinary.com/dw9ohxxgw/image/upload/v1765898966/amidosnovaera_ap1jvo.jpg' },
  { name: 'Amidos Tia Lê', logo: 'https://res.cloudinary.com/dw9ohxxgw/image/upload/v1765898975/amidostiale_f6f5mg.jpg' },
  { name: 'Auris Ap. Auditivos', logo: 'https://res.cloudinary.com/dw9ohxxgw/image/upload/v1765898966/aurisaparelhosauditivos_aaggwe.jpg' },
  { name: 'Goma Chico', logo: 'https://res.cloudinary.com/dw9ohxxgw/image/upload/v1765898987/gomachico_aqzyg0.jpg' },
  { name: 'Samak Pescados', logo: 'https://res.cloudinary.com/dw9ohxxgw/image/upload/v1765898970/samakpescados_ymaxkk.jpg' },
  { name: 'Vó Corinto', logo: 'https://res.cloudinary.com/dw9ohxxgw/image/upload/v1765898966/vocorinto_sacc2o.jpg' },
];

const ClientLogo = ({ name, logo }: { name: string; logo: string }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="w-full flex items-center justify-center p-4 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-110 h-32 md:h-40">
      {!imgError ? (
        <img 
          src={logo} 
          alt={`Logo ${name}`} 
          className="h-20 md:h-28 max-w-[160px] md:max-w-[220px] object-contain" 
          loading="lazy"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="text-sm md:text-base font-bold text-slate-500 text-center uppercase tracking-wide border border-slate-200 bg-slate-50 px-4 py-3 rounded-lg shadow-sm w-full truncate" title={name}>
          {name}
        </span>
      )}
    </div>
  );
};

export const Clients: React.FC = () => {
  return (
    <div className="bg-white py-20 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-16">
          Empresas que confiam na nossa expertise
        </p>
        
        {/* Layout em Grid Responsivo */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 items-center justify-items-center">
          {clients.map((client, index) => (
            <ClientLogo key={`${client.name}-${index}`} name={client.name} logo={client.logo} />
          ))}
        </div>
      </div>
    </div>
  );
};