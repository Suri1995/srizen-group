// app/projects/miorah/data.ts
import {
  Waves,
  Baby,
  Dumbbell,
  Flower2,
  TreePine,
  Users,
  Trophy,
  Footprints,
  Sun,
  ShieldCheck,
  Milestone,
  Music2,
  Sparkles,
  Armchair,
  Snowflake,
  CircleDot,
  Ruler,
  Building2,
  Clapperboard,
  Home as HomeIcon,
} from "lucide-react";

export const villaSpecs = [
  { key: "Type 14", sqyds: "153", facing: "West Facing", tag: "Entry Triplex" },
  { key: "Type 16", sqyds: "220", facing: "West Facing", tag: "Comfort Triplex" },
  { key: "Type 17", sqyds: "253", facing: "West Facing", tag: "Family Triplex" },
  { key: "Type 13", sqyds: "255", facing: "East Facing", tag: "Prime Triplex" },
  { key: "Type 18", sqyds: "321", facing: "East Facing", tag: "Grand Triplex" },
  { key: "Type 12", sqyds: "472", facing: "East Facing", tag: "Signature Triplex" },
] as const;

export const whyChoose = [
  { icon: Ruler, title: "220 & 230 Sq. Yards", desc: "Generously plotted homesites designed for privacy on every side." },
  { icon: Building2, title: "Triplex Design", desc: "G+2 villas with dedicated floors for living, family and retreat." },
  { icon: Clapperboard, title: "Private Theatre Room", desc: "A built-in home theatre — a rare inclusion at this scale." },
  { icon: HomeIcon, title: "Modern Architecture", desc: "Contemporary facades with clean lines and abundant natural light." },
  { icon: Sparkles, title: "Premium Interior Layout", desc: "Thoughtful floor plans that maximise space, light and airflow." },
];

export const highlights = [
  "Premium Luxury Gated Community",
  "7 Acres of Prime Development",
  "81 Exclusive Triplex Villas",
  "Spacious G+2 Villas with Theatre Room",
  "10,000 SFT Grand Clubhouse",
  "World-Class Lifestyle Amenities",
  "40ft Access Road & 100ft Proposed Road",
];

export const connectivity = [
  { label: "Warangal Highway", note: "Direct, easy access" },
  { label: "Uppal Metro Station", note: "Seamless city connectivity" },
  { label: "Cherlapally Railway Station", note: "Convenient travel access" },
  { label: "ORR Exit No. 7", note: "Quick access to Outer Ring Road" },
  { label: "Pocharam IT SEZ", note: "Minutes from major IT & business hubs" },
  { label: "International Schools", note: "Meridian, SAGES & more nearby" },
  { label: "Hospitals & Retail", note: "Healthcare, shopping & entertainment" },
];

export const amenities = [
  { icon: Waves, label: "Main Swimming Pool" },
  { icon: Baby, label: "Kids Swimming Pool" },
  { icon: Dumbbell, label: "Outdoor Gym" },
  { icon: Flower2, label: "Butterfly Garden" },
  { icon: TreePine, label: "Landscaped Lawns" },
  { icon: Users, label: "Open Amphitheatre" },
  { icon: Trophy, label: "Multipurpose Court" },
  { icon: Footprints, label: "Yoga & Meditation Deck" },
  { icon: Sun, label: "Barbeque Deck & Pergola" },
  { icon: ShieldCheck, label: "24/7 Gated Security" },
  { icon: Milestone, label: "Wooden Bridge Walkway" },
  { icon: Music2, label: "Party Lawn & Stage" },
  { icon: Sparkles, label: "Kids Play Area" },
  { icon: Armchair, label: "Senior Citizen Plaza" },
  { icon: Snowflake, label: "Skating Rink" },
  { icon: CircleDot, label: "Pickleball & Badminton Courts" },
];

