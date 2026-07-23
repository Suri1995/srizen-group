// app/projects/miorah/components/Amenities.tsx
"use client";

import { forwardRef, useState, useMemo, useRef } from "react";
import { 
  Grid3x3,
  Sofa,
  Users,
  Gem,
  Armchair,
  CircleDot,
  Milestone,
  Palette,
  Trophy,
  TreePine,
  Sun,
  Footprints,
  Waves,
  Music2,
  Sparkles,
  Flower2,
  Home,
  Droplet,
  Ship,
  Leaf,
  Flower,
  Sprout,
  Snowflake,
  Dumbbell,
  Baby,
  Droplets,
  Trees,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Amenities data with icons - Only from your list
const amenitiesData = [
  // Outdoor & Garden
  { icon: Grid3x3, label: "GRASS PAVERS", category: "Outdoor & Garden" },
  { icon: Trees, label: "LAWN", category: "Outdoor & Garden" },
  { icon: TreePine, label: "LAWN WITH STONE BAND", category: "Outdoor & Garden" },
  { icon: Leaf, label: "PAVING WITH UNIQUE PLANT", category: "Outdoor & Garden" },
  { icon: Grid3x3, label: "GRASS JOINTS", category: "Outdoor & Garden" },
  { icon: Flower, label: "TRELLIS", category: "Outdoor & Garden" },
  { icon: Sprout, label: "SANDPIT", category: "Outdoor & Garden" },
  { icon: Flower2, label: "BUTTERFLY GARDEN", category: "Outdoor & Garden" },
  
  // Deck & Pergola
  { icon: Sofa, label: "DECK WITH PERGOLA", category: "Deck & Pergola" },
  { icon: Sun, label: "DECK WITH SEATING PERGOLA", category: "Deck & Pergola" },
  { icon: Sun, label: "BARBEQUE DECK WITH PERGOLA", category: "Deck & Pergola" },
  { icon: Ship, label: "FLOATING DECK WITH PERGOLA", category: "Deck & Pergola" },
  { icon: Milestone, label: "WOODEN BRIDGE WITH PERGOLA", category: "Deck & Pergola" },
  
  // Seating & Relaxation
  { icon: Armchair, label: "SEATING WITH GRAVEL BED", category: "Seating & Relaxation" },
  { icon: Sofa, label: "SEATING", category: "Seating & Relaxation" },
  { icon: Sofa, label: "INFORMAL SEATING", category: "Seating & Relaxation" },
  { icon: Sofa, label: "FAMILY SEATING", category: "Seating & Relaxation" },
  { icon: TreePine, label: "SEATING WITH SPECIMEN PLANTATION", category: "Seating & Relaxation" },
  { icon: Sparkles, label: "YOUNGER SEATING PLAZA", category: "Seating & Relaxation" },
  { icon: Armchair, label: "SENIOR CITIZEN SEATING PLAZA WITH PERGOLA", category: "Seating & Relaxation" },
  
  // Sports & Fitness
  { icon: Trophy, label: "MULTIPURPOSE COURT", category: "Sports & Fitness" },
  { icon: Trophy, label: "1.BADMINTION COURT", category: "Sports & Fitness" },
  { icon: Trophy, label: "2.BOX CRICKET", category: "Sports & Fitness" },
  { icon: CircleDot, label: "PICKLE BALL COURT", category: "Sports & Fitness" },
  { icon: CircleDot, label: "BASKET BALL COURT WITH PICKLE BALL COURT", category: "Sports & Fitness" },
  { icon: Snowflake, label: "SKATING RINK", category: "Sports & Fitness" },
  { icon: Dumbbell, label: "OUT DOOR GYM", category: "Sports & Fitness" },
  
  // Water & Pool
  { icon: Waves, label: "MAIN SWIMMING POOL", category: "Water & Pool" },
  { icon: Baby, label: "KIDS SWIMMING POOL", category: "Water & Pool" },
  { icon: Droplets, label: "WATER BODY", category: "Water & Pool" },
  { icon: Waves, label: "WATER BODY WITH SPOUTS", category: "Water & Pool" },
  { icon: Waves, label: "POOL DECK", category: "Water & Pool" },
  { icon: Droplet, label: "SHOWER", category: "Water & Pool" },
  { icon: Home, label: "CHANGING ROOMS", category: "Water & Pool" },
  
  // Social & Events
  { icon: Users, label: "MINI GATHERING AREA", category: "Social & Events" },
  { icon: Users, label: "OAT (OPEN AMPHITHEATER)", category: "Social & Events" },
  { icon: Music2, label: "STAGE", category: "Social & Events" },
  { icon: TreePine, label: "MEDITATION AREA WITH PARTY LAWN", category: "Social & Events" },
  
  // Wellness
  { icon: Footprints, label: "OUT DOOR YOGA AREA", category: "Wellness" },
  
  // Play & Kids
  { icon: Sparkles, label: "KIDS PLAY AREA", category: "Play & Kids" },
  
  // Other
  { icon: Gem, label: "SCREEN WALL WITH SCULPTURE", category: "Other" },
  { icon: Palette, label: "SCULPTURE WITH GRAVEL BED", category: "Other" },
  { icon: Footprints, label: "STEPPING STONES", category: "Other" },
  { icon: Milestone, label: "PATHWAY", category: "Other" },
];

// Get unique categories
const getCategories = () => {
  const categories = amenitiesData.map(item => item.category);
  return ["All", ...Array.from(new Set(categories))];
};

const ITEMS_PER_PAGE = 8; // 4 columns x 2 rows

export const Amenities = forwardRef<HTMLDivElement>((props, ref) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);
  
  // Get filtered amenities based on category
  const filteredAmenities = useMemo(() => {
    if (activeCategory === "All") {
      return amenitiesData;
    }
    return amenitiesData.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredAmenities.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredAmenities.slice(startIndex, endIndex);

  // Reset to first page when category changes
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  // Pagination controls — scroll the grid itself into view (not the whole
  // section), and only as far as needed. This stops mobile from being
  // yanked all the way up past the category filters on every page change.
  const goToPage = (page: number) => {
    setCurrentPage(page);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const categories = useMemo(() => getCategories(), []);

  return (
    <section className="bg-secondary py-12 md:py-16" id="amenities">
      <div className="wrap">
        <div ref={ref} className="reveal section-head mx-auto text-center">
          <div className="eyebrow mx-auto">Features & Amenities</div>
          <h2 className="mx-auto text-navy">43 Resort-Style Amenities</h2>
          <p className="mx-auto">
            From wellness decks to sports courts — every corner of MIORAH
            is designed for how your family lives, plays and unwinds.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`
                px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300
                ${activeCategory === category 
                  ? 'bg-navy text-white shadow-md' 
                  : 'bg-white text-navy/70 border border-navy/10 hover:border-navy/30 hover:text-navy'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Amenities Count & Page Info */}
        <div className="flex flex-wrap items-center justify-between mb-4">
          <p className="text-xs text-ink-muted">
            {filteredAmenities.length} amenities
          </p>
          <p className="text-xs text-ink-muted">
            Page {currentPage} of {totalPages}
          </p>
        </div>

        {/* Amenities Grid - 4 columns desktop, 2 columns mobile */}
        <div ref={gridRef} className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {currentItems.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="group flex flex-col items-center gap-2 rounded-xl bg-white px-3 py-4 text-center transition-all duration-300 hover:shadow-lg hover:border-navy/20 border border-navy/5"
            >
              <div className="p-2 rounded-lg bg-navy/5 group-hover:bg-navy/10 transition-colors duration-300">
                <Icon className="h-5 w-5 text-navy" strokeWidth={1.75} />
              </div>
              <span className="text-[10px] md:text-[11px] font-medium leading-tight text-ink line-clamp-2">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`
                flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300
                ${currentPage === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-navy border border-navy/10 hover:border-navy hover:bg-navy hover:text-white'
                }
              `}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`
                    w-8 h-8 rounded-lg text-sm font-medium transition-all duration-300
                    ${currentPage === page 
                      ? 'bg-navy text-white shadow-md' 
                      : 'bg-white text-navy/70 border border-navy/10 hover:border-navy/30 hover:text-navy'
                    }
                  `}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`
                flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300
                ${currentPage === totalPages 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-navy border border-navy/10 hover:border-navy hover:bg-navy hover:text-white'
                }
              `}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
        
        <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
          + Premium amenities across the community
        </p>
      </div>
    </section>
  );
});

Amenities.displayName = "Amenities";