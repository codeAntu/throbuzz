/* eslint-disable @next/next/no-img-element */
'use client'
import { Screen } from '@/components/Screen'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Bell, House, icons, LogOut, Mail, Menu, Settings, User } from 'lucide-react'
import { use, useCallback, useEffect, useState } from 'react'
import { Button } from './Button'
import { usePathname, useRouter } from 'next/navigation'

const paths = [
  { name: 'Home', path: '/', icon: <House size={24} className='' /> },
  { name: 'Notifications', path: '/notifications', icon: <Bell size={24} className='' /> },
  { name: 'Messages', path: '/messages', icon: <Mail size={24} className='' /> },
  { name: 'Follow Request', path: '/requests', icon: <User size={24} className='' /> },
  { name: 'Settings', path: '/settings', icon: <Settings size={24} className='' /> },
]

export default function Sidebar() {
  const path = usePathname()
  const router = useRouter()

  return (
    <Sheet>
      <SheetTrigger>
        <Menu size={43} className='p-1.5 pl-0' />
      </SheetTrigger>
      <SheetContent side={'left'}>
        <SheetHeader className='flex h-full flex-1'>
          <SheetTitle>
            <Button
              variant='zero'
              className='flex w-full flex-col items-center justify-center gap-4 py-8'
              onClick={() => router.push('/profile/codeantu')}
            >
              <img src='/images/profile.jpg' alt='' className='w-28 rounded-full' />
              <div className='text-center'>
                <div className='text-lg font-semibold'>Ananta Karmakar</div>
                <div className='text-xs font-semibold text-black/60 dark:text-white/60'>codeantu</div>
              </div>
            </Button>
          </SheetTitle>
          <SheetDescription className='flex w-full flex-grow flex-col justify-between'>
            <div>
              {paths.map((p, i) => (
                <Button
                  key={i}
                  variant='zero'
                  className={`flex w-full gap-4 ${path === p.path ? 'my-2 bg-black px-5 py-4 text-white dark:bg-white dark:text-black' : 'px-5 py-3.5 text-black dark:text-white'}`}
                  onClick={() => router.push(p.path)}
                >
                  {p.icon}
                  <span className='w-full text-left'>{p.name}</span>
                </Button>
              ))}
            </div>
            <div>
              <Button variant='zero' className='flex w-full bg-red-100 px-5 py-4 text-red-500'>
                <LogOut size={24} className='' />
                <span className='w-full text-left'>Logout</span>
              </Button>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
