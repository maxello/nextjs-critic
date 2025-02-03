"use server";
import { eq, ilike, desc, count, and, avg } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/database/drizzle";
import { movies, movieReviews } from "@/database/schema";
// import { redirect } from 'next/navigation';
import { users } from "@/database/schema";
import { RoleTypes } from "@/types/index";

export async function fetchMoviesPages(query: string, itemsPerPage: number) {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    const itemsCount = await db
    .select({ count: count() })
    .from(movies)
    .where(ilike(movies.title, `%${query}%`))
    const totalPages = Math.ceil(Number(itemsCount[0].count) / itemsPerPage);
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

export async function deleteMovie(
  id: string
) {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    await db.delete(movies).where(eq(movies.id, id));
    revalidatePath('/admin/movies');
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch movie.');
  }
}

export async function fetchMovieReviews(movieId: string, role: RoleTypes) {
  
  console.log('Fetching reviews data...');
  await new Promise((resolve) => setTimeout(resolve, 3000));
  
  try {
    const reviewsResponse = await db
      .select({
        id: movieReviews.id,
        text: movieReviews.text,
        createdAt: movieReviews.createdAt,
        fullName: users.fullName,
        score: movieReviews.score
      })
      .from(movieReviews)
      .leftJoin(users, eq(users.id, movieReviews.userId))
      .where(
        and(
          eq(movieReviews.movieId, movieId),
          eq(movieReviews.role, role)
        )
      )
      .orderBy(desc(movieReviews.createdAt));
    return reviewsResponse;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch movies.');
  }
}

export async function fetchMovieReviewSummary(movieId: string, role: RoleTypes) {
  const movieReviewStatistics = await db.select({
    averageScore: avg(movieReviews.score).mapWith(Number),
    totalReviews: count()
  })
  .from(movieReviews)
  .where(
    and(
      eq(movieReviews.movieId, movieId),
      eq(movieReviews.role, role)
    )
  )
  return movieReviewStatistics[0];
}

export async function fetchMovieOwnScore(movieId: string, userId: string) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const movieOwnScore = await db.select({
    role: movieReviews.role,
    score: movieReviews.score,
  })
  .from(movieReviews)
  .where(
    and(
      eq(movieReviews.movieId, movieId),
      eq(movieReviews.userId, userId)
    )
  )

  return movieOwnScore.length ? movieOwnScore[0] : { score: null };
}

// export async function fetchMovieReviewSummary(movieId: string) {
//   const movieReviewStatistics = await db.select({
//     type: movieReviews.type,
//     averageScore: avg(movieReviews.score),
//     totalReviews: count()
//   })
//   .from(movieReviews)
//   .where(eq(movieReviews.movieId, movieId))
//   .groupBy(movieReviews.type);
//   console.log("movieReviewStatistics", movieReviewStatistics);
//   return movieReviewStatistics[0];
// }

