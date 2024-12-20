import React, { Suspense } from 'react'
import { fetchMoviesPages } from '../lib/data';
import Breadcrumbs from '../ui/Breadcrumbs'
import MoviesList from '../ui/movies/MoviesList'
import Pagination from '../ui/Pagination';
import Search from '../ui/Search';
import { MoviesListSkeleton } from '../ui/skeletons';

export default async function MoviesPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchMoviesPages(query);
  return (
    <>
      <Breadcrumbs breadcrumbs={[
          {
            label: 'Home',
            href: '/'
          },
          { 
            label: 'Movies'
          }
        ]} 
      />
      <h2 className="text-4xl font-bold uppercase mb-6">Movies</h2>
      <Search placeholder="Search movies..." />
      <Suspense fallback={<MoviesListSkeleton />}>
        <MoviesList query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  )
}
