import React, { Suspense } from 'react';
import { fetchMoviesPages } from '@/lib/actions/movie';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import MoviesTable from '@/components/admin/MoviesTable';
import Pagination from '@/components/Pagination';
import Search from '@/components/Search';
import { Skeleton } from "@/components/ui/skeleton";
const FilterableMovieTable = async (props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const ITEMS_PER_PAGE = 8;
  const totalPages = await fetchMoviesPages(query, ITEMS_PER_PAGE);
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 className="text-2xl">Movies</h2>
        </CardTitle>
        <CardDescription>Manage your movies</CardDescription>
      </CardHeader>
      <CardContent>
        <Search placeholder="Search movies..." />
        <Suspense fallback={
          <div className="w-full flex flex-col mb-4">
            <Skeleton className="h-9 w-full rounded-none mb-1" />
            <Skeleton className="h-9 w-full rounded-none mb-1" />
            <Skeleton className="h-9 w-full rounded-none mb-1" />
            <Skeleton className="h-9 w-full rounded-none mb-1" />
        </div>
        }>
          <MoviesTable query={query} currentPage={currentPage} itemsPerPage={ITEMS_PER_PAGE} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </CardContent>
    </Card>
  )
}

export default FilterableMovieTable;