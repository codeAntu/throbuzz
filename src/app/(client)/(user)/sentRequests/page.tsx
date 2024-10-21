/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { Button } from '@/components/Button'
import Header from '@/components/Header'
import { Screen0 } from '@/components/Screen'
import { useRouter } from 'next/navigation'

export default function sentRequests() {
  const router = useRouter()
  return (
    <Screen0>
      <Header title='Sent Requests'>
        <div></div>
      </Header>
      <div className='grid gap-4 px-5 py-4'>
        <div className='flex items-center gap-2'>
          <Button
            variant='zero'
            className='rounded-full bg-black/10 px-5 py-2 text-xs font-semibold text-black/80 dark:bg-white/10 dark:text-white/80'
            onClick={() => {
              router.push('/friendRequests')
            }}
          >
            friend requests
          </Button>
          <Button
            variant='zero'
            className='rounded-full bg-black/10 px-5 py-2 text-xs font-semibold text-black/80 dark:bg-white/10 dark:text-white/80'
          >
            Suggestions
          </Button>
          <Button
            variant='zero'
            className='rounded-full bg-black/10 px-5 py-2 text-xs font-semibold text-black/80 dark:bg-white/10 dark:text-white/80'
            onClick={() => {
              router.push('/friends')
            }}
          >
            friends
          </Button>
        </div>
        <hr />
        <div className='text-lg font-semibold'>
          {' '}
          Friend Requests
          <span className='px-2 text-red-500'>120</span>
        </div>
        <div className='grid gap-5 sm:gap-7'>
          <SentRequest />
          <SentRequest />
          <SentRequest />
          <SentRequest />
        </div>
      </div>
    </Screen0>
  )
}

function SentRequest() {
  return (
    <div className='flex items-center gap-3'>
      <img src='/images/img1.png' alt='' className='size-20 rounded-full sm:size-24' />
      <div className='grid w-full gap-2.5 pt-1'>
        <div className='px-2'>
          <div className='text-base font-semibold sm:text-lg'>Ananta Karmakar</div>
          <div className='text-xs font-medium text-black/60 dark:text-white/60 sm:text-sm'>codeAntu</div>
        </div>
        <div className='flex w-full items-center justify-between gap-3'>
          <Button variant='filled' className='rounded-sm py-2 text-xs sm:py-3'>
            Cancel
          </Button>
          <Button variant='outline' className='rounded-sm py-2 text-xs sm:py-3'>
            Message
          </Button>
        </div>
      </div>
    </div>
  )
}
