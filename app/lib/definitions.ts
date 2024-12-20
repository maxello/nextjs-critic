export type ThemeProps = {
  mode: string | undefined;
  label: string;
  icon: React.JSX.Element
}

export type ReviewProps = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  score: number;
  movie_id: string;
  description: string;
  date: string;
};

export type MovieProps = {
  id: string;
  title: string;
  director: string;
  description: string;
  images: string[];
  thumbnail: string;
  created_at: string;
  releaseYear: string;
  genre: string[];
}

export type NavigationProps = {
  name: string;
  href: string;
  current: boolean;
}

export type UserProps = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string | undefined | null;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
// export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
//   amount: number;
// };
