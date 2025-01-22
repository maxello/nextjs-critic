"use server";
import { eq, ilike, desc } from "drizzle-orm";
// import { revalidatePath } from "next/cache";
import { db } from "@/database/drizzle";
import { movies } from "@/database/schema";
// import { redirect } from 'next/navigation';

export async function fetchMoviesPages(query: string, itemsPerPage: number) {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    const count = await db.$count(movies);
    const totalPages = Math.ceil(count / itemsPerPage);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of movies.');
  }
}

export async function fetchFilteredMovies(
  query: string,
  currentPage: number,
  itemsPerPage: number,
) {
  const offset = (currentPage - 1) * itemsPerPage;
  console.log('Fetching products data...');
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    const moviesResponse = await db
      .select()
      .from(movies)
      .where(ilike(movies.title, `%${query}%`))
      .orderBy(desc(movies.title))
      .limit(itemsPerPage)
      .offset(offset);
      console.log("moviesResponse", moviesResponse);
    return moviesResponse;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch movies.');
  }
}

export async function fetchMovieById(
  id: string
) {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    const movieResponse = await db
      .select().from(movies).where(eq(movies.id, id));
    return movieResponse[0];
  } catch (error) {
    // redirect('/admin/movies');
    console.error('Database Error:', error);
    throw new Error('Failed to fetch movie.');
  }
}
