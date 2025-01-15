import ThemesPicker from './ThemesPicker';
import Link from 'next/link';
import ProfileDropdown from './ProfileDropdown';
import { auth } from "@/auth";
import { NavigationProps } from '@/lib/definitions';
import { Button } from "@/components/ui/button";
import { MessageCircleMore, Menu } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import NavMenu from './NavMenu';

export default async function Header() {
  const session = await auth();
  const navigation: NavigationProps[] = [
    { name: 'Home', href: '/', current: false },
    { name: 'Movies', href: '/movies', current: false },
    { name: 'Games', href: '/games', current: false },
  ]
  // if (session?.user?.role === "ADMIN") {
  //   navigation.push({ name: 'Dashboard', href: '/dashboard', current: false });
  // }
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/60 backdrop-blur">
      <div className="root-container py-3">
        <div className="mx-auto max-w-6xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <MessageCircleMore aria-hidden="true" className="size-6 mr-1.5 text-primary" />
              <span className="font-bold tracking-wide text-lg">CR<span className="text-primary">i</span>T<span className="text-primary">i</span>C</span>
            </div>
            <div className="items-center space-x-2 flex">
              <div className="hidden lg:flex">
                <NavMenu items={navigation} />
              </div>
              <ThemesPicker />
              {session ? (
                <ProfileDropdown />
              ) : (
                <Button asChild className="ml-6" variant="outline">
                  <Link href="/sign-in">Login</Link>
                </Button>
              )}
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline" size="icon" className="lg:hidden [&_svg]:size-[1.5rem] border-0 shadow-none transition-colors hover:text-primary focus-visible:outline-none">
                    <span className="sr-only">Open mobile menu</span>
                    <Menu />
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader className="p-0">
                    <DrawerTitle className="sr-only">Navigation</DrawerTitle>
                  </DrawerHeader>
                  <ul className="flex flex-col space-y-5 px-5 pt-5 pb-3 ">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <DrawerClose asChild>
                            <Link className="text-base" href={item.href}>{item.name}</Link>
                          </DrawerClose>
                        </li>
                      ))}
                    <li></li>
                  </ul>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
