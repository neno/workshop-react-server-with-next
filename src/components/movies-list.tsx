import { getMoviesByGenreIds } from '@/lib/api';
import Link from 'next/link';
import { MovieItem } from './movie-item';

export async function MoviesList({
  searchParams,
}: {
  searchParams: { genres?: string };
}) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const movies = await getMoviesByGenreIds(searchParams.genres);

  const createUrl = (id: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('id', id.toString());
    return `/movies?${params.toString()}`;
  };

  return (
    <ul className='grid grid-cols-4 gap-4 pb-20'>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link href={createUrl(movie.id)}>
            <MovieItem movie={movie} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
