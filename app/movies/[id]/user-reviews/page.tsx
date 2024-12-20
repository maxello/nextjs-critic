import React from 'react'
import { Suspense } from 'react';
import ReviewsList from '@/app/ui/ReviewsList';
import Breadcrumbs from '@/app/ui/Breadcrumbs';

export default async function UserReviewsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  console.log("id", id);
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Breadcrumbs breadcrumbs={[
            { 
              label: 'Home',
              href: '/' 
            },
            { 
              label: 'Movies', 
              href: '/movies' 
            },
            { 
              label: id, 
              href: `/movies/${id}` 
            },
            {
              label: 'name'
            },
          ]} 
        />
      </Suspense>
      <div>User Reviews</div>
      <Suspense fallback={<div>Loading...</div>}>
        <ReviewsList id={id} />
      </Suspense>
    </>
  )
}
