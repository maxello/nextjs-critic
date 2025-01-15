import Breadcrumbs from '@/components/Breadcrumbs'
import React from 'react'

export default function CreateMoviePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumbs breadcrumbs={[
          {
            label: 'Dashboard',
            href: '/dashboard'
          },
          { 
            label: 'Movies',
            href: '/dashboard/movies'
          },
          { 
            label: 'Create'
          }
        ]} 
      />
      <div>CreateMoviePage</div>
    </div>
  )
}
