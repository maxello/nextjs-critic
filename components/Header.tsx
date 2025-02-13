import ThemesPicker from './ThemesPicker';
import Link from 'next/link';
import ProfileDropdown from './ProfileDropdown';
import { auth } from "@/auth";
import { NavigationProps } from '@/types/index';
import { Button } from "@/components/ui/button";
import { MessageCircleMore } from "lucide-react";

import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

export default async function Header() {
  const session = await auth();
  const navigation: NavigationProps[] = [
    { name: 'Home', href: '/', current: false },
    { name: 'Movies', href: '/movies', current: false },
    // { name: 'Games', href: '/games', current: false },
  ]
  // console.log("session+++", session);
  // if (session?.user?.role === "ADMIN") {
  //   navigation.push({ name: 'Dashboard', href: '/dashboard', current: false });
  // }
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/60 backdrop-blur" >
      <div className="root-container py-3">
        <div className="mx-auto max-w-6xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <MessageCircleMore aria-hidden="true" className="size-6 mr-1.5 text-primary" />
              <span className="font-bold tracking-wide text-lg">CR<span className="text-primary">i</span>T<span className="text-primary">i</span>C</span>
            </div>
            <div className="items-center space-x-2 flex">
              <div className="hidden lg:flex">
                <DesktopNav items={navigation} />
              </div>
              <ThemesPicker />
              {session ? (
                <ProfileDropdown name={session.user?.name} />
              ) : (
                <Button asChild className="ml-6" variant="outline">
                  <Link href="/sign-in">Login</Link>
                </Button>
              )}
              <MobileNav items={navigation} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
