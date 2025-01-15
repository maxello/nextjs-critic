import { fetchFilteredMovies } from '@/lib/data';
import { MovieProps } from '@/lib/definitions';
import React from 'react'
import MovieItem from './MovieItem';

export default async function MoviesList({
  query, 
  currentPage
}: {
  query: string;
  currentPage: number;
}): Promise<React.JSX.Element> {
  const movies: MovieProps[] = await fetchFilteredMovies(query, currentPage);
  return (
    <>
    {movies.length > 0 ? (
      <div className="grid grid-cols-2 gap-x-2 sm:gap-x-4 lg:gap-x-6 gap-y-10 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 mb-6 lg:mb-12 max-w-[300px] mx-auto md:mx-0 sm:max-w-full">
        {movies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </div>
    ) : (
      <div className="max-w-[400px] text-center">
        {query ? (
          <span>No products found for your request.</span>
        ) : (
          <span>There are no movies.</span>
        )}
      </div>
    )}
    </>
  )
}
