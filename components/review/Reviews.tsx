import { fetchMovieReviews } from '@/lib/actions/movie';
import { ReviewProps, RoleTypes } from '@/types/index';
import Link from 'next/link';
import React from 'react';
// import ReviewsList from './ReviewsList';
import ReviewCard from './ReviewCard';

const Reviews = async ({
  title,
  categoryId,
  role,
  link
}: {
  title: string,
  categoryId: string,
  role: RoleTypes,
  link: string
}) => {
  const reviews = await fetchMovieReviews(categoryId, role);
  return (
    <>
      <div className="flex items-center space-x-2 mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <Link href={link} className="underline hover:no-underline underline-offset-2">View all</Link>
      </div>
      <div className="flex flex-col space-y-4">
        {reviews?.length ? (
          <>
            {reviews.map((review: ReviewProps) => (
              <ReviewCard key={review.id} {...review} />
            ))}
          </>
        ) : (
          <div className="text-muted-foreground">No reviews yet.</div>
        )}
      </div>
    </>
  )
}

export default Reviews;