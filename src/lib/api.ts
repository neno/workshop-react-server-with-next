import { IApiReviewsByMovieResult } from '@/models/api-review-results';
import { FullMovieData } from '@/models/full-movie-data';
import { IGenre } from '@/models/genre';
import { IMovie } from '@/models/movie';
import { IApiSearchResult } from '@/models/search-results';
import { Url } from 'next/dist/shared/lib/router/router';

type UrlProps = {
  path: string;
  page?: number;
  sort_by?: string;
  params?: string;
};

export function createUrl({ path, page = 1, sort_by = 'popularity.desc', params }: UrlProps): string {
  const urlParts = [
    'https://api.themoviedb.org/3/',
    path,
    `?api_key=${process.env.THE_MOVIEDB_API_KEY}`,
    '&include_adult=false',
    '&language=en-US',
    `&page=${page}`,
    `&sort_by=${sort_by}`,
    params ? `&${params}` : '',
  ];

  return urlParts.join('');
}

async function fetchData({ path, params }: UrlProps): Promise<any> {
  const url = createUrl({ path, params });
  const res = await fetch(url);

  return await res.json();
}

export async function getPopularMovies(): Promise<IApiSearchResult> {
  return await fetchData({ path: 'movie/popular' });
}

export async function searchMovies(searchTerm: string): Promise<IApiSearchResult | undefined> {
  if (searchTerm) {
    return await fetchData({ path: 'search/movie', params: `query=${searchTerm}` });
  }
}

export async function getMovieById(id: number): Promise<FullMovieData | undefined> {
  return await fetchData({ path: `movie/${id}` });
}

export async function getMovieReviews(id: number): Promise<IApiReviewsByMovieResult | undefined> {
  return await fetchData({ path: `movie/${id}/reviews` });
}

export async function getAllGenres(): Promise<IGenre[]> {
  console.log('getAllGenres');

  const { genres } = await fetchData({ path: 'genre/movie/list' });
  return genres;
}

export async function getMoviesByGenreIds(movieIds = ''): Promise<IMovie[]> {
  console.log('getMoviesByGenreIds', movieIds);

  const { results } = await fetchData({ path: 'discover/movie', params: `with_genres=${movieIds}` });
  return results;
}
