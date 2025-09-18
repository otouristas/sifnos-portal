import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { useDebounce } from '@/hooks/use-debounce';

type Business = Tables<'businesses'> & {
  categories: Tables<'categories'>;
  villages: Tables<'villages'>;
};

export interface SearchFilters {
  query: string;
  category: string;
  village: string;
  priceRange: number[];
  rating: number;
  season: string;
  verified: boolean;
}

export interface SearchResult {
  businesses: Business[];
  sponsored: Business[];
  totalCount: number;
  isLoading: boolean;
  error: string | null;
  suggestions: string[];
}

export function useSearch(filters: SearchFilters, enabled: boolean = true): SearchResult {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  // Debounce the query to avoid too many API calls
  const debouncedQuery = useDebounce(filters.query, 300);
  
  // Main search query
  const { data, isLoading, error } = useQuery({
    queryKey: ['search', debouncedQuery, filters.category, filters.village, filters.priceRange, filters.rating, filters.season, filters.verified],
    queryFn: async (): Promise<{ businesses: Business[]; sponsored: Business[]; totalCount: number }> => {
      let query = supabase
        .from('businesses')
        .select(`
          *,
          categories (
            id,
            name,
            slug
          ),
          villages (
            id,
            name,
            slug
          )
        `)
        .eq('verified', true); // Only show verified businesses in search

      // Text search across multiple fields
      if (debouncedQuery.trim()) {
        const searchTerm = `%${debouncedQuery.toLowerCase()}%`;
        query = query.or(`
          name.ilike.${searchTerm},
          description.ilike.${searchTerm},
          tags.cs.{${debouncedQuery}},
          features.cs.{${debouncedQuery}}
        `);
      }

      // Category filter
      if (filters.category && filters.category !== 'All Categories') {
        const { data: categoryData } = await supabase
          .from('categories')
          .select('id')
          .ilike('name', filters.category)
          .single();
        
        if (categoryData) {
          query = query.eq('category_id', categoryData.id);
        }
      }

      // Village filter
      if (filters.village && filters.village !== 'All Villages') {
        const { data: villageData } = await supabase
          .from('villages')
          .select('id')
          .ilike('name', filters.village)
          .single();
        
        if (villageData) {
          query = query.eq('village_id', villageData.id);
        }
      }

      // Price range filter
      if (filters.priceRange[0] > 1 || filters.priceRange[1] < 4) {
        const priceFilters = [];
        for (let i = filters.priceRange[0]; i <= filters.priceRange[1]; i++) {
          priceFilters.push('€'.repeat(i));
        }
        query = query.in('price_range', priceFilters);
      }

      // Season filter
      if (filters.season && filters.season !== 'any') {
        switch (filters.season) {
          case 'year-round':
            query = query.or('season.ilike.%year%,season.ilike.%όλο%');
            break;
          case 'summer':
            query = query.or('season.ilike.%summer%,season.ilike.%june%,season.ilike.%july%,season.ilike.%august%,season.ilike.%ιούνιος%,season.ilike.%ιούλιος%,season.ilike.%αύγουστος%');
            break;
          case 'spring-fall':
            query = query.or('season.ilike.%april%,season.ilike.%october%,season.ilike.%απρίλιος%,season.ilike.%οκτώβριος%');
            break;
        }
      }

      // Execute the main query
      const { data: allBusinesses, error: searchError, count } = await query
        .order('featured', { ascending: false })
        .order('verified', { ascending: false })
        .order('name')
        .limit(50);

      if (searchError) throw searchError;

      // Separate sponsored/featured businesses
      const sponsored = allBusinesses?.filter(b => b.featured) || [];
      const regular = allBusinesses?.filter(b => !b.featured) || [];

      return {
        businesses: regular,
        sponsored: sponsored,
        totalCount: count || 0
      };
    },
    enabled: enabled && (debouncedQuery.length > 0 || Object.values(filters).some(v => 
      v !== "" && v !== 0 && v !== false && 
      !(Array.isArray(v) && v[0] === 1 && v[1] === 4)
    ))
  });

  // Generate search suggestions
  useEffect(() => {
    if (debouncedQuery.length > 1) {
      const generateSuggestions = async () => {
        try {
          // Get business names that match
          const { data: businessSuggestions } = await supabase
            .from('businesses')
            .select('name')
            .ilike('name', `%${debouncedQuery}%`)
            .limit(3);

          // Get category names that match
          const { data: categorySuggestions } = await supabase
            .from('categories')
            .select('name')
            .ilike('name', `%${debouncedQuery}%`)
            .limit(2);

          // Get village names that match
          const { data: villageSuggestions } = await supabase
            .from('villages')
            .select('name')
            .ilike('name', `%${debouncedQuery}%`)
            .limit(2);

          const allSuggestions = [
            ...(businessSuggestions?.map(b => b.name) || []),
            ...(categorySuggestions?.map(c => c.name) || []),
            ...(villageSuggestions?.map(v => v.name) || [])
          ];

          setSuggestions([...new Set(allSuggestions)].slice(0, 5));
        } catch (error) {
          console.error('Error generating suggestions:', error);
          setSuggestions([]);
        }
      };

      generateSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery]);

  return {
    businesses: data?.businesses || [],
    sponsored: data?.sponsored || [],
    totalCount: data?.totalCount || 0,
    isLoading,
    error: error?.message || null,
    suggestions
  };
}

// Hook for trending searches and popular businesses
export function useTrendingData() {
  return useQuery({
    queryKey: ['trending-data'],
    queryFn: async () => {
      // Get featured businesses
      const { data: featured } = await supabase
        .from('businesses')
        .select(`
          *,
          categories (name, slug),
          villages (name, slug)
        `)
        .eq('featured', true)
        .eq('verified', true)
        .limit(6);

      // Get popular categories (mock data for now, could be based on search analytics)
      const { data: categories } = await supabase
        .from('categories')
        .select('*')
        .limit(8);

      // Get popular villages
      const { data: villages } = await supabase
        .from('villages')
        .select('*')
        .limit(8);

      return {
        featured: featured || [],
        categories: categories || [],
        villages: villages || [],
        trending: [
          'pottery workshops',
          'sunset restaurants', 
          'beach hotels',
          'traditional tavernas',
          'scooter rental',
          'hiking experiences'
        ]
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
