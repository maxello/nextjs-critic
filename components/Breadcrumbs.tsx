import React from 'react';
import Link from 'next/link';
import {
  House
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { clsx } from 'clsx';

interface Breadcrumb {
  label: string;
  href?: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
  home,
  ...props
}: 
  React.ComponentProps<"nav"> & { breadcrumbs: Breadcrumb[] } & { home?: string }
) {
  const homeLink = home || '/';
  return (
    <nav className="flex items-center" {...props}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink className="text-primary" href={homeLink}>
              <House size={16} />
            </BreadcrumbLink>
          </BreadcrumbItem>
          {breadcrumbs.length > 0 && <BreadcrumbSeparator className="hidden md:block" />}
          {breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={breadcrumb.label}>
            <li
              aria-current={breadcrumb.active}
              className={clsx(
                breadcrumb.active ? 'text-gray-900' : 'text-gray-500',
              )}
            >
              {breadcrumb.href ? (
                <Link className="text-primary" href={breadcrumb.href}>{breadcrumb.label}</Link>
              ) : (
                <span>{breadcrumb.label}</span>
              )}
            </li>
            {breadcrumbs.length !== index + 1 && <BreadcrumbSeparator className="hidden md:block" />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
}