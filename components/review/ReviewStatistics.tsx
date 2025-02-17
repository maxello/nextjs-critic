import React from 'react';
import ReviewScore from './ReviewScore';
import ReviewStatisticsCategories from './ReviewStatisticsCategories';
import { fetchMovieReviewStatistics } from '@/lib/actions/movie';
import { getScoreLevel } from '@/lib/utils';
import { ReviewRoleProps } from '@/types';

const ReviewStatistics = async ({
  id,
  role
}: {
  id: string,
  role: ReviewRoleProps
}) => {
  const counts = await fetchMovieReviewStatistics(role, id);
  return (
    <>
      {counts?.average > 0 && (
        <div className="border bg-card text-card-foreground shadow p-4 md:p-6 rounded-xl grid md:grid-cols-2 gap-4 mb-8">
          <div className="flex items-center">
            <ReviewScore score={counts.average} isLarge={true} decimalPlaces={1} />
            <div className="ml-4 md:ml-5">
              <h5 className="font-bebas-neue text-2xl md:text-3xl text-muted-foreground uppercase font-bold tracking-widest">Score</h5>
              <p className="font-medium text-sm">Most <span className="capitalize">{getScoreLevel(counts.average)}</span></p>
            </div>
          </div>
          <ReviewStatisticsCategories {...counts} />
        </div>
      )}
    </>
  )
}

export default ReviewStatistics;