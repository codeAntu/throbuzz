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
      <About />
    </Screen0>
  )
}

function About() {
  return (
    <div className='px-5'>
      <div>About</div>
    </div>
  )
}

function Bio() {
  return (
    <div className=''>
      <div className=''>
        <div className='relative'>
          <img src='/images/bg2.jpg' alt='' className='max-h-40 w-full bg-red-500 object-cover' />
          <div className='absolute bottom-0 right-0 cursor-pointer rounded-full border border-black/10 bg-red-400 p-2 duration-100 hover:scale-[1.03] hover:border-black/10 hover:bg-black/5 dark:border-white/10 hover:dark:border-white/10 hover:dark:bg-white/5'>
            <Pencil className='bg-transparent' size={22} />
          </div>
        </div>

        <div className='relative -top-14 -mb-14 flex w-40 bg-red-300'>
          <img src='/images/profile.jpg' alt='' className='w-40 rounded-full bg-white p-1.5 dark:bg-black' />
          <div className='absolute bottom-0 right-0 cursor-pointer rounded-full border-2 border-white bg-white/10 p-2 duration-100 hover:scale-[1.03] hover:border-black/10 hover:bg-black/5 dark:border-white/10 hover:dark:border-white/10 hover:dark:bg-white/5'>
            <Pencil className='bg-transparent' size={22} />
          </div>
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
        <div className='flex items-center justify-normal gap-1 py-1 text-sm font-medium text-accent dark:text-accent/80'>
          <button className='rounded-full border border-accent/20 bg-accent/5 px-3 py-1 duration-200 hover:bg-accent/10'>
            214 followers
          </button>
          <button className='rounded-full border border-accent/20 bg-accent/5 px-3 py-1 duration-200 hover:bg-accent/10'>
            214 following
          </button>
        </div>
        <div></div>
      </div>
    </div>
  )
}
