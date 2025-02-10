import FilterableCategoryList from '@/components/FilterableCategoryList';
import React, { Suspense } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { MoviesListSkeleton } from '@/components/skeletons';
import { fetchFilteredMovies, fetchMoviesPages } from '@/lib/actions/movie';
import Breadcrumbs from '@/components/Breadcrumbs';
export default async function MoviesPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>
}) {
  const ITEMS_PER_PAGE = 6;
  const breadcrumbs = [
    { 
      label: 'Movies'
    }
  ]
  const searchParams = await props.searchParams;
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h2 className="font-bebas-neue leading-none text-[4rem] md:text-[6rem] text-primary uppercase py-3 md:py-5">Movies</h2>
      <Suspense fallback={
        <>
          <Skeleton className="h-9 w-full max-w-[400px] mb-8" />
          <MoviesListSkeleton />
        </>
      }>
        <FilterableCategoryList 
          searchParams={searchParams} 
          itemsPerPage={ITEMS_PER_PAGE} 
          fetchMoviesPages={fetchMoviesPages} 
          fetchFilteredMovies={fetchFilteredMovies}
          placeholder="movies"
        />
      </Suspense>
    </>
  )
}
