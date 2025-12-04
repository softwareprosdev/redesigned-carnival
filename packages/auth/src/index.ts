import {
  createBrowserClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';

// This is the client-side client
export const createSupabaseBrowserClient = () =>
  createBrowserClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  });

// This is the server-side client for server components
export const createSupabaseServerComponentClient = (cookies: any) => {
  return createServerComponentClient({
    cookies,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  });
};
