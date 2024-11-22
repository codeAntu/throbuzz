import React from 'react'

export default function ProfileSkeleton() {
  return (
    <div className='flex flex-col gap-5 px-5 py-4'>
      <div className='flex w-full items-center gap-5'>
        <div className='size-24 overflow-hidden rounded-full'>
          <div className='h-24 w-24 animate-pulse rounded-full bg-gray-100 dark:bg-zinc-900'></div>
        </div>
        <div className='grid flex-grow gap-3 py-4'>
          <div>
            <div className='h-5 w-36 animate-pulse rounded bg-gray-100 dark:bg-zinc-900'></div>
            <div className='mt-2 h-4 w-24 animate-pulse rounded bg-gray-100 dark:bg-zinc-900'></div>
          </div>
          <div className='flex w-full flex-grow items-center gap-8 text-center'>
            <div className='flex flex-col items-center justify-center gap-0'>
              <div className='h-5 w-7 animate-pulse rounded-md bg-gray-100 dark:bg-zinc-900'></div>
              <div className='mt-2 h-4 w-16 animate-pulse rounded bg-gray-100 dark:bg-zinc-900'></div>
            </div>
            <div className='flex flex-col items-center justify-center gap-0'>
              <div className='h-5 w-7 animate-pulse rounded-md bg-gray-100 dark:bg-zinc-900'></div>
              <div className='mt-2 h-4 w-16 animate-pulse rounded bg-gray-100 dark:bg-zinc-900'></div>
            </div>
            <div className='flex flex-col items-center justify-center gap-0'>
              <div className='h-5 w-7 animate-pulse rounded-md bg-gray-100 dark:bg-zinc-900'></div>
              <div className='mt-2 h-4 w-16 animate-pulse rounded bg-gray-100 dark:bg-zinc-900'></div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex gap-4'>
        <div className='h-10 w-1/2 animate-pulse rounded-sm bg-gray-100 dark:bg-zinc-900'></div>
        <div className='h-10 w-1/2 animate-pulse rounded-sm bg-gray-100 dark:bg-zinc-900'></div>
      </div>
      <div className='space-y-1'>
        <div className='h-5 w-20 animate-pulse rounded bg-gray-100 dark:bg-zinc-900'></div>
        <div className='space-y-2'>
          <div className='h-4 w-full animate-pulse rounded bg-gray-100 dark:bg-zinc-900'></div>
          <div className='h-4 w-full animate-pulse rounded bg-gray-100 dark:bg-zinc-900'></div>
          <div className='flex items-center gap-2'>
            <div className='h-4 w-4 animate-pulse rounded bg-gray-100 dark:bg-zinc-900'></div>
            <div className='h-4 w-20 animate-pulse rounded bg-gray-100 dark:bg-zinc-900'></div>
          </div>
        </div>
      </div>
    </div>
  )
}
