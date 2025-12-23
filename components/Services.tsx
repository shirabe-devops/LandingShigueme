
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { BarChart3, Coins, ClipboardList, TrendingUp, Sprout } from 'lucide-react';
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface TabContent {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
}

interface Tab {
  value: string;
  icon: React.ReactNode;
  label: string;
  content: TabContent;
}

const serviceTabs: Tab[] = [
  {
    value: "consultoria",
    icon: <ClipboardList className="h-4 w-4 shrink-0" />,
    label: "Consultoria",
    content: {
      badge: "Inteligência Gerencial",
      title: "Consultoria Contábil e Financeira",
      description: "Investigação minuciosa para mapear a posição empresarial, identificar gargalos operacionais e implementar inteligência gerencial baseada em dados reais.",
      buttonText: "Ver Detalhes",
      imageSrc: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
      imageAlt: "Análise contábil detalhada",
    },
  },
  {
    value: "reforma",
    icon: <BarChart3 className="h-4 w-4 shrink-0" />,
    label: "Adequação",
    content: {
      badge: "Transição 2026",
      title: "Prontos para a Reforma Tributária",
      description: "Prepare-se para o IBS e CBS. Realizamos análise preditiva de impacto da unificação tributária no seu ecossistema financeiro para os próximos anos.",
      buttonText: "Ver Detalhes",
      imageSrc: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop",
      imageAlt: "Documentos fiscais e cálculos",
    },
  },
  {
    value: "creditos",
    icon: <Coins className="h-4 w-4 shrink-0" />,
    label: "Créditos",
    content: {
      badge: "Recuperação de Ativos",
      title: "Recupere Ativos Fiscais Ocultos",
      description: "Algoritmos avançados para identificação e resgate de ativos fiscais ocultos e verbas previdenciárias indevidas diretamente na esfera administrativa.",
      buttonText: "Ver Detalhes",
      imageSrc: "https://res.cloudinary.com/dw9ohxxgw/image/upload/v1766446882/istockphoto-1448519280-612x612_eeynpr.jpg",
      imageAlt: "Tecnologia financeira",
    },
  },
  {
    value: "agro",
    icon: <Sprout className="h-4 w-4 shrink-0" />,
    label: "Agro",
    content: {
      badge: "Soluções Rurais",
      title: "Excelência no Agronegócio",
      description: "Gestão técnica de LCDPR, ITR e planejamento para o produtor rural. Transformando a lida no campo em eficiência fiscal e sucessão familiar sólida.",
      buttonText: "Ver Detalhes",
      imageSrc: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop",
      imageAlt: "Gestão de terras e agro",
    },
  },
  {
    value: "planejamento",
    icon: <TrendingUp className="h-4 w-4 shrink-0" />,
    label: "Planejamento",
    content: {
      badge: "Estratégia Societária",
      title: "Engenharia Tributária Estratégica",
      description: "Engenharia societária personalizada para garantir a menor carga tributária possível, sempre alinhada à legislação vigente e tendências fiscais.",
      buttonText: "Ver Detalhes",
      imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      imageAlt: "Planejamento empresarial",
    },
  },
];

interface ServicesProps {
  onSelectService?: (id: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="bg-slate-950 py-32 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900 rounded-full blur-[150px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center gap-4 text-center mb-12">
          <Badge variant="outline" className="px-4 py-1 border-blue-500/50 text-blue-400">
            Especialidades Tributárias
          </Badge>
          <h2 className="max-w-2xl text-4xl font-bold md:text-5xl text-white">
            Nossas <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Soluções</span>
          </h2>
          <p className="text-slate-400 max-w-xl text-lg">
            Transformamos a complexidade tributária em vantagem competitiva para sua empresa através de inteligência e compliance.
          </p>
        </div>

        <Tabs defaultValue={serviceTabs[0].value} className="mt-8">
          <TabsList className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-8 mb-12">
            {serviceTabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all
                  text-slate-500 
                  data-[state=active]:bg-slate-800 
                  data-[state=active]:text-blue-400 
                  data-[state=active]:shadow-lg
                  hover:text-slate-300"
              >
                {tab.icon} {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <div className="mx-auto max-w-screen-xl rounded-3xl bg-slate-900/40 border border-slate-800/50 p-6 lg:p-16 backdrop-blur-sm">
            {serviceTabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="grid place-items-center gap-12 lg:grid-cols-2 lg:gap-10 outline-none animate-in fade-in zoom-in-95 duration-500"
              >
                <div className="flex flex-col gap-5 text-left">
                  <Badge variant="outline" className="w-fit bg-slate-950 border-blue-500/30 text-blue-300">
                    {tab.content.badge}
                  </Badge>
                  <h3 className="text-3xl font-bold lg:text-5xl text-white leading-tight">
                    {tab.content.title}
                  </h3>
                  <p className="text-slate-400 lg:text-lg leading-relaxed">
                    {tab.content.description}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <Button 
                      size="lg" 
                      onClick={() => {
                        const idMapping: Record<string, string> = {
                          'consultoria': 'consultoria-contabil',
                          'reforma': 'adequacao-reforma',
                          'creditos': 'recuperacao-creditos',
                          'agro': 'agro-intelligence',
                          'planejamento': 'planejamento-estrategico'
                        };
                        onSelectService?.(idMapping[tab.value]);
                      }}
                    >
                      {tab.content.buttonText}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
                    >
                      Falar com Consultor
                    </Button>
                  </div>
                </div>
                <div className="relative group w-full">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                  <img
                    src={tab.content.imageSrc}
                    alt={tab.content.imageAlt}
                    className="relative rounded-2xl w-full object-cover aspect-video lg:aspect-square shadow-2xl grayscale-[50%] group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
};
