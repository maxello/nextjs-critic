import Breadcrumbs from '@/components/Breadcrumbs';
import { fetchMovieById } from '@/lib/actions/movie';
import React, { Suspense } from 'react';
import MovieSummary from '@/components/movies/MovieSummary';
import Reviews from '@/components/review/Reviews';
import ReviewSummary from '@/components/review/ReviewSummary';
import { ReviewsSkeleton, ReviewSummarySkeleton } from '@/components/skeletons';
import VideoComponent from '@/components/VideoComponent';

export default async function MoviePage({
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
      label: movie.title
    },
  ]
  
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="py-6">
        <div className="grid gap-y-12 sm:gap-x-8 grid-cols-6 mb-8">
          <div className="col-span-6 w-full lg:col-span-4 aspect-video rounded-xl overflow-hidden border border-border shadow flex items-center">
            <VideoComponent path={movie.videoUrl} />
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2 lg:px-6">
            <h1 className="text-2xl font-bold mb-8">{movie.title}</h1>
            <Suspense fallback={<ReviewSummarySkeleton />}>
              <ReviewSummary id={id} />
            </Suspense>
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-4">
            <MovieSummary {...movie} />
          </div>
          <div className="col-span-6 md:col-span-3">
            <Suspense fallback={<ReviewsSkeleton />}>
              <Reviews title={'Critic Reviews'} categoryId={id} role={'CRITIC'} link={`/movies/${id}/critic-reviews`} />
            </Suspense>
          </div>
          <div className="col-span-6 md:col-span-3">
            <Suspense fallback={<ReviewsSkeleton />}>
              <Reviews title={'User Reviews'} categoryId={id} role={'USER'} link={`/movies/${id}/user-reviews`} />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  )
}
