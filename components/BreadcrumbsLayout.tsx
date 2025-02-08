'use client';

import React from 'react';
import { useSelectedLayoutSegments } from 'next/navigation';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  House
} from "lucide-react";

const Breadcrumbs = () => {
  const segments = useSelectedLayoutSegments();

  if (!segments || segments.length <= 0) {
    return null;
  }
  return (
    <div className="flex items-center">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink className="text-primary" href="/">
              <House size={16} />
            </BreadcrumbLink>
          </BreadcrumbItem>
          {segments.length > 0 && <BreadcrumbSeparator className="hidden md:block" />}
          {
            segments.map((link, index) => {
              const href = `/${segments.slice(0, index + 1).join('/')}`
              return (
                <React.Fragment key={index}>
                  <li className="capitalize">
                    {(index === segments.length - 1) ? <span>{link}</span> : <Link className="text-primary" href={href}>{link}</Link>}
                  </li>
                  {segments.length !== index + 1 && <BreadcrumbSeparator className="hidden md:block" />}
                </React.Fragment>
              )
            })
          }
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

export default Breadcrumbs;
