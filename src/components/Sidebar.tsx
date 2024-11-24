/* eslint-disable @next/next/no-img-element */
'use client'
import { Screen } from '@/components/Screen'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Bell, House, icons, LogOut, Mail, Menu, Settings, User } from 'lucide-react'
import { Button } from './Button'
import { usePathname, useRouter } from 'next/navigation'
import useStore from '@/store/store'
import Img from './Img'
import { logOut } from '@/handelers/helpers/logout'

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
  const clearSavedUser = useStore((state) => state.clearSavedUser)
  return (
    <Sheet>
      <SheetTrigger>
        <Menu size={43} className='p-1.5 pl-0' />
      </SheetTrigger>
      <SheetContent side={'left'} className='flex h-full flex-col justify-between'>
        <Button
          variant='zero'
          className='flex w-full flex-col items-center justify-center gap-5 py-8 sm:gap-8'
          onClick={() => {
            if (!savedUser.username) router.push('/login')
            router.push(`/profile/${savedUser.username}`)
          }}
        >
          <div className='aspect-square w-28 overflow-hidden sm:w-32'>
            <Img
              imageUrl={savedUser.profilePic?.imageUrl || '/icons/user.png'}
              publicId={savedUser.profilePic?.publicId || ''}
              height={500}
              width={500}
            />
          </div>
          {savedUser.username ? (
            <div className='text-center'>
              <div className='text-lg font-semibold'>{savedUser.name}</div>
              <div className='text-xs font-semibold text-black/60 dark:text-white/60'>{savedUser.username}</div>
            </div>
          ) : (
            <div className='w-auto rounded-sm bg-black px-8 py-2 text-xs text-white dark:bg-white dark:text-black'>
              Login
            </div>
          )}
        </Button>
        <div className='flex w-full flex-grow flex-col justify-between'>
          <div>
            {paths.map((p, i) => (
              <Button
                key={i}
                variant='zero'
                className={`flex w-full gap-4 px-5 py-4 ${path === p.path ? 'my-2 bg-black text-white dark:bg-white dark:text-black' : 'text-black dark:text-white'}`}
                // className={`flex w-full gap-4 ${path === p.path ? 'my-2 bg-black px-5 py-4 text-white dark:bg-white dark:text-black' : 'px-5 py-3.5 text-black dark:text-white'}`}
                onClick={() => router.push(p.path)}
              >
                {p.icon}
                <span className='w-full text-left'>{p.name}</span>
              </Button>
            ))}
          </div>
          <div>
            {savedUser.username && (
              <Button
                variant='zero'
                className='flex w-full bg-red-100 px-5 py-4 text-red-500'
                onClick={() => {
                  logOut(() => {
                    clearSavedUser()
                    router.push('/')
                  })
                }}
              >
                <LogOut size={24} className='' />
                <span className='w-full text-left'>Logout</span>
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export function OpenSidebar() {
  const path = usePathname()
  const router = useRouter()
  const savedUser = useStore((state) => state.savedUser)
  const clearSavedUser = useStore((state) => state.clearSavedUser)
  return (
    <div className='fixed left-0 hidden h-[100dvh] w-full max-w-[400px] border border-l px-5 xl:block'>
      <Button
        variant='zero'
        className='flex w-full flex-col items-center justify-center gap-5 py-8 sm:gap-8'
        onClick={() => {
          if (!savedUser.username) router.push('/login')
          router.push(`/profile/${savedUser.username}`)
        }}
      >
        <div className='aspect-square w-28 overflow-hidden sm:w-32'>
          <Img
            imageUrl={savedUser.profilePic?.imageUrl || '/icons/user.png'}
            publicId={savedUser.profilePic?.publicId || ''}
            height={500}
            width={500}
          />
        </div>
        {savedUser.username ? (
          <div className='text-center'>
            <div className='text-lg font-semibold'>{savedUser.name}</div>
            <div className='text-xs font-semibold text-black/60 dark:text-white/60'>{savedUser.username}</div>
          </div>
        ) : (
          <div className='w-auto rounded-sm bg-black px-8 py-2 text-xs text-white dark:bg-white dark:text-black'>
            Login
          </div>
        )}
      </Button>
      <div className='flex h-[70dvh] w-full flex-grow flex-col justify-between'>
        <div>
          {paths.map((p, i) => (
            <Button
              key={i}
              variant='zero'
              className={`flex w-full gap-4 px-5 py-4 ${path === p.path ? 'my-2 bg-black text-white dark:bg-white dark:text-black' : 'text-black dark:text-white'}`}
              onClick={() => router.push(p.path)}
            >
              {p.icon}
              <span className='w-full text-left'>{p.name}</span>
            </Button>
          ))}
        </div>
        <div>
          {savedUser.username && (
            <Button
              variant='zero'
              className='flex w-full bg-red-100 px-5 py-4 text-red-500'
              onClick={() => {
                logOut(() => {
                  clearSavedUser()
                  router.push('/')
                })
              }}
            >
              <LogOut size={24} className='' />
              <span className='w-full text-left'>Logout</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export function Right() {
  return (
    <div className='fixed right-0 hidden h-[100dvh] w-full max-w-[400px] border border-r p-5 2xl:block'>
      {/* <div>New feathers</div>
      <div>Suggestions</div>
      <div>Stories</div> */}
      <StatusComp />
    </div>
  )
}

const images = ['img1.png ', 'img5.png', 'img3.png', 'img4.png', 'img2.png']

export function StatusComp() {
  return (
    <div>
      <div className='text-sm font-medium md:text-lg'>Status</div>
      <div className='grid grid-cols-3 gap-3 py-5'>
        {images.map((img, i) => (
          <Status key={i} img={img} />
        ))}
      </div>
    </div>
  )
}

export function Status({ img }: { img: string }) {
  return (
    <div className='relative h-40 w-28 overflow-hidden rounded-xl border'>
      <img src={`/images/${img}`} alt='' className='relative h-full w-full object-cover' />
      <div className='absolute bottom-1 left-1 flex w-[90%] items-center justify-normal gap-2 rounded-md p-0.5 backdrop-blur-sm'>
        <img src='/icons/user.png' alt='' className='aspect-square w-7 rounded-full' />
        <div className='text-sm font-medium'>User</div>
      </div>
    </div>
  )
}
