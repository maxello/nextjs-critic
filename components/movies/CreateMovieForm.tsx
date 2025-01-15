// import { customerField } from '@/app/lib/definitions';
import { createMovie } from '@/lib/actions/movie';
 
export default function CreateMovieForm() {
  return (
    <form action={createMovie}></form>
  )
}