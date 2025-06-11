
// Environment configuration for Supabase
const isLocalDevelopment = () => {
  // Check if we're running locally by looking for common local development indicators
  return (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.includes('local') ||
    window.location.port !== ''
  );
};

// Production Supabase configuration
const PRODUCTION_CONFIG = {
  url: "https://goomvvzrfhjuuvxznmht.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdvb212dnpyZmhqdXV2eHpubWh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2NjIzOTgsImV4cCI6MjA2NTIzODM5OH0.Ts094BYgv_28iudSdmGWNsKChycKQcZverQz0n_tfdk"
};

// Local Supabase configuration (default ports from supabase start)
const LOCAL_CONFIG = {
  url: "http://localhost:54321",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"
};

// Export the configuration based on environment
export const getSupabaseConfig = () => {
  const config = isLocalDevelopment() ? LOCAL_CONFIG : PRODUCTION_CONFIG;
  
  console.log(`Using ${isLocalDevelopment() ? 'LOCAL' : 'PRODUCTION'} Supabase configuration:`, {
    url: config.url,
    environment: isLocalDevelopment() ? 'local' : 'production'
  });
  
  return config;
};
