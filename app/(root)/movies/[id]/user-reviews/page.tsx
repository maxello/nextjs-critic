import React from 'react';
// import ReviewsList from '@/components/ReviewsList';

export default async function UserReviewsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  console.log("id", id);
  return (
    <>
      {/* <Suspense fallback={<div>Loading...</div>}>
        
      </Suspense> */}
      {/* <div>User Reviews</div> */}
      {/* <Suspense fallback={<div>Loading...</div>}>
        <ReviewsList id={id} />
      </Suspense> */}
    </>
  )
}
