import React from 'react';
export default function Dashboardlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex h-full">
      {children}
    </div>
  )
}
