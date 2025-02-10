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
  role?: RoleTypes | null,
  score?: number | null,
  title: string,
}) => {
  const linkText = (role && score !== null) ? `You have a ${role} role` : "No reviews yet";
  return (
    <div className="flex items-center space-x-4">
      <ReviewScore score={score} />
      <div>
        <p className="text-sm font-medium leading-none mb-0.5">{title}</p>
        <Link 
          href={role ? (`/movies/${id}/${role === 'CRITIC' ? 'critic-reviews' : 'user-reviews'}`) : '/sign-in'} 
          className="text-sm text-muted-foreground underline hover:no-underline"
        >
          {linkText}
        </Link>
      </div>
    </div>
  )
}

export default ReviewOwnScoreItem;