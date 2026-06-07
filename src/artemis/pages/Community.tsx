"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  Calendar,
  MapPin,
  Users,
  ChevronRight,
  Clock,
  Star,
  Quote,
  Sparkles,
  Globe,
  Microscope,
  Building2,
  Handshake,
  Lightbulb,
  Heart,
  Shield,
  Check,
  MessageSquare,
  X,
  Rocket,
  Coins,
  CheckCircle,
} from "lucide-react";
import { Link } from "@/artemis/router";

/* ── Network Stats ── */
const networkStats = [
  { value: "1,200+", label: "XCitizens", sub: "target members at scale" },
  { value: "190", label: "Hubs", sub: "projected co-working, lab, and maker spaces" },
  { value: "39+", label: "Countries", sub: "spanning the entire Route" },
  { value: "840+", label: "Connections / mo", sub: "projected deals, intros, collaborations" },
];

/* ── Gallery Images ── */
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    alt: "Team collaborating at a hub",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=600&q=80",
    alt: "Workshop in progress",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80",
    alt: "Community gathering",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    alt: "Lab work at M1 Core",
    span: "col-span-1 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
    alt: "Founders working at XEmbassy",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    alt: "Conference keynote",
    span: "col-span-2 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80",
    alt: "Mentorship session",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
    alt: "Team planning sprint",
    span: "col-span-1 row-span-1",
  },
];

/* ── Network Architecture (Member Types) ── */
const memberTypes = [
  {
    id: "founder",
    label: "Founder",
    icon: Rocket,
    description: "Building ventures from the ground up. Founders turn thesis into companies, iterating through the Route's infrastructure and mentorship to reach product-market fit.",
    count: "Coming soon",
    accent: "bg-[#FF4D00]",
    accentLight: "bg-[#FF4D00]/10 text-[#FF4D00]",
    borderHover: "hover:border-[#FF4D00]/40",
  },
  {
    id: "operator",
    label: "Operator",
    icon: Building2,
    description: "Running the infrastructure that makes the Route work. Operators manage hubs, programs, and the systems that turn individual effort into collective momentum.",
    count: "Coming soon",
    accent: "bg-[#111111]",
    accentLight: "bg-[#111111]/10 text-[#111111]",
    borderHover: "hover:border-[#111111]/40",
  },
  {
    id: "investor",
    label: "Investor",
    icon: Coins,
    description: "Deploying capital with conviction. Investors access curated deal flow across six vehicles, co-investing alongside the xCelero thesis for compounding returns.",
    count: "Coming soon",
    accent: "bg-[#FF4D00]",
    accentLight: "bg-[#FF4D00]/10 text-[#FF4D00]",
    borderHover: "hover:border-[#FF4D00]/40",
  },
  {
    id: "mentor",
    label: "Mentor",
    icon: Heart,
    description: "Transferring hard-won knowledge. Mentors accelerate the flywheel by sharing domain expertise, connections, and operational playbooks from the field.",
    count: "Coming soon",
    accent: "bg-[#111111]",
    accentLight: "bg-[#111111]/10 text-[#111111]",
    borderHover: "hover:border-[#111111]/30",
  },
];

/* ── Upcoming Events ── */
const upcomingEvents = [
  {
    title: "xCelero Accelerator Cohort 1 Demo Day",
    date: "March 28, 2026",
    time: "10:00 AM EAT",
    location: "M1 Core Nairobi + Virtual",
    type: "Demo Day",
    description: "Ventures from Cohort 1 present their validated MVPs to investors, partners, and the XCitizen network. Sector deep-dives in energy, life sciences, and digital finance.",
    spots: "Limited to 200 attendees",
    featured: true,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Route Summit: Gulf of Guinea Arc",
    date: "April 12, 2026",
    time: "9:00 AM WAT",
    location: "XEmbassy Lagos",
    type: "Summit",
    description: "Operators and founders from Lagos, Accra, and Abidjan convene for cross-hub deal flow sharing, infrastructure updates, and peer mentorship.",
    spots: "Open to all XCitizens",
    featured: false,
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Building in Life Sciences: From Lab to Market",
    date: "April 25, 2026",
    time: "2:00 PM EAT",
    location: "Virtual Masterclass",
    type: "Masterclass",
    description: "Dr. Adebayo Ogunlesi leads a session on regulatory pathways for diagnostics and therapeutics in African markets. Case studies from Refract and Allele.",
    spots: "Open to all XCitizens",
    featured: false,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "xHansa Fellowship Applications Open",
    date: "May 1 - May 31, 2026",
    time: "Rolling admissions",
    location: "All Route Hubs",
    type: "Fellowship",
    description: "The xHansa Fellowship seeds the talent pipeline. Semester-long program embedded in venture operations. Open to engineers, operators, and domain experts.",
    spots: "50 fellowships targeted",
    featured: false,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Capital Roundtable: Thematic Fund Deep Dive",
    date: "May 15, 2026",
    time: "11:00 AM CAT",
    location: "M1 Core Cape Town + Virtual",
    type: "Investor Event",
    description: "Deep dive into the xCelero Thematic Fund allocation strategy. Portfolio construction, sector weighting, and co-investment opportunities for LPs.",
    spots: "Accredited investors only",
    featured: true,
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Community Town Hall Q2",
    date: "June 5, 2026",
    time: "3:00 PM UTC",
    location: "Virtual",
    type: "Town Hall",
    description: "Quarterly all-hands for the XCitizen network. Route updates, new hub openings, venture milestones, and community-driven agenda items.",
    spots: "Open to all XCitizens",
    featured: false,
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
  },
];

