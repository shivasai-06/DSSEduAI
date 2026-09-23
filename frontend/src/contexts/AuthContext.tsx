import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../services/supabase';

// Define the shape of our public.users record based on schema.sql
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  target_career?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  profile: null,
  loading: true,
  signOut: async () => {},
  refreshProfile: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch the extended profile from public.users
  const fetchProfile = async (currentUser: User) => {
    try {
      // Use maybeSingle to avoid 406 Not Acceptable error when row is missing
      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('id', currentUser.id)
        .maybeSingle();
      
      if (data) {
        setProfile(data);
      } else {
        // Create profile if it doesn't exist (e.g. Google OAuth login)
        const name = currentUser.user_metadata?.full_name || 
                     currentUser.user_metadata?.name || 
                     currentUser.email?.split('@')[0] || 
                     'User';
                     
        const { data: newProfile, error: insertError } = await supabase
          .from('users')
          .insert([
            { id: currentUser.id, name: name, email: currentUser.email }
          ])
          .select()
          .single();
          
        if (insertError) {
          console.error('Error creating user profile:', insertError);
          setProfile(null);
        } else {
          setProfile(newProfile);
        }
      }
    } catch (err) {
      console.error('Error fetching/creating profile:', err);
      setProfile(null);
    }
  };

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user);
    }
  };

  const value = {
    session,
    user,
    profile,
    loading,
    signOut,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
