export default function PeopleSkeleton() {
  return (
    <div className='flex animate-pulse select-none items-center gap-4'>
      <div className='flex aspect-square w-16 items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-zinc-900'></div>
      <div className='flex w-full justify-between gap-2.5'>
        <div className='flex flex-col gap-2'>
          <div className='h-4 w-32 rounded bg-gray-100 dark:bg-zinc-900'></div>
          <div className='h-3 w-16 rounded bg-gray-100 dark:bg-zinc-900'></div>
        </div>
        <div className='flex items-center justify-center gap-2.5'>
          <div className='h-8 w-20 rounded-[7px] bg-gray-100 dark:bg-zinc-900'></div>
          {/* <div className='h-7 w-2 rounded-md bg-gray-100 dark:bg-zinc-900'></div> */}
        </div>
      </div>
    </div>
  )
}
