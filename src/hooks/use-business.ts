import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface Business {
  id: string;
  name: string;
  slug: string;
  description: string;
  category_id: string;
  village_id: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  photo_urls?: string[];
  tags?: string[];
  verified: boolean;
  featured: boolean;
  price_range?: string;
  season?: string;
  languages?: string[];
  features?: string[];
  created_at: string;
  updated_at: string;
  categories: {
    id: string;
    name: string;
    slug: string;
  };
  villages: {
    id: string;
    name: string;
    slug: string;
  };
}

export const useBusiness = (slug: string) => {
  return useQuery({
    queryKey: ['business', slug],
    queryFn: async () => {
      if (!slug) return null;
      
      const { data, error } = await supabase
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
        .eq('slug', slug)
        .single();

      if (error) {
        console.error('Error fetching business:', error);
        return null;
      }

      return data as Business;
    },
    enabled: !!slug,
  });
};
