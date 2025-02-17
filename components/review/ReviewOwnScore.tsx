import React from 'react';
import Link from 'next/link';

import { ReviewRoleProps } from '@/types/index';
import ReviewScore from './ReviewScore';
const ReviewOwnScoreItem = ({
  movieId,
  role,
  score,
  title = 'Score'
}: {
  movieId: string,
  role?: ReviewRoleProps,
  score?: number,
  title?: string
}) => {
  const linkText = (role && score !== undefined) ? `View reviews` : "No reviews yet";
  console.log("role", role);
  return (
    <div className="flex items-center space-x-4">
      <ReviewScore score={score} />
      <div>
        <p className="text-sm font-medium leading-none mb-0.5">{title}</p>
        <Link 
          href={role === 'CRITIC' ? `/movies/${movieId}/critic-reviews` : `/movies/${movieId}/user-reviews`} 
          className="text-sm text-muted-foreground underline hover:no-underline"
        >
          {linkText}
        </Link>
      </div>
    </div>
  )
}

export default ReviewOwnScoreItem;