/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'

import { Button } from '@/components/Button'
import { NewPost } from '@/components/NewPost'
import Post from '@/components/Post'
import { Screen, Screen0 } from '@/components/Screen'
import Sidebar from '@/components/Sidebar'
import FeedSkeleton from '@/components/skeleton/FeedSkeleton'
import FollowSkeleton from '@/components/skeleton/FollowSkeleton'
import PostSkeleton from '@/components/skeleton/PostSkeleton'
import { PostT } from '@/lib/types'
import useStore from '@/store/store'
import axios from 'axios'
import { User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const pages = ['Recent', 'Following', 'Popular']

export default function Home() {
  const router = useRouter()
  const savedUser = useStore((state) => state.savedUser)
  const clearSavedUser = useStore((state) => state.clearSavedUser)
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState('Recent')

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    setIsLoading(!savedUser)
  }, [savedUser])

  function onLogOut() {
    clearSavedUser()
    router.push('/login')
  }

  if (isLoading) {
    return <FeedSkeleton />
  }

  return (
    <Screen0 className='gap-6'>
      <div className='sticky top-0 z-50 flex w-full items-center justify-between border-b border-black/5 bg-white/80 px-3 py-1.5 backdrop-blur-3xl dark:border-white/5 dark:bg-black/70'>
        <div className='xl:hidden'>
          <Sidebar />
        </div>

        <div className='flex w-full items-center justify-between'>
          <div className='text-xl font-bold text-black/90 dark:text-white/90 sm:text-2xl'>Feeds</div>
          <div className='flex items-center justify-end rounded-full bg-slate-100 text-xs dark:bg-zinc-900 dark:text-white'>
            {pages.map((p, i) => (
              <Button
                key={i}
                variant='zero'
                className={`px-3 py-2 text-[10px] font-semibold ${page === p ? 'rounded-full bg-slate-300 px-4 text-black dark:bg-zinc-400' : 'text-black/30 dark:text-white/50'}`}
                onClick={() => {
                  setPage(p)
                  scrollToTop()
                }}
              >
                {p}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className='px-3'>
        <NewPost savedUser={savedUser} />
      </div>

      <div className='px-3'>
        {page === 'Recent' && <Recent />}
        {page === 'Following' && <Following />}
        {page === 'Popular' && <Popular />}
      </div>
    </Screen0>
  )
}

function Recent() {
  const [posts, setPosts] = useState<PostT[] | null>(null)
  const [nextPageUrl, setNextPageUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const ref = useRef<HTMLDivElement>(null)

  async function getPosts(url: string) {
    setLoading(true)
    try {
      const response = await axios.post(url)
      console.log(response)
      if (posts?.length === 0) {
        setPosts(response.data.posts)
      } else {
        setPosts((prev) => (prev ? [...prev, ...response.data.posts] : response.data.posts))
      }
      setNextPageUrl(response.data.nextPageUrl)
    } catch (error: any) {
      console.error(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    getPosts('/api/feed/recent')
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextPageUrl) {
          getPosts(nextPageUrl)
        }
      },
      { threshold: 1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  })

  return (
    <div className='space-y-4'>
      {loading && !posts && (
        <div className='space-y-4'>
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}
      {!loading && !posts?.length && (
        <div className='flex h-[50dvh] items-center justify-center'>
          <div className='flex flex-col items-center gap-2'>
            {/* <User size={40} /> */}
            <div className='text-center text-lg font-semibold'>No Posts </div>
          </div>
        </div>
      )}
      {posts && posts.map((post, index) => <Post key={index} post={post} />)}
      <div ref={ref}></div>
    </div>
  )
}

function Following() {
  const [posts, setPosts] = useState<PostT[] | null>(null)
  const [nextPageUrl, setNextPageUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const ref = useRef<HTMLDivElement>(null)

  async function getPosts(url: string) {
    setLoading(true)
    try {
      const response = await axios.post(url)
      console.log(response)
      if (posts?.length === 0) {
        setPosts(response.data.posts)
      } else {
        setPosts((prev) => (prev ? [...prev, ...response.data.posts] : response.data.posts))
      }
      setNextPageUrl(response.data.nextPageUrl)
    } catch (error: any) {
      console.error(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    getPosts('/api/feed/following')
  }, [])

  console.log(nextPageUrl)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextPageUrl) {
          getPosts(nextPageUrl)
        }
      },
      { threshold: 1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  })
  return (
    <div className='space-y-4'>
      {loading && !posts && (
        <div className='space-y-4'>
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}
      {!loading && !posts?.length && (
        <div className='flex h-[50dvh] items-center justify-center'>
          <div className='flex flex-col items-center gap-2'>
            {/* <User size={40} /> */}
            <div className='text-center text-lg font-semibold'>No Posts </div>
          </div>
        </div>
      )}
      {posts && posts.map((post, index) => <Post key={index} post={post} />)}

      <div ref={ref}></div>
    </div>
  )
}

function Popular() {
  const [posts, setPosts] = useState<PostT[] | null>(null)
  const [nextPageUrl, setNextPageUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const ref = useRef<HTMLDivElement>(null)

  async function getPosts(url: string) {
    try {
      const response = await axios.post(url)
      console.log(response.data)
      if (posts?.length === 0) {
        setPosts(response.data.posts)
      } else {
        setPosts((prev) => (prev ? [...prev, ...response.data.posts] : response.data.posts))
      }
      setNextPageUrl(response.data.nextPageUrl)
    } catch (error: any) {
      console.error(error)
    }
  }

  useEffect(() => {
    getPosts('/api/feed/popular')
  }, [])

  console.log(posts)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextPageUrl) {
          getPosts(nextPageUrl)
        }
      },
      { threshold: 1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  })

  return (
    <div className='space-y-4'>
      {loading && !posts && (
        <div className='space-y-4'>
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}
      {!loading && !posts?.length && (
        <div className='flex h-[50dvh] items-center justify-center'>
          <div className='flex flex-col items-center gap-2'>
            {/* <User size={40} /> */}
            <div className='text-center text-lg font-semibold'>No Posts </div>
          </div>
        </div>
      )}
      {posts && posts.map((post, index) => <Post key={index} post={post} />)}

      <div ref={ref}></div>
    </div>
  )
}
