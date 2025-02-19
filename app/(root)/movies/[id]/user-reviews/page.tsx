import Breadcrumbs from '@/components/Breadcrumbs';
import Pagination from '@/components/Pagination';
import ReviewFormDialog from '@/components/review/ReviewFormDialog';
import ReviewStatistics from '@/components/review/ReviewStatistics';
import { ReviewsListSkeleton, ReviewStatisticsSkeleton } from '@/components/skeletons';
import { fetchMovieById, fetchMovieReviewByUserId, fetchMovieReviewsPages } from '@/lib/actions/movie';
import React, { Suspense } from 'react';
import ReviewsList from '@/components/review/ReviewsList';
import { ReviewScoreStatusProps, RoleTypes } from '@/types';
import { auth } from '@/auth';
import { fetchUserRoleById } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
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
  const itemsPerPage = 5;
  const role = 'USER';
  const totalPages = await fetchMovieReviewsPages(movie.id, role, itemsPerPage, filterBy);
  const session = await auth();
  const userId = session?.user?.id;
  const ownReview = userId ? await fetchMovieReviewByUserId(id, userId) : null;
  const userRole: RoleTypes | null = userId ? await fetchUserRoleById(userId) : null;
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h2 className="font-bebas-neue leading-none text-[4rem] md:text-[6rem] text-primary uppercase py-3 md:py-5">User Reviews</h2>
      {!userId && (
        <div className="flex items-center mb-8 space-x-3">
          <p className="mb-3 text-muted-foreground">To leave a review, please log in.</p>
          <Button asChild>
            <Link href={'/sign-in'}>Log in</Link>
          </Button>
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
