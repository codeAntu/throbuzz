'use client'
import { Screen, Screen0 } from '@/components/Screen'
import ProfileLayout from '../layout'
import { Bold, Bolt, ChevronLeft, LogIn, MoveLeft, Pencil, Search, Settings } from 'lucide-react'
import { Button, MotionButton } from '@/components/Button'
import { useRouter } from 'next/navigation'
import Post from '@/components/Post'
import axios from 'axios'
import { Ic } from '@/components/Icon'
import { motion } from 'framer-motion'

export default function UserProfile({ params }: { params: any }) {
  const router = useRouter()

  async function onLogout() {
    try {
      const response = await axios.post('/api/auth/logout')
      console.log('response', response.data)
      router.push('/login')
    } catch (error: any) {
      console.log('Logout failed')
      console.log('error', error.response)
    }
  }

  return (
    <Screen0 className='max-w-[700px]'>
      <div className='flex w-full flex-grow items-center justify-between gap-4 bg-white px-1 py-2 dark:bg-black'>
        <ChevronLeft
          onClick={() => router.back()}
          className='rounded-lg text-black/50 hover:cursor-pointer hover:bg-blue-50 dark:text-white/50'
          size={32}
        />
        <div className='flex max-w-[400px] flex-grow items-center justify-between gap-2 rounded-full border-[1.5px] border-black/50 px-2 py-1 dark:border-white/50'>
          <input
            type='text'
            className='px-1 text-sm text-black/70 outline-none dark:text-white/70'
            value='codeAntu'
            placeholder='search '
          />
          <Search
            className='rounded-lg p-0.5 text-black/50 hover:cursor-pointer hover:bg-blue-50 dark:text-white/50'
            size={28}
          />
        </div>
        <Bolt
          className='rounded-lg px-1 text-black/50 hover:cursor-pointer hover:bg-blue-50 dark:text-white/50'
          onClick={() => router.push('/settings')}
          size={32}
        />
      </div>

      <Bio />
      <About />
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
    <div className='grid gap-2 border-t-2 px-5 py-5 pt-3'>
      <div>
        <div className='text-lg font-semibold'>About</div>
      </div>
      <div>
        {/* <div className='text-base font-medium'>Bio</div> */}
        <div className='text-sm text-black/70 dark:text-black/70'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt reiciendis accusamus rem illum repudiandae
          nostrum sed sequi! Vero quidem non architecto. Illo quaerat iure rerum magni soluta hic architecto quas?
        </div>
      </div>
    </div>
  )
}

function Bio() {
  return (
    <div className=''>
      <div className=''>
        <div className='relative'>
          <img src='/images/bg2.jpg' alt='' className='max-h-36 w-full bg-red-500 object-cover md:max-h-40' />
          <MotionButton
            onClick={() => {
              console.log('clicked')
            }}
            className='absolute bottom-2 right-2 cursor-pointer rounded-full border-2 border-white bg-slate-300 p-2 dark:border-black dark:bg-slate-700 dark:text-white'
          >
            <Pencil className='' size={22} />
          </MotionButton>
        </div>
        <div className='flex w-full items-center justify-between px-2'>
          <div className='relative -top-14 -mb-14 flex w-36 md:w-40'>
            <img
              src='/images/profile.jpg'
              alt=''
              className='w-36 rounded-full bg-white p-1 dark:bg-black md:w-40 md:p-1.5'
            />
            <MotionButton
              onClick={() => {
                console.log('clicked')
              }}
              className='absolute bottom-1 right-1 cursor-pointer rounded-full border-2 border-white bg-slate-300 p-2 duration-100 hover:scale-[1.03] dark:border-black dark:bg-slate-700 dark:text-white'
            >
              <Pencil className='' size={22} />
            </MotionButton>
          </div>
          <MotionButton className='flex items-center justify-center gap-1 rounded-full border border-accent/60 bg-accent/5 px-4 py-1 text-sm text-accent duration-150 hover:bg-accent/10'>
            <Pencil className='' size={16} />
            Edit Profile
          </MotionButton>
        </div>
      </div>
      <div className='flex flex-col justify-center gap-2 px-5 py-3'>
        <div>
          <div className='line-clamp-2 text-2xl font-semibold leading-6'>Ananta Karmakar</div>
          <div className='line-clamp-1 text-sm font-semibold text-black/70 dark:text-white/70'>@codeAntu </div>
        </div>
        <div className='line-clamp-3 text-sm font-medium text-black/70 dark:text-white/70'>
          Frontend Developer | React & Next.js | Freelancer | JS | Competitive Programmer Frontend Developer | React &
          Next.js | Freelancer | JS | Competitive Programmer Frontend Developer | React Frontend Developer | React &
          Next.js | Freelancer | JS | Competitive Programmer & Next.js | Freelancer | JS | Competitive Programmer2222
        </div>
        {/* <div className='flex items-center justify-normal gap-1 py-1 text-sm font-medium text-accent dark:text-accent/80'>
          <button className='rounded-full border border-accent/30 bg-accent/5 px-3 py-1 duration-200 hover:bg-accent/10'>
            214 followers
          </button>
          <button className='rounded-full border border-accent/30 bg-accent/5 px-3 py-1 duration-200 hover:bg-accent/10'>
            214 following
          </button>
        </div> */}

        <div className='flex items-center justify-normal gap-4 py-1 text-sm font-medium'>
          <MotionButton className=''>
            214 <span className='text-black/50 dark:bg-white/50'> followers</span>
          </MotionButton>
          <MotionButton className=''>
            214 <span className='text-black/50 dark:bg-white/50'> following </span>
          </MotionButton>
        </div>
        <div></div>
      </div>
    </div>
  )
}
