import Breadcrumbs from '@/components/Breadcrumbs';
import Pagination from '@/components/Pagination';
import ReviewFormDialog from '@/components/review/ReviewFormDialog';
import ReviewStatistics from '@/components/review/ReviewStatistics';
import { ReviewsListSkeleton, ReviewStatisticsSkeleton } from '@/components/skeletons';
import { fetchMovieById, fetchMovieReviewsPages } from '@/lib/actions/movie';
import React, { Suspense } from 'react';
import ReviewsList from '@/components/review/ReviewsList';
import { ReviewScoreStatusProps } from '@/types';
import ReviewScoreStatusFilter from '@/components/review/ReviewScoreStatusFilter';

export default async function UserReviewsPage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>
  searchParams?: Promise<{
    page?: string;
    filterBy?: ReviewScoreStatusProps
  }>;
}) {
  const { id } = await params;
  const searchP = await searchParams;
  const currentPage = Number(searchP?.page) || 1;
  const filterBy = searchP?.filterBy || undefined;
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
  const itemsPerPage = 3;
  const totalPages = await fetchMovieReviewsPages(movie.id, 'USER', itemsPerPage, filterBy);
  console.log("totalPages--", totalPages);
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h2 className="font-bebas-neue leading-none text-[4rem] md:text-[6rem] text-primary uppercase py-3 md:py-5">User Reviews</h2>
      <Suspense fallback={<ReviewStatisticsSkeleton />}>
        <ReviewStatistics id={movie.id} role={'USER'} />
      </Suspense>
      <div className="flex items-center mb-8 space-x-3 justify-end">
        <ReviewScoreStatusFilter />
        <ReviewFormDialog isOpen={false} />
      </div>
      <Suspense fallback={<ReviewsListSkeleton />}>
        <ReviewsList id={movie.id} role={'USER'} currentPage={currentPage} itemsPerPage={itemsPerPage} filterBy={filterBy} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  )
}
