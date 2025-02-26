"use client";
import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({
  place,
  children
} : {
  place: string,
  children: ReactNode
}) => {
  const breadcrumbsContent = document.getElementById(place);
  const [domReady, setDomReady] = React.useState(false)

  React.useEffect(() => {
    setDomReady(true)
  }, [])
  return (
    <>
      { domReady && breadcrumbsContent
        ? createPortal(children, breadcrumbsContent) 
      : null }
    </>
  )
}

export default Portal