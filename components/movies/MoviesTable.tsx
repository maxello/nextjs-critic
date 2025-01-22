import { fetchFilteredMovies } from '@/lib/actions/movie';
import { Movie } from '@/types';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react"
import {
  Card,
  CardContent
} from "@/components/ui/card"
import Link from 'next/link';
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
    <div>
    <Card>
      <CardContent>
        <Table className="mt-6">
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
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
              <TableRow key={movie.id}>
                <TableCell className="font-medium">{movie.title}</TableCell>
                <TableCell>{movie.releaseYear}</TableCell>
                <TableCell>{movie.director}</TableCell>
                <TableCell className="text-right">
                  <Button asChild size="icon" variant="secondary">
                    <Link href={`/admin/movies/${movie.id}/edit`} aria-label="Edit">
                      <Pencil />
                    </Link>
                  </Button>
                </TableCell>
                <TableCell className="text-right">
                  <Button asChild size="icon" variant="destructive">
                    <Link href={`/admin/movies/${movie.id}/delete`} aria-label="Delete">
                      <Trash2 />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </CardContent>
      </Card>
        
        </div>
  )
}
