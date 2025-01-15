"use client";
import { usePathname } from 'next/navigation';
import React from 'react';
import { NavigationProps } from '@/lib/definitions';

import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from 'next/link';

export default function NavLink({
  item
}: {
  item: NavigationProps
}) {
  const pathname = usePathname();
	const isActive = item.href === pathname;

  return (
    <>
      <NavigationMenuItem key={item.name}>
        <Link href={item.href} legacyBehavior passHref>
          <NavigationMenuLink className={`${navigationMenuTriggerStyle()}`} active={isActive}>
            {item.name}
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    </>
  )
}
