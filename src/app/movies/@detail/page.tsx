import { Card, CardContent } from '@/components/ui/card';
import { getMovieById } from '@/lib/api';

export default async function MovieDetailsPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  if (searchParams.id) {
    const movie = await getMovieById(Number(searchParams.id));
    return (
      <Card className='h-full overflow-hidden max-h-full'>
        <CardContent className='h-full overflow-x-hidden overflow-y-auto'>
          <pre>{JSON.stringify(movie, null, 2)}</pre>
        </CardContent>
      </Card>
    );
  }

  return <div>MovieDetailsPage</div>;
}
