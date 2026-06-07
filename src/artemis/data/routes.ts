/* ══════════════════════════════════════════════════════════════════════════
   ROUTES DATA, The Six Legs of the xCelero Routes
   ══════════════════════════════════════════════════════════════════════════ */

export interface KeyCity {
  name: string;
  lat: number;
  lng: number;
  description: string;
}

export interface CoreFlows {
  goods: string;
  capital: string;
  data: string;
  people: string;
}

export interface RouteDealThesis {
  title: string;
  description: string;
}

export interface SignatureDeal {
  name: string;
  duration: string;
  focus: string;
  inclusions: string[];
}

export interface CulturalWeaving {
  commonsFeast: string;
  heritageWalk: string;
  ritualClosing: string;
}

export interface SampleSchedule {
  period: string;
  keyHubs: string;
  climateNote: string;
}

export interface RouteLeg {
  id: string;
  name: string;
  subtitle: string;
  legNumber: number;
  hubCount: number;
  countries: string[];
  coreGeography: string;
  historicalAnchor: string;
  primaryFlow: string;
  coreFlows: CoreFlows;
  friction: string[];
  routeDealThesis: RouteDealThesis;
  signatureDeals: SignatureDeal[];
  culturalWeaving: CulturalWeaving;
  keyCities: KeyCity[];
  sampleSchedule: SampleSchedule;
  color: string;
}

export interface AnnualSchedule {
  period: string;
  leg: string;
  legId: string;
  hubs: string;
  climateNote: string;
}

/* ── Annual Cohort Schedule ── */

export const annualSchedule: AnnualSchedule[] = [
  {
    period: "Jan – Mar",
    leg: "Gulf of Guinea Arc",
    legId: "gulf-of-guinea",
    hubs: "49 hubs",
    climateNote: "Dry season: optimal coastal transit",
  },
  {
    period: "Apr – May",
    leg: "East African Corridor",
    legId: "east-african",
    hubs: "24 hubs",
    climateNote: "Pre-long rains: clear highland routes",
  },
  {
    period: "Jun – Jul",
    leg: "Central African Heartland",
    legId: "central-african",
    hubs: "19 hubs",
    climateNote: "Avoid peak rain: river levels navigable",
  },
  {
    period: "Aug – Sep",
    leg: "Southern Arc",
    legId: "southern-arc",
    hubs: "18 hubs",
    climateNote: "Cool dry season: highland clarity",
  },
  {
    period: "Oct – Nov",
    leg: "Sahel Band",
    legId: "sahel-band",
    hubs: "22 hubs",
    climateNote: "Post-rainy season: desert tracks firm",
  },
  {
    period: "Dec",
    leg: "North Africa & Global Gateways",
    legId: "north-africa-global",
    hubs: "80 hubs",
    climateNote: "Year-end capital window: global deal flow",
  },
];

/* ── The Six Legs ── */

export const routeLegs: RouteLeg[] = [
  {
    id: "gulf-of-guinea",
    name: "Gulf of Guinea Arc",
    subtitle: "The Liquidity Coast",
    legNumber: 1,
    hubCount: 49,
    countries: ["Nigeria", "Ghana", "Côte d'Ivoire", "Senegal", "Cameroon"],
    coreGeography: "West African coastal littoral: from Senegal's Cap-Vert to Cameroon's Wouri estuary",
    historicalAnchor: "Transatlantic exchange; coastal maritime trade. For four centuries, the Gulf of Guinea was the fulcrum of global trade: first in human cargo, then in palm oil, cocoa, and now in digital value. The arc carries the memory of forced departure and the momentum of self-determined return.",
    primaryFlow: "FMCG, mobile money, creative IP, venture capital",
    coreFlows: {
      goods: "FMCG distribution, port-to-last-mile logistics, consumer goods",
      capital: "Mobile money protocols, FX arbitrage, venture capital, remittances",
      data: "Creative IP (Nollywood, Afrobeats), fintech APIs, market intelligence",
      people: "Diaspora returnees, creative talent, fintech operators, traders",
    },
    friction: [
      "Port congestion: 21-day average dwell time",
      "Fragmented FX: 15+ currencies with limited convertibility",
      "Non-harmonized customs across ECOWAS",
      "80% informal trade escaping formal measurement",
    ],
    routeDealThesis: {
      title: "The Liquidity Build",
      description: "Hacking cross-border FX protocols to unlock trapped liquidity. Building shared port-to-last-mile logistics APIs that turn 21-day dwell into 72-hour throughput. The Gulf of Guinea doesn't need new infrastructure: it needs interoperability between the systems already running.",
    },
    signatureDeals: [
      {
        name: "Port-to-Market Immersion",
        duration: "5 days",
        focus: "End-to-end logistics mapping from port entry to last-mile distribution",
        inclusions: ["Port authority access", "Customs broker shadowing", "Warehouse operations audit", "Last-mile delivery tracking", "FX settlement documentation"],
      },
      {
        name: "Mobile Money Interop Sprint",
        duration: "4 days",
        focus: "Building cross-border mobile money settlement protocols",
        inclusions: ["Provider API deep-dive", "Regulatory mapping", "Settlement architecture", "Pilot transaction design"],
      },
      {
        name: "Nollywood Distribution Pact",
        duration: "3 days",
        focus: "Creative IP distribution infrastructure across the arc",
        inclusions: ["Studio visits", "Distribution chain mapping", "Revenue share modeling", "Digital rights architecture"],
      },
      {
        name: "Informal Trade Formalization Lab",
        duration: "6 days",
        focus: "Converting 80% informal trade into measurable, bankable flows",
        inclusions: ["Market immersion", "Trader trust protocols", "Digital documentation systems", "Banking integration design"],
      },
    ],
    culturalWeaving: {
      commonsFeast: "Jollof rice cook-off: a deliberately competitive, deliberately joyful celebration of West African culinary identity. Each hub claims supremacy. The League makes no adjudication.",
      heritageWalk: "Kurmi Market (Kano) → Cape Coast Castle (Ghana) → Gorée Island (Senegal). Three sites of memory: the inland market where goods gathered, the coastal fort where humans departed, the island of the door of no return. Walked not as tourism but as witnessing.",
      ritualClosing: "Libation pouring ritual: an offering to the ancestors of trade, to the waters that carried both pain and profit, and to the soil that receives what returns.",
    },
    keyCities: [
      { name: "Lagos", lat: 6.5, lng: 3.4, description: "Africa's commercial nerve center: 20M people, limitless velocity" },
      { name: "Accra", lat: 5.6, lng: -0.2, description: "Stable gateway for West African fintech and creative industries" },
      { name: "Abidjan", lat: 5.3, lng: -4.0, description: "Francophone hub: financial services and cocoa logistics" },
      { name: "Dakar", lat: 14.7, lng: -17.4, description: "Westernmost point: maritime gateway and digital arts capital" },
      { name: "Douala", lat: 4.0, lng: 9.7, description: "Central African port entry: bilingual trade corridor" },
    ],
    sampleSchedule: {
      period: "January – March",
      keyHubs: "Lagos → Accra → Abidjan → Dakar → Douala",
      climateNote: "Dry season across the coast: optimal for port and road transit",
    },
    color: "#FF4D00",
  },
  {
    id: "sahel-band",
    name: "Sahel Band",
    subtitle: "The Resilience Frontier",
    legNumber: 2,
    hubCount: 22,
    countries: ["Mali", "Burkina Faso", "Niger", "Chad", "Sudan"],
    coreGeography: "The Sahelian belt: 5,400km of semi-arid transition from Atlantic to Red Sea",
    historicalAnchor: "Trans-Saharan salt-gold-knowledge routes. For a thousand years, caravans of 10,000 camels crossed the Sahel carrying salt from Taghaza, gold from Wangara, and manuscripts from Timbuktu. The route was not a road: it was a protocol for surviving hostile terrain through distributed knowledge.",
    primaryFlow: "Gold, livestock, climate data, humanitarian capital",
    coreFlows: {
      goods: "Artisanal gold, livestock, salt, agricultural commodities",
      capital: "Humanitarian aid, climate adaptation funds, diaspora remittances",
      data: "Climate monitoring, satellite imagery, displacement tracking",
      people: "Pastoral communities, displaced populations, climate migrants, aid workers",
    },
    friction: [
      "State fragility: governance gaps across 5+ conflict zones",
      "Violent extremism: active insurgency corridors",
      "Desertification: 600km² of arable land lost annually",
      "Less than 15% internet penetration: digital darkness",
    ],
    routeDealThesis: {
      title: "The Resilience Pact",
      description: "Climate-adaptive logistics that move with people, not around them. Mesh-networks that function where state infrastructure has retreated. Decentralized identity for those stripped of documentation by conflict. The Sahel does not wait for connectivity: it builds its own.",
    },
    signatureDeals: [
      {
        name: "Pastoral Corridor Audit",
        duration: "7 days",
        focus: "Mapping livestock migration corridors and trade chokepoints",
        inclusions: ["Transhumance route documentation", "Market day mapping", "Veterinary checkpoint audit", "Conflict zone navigation protocol"],
      },
      {
        name: "Mesh-Network Build Sprint",
        duration: "4 days",
        focus: "Deploying offline-first communication infrastructure",
        inclusions: ["LoRa node deployment", "Solar power integration", "Community training", "Emergency protocol design"],
      },
      {
        name: "Climate Data Independence Lab",
        duration: "5 days",
        focus: "Building local ownership of climate monitoring data",
        inclusions: ["Sensor deployment", "Data architecture", "Community governance", "Early warning systems"],
      },
      {
        name: "Displaced Identity Protocol",
        duration: "6 days",
        focus: "Self-managed identity for conflict-displaced populations",
        inclusions: ["Biometric enrollment", "Offline verification", "Cross-border recognition", "Humanitarian integration"],
      },
    ],
    culturalWeaving: {
      commonsFeast: "Tuareg tea ceremony: three rounds of steeped green tea with fresh mint. The first is bitter like life, the second is sweet like love, the third is gentle like death. Served in the desert, it is both hospitality and philosophy.",
      heritageWalk: "Timbuktu manuscripts → Agadez caravan routes. From the libraries that preserved 700,000 manuscripts through centuries of siege, to the caravan terminus where salt was traded gram-for-gram for gold. Knowledge and commerce: always inseparable.",
      ritualClosing: "Sand-writing ceremony: tracing intentions in Saharan sand, knowing the wind will carry them. An act of radical impermanence and profound trust in the desert's memory.",
    },
    keyCities: [
      { name: "Bamako", lat: 12.6, lng: -8.0, description: "Sahel's administrative anchor: music and gold" },
      { name: "Ouagadougou", lat: 12.4, lng: -1.5, description: "Burkinabé cultural capital: artisan commerce and resistance" },
      { name: "Niamey", lat: 13.5, lng: 2.1, description: "Niger River gateway: uranium and pastoral trade" },
      { name: "N'Djamena", lat: 12.1, lng: 15.0, description: "Chad's crossroads: humanitarian logistics hub" },
      { name: "Timbuktu", lat: 16.8, lng: -3.0, description: "The legendary city of knowledge: manuscripts and memory" },
    ],
    sampleSchedule: {
      period: "October – November",
      keyHubs: "Bamako → Ouagadougou → Niamey → N'Djamena → Timbuktu",
      climateNote: "Post-rainy season: desert tracks firm, temperatures manageable",
    },
    color: "#E85D26",
  },
  {
    id: "east-african",
    name: "East African Corridor",
    subtitle: "The Corridor API",
    legNumber: 3,
    hubCount: 24,
    countries: ["Kenya", "Tanzania", "Uganda", "Rwanda", "Burundi", "Eastern DRC"],
    coreGeography: "Indian Ocean littoral to Great Lakes highlands: the Swahili corridor and its inland extensions",
    historicalAnchor: "Indian Ocean monsoon trade; Swahili city-states. For two millennia, the monsoon winds carried dhows between the Persian Gulf, India, and the Swahili coast. Kilwa, Mombasa, Zanzibar: these were not ports but nodes in a maritime operating system that moved gold, ivory, ideas, and people across the Indian Ocean world.",
    primaryFlow: "Agricultural commodities, cross-border freight, tourism",
    coreFlows: {
      goods: "Agricultural commodities, cross-border freight, horticulture",
      capital: "Mobile money (M-Pesa ecosystem), development finance, tourism receipts",
      data: "Freight tracking, agricultural pricing, health data, tourism analytics",
      people: "Tech talent, cross-border traders, agricultural workers, tourists",
    },
    friction: [
      "14+ day border dwell time for freight trucks",
      "Aging rail infrastructure: colonial-era gauge limitations",
      "Siloed mobile money: M-Pesa dominance without interop",
      "Regulatory divergence across EAC partner states",
    ],
    routeDealThesis: {
      title: "The Corridor API",
      description: "A unified digital corridor for customs, freight, and payments: one API that makes the Northern Corridor as programmable as a shipping route. If the monsoon winds were the original protocol, the Corridor API is its digital successor.",
    },
    signatureDeals: [
      {
        name: "Corridor Data Stack Sprint",
        duration: "5 days",
        focus: "Building the unified data layer for corridor logistics",
        inclusions: ["Customs data integration", "Freight tracking API", "Border dwell analytics", "Payment reconciliation"],
      },
      {
        name: "Mobile Money Interop Lab",
        duration: "4 days",
        focus: "Cross-border mobile money settlement architecture",
        inclusions: ["M-Pesa ecosystem deep-dive", "Regulatory mapping", "Settlement protocol design", "Pilot transaction framework"],
      },
      {
        name: "Agri-Market Price Transparency",
        duration: "6 days",
        focus: "Real-time agricultural pricing for cross-border trade",
        inclusions: ["Price collection infrastructure", "Market data API", "Trader network activation", "Arbitrage detection"],
      },
      {
        name: "Tourism Flow Optimization",
        duration: "3 days",
        focus: "Data-driven tourism routing and revenue distribution",
        inclusions: ["Visitor flow mapping", "Revenue leak audit", "Digital booking infrastructure", "Community benefit design"],
      },
    ],
    culturalWeaving: {
      commonsFeast: "Swahili coastal cuisine: coconut-infused stews, grilled seafood, pilau rice. The food of a coast that has absorbed Persian, Arab, Indian, and Portuguese influences over a thousand years of monsoon trade. Every plate is a treaty.",
      heritageWalk: "Fort Jesus (Mombasa) → Stone Town (Zanzibar). From the Portuguese fortress that changed hands nine times, to the Omani palace city where slave and spice markets operated side by side. Architecture as evidence of contested self-determination.",
      ritualClosing: "Dhow sailing ceremony: boarding a traditional lateen-rigged vessel at sunset, letting the monsoon wind determine direction. An act of surrender to the original routing protocol.",
    },
    keyCities: [
      { name: "Nairobi", lat: -1.3, lng: 36.8, description: "East Africa's tech capital: M-Pesa, iHub, Silicon Savannah" },
      { name: "Kigali", lat: -1.9, lng: 30.1, description: "The clean protocol: governance innovation and ease-of-doing-business" },
      { name: "Dar es Salaam", lat: -6.8, lng: 39.3, description: "Indian Ocean port: freight gateway to the interior" },
      { name: "Kampala", lat: 0.3, lng: 32.6, description: "Lake Victoria hub: mobile money and agricultural trade" },
      { name: "Mombasa", lat: -4.0, lng: 39.7, description: "Ancient port city: the Northern Corridor's maritime terminus" },
    ],
    sampleSchedule: {
      period: "April – May",
      keyHubs: "Nairobi → Kigali → Dar es Salaam → Kampala → Mombasa",
      climateNote: "Pre-long rains: highland routes clear, coastal conditions stable",
    },
    color: "#CC6B33",
  },
  {
    id: "central-african",
    name: "Central African Heartland",
    subtitle: "The River Stack",
    legNumber: 4,
    hubCount: 19,
    countries: ["DRC", "Cameroon", "Gabon", "Congo", "CAR"],
    coreGeography: "Congo Basin: the world's second-largest rainforest and its riverine highway network",
    historicalAnchor: "Congo Basin resource networks; riverine trade. The Congo River is not geography: it is infrastructure. Before roads, before rails, before colonial administration, the river and its 15,000km of navigable tributaries were the operating system of Central Africa. Villages became ports. Ports became cities. The river connected 75 million people before any state tried to.",
    primaryFlow: "Minerals, timber, river logistics, biodiversity data",
    coreFlows: {
      goods: "Cobalt, coltan, copper, timber, river-borne freight",
      capital: "Mining royalties, conservation finance, infrastructure bonds",
      data: "Biodiversity monitoring, mineral traceability, forest carbon data",
      people: "River communities, artisanal miners, conservation workers, displaced populations",
    },
    friction: [
      "River infrastructure decay: colonial-era ports in disrepair",
      "90% informal cobalt mining: no traceability, no safety",
      "Regulatory opacity: mining permits and forest concessions traded in shadow",
      "Less than 10% internet connectivity: deepest digital darkness",
    ],
    routeDealThesis: {
      title: "The River Stack",
      description: "Revitalizing riverine logistics as the backbone of Central African trade. Building artisanal mining traceability from pit to port. The river was the original infrastructure: it doesn't need replacement, it needs a digital layer that makes its existing capacity visible, programmable, and equitable.",
    },
    signatureDeals: [
      {
        name: "River Logistics Revival Lab",
        duration: "6 days",
        focus: "Reactiving Congo River freight corridors with digital coordination",
        inclusions: ["Port condition audit", "Vessel tracking deployment", "Customs digitization", "Freight marketplace design"],
      },
      {
        name: "Artisanal Mining Traceability Sprint",
        duration: "5 days",
        focus: "End-to-end mineral traceability from pit to port",
        inclusions: ["Pit-level tagging", "Transport chain documentation", "Refinery verification", "Export certification"],
      },
      {
        name: "Biodiversity Data Commons",
        duration: "4 days",
        focus: "Open data infrastructure for Congo Basin biodiversity",
        inclusions: ["Sensor network architecture", "Community data collection", "Scientific partnership", "Carbon credit verification"],
      },
      {
        name: "Offline-First Tools Build",
        duration: "7 days",
        focus: "Building digital tools that work in 10% connectivity environments",
        inclusions: ["Progressive web app architecture", "Local-first data sync", "Mesh communication", "Solar charging integration"],
      },
    ],
    culturalWeaving: {
      commonsFeast: "Congo Basin staples: fufu, pondu (cassava leaves), smoked fish, palm wine. Food born from river and forest, prepared with patience over charcoal. No shortcuts, no imports, only what the basin provides.",
      heritageWalk: "Kinshasa markets → Congo River ports. From the sprawling markets where everything from satellite dishes to traditional medicine is traded, to the river ports where barges depart for Kisangani with 1,000 passengers and no manifest. Commerce as chaos, chaos as protocol.",
      ritualClosing: "River libation ritual: an offering to Mami Wata, the water spirit who governs the Congo's flow. Not superstition but acknowledgment that the river is alive, and its permission matters.",
    },
    keyCities: [
      { name: "Kinshasa", lat: -4.3, lng: 15.3, description: "17 million people: the largest francophone city on Earth" },
      { name: "Lubumbashi", lat: -11.7, lng: 27.5, description: "Copperbelt capital: mineral processing and export" },
      { name: "Douala", lat: 4.0, lng: 9.7, description: "Atlantic port: the River Stack's maritime gateway" },
      { name: "Brazzaville", lat: -4.3, lng: 15.3, description: "Pool Malebo: twin city to Kinshasa across the river" },
      { name: "Yaoundé", lat: 3.9, lng: 11.5, description: "Cameroon's administrative capital: bilingual bridge" },
    ],
    sampleSchedule: {
      period: "June – July",
      keyHubs: "Kinshasa → Brazzaville → Douala → Yaoundé → Lubumbashi",
      climateNote: "Avoid peak rain: river levels navigable, roads passable",
    },
    color: "#B37840",
  },
  {
    id: "southern-arc",
    name: "Southern Arc",
    subtitle: "The Industrial Flow",
    legNumber: 5,
    hubCount: 18,
    countries: ["Zimbabwe", "Zambia", "Angola", "Lesotho", "Eswatini", "Malawi"],
    coreGeography: "Southern African highveld and Copperbelt: from the Kalahari to the Drakensberg",
    historicalAnchor: "Great Zimbabwe trade; Copperbelt industrialization. Great Zimbabwe moved gold and copper across the Indian Ocean 800 years before Cecil Rhodes arrived. The Copperbelt: Kitwe, Ndola, Lubumbashi, was the 20th century's mineral backbone, powering two world wars and building the cities that now must reinvent themselves.",
    primaryFlow: "Copper, cobalt, rail freight, hydro energy",
    coreFlows: {
      goods: "Copper cathodes, cobalt, tobacco, cotton, rail freight",
      capital: "Mining royalties, commodity derivatives, national investment funds, hydro energy revenue",
      data: "Mining geology, energy grid telemetry, rail tracking, commodity pricing",
      people: "Miners, railway workers, agricultural labor, energy engineers, artisans",
    },
    friction: [
      "Rail gauge fragmentation: three incompatible systems across the arc",
      "Load-shedding: 12+ hour power cuts in manufacturing zones",
      "Currency volatility: six currencies with limited convertibility",
      "Skills mismatch: mining workforce needing transition to new economies",
    ],
    routeDealThesis: {
      title: "The Industrial Flow",
      description: "Harmonizing rail logistics across incompatible gauge systems with containerization protocols. Building energy-resilient manufacturing that runs through load-shedding. The Southern Arc has the minerals, the water, and the workforce: it needs the coordination layer that turns these assets into a connected industrial system.",
    },
    signatureDeals: [
      {
        name: "Rail Corridor Harmonization Lab",
        duration: "5 days",
        focus: "Designing interoperable freight across fragmented rail systems",
        inclusions: ["Gauge mapping", "Containerization protocol", "Scheduling optimization", "Border crossing redesign"],
      },
      {
        name: "Energy-Resilient Manufacturing Sprint",
        duration: "6 days",
        focus: "Building manufacturing systems that survive load-shedding",
        inclusions: ["Micro-grid architecture", "Battery storage integration", "Demand response design", "Off-grid production protocols"],
      },
      {
        name: "Mining-to-Agri Skills Transfer",
        duration: "4 days",
        focus: "Transitioning mining communities to agricultural and technical skills",
        inclusions: ["Skills audit", "Training curriculum design", "Apprenticeship matching", "Cooperative formation"],
      },
      {
        name: "Currency Flow Optimization",
        duration: "3 days",
        focus: "Cross-border settlement for six-currency trade corridors",
        inclusions: ["Currency corridor mapping", "Settlement architecture", "FX risk hedging", "Central bank engagement"],
      },
    ],
    culturalWeaving: {
      commonsFeast: "Southern African staples: sadza (maize porridge), biltong, morogo (wild greens), chibuku (sorghum beer). The food of miners and farmers, high-energy, no-waste, communal. Eaten with hands, shared without counting.",
      heritageWalk: "Great Zimbabwe → Copperbelt. From the stone walls that moved gold without a single colonial charter, to the copper mines that powered empires they never owned. Two monuments to African industry: separated by 800 years, connected by the same subterranean wealth.",
      ritualClosing: "Stone stacking ceremony: each participant places a stone from their journey on a growing cairn. The cairn is both landmark and covenant: we were here, we built, we return.",
    },
    keyCities: [
      { name: "Harare", lat: -17.8, lng: 31.0, description: "Zimbabwe's capital: agricultural trade and tech emergence" },
      { name: "Lusaka", lat: -15.4, lng: 28.3, description: "Zambia's commercial center: Copperbelt logistics hub" },
      { name: "Luanda", lat: -8.8, lng: 13.2, description: "Angola's oil capital: Portuguese-speaking gateway" },
      { name: "Livingstone", lat: -17.8, lng: 25.9, description: "Victoria Falls: tourism and energy infrastructure" },
      { name: "Bulawayo", lat: -20.2, lng: 28.6, description: "Zimbabwe's second city: rail heritage and industrial base" },
    ],
    sampleSchedule: {
      period: "August – September",
      keyHubs: "Harare → Lusaka → Livingstone → Bulawayo → Luanda",
      climateNote: "Cool dry season: highland clarity, optimal for surface transit",
    },
    color: "#99854D",
  },
  {
    id: "north-africa-global",
    name: "North Africa & Global Gateways",
    subtitle: "The Gateway Protocol",
    legNumber: 6,
    hubCount: 80,
    countries: ["Egypt", "Morocco", "Algeria", "Tunisia", "+ 19 global jurisdictions"],
    coreGeography: "Mediterranean littoral and global diaspora network: from Cairo to Casablanca to 19 global hub cities",
    historicalAnchor: "Mediterranean trade; Silk Road terminus. Carthage controlled the western Mediterranean before Rome existed. Alexandria's library drew scholars from three continents. The Barbary corsairs made Algiers a maritime power. North Africa has always been a gateway: not a periphery.",
    primaryFlow: "Energy transit, maritime logistics, diaspora capital",
    coreFlows: {
      goods: "Energy (solar, natural gas), maritime freight, manufactured goods",
      capital: "Diaspora remittances, national investment funds, development finance, trade finance",
      data: "Regulatory data, maritime tracking, energy grid data, financial intelligence",
      people: "Diaspora networks, regulatory experts, maritime operators, energy engineers",
    },
    friction: [
      "Geopolitical volatility: active conflict zones and sanctions regimes",
      "Regulatory divergence: 20+ jurisdictions with incompatible frameworks",
      "Brain drain: top talent emigrating to Gulf, Europe, and North America",
      "Data independence, contested digital governance across jurisdictions",
    ],
    routeDealThesis: {
      title: "The Gateway Protocol",
      description: "Independent data routing that respects jurisdictional boundaries while enabling cross-border flow. Regulatory harmonization across 20+ jurisdictions through technology, not treaties. The Gateway Protocol is not political integration: it is technical interoperability that makes political difference manageable.",
    },
    signatureDeals: [
      {
        name: "Independent Data Routing Lab",
        duration: "5 days",
        focus: "Building data flow architecture that respects jurisdictional boundaries",
        inclusions: ["Data independence mapping", "Routing protocol design", "Encryption architecture", "Compliance automation"],
      },
      {
        name: "Regulatory Harmonization Sprint",
        duration: "6 days",
        focus: "Technical interoperability across 20+ regulatory frameworks",
        inclusions: ["Regulatory database construction", "Translation layer design", "Compliance API architecture", "Jurisdiction comparison tools"],
      },
      {
        name: "Reverse Diaspora Investment Pact",
        duration: "4 days",
        focus: "Channeling diaspora capital into structured investment vehicles",
        inclusions: ["Diaspora network mapping", "Investment vehicle design", "Repatriation tax optimization", "Trust structure engineering"],
      },
      {
        name: "Maritime Logistics Optimization",
        duration: "7 days",
        focus: "End-to-end maritime logistics from Mediterranean to global ports",
        inclusions: ["Port operations audit", "Vessel tracking integration", "Customs pre-clearance design", "Last-mile coordination"],
      },
    ],
    culturalWeaving: {
      commonsFeast: "Mediterranean-North African fusion: couscous, tagine, b'stilla, mint tea, pastilla. The food of a coast that has absorbed Phoenician, Roman, Arab, Ottoman, and French influences over 3,000 years. Every dish is a treaty. Every spice route is a trade agreement.",
      heritageWalk: "Pyramids (Cairo) → Carthage (Tunis). From the last surviving wonder of the ancient world to the city that rivaled Rome. Two monuments to civilization's ambition: and its capacity for destruction.",
      ritualClosing: "Compass ceremony: each participant orients toward their next destination and declares their intention. Not a goodbye but a bearing. The compass is both tool and metaphor: we know where we're going because we know where we've been.",
    },
    keyCities: [
      { name: "Cairo", lat: 30.0, lng: 31.2, description: "20 million people: Africa's largest city and energy corridor" },
      { name: "Casablanca", lat: 33.6, lng: -7.6, description: "Morocco's economic engine: maritime and financial gateway" },
      { name: "Tunis", lat: 36.8, lng: 10.2, description: "Carthage's heir: Mediterranean trade and digital governance" },
      { name: "Dubai", lat: 25.2, lng: 55.3, description: "Global capital hub: diaspora investment and logistics" },
      { name: "London", lat: 51.5, lng: -0.1, description: "Financial gateway: capital markets and regulatory bridge" },
    ],
    sampleSchedule: {
      period: "December",
      keyHubs: "Cairo → Casablanca → Tunis → Dubai → London",
      climateNote: "Year-end capital window: optimal for deal flow and diaspora engagement",
    },
    color: "#FF6B2B",
  },
];

