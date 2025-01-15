import { fetchMovieById } from '@/lib/data';
import React from 'react'
import Breadcrumbs from '../Breadcrumbs';
import MovieDetails from './MovieDetails';
import Link from 'next/link';

export default async function Movie({
  id
}: {
  id: string
}) {
  const movie = await fetchMovieById(id);
  console.log("movie", movie);
  return (
    <>
      <Breadcrumbs breadcrumbs={[
          {
            label: 'Home',
            href: '/'
          },
          { 
            label: 'Movies',
            href: '/movies'
          },
          { 
            label: `${movie.title}`
          }
        ]} 
      />
      <MovieDetails movie={movie} />
      <Link href={`/movies/${id}/critic-reviews`} className="block mb-3 hover:opacity-80 underline uppercase">Critic Reviews (no template)</Link>
      <Link href={`/movies/${id}/user-reviews`} className="block hover:opacity-80 underline uppercase">User Reviews</Link>
    </>
  )
}
