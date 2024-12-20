'use client';

import {
  CogIcon,
  PlusCircleIcon,
  RocketLaunchIcon,
  FilmIcon,
  ChevronRightIcon,
  ChevronLeftIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import SidebarItem from './SidebarItem';

function Sidebar({
  children,
  expanded,
  setExpanded
}: {
  children: React.ReactNode,
  expanded: boolean,
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <div
        className={`fixed inset-0 block bg-gray-400  ${expanded ? 'block sm:hidden' : 'hidden'}`}
        onClick={() => {setExpanded(false)}}
      />
      <aside
        className={`relative z-1 box-border transition-all ${expanded ? 'w-5/6 sm:w-64' : 'w-0 sm:w-20'}`}
      >
        <nav className="flex h-full flex-col border-r bg-white shadow-sm">
          <div className="flex items-center justify-end p-3">
            <div className={`${expanded ? '' : 'hidden sm:block'}`}>
              <button
                onClick={() => setExpanded((curr: boolean) => !curr)}
                className="absolute z-50 top-1/2 translate-y-1/2 right-0 translate-x-1/2 bg-white hover:bg-slate-100 text-slate-500 p-2 rounded-full border border-slate-200"
              >
                {expanded ? (
                  <ChevronLeftIcon className="size-4" />
                ) : (
                  <ChevronRightIcon className="size-4" />
                )}
              </button>
            </div>
          </div>
          <ul className="flex-1 px-3">{children}</ul>
        </nav>
      </aside>
    </>
  );
}

export default function MakeSidebar() {
  const [expanded, setExpanded] = useState(true);
  const navBarItems = [
    {
      icon: <PlusCircleIcon />,
      subMenu: [
        {
          icon: <FilmIcon />,
          text: 'Movie',
          href: '/dashboard/movies/create'
        },
        {
          icon: <RocketLaunchIcon />,
          text: 'Game',
          href: '/dashboard/games/create'
        },
      ],
      text: 'Create',
    },
    {
      icon: <CogIcon />,
      text: 'Settings',
    },
  ];

  return (
    <Sidebar expanded={expanded} setExpanded={setExpanded}>
      {navBarItems.map((item, index) => (
        <SidebarItem key={index} expanded={expanded} {...item} />
      ))}
    </Sidebar>
  );
}