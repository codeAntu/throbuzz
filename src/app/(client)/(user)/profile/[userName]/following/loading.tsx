import Header from '@/components/Header'
import { Screen0 } from '@/components/Screen'
import HeaderSkeleton from '@/components/skeleton/HeaderSkeleton'
import PeopleSkeleton from '@/components/skeleton/PeopleSkeleton'
import { Search } from 'lucide-react'

export default function Loading() {
  return (
    <Screen0>
      <HeaderSkeleton />
      <div className='grid select-none gap-4 px-5 py-4'>
        <div className='flex w-full items-center justify-center gap-2 rounded-full bg-black/5 px-3 py-2.5 text-xs text-black/80 dark:bg-white/5 dark:text-white/80'>
          <Search size={20} />
          <input type='text' className='w-full border-none bg-transparent outline-none' placeholder='Search ' />
        </div>
        <div className='text-lg font-semibold'>Have not followed anyone yet</div>
        <div className='grid gap-5 sm:gap-7'>
          <PeopleSkeleton />
          <PeopleSkeleton />
          <PeopleSkeleton />
          <PeopleSkeleton />
          <PeopleSkeleton />
        </div>
      </div>
    </Screen0>
  )
}
