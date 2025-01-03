import React from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { signOut } from "@/auth";
export default async function ProfileDropdown() {

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="relative flex rounded-full p-1 text-sky-600 dark:text-sky-400 text-sm focus:outline-none">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <UserCircleIcon aria-hidden="true" className="size-6" />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-slate-50 dark:bg-slate-900 py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <MenuItem>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-50 data-[focus]:bg-slate-100 dark:data-[focus]:bg-slate-700 data-[focus]:outline-none"
          >
            Your Profile
          </a>
        </MenuItem>
        <MenuItem>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-50 data-[focus]:bg-slate-100 dark:data-[focus]:bg-slate-700 data-[focus]:outline-none"
          >
            Settings
          </a>
        </MenuItem>
        <MenuItem>
          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-50 hover:bg-slate-100 dark:hover:bg-slate-700 data-[focus]:outline-none"
            >
              Sign out
            </button>
          </form>

        </MenuItem>
      </MenuItems>
    </Menu>
  )
}
