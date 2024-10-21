'use client'
import { Button } from '@/components/Button'
import { Screen, Screen0 } from '@/components/Screen'
import { ModeToggle } from '@/components/SwitchTheem'
import { ChevronLeft, Palette, PaletteIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Settings() {
  return (
    <Screen0 className='items-center'>
      <Header />
      <div className='w-full p-5 text-left'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3 font-semibold sm:gap-5'>
            <PaletteIcon className='rounded-sm bg-blue-500 p-1.5 text-white' size={34} />
            Dark mode
          </div>
          <ModeToggle />
        </div>
      </div>
    </Screen0>
  )
}

function Header() {
  const router = useRouter()
  return (
    <div className='z-10 flex min-h-3 w-full items-center justify-between border-b border-black/5 bg-white/80 px-3 py-1.5 backdrop-blur-3xl dark:border-white/5 dark:bg-black/70'>
      <div className='w-12'>
        <Button
          variant='icon'
          className='rounded-full p-3 active:bg-black/10 dark:active:bg-white/10'
          onClick={() => {
            router.back()
          }}
        >
          <ChevronLeft size={24} />
        </Button>
      </div>
      <div className='text-base font-bold'>Settings</div>
      <div className='w-12 rounded-full px-6 text-sm text-accent active:bg-accent/20 active:dark:bg-accent md:p-3'></div>
    </div>
  )
}
