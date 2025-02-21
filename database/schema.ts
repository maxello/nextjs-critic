import {
  varchar,
  uuid,
  integer,
  text,
  pgTable,
  date,
  pgEnum,
  timestamp,
} from "drizzle-orm/pg-core";

// export const STATUS_ENUM = pgEnum("status", [
//   "PENDING",
//   "APPROVED",
//   "REJECTED",
// ]);

export const ROLE_ENUM = pgEnum("role", [
  "USER", "ADMIN", "CRITIC"
]);

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  // universityId: integer("university_id").notNull().unique(),
  password: text("password").notNull(),
  // universityCard: text("university_card").notNull(),
  // status: STATUS_ENUM("status").default("PENDING"),
  role: ROLE_ENUM("role").default("USER").notNull(),
  lastActivityDate: date("last_activity_date").defaultNow(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
  agency: varchar("agency", { length: 255 })
});

export const movies = pgTable("movies", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  director: varchar("director", { length: 255 }).notNull(),
  genres: text("genres").array().notNull(),
  description: text("description").notNull(),
  //rating: integer("rating").notNull(),
  thumbnail: text("thumbnail").notNull(),
  // images: text("images").array(),
  videoUrl: text("video_url").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  releaseYear: integer("release_year").notNull(),
});

export const movieReviews = pgTable("movie_reviews", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  movieId: uuid("movie_id").references(() => movies.id).notNull(),
  text: text("text").notNull(),
  // companyName: text("text"),
  score: integer("score").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  role: ROLE_ENUM("role").default("USER").notNull(),
  fullReviewLink: varchar("full_review_link", { length: 2048 })
});

// export const borrowRecords = pgTable("borrow_records", {
//   id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
//   userId: uuid("user_id")
//     .references(() => users.id)
//     .notNull(),
//   bookId: uuid("book_id")
//     .references(() => books.id)
//     .notNull(),
//   borrowDate: timestamp("borrow_date", { withTimezone: true })
//     .defaultNow()
//     .notNull(),
//   dueDate: date("due_date").notNull(),
//   returnDate: date("return_date"),
//   status: BORROW_STATUS_ENUM("status").default("BORROWED").notNull(),
//   createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
// });