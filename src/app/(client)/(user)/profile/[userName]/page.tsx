/* eslint-disable @next/next/no-img-element */
'use client'
import { Button } from '@/components/Button'
import { Screen0 } from '@/components/Screen'
import { colors, socialMediaUrls } from '@/lib/const'
import { nFormatter } from '@/utils/utils'
import { AnimatePresence, motion } from 'framer-motion'
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

interface PostInt {
  id: string
  name: string
  username: string
  profilePic: string
  time: number
  content: string
  image: string
  likes: number
  comments: number
  color:
    | 'slate'
    | 'stone'
    | 'red'
    | 'orange'
    | 'amber'
    | 'yellow'
    | 'lime'
    | 'green'
    | 'emerald'
    | 'teal'
    | 'cyan'
    | 'sky'
    | 'blue'
    | 'indigo'
    | 'violet'
    | 'purple'
    | 'pink'
    | 'fuchsia'
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

  const samplePost: PostInt = {
    id: '1',
    name: 'Ananta Karmanar',
    username: 'codeAntu',
    profilePic: '/images/profile.jpg',
    time: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).getTime(),
    content:
      'Hi everyone, I am a frontend developer. I am currently working on a project. I am looking for a job. If you have any job opportunity, please let me know. Thank you.',
    image: '/images/image.3.png',
    likes: 5382,
    comments: 5382,
    color: 'red',
  }

  function generatePosts(): PostInt[] {
    return colors.map((color, index) => ({
      ...samplePost,
      id: (index + 1).toString(),
      content: `This is a post with the color ${color}. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque, modi. Et porro libero vitae commodi vel omnis possimus beatae qui aut doloremque temporibus eaque, laboriosam exercitationem at? Minima, error quis?`,
      color: color as PostInt['color'],
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

function Post({ post }: { post: PostInt }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleContent = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div
      className={`flex flex-col gap-2 rounded-3xl border border-slate-400/5 px-2.5 py-3.5 pb-2.5 text-black sm:p-4 ${colors[post.color as keyof typeof colors].card}`}
    >
      <div className='flex items-start gap-3 px-0.5'>
        <Button variant='zero'>
          <img src='/images/profile.jpg' alt='' className='aspect-square w-12 rounded-full' />
        </Button>
        <div className='flex flex-grow select-none items-center justify-between'>
          <div>
            <Button
              variant='zero'
              className='text-sm font-semibold leading-tight'
              onClick={() => {
                console.log('clicked')
              }}
            >
              {post.name}
            </Button>
            <p className='text-xs text-black/50 md:text-black/80'>{post.time}</p>
          </div>
          <Button variant='icon' className='px-2 py-2'>
            <EllipsisVertical size={20} className='text-black' />
          </Button>
        </div>
      </div>
      <div
        className={`cursor-pointer px-1 text-xs font-medium text-black/80 sm:text-sm md:font-medium ${isExpanded ? '' : 'line-clamp-2'}`}
        onClick={toggleContent}
      >
        {post.content}
      </div>
      <div className='max-h-80 w-full overflow-hidden rounded-xl bg-red-300 object-contain sm:max-h-[350px] md:max-h-[500px]'>
        <img src='/images/image.2.png' alt='' className='w-full' />
      </div>
      <div className='flex select-none items-center justify-between gap-5 pl-1 sm:px-2'>
        <div className='flex flex-grow items-center gap-4 text-sm font-medium text-black/50 md:text-black/50'>
          <Button variant='zero' className='flex cursor-pointer items-center gap-1.5 font-normal'>
            <Heart size={20} className='' />
            <p className=''>{nFormatter(post.likes)}</p>
            <p className='hidden md:block'> {post.likes == 1 ? 'Like' : 'Likes'} </p>
          </Button>

          <Button variant='zero' className='flex cursor-pointer items-center gap-1.5 font-normal'>
            <MessageSquareText size={20} className='' />
            <p className=''>{nFormatter(post.comments)}</p>
            <p className='hidden md:block'> {post.comments == 1 ? 'Comment' : 'Comments'} </p>
          </Button>
        </div>
        <Button
          variant='zero'
          className={`cursor-pointer select-none rounded-full border-[0.5px] border-black/5 px-5 py-2 text-xs font-semibold ${colors[post.color as keyof typeof colors].button} text-black/45`}
        >
          set reaction
        </Button>
      </div>
    </div>
  )
}
