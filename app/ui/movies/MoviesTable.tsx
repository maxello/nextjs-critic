import { fetchFilteredMovies } from '@/app/lib/data';
import { MovieProps } from '@/app/lib/definitions';
import React from 'react'

export default async function MoviesTable({
  query, 
  currentPage
}: {
  query: string;
  currentPage: number;
}): Promise<React.JSX.Element> {
  const movies: MovieProps[] = await fetchFilteredMovies(query, currentPage);
  console.log("MOVIES", movies);
  return (
    <div
        className="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
      >
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Movie
              </th>
              <th
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Year
              </th>
              <th
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Director
              </th>
              <th
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Edit
              </th>
              <th
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {movies?.map((movie) => (
              <tr key={movie.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{movie.title}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{movie.releaseYear}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{movie.director}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-full">
                  Edit
                </button>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                  Delete
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        { !movies?.length && (
        <div className="text-center p-2">
          {query ? (
            <span>No products found for your request.</span>
          ) : (
            <span>There are no movies.</span>
          )}
          </div>
        )}
        </div>
  )
}
