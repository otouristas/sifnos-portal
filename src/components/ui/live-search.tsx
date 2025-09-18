import { useState, useRef, useEffect } from "react";
import { Search, Filter, MapPin, Star, Euro, Calendar, X, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { useSearch, useTrendingData, SearchFilters } from "@/hooks/use-search";
import { useCategories } from "@/hooks/use-categories";
import { useVillages } from "@/hooks/use-villages";
import SearchResults from "@/components/SearchResults";

interface LiveSearchProps {
  onSearch?: (filters: SearchFilters) => void;
  className?: string;
  placeholder?: string;
}

const LiveSearch = ({ 
  onSearch, 
  className,
  placeholder = "Search businesses, restaurants, accommodation..." 
}: LiveSearchProps) => {
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
  const [showResults, setShowResults] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get live data
  const { data: categories } = useCategories();
  const { data: villages } = useVillages();
  const { data: trendingData } = useTrendingData();
  
  // Live search results
  const searchResult = useSearch(filters, true);

  // Handle clicks outside to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Show results when focused or when there's a query
  useEffect(() => {
    setShowResults(isFocused || filters.query.length > 0);
  }, [isFocused, filters.query]);

  const handleInputChange = (value: string) => {
    setFilters(prev => ({ ...prev, query: value }));
    setShowResults(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setFilters(prev => ({ ...prev, query: suggestion }));
    setShowResults(true);
    inputRef.current?.focus();
  };

  const handleTrendingClick = (term: string) => {
    setFilters(prev => ({ ...prev, query: term }));
    setShowResults(true);
    inputRef.current?.focus();
  };

  const handleSearch = () => {
    onSearch?.(filters);
    setShowResults(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
    if (e.key === 'Escape') {
      setShowResults(false);
      inputRef.current?.blur();
    }
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

  const clearQuery = () => {
    setFilters(prev => ({ ...prev, query: "" }));
    inputRef.current?.focus();
  };

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (key === 'query') return false; // Don't count query as a filter
    return value !== "" && value !== 0 && value !== false && 
           !(Array.isArray(value) && value[0] === 1 && value[1] === 4);
  }).length;

  return (
    <div className={`relative space-y-4 ${className}`} ref={searchRef}>
      {/* Main Search Bar */}
      <div className="relative flex items-center bg-background rounded-full shadow-lg border border-border/50 p-2 transition-all duration-200 hover:shadow-xl focus-within:shadow-xl focus-within:ring-2 focus-within:ring-primary/20">
        <Search className="absolute left-6 h-5 w-5 text-muted-foreground" />
        
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={filters.query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyPress}
          className="flex-1 pl-14 pr-4 py-3 border-0 bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
        />

        {/* Clear Query Button */}
        {filters.query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearQuery}
            className="mr-2 h-8 w-8 p-0 hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </Button>
        )}

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
                <h4 className="font-semibold">Advanced Filters</h4>
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
                    <SelectItem value="">All Categories</SelectItem>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
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
                    <SelectItem value="">All Villages</SelectItem>
                    {villages?.map((village) => (
                      <SelectItem key={village.id} value={village.name}>
                        {village.name}
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
          className="rounded-full px-8 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Search className="h-4 w-4 mr-2" />
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
          {(filters.priceRange[0] > 1 || filters.priceRange[1] < 4) && (
            <Badge variant="secondary" className="gap-1">
              <Euro className="h-3 w-3" />
              {'€'.repeat(filters.priceRange[0])}-{'€'.repeat(filters.priceRange[1])}
              <button 
                onClick={() => setFilters(prev => ({ ...prev, priceRange: [1, 4] }))}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Live Search Results */}
      <SearchResults
        searchResult={searchResult}
        onSuggestionClick={handleSuggestionClick}
        onTrendingClick={handleTrendingClick}
        isVisible={showResults}
        query={filters.query}
      />
    </div>
  );
};

export { LiveSearch, type SearchFilters };
