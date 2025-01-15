'use client';
import React, { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { ThemeProps } from '@/lib/definitions';

import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThemesPicker() {
  const { theme, setTheme, systemTheme } = useTheme();

  useEffect(() => {
    if (systemTheme && theme === 'system') {
      setTheme(systemTheme);
    }
  }, [theme, systemTheme, setTheme]);

  const getIcon = (mode: ThemeProps["mode"]) => {
    if (mode === "light") {
      return <Moon aria-hidden="true" />
    } else {
      return <Sun aria-hidden="true" />
    }
  }

  const toggleTheme = () => {
    if (theme) {
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
  }

  return (
    <Button variant="outline" size="icon" className="[&_svg]:size-[1.4rem] border-0 shadow-none text-primary transition-colors hover:text-primary focus-visible:outline-none" onClick={toggleTheme}>
      <span className="sr-only">Change theme</span>
      {getIcon(theme)}
    </Button>
  )
}
