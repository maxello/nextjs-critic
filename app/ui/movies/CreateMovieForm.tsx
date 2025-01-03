// import { customerField } from '@/app/lib/definitions';
import { createMovie } from '@/app/lib/actions';
 
export default function CreateMovieForm() {
  return (
    <form action={createMovie}></form>
  )
}