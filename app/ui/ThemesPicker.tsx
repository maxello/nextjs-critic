'use client';
import React from 'react';
import { useTheme } from 'next-themes';
import Dropdown from './Dropdown';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { Menu, MenuButton } from '@headlessui/react';
import { ThemeProps } from '@/app/lib/definitions';

export default function ThemesPicker() {
  const { theme, setTheme } = useTheme();
  
  const getIcon = (mode: ThemeProps["mode"], cls: string) => {
    switch (mode) {
      case "light":
        return <SunIcon aria-hidden="true" className={cls} />
      case "dark":
        return <MoonIcon aria-hidden="true" className={cls} />
      // case "system":
      //   return <ComputerDesktopIcon aria-hidden="true" className={cls} />
      default:
        return <ComputerDesktopIcon aria-hidden="true" className={cls} />
    }
  }

  const dropdown: ThemeProps[] = [
    {mode: "light", label: "Light", icon: getIcon("light", "size-6")},
    {mode: "dark", label: "Dark", icon: getIcon("dark", "size-6")},
    {mode: "system", label: "System", icon: getIcon("system", "size-6")}
  ];

  const handleTheme = (mode: ThemeProps["mode"]) => {
    if (mode) {
      setTheme(mode);
    }
  }

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="relative flex rounded-full p-1 text-sky-600 dark:text-sky-400 text-sm focus:outline-none">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          {getIcon(theme, "size-6")}
        </MenuButton>
      </div>
    <Dropdown items={dropdown} onChangeTheme={handleTheme} />
    </Menu>
  )
}
