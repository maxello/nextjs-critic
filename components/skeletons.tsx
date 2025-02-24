import { Skeleton } from "@/components/ui/skeleton";

export function MovieItemSkeleton() {
  return (
    <div className="w-full aspect-[2/3] border border-border flex flex-col p-3 justify-end rounded-xl">
      <Skeleton className="h-6 w-[85%] mb-2" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
}

export function MoviesListSkeleton({
  amount = 5
}: {
  amount?: number
}) {
  return (
    <div className="grid grid-cols-2 gap-x-2 sm:gap-x-4 lg:gap-x-6 gap-y-6 sm:grid-cols-4 md:grid-cols-5 mb-6 lg:mb-12 mx-auto md:mx-0 sm:max-w-full">
      {Array(amount).fill(true, 0, amount).map((item, ind) => (<MovieItemSkeleton key={ind} />))}
    </div>
  )
}

export function ReviewSummaryItemSkeleton() {
  return (
    <div className="h-14 flex items-center space-x-4">
      <Skeleton className="relative flex h-12 w-12 md:h-14 md:w-14 shrink-0 overflow-hidden rounded-full" />
      <div className="w-full">
        <Skeleton className="h-5 w-[40%] mb-2" />
        <Skeleton className="h-3 w-[50%]" />
      </div>
    </div>
  )
}

export function ReviewSummarySkeleton() {
  return (
    <div className="mb-8">
      {Array(3).fill(true, 0, 3).map((item, ind) => (
        <div key={ind}>
          {ind > 0 && (
            <div className="shrink-0 bg-border h-[1px] w-full my-4"></div>
          )}
          <ReviewSummaryItemSkeleton />
        </div>
      ))}
    </div>
  )
}

export function ProductDetailsSkeleton() {
  return (
    <div className="relative">
      <div className="flex">
        <div className="h-5 w-20 bg-slate-200 mb-6 mr-3"></div><div className="h-5 w-20 bg-slate-200 mb-6"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6 lg:gap-x-8">
        <div className="mb-6">
          <div className="w-full max-w-[300px] mx-auto md:mx-0 lg:max-w-[500px] aspect-square rounded-md bg-slate-200 mb-4"></div>
        </div>
        <div className="mb-6">
          <div className="h-10 w-[50%] bg-slate-200 mb-4"></div>
          <div className="h-5 w-10 bg-slate-200 mb-4"></div>
          <div className="h-12 w-24 bg-slate-200 mb-4 rounded-md"></div>
          <div className="mb-4">
            <div className="h-5 w-full bg-slate-200 mb-2"></div>
            <div className="h-5 w-full bg-slate-200 mb-2"></div>
            <div className="h-5 w-full bg-slate-200"></div>
          </div>
          <div className="h-12 w-[30%] bg-slate-200 rounded-md"></div>
        </div>
      </div>
    </div>
  )
}

export function ReviewsSkeleton() {
  return (
    <div className="mb-8">
      <Skeleton className="h-6 w-[40%] mb-5" />
      {Array(3).fill(true, 0, 3).map((item, ind) => (
        <div key={ind}>
          <ReviewCardSkeleton />
        </div>
      ))}
    </div>
  )
}

export function ReviewsListSkeleton() {
  return (
    <div className="mb-8">
      {Array(3).fill(true, 0, 3).map((item, ind) => (
        <div key={ind}>
          <ReviewCardSkeleton />
        </div>
      ))}
    </div>
  )
}

export function ReviewCardSkeleton() {
  return (
    <div className="p-6 grid grid-cols-2 gap-y-7 items-center border border-border rounded-xl mb-4">
      <div className="flex items-center space-x-4">
        <Skeleton className="relative flex h-12 w-12 md:h-14 md:w-14 shrink-0 overflow-hidden rounded-full" />
        <Skeleton className="h-5 w-[50%]" />
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-4 w-[40%]" />
      </div>
      <div className="flex-col justify-end col-span-2">
        <Skeleton className="h-3 w-full mb-3" />
        <Skeleton className="h-3 w-full mb-3" />
        <Skeleton className="h-3 w-full mb-3" />
        <Skeleton className="h-3 w-full" />
      </div>
    </div>
  )
}

export function ReviewStatisticsSkeleton() {
  return (
    <div className="border border-border p-4 md:p-6 rounded-xl grid md:grid-cols-2 gap-4 mb-8">
      <div className="flex items-center">
        <Skeleton className="relative flex h-16 w-16 md:h-20 md:w-20 shrink-0 overflow-hidden rounded-full" />
        <div className="ml-4 md:ml-5 w-full">
          <Skeleton className="h-6 w-20 mb-2" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {Array(3).fill(true, 0, 3).map((item, ind) => (
          <div key={ind} className="grid grid-cols-12 items-center gap-x-4">
            <Skeleton className="h-6 w-[30%] lg:w-full lg:text-right col-span-12 lg:col-span-3 capitalize" />
            <div className="col-span-8 lg:col-span-7">
              <Skeleton className="h-2 w-full" />
            </div>
            <div className="col-span-4 lg:col-span-2 whitespace-nowrap flex gap-1">
              <Skeleton className="h-6 w-7" />
              <Skeleton className="h-6 w-10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}