import ThemesPicker from './ThemesPicker';
import ProfileDropdown from './ProfileDropdown';
import { auth } from "@/auth";
import { NavigationProps } from '@/types/index';
import { MessageCircleMore } from "lucide-react";

import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import { fetchUserById } from '@/lib/actions';
import LogInButton from './LogInButton';

export default async function Header() {
  const session = await auth();
  const userId = session?.user?.id;
  const user = userId ? await fetchUserById(userId) : null;
  const navigation: NavigationProps[] = [
    { name: 'Home', href: '/' },
    { name: 'Movies', href: '/movies' }
  ]
  if (user?.role === "ADMIN") {
    navigation.push({ name: 'Dashboard', href: '/admin' });
  }
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
              {user?.id ? (
                <ProfileDropdown user={user} />
              ) : (
                <LogInButton variant={'outline'} className="ml-6" />
              )}
              <MobileNav items={navigation} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
