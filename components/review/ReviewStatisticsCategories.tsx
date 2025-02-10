import React from 'react';
import { getPercentageValues } from '@/lib/utils';
import ReviewStatisticsItem from './ReviewStatisticsItem';
const ReviewStatisticsCategories = ({
  positive,
  mixed,
  negative
}: {
  positive: number,
  mixed: number,
  negative: number
}) => {
  const {
    positiveP = 0,
    mixedP = 0, 
    negativeP = 0
  } = getPercentageValues(positive, mixed, negative);

  return (
    <div className="flex flex-col gap-3">
      <ReviewStatisticsItem status={'positive'} value={positive} percentageValue={positiveP} />
      <ReviewStatisticsItem status={'mixed'} value={mixed} percentageValue={mixedP} />
      <ReviewStatisticsItem status={'negative'} value={negative} percentageValue={negativeP} />
    </div>
  )
}

export default ReviewStatisticsCategories;