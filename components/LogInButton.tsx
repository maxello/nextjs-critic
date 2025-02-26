"use client";
import React from 'react'
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { usePathname } from "next/navigation";

const LogInButton = ({
  variant = "default",
  text = 'Log in',
  ...props
}: 
  React.ComponentProps<"button"> & {text?: string} & {variant?: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined}
) => {
  const pathname = usePathname();
  return (
    <Button asChild variant={variant} {...props}>
      <Link href={`/sign-in?callbackUrl=${encodeURIComponent(pathname)}`}>{text}</Link>
    </Button>
  )
}

export default LogInButton;