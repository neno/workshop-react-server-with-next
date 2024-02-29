import { FilterForm } from '@/components/FilterForm';
import { getAllGenres } from '@/lib/api';

export async function Genres() {
  const allGenres = await getAllGenres();

  return <FilterForm genres={allGenres} />;
}
