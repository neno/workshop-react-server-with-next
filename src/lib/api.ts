import { cacheGet, cacheSet, cacheSize } from '@/data/cache';
import { IApiReviewsByMovieResult } from '@/models/api-review-results';
import { FullMovieData } from '@/models/full-movie-data';
import { IGenre } from '@/models/genre';
import { IMovie } from '@/models/movie';
import { IApiSearchResult } from '@/models/search-results';
import { get } from 'http';
import { Url } from 'next/dist/shared/lib/router/router';

type UrlProps = {
  path: string;
  page?: number;
  sort_by?: string;
  params?: string;
  tags?: string[];
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

async function fetchData({ path, params, tags = [] }: UrlProps): Promise<any> {
  const url = createUrl({ path, params });
  const res = await fetch(url, { next: { tags } });

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
  // console.log('getAllGenres');

  const { genres } = await fetchData({ path: 'genre/movie/list' });
  return genres;
}

export async function getMoviesByGenreIds(movieIds = ''): Promise<IMovie[]> {
  // console.log('getMoviesByGenreIds', movieIds);

  const cache = cacheGet(movieIds);

  if (cache) {
    console.log('***** CACHED MOVIES ******', movieIds);
    return cache;
  }

  const { results } = await fetchData({ path: 'discover/movie', params: `with_genres=${movieIds}`, tags: ['moviesByGenres'] });
  cacheSet(movieIds, results.length > 0 ? results : []);
  console.log('***** FETCHED MOVIES ******', movieIds);
  return results;
}

export async function seedCache() {
  if (cacheSize() === 0) {
    const allGenres = getAllGenres().then((genres) => {
      for (const genre of genres) {
        getMoviesByGenreIds(genre.id.toString()).then((movies) => {
          cacheSet(genre.id.toString(), movies);
        })
      }
    });
  }
}