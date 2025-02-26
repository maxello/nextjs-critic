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
const FilterableMovieTable = async ({
  query,
  currentPage,
  itemsPerPage
} : {
  query: string;
  currentPage: number;
  itemsPerPage: number;
}) => {
  const totalPages = await fetchMoviesPages(query, itemsPerPage);
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
          <MoviesTable query={query} currentPage={currentPage} itemsPerPage={itemsPerPage} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </CardContent>
    </Card>
  )
}

export default FilterableMovieTable;