export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface ValueItem {
  title: string;
  copy: string;
}

export interface TimelineItem {
  year: string;
  copy: string;
}

export interface LeadershipMember {
  name: string;
  role: string;
  photo: string;
}

export interface Service {
  slug: string;
  title: string;
  summary: string;
  detail: string;
}

export type ProjectCategory =
  | "residential"
  | "commercial"
  | "industrial"
  | "infrastructure"
  | "government";

export interface Project {
  slug: string;
  name: string;
  loc: string;
  cat: ProjectCategory;
  img: string;
  client: string;
  completed: string;
  area: string;
  technologies: string[];
  description: string;
  gallery: string[];
}

export type WhyChoiceItem = [title: string, copy: string];

export interface SustainabilityItem {
  title: string;
  copy: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  photo: string;
}

export interface NewsArticle {
  slug: string;
  cat: string;
  title: string;
  date: string;
  img: string;
  excerpt: string;
  body: string[];
}

export interface OpenRole {
  title: string;
  loc: string;
  type: string;
  dept: string;
}

export interface OfficeLocation {
  city: string;
  address: string;
  phone: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Miorah", href: "/miorah" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  // { label: "Industries", href: "/industries" },
  { label: "Contact", href: "/contact" },
];

export const stats: Stat[] = [
  { value: 240, suffix: "+", label: "Projects Completed" },
  { value: 18, suffix: "+", label: "Years of Experience" },
  { value: 190, suffix: "+", label: "Happy Clients" },
  { value: 320, suffix: "+", label: "Engineers on Team" },
  { value: 26, suffix: "+", label: "Cities Served" },
  { value: 14, suffix: "M", label: "Sq. Ft. Constructed" },
];

export const values: ValueItem[] = [
  { title: "Mission", copy: "To engineer resilient, high-performance spaces that shape the cities of tomorrow." },
  { title: "Vision", copy: "To be the region's most trusted name in construction and infrastructure delivery." },
  { title: "Core Values", copy: "Integrity, precision, safety, and sustainability guide every decision we make." },
  { title: "Approach", copy: "Design-led thinking paired with disciplined project management and execution." },
];

export interface TimelineItem {
  year: string;
  title: string;
  copy: string;
}

export const timeline: TimelineItem[] = [
  { year: "2008", title: "Foundation", copy: "SriZen Group founded in Hyderabad with a single civil engineering contract." },
  { year: "2013", title: "Commercial Expansion", copy: "Expanded into commercial construction, delivering our first Grade-A office park." },
  { year: "2017", title: "MEP Division Launch", copy: "Launched an in-house MEP and design division, enabling turnkey delivery." },
  { year: "2020", title: "100-Project Milestone", copy: "Crossed 100 completed projects; opened offices in Mumbai and Bengaluru." },
  { year: "2023", title: "Infrastructure Entry", copy: "Entered infrastructure and government sectors with our first bridge contract." },
  { year: "2026", title: "National Scale", copy: "320+ engineers, 240+ projects delivered across 26 cities." },
];

export const leadership: LeadershipMember[] = [
  { name: "Arvind Krishnan", role: "Founder & CEO", photo: "https://randomuser.me/api/portraits/men/52.jpg" },
  { name: "Meera Sundaram", role: "Chief Engineering Officer", photo: "https://randomuser.me/api/portraits/women/68.jpg" },
  { name: "Rohan Deshpande", role: "Chief Operating Officer", photo: "https://randomuser.me/api/portraits/men/41.jpg" },
  { name: "Fatima Sheikh", role: "Head of Sustainability", photo: "https://randomuser.me/api/portraits/women/22.jpg" },
];

