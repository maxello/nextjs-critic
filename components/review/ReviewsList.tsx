import { fetchMovieReviews } from '@/lib/actions/movie';
import { ReviewParams, RoleTypes } from '@/types';
import React from 'react';
import ReviewCard from './ReviewCard';

const ReviewsList = async ({
  role,
  id
}: {
  role: RoleTypes,
  id: string
}) => {
  const reviews = await fetchMovieReviews(id, role);
  return (
    <div className="flex flex-col space-y-4 mb-8">
      {reviews?.length ? (
        <>
          {reviews.map((review: ReviewParams) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </>
      ) : (
        <div className="text-muted-foreground">No reviews yet.</div>
      )}
    </div>
  )
}

export default ReviewsList;