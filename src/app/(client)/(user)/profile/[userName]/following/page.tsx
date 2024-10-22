/* eslint-disable @next/next/no-img-element */
'use client'

import { Button } from '@/components/Button'
import Header from '@/components/Header'
import { Screen0 } from '@/components/Screen'
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from '@/components/ui/drawer'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Ellipsis, EllipsisVertical, Search, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Following() {
  const router = useRouter()

  return (
    <Screen0>
      <Header title='Following' />
      <div className='grid gap-4 px-5 py-4'>
        <div className='flex w-full items-center justify-center gap-2 rounded-full bg-black/5 px-3 py-2.5 text-xs text-black/80 dark:bg-white/5 dark:text-white/80'>
          <Search size={20} />
          <input type='text' className='w-full border-none bg-transparent outline-none' placeholder='Search ' />
        </div>
        <div className='text-lg font-semibold'>
          All Following
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
          <div className='text-sm font-semibold sm:text-lg'>Ananta Karmakar</div>
          <div className='text-xs font-medium text-black/60 dark:text-white/60 sm:text-base'>codeAntu</div>
        </div>
        <div className='flex items-center justify-center gap-2.5'>
          <Button
            variant='zero'
            className='rounded-[8px] bg-black px-5 py-2 text-xs font-medium text-white dark:bg-white dark:text-black sm:py-2'
          >
            Message
          </Button>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant='zero' className='flex cursor-pointer items-center gap-1.5 font-normal'>
                <EllipsisVertical size={26} strokeWidth={1} />
              </Button>
            </DrawerTrigger>
            <DrawerContent className={`wbackdrop-blur-3xl mx-auto max-w-[800px]`}>
              <DrawerHeader className='w-full text-center font-extrabold'>Unfollow This account ?</DrawerHeader>
              <div className='px-5 pb-10 pr-8'>
                <div className='flex items-center gap-4'>
                  <img src='/images/img1.png' alt='' className='size-14 rounded-full sm:size-20' />
                  <div className='flex w-full justify-between gap-2.5'>
                    <div className=''>
                      <div className='text-sm font-semibold sm:text-lg'>Ananta Karmakar</div>
                      <div className='text-xs font-medium text-black/60 dark:text-white/60 sm:text-base'>codeAntu</div>
                    </div>
                  </div>
                  <Button
                    variant='zero'
                    className='rounded-[8px] px-5 py-1.5 text-xs font-medium text-red-500 sm:py-2 sm:text-base'
                  >
                    Unfollow
                  </Button>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  )
}
