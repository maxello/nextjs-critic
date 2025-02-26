import React from 'react';
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from 'next/link';
import { Movie } from '@/types/index';
// import { deleteMovie } from '@/lib/admin/actions/movie';
import ConfirmDialog from './ConfirmDialog';

const MovieTableRow = ({item}: {item: Movie}) => {
  // const deleteMovieWithId = deleteMovie.bind(null, item.id);
  return (
    <TableRow key={item.id}>
      <TableCell className="font-medium">{item.title}</TableCell>
      <TableCell>{item.releaseYear}</TableCell>
      <TableCell>{item.directedBy}</TableCell>
      <TableCell className="text-right">
        <Button asChild size="icon" variant="secondary">
          <Link href={`/admin/movies/${item.id}/edit`} aria-label="Edit">
            <Pencil />
          </Link>
        </Button>
      </TableCell>
      <TableCell className="text-right">
        {/* <form action={deleteMovieWithId}> */}
          <ConfirmDialog itemId={item.id} />
          {/* <Button size="icon" variant="destructive" aria-label="Delete">
            <Trash2 />
          </Button> */}
        {/* </form> */}
      </TableCell>
    </TableRow>
  )
}

export default MovieTableRow;