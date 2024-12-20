import { MovieProps } from '@/app/lib/definitions'
import React from 'react'
import Image from "next/image";
export default function MovieDetails({
  movie
}: {
  movie: MovieProps
}) {
  return (
    <div className="mb-6">
      <h2 className="text-4xl font-bold uppercase mb-6">{movie.title}</h2>
      <Image
        alt={movie.title}
        src={movie.thumbnail}
        width={200}
        height={300}
        className="aspect-[2/3] object-contain"
      />
    </div>
  )
}
