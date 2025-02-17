import React from 'react';
import { getScoreLevel } from '@/lib/utils';
import { MessageSquareOff } from 'lucide-react';

const ReviewScore = ({
  score,
  isLarge = false,
  decimalPlaces = 0
}: {
  score: number | null | undefined,
  isLarge?: boolean,
  decimalPlaces?: number
}) => {
  const noScore = score === null || score === undefined;

  const sizeVariants = {
    regular: "w-12 h-12 md:w-14 md:h-14 text-xl md:text-[1.7rem]",
    large: "w-16 h-16 md:w-20 md:h-20 text-2xl md:text-3xl",
  }

  const colorVariants = {
    positive: "bg-success",
    mixed: "bg-warning",
    negative: "bg-danger",
  };

  return (
    <div className={`relative flex ${isLarge ? sizeVariants['large'] : sizeVariants['regular']} shrink-0 overflow-hidden rounded-full ${noScore ? 'border border-primary' : ''}`}>
      <div className={`${!noScore && colorVariants[getScoreLevel(score)]} aspect-square h-full w-full text-white flex items-center justify-center font-bold`}>
        {noScore ? <MessageSquareOff className="text-primary" strokeWidth={1.5} /> : (score === 10 ? score : score.toFixed(decimalPlaces))}
      </div>
    </div>
  )
}

export default ReviewScore;