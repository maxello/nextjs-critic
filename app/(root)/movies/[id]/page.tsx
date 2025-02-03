import MovieDetails from '@/components/movies/MovieDetails';
import React from 'react'

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  return (
    <div className="py-6">
      <MovieDetails params={params} />
    </div>
  )
}
