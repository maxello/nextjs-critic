// import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
// import { reviews, customers, users, movies } from '../lib/placeholder-data';

const client = await db.connect();

// async function seedUsers() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS users (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email TEXT NOT NULL UNIQUE,
//       password TEXT NOT NULL
//     );
//   `;

//   const insertedUsers = await Promise.all(
//     users.map(async (user) => {
//       const hashedPassword = await bcrypt.hash(user.password, 10);
//       return client.sql`
//         INSERT INTO users (id, name, email, password)
//         VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
//         ON CONFLICT (id) DO NOTHING;
//       `;
//     }),
//   );

//   return insertedUsers;
// }

// async function seedMovies() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`
//     CREATE TABLE IF NOT EXISTS movies (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       title TEXT NOT NULL,
//       description TEXT NOT NULL,
//       director TEXT NOT NULL
//     );
//   `;
//   const insertedMovies = await Promise.all(
//     movies.map(
//       (movie) => client.sql`
//         INSERT INTO movies (title, description, director)
//         VALUES (${movie.title}, ${movie.description}, ${movie.director})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedMovies;
// }

// async function seedReviews() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`
//     CREATE TABLE IF NOT EXISTS reviews (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       customer_id UUID NOT NULL,
//       movie_id UUID NOT NULL,
//       score INT NOT NULL,
//       date DATE NOT NULL,
//       review TEXT NOT NULL
//     );
//   `;

//   const insertedReviews = await Promise.all(
//     reviews.map(
//       (review) => client.sql`
//         INSERT INTO reviews (customer_id, score, date, movie_id, review)
//         VALUES (${review.customer_id}, ${review.score}, ${review.date}, ${review.movie_id}, ${review.review})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedReviews;
// }

// async function seedCustomers() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`
//     CREATE TABLE IF NOT EXISTS customers (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email VARCHAR(255) NOT NULL,
//       image_url VARCHAR(255) NOT NULL
//     );
//   `;

//   const insertedCustomers = await Promise.all(
//     customers.map(
//       (customer) => client.sql`
//         INSERT INTO customers (id, name, email, image_url)
//         VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedCustomers;
// }

export async function GET() {
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
  try {
    await client.sql`BEGIN`;
    // await seedUsers();
    // await seedCustomers();
    // await seedMovies();
    // await seedReviews();
    // await seedRevenue();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.log("error", error);
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
