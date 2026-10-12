'use client';

import { useRouter } from 'next/navigation';
import { useTransition, useEffect, useState } from 'react';
import { Sun, Moon, Loader2 } from 'lucide-react';
import { setTheme } from '@/utils/outher/locale';

interface ThemeSwitcherProps {
  initialTheme?: string; // ممكن تستلم القيمة الأولية من الكوكي في السيرفر لو حابب
}

export default function ThemeSwitcher({ initialTheme = 'light' }: ThemeSwitcherProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [currentTheme, setCurrentTheme] = useState<string>(initialTheme);

  // تحديث الثيم محلياً وعكسه على عنصر الـ html (عشان Tailwindشتغل `dark:`)
  const toggleTheme = () => {
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setCurrentTheme(nextTheme);

    // تطبيق كلاس الـ dark فوراً على مستوى الـ html
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    startTransition(async () => {
      await setTheme(nextTheme);
      router.refresh();
    });
  };

  return (
    <button
      onClick={toggleTheme}
      disabled={isPending}
      title={currentTheme === 'dark' ? 'التحويل للوضع الفاتح' : 'Switch to Dark Mode'}
      className="flex items-center justify-center p-2.5 rounded-full border border-gray-200 hover:bg-gray-100 transition-all duration-200 disabled:opacity-50 dark:border-gray-700 dark:hover:bg-gray-800"
    >
      {isPending ? (
        <Loader2 className="w-5 h-5 animate-spin text-gray-600 dark:text-gray-300" />
      ) : (
        <div className="flex items-center gap-1.5">
          {currentTheme === 'dark' ? (
            <Sun className="w-5 h-5 text-amber-400 hover:rotate-45 transition-transform" />
          ) : (
            <Moon className="w-5 h-5 text-gray-700 -rotate-12 hover:rotate-0 transition-transform" />
          )}
        </div>
      )}
    </button>
  );
}