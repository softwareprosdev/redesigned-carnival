'use client';

import { useState, useEffect } from 'react';
import { createSupabaseBrowserClient } from '@dental-prodigy/auth';
import { useRouter } from 'next/navigation';
import type { Session } from '@supabase/supabase-js';

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    getSession();
  }, [supabase.auth]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      router.refresh();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  if (session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-3xl font-semibold">Welcome, {session.user.email}</h1>
          <button
            onClick={handleLogout}
            className="rounded-full bg-red-500 px-4 py-2 text-white"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 rounded-lg bg-white p-8 shadow-lg dark:bg-zinc-900"
      >
        <h1 className="text-2xl font-semibold">Login</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="rounded-md border p-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="rounded-md border p-2"
        />
        <button
          type="submit"
          className="rounded-full bg-blue-500 px-4 py-2 text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
}