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

export type LinkProp = {
  name: string;
  href: string;
}

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
// export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
//   amount: number;
// };
