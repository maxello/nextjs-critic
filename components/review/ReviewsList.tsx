import { ReviewProps, ReviewScoreStatusProps, RoleTypes } from '@/types'
import React from 'react'
import ReviewCard from './ReviewCard'
import { fetchMovieReviews } from '@/lib/actions/movie'

const ReviewsList = async({
  role,
  id,
  currentPage,
  itemsPerPage,
  filterBy
}: {
  role: RoleTypes,
  id: string,
  currentPage: number,
  itemsPerPage: number,
  filterBy?: ReviewScoreStatusProps
}) => {
  const reviews = await fetchMovieReviews(id, role, currentPage, itemsPerPage, filterBy);
  return (
    <div className="flex flex-col space-y-4 mb-8">
      {reviews?.length ? (
        <>
          {reviews.map((review: ReviewProps) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </>
      ) : (
        <div className="text-muted-foreground text-center">No reviews yet.</div>
      )}
    </div>
  )
}

export default ReviewsList;