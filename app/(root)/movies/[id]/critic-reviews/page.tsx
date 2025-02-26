import Breadcrumbs from '@/components/Breadcrumbs';
import Pagination from '@/components/Pagination';
import ReviewFormDialog from '@/components/review/ReviewFormDialog';
import ReviewStatistics from '@/components/review/ReviewStatistics';
import { ReviewsListSkeleton, ReviewStatisticsSkeleton } from '@/components/skeletons';
import { fetchMovieById, fetchMovieReviewByUserId, fetchMovieReviewsPages } from '@/lib/actions/movie';
import React, { Suspense } from 'react';
import ReviewsList from '@/components/review/ReviewsList';
import { ReviewScoreStatusProps } from '@/types';
import { auth } from '@/auth';
import { fetchUserById } from '@/lib/actions';
import ReviewScoreStatusFilter from '@/components/review/ReviewScoreStatusFilter';
import LogInButton from '@/components/LogInButton';

export default async function CriticReviewsPage({
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
      label: 'Critic Reviews'
    }
  ]
  const itemsPerPage = 5;
  const role = 'CRITIC';
  const totalPages = await fetchMovieReviewsPages(movie.id, role, itemsPerPage, filterBy);
  const session = await auth();
  const userId = session?.user?.id;
  const ownReview = userId ? await fetchMovieReviewByUserId(id, userId) : null;
  const user = userId ? await fetchUserById(userId) : null;
  const userRole = user?.role;
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h2 className="font-bebas-neue leading-none text-[4rem] md:text-[6rem] text-primary uppercase py-3 md:py-5">Critic Reviews</h2>
        {!userId && (
          <div className="flex flex-col mb-8 items-start">
            <p className="mb-3 text-muted-foreground">To leave a review, please log in.</p>
            <LogInButton />
          </div>
        )}
        {userRole === role && (
          <div className="flex items-center mb-8 space-x-3">
            <ReviewFormDialog
              review={ownReview}
              id={movie.id}
              userId={userId}
              userRole={userRole}
            />
          </div>
        )}
      <Suspense fallback={<ReviewStatisticsSkeleton />}>
        <ReviewStatistics id={movie.id} role={role} />
      </Suspense>
      <div className="flex items-center mb-8 space-x-3 justify-start">
        <ReviewScoreStatusFilter />
      </div>
      <Suspense fallback={<ReviewsListSkeleton />} key={JSON.stringify(searchP)}>
        <ReviewsList 
          id={movie.id}
          role={role} 
          currentPage={currentPage} 
          itemsPerPage={itemsPerPage} 
          filterBy={filterBy}
          ownReviewId={ownReview?.id}
        />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  )
}
