import { useNavigate } from "react-router-dom";
import { LiveSearch, SearchFilters } from "@/components/ui/live-search";
import { useTrendingData } from "@/hooks/use-search";
import heroImage from "@/assets/sifnos-hero.jpg";

const Hero = () => {
  const navigate = useNavigate();
  const { data: trendingData } = useTrendingData();
  
  const handleSearch = (filters: SearchFilters) => {
    // Create search params
    const searchParams = new URLSearchParams();
    if (filters.query) searchParams.set('q', filters.query);
    if (filters.category) searchParams.set('category', filters.category);
    if (filters.village) searchParams.set('village', filters.village);
    if (filters.rating > 0) searchParams.set('rating', filters.rating.toString());
    if (filters.season && filters.season !== 'any') searchParams.set('season', filters.season);
    if (filters.priceRange[0] > 1 || filters.priceRange[1] < 4) {
      searchParams.set('priceRange', `${filters.priceRange[0]}-${filters.priceRange[1]}`);
    }
    
    // Navigate to search results page or categories page with filters
    if (filters.query || filters.category) {
      navigate(`/categories?${searchParams.toString()}`);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/60" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
              Travelsifnos.gr
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              The most complete business directory for beautiful Sifnos island. 
              Discover authentic experiences, local businesses, and hidden gems.
            </p>
          </div>

          {/* Live Search Bar */}
          <div className="max-w-3xl mx-auto">
            <LiveSearch 
              onSearch={handleSearch}
              placeholder="Search businesses, restaurants, accommodation, experiences..."
            />
          </div>

          {/* Live Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-white/90">
            <div className="text-center">
              <div className="text-2xl font-bold">{trendingData?.featured?.length || 0}+</div>
              <div className="text-sm uppercase tracking-wide">Featured Businesses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{trendingData?.villages?.length || 8}</div>
              <div className="text-sm uppercase tracking-wide">Villages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">20+</div>
              <div className="text-sm uppercase tracking-wide">Beautiful Beaches</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{trendingData?.categories?.length || 8}</div>
              <div className="text-sm uppercase tracking-wide">Categories</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;