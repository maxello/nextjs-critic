'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
// import { sql } from '@vercel/postgres';
import { z } from 'zod';
// import { revalidatePath } from 'next/cache';
// import { redirect } from 'next/navigation';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

const FormSchema = z.object({
  id: z.string(),
  title: z.string(),
  director: z.string(),
  description: z.string(),
  images: z.array(z.string()),
  thumbnail: z.string(),
  created_at: z.string(),
  genre: z.array(z.string()),
  releaseYear: z.string(),
});
 
const CreateMovie = FormSchema.omit({ id: true, created_at: true });

export async function createMovie(formData: FormData) {
  console.log(formData, CreateMovie);
  // const { title, director, description, images, thumbnail, genre, releaseYear } = CreateMovie.parse({
  //   title: formData.get('title'),
  //   director: formData.get('director'),
  //   description: formData.get('description'),
  //   images: formData.get('images'),
  //   thumbnail: formData.get('thumbnail'),
  //   releaseYear: formData.get('releaseYear'),
  //   genre: formData.get('genre'),
  // });
  // await sql`
  //   INSERT INTO movies (title, director, description, images, thumbnail, genre, releaseYear)
  //   VALUES (${title}, ${director}, ${description}, ${images}, ${thumbnail}, ${genre}, ${releaseYear})
  // `;
  // revalidatePath('/dashboard/movies');
  // redirect('/dashboard/movies');
}