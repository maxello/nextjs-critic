'use client';
import React, { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { ThemeProps } from '@/app/lib/definitions';

export default function ThemesPicker() {
  const { theme, setTheme, systemTheme } = useTheme();

  useEffect(() => {
    if (systemTheme && theme === 'system') {
      setTheme(systemTheme);
    }
  }, [theme, systemTheme, setTheme]);

  const getIcon = (mode: ThemeProps["mode"], cls: string) => {
    if (mode === "light") {
      return <MoonIcon aria-hidden="true" className={cls} />
    } else {
      return <SunIcon aria-hidden="true" className={cls} />
    }
  }

  const toggleTheme = () => {
    if (theme) {
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
  }

  return (
    <button 
      aria-label={`Use ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="relative flex rounded-full p-1 text-sky-600 dark:text-sky-400 text-sm focus:outline-none"
      onClick={toggleTheme}
    >
      {getIcon(theme, "size-6")}
    </button>
  )
}
