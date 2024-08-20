'use client'
import { Screen, Screen0 } from '@/components/Screen'
import ProfileLayout from '../layout'
import { Ic } from '@/components/Icon'
import { Bold, Bolt, LogIn, MoveLeft, Pencil, Settings } from 'lucide-react'
import { Button } from '@/components/Button'
import { useRouter } from 'next/navigation'

export default function userProfile({ params }: { params: any }) {
  const router = useRouter()
  return (
    <Screen0 className='max-w-[700px]'>
      <div className='flex w-full items-center justify-between bg-white px-5 py-2 dark:bg-black'>
        <MoveLeft size={26} onClick={() => router.back()} className='hover:bg-white/20' />
        <Bolt size={26} />
      </div>
      <Bio />
    </Screen0>
  )
}

function Bio() {
  return (
    <div className=''>
      <div className=''>
        <img src='/images/bg2.jpg' alt='' className='max-h-40 w-full bg-red-500 object-cover' />

        <div className='relative -top-14 left-3 -mb-14 w-40'>
          <img src='/images/profile.jpg' alt='' className='rounded-full bg-white p-1.5 dark:bg-black' />
        </div>
      </div>
      <div className='flex flex-col justify-center gap-2 px-5 py-2'>
        <div>
          <div className='line-clamp-2 text-2xl font-semibold leading-6'>Ananta Karmakar</div>
          <div className='line-clamp-1 text-sm font-normal text-black/80 dark:text-white/70'>@codeAntu </div>
        </div>
        <div className='line-clamp-3 text-sm font-medium text-black/90 hover:line-clamp-none dark:text-white/80'>
          Frontend Developer | React & Next.js | Freelancer | JS | Competitive Programmer Frontend Developer | React &
          Next.js | Freelancer | JS | Competitive Programmer Frontend Developer | React Frontend Developer | React &
          Next.js | Freelancer | JS | Competitive Programmer & Next.js | Freelancer | JS | Competitive Programmer2222
        </div>
        <div className='flex items-center justify-normal gap-4 py-1 text-sm font-medium text-black/80 dark:text-white/70'>
          <button className='hover:text-black hover:dark:text-white'> 214 followers </button>
          <button className='hover:text-black hover:dark:text-white'>214 following</button>
        </div>
        <div></div>
      </div>
    </div>
  )
}
