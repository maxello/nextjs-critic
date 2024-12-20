"use client";
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { NavigationProps } from '@/app/lib/definitions';
import { useClose } from '@headlessui/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function NavLink({
  link
}: {
  link: NavigationProps
}) {
  const pathname = usePathname();
  const close = useClose();
  const router = useRouter();

  return (
    <>
      <button 
        className={classNames(
          pathname === link.href ? 'bg-sky-600 dark:bg-slate-900 text-white dark:text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 dark:hover:text-white',
          'rounded-md px-3 py-2 text-sm font-medium',
        )}
        onClick={() => {router.push(link.href); close()}}
        >
          {link.name}
      </button>
    </>
  )
}
