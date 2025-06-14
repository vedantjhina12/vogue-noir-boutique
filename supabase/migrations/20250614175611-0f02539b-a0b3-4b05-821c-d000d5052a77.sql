
-- Enable phone authentication by updating the auth configuration
-- This will be handled through Supabase dashboard settings, but we need to ensure
-- we have proper handling for phone authentication in our database

-- Update the profiles table to include phone number if it doesn't exist
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS phone TEXT;

-- Create a function to handle phone-based user creation
CREATE OR REPLACE FUNCTION public.handle_phone_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Check if profile already exists
  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = NEW.id) THEN
    INSERT INTO public.profiles (id, email, full_name, phone)
    VALUES (
      NEW.id,
      NEW.email,
      COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
      NEW.phone
    );
  END IF;
  RETURN NEW;
END;
$$;

-- Update the existing trigger to use the new function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_phone_user();