export const services: Service[] = [
  {
    slug: "residential-construction",
    title: "Residential Construction",
    summary: "End-to-end delivery of premium residential towers and communities.",
    detail: "We design and build residential developments — from boutique low-rise communities to large-scale towers — engineered for comfort, safety, and long-term value.",
  },
  {
    slug: "commercial-buildings",
    title: "Commercial Buildings",
    summary: "Grade-A office parks and mixed-use commercial developments.",
    detail: "Our commercial portfolio spans corporate campuses, retail centers, and mixed-use developments built to Grade-A specification and international leasing standards.",
  },
  {
    slug: "industrial-projects",
    title: "Industrial Projects",
    summary: "Purpose-built industrial and manufacturing facilities at scale.",
    detail: "We deliver manufacturing plants, warehouses, and logistics facilities engineered around operational efficiency and heavy-load requirements.",
  },
  {
    slug: "infrastructure-development",
    title: "Infrastructure Development",
    summary: "Roads, bridges, and public infrastructure engineered to last.",
    detail: "From highways to bridges to public utilities, our infrastructure practice builds the systems that keep cities and regions moving.",
  },
  {
    slug: "turnkey-projects",
    title: "Turnkey Projects",
    summary: "Single-point accountability from concept through commissioning.",
    detail: "One contract, one accountable partner — we manage design, procurement, and construction under a single turnkey engagement.",
  },
  {
    slug: "civil-engineering",
    title: "Civil Engineering",
    summary: "Structural design and civil works backed by rigorous analysis.",
    detail: "Our in-house civil engineering team leads structural analysis, foundation design, and site engineering for every project we deliver.",
  },
  {
    slug: "mep-services",
    title: "MEP Services",
    summary: "Integrated mechanical, electrical and plumbing engineering.",
    detail: "Fully coordinated mechanical, electrical, and plumbing design and installation, integrated from the earliest design stage.",
  },
  {
    slug: "interior-fit-outs",
    title: "Interior Fit-Outs",
    summary: "Bespoke interior build-outs for commercial and residential spaces.",
    detail: "From corporate offices to luxury residences, our fit-out teams deliver refined interiors on tight, predictable timelines.",
  },
  {
    slug: "renovation",
    title: "Renovation",
    summary: "Structural upgrades and modernization of existing assets.",
    detail: "We extend the life and performance of existing buildings through structural retrofits, MEP upgrades, and full modernization.",
  },
  {
    slug: "design-and-build",
    title: "Design & Build",
    summary: "Unified design and construction delivery under one roof.",
    detail: "Our design-and-build model removes the friction between architecture and execution, keeping design intent intact through to handover.",
  },
  {
    slug: "consultancy",
    title: "Consultancy",
    summary: "Feasibility, planning and technical advisory services.",
    detail: "We advise developers and asset owners on feasibility, cost planning, and technical due diligence ahead of ground-breaking.",
  },
  {
    slug: "project-management",
    title: "Project Management",
    summary: "Schedule, cost and quality control across every phase.",
    detail: "Dedicated project managers track schedule, budget, and quality benchmarks across every phase of delivery, with transparent client reporting.",
  },
];

// ---------------------------------------------------------------------------
// Projects — sourced from the three project brochures (Golden Rise, Park Edge,
// Balaji Avenues). Images live directly under public/<slug>/ — e.g.
// D:\srizen-group\public\golden-rise\hero.jpg — matching the `img` / `gallery`
// paths below (/golden-rise/hero.jpg etc.), which next/image resolves as-is.
// ---------------------------------------------------------------------------