/* ── Member Testimonials ── */
const testimonials = [
  {
    quote: "When the Route is fully operational, a Fellow could join in Cohort 3 and within six months be running operations for a venture in Kano. The network won't just connect you; it will place you where you're needed most.",
    name: "Chioma Adekunle",
    role: "Operations Lead, Helios",
    location: "Kano, Nigeria",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote: "The peer network, at scale, will be transformative. Imagine needing a regulatory contact in Rwanda for a diagnostics pilot \u2014 an XCitizen in Kigali could make the intro within 24 hours. That's the flywheel we're building.",
    name: "Dr. Kofi Mensah",
    role: "Co-Founder, Refract",
    location: "Cape Town, South Africa",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote: "As an investor, the deal flow could be unlike anything else. Six vehicles, vetted ventures, and the infrastructure to actually de-risk early-stage Africa. I could see deploying through multiple SPVs in a single year.",
    name: "Amara Diallo",
    role: "LP, xCelero Capital",
    location: "Dakar, Senegal",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
  },
];

/* ── Community Pillars (What makes it tick) ── */
const communityPillars = [
  {
    icon: Handshake,
    title: "Trust-Based Introductions",
    description: "Every connection is vetted. Members don't cold-pitch; they earn access through contribution. The result: higher-signal deals, faster trust, longer partnerships.",
  },
  {
    icon: Globe,
    title: "Borderless Collaboration",
    description: "A founder in Nairobi works with an operator in Accra and an investor in London. The Route makes cross-border as easy as cross-desk.",
  },
  {
    icon: Lightbulb,
    title: "Knowledge Transfer",
    description: "Workshops, playbooks, and field reports from ventures that have scaled on the Route. Hard-won lessons flow back into the network in real time.",
  },
  {
    icon: Sparkles,
    title: "Compound Returns",
    description: "Every new member strengthens the whole. Deals get faster, talent gets deeper, capital gets smarter. The flywheel accelerates with every connection made.",
  },
];

/* ── Rhythm Items (Community cadence) ── */
const rhythmItems = [
  {
    cadence: "Weekly",
    title: "Office Hours & Peer Circles",
    description: "XCitizens join thematic peer circles: energy founders with energy founders, investors with investors. Office hours with partners and mentors. Informal, high-signal, low-friction.",
    icon: Clock,
  },
  {
    cadence: "Monthly",
    title: "Deal Flow Sessions & Masterclasses",
    description: "Curated deal flow presentations for investors. Domain masterclasses led by operators who have scaled on the Route. Every session produces actionable output, not just slides.",
    icon: Calendar,
  },
  {
    cadence: "Quarterly",
    title: "Demo Days & Route Summits",
    description: "Accelerator cohorts present to investors and partners. Route Summits convene cross-hub operators for deal sharing, mentorship, and flywheel acceleration. The highest-signal events in emerging market tech.",
    icon: Star,
  },
  {
    cadence: "Annually",
    title: "xCitizen Assembly",
    description: "The full network convenes. Strategy reviews, venture showcases, LP meetings, and the annual State of the Route address. Where the next year's thesis gets debated and ratified.",
    icon: Globe,
  },
];

/* ── Past Event Highlights ── */
const pastHighlights = [
  {
    title: "Cohort 7 Demo Day",
    stat: "9 ventures",
    detail: "projected $2.4M collectively",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Route Summit East Africa",
    stat: "180 projected attendees",
    detail: "across 3 hub cities",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Masterclass: Battery Chemistry",
    stat: "340 projected viewers",
    detail: "live + replay",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80",
  },
];

/* ── xCitizen Passport Benefits ── */
const passportBenefits = [
  "Access to all 190 hubs across 39 countries",
  "Curated deal flow & peer circle invitations",
  "XCitizen-only events: summits, demo days, masterclasses",
  "Direct introductions to founders, operators & investors",
  "Route directory: talent, vendors, co-founders",
  "Voting rights at the annual xCitizen Assembly",
];

/* ══════════════════════════════════════════════════════════════════════════
   COMMUNITY PAGE
   ══════════════════════════════════════════════════════════════════════════ */
