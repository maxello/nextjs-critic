import React from 'react';
import Link from "next/link";
import config from "@/lib/config";
import Image from "next/image";

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
  const src = config.env.imagekit.urlEndpoint + thumbnail;
  return (
    <Link href={`/movies/${id}`} className="relative group overflow-hidden aspect-[2/3] rounded-md">
      <Image
        alt={title}
        src={src}
        width={200}
        height={300}
        priority={true}
        className="h-full w-full flex absolute transition-transform duration-[2.5s] ease-linear lg:hover:scale-110 object-cover"
      />
      <div className="h-full w-full flex items-end absolute bg-gradient-to-t from-[#1D1D1D] to-60% to-transparent">
        <div className="p-3 w-full text-white">
          <h3 className="text-sm font-bold md:text-md lg:text-lg">
            {title}
          </h3>
          <p className="mt-1 text-xs uppercase">{releaseYear}</p>
        </div>
      </div>
    </Link>
  )
}
