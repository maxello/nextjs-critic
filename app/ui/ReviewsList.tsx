import React from 'react';
import { fetchReviews } from '@/app/lib/data';
import { ReviewProps } from '../lib/definitions';

export default async function ReviewsList({
  id
}: {
  id: string
}) {
  const latestReviews = await fetchReviews(id);
  console.log("latestReviews", latestReviews);
  return (
    <>
      <div>ReviewsList</div>
      <div>
        {latestReviews.map((review: ReviewProps) => (
          <ul key={review.id} className="border border-slate-700 mb-4 p-4">
            <li>{review.name}</li>
            <li>Score: {review.score}</li>
            <li>{review.description}</li>
          </ul>
        ))}
      </div>
    </>
  )
}