export function Community() {
  return (
    <div className="bg-white text-[#111111]">
      <HeroSection />
      <GalleryCollage />
      <NetworkStatsSection />
      <FeaturedMembersSection />
      <UpcomingEventsSection />
      <TestimonialsSection />
      <CommunityPillarsSection />
      <CommunityRhythmSection />
      <PastHighlightsSection />
      <PassportSection />
      <TownSquareSection />
      <CTASection />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   HERO, Editorial centered with serif accent
   ══════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative bg-white text-[#111111] pt-24 pb-16 sm:pt-32 sm:pb-20 md:pt-44 md:pb-28 px-5 sm:px-6 md:px-12 lg:px-20 border-b border-[#111111]/10">
      <div ref={ref} className="w-full max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          {/* Small label */}
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#FF4D00] mb-8 md:mb-12">
            Community
          </span>

          <h1 className="text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] leading-[1.05] font-display font-medium tracking-[-0.02em] mb-8 md:mb-10">
            Where builders{" "}
            <em className="italic font-serif text-[#FF4D00]">compound</em>.
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-[22px] leading-[1.6] text-[#111111]/50 font-medium max-w-2xl">
            1,200+ operators, founders, investors, and mentors projected across 190 hubs
            and 39 countries. The fourth engine designed to turn individual efforts
            into collective momentum.
          </p>

          {/* Quick stats row */}
          <div className="flex flex-wrap justify-center gap-8 mt-10 md:mt-14 pt-8 border-t border-[#111111]/10">
            <div className="text-center">
              <div className="text-[28px] md:text-[36px] font-display font-medium tracking-[-0.02em]">1,200+</div>
              <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/35 mt-1">XCitizens</div>
            </div>
            <div className="text-center">
              <div className="text-[28px] md:text-[36px] font-display font-medium tracking-[-0.02em]">190</div>
              <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/35 mt-1">Hubs</div>
            </div>
            <div className="text-center">
              <div className="text-[28px] md:text-[36px] font-display font-medium tracking-[-0.02em]">39+</div>
              <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/35 mt-1">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-[28px] md:text-[36px] font-display font-medium tracking-[-0.02em]">840+</div>
              <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/35 mt-1">Connections/mo</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   GALLERY COLLAGE, Masonry-style photo grid
   ══════════════════════════════════════════════════════════════════════════ */
function GalleryCollage() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 md:mb-14"
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-4 block">
            Life on the Route
          </span>
          <h2 className="text-[28px] md:text-[40px] font-display font-medium tracking-tight leading-[1.1]">
            Inside the <em className="italic font-serif text-[#FF4D00]">network</em>
          </h2>
        </motion.div>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[180px] md:auto-rows-[200px]">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
              className={`relative overflow-hidden group cursor-pointer ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-[11px] font-mono font-bold tracking-[0.15em] uppercase">
                  {img.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   NETWORK STATS, Inline metrics row with sub-labels
   ══════════════════════════════════════════════════════════════════════════ */
function NetworkStatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-16 md:py-20 px-6 md:px-12 lg:px-20 bg-[#FAFAFA] border-b border-[#111111]/10"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {networkStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="text-center lg:text-left"
            >
              <div className="text-[40px] sm:text-[48px] md:text-[56px] font-display font-medium tracking-[-0.03em] text-[#111111]">
                {stat.value}
              </div>
              <div className="text-[12px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/60 mt-1">
                {stat.label}
              </div>
              <div className="text-[12px] text-[#111111]/40 mt-1 font-medium">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   NETWORK ARCHITECTURE, The four member types forming on the Route
   ══════════════════════════════════════════════════════════════════════════ */
function FeaturedMembersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [filter, setFilter] = useState<string>("all");

  const filters = ["all", "Founder", "Operator", "Investor", "Mentor"];

  const filteredTypes =
    filter === "all"
      ? memberTypes
      : memberTypes.filter((m) => m.label === filter);

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center mb-10 md:mb-14"
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-6 block">
            The Network is Forming
          </span>
          <h2 className="text-[32px] md:text-[48px] lg:text-[56px] font-display font-medium tracking-tight leading-[1.05] mb-6">
            The people on the{" "}
            <em className="italic font-serif text-[#FF4D00]">Route</em>.
          </h2>
          <p className="text-[17px] md:text-[19px] text-[#111111]/50 font-medium leading-relaxed">
            Four archetypes, one flywheel. Founders, operators, investors, and
            mentors, each role compounding the others. The architecture is set;
            the network is assembling.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-2 mb-10 md:mb-14"
        >
          {filters.map((f) => (
            <button
              key={f}
              suppressHydrationWarning
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-[11px] font-mono font-bold tracking-[0.12em] uppercase border transition-colors ${
                filter === f
                  ? "bg-[#111111] text-white border-[#111111]"
                  : "bg-white text-[#111111]/50 border-[#111111]/15 hover:border-[#111111]/30"
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Shimmer animation keyframe */}
        <style>{`
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>

        {/* Type cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {filteredTypes.map((type, i) => {
            const TypeIcon = type.icon;
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: "easeOut" }}
                className={`group border border-[#111111]/10 bg-white overflow-hidden transition-all duration-300 ${type.borderHover}`}
              >
                {/* Silhouette placeholder area */}
                <div className="relative aspect-[4/3] bg-[#FAFAFA] flex flex-col items-center justify-center overflow-hidden">
                  {/* Background pattern - subtle grid */}
                  <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: "radial-gradient(circle, #111 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                  }} />
                  {/* Shimmer overlay on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                    background: "linear-gradient(105deg, transparent 40%, rgba(255,77,0,0.06) 45%, rgba(255,77,0,0.12) 50%, rgba(255,77,0,0.06) 55%, transparent 60%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 2.5s ease-in-out infinite",
                  }} />
                  {/* Large Users silhouette */}
                  <div className="relative flex flex-col items-center">
                    <Users className="w-12 h-12 text-[#111111]/12 group-hover:text-[#111111]/20 transition-colors duration-500" />
                    {/* Type icon badge overlaid */}
                    <div className={`-mt-2 w-8 h-8 flex items-center justify-center ${type.accentLight} transition-colors duration-300`}>
                      <TypeIcon className="w-4 h-4" />
                    </div>
                  </div>
                  {/* Count label with pulsing dot */}
                  <div className="mt-3 flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4D00] opacity-60" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF4D00]/70" />
                    </span>
                    <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/30">
                      {type.count}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 md:p-6">
                  {/* Type label */}
                  <div className="flex items-center gap-2 mb-3">
                    <TypeIcon className="w-4 h-4 text-[#FF4D00]" />
                    <span className="text-[11px] font-mono font-bold tracking-[0.12em] uppercase text-[#FF4D00]">
                      {type.label}
                    </span>
                  </div>

                  {/* Description with hover arrow */}
                  <p className="text-[13px] md:text-[14px] text-[#111111]/55 leading-[1.65] font-medium flex items-start gap-1">
                    <span className="flex-1">{type.description}</span>
                    <ChevronRight className="w-4 h-4 text-[#FF4D00] opacity-0 group-hover:opacity-60 translate-x-0 group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0 mt-0.5" />
                  </p>

                  {/* Bottom accent line */}
                  <div className={`mt-5 h-[2px] w-8 ${type.accent} opacity-20 group-hover:opacity-60 group-hover:w-12 transition-all duration-500`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="text-center mt-10 md:mt-14"
        >
          <p className="text-[12px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/25">
            The network is forming · Join the Route
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   EVENT DETAIL MODAL, Full-screen overlay with event details
   ══════════════════════════════════════════════════════════════════════════ */
function EventDetailModal({
  event,
  onClose,
}: {
  event: (typeof upcomingEvents)[number];
  onClose: () => void;
}) {
  const [rsvpEmail, setRsvpEmail] = useState("");
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [rsvpError, setRsvpError] = useState("");

  const handleRSVP = async () => {
    if (!rsvpEmail) return;
    setRsvpLoading(true);
    setRsvpError("");
    try {
      const res = await fetch("/api/capital/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: rsvpEmail, consent: true, source: `rsvp_${event.type.toLowerCase().replace(/\s+/g, "_")}` }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "RSVP failed");
      }
      setRsvpSubmitted(true);
    } catch (err) {
      setRsvpError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setRsvpLoading(false);
    }
  };

  const eventTypeColor: Record<string, string> = {
    "Demo Day": "bg-[#FF4D00] text-white",
    Summit: "bg-[#111111] text-white",
    Masterclass: "bg-[#FF4D00]/10 text-[#FF4D00]",
    Fellowship: "bg-[#111111]/10 text-[#111111]",
    "Investor Event": "bg-[#FF4D00] text-white",
    "Town Hall": "bg-[#111111]/10 text-[#111111]",
  };

  /* ESC key to close */
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white text-[#111111] max-w-lg w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-black/30 text-white hover:bg-black/60 transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Event image */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {/* Type badge */}
          <div className="absolute top-3 left-3">
            <span className={`inline-block text-[9px] font-mono font-bold tracking-[0.1em] uppercase px-2.5 py-1 ${eventTypeColor[event.type] || "bg-[#111111]/10 text-[#111111]"}`}>
              {event.type}
            </span>
          </div>
        </div>

        <div className="p-6 md:p-8">
          {/* Title */}
          <h2 className="text-[24px] md:text-[28px] font-display font-medium tracking-tight leading-[1.15] mb-6">
            {event.title}
          </h2>

          {/* Date, time, location */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-[13px] font-medium">
              <Calendar className="w-4 h-4 text-[#FF4D00] flex-shrink-0" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-3 text-[13px] font-medium text-[#111111]/60">
              <Clock className="w-4 h-4 text-[#FF4D00] flex-shrink-0" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-3 text-[13px] font-medium text-[#111111]/60">
              <MapPin className="w-4 h-4 text-[#FF4D00] flex-shrink-0" />
              <span>{event.location}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-[14px] md:text-[15px] text-[#111111]/60 leading-[1.7] font-medium mb-6">
            {event.description}
          </p>

          {/* Spots */}
          <div className="flex items-center gap-2 text-[12px] font-medium text-[#111111]/40 mb-8 pb-6 border-b border-[#111111]/10">
            <Users className="w-4 h-4" />
            <span>{event.spots}</span>
          </div>

          {/* RSVP */}
          {rsvpSubmitted ? (
            <div className="w-full py-3.5 bg-[#111111] text-white text-[12px] font-bold uppercase tracking-[0.12em] text-center flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" />
              You&apos;re on the list
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={rsvpEmail}
                  onChange={(e) => setRsvpEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 border border-[#111111]/15 text-[13px] font-medium placeholder:text-[#111111]/30 focus:outline-none focus:border-[#FF4D00] transition-colors"
                />
                <button
                  onClick={handleRSVP}
                  disabled={rsvpLoading || !rsvpEmail}
                  className="px-6 py-3 bg-[#FF4D00] text-white text-[12px] font-bold uppercase tracking-[0.12em] hover:bg-[#FF4D00]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {rsvpLoading ? "..." : "RSVP"}
                </button>
              </div>
              {rsvpError && (
                <p className="text-[11px] text-red-500 font-medium">{rsvpError}</p>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   UPCOMING EVENTS, Cards with dates, locations, and registration
   ══════════════════════════════════════════════════════════════════════════ */
function UpcomingEventsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selectedEvent, setSelectedEvent] = useState<(typeof upcomingEvents)[number] | null>(null);

  const eventTypeColor: Record<string, string> = {
    "Demo Day": "bg-[#FF4D00] text-white",
    Summit: "bg-[#111111] text-white",
    Masterclass: "bg-[#FF4D00]/10 text-[#FF4D00]",
    Fellowship: "bg-[#111111]/10 text-[#111111]",
    "Investor Event": "bg-[#FF4D00] text-white",
    "Town Hall": "bg-[#111111]/10 text-[#111111]",
  };

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-[#FAFAFA] border-b border-[#111111]/10"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center mb-10 md:mb-14"
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-6 block">
            Upcoming Events
          </span>
          <h2 className="text-[32px] md:text-[48px] lg:text-[56px] font-display font-medium tracking-tight leading-[1.05] mb-6">
            Where the network{" "}
            <em className="italic font-serif text-[#FF4D00]">gathers</em>.
          </h2>
          <p className="text-[17px] md:text-[19px] text-[#111111]/50 font-medium leading-relaxed">
            Demo days, summits, masterclasses, and town halls. The community
            compounds when it convenes.
          </p>
        </motion.div>

        {/* Events grid with images */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {upcomingEvents.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              onClick={() => setSelectedEvent(event)}
              className={`group border bg-white overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer ${
                event.featured
                  ? "border-[#FF4D00]/30 hover:border-[#FF4D00]/60"
                  : "border-[#111111]/10 hover:border-[#111111]/20"
              }`}
            >
              {/* Event image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {/* Type badge on image */}
                <div className="absolute top-3 left-3">
                  <span className={`text-[9px] font-mono font-bold tracking-[0.1em] uppercase px-2 py-1 ${eventTypeColor[event.type] || "bg-[#111111]/10 text-[#111111]"}`}>
                    {event.type}
                  </span>
                </div>
                {event.featured && (
                  <div className="absolute top-3 right-3">
                    <span className="text-[9px] font-mono font-bold tracking-[0.1em] uppercase px-2 py-1 bg-[#FF4D00] text-white flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Featured
                    </span>
                  </div>
                )}
                {/* Date overlay on image */}
                <div className="absolute bottom-3 left-3">
                  <div className="text-[11px] font-mono font-bold tracking-[0.05em] text-white flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#FF4D00]" />
                    {event.date}
                  </div>
                </div>
              </div>

              {/* Content below image */}
              <div className="p-4 md:p-5">
                <h3 className="text-[15px] md:text-[17px] font-display font-medium tracking-tight leading-tight mb-2 group-hover:text-[#FF4D00] transition-colors">
                  {event.title}
                </h3>
                <p className="text-[12px] md:text-[13px] text-[#111111]/55 leading-[1.6] font-medium mb-3 line-clamp-2">
                  {event.description}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-[10px] text-[#111111]/40 font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {event.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {event.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {event.spots}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-10">
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#FF4D00] hover:text-[#111111] transition-colors group"
          >
            View past event recaps
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <EventDetailModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   TESTIMONIALS, Member voices
   ══════════════════════════════════════════════════════════════════════════ */
function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center mb-14 md:mb-20"
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-6 block">
            Member Voices
          </span>
          <h2 className="text-[32px] md:text-[48px] lg:text-[56px] font-display font-medium tracking-tight leading-[1.05]">
            What XCitizens{" "}
            <em className="italic font-serif text-[#FF4D00]">say</em>.
          </h2>
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              className="border border-[#111111]/10 p-6 md:p-8 hover:border-[#FF4D00]/20 transition-colors relative"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-[#FF4D00]/20 mb-6" />

              {/* Quote text */}
              <p className="text-[15px] md:text-[16px] leading-[1.75] text-[#111111]/70 font-medium mb-8">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-6 border-t border-[#111111]/5">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover grayscale"
                />
                <div>
                  <div className="text-[14px] font-display font-medium tracking-tight">
                    {testimonial.name}
                  </div>
                  <div className="text-[11px] text-[#111111]/40 font-medium">
                    {testimonial.role}
                  </div>
                  <div className="text-[10px] text-[#111111]/30 font-medium flex items-center gap-1 mt-0.5">
                    <MapPin className="w-2.5 h-2.5" />
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   COMMUNITY PILLARS, How the network compounds
   ══════════════════════════════════════════════════════════════════════════ */
function CommunityPillarsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref}>
      <div className="max-w-[1400px] mx-auto bg-[#111111] text-white px-6 md:px-12 lg:px-20 py-16 md:py-24 rounded-sm">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center mb-14 md:mb-20"
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-6 block">
            How It Works
          </span>
          <h2 className="text-[32px] md:text-[48px] lg:text-[56px] font-display font-medium tracking-tight leading-[1.05] mb-6">
            The flywheel{" "}
            <em className="italic font-serif text-[#FF4D00]">effect</em>.
          </h2>
          <p className="text-[17px] md:text-[19px] text-white/40 font-medium leading-relaxed">
            Community isn't a feature; it's the compound engine. Here's how
            XCitizens turn individual effort into collective momentum.
          </p>
        </motion.div>

        {/* Pillar rows */}
        <div className="max-w-5xl mx-auto space-y-0">
          {communityPillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: i * 0.15,
                  ease: "easeOut",
                }}
                className="group flex flex-col md:flex-row md:items-start gap-5 md:gap-8 py-8 md:py-10 border-t border-white/10"
              >
                {/* Icon + Number */}
                <div className="flex items-center gap-4 md:w-[200px] flex-shrink-0">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-[#FF4D00] group-hover:text-[#FF4D00] transition-colors">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-[20px] md:text-[24px] font-display font-medium tracking-tight mb-3 group-hover:text-[#FF4D00] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-[14px] md:text-[15px] text-white/45 leading-[1.7] font-medium max-w-lg">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* How to join flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="max-w-5xl mx-auto mt-12 md:mt-16 pt-10 border-t border-white/10"
        >
          <h3 className="text-[20px] md:text-[24px] font-display font-medium tracking-tight mb-8 text-center">
            Three steps to the flywheel
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Apply or Get Nominated",
                desc: "XCitizens enter through accelerator cohorts, hub memberships, or direct nomination by existing members.",
              },
              {
                step: "02",
                title: "Get Matched to the Route",
                desc: "Your skills, venture stage, and geography are matched to the right hub, program, and peer group.",
              },
              {
                step: "03",
                title: "Compound Returns",
                desc: "Every connection, deal, and collaboration strengthens the network for everyone. The flywheel accelerates.",
              },
            ].map((step, i) => (
              <div key={step.step} className="relative">
                <div className="text-[48px] md:text-[56px] font-display font-medium tracking-[-0.03em] leading-none text-[#FF4D00]/30 mb-3">
                  {step.step}
                </div>
                <h4 className="text-[17px] font-display font-medium tracking-tight mb-2">
                  {step.title}
                </h4>
                <p className="text-[13px] text-white/40 leading-[1.65] font-medium">
                  {step.desc}
                </p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 -right-3 text-white/15">
                    <ChevronRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   COMMUNITY RHYTHM, How the network operates on a cadence
   ══════════════════════════════════════════════════════════════════════════ */
function CommunityRhythmSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });
  const isCardsInView = useInView(cardsRef, { once: true, margin: "-80px" });

  return (
    <>
      {/* Section header (white bg) */}
      <section
        ref={headerRef}
        className="py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-white text-[#111111] border-b border-[#111111]/10"
      >
        <div className="w-full max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-6 block">
              The Rhythm
            </span>
            <h2 className="text-[32px] md:text-[48px] lg:text-[56px] font-display font-medium tracking-tight leading-[1.05] mb-6">
              How the network{" "}
              <em className="italic font-serif text-[#FF4D00]">moves</em>.
            </h2>
            <p className="text-[17px] md:text-[19px] text-[#111111]/50 font-medium leading-relaxed">
              The community compounds because it has a cadence. Weekly, monthly,
              quarterly. Every cycle builds on the last.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Rhythm cards (dark bg) */}
      <section ref={cardsRef}>
        <div className="max-w-[1400px] mx-auto bg-[#111111] text-white px-6 md:px-12 lg:px-20 py-16 md:py-24 rounded-sm">
          {/* Visual timeline progression indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isCardsInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="hidden lg:flex items-center gap-3 mb-8 px-2"
          >
            {rhythmItems.map((item, i) => (
              <div key={item.cadence} className="flex items-center gap-3 flex-1">
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                  i === 0 ? "bg-[#FF4D00]" : i === 1 ? "bg-[#FF4D00]/70" : i === 2 ? "bg-[#FF4D00]/50" : "bg-[#FF4D00]/30"
                }`} />
                {i < rhythmItems.length - 1 && (
                  <div className="flex-1 h-px bg-gradient-to-r from-[#FF4D00]/40 to-[#FF4D00]/15" />
                )}
              </div>
            ))}
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {rhythmItems.map((item, i) => {
              const Icon = item.icon;
              const badgeStyles: Record<string, string> = {
                Weekly: "bg-[#FF4D00] text-white",
                Monthly: "bg-[#FF4D00]/15 text-[#FF4D00]",
                Quarterly: "bg-white/10 text-white border border-white/20",
                Annually: "bg-white text-[#111111]",
              };
              return (
                <motion.div
                  key={item.cadence}
                  initial={{ opacity: 0, y: 25 }}
                  animate={isCardsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                  className="border border-white/10 p-6 md:p-8 relative group hover:border-[#FF4D00]/30 transition-colors duration-300"
                >
                  {/* Cadence badge */}
                  <span className={`inline-block text-[10px] font-mono font-bold tracking-[0.15em] uppercase px-2.5 py-1 mb-4 ${badgeStyles[item.cadence] || "bg-[#FF4D00] text-white"}`}>
                    {item.cadence}
                  </span>

                  {/* Title */}
                  <h3 className="text-[18px] md:text-[20px] font-display font-medium tracking-tight mb-3 group-hover:text-[#FF4D00] transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[13px] text-white/45 leading-[1.7] font-medium">
                    {item.description}
                  </p>

                  {/* Icon in bottom-right corner */}
                  <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
                    <Icon className="w-10 h-10 md:w-12 md:h-12 text-white/10" strokeWidth={1} />
                  </div>

                  {/* Timeline connector dot (mobile/tablet vertical) */}
                  {i < rhythmItems.length - 1 && (
                    <div className="lg:hidden absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-5 h-5 flex items-center justify-center">
                      <div className="w-1 h-5 bg-gradient-to-b from-[#FF4D00]/30 to-transparent" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Community by the numbers mini-stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isCardsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="mt-12 md:mt-16 pt-10 border-t border-white/10"
          >
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
              <div className="text-center">
                <span className="text-[28px] md:text-[36px] font-display font-medium tracking-[-0.02em] text-white">52+</span>
                <span className="text-[11px] font-mono font-bold tracking-[0.15em] uppercase text-white/40 ml-2">peer circle sessions/yr</span>
              </div>
              <div className="hidden md:block w-px h-8 bg-white/10" />
              <div className="text-center">
                <span className="text-[28px] md:text-[36px] font-display font-medium tracking-[-0.02em] text-white">12</span>
                <span className="text-[11px] font-mono font-bold tracking-[0.15em] uppercase text-white/40 ml-2">masterclasses/yr</span>
              </div>
              <div className="hidden md:block w-px h-8 bg-white/10" />
              <div className="text-center">
                <span className="text-[28px] md:text-[36px] font-display font-medium tracking-[-0.02em] text-white">4</span>
                <span className="text-[11px] font-mono font-bold tracking-[0.15em] uppercase text-white/40 ml-2">demo days/yr</span>
              </div>
              <div className="hidden md:block w-px h-8 bg-white/10" />
              <div className="text-center">
                <span className="text-[28px] md:text-[36px] font-display font-medium tracking-[-0.02em] text-white">1</span>
                <span className="text-[11px] font-mono font-bold tracking-[0.15em] uppercase text-white/40 ml-2">Assembly</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAST HIGHLIGHTS, Photo-backed stat cards
   ══════════════════════════════════════════════════════════════════════════ */
function PastHighlightsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-6 block">
            Recent Highlights
          </span>
          <h2 className="text-[32px] md:text-[48px] lg:text-[56px] font-display font-medium tracking-tight leading-[1.05]">
            What the community{" "}
            <em className="italic font-serif text-[#FF4D00]">built</em>.
          </h2>
        </motion.div>

        {/* Highlight cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {pastHighlights.map((highlight, i) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.12,
                ease: "easeOut",
              }}
              className="group relative overflow-hidden border border-[#111111]/10 hover:border-[#FF4D00]/30 transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={highlight.image}
                  alt={highlight.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              {/* Content */}
              <div className="p-5 md:p-6">
                <h3 className="text-[17px] md:text-[20px] font-display font-medium tracking-tight mb-2">
                  {highlight.title}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-[28px] md:text-[36px] font-display font-medium tracking-[-0.02em] text-[#FF4D00]">
                    {highlight.stat}
                  </span>
                  <span className="text-[13px] text-[#111111]/45 font-medium">
                    {highlight.detail}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   CTA SECTION, Dark bg with warm community messaging
   ══════════════════════════════════════════════════════════════════════════ */
function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref}>
      <div className="max-w-[1400px] mx-auto bg-[#111111] text-white px-6 md:px-12 lg:px-20 py-20 md:py-32 rounded-sm relative overflow-hidden">
        {/* Subtle dot-grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }} />
        {/* Decorative accent lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FF4D00]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FF4D00]/20 to-transparent" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#FF4D00] mb-8 md:mb-12">
            Join the Network
          </span>

          <h2 className="text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] font-display font-medium tracking-[-0.02em] leading-[1.05] mb-8 md:mb-10">
            Become an <span className="text-[#FF4D00]">XCitizen</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl leading-[1.6] text-white/50 font-medium max-w-2xl mb-10 sm:mb-14">
            1,200+ builders already on the Route. The network that builds the
            next century is accepting new members. Apply to the Accelerator,
            invest through xCelero Capital, or join a hub near you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              to="/join"
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#FF4D00] text-white text-[13px] font-bold uppercase tracking-[0.14em] hover:bg-[#FF4D00]/90 transition-all shadow-[0_0_40px_rgba(255,77,0,0.25)] hover:shadow-[0_0_60px_rgba(255,77,0,0.4)]"
            >
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/capital"
              className="inline-flex items-center gap-2 px-10 py-5 border border-white/20 text-white text-[13px] font-bold uppercase tracking-[0.14em] hover:bg-white hover:text-[#111111] transition-all"
            >
              Invest
            </Link>
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   xCITIZEN PASSPORT, Membership pass section
   ══════════════════════════════════════════════════════════════════════════ */
function PassportSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-[#FAFAFA] border-b border-[#111111]/10"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-6 block">
            Membership
          </span>
          <h2 className="text-[32px] md:text-[48px] lg:text-[56px] font-display font-medium tracking-tight leading-[1.05] mb-6">
            Get your{" "}
            <em className="italic font-serif text-[#FF4D00]">xCitizen Passport</em>
          </h2>
          <p className="text-[17px] md:text-[19px] text-[#111111]/50 font-medium leading-relaxed">
            Your single pass to the entire Route. One-time activation, then a
            low annual subscription that keeps the network open for everyone.
          </p>
        </motion.div>

        {/* Passport card + Benefits layout */}
        <div className="grid lg:grid-cols-5 gap-8 md:gap-12 items-start">
          {/* Passport visual card: takes 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-2"
          >
            <div className="relative bg-[#111111] text-white overflow-hidden border border-[#111111]">
              {/* Grain texture overlay */}
              <div className="absolute inset-0 grain opacity-[0.04] pointer-events-none" />

              {/* Top accent bar */}
              <div className="h-1.5 bg-[#FF4D00]" />

              <div className="p-6 md:p-8">
                {/* Passport header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 border border-[#FF4D00]/40 flex items-center justify-center">
                    <Shield className="w-5 h-5 md:w-6 md:h-6 text-[#FF4D00]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00]">
                      xCelero
                    </div>
                    <div className="text-[15px] md:text-[17px] font-display font-medium tracking-tight leading-tight">
                      xCitizen Passport
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/10 mb-6" />

                {/* Pricing */}
                <div className="space-y-4 mb-8">
                  {/* One-time activation */}
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-white/40">
                        One-Time Activation
                      </div>
                      <div className="text-[36px] md:text-[44px] font-display font-medium tracking-[-0.03em] leading-none mt-1">
                        $25
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-[0.1em] uppercase text-white/25 border border-white/10 px-2 py-1">
                      Lifetime
                    </span>
                  </div>

                  {/* Annual subscription */}
                  <div className="flex items-baseline justify-between pt-4 border-t border-white/10">
                    <div>
                      <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-white/40">
                        Annual Subscription
                      </div>
                      <div className="text-[36px] md:text-[44px] font-display font-medium tracking-[-0.03em] leading-none mt-1">
                        $9<span className="text-[16px] md:text-[20px] text-white/40 font-medium">/yr</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-[0.1em] uppercase text-[#FF4D00] border border-[#FF4D00]/30 px-2 py-1">
                      Low Barrier
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  to="/join"
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#FF4D00] text-white text-[12px] font-bold uppercase tracking-[0.12em] hover:bg-[#FF4D00]/90 transition-colors"
                >
                  Get Your Passport
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Fine print */}
                <p className="text-[10px] text-white/25 font-medium mt-4 text-center leading-relaxed">
                  Pricing kept intentionally low so the Route stays open to every serious builder, regardless of background.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Benefits list: takes 3 cols */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
            className="lg:col-span-3"
          >
            <div className="mb-8">
              <h3 className="text-[22px] md:text-[28px] font-display font-medium tracking-tight leading-tight mb-3">
                What your passport <em className="italic font-serif text-[#FF4D00]">unlocks</em>.
              </h3>
              <p className="text-[14px] md:text-[15px] text-[#111111]/50 font-medium leading-relaxed">
                Every xCitizen Passport holder gets full access to the network&apos;s
                infrastructure, events, and people. No tiers. No gatekeeping
                beyond the initial activation.
              </p>
            </div>

            {/* Benefits grid */}
            <div className="grid sm:grid-cols-2 gap-0 border border-[#111111]/10">
              {passportBenefits.map((benefit, i) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease: "easeOut" }}
                  className={`flex items-start gap-3 p-4 md:p-5 ${
                    i < passportBenefits.length - 2 ? "border-b border-[#111111]/10" : ""
                  } ${i % 2 === 0 ? "border-r border-[#111111]/10" : ""}`}
                >
                  <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-[#FF4D00]" strokeWidth={2.5} />
                  </div>
                  <span className="text-[13px] md:text-[14px] text-[#111111]/70 font-medium leading-snug">
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Additional info row */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="text-center p-4 border border-[#111111]/10">
                <div className="text-[24px] md:text-[28px] font-display font-medium tracking-[-0.02em] text-[#111111]">
                  1,200+
                </div>
                <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/35 mt-1">
                  Current holders
                </div>
              </div>
              <div className="text-center p-4 border border-[#111111]/10">
                <div className="text-[24px] md:text-[28px] font-display font-medium tracking-[-0.02em] text-[#111111]">
                  39+
                </div>
                <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/35 mt-1">
                  Countries
                </div>
              </div>
              <div className="text-center p-4 border border-[#111111]/10">
                <div className="text-[24px] md:text-[28px] font-display font-medium tracking-[-0.02em] text-[#111111]">
                  1
                </div>
                <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/35 mt-1">
                  Flat rate
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   TOWN SQUARE, Forum sign-up section
   ══════════════════════════════════════════════════════════════════════════ */
function TownSquareSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const previewDiscussions = [
    {
      community: "Energy & Infrastructure",
      title: "Mini-grid economics in Northern Nigeria: unit economics from Cohort 7",
      author: "Yusuf Hassan",
      upvotes: 142,
      color: "bg-[#FF4D00]",
    },
    {
      community: "Digital Finance",
      title: "Cross-border payments infrastructure: what we learned building across 3 corridors",
      author: "Fatima Al-Rashid",
      upvotes: 204,
      color: "bg-amber-600",
    },
    {
      community: "Capital & Deals",
      title: "SPV deployment update: Q1 2026 portfolio construction",
      author: "Amara Diallo",
      upvotes: 312,
      color: "bg-rose-600",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left: Copy + CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          >
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-6 block">
              Town Square
            </span>
            <h2 className="text-[32px] md:text-[48px] lg:text-[56px] font-display font-medium tracking-tight leading-[1.05] mb-6">
              Where the network{" "}
              <em className="italic font-serif text-[#FF4D00]">talks</em>.
            </h2>
            <p className="text-[17px] md:text-[19px] text-[#111111]/50 font-medium leading-relaxed mb-6">
              The XCitizen forum. Real-time discussions on deals, infrastructure,
              regulations, hiring, and hard-won lessons from the Route. No noise.
              No cold pitches. Just builders sharing what they know.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {["Energy & Infrastructure", "Life Sciences", "Digital Finance", "Route Operations", "Capital & Deals", "Founders Corner"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-[10px] font-mono font-bold tracking-[0.1em] uppercase border border-[#111111]/10 text-[#111111]/40"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <Link
                to="/townsquare"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF4D00] text-white text-[12px] font-bold uppercase tracking-[0.12em] hover:bg-[#FF4D00]/90 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Enter Town Square
              </Link>
              <span className="text-[12px] text-[#111111]/30 font-medium">
                Free account required · takes 60 seconds
              </span>
            </div>
          </motion.div>

          {/* Right: Preview cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="space-y-3"
          >
            {/* Mock forum header */}
            <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-[#111111]/10">
              <div className="w-8 h-8 bg-[#FF4D00] flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-[14px] font-display font-medium tracking-tight">
                  Town Square
                </div>
                <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00]">
                  XCitizen Forum
                </div>
              </div>
              <div className="ml-auto flex items-center gap-2 text-[10px] text-[#111111]/25 font-mono font-bold">
                <span>1,200+ members</span>
                <span>•</span>
                <span>6 communities</span>
              </div>
            </div>

            {previewDiscussions.map((discussion, i) => (
              <motion.div
                key={discussion.title}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                className="group border border-[#111111]/10 p-4 hover:border-[#FF4D00]/20 hover:bg-[#FAFAFA] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2 text-[11px] text-[#111111]/35 mb-2">
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${discussion.color}`}
                  >
                    <span className="text-[7px] font-bold text-white uppercase">
                      {discussion.community[0]}
                    </span>
                  </div>
                  <span className="font-bold text-[#111111]/50">{discussion.community}</span>
                  <span>•</span>
                  <span>{discussion.author}</span>
                </div>
                <h4 className="text-[14px] md:text-[15px] font-display font-medium tracking-tight text-[#111111]/80 leading-snug group-hover:text-[#FF4D00] transition-colors">
                  {discussion.title}
                </h4>
                <div className="flex items-center gap-3 mt-2.5 text-[10px] text-[#111111]/25 font-mono font-bold">
                  <span className="flex items-center gap-1">
                    <ArrowUp className="w-3 h-3 text-[#FF4D00]" />
                    {discussion.upvotes}
                  </span>
                  <span>6 comments</span>
                  <span className="ml-auto flex items-center gap-1 group-hover:text-[#FF4D00] transition-colors">
                    View discussion
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Bottom fade hint */}
            <div className="relative h-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
