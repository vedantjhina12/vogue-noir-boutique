
import { getSupabaseConfig } from '@/config/supabase';

export const logSupabaseConfig = () => {
  const config = getSupabaseConfig();
  console.group('🔧 Supabase Configuration');
  console.log('Environment:', window.location.hostname === 'localhost' ? 'LOCAL' : 'PRODUCTION');
  console.log('URL:', config.url);
  console.log('Anon Key:', config.anonKey.substring(0, 20) + '...');
  console.groupEnd();
};

// Auto-log configuration in development
if (process.env.NODE_ENV === 'development') {
  logSupabaseConfig();
}
