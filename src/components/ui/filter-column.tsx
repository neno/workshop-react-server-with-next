export async function FilterColumn({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='border-r border-gray-200 dark:border-gray-800 overflow-y-auto p-2 space-y-2'>
      {children}
    </div>
  );
}
