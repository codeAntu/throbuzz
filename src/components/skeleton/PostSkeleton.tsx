export default function PostSkeleton() {
  return (
    <div className='space-y-3'>
      <div className='flex flex-col gap-2 rounded-3xl border border-slate-400/15 bg-slate-50 px-3.5 py-4 pb-2.5 text-black dark:bg-zinc-950 sm:p-4'>
        <div className='flex items-start gap-3 px-0.5'>
          <div className='aspect-square w-11 animate-pulse rounded-full bg-slate-200/70 dark:bg-zinc-900'></div>
          <div className='flex flex-grow select-none items-center justify-between'>
            <div className='space-y-2'>
              <div className='h-4 w-24 animate-pulse rounded bg-slate-200/70 dark:bg-zinc-900'></div>
              <div className='flex items-center gap-2 text-xs text-black/50 md:text-black/80'>
                <div className='h-3 w-16 animate-pulse rounded bg-slate-200/70 dark:bg-zinc-900'></div>
                <div className='h-3 w-10 animate-pulse rounded bg-slate-200/70 dark:bg-zinc-900'></div>
              </div>
            </div>
          </div>
        </div>
        <div className='cursor-pointer px-1 text-xs font-medium text-black/80 sm:text-sm md:font-medium'>
          <div className='h-4 animate-pulse rounded bg-slate-200/70 dark:bg-zinc-900'></div>
          <div className='mt-1 h-4 animate-pulse rounded bg-slate-200/70 dark:bg-zinc-900'></div>
        </div>
        <div className='flex select-none items-center justify-between gap-5 pl-1 sm:px-2'>
          <div className='flex flex-grow items-center gap-3 text-sm font-medium text-black/50 md:text-black/50'>
            <div className='flex items-center justify-normal gap-1.5'>
              <div className='h-5 w-5 animate-pulse rounded-full bg-slate-200/70 dark:bg-zinc-900'></div>
              <div className='h-3 w-8 animate-pulse rounded bg-slate-200/70 dark:bg-zinc-900'></div>
              <div className='hidden h-3 w-12 animate-pulse rounded bg-slate-200/70 dark:bg-zinc-900 md:block'></div>
            </div>
            <div className='flex items-center gap-1.5'>
              <div className='h-5 w-5 animate-pulse rounded-full bg-slate-200/70 dark:bg-zinc-900'></div>
              <div className='h-3 w-8 animate-pulse rounded bg-slate-200/70 dark:bg-zinc-900'></div>
              <div className='hidden h-3 w-12 animate-pulse rounded bg-slate-200/70 dark:bg-zinc-900 md:block'></div>
            </div>
          </div>
          <div className='h-8 w-24 animate-pulse rounded-full bg-slate-200/70 dark:bg-zinc-900'></div>
        </div>
      </div>
      <div className='flex flex-col gap-2 rounded-3xl border border-slate-400/15 bg-slate-50 px-3.5 py-4 pb-2.5 text-black dark:bg-zinc-950 sm:p-4'>
        <div className='flex items-start gap-3 px-0.5'>
          <div className='aspect-square w-11 animate-pulse rounded-full bg-slate-200/70 dark:bg-zinc-900'></div>
          <div className='flex flex-grow select-none items-center justify-between'>
            <div className='space-y-2'>
              <div className='h-4 w-24 animate-pulse rounded bg-slate-200/70 dark:bg-zinc-900'></div>
              <div className='flex items-center gap-2 text-xs text-black/50 md:text-black/80'>
                <div className='h-3 w-16 animate-pulse rounded bg-slate-200/70 dark:bg-zinc-900'></div>
                <div className='h-3 w-10 animate-pulse rounded bg-slate-200/70 dark:bg-zinc-900'></div>
              </div>
            </div>
          </div>
        </div>
        <div className='cursor-pointer px-1 text-xs font-medium text-black/80 sm:text-sm md:font-medium'>
          <div className='anima te-pulse mt-1 h-4 rounded bg-slate-200/70 dark:bg-zinc-900'></div>
        </div>
        <div className='h-40 animate-pulse rounded-xl bg-slate-200/70 dark:bg-zinc-900'></div>
        <div className='flex select-none items-center justify-between gap-5 pl-1 sm:px-2'>
          <div className='flex flex-grow items-center gap-3 text-sm font-medium text-black/50 md:text-black/50'>
            <div className='flex items-center justify-normal gap-1.5'>
              <div className='h-5 w-5 animate-pulse rounded-full bg-slate-200/70 dark:bg-zinc-900'></div>
              <div className='h-3 w-8 animate-pulse rounded bg-slate-200/70 dark:bg-zinc-900'></div>
              <div className='hidden h-3 w-12 animate-pulse rounded bg-slate-200/70 dark:bg-zinc-900 md:block'></div>
            </div>
            <div className='flex items-center gap-1.5'>
              <div className='h-5 w-5 animate-pulse rounded-full bg-slate-200/70 dark:bg-zinc-900'></div>
              <div className='h-3 w-8 animate-pulse rounded bg-slate-200/70 dark:bg-zinc-900'></div>
              <div className='hidden h-3 w-12 animate-pulse rounded bg-slate-200/70 dark:bg-zinc-900 md:block'></div>
            </div>
          </div>
          <div className='h-8 w-24 animate-pulse rounded-full bg-slate-200/70 dark:bg-zinc-900'></div>
        </div>
      </div>
    </div>
  )
}
