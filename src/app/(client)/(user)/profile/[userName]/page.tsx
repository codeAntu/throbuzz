/* eslint-disable @next/next/no-img-element */
'use client'
import { Button } from '@/components/Button'
import { Screen0 } from '@/components/Screen'
import {
  Calendar,
  ChevronLeft,
  EllipsisVertical,
  Github,
  Heart,
  Instagram,
  Link,
  Linkedin,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Twitter,
} from 'lucide-react'

interface UserResponseT {
  _id: string
  name: string
  username: string
  bio: string
  about: string
  profilePic: string
  coverPic: string
  followers: number
  following: number
  isMe: boolean
}

export default function UserProfile({
  params,
}: {
  params: {
    userName: string
    [key: string]: any
  }
}) {
  console.log('params', params)

  return (
    <Screen0>
      <Header />
      <div className='w-full px-5'>
        <Profile />
        <Posts />
      </div>
    </Screen0>
  )
}

function Header() {
  return (
    <div className='sticky top-0 z-10 flex w-full flex-grow items-center justify-between border-b border-black/5 bg-white/80 px-5 py-3.5 backdrop-blur-3xl dark:border-white/5 dark:bg-black/70'>
      <Button variant='icon'>
        <ChevronLeft size={32} className='-ml-3' />
      </Button>
      <div className='text-[15px] font-semibold'>Profile</div>
      <Button variant='icon'>
        <EllipsisVertical size={28} />
      </Button>
    </div>
  )
}

function Profile() {
  return (
    <div className='flex flex-col gap-5 py-4'>
      <div className='flex w-full items-center gap-5'>
        <div>
          <img src='/images/profile.jpg' alt='' className='w-28 rounded-full' />
        </div>
        <div className='grid flex-grow gap-5 py-4'>
          <div>
            <div className='line-clamp-1 text-base font-semibold leading-none'>Ananta Karmakar</div>
            <div className='line-clamp-1 text-sm'>@codeAntu</div>
          </div>
          <div className='flex w-full items-center gap-8 text-center'>
            <div>
              <div className='text-sm font-semibold leading-tight'>2.3k</div>
              <div className='text-xs text-neutral-500'>Posts</div>
            </div>
            <div>
              <div className='text-sm font-semibold leading-tight'>5.4k</div>
              <div className='text-xs text-neutral-500'>Followers</div>
            </div>
            <div>
              <div className='text-sm font-semibold leading-tight'>2k</div>
              <div className='text-xs text-neutral-500'>Following</div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex gap-4'>
        {/* <Button className='border-2 border-black bg-black py-3 font-medium text-white'>Edit Profile</Button> */}
        <Button className='border-2 border-black bg-black py-2.5 font-medium text-white dark:bg-white dark:text-black'>
          Follow
        </Button>
        <Button variant='outline' className='border-2 border-black py-2.5 font-medium text-black'>
          Message
        </Button>
      </div>
      <div className='space-y-1'>
        <div className='text-base font-semibold'>About</div>
        <div className='space-y-2'>
          <div className='text-[13px]'>
            Frontend Developer | React & Next.js | Freelancer | JS | Competitive Programmer
          </div>
          <div className='flex items-center gap-2'>
            <Mail size={20} className='text-black' />
            <p className='text-[13px] text-black/80'>codeAntu@gmail.com</p>
          </div>
          <div className='flex items-center gap-2'>
            <Phone size={20} className='text-black' />
            <p className='text-xs'>9800211400</p>
          </div>
          <div className='flex items-center gap-2'>
            <MapPin size={20} className='text-black' />
            <p className='text-xs'>Mogra , Bankura </p>
          </div>
          <div className='flex items-center gap-2'>
            <Instagram size={20} className='text-black' />
            <p className='text-xs'>@codeAntu</p>
          </div>
          <div className='flex items-center gap-2'>
            <Twitter size={20} className='text-black' />
            <p className='text-xs'>@codeAntu</p>
          </div>{' '}
          {/* <div className='flex items-center gap-2'>
            <Linkedin size={20} className='text-black' />
            <p className='text-xs'>@codeAntu</p>
          </div>{' '}
          <div className='flex items-center gap-2'>
            <Github size={20} className='text-black' />
            <p className='text-xs'>@codeAntu</p>
          </div>{' '}
          <div className='flex items-center gap-2'>
            <Link size={20} className='text-black' />
            <p className='text-xs'>@codeAntu</p>
          </div>
          <div className='flex items-center gap-2'>
            <Calendar size={20} className='text-black' />
            <p className='text-xs'>11 October 2003</p>
          </div> */}
        </div>
      </div>
    </div>
  )
}
function Posts() {
  return (
    <>
      <div className='space-y-3'>
        {/* <div className='text-base font-semibold'>Posts</div> */}
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </>
  )
}

function Post() {
  return (
    <div className='flex flex-col gap-2 rounded-3xl bg-purple-300/40 p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <>
            <img src='/images/profile.jpg' alt='' className='aspect-square w-14 rounded-full' />
          </>
          <div>
            <h1 className='text-sm font-semibold leading-tight'>Ananta Karmakar</h1>
            <p className='text-xs text-transparent/50'>2 hours ago</p>
          </div>
        </div>
        <>
          <EllipsisVertical size={22} />
        </>
      </div>
      <div className='line-clamp-2 text-[13px] font-medium'>
        Hi everyone, I am a frontend developer. I am currently working on a project. I am looking for a job. If you have
        any job opportunity, please let me know. Thank you.
      </div>
      <div className='py-1.5'>
        <img src='/images/image.3.png' alt='' className='rounded-xl' />
      </div>
      <div className='flex items-center justify-between gap-5'>
        <div className='flex flex-grow items-center gap-4'>
          <div className='flex items-center gap-1.5'>
            <Heart size={22} className='font-semibold text-red-500 text-transparent/50' />
            <p className='text-sm font-semibold text-transparent/50'>5382</p>
          </div>
          <div className='flex items-center gap-1.5'>
            <MessageSquareText size={20} className='font-semibold text-transparent/50' />
            <p className='text-sm font-semibold text-transparent/50'>5382</p>
          </div>
        </div>
        <div className='rounded-full border bg-purple-300/50 px-5 py-2 text-xs font-semibold text-transparent/50'>
          set reaction
        </div>
      </div>
    </div>
  )
}
