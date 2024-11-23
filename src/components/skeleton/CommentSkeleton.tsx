import { EthernetPort } from 'lucide-react'

export default function CommentSkeleton() {
  return (
    <div className='-z-50 flex space-x-4 py-2'>
      <div className='h-10 w-10 animate-pulse rounded-full bg-gray-100 dark:bg-zinc-900'></div>
      <div className='flex-1 space-y-2'>
        <div className='h-4 w-20 animate-pulse rounded-sm bg-gray-100 dark:bg-zinc-900'></div>
        <div className='h-4 w-full animate-pulse rounded-sm bg-gray-100 dark:bg-zinc-900'></div>
      </div>
    </div>
  )
}

export function CommentReplaySkeleton() {
  return (
    <div className='-z-50 flex space-x-3 '>
      <div className='h-10 w-10 animate-pulse rounded-full bg-gray-100 dark:bg-zinc-900'></div>
      <div className='flex-1 space-y-2'>
        <div className='h-4 w-20 animate-pulse rounded-sm bg-gray-100 dark:bg-zinc-900'></div>
        <div className='h-4 w-full animate-pulse rounded-sm bg-gray-100 dark:bg-zinc-900'></div>
      </div>
    </div>
  )
}
