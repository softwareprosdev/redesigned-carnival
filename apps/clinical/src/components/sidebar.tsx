"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Settings,
  FileText,
  Activity,
} from "lucide-react";
import { clsx } from "clsx";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Patients", href: "/dashboard/patients", icon: Users },
  { name: "Appointments", href: "/dashboard/appointments", icon: Calendar },
  { name: "Records", href: "/dashboard/records", icon: FileText },
  { name: "Analytics", href: "/dashboard/analytics", icon: Activity },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-white dark:bg-zinc-900 dark:border-zinc-800">
      <div className="flex h-16 items-center px-6 border-b dark:border-zinc-800">
        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
          Dental Prodigy
        </span>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  isActive
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                    : "text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100",
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors"
                )}
              >
                <item.icon
                  className={clsx(
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-zinc-400 group-hover:text-zinc-500 dark:text-zinc-500 dark:group-hover:text-zinc-300",
                    "mr-3 h-5 w-5 flex-shrink-0"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t p-4 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Dr. Smith
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Admin
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
