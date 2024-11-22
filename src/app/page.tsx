/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'

import { Button } from '@/components/Button'
import { NewPost } from '@/components/NewPost'
import Post from '@/components/Post'
import { Screen } from '@/components/Screen'
import Sidebar from '@/components/Sidebar'
import { PostT } from '@/lib/types'
import useStore from '@/store/store'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const pages = ['Recent', 'Following', 'Popular']

export default function Home() {
  const router = useRouter()
  const savedUser = useStore((state) => state.savedUser)
  const clearSavedUser = useStore((state) => state.clearSavedUser)
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState('Recent')

  useEffect(() => {
    setIsLoading(!savedUser)
  }, [savedUser])

  function onLogOut() {
    clearSavedUser()
    router.push('/login')
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Screen className='gap-6'>
      <div className='flex w-full items-center justify-between'>
        <Sidebar />
        <div className='flex w-full items-center justify-between'>
          <div className='text-xl font-bold text-black/90 dark:text-white/90 sm:text-2xl'>Feeds</div>
          <div className='flex items-center justify-end rounded-full bg-slate-100 text-xs dark:bg-zinc-900 dark:text-white'>
            {pages.map((p, i) => (
              <Button
                key={i}
                variant='zero'
                className={`px-3 py-2 text-[10px] font-semibold ${page === p ? 'mx-2 rounded-full bg-slate-300 px-4 text-black dark:bg-zinc-400' : 'text-black/30 dark:text-white/50'}`}
                onClick={() => setPage(p)}
              >
                {p}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <NewPost savedUser={savedUser} />
      </div>

      <div>
        {page === 'Recent' && <Recent />}
        {page === 'Following' && <Following />}
        {page === 'Popular' && <Popular />}
      </div>
    </Screen>
  )
}

function Recent() {
  const [posts, setPosts] = useState<PostT[] | []>([])
  const [nextPageUrl, setNextPageUrl] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  async function getPosts(url: string) {
    try {
      const response = await axios.post(url)
      console.log(response)
      if (posts.length === 0) {
        setPosts(response.data.posts)
      } else {
        setPosts((prev) => [...prev, ...response.data.posts])
      }
      setNextPageUrl(response.data.nextPageUrl)
    } catch (error: any) {
      console.error(error)
    }
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
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
      <div ref={ref}></div>
    </div>
  )
}

function Following() {
  const [posts, setPosts] = useState<PostT[] | []>([])
  const [nextPageUrl, setNextPageUrl] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  async function getPosts(url: string) {
    try {
      const response = await axios.post(url)
      console.log(response.data)
      if (posts.length === 0) {
        setPosts(response.data.posts)
      } else {
        setPosts((prev) => [...prev, ...response.data.posts])
      }
      setNextPageUrl(response.data.nextPageUrl)
    } catch (error: any) {
      console.error(error)
    }
  }

  useEffect(() => {
    getPosts('/api/feed/friends')
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
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
      <div ref={ref}></div>
    </div>
  )
}

function Popular() {
  const [posts, setPosts] = useState<PostT[] | []>([])
  const [nextPageUrl, setNextPageUrl] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  async function getPosts(url: string) {
    try {
      const response = await axios.post(url)
      console.log(response.data)
      if (posts.length === 0) {
        setPosts(response.data.posts)
      } else {
        setPosts((prev) => [...prev, ...response.data.posts])
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
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
      <div ref={ref}></div>
    </div>
  )
}
