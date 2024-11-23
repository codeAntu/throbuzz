import { ChevronLeft, Search } from 'lucide-react'

export default function HeaderSkeleton() {
  return (
    <div className='flex w-full justify-between border border-b px-6 pb-4 pt-5'>
      <div>
        <ChevronLeft size={24} />
      </div>
      {/* <div>
        <Search size={22} className='mx-auto' />
      </div> */}
    </div>
  )
}
