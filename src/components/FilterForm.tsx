'use client';

import { IGenre } from '@/models/genre';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { revalidateMovies } from '@/data/actions';

export const FilterForm = ({ genres }: { genres: IGenre[] }) => {
  console.log('FilterForm');

  const searchParams = useSearchParams();
  const selectedGenres = searchParams.get('genres');
  const [selectedGenreIds, setSelectedGenreIds] = useState<string[]>(
    selectedGenres?.split(',') ?? []
  );
  const formRef = useRef<HTMLFormElement>(null);
  const selectedGenredIdsRef = useRef(
    searchParams.get('genres')?.split(',') ?? []
  );

  const handleFilter = useCallback(
    (id: string) => {
      let newGenresIds;

      if (selectedGenreIds.includes(id)) {
        newGenresIds = selectedGenreIds.filter((gid) => gid !== id);
      } else {
        newGenresIds = [...selectedGenreIds, id];
      }

      window.history.pushState(null, '', `?genres=${newGenresIds.join(',')}`);
      formRef.current?.requestSubmit();
      // setSelectedGenreIds(newGenresIds);
    },
    [selectedGenreIds]
  );

  // useEffect(() => {
  //   if (formRef.current) {
  //     formRef.current.requestSubmit();
  //   }
  // }, [selectedGenreIds]);

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
                checked={selectedGenreIds.includes(genre.id.toString())}
                onCheckedChange={() => handleFilter(genre.id.toString())}
              />
              <Label htmlFor={genre.id.toString()}>{genre.name}</Label>
            </div>
          </li>
        ))}
      </ul>
      <p>
        <button type='submit'>Apply Filter</button>
      </p>
    </form>
  );
};
