import React from 'react';
import Link from 'next/link';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { NavigationProps } from '@/types/index';

const MobileNav = ({items}: {items: NavigationProps[]}) => {
  return (
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
          <DrawerDescription className="sr-only"></DrawerDescription>
        </DrawerHeader>
        <ul className="flex flex-col space-y-5 px-5 pt-5 pb-3 ">
          {items.map((item) => (
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
  )
}

export default MobileNav;