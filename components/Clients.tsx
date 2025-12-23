
import React, { useState } from 'react';

// ARQUIVO DE CLIENTES - CONFIGURAÇÃO
// Aqui você define a lista de empresas e as URLs das imagens.
const clients = [
  // Objeto do cliente: { nome, url_da_imagem }
  { name: 'Amidos Crestani', logo: 'https://res.cloudinary.com/dw9ohxxgw/image/upload/v1765898977/amidoscrestani_qj5fpx.jpg' },
  { name: 'Amidos Nova Era', logo: 'https://res.cloudinary.com/dw9ohxxgw/image/upload/v1765898966/amidosnovaera_ap1jvo.jpg' },
  { name: 'Amidos Tia Lê', logo: 'https://res.cloudinary.com/dw9ohxxgw/image/upload/v1765898975/amidostiale_f6f5mg.jpg' },
  { name: 'Auris Ap. Auditivos', logo: 'https://res.cloudinary.com/dw9ohxxgw/image/upload/v1765898966/aurisaparelhosauditivos_aaggwe.jpg' },
  { name: 'Goma Chico', logo: 'https://res.cloudinary.com/dw9ohxxgw/image/upload/v1765898987/gomachico_aqzyg0.jpg' },
  { name: 'Samak Pescados', logo: 'https://res.cloudinary.com/dw9ohxxgw/image/upload/v1765898970/samakpescados_ymaxkk.jpg' },
  { name: 'Vó Corinto', logo: 'https://res.cloudinary.com/dw9ohxxgw/image/upload/v1765898966/vocorinto_sacc2o.jpg' },
  { name: 'Farinha Glória', logo: 'https://res.cloudinary.com/dw9ohxxgw/image/upload/v1766431235/Farinha_Gl%C3%B3ria_ngxhgr.jpg' },
];

// COMPONENTE INDIVIDUAL DE LOGO
// Controla a aparência de CADA grupo (logo + nome)
const ClientLogo: React.FC<{ name: string; logo: string }> = ({ name, logo }) => {
  // Estado para controlar erro de imagem (se a imagem quebrar, mostra o texto reserva)
  const [imgError, setImgError] = useState(false);

  return (
    // CONTAINER DO GRUPO (Envolve a logo e o nome)
    <div className="
      w-full                           /* Largura total na coluna da grid */
      flex flex-col                    /* Empilha os itens verticalmente (Logo em cima, nome embaixo) */
      items-center justify-center      /* Centraliza horizontal e verticalmente */
      p-2                              /* Espaçamento interno reduzido */
      
      /* EFEITO PRETO E BRANCO */
      md:grayscale                     /* Desktop: Começa cinza */
      hover:grayscale-0                /* Hover: Fica colorido */
      
      /* EFEITO DE OPACIDADE */
      opacity-80                       /* Começa levemente transparente */
      hover:opacity-100                /* Hover: Fica nítido */

      /* TRANSIÇÃO E ZOOM */
      transition-all duration-300      /* Animação suave */
      hover:scale-110                  /* Zoom leve no conjunto inteiro */
      
      /* ALTURA DO CONTAINER */
      h-30                             /* Altura fixa para alinhar os textos em baixo */
      md:h-48                          /* Altura maior em telas grandes */
    ">
      
      {/* AREA DA IMAGEM */}
      <div className="flex-grow flex items-center justify-center w-full">
        {!imgError ? (
          <img 
            src={logo} 
            alt={`Logo ${name}`} 
            className="
              h-17                     /* Altura da imagem no Mobile */
              md:h-25                  /* Altura da imagem no Desktop */
              max-w-[140px]            /* Largura máxima */
              md:max-w-[180px] 
              object-contain           /* Não distorce a imagem */
            " 
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 font-bold border border-slate-200">
            {name.charAt(0)}
          </div>
        )}
      </div>

      {/* NOME DO CLIENTE (Abaixo da logo) */}
      <span className="
        mt-2                           /* Margem superior para afastar da logo */
        text-[10px] md:text-xs         /* Tamanho da fonte (pequena e elegante) */
        font-semibold                  /* Peso da fonte semi-negrito */
        text-slate-500                 /* Cor cinza intermediária */
        text-center                    /* Centraliza o texto */
        uppercase                      /* Letras maiúsculas */
        tracking-wider                 /* Espaçamento entre letras */
        max-w-full truncate            /* Se o nome for gigante, ele não quebra o layout */
      ">
        {name}
      </span>
    </div>
  );
};

// COMPONENTE PRINCIPAL DA SEÇÃO
export const Clients: React.FC = () => {
  return (
    <div className="
      bg-white                         /* Fundo branco */
      py-16 md:py-24                   /* Padding vertical responsivo */
      border-b border-slate-100        /* Linha de separação */
    ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TÍTULO DISCRETO */}
        <p className="
          text-center 
          text-xs md:text-sm 
          font-bold 
          text-slate-400 
          uppercase 
          tracking-[0.2em] 
          mb-12 md:mb-20
        ">
          Empresas que confiam na nossa expertise
        </p>
        
        {/* GRID DE LOGOS */}
        <div className="
          grid 
          grid-cols-2                  /* Mobile: 2 colunas */
          sm:grid-cols-3               /* Tablet: 3 colunas */
          lg:grid-cols-4               /* Desktop: 4 colunas */
          xl:grid-cols-5               /* Telas grandes: 5 colunas */
          
          gap-x-8 gap-y-12             /* Espaçamento entre colunas e linhas */
          items-start                  /* Alinha os itens pelo topo da célula */
          justify-items-center
        ">
          {clients.map((client, index) => (
            <ClientLogo key={`${client.name}-${index}`} name={client.name} logo={client.logo} />
          ))}
        </div>
      </div>
    </div>
  );
};
