import React from 'react';
import { getScoreLevel } from '@/lib/utils';

const ReviewScore = ({
  score
}: {
  score: number | null
}) => {
  const noScore = score === null;

  const colorVariants = {
    high: "bg-success",
    avarage: "bg-warning",
    low: "bg-danger"
  };

  return (
    <div className={`relative flex h-12 w-12 md:h-14 md:w-14 shrink-0 overflow-hidden rounded-full ${noScore ? 'border border-primary' : ''}`}>
      <div className={`${!noScore && colorVariants[getScoreLevel(score)]} aspect-square h-full w-full text-white flex items-center justify-center text-xl md:text-2xl font-bold`}>
        {noScore ? '' : (score === 10 ? score : score.toFixed(1))}
      </div>
    </div>
  )
}

export default ReviewScore;