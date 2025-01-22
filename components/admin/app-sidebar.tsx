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

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Movies",
      url: "#",
      icon: Clapperboard,
      isActive: true,
      items: [
        {
          title: "Table",
          url: "/admin/movies",
        },
        {
          title: "Create",
          url: "/admin/movies/new",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* <SidebarHeader>
      
      </SidebarHeader> */}
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
