import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, ChatBubbleLeftEllipsisIcon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import ThemesPicker from './ThemesPicker';
import NavLink from './NavLink';

type NavigationProps = {
  name: string;
  href: string;
  current: boolean;
}

const navigation: NavigationProps[] = [
  { name: 'Home', href: '/', current: false },
  { name: 'Movies', href: '/movies', current: false }
]

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-white/95 dark:bg-slate-800/95 sticky top-0 z-10 border-b dark:border-b-slate-600">
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
            <div className="flex shrink-0 items-center text-sky-600 dark:text-sky-400">
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
            {/* Profile dropdown */}
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
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-50 data-[focus]:bg-slate-100 dark:data-[focus]:bg-slate-700 data-[focus]:outline-none"
                  >
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
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
