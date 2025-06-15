/* eslint-disable jsx-a11y/alt-text */
'use client'
import { Button } from '@/components/Button'
import Img from '@/components/Img'
import { ArrowRight, ChevronDown, Earth, Image } from 'lucide-react'
import { useRouter } from 'next/navigation'
import GustUser from './GustUser'

type User = {
  username: string
  name: string
  profilePic: { imageUrl: string; publicId: string }
}

export function NewPost({ savedUser }: { savedUser: User }) {
  const router = useRouter()

  if (!savedUser.username)
    return (
      <>
        <div
          className='flex cursor-pointer select-none items-center justify-between gap-3 rounded-2xl bg-slate-200/90 px-3 py-3 text-sm dark:bg-zinc-800'
          onClick={() => {
            router.push('/login')
          }}
        >
          <div className='flex items-center gap-2 sm:gap-4 sm:text-base'>
            <div className='w-8'>
              <Img
                imageUrl={savedUser.profilePic?.imageUrl || '/icons/user.png'}
                publicId={savedUser.profilePic?.publicId || ''}
                height={20}
                width={20}
              />
            </div>
            Login to Throbuzz
          </div>
          <div className='flex gap-1.5 rounded-xl bg-accent object-center px-5 py-3 text-xs font-medium text-white'>
            Login
            <ArrowRight size={16} />
          </div>
        </div>
        <div className='pt-3'>
          <GustUser />
        </div>
      </>
    )

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
