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
  Grid3x3,
  Sofa,
  Gem,
  Palette,
  Home,
  Droplets,
  Ship,
  Leaf,
  Flower,
  Droplet,
  Trees,
  Sprout,
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

// All amenities from your list - 43 total
export const amenities = [
  // Outdoor & Garden (8)
  { icon: Grid3x3, label: "GRASS PAVERS" },
  { icon: Trees, label: "LAWN" },
  { icon: TreePine, label: "LAWN WITH STONE BAND" },
  { icon: Leaf, label: "PAVING WITH UNIQUE PLANT" },
  { icon: Grid3x3, label: "GRASS JOINTS" },
  { icon: Flower, label: "TRELLIS" },
  { icon: Sprout, label: "SANDPIT" },
  { icon: Flower2, label: "BUTTERFLY GARDEN" },
  
  // Deck & Pergola (5)
  { icon: Sofa, label: "DECK WITH PERGOLA" },
  { icon: Sun, label: "DECK WITH SEATING PERGOLA" },
  { icon: Sun, label: "BARBEQUE DECK WITH PERGOLA" },
  { icon: Ship, label: "FLOATING DECK WITH PERGOLA" },
  { icon: Milestone, label: "WOODEN BRIDGE WITH PERGOLA" },
  
  // Seating & Relaxation (7)
  { icon: Armchair, label: "SEATING WITH GRAVEL BED" },
  { icon: Sofa, label: "SEATING" },
  { icon: Sofa, label: "INFORMAL SEATING" },
  { icon: Sofa, label: "FAMILY SEATING" },
  { icon: TreePine, label: "SEATING WITH SPECIMEN PLANTATION" },
  { icon: Sparkles, label: "YOUNGER SEATING PLAZA" },
  { icon: Armchair, label: "SENIOR CITIZEN SEATING PLAZA WITH PERGOLA" },
  
  // Sports & Fitness (7)
  { icon: Trophy, label: "MULTIPURPOSE COURT" },
  { icon: Trophy, label: "1.BADMINTION COURT" },
  { icon: Trophy, label: "2.BOX CRICKET" },
  { icon: CircleDot, label: "PICKLE BALL COURT" },
  { icon: CircleDot, label: "BASKET BALL COURT WITH PICKLE BALL COURT" },
  { icon: Snowflake, label: "SKATING RINK" },
  { icon: Dumbbell, label: "OUT DOOR GYM" },
  
  // Water & Pool (7)
  { icon: Waves, label: "MAIN SWIMMING POOL" },
  { icon: Baby, label: "KIDS SWIMMING POOL" },
  { icon: Droplets, label: "WATER BODY" },
  { icon: Waves, label: "WATER BODY WITH SPOUTS" },
  { icon: Waves, label: "POOL DECK" },
  { icon: Droplet, label: "SHOWER" },
  { icon: Home, label: "CHANGING ROOMS" },
  
  // Social & Events (4)
  { icon: Users, label: "MINI GATHERING AREA" },
  { icon: Users, label: "OAT (OPEN AMPHITHEATER)" },
  { icon: Music2, label: "STAGE" },
  { icon: TreePine, label: "MEDITATION AREA WITH PARTY LAWN" },
  
  // Wellness (1)
  { icon: Footprints, label: "OUT DOOR YOGA AREA" },
  
  // Play & Kids (1)
  { icon: Sparkles, label: "KIDS PLAY AREA" },
  
  // Other (4)
  { icon: Gem, label: "SCREEN WALL WITH SCULPTURE" },
  { icon: Palette, label: "SCULPTURE WITH GRAVEL BED" },
  { icon: Footprints, label: "STEPPING STONES" },
  { icon: Milestone, label: "PATHWAY" },
];

