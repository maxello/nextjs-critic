import { sql } from '@vercel/postgres';
import {
  ReviewProps,
  MovieProps
} from './definitions';

export async function fetchReviews(movieId: string) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    const latestReviews = await sql<ReviewProps>`
      SELECT 
        reviews.score, 
        reviews.description, 
        reviews.date, 
        customers.name, 
        customers.image_url, 
        customers.email, 
        reviews.id, 
        movies.id AS movie_id
      FROM reviews
      JOIN customers ON reviews.customer_id = customers.id
      JOIN movies ON reviews.movie_id = movies.id
      WHERE movies.id = ${movieId}
      ORDER BY reviews.date DESC
    `;
    return latestReviews.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

const ITEMS_PER_PAGE = 8;
export async function fetchFilteredMovies(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  console.log('Fetching products data...');
  await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    const moviesResponse = await sql<MovieProps>`
    SELECT *
    FROM movies
    WHERE title ILIKE ${`%${query}%`}
    ORDER BY created_at DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return moviesResponse.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch movies.');
  }
}
export async function fetchMoviesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM movies
    WHERE title ILIKE ${`%${query}%`}
  `;
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of movies.');
  }
}

export async function fetchMovieById(id: string) {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)
    console.log('Fetching product data by ID......');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const response = await sql<MovieProps>
    `SELECT * FROM movies WHERE id = ${id}`;
    // const movie: MovieProps = JSON.parse(JSON.stringify(response.rows[0]));
    return response.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product data.");
  }
}
