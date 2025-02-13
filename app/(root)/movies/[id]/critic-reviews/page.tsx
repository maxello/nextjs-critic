import Breadcrumbs from '@/components/Breadcrumbs';
// import ReviewFormDialog from '@/components/review/ReviewFormDialog';
import ReviewStatistics from '@/components/review/ReviewStatistics';
import { ReviewStatisticsSkeleton } from '@/components/skeletons';
import { fetchMovieById } from '@/lib/actions/movie';
import React, { Suspense } from 'react';
// import ReviewsList from '@/components/ReviewsList';

export default async function CriticReviewsPage({
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
      label: 'Critic Reviews'
    }
  ]
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h2 className="font-bebas-neue leading-none text-[4rem] md:text-[6rem] text-primary uppercase py-3 md:py-5">Critic Reviews</h2>
      <Suspense fallback={<ReviewStatisticsSkeleton />}>
        <ReviewStatistics id={movie.id} role={'CRITIC'} />
      </Suspense>
    </>
  )
}