import Link from 'next/link';
import React from 'react';

type BreadcrumbsProps = {
  label: string;
  href?: string;
}

export default function Breadcrumbs({
  breadcrumbs
}: {
  breadcrumbs: BreadcrumbsProps[]
}) {
  return (
    <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mb-6">
      {breadcrumbs.map((item, ind) => (
        <div key={item.label} className="flex items-center">
          {item.href ? (
            <Link href={item.href} className="hover:underline">{item.label}</Link>
          ) : (
            <span>{item.label}</span>
          )}
          {(ind !== breadcrumbs.length - 1) && (
            <span>
              <svg className="mx-1.5 h-4 w-4 leading-none text-slate-500 dark:text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
