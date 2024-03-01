import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Genres } from './genres';
import { MoviesList } from '@/components/movies-list';
import { MovieDetails } from '@/components/movie-details';
import { seedCache } from '@/lib/api';
import { Suspense } from 'react';

export default async function AppShell({
  searchParams,
}: {
  searchParams: { genres?: string; id?: string };
}) {
  seedCache();

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
          <Suspense fallback={<p>Loading movies...</p>}>
            <MoviesList searchParams={searchParams} />
          </Suspense>
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
