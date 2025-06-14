
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signInWithFacebook: () => Promise<{ error: any }>;
  signUpWithPhone: (phone: string, fullName?: string) => Promise<{ error: any }>;
  signInWithPhone: (phone: string) => Promise<{ error: any }>;
  verifyOtp: (phone: string, token: string, type: 'sms' | 'signup') => Promise<{ error: any }>;
  resendOtp: (phone: string, type: 'sms' | 'signup') => Promise<{ error: any }>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Handle successful OAuth callback
        if (event === 'SIGNED_IN' && session) {
          console.log('User signed in successfully:', session.user);
          // Redirect to home page after successful authentication
          if (window.location.pathname === '/login') {
            window.location.href = '/';
          }
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName
        }
      }
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { error };
  };

  const signOut = async () => {
    console.log('Signing out...');
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Sign out error:', error);
    } else {
      console.log('Sign out successful');
      // Clear local state immediately
      setSession(null);
      setUser(null);
    }
  };

  const signInWithGoogle = async () => {
    console.log('Attempting Google sign in...');
    
    try {
      // Check if we're in production or development
      const isProduction = window.location.hostname !== 'localhost' && !window.location.hostname.includes('local');
      const redirectUrl = isProduction ? window.location.origin : `${window.location.origin}/`;
      
      console.log('Environment:', isProduction ? 'production' : 'development');
      console.log('Redirect URL:', redirectUrl);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account',
          }
        }
      });
      
      console.log('Google auth response:', { data, error });
      
      if (error) {
        console.error('Google authentication error details:', {
          message: error.message,
          status: error.status,
          statusText: error.name,
          details: error
        });
        
        // Provide more specific error messages
        if (error.message.includes('provider is not enabled')) {
          return { 
            error: { 
              ...error, 
              message: 'Google authentication is not enabled. Please check your Supabase configuration.' 
            } 
          };
        }
        
        return { error };
      }
      
      return { error: null };
    } catch (err) {
      console.error('Unexpected error during Google auth:', err);
      return { error: { message: 'An unexpected error occurred during authentication.' } };
    }
  };

  const signInWithFacebook = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    });
    return { error };
  };

  const signUpWithPhone = async (phone: string, fullName?: string) => {
    const { error } = await supabase.auth.signUp({
      phone,
      password: '', // Phone signup doesn't require password with OTP
      options: {
        data: {
          full_name: fullName || ''
        }
      }
    });
    return { error };
  };

  const signInWithPhone = async (phone: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      phone,
      options: {
        channel: 'sms'
      }
    });
    return { error };
  };

  const verifyOtp = async (phone: string, token: string, type: 'sms' | 'signup') => {
    // For phone verification, always use 'sms' as the type regardless of signup or login
    const { error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms'
    });
    return { error };
  };

  const resendOtp = async (phone: string, type: 'sms' | 'signup') => {
    if (type === 'signup') {
      return await signUpWithPhone(phone);
    } else {
      return await signInWithPhone(phone);
    }
  };

  const value = {
    user,
    session,
    signUp,
    signIn,
    signOut,
    signInWithGoogle,
    signInWithFacebook,
    signUpWithPhone,
    signInWithPhone,
    verifyOtp,
    resendOtp,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
