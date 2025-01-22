import React, { Suspense } from 'react'
// import { fetchMoviesPages } from '../../../lib/data';
// import Breadcrumbs from '@/components/Breadcrumbs'
import MoviesList from '@/components/movies/MoviesList'
import Pagination from '@/components/Pagination';
import Search from '@/components/Search';
import { MoviesListSkeleton } from '@/components/skeletons';
import { fetchMoviesPages } from '@/lib/actions/movie';

export default async function MoviesPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const ITEMS_PER_PAGE = 8;
  const totalPages = await fetchMoviesPages(query, ITEMS_PER_PAGE);
  return (
    <>
      {/* <Breadcrumbs breadcrumbs={[
          {
            label: 'Home',
            href: '/'
          },
          { 
            label: 'Movies'
          }
        ]} 
      /> */}
      <h2 className="font-bebas-neue text-[6rem] leading-tight text-primary uppercase mb-6">Movies</h2>
      <Search placeholder="Search movies..." />
      <Suspense fallback={<MoviesListSkeleton />}>
        <MoviesList query={query} currentPage={currentPage} itemsPerPage={ITEMS_PER_PAGE} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  )
}
