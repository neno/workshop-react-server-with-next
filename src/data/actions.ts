'use server';

import { revalidatePath } from "next/cache";

export async function revalidateMovies(formData: FormData) {
  // 'use server';

  // const selectedGenres = formData.getAll('genres');
  // myGenres = selectedGenres.join(',');
  revalidatePath('/movies');
  // revalidatePath('/?genres=' + selectedGenres.join(','));
  // console.log('selectedGenres', selectedGenres);
}
