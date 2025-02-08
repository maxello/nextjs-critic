export type AuthCredentials = {
  fullName: string;
  email: string;
  password: string;
}

export type RoleTypes = any; //some trouble with value "USER" | "CRITIC" | "ADMIN"

export type UserProps = {
  fullName: string;
  id: string;
  role: RoleTypes;
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
  current: boolean;
}

export type ReviewProps = {
  id: string;
  userId: string;
  text: string;
  score: number;
  createdAt: Date | null;
  // companyName?: string;
  role: RoleTypes;
}

export type ReviewParams = {
  id: string;
  text: string;
  score: number;
  createdAt: Date | null;
  fullName: string | null;
}

export interface OwnScoreProps {
  score: number | null;
  role?: RoleTypes;
}