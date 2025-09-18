import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Star, 
  MapPin, 
  Phone, 
  Globe, 
  Crown, 
  Zap, 
  TrendingUp, 
  Clock,
  Users,
  Euro,
  Award,
  Sparkles,
  ArrowRight,
  Search
} from 'lucide-react';
import { SearchResult } from '@/hooks/use-search';

interface SearchResultsProps {
  searchResult: SearchResult;
  onSuggestionClick: (suggestion: string) => void;
  onTrendingClick: (term: string) => void;
  isVisible: boolean;
  query: string;
}

const SearchResults = ({ 
  searchResult, 
  onSuggestionClick, 
  onTrendingClick, 
  isVisible, 
  query 
}: SearchResultsProps) => {
  const { businesses, sponsored, totalCount, isLoading, error, suggestions } = searchResult;
  const [showAll, setShowAll] = useState(false);

  if (!isVisible) return null;

  const displayBusinesses = showAll ? businesses : businesses.slice(0, 4);
  const displaySponsored = sponsored.slice(0, 2);

  const trendingSearches = [
    'pottery workshops',
    'sunset restaurants', 
    'beach hotels',
    'traditional tavernas',
    'scooter rental',
    'hiking experiences'
  ];

  if (isLoading) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-border/50 z-50 max-h-96 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="text-muted-foreground">Searching...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-border/50 z-50 max-h-96 overflow-hidden">
        <div className="p-6">
          <div className="text-center text-red-500">
            <p>Error searching: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Show suggestions when typing but no results yet
  if (query.length > 0 && totalCount === 0 && suggestions.length > 0) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-border/50 z-50 max-h-96 overflow-hidden">
        <div className="p-4">
          <h4 className="font-semibold text-sm text-muted-foreground mb-3 flex items-center gap-2">
            <Search className="h-4 w-4" />
            Suggestions
          </h4>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onSuggestionClick(suggestion)}
                className="w-full text-left p-2 hover:bg-muted rounded-md transition-colors"
              >
                <span className="text-sm">{suggestion}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show trending when no query
  if (query.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-border/50 z-50 max-h-96 overflow-hidden">
        <div className="p-4">
          <h4 className="font-semibold text-sm text-muted-foreground mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Trending Searches
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {trendingSearches.map((term, index) => (
              <button
                key={index}
                onClick={() => onTrendingClick(term)}
                className="text-left p-2 hover:bg-muted rounded-md transition-colors text-sm"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Main search results
  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-border/50 z-50 max-h-[600px] overflow-hidden">
      <div className="p-4">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-sm text-muted-foreground">
            Found {totalCount} results for "{query}"
          </h4>
          {totalCount > 4 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Less' : `View All ${totalCount}`}
            </Button>
          )}
        </div>

        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          {/* Sponsored Results */}
          {displaySponsored.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Crown className="h-4 w-4 text-yellow-500" />
                <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400">
                  SPONSORED
                </span>
              </div>
              <div className="space-y-2">
                {displaySponsored.map((business) => (
                  <Link
                    key={business.id}
                    to={`/business/${business.slug}`}
                    className="block"
                  >
                    <Card className="hover:shadow-md transition-shadow border-yellow-200 dark:border-yellow-800">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-sm">{business.name}</h3>
                              <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                <Crown className="h-3 w-3 mr-1" />
                                Featured
                              </Badge>
                              {business.verified && (
                                <Award className="h-4 w-4 text-green-600" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                              {business.description}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>{business.villages.name}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Badge variant="outline" className="text-xs">
                                  {business.categories.name}
                                </Badge>
                              </div>
                              {business.price_range && (
                                <div className="flex items-center gap-1">
                                  <Euro className="h-3 w-3" />
                                  <span>{business.price_range}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
              {businesses.length > 0 && <Separator className="my-4" />}
            </div>
          )}

          {/* Regular Results */}
          <div className="space-y-2">
            {displayBusinesses.map((business) => (
              <Link
                key={business.id}
                to={`/business/${business.slug}`}
                className="block"
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-sm">{business.name}</h3>
                          {business.verified && (
                            <Award className="h-4 w-4 text-green-600" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                          {business.description}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{business.villages.name}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {business.categories.name}
                          </Badge>
                          {business.price_range && (
                            <div className="flex items-center gap-1">
                              <Euro className="h-3 w-3" />
                              <span>{business.price_range}</span>
                            </div>
                          )}
                        </div>
                        {business.tags && business.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {business.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* View All Link */}
          {totalCount > displayBusinesses.length && !showAll && (
            <div className="pt-4 border-t">
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setShowAll(true)}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                View all {totalCount} results
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
