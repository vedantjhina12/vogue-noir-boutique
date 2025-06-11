
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Define the product type with categories included
type ProductWithCategory = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  sale_price: number | null;
  image_url: string | null;
  images: string[] | null;
  brand: string | null;
  sku: string | null;
  stock_quantity: number;
  sizes: string[] | null;
  colors: string[] | null;
  is_active: boolean;
  is_featured: boolean;
  category_id: string | null;
  created_at: string;
  updated_at: string;
  categories: {
    id: string;
    name: string;
    slug: string;
  } | null;
};

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
      return data as ProductWithCategory[];
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
      return data as ProductWithCategory[];
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
      return data as ProductWithCategory;
    },
  });
};
