export default function StatusSkeleton() {
  return (
    <div className='relative flex aspect-[9/16] h-56 select-none flex-col justify-end overflow-hidden rounded-xl border-2 border-dashed border-blue-400/30 bg-gradient-to-br from-slate-200/60 to-slate-300/80 shadow-md dark:from-zinc-900/60 dark:to-zinc-800/80'>
      {/* Blurred overlay */}
      <div className='absolute left-0 top-0 h-full w-full animate-pulse bg-gradient-to-t from-black/30 via-transparent to-white/10 backdrop-blur-sm'></div>
      {/* User info skeleton at bottom */}
      <div className='absolute bottom-2 left-2 flex items-center gap-2 rounded-full bg-black/40 px-2 py-1'>
        <div className='h-7 w-7 animate-pulse rounded-full bg-slate-300 dark:bg-zinc-700'></div>
        <div className='h-3 w-16 animate-pulse rounded bg-slate-300 dark:bg-zinc-700'></div>
      </div>
    </div>
  )
}

export function StatusPageSkeleton() {
  return (
    <div className='mx-auto w-full max-w-4xl select-none p-4'>
      {/* Create button skeleton styled as status card with plus icon */}

      {/* My Status section skeleton */}
      <div className='mb-6'>
        <div className='mb-3 h-6 w-32 animate-pulse rounded bg-slate-200 dark:bg-zinc-900'></div>
        <div className='flex flex-wrap gap-3'>
          <StatusSkeleton />
          <div className='flex aspect-[9/16] h-56 items-center justify-center rounded-md border-2 border-dashed border-blue-400/50 bg-gradient-to-br from-slate-200/60 to-slate-300/80 dark:from-zinc-900/60 dark:to-zinc-800/80'>
            <span className='flex aspect-square h-12 w-12 animate-pulse items-center justify-center rounded-full bg-blue-400/60 text-white'>
              <svg width='32' height='32' viewBox='0 0 24 24' fill='none'>
                <path d='M12 5v14m7-7H5' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
              </svg>
            </span>
          </div>
        </div>
      </div>
      {/* Friends Status section skeleton */}
      <div className='mt-6'>
        <div className='mb-3 h-6 w-36 animate-pulse rounded bg-slate-200 dark:bg-zinc-900'></div>
        <div className='flex flex-wrap gap-3'>
          <StatusSkeleton />
          <StatusSkeleton />
          <StatusSkeleton />
        </div>
      </div>
      {/* Empty state skeleton */}
      <div className='py-12 text-center text-gray-400 dark:text-gray-500'>
        <div className='mx-auto h-6 w-48 animate-pulse rounded bg-slate-200 dark:bg-zinc-900'></div>
      </div>
    </div>
  )
}
