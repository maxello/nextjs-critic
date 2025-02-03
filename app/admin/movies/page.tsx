

import React, { Suspense } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import FilterableMovieTable from '@/components/admin/FilterableMovieTable';
export default function AdminMoviesPage(
  props: {
    searchParams?: Promise<{
      query?: string;
      page?: string;
    }>;
  }
) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
      <Suspense fallback={
        <div className="w-full flex flex-col border border-border rounded-xl p-6">
          <Skeleton className="h-6 w-[150px] mb-2 mt-2" />
          <Skeleton className="h-4 w-[200px] mb-6" />
          <Skeleton className="h-9 w-full max-w-[400px] mb-6" />
        </div>
      }>
        <FilterableMovieTable searchParams={props.searchParams} />
      </Suspense>
    </div>
  )
}