// Loading animation
const shimmer =
  'before:absolute z-[1] before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function MovieItemSkeleton() {
  return (
    <div className={`${shimmer} relative group flex flex-col overflow-hidden`}>
      <div className="block overflow-hidden rounded-t-md border border-slate-300 dark:border-slate-600">
        <div
          className="w-full aspect-[2/3] bg-slate-300 dark:bg-slate-600"
        />
      </div>
      <div className="border border-slate-300 dark:border-slate-600 border-t-0 p-4 rounded-b-md grow flex flex-col justify-between">
        <div className="mb-3 h-5 rounded-md bg-slate-300 dark:bg-slate-600"></div>
        <div className="h-4 rounded-md bg-slate-300 dark:bg-slate-600"></div>
      </div>
    </div>
  );
}

export function MoviesListSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-x-2 sm:gap-x-4 lg:gap-x-6 gap-y-10 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 mb-6 lg:mb-12 max-w-[300px] mx-auto md:mx-0 sm:max-w-full">
      {Array(5).fill(true, 0, 5).map((item, ind) => (<MovieItemSkeleton key={ind} />))}
    </div>
  )
}

export function ProductDetailsSkeleton() {
  return (
    <div className={`${shimmer} relative`}>
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