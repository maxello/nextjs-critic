import React from 'react';
import { LoaderCircle } from "lucide-react";
const Loading = () => {
  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <LoaderCircle aria-hidden="true" className="size-10 mr-1.5 text-primary animate-spin" />
    </div>
  )
}

export default Loading;