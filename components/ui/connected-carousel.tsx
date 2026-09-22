"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import type { HTMLAttributes, MouseEvent, KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CarouselItem {
  id: string | number;
  stat: string;
  quote: string;
  author: string;
  role: string;
  defaultImage: string;
  selectedImage: string;
  alt?: string;
  actionText?: string;
  onAction?: () => void;
}

export interface CalendlyCarouselProps extends HTMLAttributes<HTMLDivElement> {
  items: CarouselItem[];
  autoPlayInterval?: number;
  pauseOnHover?: boolean;
  activeId?: string | number;
  onActiveChange?: (index: number, item: CarouselItem) => void;
}

type ScreenTier = "mobile" | "tablet" | "desktop";

const VISIBLE_OFFSETS = [-4, -3, -2, -1, 0, 1, 2, 3, 4] as const;

const TRANSITION_SPRING = {
  type: "spring",
  stiffness: 220,
  damping: 26,
  mass: 0.75,
} as const;

export function CalendlyCarousel({
  items,
  autoPlayInterval = 7000,
  pauseOnHover = true,
  activeId,
  onActiveChange,
  className,
  ...props
}: CalendlyCarouselProps) {
  // Container & Touch Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  // State
  const [page, setPage] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [tier, setTier] = useState<ScreenTier>("desktop");
  const [viewportWidth, setViewportWidth] = useState<number>(1200);

  // Global State/Hooks
  const total = items.length || 1;
  const activeIndex = ((page % total) + total) % total;

  // External activeId sync: only run when activeId actually changes from outside
  const prevActiveIdRef = useRef<string | number | undefined>(activeId);

  useEffect(() => {
    if (activeId !== undefined && activeId !== prevActiveIdRef.current) {
      prevActiveIdRef.current = activeId;
      const idx = items.findIndex((it) => it.id === activeId);
      if (idx !== -1 && idx !== activeIndex) {
        let diff = idx - activeIndex;
        if (diff > total / 2) diff -= total;
        else if (diff < -total / 2) diff += total;
        setPage((curr) => curr + diff);
      }
    }
  }, [activeId, items, total, activeIndex]);

  // Notify parent on active index change
  useEffect(() => {
    const currentItem = items[activeIndex];
    if (currentItem) {
      prevActiveIdRef.current = currentItem.id;
      onActiveChange?.(activeIndex, currentItem);
    }
  }, [activeIndex]);

  // Responsive Tier Detection
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setViewportWidth(width);

      if (width < 768) {
        setTier("mobile");
      } else if (width < 1120) {
        setTier("tablet");
      } else {
        setTier("desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handlers
  const handlePrev = useCallback(() => {
    setPage((curr) => curr - 1);
  }, []);

  const handleNext = useCallback(() => {
    setPage((curr) => curr + 1);
  }, []);

  // Auto-play interval without high-frequency re-rendering
  useEffect(() => {
    if (autoPlayInterval <= 0) return;
    if (pauseOnHover && isHovered) return;

    const timer = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [page, pauseOnHover, isHovered, autoPlayInterval, handleNext]);

  const handleSelectTab = (targetIdx: number) => {
    let diff = targetIdx - activeIndex;
    if (diff > total / 2) {
      diff -= total;
    } else if (diff < -total / 2) {
      diff += total;
    }
    setPage((curr) => curr + diff);
  };

  const handleSelectCard = (event: MouseEvent<HTMLDivElement>) => {
    const offsetStr = event.currentTarget.dataset.offset;
    if (offsetStr !== undefined) {
      const offset = Number.parseInt(offsetStr, 10);
      if (offset !== 0) {
        setPage((curr) => curr + offset);
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartXRef.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    touchStartXRef.current = null;
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      handlePrev();
    } else if (event.key === "ArrowRight") {
      handleNext();
    }
  };

  const activeDimensions = {
    desktop: { width: 762, height: 513 },
    tablet: { width: 560, height: 440 },
    mobile: { width: Math.min(340, viewportWidth - 36), height: 500 },
  }[tier];

  return (
    <div
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Soluções Tributárias"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={cn(
        "relative w-full max-w-[1240px] mx-auto flex flex-col items-center select-none outline-none py-2 overflow-hidden",
        className
      )}
      {...props}
    >
      <div
        id="carousel-view-panel"
        role="tabpanel"
        aria-live="polite"
        className="relative w-full flex items-center justify-center"
        style={{ height: activeDimensions.height }}
      >
        {VISIBLE_OFFSETS.map((offset) => {
          const virtualIndex = page + offset;
          const itemIndex = ((virtualIndex % total) + total) % total;
          const item = items[itemIndex];
          if (!item) return null;
          const isActive = offset === 0;

          const getVariant = () => {
            if (tier === "mobile") {
              const activeW = activeDimensions.width;
              const activeH = activeDimensions.height;
              const gap = 16;
              const peekW = 60;
              const peekH = 410;

              if (offset === 0) {
                return {
                  x: -activeW / 2,
                  y: -activeH / 2,
                  width: activeW,
                  height: activeH,
                  opacity: 1,
                  zIndex: 0,
                  pointerEvents: "auto" as const,
                };
              }

              if (offset === -1) {
                return {
                  x: -activeW / 2 - gap - peekW,
                  y: -peekH / 2,
                  width: peekW,
                  height: peekH,
                  opacity: 1,
                  zIndex: 100,
                  pointerEvents: "auto" as const,
                };
              }

              if (offset === 1) {
                return {
                  x: activeW / 2 + gap,
                  y: -peekH / 2,
                  width: peekW,
                  height: peekH,
                  opacity: 1,
                  zIndex: 100,
                  pointerEvents: "auto" as const,
                };
              }

              return {
                x: offset < 0 ? -activeW / 2 - 220 : activeW / 2 + 220,
                y: -peekH / 2,
                width: peekW,
                height: peekH,
                opacity: 0,
                zIndex: 0,
                pointerEvents: "none" as const,
              };
            }

            if (tier === "tablet") {
              const activeW = 560;
              const activeH = 440;
              const gap = 18;
              const sideW = 100;
              const sideH = 340;

              if (offset === 0) {
                return {
                  x: -activeW / 2,
                  y: -activeH / 2,
                  width: activeW,
                  height: activeH,
                  opacity: 1,
                  zIndex: 0,
                  pointerEvents: "auto" as const,
                };
              }

              if (offset === -1) {
                return {
                  x: -activeW / 2 - gap - sideW,
                  y: -sideH / 2,
                  width: sideW,
                  height: sideH,
                  opacity: 1,
                  zIndex: 100,
                  pointerEvents: "auto" as const,
                };
              }

              if (offset === 1) {
                return {
                  x: activeW / 2 + gap,
                  y: -sideH / 2,
                  width: sideW,
                  height: sideH,
                  opacity: 1,
                  zIndex: 100,
                  pointerEvents: "auto" as const,
                };
              }

              return {
                x: offset < 0 ? -activeW / 2 - 240 : activeW / 2 + 240,
                y: -sideH / 2,
                width: 74,
                height: 205,
                opacity: 0,
                zIndex: 0,
                pointerEvents: "none" as const,
              };
            }

            switch (offset) {
              case 0:
                return {
                  x: -381,
                  y: -256.5,
                  width: 762,
                  height: 513,
                  opacity: 1,
                  zIndex: 0,
                  pointerEvents: "auto" as const,
                };
              case -1:
                return {
                  x: -506,
                  y: -172,
                  width: 105,
                  height: 344,
                  opacity: 1,
                  zIndex: 100,
                  pointerEvents: "auto" as const,
                };
              case 1:
                return {
                  x: 401,
                  y: -172,
                  width: 105,
                  height: 344,
                  opacity: 1,
                  zIndex: 100,
                  pointerEvents: "auto" as const,
                };
              case -2:
                return {
                  x: -596,
                  y: -102.5,
                  width: 74,
                  height: 205,
                  opacity: 1,
                  zIndex: 100,
                  pointerEvents: "auto" as const,
                };
              case 2:
                return {
                  x: 522,
                  y: -102.5,
                  width: 74,
                  height: 205,
                  opacity: 1,
                  zIndex: 100,
                  pointerEvents: "auto" as const,
                };
              case -3:
                return {
                  x: -720,
                  y: -102.5,
                  width: 74,
                  height: 205,
                  opacity: 0,
                  zIndex: 0,
                  pointerEvents: "none" as const,
                };
              case 3:
                return {
                  x: 646,
                  y: -102.5,
                  width: 74,
                  height: 205,
                  opacity: 0,
                  zIndex: 0,
                  pointerEvents: "none" as const,
                };
              default:
                return {
                  x: offset < 0 ? -860 : 860,
                  y: -102.5,
                  width: 74,
                  height: 205,
                  opacity: 0,
                  zIndex: 0,
                  pointerEvents: "none" as const,
                };
            }
          };

          return (
            <motion.div
              key={virtualIndex}
              data-offset={offset}
              onClick={handleSelectCard}
              initial={false}
              animate={getVariant()}
              transition={TRANSITION_SPRING}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                willChange: "transform",
              }}
              className={cn(
                "rounded-[28px] sm:rounded-[32px] bg-white text-slate-900 border border-slate-200 shadow-[0_10px_30px_rgba(15,23,42,0.08),0_4px_12px_rgba(15,23,42,0.04)] overflow-visible",
                !isActive && "cursor-pointer"
              )}
            >
              {offset === -1 && (
                <div
                  aria-hidden="true"
                  className="absolute top-0 bottom-0 flex items-center text-white pointer-events-none z-[100]"
                  style={{
                    width: 22,
                    height: 42,
                    margin: "auto 0",
                    left: "calc(100% - 1px)",
                  }}
                >
                  <svg
                    viewBox="0 0 20 37.3338"
                    preserveAspectRatio="none"
                    className="size-full fill-current overflow-visible block drop-shadow-sm"
                  >
                    <path d="M0 0C0 0 1.2422 13.5759 10 13.5759C18.7578 13.5759 20 0 20 0V37.3338C20 37.3338 18.7578 23.7578 10 23.7578C1.2422 23.7578 0 37.3338 0 37.3338V0Z" />
                  </svg>
                </div>
              )}

              {offset === 1 && (
                <div
                  aria-hidden="true"
                  className="absolute top-0 bottom-0 flex items-center text-white pointer-events-none z-[100]"
                  style={{
                    width: 22,
                    height: 42,
                    margin: "auto 0",
                    right: "calc(100% - 1px)",
                  }}
                >
                  <svg
                    viewBox="0 0 20 37.3338"
                    preserveAspectRatio="none"
                    className="size-full fill-current overflow-visible block drop-shadow-sm"
                  >
                    <path d="M0 0C0 0 1.2422 13.5759 10 13.5759C18.7578 13.5759 20 0 20 0V37.3338C20 37.3338 18.7578 23.7578 10 23.7578C1.2422 23.7578 0 37.3338 0 37.3338V0Z" />
                  </svg>
                </div>
              )}

              {offset === -2 && tier === "desktop" && (
                <div
                  aria-hidden="true"
                  className="absolute top-0 bottom-0 flex items-center text-white pointer-events-none z-[100]"
                  style={{
                    width: 18,
                    height: 28,
                    margin: "auto 0",
                    left: "calc(100% - 1px)",
                  }}
                >
                  <svg
                    viewBox="0 0 16 28"
                    preserveAspectRatio="none"
                    className="size-full fill-current overflow-visible block drop-shadow-sm"
                  >
                    <path d="M0 0C0 0 0.993759 10.1818 8 10.1818C15.0062 10.1818 16 0 16 0V28C16 28 15.0062 17.8182 8 17.8182C0.993759 17.8182 0 28 0 28V0Z" />
                  </svg>
                </div>
              )}

              {offset === 2 && tier === "desktop" && (
                <div
                  aria-hidden="true"
                  className="absolute top-0 bottom-0 flex items-center text-white pointer-events-none z-[100]"
                  style={{
                    width: 18,
                    height: 28,
                    margin: "auto 0",
                    right: "calc(100% - 1px)",
                  }}
                >
                  <svg
                    viewBox="0 0 16 28"
                    preserveAspectRatio="none"
                    className="size-full fill-current overflow-visible block drop-shadow-sm"
                  >
                    <path d="M0 0C0 0 0.993759 10.1818 8 10.1818C15.0062 10.1818 16 0 16 0V28C16 28 15.0062 17.8182 8 17.8182C0.993759 17.8182 0 28 0 28V0Z" />
                  </svg>
                </div>
              )}

              <div
                className="size-full overflow-hidden relative"
                style={{ borderRadius: "inherit" }}
              >
                <motion.div
                  initial={false}
                  animate={{ opacity: isActive ? 0 : 1 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className={cn(
                    "absolute inset-0 p-2",
                    isActive && "pointer-events-none"
                  )}
                >
                  <div className="size-full rounded-[20px] sm:rounded-[24px] overflow-hidden bg-slate-100 relative">
                    <Image
                      alt={item.alt || item.author}
                      src={item.defaultImage}
                      fill
                      unoptimized
                      draggable={false}
                      style={{ objectFit: "cover" }}
                      className="size-full object-cover"
                    />
                  </div>
                </motion.div>

                <div
                  className="absolute"
                  style={{
                    left: "50%",
                    top: "50%",
                    width: activeDimensions.width,
                    height: activeDimensions.height,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      x: isActive ? 0 : offset < 0 ? -822 : 822,
                    }}
                    transition={TRANSITION_SPRING}
                    className={cn(
                      "size-full flex flex-col md:flex-row p-5 sm:p-6 md:p-8 gap-4 sm:gap-5 md:gap-6 bg-white",
                      !isActive && "pointer-events-none"
                    )}
                  >
                    <div className="flex-1 min-w-0 flex flex-col items-center md:items-start text-center md:text-left justify-between py-1 gap-2 sm:gap-3">
                      <h3
                        title={item.stat}
                        className="text-xl sm:text-2xl md:text-3xl lg:text-3.5xl font-bold tracking-tight text-slate-900 leading-tight w-full"
                      >
                        {item.stat}
                      </h3>

                      <div className="relative w-full min-w-0 my-auto py-1">
                        <span
                          aria-hidden="true"
                          className="font-serif text-3xl sm:text-4xl text-blue-500/30 absolute right-full top-0 pr-1 select-none pointer-events-none hidden md:inline"
                        >
                          “
                        </span>

                        <p className="text-xs sm:text-base md:text-lg text-slate-600 leading-relaxed font-normal">
                          {item.quote}
                        </p>
                      </div>

                      <div className="flex min-w-0 w-full max-w-full overflow-hidden items-center md:items-start justify-center md:justify-start">
                        <div className="flex flex-col items-center md:items-start min-w-0 max-w-full">
                          <span className="w-fit inline-flex items-center justify-center rounded-md font-semibold py-1 px-3 text-xs sm:text-sm bg-blue-50 text-blue-700 shrink-0 select-none">
                            <span className="whitespace-nowrap">
                              {item.author}
                            </span>
                          </span>

                          <div className="shrink-0 flex items-center justify-center md:justify-start px-3 h-[6px] -my-[1px] text-blue-50 relative z-10">
                            <svg
                              className="block shrink-0 fill-current overflow-visible"
                              preserveAspectRatio="none"
                              viewBox="0 -2 14 12"
                              width="14"
                              height="10"
                            >
                              <path d="M0 -2 V0 C0 0 5.09091 0.49688 5.09091 4 C5.09091 7.50312 0 8 0 8 V10 H14 V8 C14 8 8.90909 7.50312 8.90909 4 C8.90909 0.49688 14 0 14 0 V-2 Z" />
                            </svg>
                          </div>

                          <span className="w-fit inline-flex items-center justify-center rounded-md font-medium py-1 px-2.5 text-[11px] sm:text-xs bg-slate-100 text-slate-600 max-w-full select-none">
                            <span
                              title={item.role}
                              className="truncate"
                            >
                              {item.role}
                            </span>
                          </span>
                        </div>
                      </div>

                      {item.onAction && (
                        <div className="mt-2 w-full flex justify-center md:justify-start pt-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              item.onAction?.();
                            }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-medium text-xs sm:text-sm hover:bg-slate-800 transition-colors shadow-md hover:shadow-lg active:scale-95"
                          >
                            <span>{item.actionText || "Conversar sobre esta solução"}</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="relative shrink-0 overflow-hidden rounded-[18px] sm:rounded-[22px] bg-slate-100 w-full md:w-[clamp(180px,44%,330px)] flex-1 md:flex-initial md:h-full max-h-[220px] md:max-h-none shadow-inner">
                      <Image
                        alt={item.alt || item.author}
                        src={item.selectedImage}
                        fill
                        unoptimized
                        draggable={false}
                        style={{ objectFit: "cover" }}
                        className="size-full object-cover"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Controls Bar (Prev, Dots, Next) */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Solução anterior"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/50 transition-all active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div
          role="tablist"
          aria-label="Soluções Tributárias"
          className="flex items-center gap-2"
        >
          {items.map((item, idx) => {
            const isSelected = idx === activeIndex;

            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                data-index={idx}
                id={`carousel-tab-${idx}`}
                aria-controls="carousel-view-panel"
                onClick={() => handleSelectTab(idx)}
                aria-selected={isSelected}
                aria-label={`Solução ${idx + 1}: ${item.stat}`}
                tabIndex={isSelected ? 0 : -1}
                className={cn(
                  "h-[8px] rounded-[4px] overflow-hidden border-0 p-0 cursor-pointer transition-[width] duration-300 ease-out outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                  isSelected
                    ? "w-[64px] sm:w-[80px] bg-slate-200"
                    : "w-[12px] bg-slate-300 hover:bg-slate-400"
                )}
              >
                {isSelected && (
                  <div
                    key={`bar-${page}`}
                    className="h-full rounded-[4px] bg-blue-600 origin-left"
                    style={{
                      animation: isHovered && pauseOnHover
                        ? "none"
                        : `carouselProgress ${autoPlayInterval}ms linear forwards`,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Próxima solução"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/50 transition-all active:scale-95 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-2 text-xs text-slate-400 font-medium tracking-wide">
        Soluções disponíveis ({activeIndex + 1} de {total})
      </div>
    </div>
  );
}
