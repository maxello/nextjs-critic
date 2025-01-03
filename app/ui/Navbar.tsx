import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, ChatBubbleLeftEllipsisIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ThemesPicker from './ThemesPicker';
import NavLink from './NavLink';
import Link from 'next/link';
import ProfileDropdown from './ProfileDropdown';
import { auth } from "@/auth";
import { NavigationProps } from '@/app/lib/definitions';

export default async function Navbar() {
  const session = await auth();
  const navigation: NavigationProps[] = [
    { name: 'Home', href: '/', current: false },
    { name: 'Movies', href: '/movies', current: false },
    { name: 'Games', href: '/games', current: false },
  ]
  if (session?.user?.role === "ADMIN") {
    navigation.push({ name: 'Dashboard', href: '/dashboard', current: false });
  }
  return (
    <Disclosure as="nav" className="bg-accent-primary bg-opacity-90 sticky top-0 z-10 border-b border-bdr-primary">
      <div className="mx-auto max-w-6xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
            <div className="flex shrink-0 items-center text-primary">
              <ChatBubbleLeftEllipsisIcon aria-hidden="true" className="size-8 mr-2" />
              <span className="font-bold tracking-wide text-lg">CR<span className="text-slate-700 dark:text-white">i</span>T<span className="text-slate-700 dark:text-white">i</span>C</span>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <NavLink key={item.name} link={item} />
                ))}
              </div>
            </div>
          </div>

          
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <ThemesPicker />
            {session ? (
              <ProfileDropdown />
            ) : (
              <Link href="/login" className="ml-3 transition-colors text-sky-600 dark:text-sky-400 hover:text-sky-500 hover:dark:text-sky-300 rounded-md text-sm font-medium">Login</Link>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <div key={item.name} className="flex flex-col text-center">
              <NavLink link={item} />
            </div>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
