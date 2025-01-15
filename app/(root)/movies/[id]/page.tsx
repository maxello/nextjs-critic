import Movie from '@/components/movies/Movie';
import React, { Suspense } from 'react'

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  return (
    <div className="py-6">
      <Suspense fallback={<div>Loading...</div>}>
        <Movie id={id} />
      </Suspense>
    </div>
  )
}
