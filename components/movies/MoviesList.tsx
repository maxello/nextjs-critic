// import { fetchFilteredMovies } from '@/lib/data';
import { Movie } from '@/types/index';
import React from 'react'
import MovieItem from './MovieItem';

export default function MoviesList({
  movies,
  query
}: {
  movies: Movie[],
  query: string
}) {
  return (
    <>
    {movies.length > 0 ? (
      <div className="grid grid-cols-2 gap-x-2 sm:gap-x-4 lg:gap-x-6 gap-y-10 sm:grid-cols-4 md:grid-cols-5 mb-6 lg:mb-12 mx-auto md:mx-0 sm:max-w-full">
        {movies.map((movie) => (
          <MovieItem key={movie.id} {...movie} />
        ))}
      </div>
    ) : (
      <div className="max-w-[400px] text-muted-foreground">
        {query ? (
          <span>No movies found for your request.</span>
        ) : (
          <span>There are no movies.</span>
        )}
      </div>
    )}
    </>
  )
}
