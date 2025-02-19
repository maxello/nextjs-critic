import React from 'react';
import Link from 'next/link';

import { RoleTypes } from '@/types/index';
import ReviewScore from './ReviewScore';
const ReviewOwnScoreItem = ({
  movieId,
  role,
  score,
  title = 'Score'
}: {
  movieId: string,
  role: RoleTypes | null,
  score: number | undefined,
  title?: string
}) => {
  const link = role ? (
    <Link 
      href={role === 'CRITIC' ? `/movies/${movieId}/critic-reviews` : `/movies/${movieId}/user-reviews`} 
      className="text-sm text-muted-foreground underline hover:no-underline"
    >
      {score !== undefined ? `Go to edit as a ` : `Go to write as a `}<span className="text-success">{role}</span>
    </Link>
  ) : (
    <Link 
      href={'/sign-in'} 
      className="text-sm text-muted-foreground underline hover:no-underline"
    >
      Log in to be able to leave reviews
    </Link>
  )
  return (
    <div className="flex items-center space-x-4">
      <ReviewScore score={score} />
      <div>
        <p className="text-sm font-medium leading-none mb-0.5">{title}</p>
        {link}
      </div>
    </div>
  )
}

export default ReviewOwnScoreItem;