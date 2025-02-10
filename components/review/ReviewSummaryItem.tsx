import React from 'react';
import Link from 'next/link';
import ReviewScore from './ReviewScore';

const ReviewSummaryItem = ({
  totalReviews,
  averageScore,
  title = 'Score',
  link
}: {
  totalReviews: number,
  averageScore: number | null,
  title: string,
  link: string
}) => {
  const linkText = (totalReviews && averageScore !== null) ? `Based on ${totalReviews} Review${totalReviews > 1 ? 's' : ''}` : "No reviews yet";
  return (
    <div className="flex items-center space-x-4">
      <ReviewScore score={averageScore} />
      <div>
        <p className="text-sm font-medium leading-none mb-0.5">{title}</p>
        <Link href={link} className="text-sm text-muted-foreground underline hover:no-underline">{linkText}</Link>
      </div>
    </div>
  )
}

export default ReviewSummaryItem;