import React from 'react';
import Link from 'next/link';

import { RoleTypes } from '@/types/index';
import ReviewScore from './ReviewScore';
const ReviewOwnScoreItem = ({
  id,
  role,
  score,
  title = 'Score',
}: {
  id: string,
  role?: RoleTypes,
  score: number | null,
  title: string,
}) => {
  return (
    <div className="flex items-center space-x-4">
      <ReviewScore score={score} />
      {role && score !== null ? (
        <div>
          <p className="text-sm font-medium leading-none">{title}</p>
          <Link href={`/movies/${id}/reviews`} className="text-sm text-muted-foreground underline hover:no-underline">You have a {role} role</Link>
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

export default ReviewOwnScoreItem;