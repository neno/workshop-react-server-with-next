import { MovieItem } from '@/components/movie-item';
import { MoviesList } from '@/components/movies-list';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllGenres, getMoviesByGenreIds } from '@/lib/api';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: { genres?: string };
}) {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  // const movies = await getMoviesByGenreIds(searchParams.genres);
  // const allGenres = await getAllGenres();
  // console.log('MoviesPage - genres', searchParams.genres);

  // const createUrl = (id: number) => {
  //   const params = new URLSearchParams(searchParams);
  //   params.set('id', id.toString());
  //   return `/movies?${params.toString()}`;
  // };

  // return <pre>{JSON.stringify(movies, null, 2)}</pre>;

  return (
    <Card className='h-full overflow-hidden max-h-full'>
      <CardHeader>
        <CardTitle>Popular movies by selected genres</CardTitle>
      </CardHeader>
      <CardContent className='overflow-x-hidden overflow-y-auto h-full min-h-full'>
        <Suspense fallback={<div>Loading MoviesList...</div>}>
          <MoviesList searchParams={searchParams} />
          {/* <ul className='grid grid-cols-4 gap-4 pb-20'>
            {movies.map((movie) => (
              <li key={movie.id}>
                <Link href={createUrl(movie.id)}>
                  <MovieItem movie={movie} />
                </Link>
              </li>
            ))}
          </ul> */}
        </Suspense>
      </CardContent>
    </Card>
  );
}
