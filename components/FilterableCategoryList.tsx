// import { fetchFilteredMovies, fetchMoviesPages } from '@/lib/actions/movie';
import React from 'react';
import MoviesList from '@/components/movies/MoviesList'
import Pagination from '@/components/Pagination';
import Search from '@/components/Search';
import { Movie } from '@/types/index';

const FilterableCategoryList = async ({
  searchParams,
  itemsPerPage,
  fetchFilteredMovies,
  fetchMoviesPages,
  placeholder = ''
}: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>,
  itemsPerPage: number,
  fetchFilteredMovies: (arg0: string, arg1: number, arg2: number ) => Promise<Movie[]>,
  fetchMoviesPages: (arg0: string, arg1: number) => Promise<number>,
  placeholder: string
}) => {
  const sParams = await searchParams;
  const query = sParams?.query || '';
  const currentPage = Number(sParams?.page) || 1;
  const totalPages = await fetchMoviesPages(query, itemsPerPage);
  const movies = await fetchFilteredMovies(query, currentPage, itemsPerPage);
  return (
    <>
      <Search placeholder={`Search ${placeholder}...`} />
      <MoviesList query={query} movies={movies} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  )
}

export default FilterableCategoryList;