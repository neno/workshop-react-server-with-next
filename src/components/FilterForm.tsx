'use client';

import { IGenre } from '@/models/genre';
import { useSearchParams } from 'next/navigation';
import { useCallback, useRef, useTransition } from 'react';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { revalidateMovies } from '@/data/actions';
import { createGenresSearchParams } from '@/lib/helpers';

export const FilterForm = ({ genres }: { genres: IGenre[] }) => {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const initalGenres = searchParams.get('genres')?.split(',') ?? [];

  const handleFilter = useCallback(() => {
    const formData = new FormData(formRef.current!);
    const params = createGenresSearchParams(searchParams, formData);

    window.history.pushState(null, '', `?${params.toString()}`);
    formRef.current?.submit();
  }, [searchParams]);

  return (
    <form action={revalidateMovies} ref={formRef}>
      <ul>
        {genres.map((genre) => (
          <li key={genre.id}>
            <div className='flex items-center gap-2 py-1'>
              <Checkbox
                name='genres'
                id={genre.id.toString()}
                value={genre.id}
                defaultChecked={initalGenres.includes(genre.id.toString())}
                onCheckedChange={handleFilter}
              />
              <Label htmlFor={genre.id.toString()}>{genre.name}</Label>
            </div>
          </li>
        ))}
      </ul>
    </form>
  );
};
