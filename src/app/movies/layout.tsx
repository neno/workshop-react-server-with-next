import { ReactNode, Suspense } from 'react';

export default async function MoviesLayout({
  children,
  detail,
}: {
  children: ReactNode;
  detail: ReactNode;
}) {
  return (
    <div className='h-full grid grid-cols-6 gap-2'>
      <div className='col-span-4 overflow-hidden'>{children}</div>
      <div className='col-span-2 overflow-hidden'>
        <Suspense fallback={<div>Loading Details...</div>}>{detail}</Suspense>
      </div>
    </div>
  );
}
