import FilterableCategoryList from '@/components/FilterableCategoryList';
import React, { Suspense } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { MoviesListSkeleton } from '@/components/skeletons';
import { fetchFilteredMovies, fetchMoviesPages } from '@/lib/actions/movie';
export default async function MoviesPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>
}) {
  const ITEMS_PER_PAGE = 6;
  return (
    <>
      <h2 className="font-bebas-neue text-[6rem] leading-tight text-primary uppercase">Movies</h2>
      <Suspense fallback={
        <>
          <Skeleton className="h-9 w-full max-w-[400px] mb-8" />
          <MoviesListSkeleton />
        </>
      }>
        <FilterableCategoryList 
          searchParams={props.searchParams} 
          itemsPerPage={ITEMS_PER_PAGE} 
          fetchMoviesPages={fetchMoviesPages} 
          fetchFilteredMovies={fetchFilteredMovies}
          placeholder="movies"
        />
      </Suspense>
    </>
  )
}
