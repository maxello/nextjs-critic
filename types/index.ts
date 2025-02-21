export type AuthCredentials = {
  fullName: string;
  email: string;
  password: string;
}

export type ReviewRoleProps = "USER" | "CRITIC"
export type RoleTypes = ReviewRoleProps | "ADMIN"

export type UserProps = {
  fullName: string;
  id: string;
  role: RoleTypes;
  agency?: string;
}

export type Movie = {
  id: string;
  title: string;
  director: string;
  genres: string[];
  // rating: number;
  description: string;
  thumbnail: string;
  videoUrl: string;
  createdAt: Date | null;
  releaseYear: number;
}

export type MovieParams = Omit<Movie, "id" | "createdAt">;

export type ThemeProps = {
  mode: string | undefined;
  label: string;
  icon: React.JSX.Element
}

export type NavigationProps = {
  name: string;
  href: string;
}

// export type ReviewProps = {
//   id: string;
//   userId: string;
//   text: string;
//   score: number;
//   createdAt: Date | null;
//   role: RoleTypes;
// }

export type ReviewProps = {
  id: string;
  text: string;
  score: number;
  createdAt: Date | null;
  fullName: string | null;
  fullReviewLink: string | null;
}

// {
//   createdAt: Date | null;
//   id: string;
//   movieId: string;
//   role: "USER" | "CRITIC" | "ADMIN" | null;
//   score: number;
//   text: string;
//   userId: string;
//   fullName: string | null;
// }

export type ReviewParams = {
  id: string;
  userId: string;
  movieId: string;
  text: string;
  score: number;
  role: RoleTypes;
  createdAt: Date | null;
  fullReviewLink: string | null;
}

export type OwnScoreProps = {
  score: number | null;
  role?: ReviewRoleProps | null;
}

export type ReviewScoreStatusProps = 'positive' | 'mixed' | 'negative' | 'all'