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
];

// COMPONENTE INDIVIDUAL DE LOGO
// Controla a aparência de CADA quadrado de logo
const ClientLogo = ({ name, logo }: { name: string; logo: string }) => {
  // Estado para controlar erro de imagem (se a imagem quebrar, mostra o texto)
  const [imgError, setImgError] = useState(false);

  return (
    // CONTAINER DO LOGO (A caixa que envolve a imagem)
    <div className="
      w-full                           /* Largura total disponível na coluna da grid */
      flex items-center justify-center /* Centraliza o conteúdo (a imagem) horizontal e verticalmente */
      p-4                              /* Espaçamento interno (padding) de 16px */
      
      /* EFEITO PRETO E BRANCO (GRAYSCALE) */
      md:grayscale                        /* Deixa a imagem preto e branco por padrão */
      hover:grayscale-0                /* Ao passar o mouse, remove o cinza (fica colorido) */
      /* DICA MOBILE: Para remover o cinza no celular, mude 'grayscale' para 'grayscale-0 md:grayscale' */

      /* EFEITO DE OPACIDADE (TRANSPARÊNCIA) */
      opacity-80                       /* Começa com 80% de visibilidade (levemente transparente) */
      hover:opacity-100                /* Ao passar o mouse, fica 100% visível */

      /* TRANSIÇÃO SUAVE */
      transition-all duration-300      /* Animação de 300ms para todas as mudanças (cor, tamanho, opacidade) */
      
      /* EFEITO DE ZOOM */
      hover:scale-110                  /* Aumenta o tamanho em 10% ao passar o mouse */
      
      /* ALTURA DO CONTAINER (Responsivo) */
      h-32                             /* Altura em celulares: 128px (8rem) */
      md:h-40                          /* Altura em Desktop (telas médias+): 160px (10rem) */
    ">
      {!imgError ? (
        // A IMAGEM EM SI
        <img 
          src={logo} 
          alt={`Logo ${name}`} 
          className="
            /* ALTURA DA IMAGEM (Responsivo) - Aumente aqui para crescer o logo */
            h-20                       /* Altura da imagem no Mobile: 80px */
            md:h-28                    /* Altura da imagem no Desktop: 112px */
            
            /* LARGURA MÁXIMA - Para não estourar se a imagem for muito larga */
            max-w-[160px]              /* Largura máxima no Mobile */
            md:max-w-[220px]           /* Largura máxima no Desktop */
            
            /* COMPORTAMENTO */
            object-contain             /* Garante que a imagem inteira apareça sem cortar, ajustando-se à caixa */
          " 
          loading="lazy"               /* Carregamento otimizado (só carrega quando aparece na tela) */
          onError={() => setImgError(true)} /* Se der erro, ativa o modo texto */
        />
      ) : (
        // FALLBACK DE TEXTO (Caso a imagem não carregue)
        <span className="text-sm md:text-base font-bold text-slate-500 text-center uppercase tracking-wide border border-slate-200 bg-slate-50 px-4 py-3 rounded-lg shadow-sm w-full truncate" title={name}>
          {name}
        </span>
      )}
    </div>
  );
};

// COMPONENTE PRINCIPAL (A SEÇÃO INTEIRA)
export const Clients: React.FC = () => {
  return (
    // CONTAINER DA SEÇÃO
    <div className="
      bg-white                         /* Cor de fundo da seção */
      py-20                            /* Espaçamento vertical (padding-top e padding-bottom): 80px */
      border-b border-slate-100        /* Linha sutil na parte inferior para separar da próxima seção */
    ">
      {/* LIMITADOR DE LARGURA (Para o conteúdo não ficar esticado em monitores gigantes) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TÍTULO DA SEÇÃO */}
        <p className="
          text-center                  /* Centraliza o texto */
          text-sm                      /* Tamanho da fonte pequeno */
          font-bold                    /* Negrito */
          text-slate-400               /* Cor cinza claro */
          uppercase                    /* Tudo em MAIÚSCULO */
          tracking-[0.2em]             /* Espaçamento entre as letras (bem espaçado) */
          mb-16                        /* Margem inferior (distância para os logos): 64px */
        ">
          Empresas que confiam na nossa expertise
        </p>
        
        {/* GRID LAYOUT (Agrade onde os logos ficam) */}
        <div className="
          grid                         /* Ativa o sistema de Grid */
          
          /* COLUNAS RESPONSIVAS (Quantos logos por linha) */
          grid-cols-2                  /* Mobile: 2 colunas */
          md:grid-cols-4               /* Tablet/Laptop pequeno: 4 colunas */
          lg:grid-cols-5               /* Desktop grande: 5 colunas */
          
          /* ESPAÇAMENTO ENTRE OS LOGOS */
          gap-12                       /* Distância entre colunas e linhas: 48px (Aumente ou diminua aqui) */
          
          /* ALINHAMENTO GERAL */
          items-center                 /* Alinha verticalmente no centro */
          justify-items-center         /* Alinha horizontalmente no centro de cada célula da grid */
        ">
          {/* Loop que cria os logos baseado na lista lá de cima */}
          {clients.map((client, index) => (
            <ClientLogo key={`${client.name}-${index}`} name={client.name} logo={client.logo} />
          ))}
        </div>
      </div>
    </div>
  );
};