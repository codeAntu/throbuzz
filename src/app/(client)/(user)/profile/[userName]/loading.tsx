import HeaderSkeleton from '@/components/skeleton/HeaderSkeleton'
import PostSkeleton from '@/components/skeleton/PostSkeleton'
import ProfileSkeleton from '@/components/skeleton/ProfileSkeleton'
import { ChevronLeft, Search } from 'lucide-react'

export default function Loading() {
  return (
    <div>
      <HeaderSkeleton />
      <ProfileSkeleton />
      <div>
        <div className='space-y-2 px-5 py-5'>
          <div className='h-6 w-16 rounded-sm bg-gray-100 dark:bg-zinc-900'></div>
          <PostSkeleton />
        </div>
      </div>
    </div>
  )
}
