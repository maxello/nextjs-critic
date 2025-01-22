"use server";

import { movies } from "@/database/schema";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
import { MovieParams } from "@/types/index";

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
    const movie = await db
      .update(movies)
      .set({
        ...params
      })
      .where(eq(movies.id, id))
      console.log("movie", movie);
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