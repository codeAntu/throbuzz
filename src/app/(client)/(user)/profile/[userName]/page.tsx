/* eslint-disable @next/next/no-img-element */
'use client'
import { Button } from '@/components/Button'
import Post, { PostT } from '@/components/Post'
import { Screen0 } from '@/components/Screen'
import { socialMediaUrls } from '@/lib/const'
import { nFormatter } from '@/utils/utils'
import {
  Calendar,
  ChevronLeft,
  Ellipsis,
  GithubIcon,
  Instagram,
  Link,
  LinkedinIcon,
  Mail,
  MapPin,
  MessageCircleMore,
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
  github: GithubIcon,
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
      <div className='w-full'>
        <Profile />
        <hr />
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
      instagram: 'codeAntu',
      twitter: 'codeAntu',
      github: 'codeAntu',
      linkedin: 'codeAntu',
      website: 'codeAntu',
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
    <div className='flex flex-col gap-5 px-5 py-4'>
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
              <div className='text-xs text-neutral-500'>Followers</div>
            </div>
            <div>
              <div className='text-sm font-semibold leading-tight'>{nFormatter(user.following)}</div>
              <div className='text-xs text-neutral-500'>Following</div>
            </div>
            <div>
              <div className='text-sm font-semibold leading-tight'>{nFormatter(user.posts)}</div>
              <div className='text-xs text-neutral-500'>Posts</div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex gap-4'>
        {user.isMe ? (
          <Button variant='filled' className='border-2 border-black bg-black py-3 font-medium text-white'>
            <Pencil size={16} className='' />
            Edit Profile
          </Button>
        ) : (
          <>
            <Button
              variant='filled'
              className='border-2 border-black bg-black py-2.5 font-medium text-white dark:bg-white dark:text-black'
            >
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
              const isSocialMedia = key in socialMediaUrls
              const url = isSocialMedia ? socialMediaUrls[key as keyof typeof socialMediaUrls] + value : ''

              return (
                <div key={key} className='flex items-center gap-3'>
                  {Icon && <Icon size={16} className='text-black dark:text-white' />}
                  {isSocialMedia ? (
                    <a
                      href={url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-xs font-medium underline hover:text-accent'
                    >
                      @{value}
                    </a>
                  ) : (
                    <p className='text-xs font-medium'>{value}</p>
                  )}
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
  const colors = [
    'stone',
    'slate',
    'orange',
    'amber',
    // 'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'red',
  ]

  const samplePost: PostT = {
    id: '1',
    name: 'Ananta Karmanar',
    username: 'codeAntu',
    profilePic: '/images/profile.jpg',
    time: 1630000000000,
    content:
      'Hi everyone, I am a frontend developer. I am currently working on a project. I am looking for a job. If you have any job opportunity, please let me know. Thank you.',
    image: ['/images/image.2.png', '/images/image.2.png', '/images/image.2.png'],
    likes: 5382,
    comments: 5382,
    color: 'red',
  }

  function generatePosts(): PostT[] {
    return colors.map((color, index) => ({
      ...samplePost,
      id: (index + 1).toString(),
      content: `This is a post with the color ${color}. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque, modi. Et porro libero vitae commodi vel omnis possimus beatae qui aut doloremque temporibus eaque, laboriosam exercitationem at? Minima, error quis?`,
      color: color as PostT['color'],
    }))
  }

  const posts = generatePosts()

  return (
    <>
      <div className='space-y-3 px-3.5 py-4'>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </>
  )
}
