/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'
import { Button } from '@/components/Button'
import Header from '@/components/Header'
import Post, { PostT } from '@/components/Post'
import { Screen0 } from '@/components/Screen'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { follow } from '@/handelers/user/follow'
import { socialMediaUrls } from '@/lib/const'
import { UserT } from '@/lib/types'
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
  UserCheck,
  UserPlus,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

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
        {/* <Posts username={params.userName} /> */}
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
  const [loading, setLoading] = useState(true)
  const [followed, setFollowed] = useState(false)

  async function getUser() {
    setLoading(true)
    try {
      const response = await axios.post('/api/user/getUser', { username: userName })
      setUser(response.data.user)
      console.log(response.data)
    } catch (error: any) {
      console.error(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    getUser()
  }, [])

  async function handleFollow() {
    setFollowed(true)
    const response = await follow(userName)
    if (response.error) {
      console.error(response.error)
      setFollowed(false)
      return
    }
    setFollowed(true)
    console.log(response)
  }

  if (loading) {
    return (
      <div className='px-5 py-16 text-center'>
        <div className='text-lg font-semibold text-black/70 dark:text-white/70'>Loading...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className='px-5 py-16 text-center'>
        <div className='text-lg font-semibold text-black/70 dark:text-white/70'>User not found.</div>
      </div>
    )
  }

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
              onClick={handleFollow}
            >
              {followed ? (
                <div className='flex gap-2'>
                  <UserCheck size={18} className='' /> <span>Followed</span>{' '}
                </div>
              ) : (
                <div className='flex gap-2'>
                  <UserPlus size={18} className='' /> Follow
                </div>
              )}
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
              More...x``
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function Posts({ username }: { username: string }) {
  const [posts, setPosts] = useState<PostT[]>()
  const [nextPage, setNextPage] = useState('')
  const [loading, setLoading] = useState(true)

  async function getPosts() {
    setLoading(true)
    try {
      const response = await axios.post('/api/user/getUserPosts', { username })
      const newPosts = response.data.posts.map((post: any) => ({
        id: post._id,
        name: response.data.user.name,
        username: response.data.user.username,
        profilePic: response.data.user.profilePic,
        time: post.createdAt,
        content: post.text,
        image: post.publicIds,
        likes: post.likes,
        comments: post.comments,
        color: post.color || 'stone',
      }))

      setPosts([...(posts || []), ...newPosts])

      setNextPage(response.data.nextPage)
    } catch (error: any) {
      console.error(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    getPosts()
  }, [username])

  if (loading) {
    return (
      <div className='px-5 py-16 text-center'>
        <div className='text-lg font-semibold text-black/70 dark:text-white/70'>Loading...</div>
      </div>
    )
  }

  if (!posts)
    return (
      <div className='px-5 py-16 text-center'>
        <div className='text-lg font-semibold text-black/70 dark:text-white/70'>Do not have any posts yet.</div>
      </div>
    )

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
