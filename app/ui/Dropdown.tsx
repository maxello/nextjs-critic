import React from 'react';
import { MenuItem, MenuItems } from '@headlessui/react';
import { ThemeProps } from '@/app/lib/definitions';

export default function Dropdown({
  items,
  onChangeTheme
}: {
  items: ThemeProps[];
  onChangeTheme: (arg0: ThemeProps["mode"]) => void;
}) {
  return (
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-slate-50 dark:bg-slate-900 py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        {items.map((item) => (
          <MenuItem key={item.mode}>
            <button
              className="w-full flex items-center gap-x-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-50 data-[focus]:bg-slate-100 dark:data-[focus]:bg-slate-700 data-[focus]:outline-none"
              onClick={() => onChangeTheme(item.mode)}
            >
              {item.icon}<span>{item.label}</span>
            </button>
          </MenuItem>
        ))}
      </MenuItems>
  )
}
