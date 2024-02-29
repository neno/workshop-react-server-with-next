import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Genres } from './genres';
import { MoviesList } from '@/components/movies-list';
import { MovieDetails } from '@/components/movie-details';

export default function AppShell({
  searchParams,
}: {
  searchParams: { genres?: string; id?: string };
}) {
  return (
    <div className='h-full grid grid-cols-6 gap-4'>
      <Card className='col-span-1'>
        <CardHeader>
          <CardTitle>Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <Genres />
        </CardContent>
      </Card>
      <Card className='col-span-3 h-full overflow-hidden'>
        <CardHeader>
          <CardTitle>Movies {Date.now()}</CardTitle>
        </CardHeader>
        <CardContent className='h-full overflow-hidden'>
          <MoviesList searchParams={searchParams} />
        </CardContent>
      </Card>
      <Card className='col-span-2'>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent>
          <MovieDetails searchParams={searchParams} />
        </CardContent>
      </Card>
    </div>
  );
}
