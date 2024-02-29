import Image from 'next/image';
import { IMovieItem } from '@/models/movie-item';
import { Card, CardDescription, CardTitle } from './ui/card';
import { getImageUrl } from '@/lib/helpers';
import Link from 'next/link';
import { createUrl } from '@/lib/api';

export function MovieItem({ movie }: { movie: IMovieItem }) {
  return (
    <Card className='relative aspect-2/3 overflow-hidden h-[16vw]'>
      <Image
        className='max-w-full object-cover'
        sizes='10vw'
        fill
        // sizes='150px'
        // width={100}
        // height={100}
        src={getImageUrl(movie.poster_path)}
        alt={movie.title || ''}
        // priority={priorityImage}
        quality={75}
      />
      {/* <div className='flex-1 ml-4'>
        <CardTitle className='block'>{movie.title}</CardTitle>
        <CardDescription className='text-sm'>
          {movie.release_date}
        </CardDescription>
      </div> */}
    </Card>
  );
}
