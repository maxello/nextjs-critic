import React from 'react';
import Link from 'next/link';
import { getScoreClasses } from '@/lib/utils';

const ReviewSummaryItem = ({
  id,
  totalReviews,
  averageScore,
  title = 'Score',
}: {
  id: string,
  totalReviews: number,
  averageScore: number,
  title: string,
}) => {
  console.log("averageScore", averageScore);
  return (
    <div className="flex items-center space-x-4">
      {totalReviews && averageScore ? (
        <>
          <div className="relative flex h-12 w-12 md:h-14 md:w-14 shrink-0 overflow-hidden rounded-full">
            <div className={`${getScoreClasses(averageScore)} aspect-square h-full w-full text-white flex items-center justify-center text-xl md:text-2xl font-bold`}>{averageScore === 10 ? averageScore : averageScore.toFixed(1)}</div>
          </div>
          <div>
            <p className="text-sm font-medium leading-none">{title}</p>
            <Link href={`/movies/${id}/reviews`} className="text-sm text-muted-foreground underline hover:no-underline">Based on {totalReviews} Critic Review{totalReviews > 1 ? 's' : ''}</Link>
          </div>
        </>
      ) : (
        <div className="flex items-center space-x-4">
          <div className="relative flex h-12 w-12 md:h-14 md:w-14 shrink-0 overflow-hidden rounded-full border border-primary">
            <div className="aspect-square h-full w-full text-white flex items-center justify-center text-xl md:text-2xl font-bold"></div>
          </div>
          <div>
            <p className="text-sm font-medium leading-none mb-0.5">{title}</p>
            <Link href={`/movies/${id}/reviews`} className="text-sm text-muted-foreground underline hover:no-underline">No reviews yet</Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReviewSummaryItem;