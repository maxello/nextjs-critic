
import React from 'react';
import MovieForm from '@/components/admin/forms/MovieForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Breadcrumbs from '@/components/Breadcrumbs';
import Portal from '@/components/admin/Portal';

const NewMoviePage = () => {
  const breadcrumbs = [
    { 
      label: 'Movies',
      href: '/admin/movies'
    },
    { 
      label: 'Add movie',
    }
  ]

  
  return (
    <>
      <Portal place={'admin-breadcrumbs'}>
        <Breadcrumbs breadcrumbs={breadcrumbs} home={'/admin'} />
      </Portal>
      <Card className="max-w-[500px] mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Add movie</CardTitle>
        <CardDescription>Sub title here</CardDescription>
      </CardHeader>
      <CardContent>
        <MovieForm type={'create'} />
      </CardContent>
    </Card>
    </>
    
  )
}

export default NewMoviePage;