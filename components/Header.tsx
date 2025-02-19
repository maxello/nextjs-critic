import ThemesPicker from './ThemesPicker';
import Link from 'next/link';
import ProfileDropdown from './ProfileDropdown';
import { auth } from "@/auth";
import { NavigationProps, RoleTypes } from '@/types/index';
import { Button } from "@/components/ui/button";
import { MessageCircleMore } from "lucide-react";

import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import { fetchUserRoleById } from '@/lib/actions';

export default async function Header() {
  const session = await auth();
  const userId = session?.user?.id;
  const userRole: RoleTypes | null = userId ? await fetchUserRoleById(userId) : null;
  const navigation: NavigationProps[] = [
    { name: 'Home', href: '/' },
    { name: 'Movies', href: '/movies' },
    // { name: 'Games', href: '/games' },
  ]
  // console.log("session+++", session);
  // if (session?.user?.role === "ADMIN") {
  //   navigation.push({ name: 'Dashboard', href: '/dashboard' });
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
              {session?.user?.name && userRole ? (
                <ProfileDropdown name={session.user?.name} role={userRole} />
              ) : (
                <Button asChild className="ml-6" variant="outline">
                  <Link href="/sign-in">Log in</Link>
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
