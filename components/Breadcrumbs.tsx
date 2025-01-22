'use client';

import React from 'react';

import { usePathname } from 'next/navigation';
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
  const paths = usePathname();
  const pathNames = paths.split('/').filter(path => path);
  return (
    <div className="flex items-center">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink className="text-primary" href="/">
              <House size={16} />
            </BreadcrumbLink>
          </BreadcrumbItem>
          {pathNames.length > 0 && <BreadcrumbSeparator className="hidden md:block" />}
          {
            pathNames.map((link, index) => {
              const href = `/${pathNames.slice(0, index + 1).join('/')}`
              return (
                <React.Fragment key={index}>
                  <li className="capitalize">
                    {(index === pathNames.length - 1) ? <span>{link}</span> : <Link className="text-primary" href={href}>{link}</Link>}

                  </li>
                  {pathNames.length !== index + 1 && <BreadcrumbSeparator className="hidden md:block" />}
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
