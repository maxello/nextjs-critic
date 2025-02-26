"use client"

import * as React from "react";
import {
  Clapperboard
} from "lucide-react";

import { NavMain } from "@/components/admin/nav-main"
import { NavUser } from "@/components/admin/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  // SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { UserProps } from "@/types";

// This is sample data.
const navMain = [
  {
    title: "Movies",
    url: "/admin/movies",
    icon: Clapperboard,
    isActive: true,
    items: [
      {
        title: "View",
        url: "/admin/movies",
      },
      {
        title: "Create",
        url: "/admin/movies/new",
      },
    ],
  },
];

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: UserProps }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
