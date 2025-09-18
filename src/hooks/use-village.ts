import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface Village {
  id: string;
  name: string;
  slug: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export const useVillage = (slug: string) => {
  return useQuery({
    queryKey: ['village', slug],
    queryFn: async () => {
      if (!slug) return null;
      
      const { data, error } = await supabase
        .from('villages')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        console.error('Error fetching village:', error);
        return null;
      }

      return data as Village;
    },
    enabled: !!slug,
  });
};
