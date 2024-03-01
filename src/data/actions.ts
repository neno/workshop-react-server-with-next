'use server';

import { revalidatePath } from "next/cache";

export async function revalidateMovies(formData: FormData) {
  // console.log('revalidateMovies', formData.getAll('genres'));
  revalidatePath('/');

  // 'use server';

  // const selectedGenres = formData.getAll('genres');
  // myGenres = selectedGenres.join(',');
  // revalidatePath('/?genres=' + selectedGenres.join(','));
  // // console.log('selectedGenres', selectedGenres);
}
