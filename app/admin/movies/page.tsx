

import React, { Suspense } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import FilterableMovieTable from '@/components/admin/FilterableMovieTable';
import Breadcrumbs from '@/components/Breadcrumbs';
import Portal from '@/components/admin/Portal';
export default async function AdminMoviesPage(
  props: {
    searchParams?: Promise<{
      query?: string;
      page?: string;
    }>;
  }
) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const ITEMS_PER_PAGE = 8;
  const breadcrumbs = [
    { 
      label: 'Movies'
    }
  ]
  
  return (
    <>
      <Portal place={'admin-breadcrumbs'}>
        <Breadcrumbs breadcrumbs={breadcrumbs} home={'/admin'} />
      </Portal>
      <div className="mx-auto w-full max-w-6xl">
        <Suspense fallback={
          <div className="w-full flex flex-col border border-border rounded-xl p-6">
            <Skeleton className="h-6 w-[150px] mb-2 mt-2" />
            <Skeleton className="h-4 w-[200px] mb-6" />
            <Skeleton className="h-9 w-full max-w-[400px] mb-6" />
          </div>
        }>
          <FilterableMovieTable query={query} currentPage={currentPage} itemsPerPage={ITEMS_PER_PAGE}/>
        </Suspense>
      </div>
    </>
  )
}