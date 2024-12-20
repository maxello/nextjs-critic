import React from 'react';
import Sidebar from '../ui/dashboard/Sidebar';
export default function Dashboardlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex h-full">
      <Sidebar />
      {children}
    </div>
  )
}
