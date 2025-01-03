import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { MovieProps } from '@/app/lib/definitions';

export default function MovieItem({movie}: {movie: MovieProps}) {
  return (
    <Link href={`/movies/${movie.id}`} className="relative group overflow-hidden aspect-[2/3] rounded-md">
      <Image
        alt={movie.title}
        src={movie.thumbnail}
        width={200}
        height={300}
        className="h-full w-full flex absolute transition-transform duration-[2.5s] ease-linear lg:hover:scale-110 object-cover"
      />
      <div className="h-full w-full flex items-end absolute bg-gradient-to-t from-[#1D1D1D] to-60% to-transparent">
        <div className="p-4 w-full text-white">
          <h3 className="text-sm font-bold md:text-md lg:text-lg">
            {movie.title}
          </h3>
          <p className="mt-1 text-xs uppercase">May 28, 1998</p>
        </div>
      </div>
    </Link>
  )
}
