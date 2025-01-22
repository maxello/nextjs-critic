export interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
}

export interface Movie {
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