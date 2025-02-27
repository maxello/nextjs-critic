import React from 'react';
import { Badge } from "@/components/ui/badge";

const MovieSummary = (
  {
    description, 
    genres, 
    directedBy
  }: {
    description: string,
    genres: string[], 
    directedBy: string,
  }
) => {
  return (
    <>
      <h2 className="text-xl font-bold mb-4">Summary</h2>
      <div>
        <p className="mb-4 lg:mb-6">{description}</p>
        {genres?.length && (
          <div className="flex items-center gap-2 mb-4 lg:mb-6">
            {genres.map((genre) => (
              <Badge key={genre} className="capitalize">{genre}</Badge>
            ))}
          </div>
        )}
        <p>
          <strong>Directed By: </strong>
          {directedBy}
        </p>
      </div>
    </>
  )
}

export default MovieSummary;