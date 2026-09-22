import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export interface ServiceDetailItem {
  id: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  longDescription: string;
  icon: React.ReactNode;
  color: string;
}

interface OrbitalSolutionsNavProps {
  services: Record<string, ServiceDetailItem>;
  selectedServiceId: string;
  onNavigateToService?: (id: string) => void;
  getColorBadgeClass: (color: string) => string;
  getColorTextClass: (color: string) => string;
}

const COLOR_CONFIG: Record<string, {
  hex: string;
  activeBorder: string;
  glowColor: string;
  ringColor: string;
  bgLight: string;
  textColor: string;
}> = {
  indigo: {
    hex: '#6366f1',
    activeBorder: 'border-indigo-500',
    glowColor: 'rgba(99, 102, 241, 0.45)',
    ringColor: 'ring-indigo-400',
    bgLight: 'bg-indigo-50',
    textColor: 'text-indigo-600',
  },
  emerald: {
    hex: '#10b981',
    activeBorder: 'border-emerald-500',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    ringColor: 'ring-emerald-400',
    bgLight: 'bg-emerald-50',
    textColor: 'text-emerald-600',
  },
  blue: {
    hex: '#3b82f6',
    activeBorder: 'border-blue-500',
    glowColor: 'rgba(59, 130, 246, 0.45)',
    ringColor: 'ring-blue-400',
    bgLight: 'bg-blue-50',
    textColor: 'text-blue-600',
  },
  teal: {
    hex: '#14b8a6',
    activeBorder: 'border-teal-500',
    glowColor: 'rgba(20, 184, 166, 0.45)',
    ringColor: 'ring-teal-400',
    bgLight: 'bg-teal-50',
    textColor: 'text-teal-600',
  },
  violet: {
    hex: '#8b5cf6',
    activeBorder: 'border-violet-500',
    glowColor: 'rgba(139, 92, 246, 0.45)',
    ringColor: 'ring-violet-400',
    bgLight: 'bg-violet-50',
    textColor: 'text-violet-600',
  },
};

