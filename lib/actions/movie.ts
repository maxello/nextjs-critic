"use server";
import { eq, ilike, desc, count, and, avg, sql, Column } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { movies, movieReviews } from "@/database/schema";
// import { redirect } from 'next/navigation';
import { users } from "@/database/schema";
import { 
  ReviewRoleProps, 
  ReviewScoreStatusProps, 
  RoleTypes 
} from "@/types/index";
import { revalidatePath } from "next/cache";

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
  // await new Promise((resolve) => setTimeout(resolve, 5000));
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

export async function fetchMovieReviews(movieId: string, role: RoleTypes, currentPage: number = 1, itemsPerPage: number = 5, filterBy?: ReviewScoreStatusProps) {
  console.log('Fetching reviews data...');
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const offset = (currentPage - 1) * itemsPerPage;
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
          eq(movieReviews.role, role),
          sqlFilter(movieReviews.score, filterBy)
        )
      )
      .orderBy(desc(movieReviews.createdAt))
      .limit(itemsPerPage)
      .offset(offset)
      console.log("reviewsResponse", reviewsResponse);
      
    return reviewsResponse;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch movies.');
  }
}

// export async function fetchFilteredMovieReviews(currentPage: string, movieId: string, role: RoleTypes) {
  
//   console.log('Fetching reviews data...');
//   // await new Promise((resolve) => setTimeout(resolve, 3000));
  
//   try {
//     const reviewsResponse = await db
//       .select({
//         id: movieReviews.id,
//         text: movieReviews.text,
//         createdAt: movieReviews.createdAt,
//         fullName: users.fullName,
//         score: movieReviews.score
//       })
//       .from(movieReviews)
//       .leftJoin(users, eq(users.id, movieReviews.userId))
//       .where(
//         and(
//           eq(movieReviews.movieId, movieId),
//           eq(movieReviews.role, role)
//         )
//       )
//       .orderBy(desc(movieReviews.createdAt));
//     return reviewsResponse;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch movies.');
//   }
// }

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

export async function fetchMovieReviewByUserId(movieId: string, userId: string) {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const ownMovieReview = await db.select({
    id: movieReviews.id,
    createdAt: movieReviews.createdAt,
    movieId: movieReviews.movieId,
    role: movieReviews.role,
    score: movieReviews.score, 
    text: movieReviews.text,
    userId: movieReviews.userId
  })
  .from(movieReviews)
  .leftJoin(users, eq(movieReviews.userId, users.id))
  .where(
    and(
      eq(movieReviews.movieId, movieId),
      eq(movieReviews.userId, userId)
    )
  )
  return ownMovieReview[0];
}

export async function fetchMovieReviewStatistics(role: ReviewRoleProps, movieId: string) {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const result = await db.select({
    positive: count(
      sql`CASE WHEN ${movieReviews.score} BETWEEN 7 AND 10 THEN 1 END`
    ),
    mixed: count(
      sql`CASE WHEN ${movieReviews.score} BETWEEN 4 AND 6 THEN 1 END`
    ),
    negative: count(
      sql`CASE WHEN ${movieReviews.score} < 4 THEN 1 END`
    ),
    total: count(),
    average: avg(movieReviews.score).mapWith(Number)
  }).from(movieReviews)
    .where(
      and(
        eq(movieReviews.movieId, movieId),
        eq(movieReviews.role, role),
      )
    )
  return result[0];
}

export const createReview = async (
  params: {
    text: string, 
    score: number 
  }, 
  id: string, userId: string, 
  userRole: RoleTypes | undefined,
  pathname: string
) => {
  try {
    await db
      .insert(movieReviews)
      .values(
        {
          userId: userId,
          movieId: id,
          text: params.text,
          score: params.score,
          role: userRole
        }
      )
      // .returning();
      revalidatePath(pathname);
    return {
      success: true
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occurred while creating the review",
    }
  }
}

export const updateReview = async (params: {text: string, score: number }, reviewId: string, pathname: string) => {
  try {
    await db
      .update(movieReviews)
      .set({
        ...params
      })
      .where(
        eq(movieReviews.id, reviewId)
      )
      revalidatePath(pathname);
    return {
      success: true
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occurred while updating the review",
    }
  }
}

function sqlFilter(col: Column, filter?: ReviewScoreStatusProps) {
  if (filter === "positive") {
    return sql`${col} >= 7 and ${col} <= 10`;
  } else if (filter === "mixed") {
    return sql`${col} >= 4 and ${col} < 7`;
  } else if (filter === "negative") {
    return sql`${col} >= 0 and ${col} < 4`;
  } else {
    return undefined;
  }
}

export async function fetchMovieReviewsPages(movieId: string, role: RoleTypes, itemsPerPage: number, filterBy?: ReviewScoreStatusProps ) {
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    const itemsCount = await db
    .select({ count: count() })
    .from(movieReviews)
    .where(
      and(
        eq(movieReviews.movieId, movieId),
        eq(movieReviews.role, role),
        sqlFilter(movieReviews.score, filterBy)
      )
    )
    const totalPages = Math.ceil(Number(itemsCount[0].count) / itemsPerPage);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of reviews.');
  }
}
