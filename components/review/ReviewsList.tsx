import { ReviewProps, ReviewScoreStatusProps, RoleTypes } from '@/types';
import React from 'react';
import ReviewCard from './ReviewCard';
import { fetchMovieReviews } from '@/lib/actions/movie';
import ReviewScoreStatusFilter from './ReviewScoreStatusFilter';

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
    <div className="mb-8">
      {reviews?.length ? (
        <>
          <div className="flex items-center mb-8 space-x-3 justify-end">
            <ReviewScoreStatusFilter />
          </div>
          <div className="flex flex-col space-y-3">
            {reviews.map((review: ReviewProps) => (
              <ReviewCard key={review.id} {...review} ownReviewId={ownReviewId} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-muted-foreground text-center">No reviews yet.</div>
      )}
    </div>
  )
}

export default ReviewsList;