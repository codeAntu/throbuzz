'use client'
import { Screen } from '@/components/Screen'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { use, useCallback, useEffect, useState } from 'react'
import { Button } from './Button'

export default function Slider() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu size={43} className='p-1.5 pl-0' />
      </SheetTrigger>
      <SheetContent side={'left'}>
        <SheetHeader>
          <SheetTitle>
            <Button variant='zero' className='flex w-full flex-col items-center justify-center gap-4 py-8'>
              <img src='/images/profile.jpg' alt='' className='w-28 rounded-full' />
              <div className='grid gap-1 text-center'>
                <div className='text-xl font-semibold'>Ananta Karmakar</div>
                <div className='text-sm font-semibold text-black/60 dark:text-white/60'>codeantu</div>
              </div>
            </Button>
          </SheetTitle>
          <SheetDescription>
            {/* menu options  */}
            <div className='flex flex-col items-start gap-4'>
              <Button variant='zero' className='flex items-center gap-4'>
                <Menu size={24} />
                <div className='text-lg font-semibold'>Home</div>
              </Button>
              <Button variant='zero' className='flex items-center gap-4'>
                <Menu size={24} />
                <div className='text-lg font-semibold'>Profile</div>
              </Button>
              <Button variant='zero' className='flex items-center gap-4'>
                <Menu size={24} />
                <div className='text-lg font-semibold'>Settings</div>
              </Button>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
