
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories (
            id,
            name,
            slug
          )
        `)
        .eq('is_featured', true)
        .eq('is_active', true);

      if (error) throw error;
      return data;
    },
  });
};

export const useProductsByCategory = (categorySlug: string) => {
  return useQuery({
    queryKey: ['products', 'category', categorySlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories!inner (
            id,
            name,
            slug
          )
        `)
        .eq('categories.slug', categorySlug)
        .eq('is_active', true);

      if (error) throw error;
      return data;
    },
  });
};

export const useProductById = (id: string) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories (
            id,
            name,
            slug
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
  });
};
