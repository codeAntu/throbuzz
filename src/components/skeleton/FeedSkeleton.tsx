import { Screen0 } from '../Screen'
import PostSkeleton from './PostSkeleton'

export default function FeedSkeleton() {
  return (
    <Screen0 className='animate-pulse gap-6 px-2 py-4'>
      <div className='sticky top-0 z-50 flex w-full items-center justify-between gap-2 border-b border-black/5 bg-white/80 px-3 py-1.5 backdrop-blur-3xl dark:border-white/5 dark:bg-black/70'>
        <div className='xl:hidden'>
          <div className='h-8 w-8 rounded bg-gray-100 dark:bg-zinc-900'></div>
        </div>
        <div className='flex w-full items-center justify-between'>
          <div className='h-8 w-24 rounded-sm bg-gray-100 dark:bg-zinc-900'></div>
          <div className='flex items-center justify-end rounded-full bg-slate-50 text-xs dark:bg-zinc-950 dark:text-white'>
            <div className='w-40 font-semibold text-black/30 dark:text-white/50'>
              <div className='h-7 w-20 rounded-lg bg-gray-100 dark:bg-zinc-900'></div>
            </div>
          </div>
        </div>
      </div>

      <div className='px-3'>
        <div className='h-20 rounded-sm bg-gray-100 dark:bg-zinc-900/60'></div>
      </div>

      <div className='space-y-4 px-3'>
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    </Screen0>
  )
}
