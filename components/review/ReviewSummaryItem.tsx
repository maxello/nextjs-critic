import React from 'react';
import Link from 'next/link';
import ReviewScore from './ReviewScore';

const ReviewSummaryItem = ({
  id,
  totalReviews,
  averageScore,
  title = 'Score',
}: {
  id: string,
  totalReviews: number,
  averageScore: number | null,
  title: string,
}) => {
  return (
    <div className="flex items-center space-x-4">
      <ReviewScore score={averageScore} />
      {totalReviews && averageScore !== null ? (
        <div>
          <p className="text-sm font-medium leading-none">{title}</p>
          <Link href={`/movies/${id}/reviews`} className="text-sm text-muted-foreground underline hover:no-underline">Based on {totalReviews} Review{totalReviews > 1 ? 's' : ''}</Link>
        </div>
      ) : (
        <div>
          <p className="text-sm font-medium leading-none mb-0.5">{title}</p>
          <Link href={`/movies/${id}/reviews`} className="text-sm text-muted-foreground underline hover:no-underline">No reviews yet</Link>
        </div>
      )}
    </div>
  )
}

export default ReviewSummaryItem;