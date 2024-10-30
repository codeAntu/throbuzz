/* eslint-disable @next/next/no-img-element */
'use client'
import { Screen } from '@/components/Screen'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Bell, House, icons, LogOut, Mail, Menu, Settings, User } from 'lucide-react'
import { Button } from './Button'
import { usePathname, useRouter } from 'next/navigation'
import useStore from '@/store/store'
import Img from './Img'

const paths = [
  { name: 'Home', path: '/', icon: <House size={24} className='' /> },
  { name: 'Notifications', path: '/notifications', icon: <Bell size={24} className='' /> },
  { name: 'Messages', path: '/messages', icon: <Mail size={24} className='' /> },
  { name: 'Social', path: '/social', icon: <User size={24} className='' /> },
  { name: 'Settings', path: '/settings', icon: <Settings size={24} className='' /> },
]

export default function Sidebar() {
  const path = usePathname()
  const router = useRouter()
  const savedUser = useStore((state) => state.savedUser)

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
              onClick={() => {
                if (!savedUser.username) return
                router.push(`/profile/${savedUser.username}`)
              }}
            >
              <div className='aspect-square w-28 overflow-hidden sm:w-32'>
                <Img
                  imageUrl={savedUser.profilePic.imageUrl}
                  publicId={savedUser.profilePic.publicId}
                  height={500}
                  width={500}
                />
              </div>
              <div className='text-center'>
                <div className='text-lg font-semibold'>{savedUser.name}</div>
                <div className='text-xs font-semibold text-black/60 dark:text-white/60'>{savedUser.username}</div>
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
