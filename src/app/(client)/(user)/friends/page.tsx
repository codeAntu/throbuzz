/* eslint-disable @next/next/no-img-element */
'use client'

import { Button } from '@/components/Button'
import Header from '@/components/Header'
import { Screen0 } from '@/components/Screen'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Ellipsis, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Friends() {
  const router = useRouter()

  return (
    <Screen0>
      <Header title='Your Friends' />
      <div className='grid gap-4 px-5 py-4'>
        <div className='flex items-center gap-2'>
          <Button
            variant='zero'
            className='rounded-full bg-black/10 px-5 py-2 text-xs font-semibold text-black/80 dark:bg-white/10 dark:text-white/80'
            onClick={() => {
              router.push('/sentRequests')
            }}
          >
            Sent requests
          </Button>
          <Button
            variant='zero'
            className='rounded-full bg-black/10 px-5 py-2 text-xs font-semibold text-black/80 dark:bg-white/10 dark:text-white/80'
            onClick={() => {
              router.push('/friendRequests')
            }}
          >
            Friend Requests
          </Button>
        </div>
        <hr />
        <div className='text-lg font-semibold'>
          Friends
          <span className='px-2 text-accent'>120</span>
        </div>
        <div className='grid gap-5 sm:gap-7'>
          <Friend />
          <Friend />
          <Friend />
          <Friend />
          <Friend />
          <Friend />
        </div>
      </div>
    </Screen0>
  )
}

function Friend() {
  return (
    <div className='flex items-center gap-4'>
      <img src='/images/img1.png' alt='' className='size-14 rounded-full sm:size-20' />
      <div className='flex w-full justify-between gap-2.5'>
        <div className=''>
          <div className='text-base font-semibold sm:text-lg'>Ananta Karmakar</div>
          <div className='text-sm font-medium text-black/60 dark:text-white/60 sm:text-base'>codeAntu</div>
        </div>
        <Button variant='zero'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className='p-2'>
              <div>
                <Ellipsis size={20} className='' />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              className='border border-black/10 bg-white/10 backdrop-blur-md dark:border-white/10 dark:bg-black/25'
            >
              <DropdownMenuItem>
                <div className='text-xs font-medium'>Remove friend</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Button>
      </div>
    </div>
  )
}
