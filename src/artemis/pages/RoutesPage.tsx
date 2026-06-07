"use client";

import { useRef, useState, useMemo, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  MapPin,
  Package,
  Banknote,
  Database,
  Users,
  Clock,
  Sun,
  Compass,
  Flame,
  Anchor,
  Check,
  Route,
  Sparkles,
  X,
} from "lucide-react";
import { Link } from "@/artemis/router";
import {
  routeLegs,
  annualSchedule,
  routeMetrics,
  arcPricing,
  fullRoutePricing,
  arcImages,
  MAP_LOCATIONS,
} from "@/artemis/data/routes";
import type { RouteLeg, KeyCity, MapLocation } from "@/artemis/data/routes";

/* ══════════════════════════════════════════════════════════════════════════
   ROUTES BRIDGE — Image strip + two-column routes thesis with dotted map
   ══════════════════════════════════════════════════════════════════════════ */

const routesBridgeImages = [
  {
    src: "https://images.unsplash.com/photo-1611348524140-53c9a25263d6?auto=format&fit=crop&w=800&q=80",
    alt: "Nairobi skyline",
  },
  {
    src: "https://images.unsplash.com/photo-1741991110666-88115e724741?auto=format&fit=crop&w=800&q=80",
    alt: "African cityscape",
  },
  {
    src: "https://images.unsplash.com/photo-1669127300649-940337f1487e?auto=format&fit=crop&w=800&q=80",
    alt: "African city development",
  },
];

/* Dot-matrix world map for Routes page */
const routesWorldDots = (() => {
  const rows = [
    ".......##..........###.............#####..####..............",
    "......####.........####............######.######............",
    ".....######........#####...........########.######..........",
    ".....#######.......#####..........#########..######.........",
    "....#########......######.........#########...######........",
    "....##########.....#######........#########....#####........",
    "...############....########.......########.....#####........",
    "...############....########.......########......####........",
    "....###########....#########......#######.......####........",
    "....##########.....##########.....######........###.........",
    ".....#########.....##########.....######........###.........",
    "......########.....###########....#####.........##..........",
    ".......#######.....###########....#####.........##..........",
    "........######.....############...######.........#..........",
    ".........#####.....####.#####....########...................",
    "..........####.....####..####...#########...................",
    "...........###.....####...####..#########...................",
    "............##.....####....###..########....................",
    ".............#......###....###..#######.....................",
    "....................###.....##...######.....................",
    ".....................##.....##...#####......................",
    "......................##.....#...####.......................",
    ".......................#.........###........................",
    "................................##.........................",
    "................................#..........................",
    "............................................................",
    "............................................................",
    "............................................................",
    "............................................................",
    "............................................................",
  ];
  const dots: { row: number; col: number }[] = [];
  rows.forEach((row, r) => {
    [...row].forEach((ch, c) => {
      if (ch === "#") dots.push({ row: r, col: c });
    });
  });
  return dots;
})();

