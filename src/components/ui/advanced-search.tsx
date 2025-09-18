import { useState } from "react";
import { Search, Filter, MapPin, Star, Euro, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

interface SearchFilters {
  query: string;
  category: string;
  village: string;
  priceRange: number[];
  rating: number;
  season: string;
  verified: boolean;
}

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
  className?: string;
}

const categories = [
  "All Categories",
  "Accommodation", 
  "Food & Drink",
  "Pottery & Crafts",
  "Experiences",
  "Vehicle Rentals",
  "Wellness",
  "Culture",
  "Beaches & Nature"
];

const villages = [
  "All Villages",
  "Apollonia",
  "Artemonas", 
  "Kastro",
  "Platis Gialos",
  "Kamares",
  "Vathi",
  "Faros",
  "Chrissopigi"
];

const AdvancedSearch = ({ onSearch, className }: AdvancedSearchProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    category: "",
    village: "",
    priceRange: [1, 4],
    rating: 0,
    season: "",
    verified: false
  });

  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = () => {
    onSearch(filters);
  };

  const clearFilters = () => {
    setFilters({
      query: "",
      category: "",
      village: "",
      priceRange: [1, 4],
      rating: 0,
      season: "",
      verified: false
    });
  };

  const activeFiltersCount = Object.values(filters).filter(value => 
    value !== "" && value !== 0 && value !== false && 
    !(Array.isArray(value) && value[0] === 1 && value[1] === 4)
  ).length;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Search Bar */}
      <div className="relative flex items-center bg-background rounded-full shadow-medium border border-border/50 p-2">
        <Search className="absolute left-6 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search businesses, restaurants, accommodation..."
          value={filters.query}
          onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
          className="flex-1 pl-14 pr-4 py-3 border-0 bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        
        {/* Filter Toggle */}
        <Popover open={showFilters} onOpenChange={setShowFilters}>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className="relative mr-2"
            >
              <Filter className="h-4 w-4" />
              {activeFiltersCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs"
                >
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4" align="end">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Filters</h4>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear all
                </Button>
              </div>
              
              <Separator />
              
              {/* Category Filter */}
              <div className="space-y-2">
                <Label>Category</Label>
                <Select 
                  value={filters.category} 
                  onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Village Filter */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Village
                </Label>
                <Select 
                  value={filters.village} 
                  onValueChange={(value) => setFilters(prev => ({ ...prev, village: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select village" />
                  </SelectTrigger>
                  <SelectContent>
                    {villages.map((village) => (
                      <SelectItem key={village} value={village}>
                        {village}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Price Range */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Euro className="h-4 w-4" />
                  Price Range
                </Label>
                <div className="px-2">
                  <Slider
                    value={filters.priceRange}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
                    max={4}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>€</span>
                    <span>€€</span>
                    <span>€€€</span>
                    <span>€€€€</span>
                  </div>
                </div>
              </div>
              
              {/* Rating Filter */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Minimum Rating
                </Label>
                <Select 
                  value={filters.rating.toString()} 
                  onValueChange={(value) => setFilters(prev => ({ ...prev, rating: parseInt(value) }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Any rating</SelectItem>
                    <SelectItem value="3">3+ stars</SelectItem>
                    <SelectItem value="4">4+ stars</SelectItem>
                    <SelectItem value="5">5 stars only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Season Filter */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Season
                </Label>
                <Select 
                  value={filters.season} 
                  onValueChange={(value) => setFilters(prev => ({ ...prev, season: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any season" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any season</SelectItem>
                    <SelectItem value="year-round">Year Round</SelectItem>
                    <SelectItem value="summer">Summer Only</SelectItem>
                    <SelectItem value="spring-fall">Spring to Fall</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        <Button 
          onClick={handleSearch}
          size="lg" 
          className="rounded-full px-8 bg-gradient-hero hover:bg-primary-dark transition-smooth"
        >
          Search
        </Button>
      </div>
      
      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.category && (
            <Badge variant="secondary" className="gap-1">
              {filters.category}
              <button 
                onClick={() => setFilters(prev => ({ ...prev, category: "" }))}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
          {filters.village && (
            <Badge variant="secondary" className="gap-1">
              <MapPin className="h-3 w-3" />
              {filters.village}
              <button 
                onClick={() => setFilters(prev => ({ ...prev, village: "" }))}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
          {filters.rating > 0 && (
            <Badge variant="secondary" className="gap-1">
              <Star className="h-3 w-3" />
              {filters.rating}+ stars
              <button 
                onClick={() => setFilters(prev => ({ ...prev, rating: 0 }))}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export { AdvancedSearch, type SearchFilters };
