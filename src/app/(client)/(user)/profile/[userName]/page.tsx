/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'
import { Button } from '@/components/Button'
import Header from '@/components/Header'
import Post, { PostT } from '@/components/Post'
import { Screen0 } from '@/components/Screen'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { socialMediaUrls } from '@/lib/const'
import { nFormatter } from '@/utils/utils'
import axios from 'axios'
import {
  Calendar,
  ChevronLeft,
  Ellipsis,
  EllipsisVertical,
  GithubIcon,
  Instagram,
  Link,
  LinkedinIcon,
  Mail,
  MapPin,
  MessageCircleMore,
  Pencil,
  Phone,
  Settings,
  Trash2,
  Twitter,
  UserPlus,
} from 'lucide-react'
import { routeModule } from 'next/dist/build/templates/app-page'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'

const Icons = {
  instagram: Instagram,
  twitter: Twitter,
  email: Mail,
  phone: Phone,
  mapPin: MapPin,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  website: Link,
  dob: Calendar,
}

interface UserT {
  id: string
  name: string
  username: string
  bio: string
  profilePic: string
  followers: number
  following: number
  posts: number
  isMe: boolean
  about: {
    email: string
    phone: string
    mapPin: string
    instagram: string
    twitter: string
    github: string
    linkedin: string
    website: string
    dob: string
  }
}

export default function UserProfile({
  params,
}: {
  params: {
    userName: string
    [key: string]: any
  }
}) {
  const router = useRouter()
  return (
    <Screen0 className=''>
      <Header title='Profile'>
        <Button variant='icon'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className='p-2'>
              <Ellipsis size={20} className='' />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              className='border border-black/10 bg-white/10 backdrop-blur-md dark:border-white/10 dark:bg-black/25'
            >
              <DropdownMenuItem
                className=''
                onClick={() => {
                  router.push('/settings')
                }}
              >
                <Settings size={17} className='mr-2' />
                Setting
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Button>
      </Header>
      <div className='w-full'>
        <Profile userName={params.userName} />
        <hr />
        <Posts username={params.userName} />
      </div>
    </Screen0>
  )
}

function Profile({ userName }: { userName: string }) {
  const [user, setUser] = useState<UserT>({
    id: '',
    name: '',
    username: '',
    bio: '',
    profilePic: '',
    followers: 0,
    following: 0,
    posts: 0,
    isMe: false,
    about: {
      email: '',
      phone: '',
      mapPin: '',
      instagram: '',
      twitter: '',
      github: '',
      linkedin: '',
      website: '',
      dob: '',
    },
  })
  const [showMore, setShowMore] = useState(false)
  const router = useRouter()

  async function getUser() {
    try {
      const response = await axios.post('/api/user/getUser', { username: userName })
      setUser(response.data.user)
      console.log(response.data)
    } catch (error: any) {
      console.error(error)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className='flex flex-col gap-5 px-5 py-4'>
      <div className='flex w-full items-center gap-5'>
        <div>
          <img src={user.profilePic} alt='' className='aspect-square w-28 rounded-full' />
        </div>
        <div className='grid flex-grow gap-5 py-4'>
          <div>
            <div className='line-clamp-1 text-base font-semibold leading-none'>{user.name}</div>
            <div className='line-clamp-1 text-sm'>{user.username}</div>
          </div>
          <div className='flex w-full items-center gap-8 text-center'>
            <Button
              variant='zero'
              onClick={() => {
                router.push(`/profile/${user.username}/followers`)
              }}
              className='flex-col gap-0'
            >
              <div className='text-sm font-semibold leading-tight'>{nFormatter(user.followers)}</div>
              <div className='text-xs font-normal text-neutral-500'>Followers</div>
            </Button>
            <Button
              variant='zero'
              onClick={() => {
                router.push(`/profile/${user.username}/following`)
              }}
              className='flex-col gap-0'
            >
              <div className='text-sm font-semibold leading-tight'>{nFormatter(user.following)}</div>
              <div className='text-xs font-normal text-neutral-500'>Following</div>
            </Button>
            <div>
              <div className='text-sm font-semibold leading-tight'>{nFormatter(user.posts)}</div>
              <div className='text-xs text-neutral-500'>Posts</div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex gap-4'>
        {user.isMe ? (
          <Button
            variant='filled'
            className='border-2 border-black bg-black py-3 font-medium text-white'
            onClick={() => {
              router.push('/profile/edit')
            }}
          >
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
            Object.entries(user.about)
              .filter(([key, value]) => value != '')
              .map(([key, value], index) => {
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
          {!showMore && Object.entries(user.about).filter(([key, value]) => value != '').length > 4 && (
            <button onClick={() => setShowMore(true)} className='px-0.5 text-xs text-accent'>
              More...
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function Posts({ username }: { username: string }) {
  const colors = [
    'stone',
    'slate',
    'orange',
    'amber',
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
    image: ['/images/img1.png', '/images/img2.png', '/images/img3.png', '/images/img4.png', '/images/img5.png'],
    // image: ['/images/img1.png'],
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
