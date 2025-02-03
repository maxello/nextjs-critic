import React from 'react';
import Link from 'next/link';
import { getScoreClasses } from '@/lib/utils';
import { RoleTypes } from '@/types/index';

const ReviewOwnScoreItem = ({
  id,
  role,
  score,
  title = 'Score',
}: {
  id: string,
  role: RoleTypes,
  score: number,
  title: string,
}) => {
  return (
    <div className="flex items-center space-x-4">
      {role && score ? (
        <>
          <div className="relative flex h-12 w-12 md:h-14 md:w-14 shrink-0 overflow-hidden rounded-full">
            <div className={`${getScoreClasses(score)} aspect-square h-full w-full text-white flex items-center justify-center text-xl md:text-2xl font-bold`}>{score === 10 ? score : score.toFixed(1)}</div>
          </div>
          <div>
            <p className="text-sm font-medium leading-none">{title}</p>
            <Link href={`/movies/${id}/reviews`} className="text-sm text-muted-foreground underline hover:no-underline">You have a {role} role</Link>
          </div>
        </>
      ) : (
        <div className="flex items-center space-x-4">
          <div className="relative flex h-12 w-12 md:h-14 md:w-14 shrink-0 overflow-hidden rounded-full border border-primary">
            <div className="aspect-square h-full w-full text-white flex items-center justify-center text-xl md:text-2xl font-bold"></div>
          </div>
          <div>
            <p className="text-sm font-medium leading-none mb-0.5">{title}</p>
            <Link href={`/movies/${id}/reviews`} className="text-sm text-muted-foreground underline hover:no-underline">No reviews yet</Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReviewOwnScoreItem;