import React from 'react';
import Link from 'next/link';

import { RoleTypes } from '@/types/index';
import ReviewScore from './ReviewScore';
import LogInButton from '../LogInButton';
const ReviewOwnScoreItem = ({
  movieId,
  role,
  score,
  title = 'Score'
}: {
  movieId: string,
  role: RoleTypes | undefined,
  score: number | undefined,
  title?: string
}) => {
  if (role === 'ADMIN') return; 
  const link = role ? (
    <Link 
      href={role === 'CRITIC' ? `/movies/${movieId}/critic-reviews` : `/movies/${movieId}/user-reviews`} 
      className="text-sm text-muted-foreground underline hover:no-underline"
    >
      {score !== undefined ? `Go to edit as a ` : `Go to write as a `}<span className="text-success">{role}</span>
    </Link>
  ) : (
    <LogInButton variant={'link'} text={'Log in to be able to leave reviews'} className="text-muted-foreground underline-offset-1 h-auto flex gap-0 font-normal p-0 underline hover:no-underline" />
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