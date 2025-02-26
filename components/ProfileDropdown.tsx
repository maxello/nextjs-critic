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
import { UserProps } from '@/types';
import Link from 'next/link';

export default async function ProfileDropdown({
  user
}: {
  user: UserProps
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
        <DropdownMenuLabel>
          <div className="mb-1">It&apos;s {user.fullName}</div>
          <div className="text-xs text-muted-foreground font-normal">
            I can write reviews as a <span className="text-success">{user.role}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href={'/profile'}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={signOutHandler}>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
