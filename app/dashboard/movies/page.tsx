import { fetchMoviesPages } from '@/lib/data';
import Breadcrumbs from '@/components/Breadcrumbs';
import MoviesTable from '@/components/movies/MoviesTable';
import Pagination from '@/components/Pagination';
import Search from '@/components/Search';
import React, { Suspense } from 'react';

export default async function DashboardMoviesPage(props: {
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
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumbs breadcrumbs={[
        {
          label: 'Dashboard',
          href: '/dashboard'
        },
        {
          label: 'Movies'
        }
      ]}
      />
      <h2 className="text-4xl font-bold uppercase mb-6">Movies</h2>
      <Search placeholder="Search movies..." />
      <Suspense fallback={<div>Loading...</div>}>
        <MoviesTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}
