import Breadcrumbs from '@/components/Breadcrumbs';
import ReviewDialog from '@/components/review/ReviewDialog';
import ReviewStatistics from '@/components/review/ReviewStatistics';
import { ReviewStatisticsSkeleton } from '@/components/skeletons';
import { fetchMovieById } from '@/lib/actions/movie';
import React, { Suspense } from 'react';

export default async function UserReviewsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const movie = await fetchMovieById(id);
  const breadcrumbs = [
    {
      label: 'Movies',
      href: `/movies`
    },
    {
      label: movie.title,
      href: `/movies/${movie.id}`
    },
    {
      label: 'User Reviews'
    }
  ]
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h2 className="font-bebas-neue leading-none text-[4rem] md:text-[6rem] text-primary uppercase py-3 md:py-5">User Reviews</h2>
      <Suspense fallback={<ReviewStatisticsSkeleton />}>
        <ReviewStatistics id={movie.id} role={'USER'} />
      </Suspense>
      <ReviewDialog isOpen={false} />
    </>
  )
}