/* ── Aggregate Metrics ── */

export const routeMetrics = {
  legs: 6,
  hubs: 212,
  countries: 63,
};

/* ── Arc Pricing ── */

export interface ArcPricing {
  legId: string;
  pricePerPerson: number;
  solidarityRate: number;
  durationWeeks: number;
  scholarshipsPerDeparture: number;
  inclusions: string[];
}

export const arcPricing: ArcPricing[] = [
  {
    legId: "gulf-of-guinea",
    pricePerPerson: 3800,
    solidarityRate: 2800,
    durationWeeks: 8,
    scholarshipsPerDeparture: 3,
    inclusions: ["Port access credentials", "Market immersion program", "Mobile money API sandbox", "Local operator network access", "Shared workspace in 5 hubs", "Cultural weaving program", "Route deal sprint materials"],
  },
  {
    legId: "sahel-band",
    pricePerPerson: 4200,
    solidarityRate: 3100,
    durationWeeks: 7,
    scholarshipsPerDeparture: 4,
    inclusions: ["Desert transit logistics", "Mesh-network deployment kit", "Climate data independence tools", "Humanitarian corridor access", "Pastoral community immersion", "Heritage walk program", "Emergency protocol training"],
  },
  {
    legId: "east-african",
    pricePerPerson: 4500,
    solidarityRate: 3300,
    durationWeeks: 8,
    scholarshipsPerDeparture: 3,
    inclusions: ["Corridor API access", "M-Pesa integration sandbox", "Cross-border freight tracking", "Agricultural pricing data feed", "Indian Ocean port access", "Swahili cultural immersion", "Tech hub coworking in 5 cities"],
  },
  {
    legId: "central-african",
    pricePerPerson: 5200,
    solidarityRate: 3800,
    durationWeeks: 7,
    scholarshipsPerDeparture: 4,
    inclusions: ["River logistics coordination", "Mineral traceability toolkit", "Biodiversity data commons access", "Offline-first digital tools", "Rainforest immersion program", "Community research partnerships", "Emergency medical kit"],
  },
  {
    legId: "southern-arc",
    pricePerPerson: 5800,
    solidarityRate: 4200,
    durationWeeks: 8,
    scholarshipsPerDeparture: 2,
    inclusions: ["Rail corridor access pass", "Energy-resilient manufacturing lab", "Mining-to-agri transition program", "Multi-currency settlement tools", "Victoria Falls heritage experience", "Copperbelt industrial tour", "Skills transfer workshops"],
  },
  {
    legId: "north-africa-global",
    pricePerPerson: 7500,
    solidarityRate: 5500,
    durationWeeks: 10,
    scholarshipsPerDeparture: 2,
    inclusions: ["Independent data routing lab", "Regulatory harmonization toolkit", "Diaspora investment network access", "Maritime logistics optimization", "Mediterranean port authority access", "Global gateway connections", "Compass ceremony program", "Year-end deal flow acceleration"],
  },
];

