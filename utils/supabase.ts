import { createClient } from "@supabase/supabase-js";

interface SupabaseProps {
    supabaseAccessToken: string | null ;
    requireAuthorization: boolean;
  }
  
  export const supabaseClient = async ({ supabaseAccessToken, requireAuthorization }: SupabaseProps) => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_KEY!,
      {
        global: {
          headers: requireAuthorization ? { Authorization: `Bearer ${supabaseAccessToken}` } : undefined
        }
      }
    );
    return supabase;
  }