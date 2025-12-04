"use client";

import { useLanguage } from "./language-provider";
import { Button } from "./button";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Button
        appName="shared"
        onClick={() => setLocale('en')}
        className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
          locale === 'en' 
            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
            : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'
        }`}
      >
        EN
      </Button>
      <Button
        appName="shared"
        onClick={() => setLocale('es')}
        className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
          locale === 'es' 
            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
            : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'
        }`}
      >
        ES
      </Button>
    </div>
  );
}
