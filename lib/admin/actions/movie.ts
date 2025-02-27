"use server";

import { movies } from "@/database/schema";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
import { MovieParams } from "@/types/index";
import { revalidatePath } from "next/cache";

export const createMovie = async (params: MovieParams) => {
  try {
    await db
      .insert(movies)
      .values(params)
      // .returning();

    return {
      success: true,
      // data: JSON.parse(JSON.stringify(newMovie[0])),
    };
    
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "An error occurred while creating the movie",
    };
  }
};

export const updateMovie = async (params: MovieParams, id: string) => {
  try {
    await db
      .update(movies)
      .set({
        ...params
      })
      .where(eq(movies.id, id))
    return {
      success: true,
      // data: JSON.parse(JSON.stringify(movie[0])),
    };
    
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "An error occurred while creating the movie",
    };
  }
};

export async function deleteMovie(
  id: string
) {
  try {
    await db.delete(movies).where(eq(movies.id, id));
    revalidatePath('/admin/movies');
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch movie.');
  }
}