export const floorPlans = [
  {
    type: "Type 14",
    sqyds: "153",
    facing: "West Facing",
    pdf: "/floorplans/type14-153sqyds-west-facing.pdf",
    floors: [
      { key: "ground", name: "Ground Floor", image: "/floorplans/type14-ground.jpg" },
      { key: "first", name: "First Floor", image: "/floorplans/type14-first.jpg" },
      { key: "second", name: "Second Floor", image: "/floorplans/type14-second.jpg" },
    ],
  },
  {
    type: "Type 16",
    sqyds: "220",
    facing: "West Facing",
    pdf: "/floorplans/type16-220sqyds-west-facing.pdf",
    floors: [
      { key: "ground", name: "Ground Floor", image: "/floorplans/type16-ground.jpg" },
      { key: "first", name: "First Floor", image: "/floorplans/type16-first.jpg" },
      { key: "second", name: "Second Floor", image: "/floorplans/type16-second.jpg" },
    ],
  },
  {
    type: "Type 17",
    sqyds: "253",
    facing: "West Facing",
    pdf: "/floorplans/type17-253sqyds-west-facing.pdf",
    floors: [
      { key: "ground", name: "Ground Floor", image: "/floorplans/type17-ground.jpg" },
      { key: "first", name: "First Floor", image: "/floorplans/type17-first.jpg" },
      { key: "second", name: "Second Floor", image: "/floorplans/type17-second.jpg" },
    ],
  },
  {
    type: "Type 13",
    sqyds: "255",
    facing: "East Facing",
    pdf: "/floorplans/type13-255sqyds-east-facing.pdf",
    floors: [
      { key: "ground", name: "Ground Floor", image: "/floorplans/type13-ground.jpg" },
      { key: "first", name: "First Floor", image: "/floorplans/type13-first.jpg" },
      { key: "second", name: "Second Floor", image: "/floorplans/type13-second.jpg" },
    ],
  },
  {
    type: "Type 18",
    sqyds: "321",
    facing: "East Facing",
    pdf: "/floorplans/type18-321sqyds-east-facing.pdf",
    floors: [
      { key: "ground", name: "Ground Floor", image: "/floorplans/type18-ground.jpg" },
      { key: "first", name: "First Floor", image: "/floorplans/type18-first.jpg" },
      { key: "second", name: "Second Floor", image: "/floorplans/type18-second.jpg" },
    ],
  },
  {
    type: "Type 12",
    sqyds: "472",
    facing: "East Facing",
    pdf: "/floorplans/type12-472sqyds-east-facing.pdf",
    floors: [
      { key: "ground", name: "Ground Floor", image: "/floorplans/type12-ground.jpg" },
      { key: "first", name: "First Floor", image: "/floorplans/type12-first.jpg" },
      { key: "second", name: "Second Floor", image: "/floorplans/type12-second.jpg" },
    ],
  },
] as const;

export const galleryCategories = [
  "All",
  "Exteriors",
  "Clubhouse",
  "Amenities",
  "Interiors",
  "Construction",
] as const;
 
export const galleryImages = [
  {
    category: "Exteriors",
    src: "/gallery/exterior-aerial.svg", // Wide aerial/drone shot of the villa rows + clubhouse
    alt: "Aerial view of MIORAH villa community",
    span: "col-span-2 row-span-2",
  },
  {
    category: "Exteriors",
    src: "/gallery/entrance-gate.svg", // Main entrance gate / arch, dusk lighting
    alt: "MIORAH main entrance gate",
    span: "col-span-1 row-span-1",
  },
  {
    category: "Exteriors",
    src: "/gallery/villa-row-facade.svg", // Street-level shot of a row of villa facades
    alt: "Row of triplex villa facades",
    span: "col-span-1 row-span-2",
  },
  {
    category: "Clubhouse",
    src: "/gallery/clubhouse-lounge.svg", // Clubhouse interior lounge / reception area
    alt: "Clubhouse lounge interior",
    span: "col-span-2 row-span-1",
  },
  {
    category: "Amenities",
    src: "/gallery/pool-deck.svg", // Swimming pool deck, daytime
    alt: "Swimming pool deck",
    span: "col-span-1 row-span-1",
  },
  {
    category: "Amenities",
    src: "/gallery/kids-play-area.svg", // Kids play area with equipment
    alt: "Kids play area",
    span: "col-span-1 row-span-1",
  },
  {
    category: "Exteriors",
    src: "/gallery/landscaped-walkway.svg", // Landscaped garden walkway between villas
    alt: "Landscaped garden walkway",
    span: "col-span-2 row-span-2",
  },
  {
    category: "Interiors",
    src: "/gallery/living-room.svg", // Living room interior, furnished
    alt: "Villa living room interior",
    span: "col-span-1 row-span-1",
  },
  {
    category: "Interiors",
    src: "/gallery/master-bedroom.svg", // Master bedroom interior
    alt: "Master bedroom interior",
    span: "col-span-1 row-span-2",
  },
  {
    category: "Interiors",
    src: "/gallery/home-theatre.svg", // Home theatre room set up with seating
    alt: "Private home theatre room",
    span: "col-span-2 row-span-1",
  },
  {
    category: "Amenities",
    src: "/gallery/gym-deck.svg", // Outdoor gym / fitness deck
    alt: "Outdoor gym and fitness deck",
    span: "col-span-1 row-span-1",
  },
  {
    category: "Construction",
    src: "/gallery/construction-progress.svg", // On-site construction progress photo
    alt: "Construction progress at the MIORAH site",
    span: "col-span-1 row-span-1",
  },
  {
    category: "Clubhouse",
    src: "/gallery/amphitheatre-lawn.svg", // Amphitheatre / party lawn area
    alt: "Amphitheatre and party lawn",
    span: "col-span-2 row-span-1",
  },
  {
    category: "Exteriors",
    src: "/gallery/villas-night-view.svg", // Night view of villas, lit facades
    alt: "MIORAH villas at night",
    span: "col-span-2 row-span-2",
  },
] as const;