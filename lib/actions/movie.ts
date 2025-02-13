"use server";
import { eq, ilike, desc, count, and, avg, sql, Column } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/database/drizzle";
import { movies, movieReviews } from "@/database/schema";
// import { redirect } from 'next/navigation';
import { users } from "@/database/schema";
import { ReviewParams, ReviewRoleProps, ReviewScoreStatusProps, RoleTypes } from "@/types/index";

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
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const movieOwnScore = await db.select()
  .from(movieReviews)
  .where(
    and(
      eq(movieReviews.movieId, movieId),
      eq(movieReviews.userId, userId)
    )
  )
  return movieOwnScore[0] || { score: null };
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

// export const createReview = async (params: ReviewParams) => {
//   try {
//     await db
//       .insert(movies)
//       .values(params)
//       // .returning();

//     return {
//       success: true,
//       // data: JSON.parse(JSON.stringify(newMovie[0])),
//     };
    
//   } catch (error) {
//     console.log(error);

//     return {
//       success: false,
//       message: "An error occurred while creating the movie",
//     };
//   }
// };

export const updateReview = async (params: ReviewParams, id: string) => {
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
    console.log("totalPages--------->", totalPages);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of reviews.');
  }
}
