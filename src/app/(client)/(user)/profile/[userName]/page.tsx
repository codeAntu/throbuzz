/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'
import { Button } from '@/components/Button'
import Header from '@/components/Header'
import Img from '@/components/Img'
import Post from '@/components/Post'
import { Screen0 } from '@/components/Screen'
import PostSkeleton from '@/components/skeleton/PostSkeleton'
import ProfileSkeleton from '@/components/skeleton/ProfileSkeleton'
import { handleFollow, handleUnFollow } from '@/handelers/helpers/follow'
import { socialMediaUrls } from '@/lib/const'
import { PostT, UserT } from '@/lib/types'
import { nFormatter } from '@/utils/utils'
import axios from 'axios'
import {
  Calendar,
  GithubIcon,
  Instagram,
  Link,
  LinkedinIcon,
  Mail,
  MapPin,
  MessageCircleMore,
  MessageSquareText,
  MoveRight,
  Pencil,
  Phone,
  Search,
  SearchCheckIcon,
  SearchIcon,
  Twitter,
  User,
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
        <Button
          variant='zero'
          onClick={() => {
            router.push('/social')
          }}
          className=''
        >
          <Search size={22} className='' />
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
  const [user, setUser] = useState<UserT | null>(null)
  const [showMore, setShowMore] = useState(false)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [followed, setFollowed] = useState(false)

  async function getUser() {
    setLoading(true)
    try {
      const response = await axios.post('/api/user/getUser', { username: userName })
      setUser(response.data.user)
      setFollowed(response.data.user.isFollowing)
      console.log(response.data)
    } catch (error: any) {
      console.error(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    getUser()
  }, [])

  if (!user && loading) {
    return <ProfileSkeleton />
  }

  if (!user) {
    return (
      <div className='grid items-center gap-10 px-5 py-16 text-center'>
        <div className='space-y-6'>
          <img src='/icons/user.png' alt='' className='mx-auto h-16 w-16 rounded-full' />
          <div className='text-lg font-bold text-black/70 dark:text-white/70'>User not found.</div>
        </div>
        <Button
          className='mx-auto flex w-auto items-center gap-2.5 px-9 py-3'
          onClick={() => {
            router.push('/social')
          }}
        >
          <SearchIcon size={18} className='text-white dark:text-black' />
          <div className='text-sm font-medium'>Search for user </div>
          <MoveRight size={18} className='text-white dark:text-black' />
        </Button>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-5 px-5 py-4'>
      <div className='flex w-full items-center gap-5'>
        <div className='size-24 overflow-hidden rounded-full'>
          <Img imageUrl={user.profilePic.imageUrl} publicId={user.profilePic.publicId} height={500} width={500} />
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
          <>
            <Button
              variant='filled'
              className='border-2 border-black bg-black py-3 font-medium text-white'
              onClick={() => {
                router.push('/profile/edit')
              }}
            >
              <Pencil size={16} className='' />
              Edit
            </Button>
            <Button
              variant='outline'
              className='border-2 border-black py-2.5 font-medium text-black'
              onClick={() => {
                router.push('/post/create')
              }}
            >
              <MessageSquareText size={18} className='' />
              <span>Post</span>
            </Button>
          </>
        ) : (
          <>
            {followed ? (
              <Button
                variant='filled'
                className='border-2 border-black bg-black py-2.5 font-medium text-white dark:bg-white dark:text-black'
                onClick={async () => {
                  console.log('clicked')
                  const res = await handleUnFollow(user.id, setFollowed, setLoading)
                  if (res) {
                    setUser((prev) => (prev ? { ...prev, followers: prev.followers - 1 } : prev))
                  }
                }}
                disabled={loading}
              >
                <UserCheck size={18} className='' /> Following
              </Button>
            ) : (
              <Button
                variant='filled'
                className='border-2 border-black bg-black py-2.5 font-medium text-white dark:bg-white dark:text-black'
                onClick={async () => {
                  console.log('clicked')
                  const res = await handleFollow(user.id, setFollowed, setLoading)
                  if (res) {
                    setUser((prev) => (prev ? { ...prev, followers: prev.followers + 1 } : prev))
                  }
                }}
                disabled={loading}
              >
                <UserPlus size={18} className='' /> Follow
              </Button>
            )}

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
  const [posts, setPosts] = useState<PostT[]>([])
  const [nextPage, setNextPage] = useState('')
  const [loading, setLoading] = useState(true)

  async function getPosts() {
    setLoading(true)
    try {
      const response = await axios.post('/api/user/getUserPosts', { username: username.toLowerCase() })
      console.log(response.data.posts, 'posts')
      console.log(response.data.user, 'user')

      const newPosts = response.data.posts.map((post: any) => ({
        _id: post._id,
        author: {
          name: response.data.user.name,
          username: response.data.user.username,
          profilePic: {
            imageUrl: response.data.user.profilePic.imageUrl,
            publicId: response.data.user.profilePic.publicId,
          },
        },
        userId: response.data.user._id,
        text: post.text,
        postImages: post.postImages,
        visibility: post.visibility,
        likes: post.likes,
        comments: post.comments,
        createdAt: post.createdAt,
        isLiked: post.isLiked,
        isMine: response.data.user.isMe,
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
      <div className='space-y-2 px-5 py-5'>
        <div className='h-6 w-16 rounded-sm bg-gray-100 dark:bg-zinc-900'></div>
        <PostSkeleton />
      </div>
    )
  }

  if (posts.length === 0)
    return (
      <div className='px-5 py-16 text-center'>
        <div className='text-lg font-semibold text-black/70 dark:text-white/70'>Do not have any posts yet.</div>
      </div>
    )

  return (
    <>
      <div className='space-y-3 px-3.5 py-4'>
        {/* <div className='h-4 w-12 rounded-full bg-gray-50 dark:bg-zinc-900'>
          <div className='h-5 w-5 bg-slate-200/70'></div>
        </div> */}

        <div className='text-base font-semibold'>{posts.length > 0 && `Posts : ${posts.length}`}</div>
        {posts.map((post) => (
          <Post key={post._id} post={post} />
          // <PostSkeleton key={post._id} />
        ))}
      </div>
    </>
  )
}
