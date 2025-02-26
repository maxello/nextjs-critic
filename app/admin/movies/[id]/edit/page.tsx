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
import Breadcrumbs from '@/components/Breadcrumbs';
import Portal from '@/components/admin/Portal';

const EditMoviePage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params;
  const movie: Movie = await fetchMovieById(id);
  const breadcrumbs = [
    { 
      label: 'Movies',
      href: '/admin/movies'
    },
    { 
      label: `${movie.title}`,
    }
  ]
  return (
    <>
      <Portal place={'admin-breadcrumbs'}>
        <Breadcrumbs breadcrumbs={breadcrumbs} home={'/admin'} />
      </Portal>
      <Card className="max-w-[500px] mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">Edit movie</CardTitle>
          <CardDescription>Sub title here</CardDescription>
        </CardHeader>
        <CardContent>
          <MovieForm type={'update'} movie={movie} />
        </CardContent>
      </Card>
    </>
  )
}

export default EditMoviePage;