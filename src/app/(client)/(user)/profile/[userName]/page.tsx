/* eslint-disable @next/next/no-img-element */
'use client'
import { Button } from '@/components/Button'
import { Screen0 } from '@/components/Screen'
import { nFormatter } from '@/lib/utils'
import {
  Calendar,
  ChevronLeft,
  Ellipsis,
  EllipsisVertical,
  GithubIcon,
  Heart,
  Instagram,
  Link,
  LinkedinIcon,
  Mail,
  MapPin,
  MessageCircleMore,
  MessageSquareText,
  Pencil,
  Phone,
  Twitter,
  UserPlus,
} from 'lucide-react'
import { useState } from 'react'

const Icons = {
  instagram: Instagram,
  twitter: Twitter,
  mail: Mail,
  phone: Phone,
  mapPin: MapPin,
  github: GithubIcon, // Add appropriate icons for these keys
  linkedin: LinkedinIcon,
  website: Link,
  dob: Calendar,
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
        <Ellipsis size={28} />
      </Button>
    </div>
  )
}

function Profile() {
  const user: User = {
    _id: '1',
    name: 'Ananta Karmakar',
    username: 'codeAntu',
    bio: 'Frontend Developer | React & Next.js | Freelancer | JS | Competitive Programmer',
    profilePic: '/images/profile.jpg',
    followers: 5400000,
    following: 2000,
    posts: 560,
    isMe: false,
    about: {
      mail: 'codeantu@gmailcom',
      phone: '9800211400',
      mapPin: 'Mogra , Bankura',
      instagram: '@codeAntu',
      twitter: '@codeAntu',
      github: '@codeAntu',
      linkedin: '@codeAntu',
      website: '@codeAntu',
      dob: '11 October 2003',
    },
  }

  interface User {
    _id: string
    name: string
    username: string
    bio: string
    profilePic: string
    followers: number
    following: number
    posts: number
    isMe: boolean
    about: Record<string, string>
  }

  const [showMore, setShowMore] = useState(false)

  return (
    <div className='flex flex-col gap-5 py-4'>
      <div className='flex w-full items-center gap-5'>
        <div>
          <img src={user.profilePic} alt='' className='w-28 rounded-full' />
        </div>
        <div className='grid flex-grow gap-5 py-4'>
          <div>
            <div className='line-clamp-1 text-base font-semibold leading-none'>{user.name}</div>
            <div className='line-clamp-1 text-sm'>{user.username}</div>
          </div>
          <div className='flex w-full items-center gap-8 text-center'>
            <div>
              <div className='text-sm font-semibold leading-tight'>{nFormatter(user.followers)}</div>
              <div className='text-xs text-neutral-500'>Posts</div>
            </div>
            <div>
              <div className='text-sm font-semibold leading-tight'>{nFormatter(user.following)}</div>
              <div className='text-xs text-neutral-500'>Followers</div>
            </div>
            <div>
              <div className='text-sm font-semibold leading-tight'>{nFormatter(user.posts)}</div>
              <div className='text-xs text-neutral-500'>Following</div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex gap-4'>
        {user.isMe ? (
          <Button variant='filled' className='border-2 border-black bg-black py-3.5 font-medium text-white'>
            <Pencil size={16} className='' />
            Edit Profile
          </Button>
        ) : (
          <>
            <Button className='border-2 border-black bg-black py-2.5 font-medium text-white dark:bg-white dark:text-black'>
              <UserPlus size={18} className='' />
              <span>Follow</span>
            </Button>
            <Button variant='outline' className='border-2 border-black py-2.5 font-medium text-black'>
              <MessageCircleMore size={18} className='' />
              <span>Message</span>
            </Button>
          </>
        )}
      </div>
      <div className='space-y-1'>
        <div className='text-base font-semibold'>About</div>
        <div className='space-y-2'>
          <div className='text-[13px]'>{user.bio}</div>

          {user.about &&
            Object.entries(user.about).map(([key, value], index) => {
              if (!showMore && index >= 4) return null
              const Icon = Icons[key as keyof typeof Icons]
              return (
                <div key={key} className='flex items-center gap-3'>
                  {Icon && <Icon size={16} className='text-black dark:text-white' />}
                  <p className='text-xs font-medium'>{value}</p>
                </div>
              )
            })}
          {!showMore && Object.entries(user.about).length > 4 && (
            <button onClick={() => setShowMore(true)} className='px-0.5 text-xs text-accent'>
              More...
            </button>
          )}
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
