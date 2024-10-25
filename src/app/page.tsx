/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'

import { Button } from '@/components/Button'
import Post, { PostT } from '@/components/Post'
import { Screen } from '@/components/Screen'
import Sidebar from '@/components/Sidebar'
import Slider from '@/components/Sidebar'
import useStore from '@/store/store'
import axios from 'axios'
import { ChevronDown, Earth, Image, ImageUp, Menu } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const router = useRouter()

  const savedUser = useStore((state) => state.savedUser)
  const clearSavedUser = useStore((state) => state.clearSavedUser)

  async function onLogOut() {
    try {
      const response = await axios.post('/api/auth/logout')

      console.log('response', response.data.message)
      clearSavedUser()
      router.push('/login')
    } catch (error) {}
  }

  async function sendFriendRequest() {
    try {
      const response = await axios.post('/api/user/sendFriendRequest', {
        username: 'codeantu',
      })

      console.log('response', response.data)
    } catch (error: any) {
      console.log('error', error.response.data.error)
    }
  }

  async function acceptFriendRequest() {
    try {
      const response = await axios.post('/api/user/acceptFriendRequest', {
        friendRequestId: '66dbfbf268673da73fd26063',
      })

      console.log('response', response.data)
    } catch (error) {
      console.log('error', error)
    }
  }

  async function deleteFriendRequest() {
    try {
      const response = await axios.delete('/api/user/deleteFriendRequest', {
        data: {
          friendRequestId: '66dbfcc5a207e827ae9d3ea2',
        },
      })

      console.log('response', response.data)
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <Screen className='gap-6'>
      <div className='flex w-full items-center justify-between'>
        <Sidebar />
        <div className='flex w-full items-center justify-between'>
          <div className='` text-xl font-bold text-black/90 dark:text-white/90 sm:text-2xl'>Feeds</div>
          <div className='flex items-center justify-end gap-4 rounded-full bg-slate-100 px-5 text-xs dark:bg-zinc-900 dark:text-white'>
            <Button variant='zero' className='py-2 text-[10px] font-semibold text-black/30 dark:text-white/50'>
              Recent
            </Button>
            <Button
              variant='zero'
              className='rounded-full bg-slate-300 px-4 py-2 text-[10px] font-semibold text-black dark:bg-zinc-400'
            >
              Friends
            </Button>
            <Button variant='zero' className='py-2 text-[10px] font-semibold text-black/30 dark:text-white/50'>
              Popular
            </Button>
          </div>
        </div>
      </div>

      <div>
        <NewPost />
      </div>
      {/* <Posts /> */}
    </Screen>
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
      <div className='space-y-3'>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </>
  )
}

function NewPost() {
  const router = useRouter()

  return (
    <div
      className='grid cursor-pointer select-none gap-3 rounded-2xl bg-slate-200/90 px-4 py-4 dark:bg-zinc-800'
      onClick={() => {
        router.push('/post/create')
      }}
    >
      <div className='flex w-full items-center justify-normal gap-4 rounded-3xl border border-slate-500/5 bg-white dark:bg-zinc-700 dark:text-white'>
        <img src='/images/profile.jpg' alt='' className='aspect-square size-10 rounded-full' />
        <div className='text-sm font-medium text-black/60 dark:text-white/80'>What is on your mind?</div>
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-center gap-4 text-xs font-semibold text-black/80 dark:text-white/80 sm:text-sm sm:font-extrabold'>
          <div className='flex items-center justify-center gap-1.5'>
            <Image size={20} />
            <div className=''>Image</div>
          </div>
          <div className='flex items-center justify-center gap-1.5'>
            <Earth size={20} />
            <div className='flex items-center'>
              <div className=''>Public</div>
              <ChevronDown size={16} strokeWidth={3} />
            </div>
          </div>
        </div>
        <div>
          <Button
            variant='zero'
            className='rounded-full bg-black px-6 py-2 text-xs text-white dark:bg-white dark:text-black'
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  )
}
