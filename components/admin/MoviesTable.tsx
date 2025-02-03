import { fetchFilteredMovies } from '@/lib/actions/movie';
import { Movie } from '@/types/index';
import React from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption
} from "@/components/ui/table";
import MovieTableRow from './MovieTableRow';
export default async function MoviesTable({
  query,
  currentPage,
  itemsPerPage,
}: {
  query: string;
  currentPage: number;
  itemsPerPage: number;
}): Promise<React.JSX.Element> {
  const movies = await fetchFilteredMovies(query, currentPage, itemsPerPage) as Movie[];
  return (
    <Table>
      {!movies?.length && (
        <TableCaption>There are no movies for your request.</TableCaption>
      )}
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Director</TableHead>
          <TableHead className="text-right w-[60px]">Edit</TableHead>
          <TableHead className="text-right w-[60px]">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {movies?.map((movie) => (
          <MovieTableRow key={movie.id} item={movie} />
        ))}
      </TableBody>
    </Table>
  )
}
