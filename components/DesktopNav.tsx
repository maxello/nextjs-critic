import React from 'react';
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavigationProps } from '@/types/index';
import NavLink from './NavLink';

const NavMenu = ({items}: {items: NavigationProps[]}) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {items.map((item) => (
          <NavLink key={item.name} {...item} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default NavMenu;