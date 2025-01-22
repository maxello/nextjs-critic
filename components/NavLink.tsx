"use client";
import { usePathname } from 'next/navigation';
import React from 'react';
// import { NavigationProps } from '@/types/index';

import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from 'next/link';

export default function NavLink({
  href,
  name
}: {
  href: string,
  name: string
}) {
  const pathname = usePathname();
	const isActive = href === pathname;

  return (
    <>
      <NavigationMenuItem>
        <Link href={href} legacyBehavior passHref>
          <NavigationMenuLink className={`${navigationMenuTriggerStyle()}`} active={isActive}>
            {name}
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    </>
  )
}