export const projects: Project[] = [
  {
    slug: "golden-rise",
    name: "Golden Rise",
    loc: "Peerzadiguda, Uppal, Hyderabad",
    cat: "residential",
    img: "/golden-rise/hero.jpg",
    client: "Fuzen Group Infra Projects (Bandi Jangaiah)",
    completed: "HMDA Approved · TG RERA P02200007793",
    area: "2 & 3 BHK · 1265 – 2155 sq. ft.",
    technologies: [
      "100% Vastu-compliant layouts",
      "24x7 power backup for all flats",
      "Rainwater harvesting & solar fencing",
      "Round-the-clock CCTV surveillance",
    ],
    description: "A 2 & 3 BHK community apartment development in Peerzadiguda, Uppal, just 300 meters from the Warangal Highway and minutes from Uppal Metro Station, Infosys and the Outer Ring Road. Golden Rise pairs a 6'6\" wide-corridor layout with 15+ amenities including a children's play area, terrace garden and yoga deck, and a mini multipurpose hall.",
    gallery: [
      "/golden-rise/hero.jpg",
      "/golden-rise/gallery-1.jpg",
      "/golden-rise/gallery-2.jpg",
    ],
  },
  {
    slug: "park-edge",
    name: "Park Edge",
    loc: "Chengicherla, Uppal, Hyderabad",
    cat: "residential",
    img: "/park-edge/hero.jpg",
    client: "Fuzen Group Infra Projects",
    completed: "HMDA Approved · TSRERA P02200007319",
    area: "2 & 3 BHK Premium Gated Community",
    technologies: [
      "Sky pool & sky-scaped upper deck lounge",
      "Skating rink & open amphitheatre",
      "Half basketball court & shuttle court",
      "24x7 power backup, security & mobile visitor app",
    ],
    description: "A premium gated community adjacent to the 120-acre Shanti Vanam Park in Chengicherla, Uppal. Park Edge is built around a high-end sky pool and recreation deck, with 25+ amenities spanning a grand multipurpose hall, spacious gym, guest rooms, and landscaped children's play and outdoor games areas — close to Infosys, Raheja Mindspace and the Outer Ring Road.",
    gallery: [
      "/park-edge/hero.jpg",
      "/park-edge/gallery-1.jpg",
      "/park-edge/gallery-2.jpg",
      "/park-edge/gallery-3.jpg",
    ],
  },
  {
    slug: "balaji-avenues",
    name: "Balaji Avenues",
    loc: "Peerzadiguda, Uppal, Hyderabad",
    cat: "residential",
    img: "/balaji-avenues/hero.jpg",
    client: "Sunrise Builders and Developers",
    completed: "TS RERA Approved (Block A: P02200003137 · Block B: P02200003187)",
    area: "120 Premium Flats · 1.6 Acres · G+5, Blocks A & B",
    technologies: [
      "RCC structure, Grade Fe550 steel & M25 concrete",
      "Teakwood main doors, UPVC French doors & windows",
      "Concealed copper wiring with modular switches",
      "Rainwater harvesting & acoustic-enclosed generator backup",
    ],
    description: "A 120-flat, two-block premium apartment community set on 1.6 acres beside Bandi Gardens in Peerzadiguda, Uppal, from Sunrise Builders and Developers. Balaji Avenues offers 100% Vastu-compliant 2 & 3 BHK layouts across Block A and Block B, with 24x7 security, a cricket practice net, and dedicated children's play areas, just minutes from Uppal Metro Station and the Outer Ring Road.",
    gallery: [
      "/balaji-avenues/hero.jpg",
      "/balaji-avenues/gallery-1.jpg",
      "/balaji-avenues/gallery-2.jpg",
      "/balaji-avenues/gallery-3.jpg",
    ],
  },
];

// projectFilters is DERIVED from the actual projects above — not hardcoded.
// This guarantees the filter list can never show a category with zero
// matching projects. Right now every project is "residential", so this
// evaluates to just ["residential"] (no "all", since there's nothing else
// to filter against). The moment a second category is added to `projects`,
// this automatically becomes ["all", "residential", "<new category>"].
const usedProjectCategories = Array.from(
  new Set(projects.map((p) => p.cat))
) as ProjectCategory[];

export const projectFilters: Array<"all" | ProjectCategory> =
  usedProjectCategories.length > 1
    ? ["all", ...usedProjectCategories]
    : usedProjectCategories;

export const industries: string[] = [
  "Residential",
  "Commercial",
  "Healthcare",
  "Hospitality",
  "Education",
  "Manufacturing",
  "Government",
  "Infrastructure",
  "Energy",
  "Warehousing",
];

export const whyChoose: WhyChoiceItem[] = [
  ["Engineering Excellence", "Every project is backed by rigorous structural and civil engineering standards."],
  ["Quality Assurance", "Multi-stage inspections ensure consistent, verifiable build quality."],
  ["Experienced Workforce", "Hundreds of certified engineers, architects and site professionals."],
  ["Modern Equipment", "Advanced machinery and construction technology across all sites."],
  ["Safety Standards", "Zero-compromise safety protocols on every active site."],
  ["Timely Delivery", "Disciplined scheduling keeps projects on time, every time."],
  ["Transparent Communication", "Real-time reporting keeps clients informed at every milestone."],
  ["Sustainable Construction", "Environmentally responsible materials and methods by default."],
];

export const process: string[] = [
  "Consultation",
  "Planning",
  "Design",
  "Engineering",
  "Construction",
  "Inspection",
  "Delivery",
  "Support",
];

export const sustainability: string[] = [
  "Eco-Friendly Construction",
  "Energy Efficiency",
  "Water Conservation",
  "Waste Management",
  "Green Building Materials",
  "Carbon Reduction",
];

export const sustainabilityDetail: SustainabilityItem[] = [
  { title: "Eco-Friendly Construction", copy: "Low-impact building methods and responsibly sourced materials on every site." },
  { title: "Energy Efficiency", copy: "High-performance building envelopes and systems that cut long-term operating energy." },
  { title: "Water Conservation", copy: "Rainwater harvesting and greywater recycling built into site design by default." },
  { title: "Waste Management", copy: "Construction waste segregation and recycling programs across all active sites." },
  { title: "Green Building Materials", copy: "Preference for low-carbon concrete, recycled steel, and certified timber." },
  { title: "Carbon Reduction", copy: "Embodied-carbon tracking from design stage through to project completion." },
];