export const floorPlans = [
  {
    type: "Type 1",
    sqyds: "203",
    facing: "West Facing",
    pdf: "/floorplans/type1-203sqyds-west-facing.pdf",
    floors: [
      { key: "ground", name: "Ground Floor", image: "/floorplans/type1-west-ground.png" },
      { key: "first", name: "First Floor", image: "/floorplans/type1-west-first.png" },
      { key: "second", name: "Second Floor", image: "/floorplans/type1-west-second.png" },
    ],
  },
  {
    type: "Type 2",
    sqyds: "201",
    facing: "West Facing",
    pdf: "/floorplans/type2-201sqyds-west-facing.pdf",
    floors: [
      { key: "ground", name: "Ground Floor", image: "/floorplans/type2-west-ground.png" },
      { key: "first", name: "First Floor", image: "/floorplans/type2-west-first.png" },
      { key: "second", name: "Second Floor", image: "/floorplans/type2-west-second.png" },
    ],
  },
  {
    type: "Type 3",
    sqyds: "203",
    facing: "West Facing",
    pdf: "/floorplans/type3-203sqyds-west-facing.pdf",
    floors: [
      { key: "ground", name: "Ground Floor", image: "/floorplans/type3-west-ground.png" },
      { key: "first", name: "First Floor", image: "/floorplans/type3-west-first.png" },
      { key: "second", name: "Second Floor", image: "/floorplans/type3-west-second.png" },
    ],
  },
  {
    type: "Type 4",
    sqyds: "226",
    facing: "West Facing",
    pdf: "/floorplans/type4-226sqyds-west-facing.pdf",
    floors: [
      { key: "ground", name: "Ground Floor", image: "/floorplans/type4-west-ground.png" },
      { key: "first", name: "First Floor", image: "/floorplans/type4-west-first.png" },
      { key: "second", name: "Second Floor", image: "/floorplans/type4-west-second.png" },
    ],
  },
  {
    type: "Type 5",
    sqyds: "228",
    facing: "West Facing",
    pdf: "/floorplans/type5-228sqyds-west-facing.pdf",
    floors: [
      { key: "ground", name: "Ground Floor", image: "/floorplans/type5-west-ground.png" },
      { key: "first", name: "First Floor", image: "/floorplans/type5-west-first.png" },
      { key: "second", name: "Second Floor", image: "/floorplans/type5-west-second.png" },
    ],
  },
  {
    type: "Type 6",
    sqyds: "231",
    facing: "West Facing",
    pdf: "/floorplans/type6-231sqyds-west-facing.pdf",
    floors: [
      { key: "ground", name: "Ground Floor", image: "/floorplans/type6-west-ground.png" },
      { key: "first", name: "First Floor", image: "/floorplans/type6-west-first.png" },
      { key: "second", name: "Second Floor", image: "/floorplans/type6-west-second.png" },
    ],
  },
  {
    type: "Type 7",
    sqyds: "233",
    facing: "West Facing",
    pdf: "/floorplans/type7-west.pdf",
    floors: [
      { key: "ground", name: "Ground Floor", image: "/floorplans/type7-west-ground.jpg" },
      { key: "first", name: "First Floor", image: "/floorplans/type7-west-first.jpg" },
      { key: "second", name: "Second Floor", image: "/floorplans/type7-west-second.jpg" },
    ],
  },
  {
    type: "Type 8",
    sqyds: "235",
    facing: "West Facing",
    pdf: "/floorplans/type8-west.pdf",
    floors: [
      { key: "ground", name: "Ground Floor", image: "/floorplans/type8-west-ground.jpg" },
      { key: "first", name: "First Floor", image: "/floorplans/type8-west-first.jpg" },
      { key: "second", name: "Second Floor", image: "/floorplans/type8-west-second.jpg" },
    ],
  },
  {
    type: "Type 9",
    sqyds: "228",
    facing: "West Facing",
    pdf: "/floorplans/type9-west.pdf",
    floors: [
      { key: "ground", name: "Ground Floor", image: "/floorplans/type9-west-ground.jpg" },
      { key: "first", name: "First Floor", image: "/floorplans/type9-west-first.jpg" },
      { key: "second", name: "Second Floor", image: "/floorplans/type9-west-second.jpg" },
    ],
  },
  {
    type: "Type 10",
    sqyds: "242",
    facing: "West Facing",
    pdf: "/floorplans/type10-west.pdf",
    floors: [
      { key: "ground", name: "Ground Floor", image: "/floorplans/type10-west-ground.jpg" },
      { key: "first", name: "First Floor", image: "/floorplans/type10-west-first.jpg" },
      { key: "second", name: "Second Floor", image: "/floorplans/type10-west-second.jpg" },
    ],
  },
  {
    type: "Type 11",
    sqyds: "235",
    facing: "West Facing",
    pdf: "/floorplans/type11-west.pdf",
    floors: [
      { key: "ground", name: "Ground Floor", image: "/floorplans/type11-west-ground.jpg" },
      { key: "first", name: "First Floor", image: "/floorplans/type11-west-first.jpg" },
      { key: "second", name: "Second Floor", image: "/floorplans/type11-west-second.jpg" },
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
    type: "Type 15",
    sqyds: "209",
    facing: "West Facing",
    pdf: "/floorplans/type15-west.pdf",
    floors: [
      { key: "ground", name: "Ground Floor", image: "/floorplans/type15-west-ground.jpg" },
      { key: "first", name: "First Floor", image: "/floorplans/type15-west-first.jpg" },
      { key: "second", name: "Second Floor", image: "/floorplans/type15-west-second.jpg" },
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
    type: "Type 19",
    sqyds: "230",
    facing: "East Facing",
    pdf: "/floorplans/type19-east.pdf",
    floors: [
      { key: "ground", name: "Ground Floor", image: "/floorplans/type19-east-ground.jpg" },
      { key: "first", name: "First Floor", image: "/floorplans/type19-east-first.jpg" },
      { key: "second", name: "Second Floor", image: "/floorplans/type19-east-second.jpg" },
    ],
  },
  {
    type: "Type 20",
    sqyds: "207",
    facing: "East Facing",
    pdf: "/floorplans/type20-east.pdf",
    floors: [
      { key: "ground", name: "Ground Floor", image: "/floorplans/type20-east-ground.jpg" },
      { key: "first", name: "First Floor", image: "/floorplans/type20-east-first.jpg" },
      { key: "second", name: "Second Floor", image: "/floorplans/type20-east-second.jpg" },
    ],
  },
  {
    type: "Type 21",
    sqyds: "186",
    facing: "West Facing",
    pdf: "/floorplans/type21-west.pdf",
    floors: [
      { key: "ground", name: "Ground Floor", image: "/floorplans/type21-west-ground.jpg" },
      { key: "first", name: "First Floor", image: "/floorplans/type21-west-first.jpg" },
      { key: "second", name: "Second Floor", image: "/floorplans/type21-west-second.jpg" },
    ],
  },
  {
    type: "Type 22",
    sqyds: "205",
    facing: "East Facing",
    pdf: "/floorplans/type22-205sqyds-east-facing.pdf",
    floors: [
      { key: "ground", name: "Ground Floor", image: "/floorplans/type22-east-ground.png" },
      { key: "first", name: "First Floor", image: "/floorplans/type22-east-first.png" },
      { key: "second", name: "Second Floor", image: "/floorplans/type22-east-second.png" },
    ],
  },
  {
    type: "Type 23",
    sqyds: "238",
    facing: "West Facing",
    pdf: "/floorplans/type23-west.pdf",
    floors: [
      { key: "ground", name: "Ground Floor", image: "/floorplans/type23-west-ground.jpg" },
      { key: "first", name: "First Floor", image: "/floorplans/type23-west-first.jpg" },
      { key: "second", name: "Second Floor", image: "/floorplans/type23-west-second.jpg" },
    ],
  },
  {
    type: "Type 24",
    sqyds: "238",
    facing: "East Facing",
    pdf: "/floorplans/type24-east.pdf",
    floors: [
      { key: "ground", name: "Ground Floor", image: "/floorplans/type24-east-ground.jpg" },
      { key: "first", name: "First Floor", image: "/floorplans/type24-east-first.jpg" },
      { key: "second", name: "Second Floor", image: "/floorplans/type24-east-second.jpg" },
    ],
  },
  {
    type: "Type 25",
    sqyds: "230",
    facing: "West Facing",
    pdf: "/floorplans/type25-230sqyds-west-facing.pdf",
    floors: [
      { key: "ground", name: "Ground Floor", image: "/floorplans/type25-west-ground.png" },
      { key: "first", name: "First Floor", image: "/floorplans/type25-west-first.png" },
      { key: "second", name: "Second Floor", image: "/floorplans/type25-west-second.png" },
    ],
  },
  {
    type: "Type 26",
    sqyds: "360",
    facing: "West Facing",
    pdf: "/floorplans/type26-360sqyds-west-facing.pdf",
    floors: [
      { key: "ground", name: "Ground Floor", image: "/floorplans/type26-west-ground.png" },
      { key: "first", name: "First Floor", image: "/floorplans/type26-west-first.png" },
      { key: "second", name: "Second Floor", image: "/floorplans/type26-west-second.png" },
    ],
  },
  {
    type: "Type 27",
    sqyds: "220",
    facing: "East Facing",
    pdf: "/floorplans/type27-220sqyds-east-facing.pdf",
    floors: [
      { key: "ground", name: "Ground Floor", image: "/floorplans/type27-east-ground.png" },
      { key: "first", name: "First Floor", image: "/floorplans/type27-east-first.png" },
      { key: "second", name: "Second Floor", image: "/floorplans/type27-east-second.png" },
    ],
  },
  {
    type: "Type 28",
    sqyds: "205",
    facing: "East Facing",
    pdf: "/floorplans/type28-east.pdf",
    floors: [
      { key: "ground", name: "Ground Floor", image: "/floorplans/type28-east-ground.jpg" },
      { key: "first", name: "First Floor", image: "/floorplans/type28-east-first.jpg" },
      { key: "second", name: "Second Floor", image: "/floorplans/type28-east-second.jpg" },
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
    src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&auto=format&fit=crop&q=80",
    alt: "Aerial view of MIORAH villa community",
    span: "col-span-2 row-span-2",
  },
  {
    category: "Exteriors",
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80",
    alt: "MIORAH main entrance gate",
    span: "col-span-1 row-span-1",
  },
  {
    category: "Exteriors",
    src: "https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?w=1200&auto=format&fit=crop&q=80",
    alt: "Row of triplex villa facades",
    span: "col-span-1 row-span-2",
  },
  {
    category: "Clubhouse",
    src: "https://images.unsplash.com/photo-1759038086701-234d7c43c227?w=1600&auto=format&fit=crop&q=80",
    alt: "Clubhouse lounge interior",
    span: "col-span-2 row-span-1",
  },
  {
    category: "Amenities",
    src: "https://images.unsplash.com/photo-1781255276587-2470a25ea4ba?w=1200&auto=format&fit=crop&q=80",
    alt: "Swimming pool deck",
    span: "col-span-1 row-span-1",
  },
  {
    category: "Amenities",
    src: "https://images.unsplash.com/photo-1723823932575-c36ea477f48e?w=1200&auto=format&fit=crop&q=80",
    alt: "Kids play area",
    span: "col-span-1 row-span-1",
  },
  {
    category: "Exteriors",
    src: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=1600&auto=format&fit=crop&q=80",
    alt: "Landscaped garden walkway",
    span: "col-span-2 row-span-2",
  },
  {
    category: "Interiors",
    src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&auto=format&fit=crop&q=80",
    alt: "Villa living room interior",
    span: "col-span-1 row-span-1",
  },
  {
    category: "Interiors",
    src: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200&auto=format&fit=crop&q=80",
    alt: "Master bedroom interior",
    span: "col-span-1 row-span-2",
  },
  {
    category: "Interiors",
    src: "https://images.unsplash.com/photo-1626683164688-9ea28b9276c6?w=1600&auto=format&fit=crop&q=80",
    alt: "Private home theatre room",
    span: "col-span-2 row-span-1",
  },
  {
    category: "Amenities",
    src: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=1200&auto=format&fit=crop&q=80",
    alt: "Outdoor gym and fitness deck",
    span: "col-span-1 row-span-1",
  },
  {
    category: "Construction",
    src: "https://images.unsplash.com/photo-1724113595861-93b16bc264a5?w=1200&auto=format&fit=crop&q=80",
    alt: "Construction progress at the MIORAH site",
    span: "col-span-1 row-span-1",
  },
  {
    category: "Clubhouse",
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&auto=format&fit=crop&q=80",
    alt: "Amphitheatre and party lawn",
    span: "col-span-2 row-span-1",
  },
  {
    category: "Exteriors",
    src: "https://images.unsplash.com/photo-1759372945658-1e9f56e751bd?w=1600&auto=format&fit=crop&q=80",
    alt: "MIORAH villas at night",
    span: "col-span-2 row-span-2",
  },
] as const;