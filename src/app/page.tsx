/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'

import { Button } from '@/components/Button'
import Img from '@/components/Img'
import { NewPost } from '@/components/NewPost'
import { Screen } from '@/components/Screen'
import Sidebar from '@/components/Sidebar'
import useStore from '@/store/store'
import { ArrowBigLeft, ArrowRight, ChevronDown, CircleUser, Earth, Image } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
  const router = useRouter()
  const savedUser = useStore((state) => state.savedUser)
  const clearSavedUser = useStore((state) => state.clearSavedUser)
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState('Recent')

  const pages = ['Recent', 'Friends', 'Popular']

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
        {page === 'Friends' && <Friends />}
        {page === 'Popular' && <Popular />}
      </div>
    </Screen>
  )
}

function Recent() {
  return <div>Recent</div>
}

function Friends() {
  return <div>Friends</div>
}

function Popular() {
  return <div>Popular</div>
}
