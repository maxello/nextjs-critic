import React from 'react';
import MovieForm from '@/components/admin/forms/MovieForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchMovieById } from '@/lib/actions/movie';
import { Movie } from '@/types/index';

const EditMoviePage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params;
  const movie: Movie = await fetchMovieById(id);
  return (
    // <Suspense fallback={<div>Loading...</div>}>
      <Card className="max-w-[500px] mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">Edit movie</CardTitle>
          <CardDescription>Sub title here</CardDescription>
        </CardHeader>
        <CardContent>
          <MovieForm type={'update'} movie={movie} />
        </CardContent>
      </Card>
    // </Suspense>
  )
}

export default EditMoviePage;