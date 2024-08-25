'use client'
import { Screen, Screen0 } from '@/components/Screen'
import ProfileLayout from '../layout'
import { Ic } from '@/components/Icon'
import { Bold, Bolt, LogIn, MoveLeft, Pencil, Settings } from 'lucide-react'
import { Button } from '@/components/Button'
import { useRouter } from 'next/navigation'
import Post from '@/components/Post'
import Image from 'next/image'

export default function UserProfile({ params }: { params: any }) {
  const router = useRouter()
  return (
    <Screen0 className='max-w-[700px]'>
      <div className='flex w-full items-center justify-between bg-white px-5 py-4 dark:bg-black'>
        <MoveLeft size={26} onClick={() => router.back()} className='hover:bg-white/20' />
        <Bolt size={26} />
      </div>
      <Bio />
      <Posts />
      <Posts />
    </Screen0>
  )
}

function Posts() {
  return (
    <div className='border-t-2 pt-1 text-black dark:text-white'>
      <div className='border-b border-black/10 bg-white py-4 dark:border-white/10 dark:bg-black'>
        <div className='px-5 text-lg font-semibold leading-5'>Posts</div>
        <div className='leading px-5 text-sm font-medium text-black/60 dark:text-white/60'>450 posts</div>
      </div>
      <div className='flex flex-col'>
        {/* <Post /> */}
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  )
}

function About() {
  return (
    <div className='px-5'>
      <div>
        <div className='text-lg font-semibold'>About</div>
        <div className='text-sm text-black/70 dark:text-white/70'>This section will be added letter .</div>
      </div>
      <div></div>
    </div>
  )
}

function Bio() {
  return (
    <div className=''>
      <div className=''>
        <div className='relative'>
          <Image src='/images/bg2.jpg' alt='' className='max-h-36 w-full bg-red-500 object-cover md:max-h-40' />
          <div className='absolute bottom-2 right-2 cursor-pointer rounded-full border-2 border-white bg-slate-300 p-2 duration-100 hover:scale-[1.03] dark:border-black dark:bg-slate-700 dark:text-white'>
            <Pencil className='bg-transparent' size={22} />
          </div>
        </div>

        <div className='relative -top-14 -mb-14 flex w-36 md:w-40'>
          <Image src='/images/profile.jpg' alt='' className='w-36 rounded-full bg-white p-1.5 dark:bg-black md:w-40' />
          <div className='absolute bottom-1 right-1 cursor-pointer rounded-full border-4 border-white bg-slate-300 p-2 duration-100 hover:scale-[1.03] dark:border-black dark:bg-slate-700 dark:text-white'>
            <Pencil className='' size={22} />
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
          <button className='rounded-full border border-accent/30 bg-accent/5 px-3 py-1 duration-200 hover:bg-accent/10'>
            214 followers
          </button>
          <button className='rounded-full border border-accent/30 bg-accent/5 px-3 py-1 duration-200 hover:bg-accent/10'>
            214 following
          </button>
        </div>
        <div></div>
      </div>
    </div>
  )
}
