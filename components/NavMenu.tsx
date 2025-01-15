import React from 'react';
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavigationProps } from '@/lib/definitions';
import NavLink from './NavLink';

const NavMenu = ({items}: {items: NavigationProps[]}) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {items.map((item) => (
          <NavLink key={item.name} item={item} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default NavMenu;