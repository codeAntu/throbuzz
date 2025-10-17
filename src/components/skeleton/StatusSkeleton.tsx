export default function StatusSkeleton() {
  return (
    <div className='relative flex aspect-[9/16] h-56 flex-col justify-end overflow-hidden rounded-xl bg-slate-200/50 shadow-md dark:bg-zinc-900/50'>
      {/* Background shimmer */}
      <div className='absolute left-0 top-0 h-full w-full animate-pulse bg-gradient-to-br from-slate-200 to-slate-300 dark:from-zinc-900 dark:to-zinc-800'></div>

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
    <div className='mx-auto w-full max-w-4xl p-4'>
      {/* Create button skeleton */}
      <div className='mb-6 h-12 w-full animate-pulse rounded-lg bg-slate-200 dark:bg-zinc-900'></div>

      {/* My Status section skeleton */}
      <div className='mb-6'>
        <div className='mb-3 h-6 w-32 animate-pulse rounded bg-slate-200 dark:bg-zinc-900'></div>
        <div className='flex flex-wrap gap-3'>
          <StatusSkeleton />
          <StatusSkeleton />
          <StatusSkeleton />
        </div>
      </div>

      {/* Friends Status section skeleton */}
      <div className='mt-6'>
        <div className='mb-3 h-6 w-36 animate-pulse rounded bg-slate-200 dark:bg-zinc-900'></div>
        <div className='flex flex-wrap gap-3'>
          <StatusSkeleton />
          <StatusSkeleton />
          <StatusSkeleton />
          <StatusSkeleton />
        </div>
      </div>
    </div>
  )
}
