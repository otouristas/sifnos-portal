import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert } from '@/integrations/supabase/types';

type Business = Tables<'businesses'> & {
  categories: Tables<'categories'>;
  villages: Tables<'villages'>;
};

type BusinessInsert = TablesInsert<'businesses'>;

interface BusinessFilters {
  category?: string;
  village?: string;
  search?: string;
  featured?: boolean;
  verified?: boolean;
  priceRange?: string[];
}

export function useBusinesses(filters: BusinessFilters = {}) {
  return useQuery({
    queryKey: ['businesses', filters],
    queryFn: async (): Promise<Business[]> => {
      let query = supabase
        .from('businesses')
        .select(`
          *,
          categories (
            id,
            name,
            slug,
            description,
            icon
          ),
          villages (
            id,
            name,
            slug,
            description
          )
        `);

      // Apply filters
      if (filters.category) {
        query = query.eq('categories.slug', filters.category);
      }

      if (filters.village) {
        query = query.eq('villages.slug', filters.village);
      }

      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      if (filters.featured !== undefined) {
        query = query.eq('featured', filters.featured);
      }

      if (filters.verified !== undefined) {
        query = query.eq('verified', filters.verified);
      }

      if (filters.priceRange && filters.priceRange.length > 0) {
        query = query.in('price_range', filters.priceRange);
      }

      query = query.order('featured', { ascending: false })
                  .order('verified', { ascending: false })
                  .order('created_at', { ascending: false });

      const { data, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    },
  });
}

export function useBusiness(slug: string) {
  return useQuery({
    queryKey: ['business', slug],
    queryFn: async (): Promise<Business | null> => {
      const { data, error } = await supabase
        .from('businesses')
        .select(`
          *,
          categories (
            id,
            name,
            slug,
            description,
            icon
          ),
          villages (
            id,
            name,
            slug,
            description
          )
        `)
        .eq('slug', slug)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // Not found
        }
        throw new Error(error.message);
      }

      return data;
    },
    enabled: !!slug,
  });
}

export function useFeaturedBusinesses() {
  return useQuery({
    queryKey: ['businesses', 'featured'],
    queryFn: async (): Promise<Business[]> => {
      const { data, error } = await supabase
        .from('businesses')
        .select(`
          *,
          categories (
            id,
            name,
            slug,
            description,
            icon
          ),
          villages (
            id,
            name,
            slug,
            description
          )
        `)
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    },
  });
}

export function useCreateBusiness() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (business: BusinessInsert): Promise<Business> => {
      const { data, error } = await supabase
        .from('businesses')
        .insert(business)
        .select(`
          *,
          categories (
            id,
            name,
            slug,
            description,
            icon
          ),
          villages (
            id,
            name,
            slug,
            description
          )
        `)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['businesses'] });
    },
  });
}

export function useUpdateBusiness(businessId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: Partial<BusinessInsert>): Promise<Business> => {
      const { data, error } = await supabase
        .from('businesses')
        .update(updates)
        .eq('id', businessId)
        .select(`
          *,
          categories (
            id,
            name,
            slug,
            description,
            icon
          ),
          villages (
            id,
            name,
            slug,
            description
          )
        `)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['businesses'] });
      queryClient.invalidateQueries({ queryKey: ['business', businessId] });
    },
  });
}
