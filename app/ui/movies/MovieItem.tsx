import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { MovieProps } from '@/app/lib/definitions';

export default function MovieItem({movie}: {movie: MovieProps}) {
  return (
    <Link href={`/movies/${movie.id}`} className="relative group flex flex-col">
      <div className="block overflow-hidden rounded-t-md border border-slate-300 dark:border-slate-600">
        <Image
          alt={movie.title}
          src={movie.thumbnail}
          width={200}
          height={300}
          className="w-full aspect-[2/3] bg-slate-200 transition-transform duration-[2.5s] ease-linear lg:hover:scale-110 object-contain"
        />
      </div>
      <div className="border border-slate-300 dark:border-slate-600 border-t-0 p-4 rounded-b-md grow flex flex-col justify-between">
        <h3 className="text-sm font-bold md:text-md lg:text-lg">
          {movie.title}
        </h3>
        <p className="mt-1 text-xs text-slate-500 uppercase">May 28, 1998</p>
      </div>
    </Link>
  )
}