export const OrbitalSolutionsNav: React.FC<OrbitalSolutionsNavProps> = ({
  services,
  selectedServiceId,
  onNavigateToService,
}) => {
  const serviceList = Object.values(services);
  const serviceKeys = Object.keys(services);
  const currentIndex = Math.max(0, serviceKeys.indexOf(selectedServiceId));
  const activeService = services[selectedServiceId] || serviceList[0];
  const activeColorConfig = COLOR_CONFIG[activeService.color] || COLOR_CONFIG.blue;

  // Touch swipe support on mobile
  const touchStartX = useRef<number | null>(null);

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + serviceKeys.length) % serviceKeys.length;
    onNavigateToService?.(serviceKeys[prevIdx]);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % serviceKeys.length;
    onNavigateToService?.(serviceKeys[nextIdx]);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  // Touch handlers for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 45) {
      handlePrev();
    } else if (diff < -45) {
      handleNext();
    }
    touchStartX.current = null;
  };

  // Orbital angles calculation (5 items = 72 deg apart)
  // We place index 0 at -90deg (top: 12 o'clock)
  const getAngleForIndex = (index: number) => {
    return (index * (360 / serviceList.length) - 90) * (Math.PI / 180);
  };

  const handleCenterClick = () => {
    // Smooth scroll to the detailed content section if on smaller screens
    const detailCard = document.getElementById('solution-detail-content');
    if (detailCard) {
      detailCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  // Orbital geometry in 500x500 coordinate space
  const ORBIT_RADIUS = 195; // Radius in SVG units
  const ORBIT_PERCENT = 39; // Radius percentage for CSS positioning (195 / 500 = 39%)

  return (
    <div 
      className="w-full flex flex-col items-center select-none"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Navegador orbital de soluções"
    >
      {/* Orbital Stage Container - Responsive across Mobile, Tablet, and Desktop */}
      <div 
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[440px] md:max-w-[480px] lg:max-w-[460px] xl:max-w-[490px] aspect-square flex items-center justify-center p-2"
      >
        {/* Ambient Subtle Background Glow matching active service */}
        <div 
          className="absolute inset-8 rounded-full blur-[75px] opacity-35 transition-colors duration-700 pointer-events-none"
          style={{ backgroundColor: activeColorConfig.hex }}
        />

        {/* SVG Orbital Track, Ray Beam & Connectors */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          viewBox="0 0 500 500"
        >
          <defs>
            {/* Active beam gradient from center (250, 250) to active node */}
            <linearGradient 
              id="activeOrbitalBeamGrad" 
              x1="250" 
              y1="250" 
              x2={250 + ORBIT_RADIUS * Math.cos(getAngleForIndex(currentIndex))} 
              y2={250 + ORBIT_RADIUS * Math.sin(getAngleForIndex(currentIndex))}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.2" />
              <stop offset="60%" stopColor={activeColorConfig.hex} stopOpacity="0.75" />
              <stop offset="100%" stopColor={activeColorConfig.hex} stopOpacity="1" />
            </linearGradient>

            <filter id="orbitalGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer dashed orbit guide */}
          <circle 
            cx="250" 
            cy="250" 
            r="236" 
            fill="none" 
            stroke="#e2e8f0" 
            strokeWidth="1" 
            strokeDasharray="4 6"
            className="opacity-60"
          />

          {/* Main primary orbit circle (where satellites sit) */}
          <circle 
            cx="250" 
            cy="250" 
            r={ORBIT_RADIUS} 
            fill="none" 
            stroke="#cbd5e1" 
            strokeWidth="1.5"
            strokeDasharray="6 6"
            className="opacity-80 transition-colors duration-500"
          />

          {/* Inner orbit ring around the central description card */}
          <circle 
            cx="250" 
            cy="250" 
            r="132" 
            fill="none" 
            stroke="#e2e8f0" 
            strokeWidth="1.2" 
            className="opacity-70"
          />

          {/* Spokes to all satellite nodes */}
          {serviceList.map((_, idx) => {
            const angle = getAngleForIndex(idx);
            const x = 250 + ORBIT_RADIUS * Math.cos(angle);
            const y = 250 + ORBIT_RADIUS * Math.sin(angle);
            return (
              <line
                key={`spoke-${idx}`}
                x1="250"
                y1="250"
                x2={x}
                y2={y}
                stroke="#e2e8f0"
                strokeWidth="1"
                strokeDasharray="2 4"
                className="opacity-50"
              />
            );
          })}

          {/* Active Radiant Beam to the selected satellite node */}
          <motion.line
            x1="250"
            y1="250"
            x2={250 + ORBIT_RADIUS * Math.cos(getAngleForIndex(currentIndex))}
            y2={250 + ORBIT_RADIUS * Math.sin(getAngleForIndex(currentIndex))}
            stroke="url(#activeOrbitalBeamGrad)"
            strokeWidth="3"
            filter="url(#orbitalGlowFilter)"
            initial={false}
            animate={{
              x2: 250 + ORBIT_RADIUS * Math.cos(getAngleForIndex(currentIndex)),
              y2: 250 + ORBIT_RADIUS * Math.sin(getAngleForIndex(currentIndex)),
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          />

          {/* Animated pulse packet traveling on the beam */}
          <motion.circle
            r="3.5"
            fill={activeColorConfig.hex}
            animate={{
              cx: [
                250, 
                250 + ORBIT_RADIUS * Math.cos(getAngleForIndex(currentIndex))
              ],
              cy: [
                250, 
                250 + ORBIT_RADIUS * Math.sin(getAngleForIndex(currentIndex))
              ],
              opacity: [0.2, 1, 0],
              scale: [0.8, 1.4, 0.8]
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>

        {/* ======================================================== */}
        {/* CENTRAL HUB: Shows the Description and details of the button */}
        {/* ======================================================== */}
        <div 
          onClick={handleCenterClick}
          title="Clique para ver a análise completa"
          className="absolute z-20 w-[190px] h-[190px] xs:w-[215px] xs:h-[215px] sm:w-[250px] sm:h-[250px] md:w-[265px] md:h-[265px] rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-2xl flex flex-col items-center justify-center p-3.5 xs:p-4 sm:p-5 text-center cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group overflow-hidden"
          style={{
            boxShadow: `0 12px 36px -8px ${activeColorConfig.glowColor}, 0 4px 16px -4px rgba(0,0,0,0.06)`,
          }}
        >
          {/* Subtle colored accent glow in the center */}
          <div 
            className="absolute inset-0 rounded-full opacity-15 pointer-events-none transition-colors duration-500"
            style={{ 
              background: `radial-gradient(circle, ${activeColorConfig.hex} 0%, transparent 70%)` 
            }}
          />

          {/* Outer ring accent */}
          <div 
            className="absolute inset-1.5 rounded-full border border-dashed opacity-40 pointer-events-none transition-colors duration-500"
            style={{ borderColor: activeColorConfig.hex }}
          />

          {/* Dynamic Content with smooth transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, scale: 0.94, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -4 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className="flex flex-col items-center justify-center w-full h-full relative z-10 px-1"
            >
              {/* Category Pill Badge with Icon */}
              <div 
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] xs:text-[11px] font-bold tracking-tight mb-1 sm:mb-1.5 shadow-xs transition-colors duration-300"
                style={{ 
                  backgroundColor: `${activeColorConfig.hex}15`, 
                  color: activeColorConfig.hex 
                }}
              >
                <span 
                  className="w-1.5 h-1.5 rounded-full animate-pulse" 
                  style={{ backgroundColor: activeColorConfig.hex }} 
                />
                <span className="truncate max-w-[120px] xs:max-w-[145px] sm:max-w-[170px]">
                  {activeService.shortTitle}
                </span>
              </div>

              {/* Solution Title */}
              <h4 className="font-bold text-[11px] xs:text-xs sm:text-sm md:text-[15px] text-slate-900 leading-tight line-clamp-2 px-1 mb-1 sm:mb-1.5">
                {activeService.title}
              </h4>

              {/* SOLUTION DESCRIPTION (Requested in the Center) */}
              <p className="text-[10px] xs:text-[11px] sm:text-xs text-slate-600 leading-snug sm:leading-relaxed line-clamp-3 xs:line-clamp-3 sm:line-clamp-4 px-1 max-w-[170px] xs:max-w-[195px] sm:max-w-[220px]">
                {activeService.description}
              </p>

              {/* Action Hint / Link */}
              <div className="mt-1.5 sm:mt-2.5 flex items-center gap-1 text-[9px] xs:text-[10px] font-semibold text-slate-400 group-hover:text-blue-600 transition-colors">
                <span>Ver detalhes</span>
                <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 transition-transform group-hover:translate-x-0.5" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ======================================================== */}
        {/* 5 ORBITING SATELLITE BUTTONS (Mobile & Desktop)           */}
        {/* ======================================================== */}
        {serviceList.map((service, idx) => {
          const isActive = service.id === selectedServiceId;
          const angle = getAngleForIndex(idx);
          const config = COLOR_CONFIG[service.color] || COLOR_CONFIG.blue;

          // Trigonometric offset percentages: radius = 39% of container
          const leftPercent = 50 + ORBIT_PERCENT * Math.cos(angle);
          const topPercent = 50 + ORBIT_PERCENT * Math.sin(angle);

          return (
            <div
              key={service.id}
              className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${leftPercent}%`,
                top: `${topPercent}%`,
              }}
            >
              <motion.button
                type="button"
                onClick={() => onNavigateToService?.(service.id)}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  scale: isActive ? 1.15 : 1,
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                aria-label={`Selecionar solução: ${service.shortTitle}`}
                aria-pressed={isActive}
                className={`relative group flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl touch-manipulation ${
                  isActive ? 'z-40' : 'z-20'
                }`}
              >
                {/* Active Outer Glow Halo */}
                {isActive && (
                  <motion.div 
                    layoutId="activeOrbitHalo"
                    className="absolute -inset-1.5 sm:-inset-2 rounded-2xl sm:rounded-3xl opacity-80 blur-sm transition-all pointer-events-none"
                    style={{ backgroundColor: config.glowColor }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}

                {/* Satellite Core Button */}
                <div
                  className={`w-11 h-11 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-15 md:h-15 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 shadow-md ${
                    isActive
                      ? 'bg-slate-900 text-white border-2 shadow-xl ring-2'
                      : 'bg-white text-slate-700 border border-slate-200/90 hover:border-slate-300 hover:shadow-lg'
                  }`}
                  style={{
                    borderColor: isActive ? config.hex : undefined,
                    boxShadow: isActive ? `0 8px 22px ${config.glowColor}` : undefined,
                  }}
                >
                  {/* Service Icon */}
                  <div className={`transition-colors duration-200 ${
                    isActive ? 'text-white' : config.textColor
                  }`}>
                    {React.cloneElement(service.icon as React.ReactElement<{ className?: string }>, { 
                      className: 'w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6' 
                    })}
                  </div>
                </div>

                {/* Satellite Title Pill Badge */}
                <div 
                  className={`mt-1 sm:mt-1.5 px-2 py-0.5 rounded-full text-[9px] xs:text-[10px] sm:text-[11px] font-bold tracking-tight whitespace-nowrap transition-all duration-200 shadow-xs border pointer-events-none max-w-[85px] xs:max-w-[100px] sm:max-w-[125px] truncate ${
                    isActive
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-105'
                      : 'bg-white/95 backdrop-blur-xs text-slate-700 border-slate-200/90 group-hover:bg-white group-hover:text-slate-900 group-hover:border-slate-300'
                  }`}
                >
                  {service.shortTitle}
                </div>
              </motion.button>
            </div>
          );
        })}
      </div>

      {/* Bottom Progress Track Dots & Navigation Controls */}
      <div className="flex flex-col items-center gap-2 mt-2 sm:mt-3">
        <div className="flex items-center gap-2 bg-white/90 border border-slate-200/90 px-2 py-1 rounded-full shadow-xs">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Solução anterior"
            className="w-6 h-6 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          
          <div className="flex items-center gap-1.5 px-1">
            {serviceKeys.map((key, idx) => (
              <button
                key={`dot-${key}`}
                type="button"
                onClick={() => onNavigateToService?.(key)}
                aria-label={`Navegar para ${services[key]?.shortTitle}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'w-6 bg-slate-900'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Próxima solução"
            className="w-6 h-6 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-[11px] text-slate-500 font-medium text-center px-4">
          Toque nas opções orbitais ou deslize para alternar entre as soluções
        </p>
      </div>
    </div>
  );
};
