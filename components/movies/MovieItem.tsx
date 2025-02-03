import React from 'react';
import Link from "next/link";
import ImageComponent from '../ImageComponent';

export default function MovieItem({
  title, 
  thumbnail,
  id,
  releaseYear
}: {
  title: string, 
  thumbnail: string, 
  id: string,
  releaseYear: number
}) {
  return (
    <Link href={`/movies/${id}`} className="relative group overflow-hidden aspect-[2/3] rounded-md">
      <ImageComponent
        width={200}
        height={300}
        path={thumbnail}
        alt={title}
        cls="h-full w-full flex absolute aspect-[2/3] lg:group-hover:scale-110 object-cover ease-linear transition-transform duration-1000"
      />
      <div className="h-full w-full flex items-end absolute bg-gradient-to-t from-[#1D1D1D] to-60% to-transparent">
        <div className="p-3 w-full text-white">
          <h3 className="text-sm font-bold md:text-md lg:text-lg mb-1">
            {title}
          </h3>
          <p className="text-xs uppercase">{releaseYear}</p>
        </div>
      </div>
    </Link>
  )
}
