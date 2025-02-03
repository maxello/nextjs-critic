import { fetchMovieById } from '@/lib/actions/movie';
import React, { Suspense } from 'react';
// import VideoComponent from '../VideoComponent';
import { Movie } from '@/types/index';
// import { Slider } from "@/components/ui/slider";
import MovieSummary from '@/components/movies/MovieSummary';
import Reviews from '@/components/review/Reviews';
import ReviewSummary from '../review/ReviewSummary';
import { ReviewSummarySkeleton } from '../skeletons';

export default async function MovieDetails({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const movie: Movie = await fetchMovieById(id);
  return (
    <>
      <div className="grid gap-4 lg:grid-cols-6 mb-8">
        <div className="lg:col-span-4 aspect-video rounded-xl overflow-hidden border border-border shadow flex items-center">
          {/* <VideoComponent path={movie.videoUrl} /> */}
        </div>
        <div className="lg:col-span-2 py-6 lg:px-6">
          <h1 className="text-2xl font-bold mb-8">{movie.title}</h1>
            <Suspense fallback={<ReviewSummarySkeleton />}>
              <ReviewSummary id={id} />
            </Suspense>
            {/* <div className="text-center">
              <Button asChild>
                <Link href={`/movies/${id}/user-reviews`}>Add My Review</Link>
              </Button>
            </div> */}
        </div>
        <MovieSummary {...movie} />
      </div>

      <div className="grid gap-8 md:gap-4 md:grid-cols-6">
        <div className="md:col-span-3">
          <Suspense fallback={<div>Loading...</div>}>
            <Reviews title={'Critic Reviews'} categoryId={id} role={'CRITIC'} />
          </Suspense>
        </div>
        <div className="md:col-span-3">
          <Suspense fallback={<div>Loading...</div>}>
            <Reviews title={'User Reviews'} categoryId={id} role={'USER'} />
          </Suspense>
        </div>
      </div>
    </>
  )
}
