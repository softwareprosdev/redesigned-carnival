"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@dental-prodigy/ui/button";
import { createSupabaseBrowserClient } from "@dental-prodigy/auth";
import { useRouter } from "next/navigation";
import { LogOut, User, Calendar, Home } from "lucide-react";
import { clsx } from "clsx";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: Home },
  { name: "My Appointments", href: "/dashboard/appointments", icon: Calendar },
  { name: "Profile", href: "/dashboard/profile", icon: User },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-30 border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                Dental Prodigy
              </span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={clsx(
                      isActive
                        ? "border-blue-500 text-zinc-900 dark:text-white"
                        : "border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300",
                      "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-colors"
                    )}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center">
            <Button
              appName="patient"
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full border border-zinc-200 bg-transparent px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
