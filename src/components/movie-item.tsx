import Image from 'next/image';
import { IMovieItem } from '@/models/movie-item';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { getImageUrl } from '@/lib/helpers';

export function MovieItem({ movie }: { movie: IMovieItem }) {
  return (
    <Card className='relative aspect-2/3 overflow-hidden h-[16vw]'>
      {/* <Image
        className='max-w-full object-cover'
        sizes='10vw'
        fill
        src={getImageUrl(movie.poster_path)}
        alt={movie.title || ''}
        quality={75}
      /> */}
      <CardHeader>
        <CardTitle>{movie.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{movie.release_date}</p>
      </CardContent>
    </Card>
  );
}
