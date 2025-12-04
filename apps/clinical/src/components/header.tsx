"use client";

import { Bell, Search } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-white px-6 dark:bg-zinc-900 dark:border-zinc-800">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search patients..."
            className="h-9 w-64 rounded-md border border-zinc-200 bg-zinc-50 pl-9 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="rounded-full p-2 text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
          <Bell className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