export const fullRoutePricing = {
  pricePerPerson: 22000,
  solidarityRate: 16000,
  durationMonths: 12,
  inclusions: [
    "All 6 arcs, full circumnavigation",
    "Lifetime Xcitizen ledger access",
    "Xcitizen status and credential",
    "Custom route compass",
    "212 hub access credentials",
    "Complete route deal portfolio",
    "Cultural weaving across all 6 arcs",
    "Global operator network membership",
    "Hanseatic Commons IP access",
    "Alumni economic carry participation",
    "Emergency extraction protocol",
    "Post-route venture support (6 months)",
  ],
};

/* ── Map Location Data (calibrated for Newlab topographic map) ── */

export type LabelPos = "left" | "right";

export interface MapLocation {
  id: string;
  name: string;
  x: number;       // percentage from left – calibrated for Newlab map image
  y: number;       // percentage from top – calibrated for Newlab map image
  labelPos: LabelPos;
  legId: string;
  legNumber: number;
  legColor: string;
  description: string;
  countries: string[];
}

export const MAP_LOCATIONS: MapLocation[] = [
  // Leg 1 – Gulf of Guinea Arc
  { id: "lagos", name: "LAGOS", x: 48.3, y: 55.7, labelPos: "right", legId: "gulf-of-guinea", legNumber: 1, legColor: "#FF4D00", description: "Africa's commercial nerve center: 20M people, limitless velocity", countries: ["Nigeria", "Ghana", "Côte d'Ivoire", "Senegal", "Cameroon"] },
  { id: "accra", name: "ACCRA", x: 47.3, y: 56.3, labelPos: "right", legId: "gulf-of-guinea", legNumber: 1, legColor: "#FF4D00", description: "Stable gateway for West African fintech and creative industries", countries: ["Nigeria", "Ghana", "Côte d'Ivoire", "Senegal", "Cameroon"] },
  { id: "abidjan", name: "ABIDJAN", x: 46.3, y: 56.5, labelPos: "left", legId: "gulf-of-guinea", legNumber: 1, legColor: "#FF4D00", description: "Francophone hub: financial services and cocoa logistics", countries: ["Nigeria", "Ghana", "Côte d'Ivoire", "Senegal", "Cameroon"] },
  { id: "dakar", name: "DAKAR", x: 42.7, y: 50.5, labelPos: "left", legId: "gulf-of-guinea", legNumber: 1, legColor: "#FF4D00", description: "Westernmost point: maritime gateway and digital arts capital", countries: ["Nigeria", "Ghana", "Côte d'Ivoire", "Senegal", "Cameroon"] },
  { id: "douala", name: "DOUALA", x: 50.0, y: 57.3, labelPos: "right", legId: "gulf-of-guinea", legNumber: 1, legColor: "#FF4D00", description: "Central African port entry: bilingual trade corridor", countries: ["Nigeria", "Ghana", "Côte d'Ivoire", "Senegal", "Cameroon"] },
  // Leg 2 – Sahel Band
  { id: "bamako", name: "BAMAKO", x: 45.2, y: 51.8, labelPos: "left", legId: "sahel-band", legNumber: 2, legColor: "#E85D26", description: "Sahel's administrative anchor: music and gold", countries: ["Mali", "Burkina Faso", "Niger", "Chad", "Sudan"] },
  { id: "ouagadougou", name: "OUAGADOUGOU", x: 47.0, y: 52.0, labelPos: "right", legId: "sahel-band", legNumber: 2, legColor: "#E85D26", description: "Burkinabé cultural capital: artisan commerce and resistance", countries: ["Mali", "Burkina Faso", "Niger", "Chad", "Sudan"] },
  { id: "niamey", name: "NIAMEY", x: 48.0, y: 51.3, labelPos: "right", legId: "sahel-band", legNumber: 2, legColor: "#E85D26", description: "Niger River gateway: uranium and pastoral trade", countries: ["Mali", "Burkina Faso", "Niger", "Chad", "Sudan"] },
  { id: "ndjamena", name: "N'DJAMENA", x: 51.4, y: 52.2, labelPos: "right", legId: "sahel-band", legNumber: 2, legColor: "#E85D26", description: "Chad's crossroads: humanitarian logistics hub", countries: ["Mali", "Burkina Faso", "Niger", "Chad", "Sudan"] },
  { id: "timbuktu", name: "TIMBUKTU", x: 46.6, y: 49.2, labelPos: "left", legId: "sahel-band", legNumber: 2, legColor: "#E85D26", description: "The legendary city of knowledge: manuscripts and memory", countries: ["Mali", "Burkina Faso", "Niger", "Chad", "Sudan"] },
  // Leg 3 – East African Corridor
  { id: "nairobi", name: "NAIROBI", x: 57.3, y: 60.7, labelPos: "right", legId: "east-african", legNumber: 3, legColor: "#CC6B33", description: "East Africa's tech capital: M-Pesa, iHub, Silicon Savannah", countries: ["Kenya", "Tanzania", "Uganda", "Rwanda", "Burundi", "Eastern DRC"] },
  { id: "kigali", name: "KIGALI", x: 55.5, y: 61.0, labelPos: "left", legId: "east-african", legNumber: 3, legColor: "#CC6B33", description: "The clean protocol: governance innovation and ease-of-doing-business", countries: ["Kenya", "Tanzania", "Uganda", "Rwanda", "Burundi", "Eastern DRC"] },
  { id: "dar-es-salaam", name: "DAR ES SALAAM", x: 58.0, y: 64.2, labelPos: "right", legId: "east-african", legNumber: 3, legColor: "#CC6B33", description: "Indian Ocean port: freight gateway to the interior", countries: ["Kenya", "Tanzania", "Uganda", "Rwanda", "Burundi", "Eastern DRC"] },
  { id: "kampala", name: "KAMPALA", x: 56.2, y: 59.6, labelPos: "left", legId: "east-african", legNumber: 3, legColor: "#CC6B33", description: "Lake Victoria hub: mobile money and agricultural trade", countries: ["Kenya", "Tanzania", "Uganda", "Rwanda", "Burundi", "Eastern DRC"] },
  { id: "mombasa", name: "MOMBASA", x: 58.1, y: 62.4, labelPos: "right", legId: "east-african", legNumber: 3, legColor: "#CC6B33", description: "Ancient port city: the Northern Corridor's maritime terminus", countries: ["Kenya", "Tanzania", "Uganda", "Rwanda", "Burundi", "Eastern DRC"] },
  // Leg 4 – Central African Heartland
  { id: "kinshasa", name: "KINSHASA", x: 51.5, y: 62.6, labelPos: "left", legId: "central-african", legNumber: 4, legColor: "#B37840", description: "17 million people: the largest francophone city on Earth", countries: ["DRC", "Cameroon", "Gabon", "Congo", "CAR"] },
  { id: "lubumbashi", name: "LUBUMBASHI", x: 54.8, y: 67.3, labelPos: "right", legId: "central-african", legNumber: 4, legColor: "#B37840", description: "Copperbelt capital: mineral processing and export", countries: ["DRC", "Cameroon", "Gabon", "Congo", "CAR"] },
  { id: "douala-cam", name: "DOUALA", x: 50.0, y: 57.3, labelPos: "left", legId: "central-african", legNumber: 4, legColor: "#B37840", description: "Atlantic port: the River Stack's maritime gateway", countries: ["DRC", "Cameroon", "Gabon", "Congo", "CAR"] },
  { id: "brazzaville", name: "BRAZZAVILLE", x: 51.6, y: 62.6, labelPos: "right", legId: "central-african", legNumber: 4, legColor: "#B37840", description: "Pool Malebo: twin city to Kinshasa across the river", countries: ["DRC", "Cameroon", "Gabon", "Congo", "CAR"] },
  { id: "yaounde", name: "YAOUNDÉ", x: 50.5, y: 57.4, labelPos: "right", legId: "central-african", legNumber: 4, legColor: "#B37840", description: "Cameroon's administrative capital: bilingual bridge", countries: ["DRC", "Cameroon", "Gabon", "Congo", "CAR"] },
  // Leg 5 – Southern Arc
  { id: "harare", name: "HARARE", x: 55.7, y: 71.1, labelPos: "right", legId: "southern-arc", legNumber: 5, legColor: "#99854D", description: "Zimbabwe's capital: agricultural trade and tech emergence", countries: ["Zimbabwe", "Zambia", "Angola", "Lesotho", "Eswatini", "Malawi"] },
  { id: "lusaka", name: "LUSAKA", x: 55.0, y: 69.6, labelPos: "left", legId: "southern-arc", legNumber: 5, legColor: "#99854D", description: "Zambia's commercial center: Copperbelt logistics hub", countries: ["Zimbabwe", "Zambia", "Angola", "Lesotho", "Eswatini", "Malawi"] },
  { id: "luanda", name: "LUANDA", x: 50.9, y: 65.4, labelPos: "left", legId: "southern-arc", legNumber: 5, legColor: "#99854D", description: "Angola's oil capital: Portuguese-speaking gateway", countries: ["Zimbabwe", "Zambia", "Angola", "Lesotho", "Eswatini", "Malawi"] },
  { id: "livingstone", name: "LIVINGSTONE", x: 54.4, y: 71.1, labelPos: "left", legId: "southern-arc", legNumber: 5, legColor: "#99854D", description: "Victoria Falls: tourism and energy infrastructure", countries: ["Zimbabwe", "Zambia", "Angola", "Lesotho", "Eswatini", "Malawi"] },
  { id: "bulawayo", name: "BULAWAYO", x: 55.1, y: 72.7, labelPos: "right", legId: "southern-arc", legNumber: 5, legColor: "#99854D", description: "Zimbabwe's second city: rail heritage and industrial base", countries: ["Zimbabwe", "Zambia", "Angola", "Lesotho", "Eswatini", "Malawi"] },
  // Leg 6 – North Africa & Global Gateways
  { id: "cairo", name: "CAIRO", x: 55.8, y: 40.8, labelPos: "right", legId: "north-africa-global", legNumber: 6, legColor: "#FF6B2B", description: "20 million people: Africa's largest city and energy corridor", countries: ["Egypt", "Morocco", "Algeria", "Tunisia", "+ 19 global jurisdictions"] },
  { id: "casablanca", name: "CASABLANCA", x: 45.3, y: 38.5, labelPos: "left", legId: "north-africa-global", legNumber: 6, legColor: "#FF6B2B", description: "Morocco's economic engine: maritime and financial gateway", countries: ["Egypt", "Morocco", "Algeria", "Tunisia", "+ 19 global jurisdictions"] },
  { id: "tunis", name: "TUNIS", x: 50.1, y: 36.5, labelPos: "right", legId: "north-africa-global", legNumber: 6, legColor: "#FF6B2B", description: "Carthage's heir: Mediterranean trade and digital governance", countries: ["Egypt", "Morocco", "Algeria", "Tunisia", "+ 19 global jurisdictions"] },
  { id: "dubai", name: "DUBAI", x: 62.3, y: 43.9, labelPos: "right", legId: "north-africa-global", legNumber: 6, legColor: "#FF6B2B", description: "Global capital hub: diaspora investment and logistics", countries: ["Egypt", "Morocco", "Algeria", "Tunisia", "+ 19 global jurisdictions"] },
  { id: "london", name: "LONDON", x: 47.4, y: 27.2, labelPos: "right", legId: "north-africa-global", legNumber: 6, legColor: "#FF6B2B", description: "Financial gateway: capital markets and regulatory bridge", countries: ["Egypt", "Morocco", "Algeria", "Tunisia", "+ 19 global jurisdictions"] },
];

/* ── Arc Image Paths ── */

export const arcImages: Record<string, string[]> = {
  "gulf-of-guinea": [
    "/routes/gulf-of-guinea-1.png",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1553729459-uj9p7pk3e2l?auto=format&fit=crop&w=600&q=80",
  ],
  "sahel-band": [
    "/routes/sahel-1.png",
    "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=600&q=80",
  ],
  "east-african": [
    "/routes/east-african-1.png",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
  ],
  "central-african": [
    "/routes/central-african-1.png",
    "https://images.unsplash.com/photo-1565792323902-486ad4b6a110?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
  ],
  "southern-arc": [
    "/routes/southern-arc-1.png",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1565792323902-486ad4b6a110?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
  ],
  "north-africa-global": [
    "/routes/north-africa-1.png",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=600&q=80",
  ],
};
