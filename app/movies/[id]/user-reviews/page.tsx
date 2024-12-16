import React from 'react'
import { Suspense } from 'react';
import ReviewsList from '@/app/ui/ReviewsList';

export default async function UserReviews({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  console.log("id", id);
  return (
    <>
      <div>User Reviews</div>
      <Suspense fallback={<div>Loading...</div>}>
        <ReviewsList id={id} />
      </Suspense>
    </>
  )
}
