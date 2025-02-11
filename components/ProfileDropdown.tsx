import React from 'react';
import { signOut } from "@/auth";
import { CircleUserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function ProfileDropdown({
  name
}: {
  name: string | null | undefined
}) {
  const signOutHandler = async () => {
    'use server';
    await signOut({ redirectTo: "/" });
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="[&_svg]:size-[1.4rem] bg-accent/0 border-0 shadow-none text-primary transition-colors hover:text-primary focus-visible:outline-none">
          <span className="sr-only">Open user menu</span>
          <CircleUserRound aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {name && (
          <DropdownMenuLabel>Welcome, {name}</DropdownMenuLabel>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={signOutHandler}>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