function RoutesBridge() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-20 pb-16 md:pb-24 border-b border-[#111111]/10">
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Image strip — three overlapping images */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-end justify-start gap-0 mb-16 md:mb-24"
        >
          {routesBridgeImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`relative overflow-hidden bg-[#F5F5F5] shadow-lg ${
                i === 0
                  ? "w-[36%] md:w-[32%] aspect-[4/3] z-10"
                  : i === 1
                  ? "w-[44%] md:w-[40%] aspect-[4/3] z-30 -mt-3 -ml-[8%] md:-ml-[4%]"
                  : "w-[36%] md:w-[32%] aspect-[4/3] z-10 -ml-[8%] md:-ml-[4%]"
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Two-column layout: text left, dotted map right */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Routes thesis text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6"
          >
            <p className="text-[22px] sm:text-[28px] md:text-[34px] leading-[1.25] font-display font-medium tracking-[-0.02em] text-[#111111] mb-6 md:mb-8">
              The world doesn&apos;t operate in countries. It operates in <span className="text-[#FF4D00]">Routes</span>.
            </p>
            <p className="text-[15px] md:text-[17px] leading-[1.7] text-[#111111]/60 font-medium max-w-xl">
              The Hanseatic League connected 190 cities through shared protocols for trade, law, and mutual defense. It lasted 300 years and made its member cities the wealthiest in Europe — not through conquest, but through flow. xCelero rebuilds that model for the 21st century: 190 hubs, 39 countries, one circulatory system for goods, capital, data, and people. <span className="text-[#111111] font-semibold">Where the Route connects, prosperity follows.</span>
            </p>
          </motion.div>

          {/* Right: Dotted world map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg">
              <svg
                viewBox="0 0 60 30"
                className="w-full h-auto"
                style={{ imageRendering: "auto" }}
              >
                {/* All land dots in dark color */}
                {routesWorldDots.map((dot, i) => (
                  <circle
                    key={i}
                    cx={dot.col * 1}
                    cy={dot.row * 1}
                    r="0.35"
                    className="fill-[#111111]/70"
                  />
                ))}
                {/* Africa highlighted region — cols 23-33, rows 3-21 */}
                {routesWorldDots
                  .filter(
                    (d) =>
                      d.col >= 23 && d.col <= 33 && d.row >= 3 && d.row <= 21
                  )
                  .map((dot, i) => (
                    <circle
                      key={`af-${i}`}
                      cx={dot.col * 1}
                      cy={dot.row * 1}
                      r="0.4"
                      className="fill-[#FF4D00]"
                    />
                  ))}
              </svg>
              {/* Label */}
              <div className="absolute bottom-2 right-4 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00]">
                6 Legs · 190 Hubs
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}



/* ══════════════════════════════════════════════════════════════════════════
   ROUTES PAGE
   ══════════════════════════════════════════════════════════════════════════ */
export function RoutesPage() {
  const [activeLeg, setActiveLeg] = useState<string | null>(null);
  const [expandedLeg, setExpandedLeg] = useState<string | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play: cycle through legs every 4 seconds when no manual selection
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveLeg((prev) => {
        const currentIdx = prev
          ? routeLegs.findIndex((l) => l.id === prev)
          : -1;
        const nextIdx = (currentIdx + 1) % routeLegs.length;
        return routeLegs[nextIdx].id;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  // Manual leg selection: stops auto-play
  const manualSetActiveLeg = useCallback((id: string | null) => {
    setIsAutoPlaying(false);
    setActiveLeg(id);
  }, []);

  // Synchronized: map click expands accordion, accordion hover/click highlights map
  const handleLegSelectFromMap = useCallback((legId: string) => {
    setIsAutoPlaying(false);
    setActiveLeg(legId);
    setExpandedLeg(legId);
    // Scroll to the accordion panel after a brief delay for expansion
    setTimeout(() => {
      const el = document.getElementById(`leg-${legId}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, []);

  const handleLegSelectFromAccordion = useCallback((legId: string) => {
    if (!isAutoPlaying) {
      setActiveLeg(legId);
    }
  }, [isAutoPlaying]);

  const handleLegDeselectFromAccordion = useCallback(() => {
    if (!isAutoPlaying) {
      setActiveLeg(null);
    }
  }, [isAutoPlaying]);

  return (
    <div className="bg-[#FAFAFA] text-[#111111]">
      <HeroSection />
      <PreambleSection />
      <RoutesBridge />
      <MapSection
        activeLeg={activeLeg}
        setActiveLeg={manualSetActiveLeg}
        onLegSelectFromMap={handleLegSelectFromMap}
        isAutoPlaying={isAutoPlaying}
      />
      <ArcAccordion
        expandedLeg={expandedLeg}
        setExpandedLeg={setExpandedLeg}
        activeLeg={activeLeg}
        setActiveLeg={manualSetActiveLeg}
        onLegHover={handleLegSelectFromAccordion}
        onLegHoverEnd={handleLegDeselectFromAccordion}
      />
      <JourneySection />
      <PricingSection />
      <InvitationSection />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   HERO SECTION, Editorial, centered, clean
   ══════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative bg-white text-[#111111] pt-24 pb-16 sm:pt-32 sm:pb-20 md:pt-44 md:pb-28 px-5 sm:px-6 md:px-12 lg:px-20 border-b border-[#111111]/10">
      <div ref={ref} className="w-full max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          {/* Small label */}
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#FF4D00] mb-8 md:mb-12">
            The Routes
          </span>

          <h1 className="text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] leading-[1.05] font-display font-medium tracking-[-0.02em] mb-8 md:mb-10">
            The map of the world is a{" "}
            <span className="italic font-serif text-[#FF4D00]">lie</span>.
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-[22px] leading-[1.6] text-[#111111]/50 font-medium max-w-2xl mb-10 sm:mb-14 md:mb-20">
            The real world doesn&apos;t operate in countries. It operates in Routes.
            Six legs. 190+ hubs. 35+ countries. One circulatory system for the
            movement of goods, capital, data, and people.
          </p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-5 sm:gap-x-10 md:gap-x-16">
            {[
              { value: "6", label: "Legs" },
              { value: "190+", label: "Hub Cities" },
              { value: "35+", label: "Countries" },
              { value: "100", label: "Xcitizens/yr" },
            ].map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease: "easeOut" }}
                className="text-center min-w-[60px]"
              >
                <div className="text-[26px] sm:text-[32px] md:text-[40px] font-display font-medium tracking-[-0.02em] text-[#111111]">
                  {m.value}
                </div>
                <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/35 mt-1">
                  {m.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PREAMBLE SECTION, Continuation of the hero thesis
   ══════════════════════════════════════════════════════════════════════════ */
function PreambleSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10"
    >
      <div className="w-full max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="space-y-6 sm:space-y-8 text-base sm:text-lg md:text-xl leading-[1.8] text-[#111111]/60 font-medium">
            <p>
              It&apos;s a diagram of political cages. Lines drawn by men who never
              walked the terrain.
            </p>
            <p>
              The Hanseatic League understood this in 1356. They didn&apos;t build a
              nation, they built a network of 190 cities connected by shared
              protocols for trade, law, and mutual defense. The League lasted 300
              years and made its member cities the wealthiest in Europe. Not
              through conquest, but through <span className="text-[#111111] font-semibold">flow</span>.
            </p>
            <p>
              The Routes are the Hanseatic League, rebuilt for the 21st century.
              Six legs. 190+ hubs. {routeMetrics.countries} countries. One circulatory system for the
              movement of goods, capital, data, and people across the geographies
              that will define the next century.
            </p>
          </div>

          <div className="mt-14 pt-14 border-t border-[#111111]/10">
            <p className="text-[20px] sm:text-[24px] md:text-[30px] font-display font-medium tracking-[-0.02em] leading-[1.25] text-[#111111]">
              You can&apos;t change the world if you haven&apos;t seen it.{" "}
              <span className="text-[#FF4D00]">
                {routeMetrics.countries} countries.
              </span>{" "}
              <span className="text-[#FF4D00]">{routeMetrics.hubs} hubs.</span>{" "}
              One journey.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   MAP SECTION, Blueprint-style: static world map image + positioned pins
   + dynamic header + slide-in side panel
   ══════════════════════════════════════════════════════════════════════════ */
function MapSection({
  activeLeg,
  setActiveLeg,
  onLegSelectFromMap,
  isAutoPlaying,
}: {
  activeLeg: string | null;
  setActiveLeg: (id: string | null) => void;
  onLegSelectFromMap: (legId: string) => void;
  isAutoPlaying: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="border-b border-[#111111]/10">
      {/* Section label + filter buttons */}
      <div className="py-12 md:py-16 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00]">
              The Six Legs, Interactive Map
            </span>
            {isAutoPlaying && (
              <span className="flex items-center gap-1.5 text-[9px] font-mono font-bold tracking-[0.12em] uppercase text-[#FF4D00]/60">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-pulse" />
                Auto-playing
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveLeg(null)}
              className={`px-3 py-1.5 text-[11px] font-mono font-bold tracking-widest uppercase border transition-colors ${
                activeLeg === null
                  ? "bg-[#111111] text-white border-[#111111]"
                  : "bg-white text-[#111111]/50 border-[#111111]/15 hover:border-[#111111]/30"
              }`}
            >
              All Legs
            </button>
            {routeLegs.map((leg) => (
              <button
                key={leg.id}
                onClick={() => setActiveLeg(activeLeg === leg.id ? null : leg.id)}
                className={`px-3 py-1.5 text-[11px] font-mono font-bold tracking-widest uppercase border transition-colors ${
                  activeLeg === leg.id
                    ? "text-white border-transparent"
                    : "bg-white text-[#111111]/50 border-[#111111]/15 hover:border-[#111111]/30"
                }`}
                style={activeLeg === leg.id ? { backgroundColor: leg.color, borderColor: leg.color } : {}}
              >
                {leg.legNumber}. {leg.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Map container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-8 md:py-12 px-6 md:px-12 lg:px-20 bg-white"
      >
        <div className="w-full max-w-6xl mx-auto">
          <BlueprintMap activeLeg={activeLeg} setActiveLeg={setActiveLeg} onLegSelectFromMap={onLegSelectFromMap} isAutoPlaying={isAutoPlaying} />
        </div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   BLUEPRINT MAP, Newlab-style: static world map image + positioned pin
   markers with always-visible labels + slide-in detail panel
   Based on: https://github.com/Questy708/map2-
   ══════════════════════════════════════════════════════════════════════════ */
function BlueprintMap({
  activeLeg,
  setActiveLeg,
  onLegSelectFromMap,
  isAutoPlaying,
}: {
  activeLeg: string | null;
  setActiveLeg: (id: string | null) => void;
  onLegSelectFromMap: (legId: string) => void;
  isAutoPlaying: boolean;
}) {
  const [activeLocId, setActiveLocId] = useState<string | null>(null);
  const isAnyActive = activeLeg !== null;

  // Compute center of each leg's cities for zoom transform-origin
  const legCenters = useMemo(() => {
    const centers: Record<string, { x: number; y: number }> = {};
    routeLegs.forEach((leg) => {
      const locs = MAP_LOCATIONS.filter((l) => l.legId === leg.id);
      if (locs.length > 0) {
        centers[leg.id] = {
          x: locs.reduce((sum, l) => sum + l.x, 0) / locs.length,
          y: locs.reduce((sum, l) => sum + l.y, 0) / locs.length,
        };
      }
    });
    return centers;
  }, []);

  // Build curved arc paths connecting cities within each leg
  const legArcPaths = useMemo(() => {
    const paths: Record<string, string> = {};
    routeLegs.forEach((leg) => {
      const locs = MAP_LOCATIONS.filter((l) => l.legId === leg.id);
      if (locs.length < 2) return;
      const parts: string[] = [`M ${locs[0].x} ${locs[0].y}`];
      for (let i = 1; i < locs.length; i++) {
        const prev = locs[i - 1];
        const curr = locs[i];
        const mx = (prev.x + curr.x) / 2;
        const my = (prev.y + curr.y) / 2;
        const dx = curr.x - prev.x;
        const dy = curr.y - prev.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        // Perpendicular offset for a subtle arc bow
        const curvature = -0.8;
        const cx = mx + (-dy / len) * curvature;
        const cy = my + (dx / len) * curvature;
        parts.push(`Q ${cx} ${cy} ${curr.x} ${curr.y}`);
      }
      paths[leg.id] = parts.join(" ");
    });
    return paths;
  }, []);

  // Zoom transform targeting the active leg's region
  const mapTransform = useMemo(() => {
    if (activeLeg && legCenters[activeLeg]) {
      return {
        transform: "scale(1.1)",
        transformOrigin: `${legCenters[activeLeg].x}% ${legCenters[activeLeg].y}%`,
        transition: "transform 0.8s ease",
      };
    }
    return {
      transform: "scale(1)",
      transformOrigin: "50% 50%",
      transition: "transform 0.8s ease",
    };
  }, [activeLeg, legCenters]);

  const activeLocData = useMemo(
    () => MAP_LOCATIONS.find((l) => l.id === activeLocId),
    [activeLocId]
  );

  const visibleLocations = useMemo(
    () => (isAnyActive ? MAP_LOCATIONS.filter((l) => l.legId === activeLeg) : MAP_LOCATIONS),
    [isAnyActive, activeLeg]
  );

  const legOfActive = activeLocData
    ? routeLegs.find((l) => l.id === activeLocData.legId)
    : null;

  const scrollToLeg = useCallback((legId: string) => {
    const el = document.getElementById(`leg-${legId}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="w-full relative">
      {/* Auto-playing indicator on map */}
      {isAutoPlaying && (
        <div className="absolute top-3 right-3 z-50 flex items-center gap-1.5 bg-white/90 border border-[#111111]/10 px-3 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-pulse" />
          <span className="text-[9px] font-mono font-bold tracking-[0.12em] uppercase text-[#FF4D00]/70">
            Auto-playing
          </span>
        </div>
      )}

      {/* Map container with zoom */}
      <div
        className="relative w-full overflow-hidden bg-white"
        style={mapTransform}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setActiveLocId(null);
          }
        }}
      >
        {/* World map image, Newlab topographic map */}
        <img
          alt="World Map showing xCelero Routes"
          className="w-full h-auto pointer-events-none select-none opacity-80"
          src="/routes/newlab-map.avif"
        />

        {/* SVG overlay for route arcs and city markers */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="arc-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Route arcs for each leg */}
          {routeLegs.map((leg) => {
            const path = legArcPaths[leg.id];
            if (!path) return null;
            const isActive = activeLeg === leg.id;
            const isDimmed = isAnyActive && !isActive;
            return (
              <g key={leg.id}>
                {/* Glow layer for active arc */}
                {isActive && (
                  <path
                    d={path}
                    fill="none"
                    stroke="#FF4D00"
                    strokeWidth={2}
                    strokeLinecap="round"
                    opacity={0.35}
                    filter="url(#arc-glow)"
                  />
                )}
                {/* Main arc path */}
                <motion.path
                  d={path}
                  fill="none"
                  strokeLinecap="round"
                  animate={{
                    stroke: isActive ? "#FF4D00" : leg.color,
                    strokeWidth: isActive ? 1.0 : 0.4,
                    opacity: isDimmed ? 0.15 : isActive ? 0.9 : 0.5,
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </g>
            );
          })}

          {/* City marker dots with pulse animation */}
          {MAP_LOCATIONS.map((loc) => {
            const isActiveLeg = activeLeg === loc.legId;
            const isDimmed = isAnyActive && !isActiveLeg;
            return (
              <g key={`svg-marker-${loc.id}`}>
                {/* Pulse ring for active leg cities */}
                {isActiveLeg && (
                  <motion.circle
                    cx={loc.x}
                    cy={loc.y}
                    fill="none"
                    stroke={loc.legColor}
                    strokeWidth={0.3}
                    animate={{
                      r: [1, 2.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
                {/* Core dot */}
                <motion.circle
                  cx={loc.x}
                  cy={loc.y}
                  fill={loc.legColor}
                  opacity={isDimmed ? 0.12 : 0.9}
                  animate={isActiveLeg ? {
                    r: [0.8, 1.2, 0.8],
                  } : { r: 0.6 }}
                  transition={isActiveLeg ? {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  } : { duration: 0.3 }}
                />
              </g>
            );
          })}
        </svg>

        {/* Pin markers with always-visible labels */}
        {visibleLocations.map((loc, index) => {
          const isActive = activeLocId === loc.id;
          return (
            <div
              key={loc.id}
              className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${isActive ? "z-40" : "z-10"}`}
              style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 350, damping: 25, delay: index * 0.05 }}
                className="relative flex items-center justify-center"
              >
                {/* Colored marker dot */}
                <button
                  onClick={() => {
                    setActiveLocId(activeLocId === loc.id ? null : loc.id);
                    setActiveLeg(loc.legId);
                    onLegSelectFromMap(loc.legId);
                  }}
                  className={`relative w-3.5 h-3.5 md:w-4 md:h-4 rounded-full shrink-0 cursor-pointer transition-all duration-200 border-[2.5px] border-transparent hover:border-black/20 hover:scale-110 ${isActive ? "scale-125 border-black/30" : ""}`}
                  style={{ backgroundColor: loc.legColor }}
                  aria-label={`View ${loc.name}`}
                />

                {/* Always-visible label */}
                <div
                  className={`absolute bg-[#111111] text-white font-mono text-[8px] md:text-[10px] font-bold tracking-[0.15em] px-2 py-1 md:px-3 md:py-1.5 whitespace-nowrap top-1/2 -translate-y-1/2 pointer-events-none shadow-sm transition-all duration-200 ${
                    isActive ? "bg-black" : ""
                  } ${loc.labelPos === "left" ? "right-full mr-2 md:mr-3" : "left-full ml-2 md:ml-3"}`}
                >
                  {loc.name}
                </div>
              </motion.div>
            </div>
          );
        })}

        {/* Info Panel Overlay, bottom sheet on mobile, side panel on desktop */}
        <AnimatePresence>
          {activeLocData && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30, transition: { duration: 0.2 } }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-2 bottom-2 sm:inset-x-auto sm:left-auto top-4 bottom-4 sm:right-4 w-auto sm:w-72 md:w-80 lg:w-96 max-h-[60vh] sm:max-h-none bg-white border border-[#111111]/10 shadow-2xl p-5 sm:p-6 md:p-8 flex flex-col z-50 overflow-y-auto rounded sm:rounded-none"
            >
              <button
                onClick={() => setActiveLocId(null)}
                className="absolute top-4 right-4 p-2 text-[#111111]/30 hover:text-[#111111] transition-colors"
                aria-label="Close panel"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Leg indicator */}
              <div className="flex items-center gap-2 mb-4 mt-2">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: activeLocData.legColor }}
                />
                <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase" style={{ color: activeLocData.legColor }}>
                  Leg {activeLocData.legNumber}
                </span>
              </div>

              {/* City name */}
              <h3 className="text-2xl font-display font-medium uppercase tracking-tight text-[#111111] mb-4 pr-8">
                {activeLocData.name}
              </h3>

              <div className="w-10 h-1 mb-5" style={{ backgroundColor: activeLocData.legColor }} />

              <div className="space-y-6">
                {/* About */}
                <div>
                  <h4 className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-2" style={{ color: activeLocData.legColor }}>
                    About
                  </h4>
                  <p className="text-[#111111]/60 text-sm leading-relaxed">
                    {activeLocData.description}
                  </p>
                </div>

                {/* Route info */}
                {legOfActive && (
                  <div>
                    <h4 className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-2" style={{ color: activeLocData.legColor }}>
                      Route
                    </h4>
                    <p className="text-sm font-display font-medium text-[#111111]/70">
                      {legOfActive.name}
                    </p>
                    <p className="text-xs text-[#111111]/40 mt-1">
                      {legOfActive.subtitle}, {legOfActive.hubCount} hubs
                    </p>
                  </div>
                )}

                {/* Countries */}
                <div>
                  <h4 className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-3" style={{ color: activeLocData.legColor }}>
                    Countries
                  </h4>
                  <ul className="flex flex-wrap gap-2">
                    {activeLocData.countries.map((c, i) => (
                      <li
                        key={i}
                        className="bg-[#111111]/[0.06] px-3 py-1.5 text-xs font-medium text-[#111111]/70 rounded-sm"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* View leg details button */}
              <div className="mt-auto pt-6">
                <button
                  className="w-full py-3 text-[11px] font-mono font-bold tracking-widest uppercase text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: activeLocData.legColor }}
                  onClick={() => {
                    scrollToLeg(activeLocData.legId);
                    onLegSelectFromMap(activeLocData.legId);
                    setActiveLocId(null);
                  }}
                >
                  View Leg {activeLocData.legNumber} Details
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-mono text-[#111111]/40">
        {routeLegs.map((leg) => (
          <button
            key={leg.id}
            onClick={() => setActiveLeg(activeLeg === leg.id ? null : leg.id)}
            className="flex items-center gap-2 hover:text-[#111111]/70 transition-colors"
          >
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: leg.color }} />
            <span>
              Leg {leg.legNumber}: {leg.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   ARC ACCORDION, Expandable sections per leg (no dark bands)
   ══════════════════════════════════════════════════════════════════════════ */
function ArcAccordion({
  expandedLeg,
  setExpandedLeg,
  activeLeg,
  setActiveLeg,
  onLegHover,
  onLegHoverEnd,
}: {
  expandedLeg: string | null;
  setExpandedLeg: (id: string | null) => void;
  activeLeg: string | null;
  setActiveLeg: (id: string | null) => void;
  onLegHover: (legId: string) => void;
  onLegHoverEnd: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="border-b border-[#111111]/10">
      <div className="py-12 md:py-16 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10">
        <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00]">
          The Arcs, In Detail
        </span>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="px-6 md:px-12 lg:px-20 py-6 md:py-8"
      >
        <div className="w-full max-w-7xl mx-auto space-y-2">
          {routeLegs.map((leg) => {
            const isExpanded = expandedLeg === leg.id;
            return (
              <LegAccordionPanel
                key={leg.id}
                leg={leg}
                isExpanded={isExpanded}
                onToggle={() =>
                  setExpandedLeg(isExpanded ? null : leg.id)
                }
                activeLeg={activeLeg}
                setActiveLeg={setActiveLeg}
                onLegHover={onLegHover}
                onLegHoverEnd={onLegHoverEnd}
              />
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   LEG ACCORDION PANEL, Single expandable panel per leg
   ══════════════════════════════════════════════════════════════════════════ */
function LegAccordionPanel({
  leg,
  isExpanded,
  onToggle,
  activeLeg,
  setActiveLeg,
  onLegHover,
  onLegHoverEnd,
}: {
  leg: RouteLeg;
  isExpanded: boolean;
  onToggle: () => void;
  activeLeg: string | null;
  setActiveLeg: (id: string | null) => void;
  onLegHover: (legId: string) => void;
  onLegHoverEnd: () => void;
}) {
  const images = arcImages[leg.id] || [];

  return (
    <div
      id={`leg-${leg.id}`}
      className={`border transition-colors ${
        isExpanded ? "border-[#111111]/20 bg-white" : "border-[#111111]/10 bg-white hover:border-[#111111]/20"
      }`}
    >
      {/* Header row */}
      <button
        suppressHydrationWarning
        onClick={() => {
          onToggle();
          setActiveLeg(isExpanded ? null : leg.id);
        }}
        onMouseEnter={() => onLegHover(leg.id)}
        onMouseLeave={onLegHoverEnd}
        className="w-full px-4 sm:px-5 md:px-6 py-4 sm:py-5 flex items-center justify-between text-left group gap-3"
      >
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 min-w-0">
          <div
            className="w-3 h-3 sm:w-4 sm:h-4 shrink-0 rounded-full"
            style={{ backgroundColor: leg.color }}
          />
          <span
            className="text-[9px] sm:text-[10px] font-mono font-bold tracking-[0.12em] sm:tracking-[0.15em] uppercase shrink-0"
            style={{ color: leg.color }}
          >
            Leg {leg.legNumber}
          </span>
          <span className="font-display font-medium text-base sm:text-lg md:text-xl group-hover:text-[#FF4D00] transition-colors truncate">
            {leg.name}
          </span>
          <span className="hidden md:inline text-[11px] font-mono tracking-wide text-[#111111]/30 shrink-0">
            {leg.subtitle}
          </span>
          <span className="hidden sm:inline text-[11px] font-mono tracking-wide text-[#111111]/30 shrink-0">
            {leg.hubCount} Hubs
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 shrink-0 text-[#111111]/30 transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Expandable content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 md:px-6 pb-5 sm:pb-6 border-t border-[#111111]/8 pt-5 sm:pt-6">
              {/* Countries as tag pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {leg.countries.map((c) => (
                  <span
                    key={c}
                    className="text-[11px] font-mono tracking-wide px-3 py-1 border border-[#111111]/10 text-[#111111]/50"
                  >
                    {c}
                  </span>
                ))}
              </div>

              {/* Horizontal collage, Activities & Infrastructure */}
              {images.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-[2px]" style={{ backgroundColor: leg.color }} />
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/40">
                      Activities &amp; Infrastructure
                    </span>
                  </div>
                  <div className="relative group/collage">
                    <div
                      className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin"
                      style={{
                        // @ts-expect-error CSS custom property
                        "--scrollbar-color": `${leg.color}40`,
                        "--scrollbar-color-hover": `${leg.color}80`,
                      }}
                    >
                      {images.map((img, i) => (
                        <div
                          key={i}
                          className={`h-[140px] sm:h-[180px] md:h-[220px] overflow-hidden border border-[#111111]/8 shrink-0 ${
                            i === 0 ? "w-[260px] sm:w-[340px] md:w-[420px]" : "w-[200px] sm:w-[260px] md:w-[320px]"
                          }`}
                        >
                          <img
                            src={img}
                            alt=""
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                    {/* Right edge gradient fade */}
                    <div
                      className="absolute top-0 right-0 bottom-2 w-12 pointer-events-none bg-gradient-to-l from-white to-transparent opacity-0 group-hover/collage:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </div>
              )}

              {/* Historical Anchor + Core Flows side by side */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Anchor className="w-4 h-4" style={{ color: leg.color }} />
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/40">
                      Historical Anchor
                    </span>
                  </div>
                  <p className="text-base md:text-lg leading-[1.7] text-[#111111]/70 font-medium">
                    {leg.historicalAnchor}
                  </p>
                  <p className="mt-3 text-sm text-[#111111]/35 font-medium">
                    {leg.coreGeography}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Flame className="w-4 h-4" style={{ color: leg.color }} />
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/40">
                      Core Flows
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { icon: Package, label: "Goods", value: leg.coreFlows.goods },
                      { icon: Banknote, label: "Capital", value: leg.coreFlows.capital },
                      { icon: Database, label: "Data", value: leg.coreFlows.data },
                      { icon: Users, label: "People", value: leg.coreFlows.people },
                    ].map((flow) => (
                      <div key={flow.label} className="p-3 border border-[#111111]/6">
                        <div className="flex items-center gap-2 mb-2">
                          <flow.icon className="w-3.5 h-3.5" style={{ color: leg.color }} />
                          <span className="text-[9px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/40">
                            {flow.label}
                          </span>
                        </div>
                        <p className="text-xs text-[#111111]/55 font-medium leading-[1.5]">
                          {flow.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Route Deal Thesis */}
              <div
                className="border-l-3 pl-5 py-4 mb-8"
                style={{ borderLeftColor: leg.color, borderLeftWidth: 3 }}
              >
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-2 block">
                  Route Deal Thesis
                </span>
                <h3 className="text-xl md:text-2xl font-display font-medium mb-3">
                  {leg.routeDealThesis.title}
                </h3>
                <p className="text-sm md:text-base leading-[1.7] text-[#111111]/55 font-medium">
                  {leg.routeDealThesis.description}
                </p>
              </div>

              {/* Friction + Cultural Weaving side by side */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-[2px]" style={{ backgroundColor: leg.color }} />
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/40">
                      The Friction
                    </span>
                  </div>
                  <div className="space-y-2">
                    {leg.friction.map((f, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span
                          className="text-[9px] font-mono font-bold mt-1.5 shrink-0 w-4 h-4 flex items-center justify-center"
                          style={{ backgroundColor: `${leg.color}15`, color: leg.color }}
                        >
                          {i + 1}
                        </span>
                        <span className="text-sm text-[#111111]/65 font-medium leading-[1.5]">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-[2px]" style={{ backgroundColor: leg.color }} />
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/40">
                      Cultural Weaving
                    </span>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: "Commons Feast", value: leg.culturalWeaving.commonsFeast, icon: Sun },
                      { label: "Heritage Walk", value: leg.culturalWeaving.heritageWalk, icon: Compass },
                      { label: "Ritual Closing", value: leg.culturalWeaving.ritualClosing, icon: Sparkles },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex items-center gap-2 mb-1">
                          <item.icon className="w-3 h-3" style={{ color: leg.color }} />
                          <span className="text-[9px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00]">
                            {item.label}
                          </span>
                        </div>
                        <p className="text-xs text-[#111111]/50 font-medium leading-[1.6] pl-5">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Signature Route Deals */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-[2px]" style={{ backgroundColor: leg.color }} />
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/40">
                    Signature Route Deals
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {leg.signatureDeals.map((deal, i) => (
                    <DealCard key={i} deal={deal} legColor={leg.color} index={i} />
                  ))}
                </div>
              </div>

              {/* Key Cities as tag pills */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4" style={{ color: leg.color }} />
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/40">
                    Key Cities
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {leg.keyCities.map((city) => (
                    <span
                      key={city.name}
                      className="text-[11px] font-mono px-3 py-1.5 border text-[#111111]/60"
                      style={{ borderColor: `${leg.color}30` }}
                    >
                      <MapPin className="w-3 h-3 inline mr-1" style={{ color: leg.color }} />
                      {city.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   DEAL CARD (expandable)
   ══════════════════════════════════════════════════════════════════════════ */
function DealCard({
  deal,
  legColor,
  index,
}: {
  deal: RouteLeg["signatureDeals"][number];
  legColor: string;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-[#111111]/10">
      <button
        suppressHydrationWarning
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between text-left group gap-4"
      >
        <div className="flex items-center gap-4">
          <span
            className="text-[10px] font-mono font-bold tracking-widest shrink-0"
            style={{ color: legColor }}
          >
            {deal.duration}
          </span>
          <span className="font-display font-medium text-base md:text-lg group-hover:text-[#FF4D00] transition-colors">
            {deal.name}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 shrink-0 text-[#111111]/30 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-[#111111]/5 pt-4">
              <p className="text-sm text-[#111111]/60 font-medium mb-3">
                {deal.focus}
              </p>
              <div className="space-y-1">
                {deal.inclusions.map((inc, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-[#111111]/50"
                  >
                    <ChevronRight className="w-3 h-3 text-[#FF4D00] shrink-0" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   THE JOURNEY SECTION
   ══════════════════════════════════════════════════════════════════════════ */
function JourneySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activePhase, setActivePhase] = useState<number | null>(null);

  /* Journey phases for the timeline visualization */
  const journeyPhases = annualSchedule.map((s, i) => ({
    ...s,
    phase: i + 1,
    totalPhases: annualSchedule.length,
    description: [
      "Orientation and immersion. Founders arrive at hub cities, conduct market walks, and map the local commercial landscape.",
      "Deep diligence. Structured sprints on the signature route deal, regulatory mapping, and counterparty discovery.",
      "Peak operations. Deal rooms, pilot launches, and cross-hub collaboration at maximum velocity.",
      "Integration and harvest. Signed deals, codified playbooks, and the covenant ceremony marking lifelong membership.",
      "Cross-leg connect. Hubs share deal flow, talent, and capital across arcs. The flywheel accelerates.",
      "Synthesis. Annual assembly, portfolio review, and thesis ratification for the next cycle.",
    ][i] || "Operations and deal flow on the Route.",
    highlights: [
      ["Market mapping", "Hub onboarding", "Local partnerships"],
      ["Due diligence sprints", "Regulatory review", "Counterparty meetings"],
      ["Deal execution", "Pilot deployment", "Capital deployment"],
      ["Route Deal signing", "Playbook codification", "Covenant ceremony"],
      ["Cross-arc deal flow", "Talent exchange", "Capital syndication"],
      ["State of the Route", "Thesis ratification", "Alumni gathering"],
    ][i] || [],
  }));

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 px-6 md:px-12 lg:px-20 border-t border-[#111111]/10"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mb-16 md:mb-24"
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-6 block">
            The Journey
          </span>
          <h2 className="text-[32px] sm:text-[44px] md:text-[56px] lg:text-[64px] font-display font-medium tracking-[-0.03em] leading-[0.95] mb-6">
            Annual Cohort
            <br />
            <span className="text-[#111111]/40">Architecture</span>
          </h2>
          <p className="text-lg md:text-xl text-[#111111]/50 font-medium leading-relaxed max-w-2xl">
            The Routes run on climate, not calendar. Each leg is timed to
            seasonal windows that maximize mobility and minimize friction.
          </p>
        </motion.div>

        {/* ── Route Journey Steps Timeline ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="mb-20 md:mb-28"
        >
          <div className="flex items-center gap-2 mb-8">
            <Route className="w-4 h-4 text-[#FF4D00]" />
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/30">
              The Route Journey
            </span>
          </div>

          {/* Desktop: Horizontal steps with connecting line */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Continuous horizontal line */}
              <div className="absolute top-[28px] left-0 right-0 h-[2px] bg-[#111111]/8" />

              <div className="flex">
                {[
                  {
                    step: "01",
                    icon: Database,
                    title: "Application",
                    desc: "Submit your venture thesis, team profile, and route alignment. We evaluate conviction, not credentials.",
                  },
                  {
                    step: "02",
                    icon: Check,
                    title: "Acceptance",
                    desc: "Covenant selection. 100 Xcitizens per cohort, chosen for what they'll contribute to the Route, not just what they'll take.",
                  },
                  {
                    step: "03",
                    icon: Anchor,
                    title: "Departure",
                    desc: "The cohort assembles. Orientation at the origin hub. Market walks, operator introductions, and the first deal room.",
                  },
                  {
                    step: "04",
                    icon: MapPin,
                    title: "Hub Rotation",
                    desc: "Six legs. Each hub is a new market, a new counterparty, a new operating environment. The flywheel accelerates.",
                  },
                  {
                    step: "05",
                    icon: Flame,
                    title: "Return",
                    desc: "The covenant ceremony. Signed deals, codified playbooks, and lifelong membership in the Routes alumni network.",
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.step}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                      className="flex-1 relative group"
                    >
                      {/* Node on the line */}
                      <div className="flex items-center justify-center mb-6 relative z-10">
                        <div className="w-14 h-14 rounded-full border-2 border-[#111111]/10 bg-white flex items-center justify-center group-hover:border-[#FF4D00] group-hover:bg-[#FF4D00]/5 transition-all duration-300">
                          <Icon className="w-5 h-5 text-[#FF4D00]" strokeWidth={1.5} />
                        </div>
                      </div>

                      {/* Step number */}
                      <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00] block text-center mb-2">
                        Step {item.step}
                      </span>

                      {/* Title */}
                      <h4 className="text-[16px] font-display font-medium tracking-tight text-center mb-3 group-hover:text-[#FF4D00] transition-colors">
                        {item.title}
                      </h4>

                      {/* Description */}
                      <p className="text-[13px] text-[#111111]/50 font-medium leading-[1.6] text-center max-w-[200px] mx-auto">
                        {item.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile: Vertical steps with connecting line */}
          <div className="md:hidden">
            <div className="relative">
              {/* Continuous vertical line */}
              <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-[#111111]/8" />

              {[
                {
                  step: "01",
                  icon: Database,
                  title: "Application",
                  desc: "Submit your venture thesis, team profile, and route alignment. We evaluate conviction, not credentials.",
                },
                {
                  step: "02",
                  icon: Check,
                  title: "Acceptance",
                  desc: "Covenant selection. 100 Xcitizens per cohort, chosen for what they'll contribute to the Route.",
                },
                {
                  step: "03",
                  icon: Anchor,
                  title: "Departure",
                  desc: "The cohort assembles. Orientation at the origin hub. Market walks and the first deal room.",
                },
                {
                  step: "04",
                  icon: MapPin,
                  title: "Hub Rotation",
                  desc: "Six legs. Each hub is a new market, a new counterparty. The flywheel accelerates.",
                },
                {
                  step: "05",
                  icon: Flame,
                  title: "Return",
                  desc: "The covenant ceremony. Signed deals, codified playbooks, and lifelong alumni membership.",
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                    className="relative pl-14 pb-8 last:pb-0"
                  >
                    {/* Node on the line */}
                    <div className="absolute left-[5px] top-0 w-7 h-7 rounded-full border-2 border-[#111111]/10 bg-white flex items-center justify-center z-10">
                      <Icon className="w-3.5 h-3.5 text-[#FF4D00]" strokeWidth={1.5} />
                    </div>

                    {/* Step number */}
                    <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00] block mb-1">
                      Step {item.step}
                    </span>

                    {/* Title */}
                    <h4 className="text-[16px] font-display font-medium tracking-tight mb-2">
                      {item.title}
                    </h4>

                    {/* Description */}
                    <p className="text-[13px] text-[#111111]/50 font-medium leading-[1.6]">
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ── Annual Schedule Timeline ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mb-20 md:mb-28"
        >
          {/* Desktop: Horizontal timeline with expandable nodes */}
          <div className="hidden lg:block">
            {/* Connecting horizontal line */}
            <div className="relative flex items-stretch gap-0">
              {/* The continuous thread */}
              <div className="absolute top-[40px] left-0 right-0 h-[2px] bg-[#111111]/8 z-0" />

              {journeyPhases.map((phase, i) => {
                const isActive = activePhase === i;
                const leg = routeLegs.find((l) => l.id === phase.legId);
                const legColor = leg?.color || "#FF4D00";

                return (
                  <div
                    key={phase.legId}
                    className="flex-1 relative z-10"
                    onMouseEnter={() => setActivePhase(i)}
                    onMouseLeave={() => setActivePhase(null)}
                  >
                    {/* Timeline node */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                      className="flex flex-col items-center cursor-pointer"
                      onClick={() => setActivePhase(isActive ? null : i)}
                    >
                      {/* Node circle */}
                      <div
                        className={`relative w-5 h-5 rounded-full border-2 transition-all duration-300 z-10 ${
                          isActive
                            ? "scale-150 border-transparent shadow-lg"
                            : "bg-white border-[#111111]/20 hover:border-[#FF4D00]/50 hover:scale-110"
                        }`}
                        style={isActive ? { backgroundColor: legColor, borderColor: legColor } : {}}
                      >
                        {/* Pulse ring on active */}
                        {isActive && (
                          <div
                            className="absolute inset-[-6px] rounded-full animate-ping opacity-20"
                            style={{ backgroundColor: legColor }}
                          />
                        )}
                      </div>

                      {/* Phase number below dot */}
                      <span className={`text-[10px] font-mono font-bold tracking-[0.15em] uppercase mt-3 transition-colors duration-300 ${
                        isActive ? "text-[#FF4D00]" : "text-[#111111]/25"
                      }`}>
                        Phase {phase.phase}
                      </span>

                      {/* Period label */}
                      <span className={`text-[11px] font-mono font-bold mt-1 transition-colors duration-300 ${
                        isActive ? "text-[#111111]" : "text-[#111111]/40"
                      }`}>
                        {phase.period}
                      </span>

                      {/* Leg name */}
                      <span className={`text-[13px] font-display font-medium mt-1 text-center transition-colors duration-300 ${
                        isActive ? "text-[#111111]" : "text-[#111111]/55"
                      }`}>
                        {phase.leg.split(" ").slice(0, 2).join(" ")}
                      </span>

                      {/* Hub count */}
                      <span className="text-[10px] font-mono text-[#111111]/30 mt-0.5">
                        {phase.hubs}
                      </span>
                    </motion.div>

                    {/* Expandable detail card below */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: -10, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="mt-4 border border-[#111111]/10 bg-white p-5 shadow-md overflow-hidden"
                        >
                          {/* Leg color bar */}
                          <div className="h-1 w-8 mb-4" style={{ backgroundColor: legColor }} />

                          {/* Phase title + climate */}
                          <h4 className="text-[16px] font-display font-medium tracking-tight mb-2">
                            {phase.leg}
                          </h4>
                          <div className="flex items-center gap-2 text-[12px] text-[#111111]/50 mb-4">
                            <Sun className="w-3 h-3 text-[#FF4D00] shrink-0" />
                            {phase.climateNote}
                          </div>

                          {/* Description */}
                          <p className="text-[13px] text-[#111111]/55 font-medium leading-[1.6] mb-4">
                            {phase.description}
                          </p>

                          {/* Highlights */}
                          <div className="flex flex-wrap gap-2">
                            {phase.highlights.map((h) => (
                              <span
                                key={h}
                                className="text-[10px] font-mono font-bold tracking-[0.1em] uppercase bg-[#111111]/[0.04] px-2.5 py-1 text-[#111111]/45"
                              >
                                {h}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Progress indicator bar */}
            <div className="mt-8 flex items-center gap-3 text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/25">
              <span>Q1</span>
              <div className="flex-1 h-px bg-[#111111]/10 relative">
                {journeyPhases.map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#111111]/20"
                    style={{ left: `${((i + 0.5) / journeyPhases.length) * 100}%` }}
                  />
                ))}
              </div>
              <span>Q4</span>
            </div>
          </div>

          {/* Tablet/Mobile: Vertical timeline with expandable nodes */}
          <div className="lg:hidden">
            <div className="relative">
              {/* Continuous vertical thread */}
              <div className="absolute left-[15px] top-0 bottom-0 w-[2px] bg-[#111111]/8 z-0" />

              {journeyPhases.map((phase, i) => {
                const isActive = activePhase === i;
                const leg = routeLegs.find((l) => l.id === phase.legId);
                const legColor = leg?.color || "#FF4D00";

                return (
                  <motion.div
                    key={phase.legId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                    className="relative pl-12 pb-8 last:pb-0"
                  >
                    {/* Timeline dot */}
                    <button
                      onClick={() => setActivePhase(isActive ? null : i)}
                      className={`absolute left-[7px] top-1 w-[18px] h-[18px] rounded-full border-2 transition-all duration-300 z-10 ${
                        isActive
                          ? "border-transparent scale-125"
                          : "bg-white border-[#111111]/20 hover:border-[#FF4D00]/50"
                      }`}
                      style={isActive ? { backgroundColor: legColor, borderColor: legColor } : {}}
                    />

                    {/* Content */}
                    <div
                      className={`cursor-pointer transition-all duration-300 ${
                        isActive ? "" : "hover:opacity-80"
                      }`}
                      onClick={() => setActivePhase(isActive ? null : i)}
                    >
                      {/* Phase + Period */}
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00]">
                          Phase {phase.phase}
                        </span>
                        <span className="text-[11px] font-mono font-bold text-[#111111]/40">
                          {phase.period}
                        </span>
                      </div>

                      {/* Leg name + hubs */}
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className={`text-[16px] font-display font-medium tracking-tight transition-colors duration-300 ${
                          isActive ? "text-[#FF4D00]" : "text-[#111111]"
                        }`}>
                          {phase.leg}
                        </h4>
                        <span className="text-[10px] font-mono text-[#111111]/25">{phase.hubs}</span>
                      </div>

                      {/* Climate note (always visible) */}
                      <div className="flex items-center gap-2 text-[12px] text-[#111111]/45 mb-2">
                        <Sun className="w-3 h-3 text-[#FF4D00] shrink-0" />
                        {phase.climateNote}
                      </div>
                    </div>

                    {/* Expandable detail */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="border border-[#111111]/10 bg-white p-4 mt-1">
                            {/* Leg color bar */}
                            <div className="h-1 w-8 mb-3" style={{ backgroundColor: legColor }} />

                            <p className="text-[13px] text-[#111111]/55 font-medium leading-[1.6] mb-3">
                              {phase.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                              {phase.highlights.map((h) => (
                                <span
                                  key={h}
                                  className="text-[10px] font-mono font-bold tracking-[0.1em] uppercase bg-[#111111]/[0.04] px-2.5 py-1 text-[#111111]/45"
                                >
                                  {h}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Daily Rhythm + What You Leave With */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-4 h-4 text-[#FF4D00]" />
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/40">
                Daily Rhythm Per Hub
              </span>
            </div>
            {/* Daily rhythm timeline */}
            <div className="relative">
              <div className="absolute left-[11px] top-2 bottom-2 w-px bg-[#FF4D00]/12" />
              {[
                {
                  time: "06:00",
                  desc: "Dawn patrol, market visit, port walk, or field deployment",
                },
                {
                  time: "09:00",
                  desc: "Deal room, structured sprint on the signature route deal",
                },
                {
                  time: "12:00",
                  desc: "Commons feast, shared meal with local operators and partners",
                },
                {
                  time: "14:00",
                  desc: "Deep work, prototyping, API integration, or regulatory mapping",
                },
                {
                  time: "17:00",
                  desc: "Heritage walk, curated walk through the hub's trade history",
                },
                {
                  time: "19:00",
                  desc: "Ritual closing, reflection, documentation, and intention setting",
                },
              ].map((r, i) => (
                <div key={r.time} className="flex items-start gap-4 relative pb-5 last:pb-0">
                  {/* Timeline dot */}
                  <div className="shrink-0 w-[23px] flex items-center justify-center pt-0.5">
                    <div className={`w-2 h-2 rounded-full z-10 ${
                      i === 0 ? "bg-[#FF4D00] shadow-[0_0_6px_rgba(255,77,0,0.3)]" : "bg-[#FF4D00]/30"
                    }`} />
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[11px] font-mono font-bold text-[#FF4D00] shrink-0 pt-0.5">
                      {r.time}
                    </span>
                    <span className="text-sm text-[#111111]/60 font-medium leading-[1.6]">
                      {r.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Compass className="w-4 h-4 text-[#FF4D00]" />
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/40">
                What You Leave With
              </span>
            </div>
            <div className="space-y-4">
              {[
                { icon: "📝", title: "A Signed Route Deal", desc: "Commercial agreement with at least one counterparty across the leg" },
                { icon: "📘", title: "A Playbook", desc: "Codified operating procedures for every friction point encountered" },
                { icon: "🤝", title: "A Network", desc: "Direct relationships with operators, regulators, and capital sources across the leg" },
                { icon: "🌍", title: "A Worldview", desc: "Firsthand understanding of how 80% of global trade actually moves" },
                { icon: "🗝️", title: "A Covenant", desc: "Lifelong membership in the Routes alumni network, with access to every hub" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <span className="text-sm mt-0.5 shrink-0 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <div>
                    <span className="text-sm text-[#111111] font-semibold leading-[1.4] block">
                      {item.title}
                    </span>
                    <span className="text-[13px] text-[#111111]/50 font-medium leading-[1.5]">
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PRICING SECTION
   ══════════════════════════════════════════════════════════════════════════ */
function PricingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 px-6 md:px-12 lg:px-20 border-t border-[#111111]/10 bg-white"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mb-16"
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-6 block">
            Pricing
          </span>
          <h2 className="text-[32px] sm:text-[44px] md:text-[56px] lg:text-[64px] font-display font-medium tracking-[-0.03em] leading-[0.95] mb-6">
            Invest in the Journey
          </h2>
          <p className="text-lg md:text-xl text-[#111111]/50 font-medium leading-relaxed max-w-2xl">
            Each arc is a complete journey. The full route is a transformation.
            Choose your entry point.
          </p>
        </motion.div>

        {/* 6 per-arc pricing cards in 2x3 / 3x2 grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
          {arcPricing.map((pricing, i) => {
            const leg = routeLegs.find((l) => l.id === pricing.legId);
            if (!leg) return null;
            return (
              <motion.div
                key={pricing.legId}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.05 * i, ease: "easeOut" }}
                className="border border-[#111111]/10 p-6 hover:border-[#111111]/20 transition-colors flex flex-col"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-3 h-3 shrink-0"
                    style={{ backgroundColor: leg.color }}
                  />
                  <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00]">
                    Leg {leg.legNumber}
                  </span>
                </div>
                <h3 className="text-xl font-display font-medium mb-1">
                  {leg.name}
                </h3>
                <p className="text-sm text-[#111111]/40 font-medium mb-6">
                  {leg.subtitle}
                </p>

                {/* Price */}
                <div className="mb-4">
                  <div className="text-3xl font-display font-medium">
                    ${pricing.pricePerPerson.toLocaleString()}
                  </div>
                  <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/40 mt-1">
                    Per Person
                  </div>
                </div>
                <div className="mb-6">
                  <div
                    className="text-lg font-display font-medium"
                    style={{ color: leg.color }}
                  >
                    ${pricing.solidarityRate.toLocaleString()}
                  </div>
                  <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/40 mt-0.5">
                    Solidarity Rate (Groups)
                  </div>
                </div>

                {/* Details */}
                <div className="flex gap-4 mb-6 text-sm">
                  <div>
                    <span className="font-display font-medium">
                      {pricing.durationWeeks}
                    </span>{" "}
                    <span className="text-[#111111]/40">weeks</span>
                  </div>
                  <div>
                    <span className="font-display font-medium">
                      {pricing.scholarshipsPerDeparture}
                    </span>{" "}
                    <span className="text-[#111111]/40">scholarships</span>
                  </div>
                </div>

                {/* Inclusions */}
                <div className="space-y-2 mb-6 flex-1">
                  {pricing.inclusions.map((inc, j) => (
                    <div
                      key={j}
                      className="flex items-start gap-2 text-sm text-[#111111]/60"
                    >
                      <Check
                        className="w-3.5 h-3.5 shrink-0 mt-0.5"
                        style={{ color: leg.color }}
                      />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={`#leg-${leg.id}`}
                  className="inline-flex items-center justify-center gap-2 border px-6 py-3 text-sm font-mono font-bold tracking-wider uppercase transition-colors hover:bg-[#111111] hover:text-white"
                  style={{ borderColor: leg.color, color: leg.color }}
                >
                  Explore This Arc
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Featured Full Route Package */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="bg-[#1B1C1E] text-white p-8 md:p-12 border border-[#1B1C1E]"
        >
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-5 h-5 text-[#FF4D00]" />
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00]">
              Full Route Package
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div>
              <h3 className="text-[28px] sm:text-[36px] md:text-[48px] font-display font-medium tracking-[-0.02em] leading-[0.95] mb-4">
                The Full Circumnavigation
              </h3>
              <p className="text-base md:text-lg text-white/40 font-medium leading-[1.7] mb-8">
                All six arcs. Twelve months. The complete journey from Lagos to
                Cairo, from the Gulf of Guinea to the Mediterranean gateways.
                One continuous route that builds on itself with every leg.
              </p>

              <div className="flex flex-wrap gap-8 mb-8">
                <div>
                  <div className="text-4xl md:text-5xl font-display font-medium text-[#FF4D00]">
                    ${fullRoutePricing.pricePerPerson.toLocaleString()}
                  </div>
                  <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-white/40 mt-1">
                    Per Person
                  </div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-display font-medium text-[#FF4D00]/80">
                    ${fullRoutePricing.solidarityRate.toLocaleString()}
                  </div>
                  <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-white/40 mt-1">
                    Solidarity Rate
                  </div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-display font-medium text-white">
                    {fullRoutePricing.durationMonths}
                  </div>
                  <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-white/40 mt-1">
                    Months
                  </div>
                </div>
              </div>

              <button
                suppressHydrationWarning
                className="inline-flex items-center gap-2 bg-[#FF4D00] hover:bg-[#FF4D00]/90 text-white px-8 py-4 text-sm font-mono font-bold tracking-wider uppercase transition-colors"
              >
                Book for the Full Route
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div>
              <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-white/40 mb-4">
                Inclusions
              </div>
              <div className="space-y-3">
                {fullRoutePricing.inclusions.map((inc, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 text-sm text-white/60"
                  >
                    <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#FF4D00]" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   THE INVITATION (CTA)
   ══════════════════════════════════════════════════════════════════════════ */
function InvitationSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
    >
      <div className="max-w-[1400px] mx-auto bg-[#111111] text-white px-6 md:px-12 lg:px-20 py-20 md:py-32 rounded-sm">
      <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] inline-block mb-6">
            The Invitation
          </span>
          <h2 className="text-[30px] sm:text-[40px] md:text-[56px] lg:text-[72px] font-display font-medium tracking-[-0.03em] leading-[0.95] mb-6 sm:mb-8 uppercase">
            The Routes is not a program.{" "}
            <span className="text-[#FF4D00]">It is a covenant.</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/40 font-medium leading-[1.6] max-w-lg">
            Whether you&apos;re a founder, investor, or independent partner, there&apos;s a place on the Route for those who refuse to build in
            isolation. For those who understand that the next frontier isn&apos;t
            a metaphor. It&apos;s a map.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <Link
            to="/programs"
            className="group flex items-center justify-between border border-white/20 px-8 py-6 hover:bg-white/5 transition-colors"
          >
            <div>
              <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-white/40 mb-2">
                For Founders
              </div>
              <div className="text-lg md:text-xl font-display font-medium">
                Explore Programs
              </div>
            </div>
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#FF4D00] group-hover:border-[#FF4D00] transition-all">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          <Link
            to="/capital"
            className="group flex items-center justify-between border border-white/20 px-8 py-6 hover:bg-white/5 transition-colors"
          >
            <div>
              <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-white/40 mb-2">
                For Investors
              </div>
              <div className="text-lg md:text-xl font-display font-medium">
                Deploy Capital
              </div>
            </div>
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#FF4D00] group-hover:border-[#FF4D00] transition-all">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          <Link
            to="/join"
            className="group flex items-center justify-between border border-white/20 px-8 py-6 hover:bg-white/5 transition-colors"
          >
            <div>
              <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-white/40 mb-2">
                For Independent Partners
              </div>
              <div className="text-lg md:text-xl font-display font-medium">
                Build With Us
              </div>
            </div>
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#FF4D00] group-hover:border-[#FF4D00] transition-all">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
