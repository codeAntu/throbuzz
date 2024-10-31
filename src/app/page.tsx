/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'

import { Button } from '@/components/Button'
import Img from '@/components/Img'
import { Screen } from '@/components/Screen'
import Sidebar from '@/components/Sidebar'
import useStore from '@/store/store'
import { ChevronDown, Earth, Image } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type User = {
  username: string
  name: string
  profilePic: { imageUrl: string; publicId: string }
}

export default function Home() {
  const router = useRouter()
  const savedUser = useStore((state) => state.savedUser)
  const clearSavedUser = useStore((state) => state.clearSavedUser)
  const [isLoading, setIsLoading] = useState(true)

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
        <NewPost savedUser={savedUser} />
      </div>
      {/* <Posts /> */}
    </Screen>
  )
}

function Posts() {
  return (
    <>
      <div className='space-y-3'></div>
    </>
  )
}

function NewPost({ savedUser }: { savedUser: User }) {
  const router = useRouter()

  if (!savedUser.username) return null

  return (
    <div
      className='grid cursor-pointer select-none gap-3 rounded-2xl bg-slate-200/90 px-4 py-4 dark:bg-zinc-800'
      onClick={() => {
        router.push('/post/create')
      }}
    >
      <div className='flex w-full items-center justify-normal gap-2.5 rounded-3xl border border-slate-500/5 bg-white dark:bg-zinc-700 dark:text-white'>
        <div className='aspect-square w-10 p-0.5 sm:w-12'>
          <Img
            imageUrl={savedUser.profilePic.imageUrl}
            publicId={savedUser.profilePic.publicId}
            height={50}
            width={50}
          />
        </div>
        <div className='text-sm font-medium text-black/60 dark:text-white/80'>
          What is on your mind, {savedUser.username} ?
        </div>
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
