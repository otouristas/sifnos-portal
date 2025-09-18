import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

type Village = Tables<'villages'>;

export function useVillages() {
  return useQuery({
    queryKey: ['villages'],
    queryFn: async (): Promise<Village[]> => {
      const { data, error } = await supabase
        .from('villages')
        .select('*')
        .order('name');

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    },
  });
}

export function useVillage(slug: string) {
  return useQuery({
    queryKey: ['village', slug],
    queryFn: async (): Promise<Village | null> => {
      const { data, error } = await supabase
        .from('villages')
        .select('*')
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
