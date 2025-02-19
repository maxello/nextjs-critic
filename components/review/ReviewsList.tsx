import { ReviewProps, ReviewScoreStatusProps, RoleTypes } from '@/types';
import React from 'react';
import ReviewCard from './ReviewCard';
import { fetchMovieReviews } from '@/lib/actions/movie';

const ReviewsList = async({
  role,
  id,
  currentPage,
  itemsPerPage,
  filterBy,
  ownReviewId
}: {
  role: RoleTypes,
  id: string,
  currentPage: number,
  itemsPerPage: number,
  filterBy?: ReviewScoreStatusProps,
  ownReviewId?: string
}) => {
  const reviews = await fetchMovieReviews(id, role, currentPage, itemsPerPage, filterBy);
  return (
    <>
      {reviews?.length ? (
        <div className="mb-8">
          <div className="flex flex-col space-y-3">
            {reviews.map((review: ReviewProps) => (
              <ReviewCard key={review.id} {...review} ownReviewId={ownReviewId} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-muted-foreground text-center mb-8">No reviews yet.</div>
      )}
    </>
  )
}

export default ReviewsList;