import { getMovieById } from '@/lib/api';
import { getImageUrl } from '@/lib/helpers';
import { SearchParamsType } from '@/models/params';
import Image from 'next/image';
import { Badge } from './ui/badge';

export async function MovieDetails({ searchParams }: SearchParamsType) {
  const movie = await getMovieById(Number(searchParams.id));

  if (!movie) {
    return null;
  }

  const { backdrop_path, poster_path, title, genres, overview, release_date } =
    movie;

  return (
    <div className='relative w-full h-full flex flex-col gap-6'>
      {backdrop_path && (
        <Image
          className='max-w-full object-cover'
          width={600}
          height={600}
          src={getImageUrl(backdrop_path)}
          alt={title || ''}
          priority={true}
          quality={75}
        />
      )}
      <h4 className='font-semibold text-xl'>{title}</h4>
      <small>{release_date}</small>
      <p className=''>{overview}</p>
      <ul className='flex gap-4'>
        {genres.map((genre) => (
          <li key={genre.id}>
            <Badge>{genre.name}</Badge>
          </li>
        ))}
      </ul>
    </div>
  );

  return <pre>{JSON.stringify(movie, null, 2)}</pre>;
}
