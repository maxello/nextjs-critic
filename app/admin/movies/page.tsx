import { fetchMoviesPages } from '@/lib/actions/movie';
import MoviesTable from '@/components/movies/MoviesTable';
import Pagination from '@/components/Pagination';
import Search from '@/components/Search';
import React, { Suspense } from 'react';

export default async function AdminMoviesPage(props: {
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
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-4xl font-bold uppercase mb-6">Movies</h2>
      <Search placeholder="Search movies..." />
      <Suspense fallback={<div>Loading...</div>}>
        <MoviesTable query={query} currentPage={currentPage} itemsPerPage={ITEMS_PER_PAGE} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}