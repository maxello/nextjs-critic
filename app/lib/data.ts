import { sql } from '@vercel/postgres';
import {
  ReviewProps,
} from './definitions';

export async function fetchReviews(movieId: string) {
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