export const testimonials: Testimonial[] = [
  {
    quote: "SriZen Group delivered our commercial campus three weeks ahead of schedule without a single compromise on quality.",
    name: "Ramesh Iyer",
    role: "VP Development, Orion Realty",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    quote: "Their engineering team caught structural risks early and re-designed around them seamlessly — true partners, not just contractors.",
    name: "Ananya Rao",
    role: "Director, Vantage Logistics",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    quote: "From consultation to handover, communication was transparent at every milestone. That's rare in this industry.",
    name: "Karan Mehta",
    role: "CEO, Coastal Infra Co.",
    photo: "https://randomuser.me/api/portraits/men/65.jpg",
  },
];

export const partners: string[] = ["ARKON", "NOVATECH", "BUILDCORE", "METRIX", "STRATA", "VOLTRA", "GRANDIS", "URBANIX"];

export const news: NewsArticle[] = [
  {
    slug: "coastal-ring-bridge-groundbreaking",
    cat: "Company",
    title: "SriZen Group breaks ground on Coastal Ring Bridge project",
    date: "June 18, 2026",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Construction begins on the 2.8km cable-stayed bridge connecting Visakhapatnam's northern and southern ring roads.",
    body: [
      "SriZen Group has officially broken ground on the Coastal Ring Bridge, a 2.8km cable-stayed structure commissioned by the Andhra Pradesh Infrastructure Board to connect the city's northern and southern ring roads.",
      "The project marks SriZen's largest infrastructure commission to date and will draw on the firm's marine foundation engineering expertise, developed over more than a decade of coastal and riverfront projects.",
      "Construction is expected to take 30 months, with the structural design incorporating seismic damping systems and wind-load engineering suited to the region's cyclonic conditions.",
    ],
  },
  {
    slug: "cutting-embodied-carbon",
    cat: "Sustainability",
    title: "How SriZen Group is cutting embodied carbon across sites",
    date: "May 27, 2026",
    img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1000&auto=format&fit=crop",
    excerpt: "A look inside our embodied-carbon tracking program and the material choices driving it.",
    body: [
      "Embodied carbon — the emissions associated with materials and construction, as opposed to a building's operational energy use — is one of the least visible but most significant levers in sustainable construction.",
      "Over the past two years, SriZen Group has rolled out embodied-carbon tracking from the design stage through to project completion, giving clients visibility into material choices and their climate impact before ground is broken.",
      "Low-carbon concrete mixes, recycled steel, and certified timber are now default specifications across new residential and commercial projects, with early results showing measurable reductions in project-level emissions.",
    ],
  },
  {
    slug: "infrastructure-trends-2026",
    cat: "Insights",
    title: "5 trends shaping infrastructure development in 2026",
    date: "May 4, 2026",
    img: "https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=1000&auto=format&fit=crop",
    excerpt: "From modular construction to climate-resilient design, the forces reshaping how infrastructure gets built.",
    body: [
      "Infrastructure development in 2026 is being shaped by a handful of converging forces: tighter public budgets, climate-resilience requirements, and a growing shift toward modular and precast construction methods.",
      "Modular and precast segmental construction — used on SriZen's own Riverfront Metro Line project — continues to gain ground as a way to compress schedules and reduce disruption in dense urban environments.",
      "Meanwhile, climate-resilient design is moving from a specialty requirement to a baseline expectation, particularly for coastal and flood-prone infrastructure projects across the region.",
    ],
  },
];

export const openRoles: OpenRole[] = [
  { title: "Senior Structural Engineer", loc: "Hyderabad", type: "Full-time", dept: "Engineering" },
  { title: "Project Manager — Infrastructure", loc: "Mumbai", type: "Full-time", dept: "Project Management" },
  { title: "MEP Design Lead", loc: "Bengaluru", type: "Full-time", dept: "Design" },
  { title: "Site Safety Officer", loc: "Chennai", type: "Full-time", dept: "Safety & Compliance" },
  { title: "Quantity Surveyor", loc: "Pune", type: "Full-time", dept: "Commercial" },
  { title: "BIM Coordinator", loc: "Hyderabad", type: "Full-time", dept: "Design" },
];

export const officeLocations: OfficeLocation[] = [
  { city: "Hyderabad (HQ)", address: "SriZen Towers, HITEC City, Telangana 500081", phone: "+917012345555" },
];