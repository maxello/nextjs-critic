import React from 'react';
import MovieForm from '@/components/admin/forms/MovieForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const NewMoviePage = () => {
  return (
    <Card className="max-w-[500px] mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Add movie</CardTitle>
        <CardDescription>Sub title here</CardDescription>
      </CardHeader>
      <CardContent>
        <MovieForm type={'create'} />
      </CardContent>
    </Card>
  )
}

export default NewMoviePage;