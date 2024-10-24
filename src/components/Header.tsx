'use client'

import { useRouter } from 'next/navigation'
import { Button } from './Button'
import { ChevronLeft } from 'lucide-react'

export default function Header({ title, children }: { title: string; children?: React.ReactNode }) {
  const router = useRouter()
  return (
    <div className='sticky top-0 z-10 flex min-h-3 w-full items-center justify-between border-b border-black/5 bg-white/80 px-3 py-1.5 backdrop-blur-3xl dark:border-white/5 dark:bg-black/70'>
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
      <div className='text-base font-bold'>{title}</div>
      <div className='w-12 rounded-full text-sm text-accent active:bg-accent/20 active:dark:bg-accent md:p-3'>
        {children}
      </div>
    </div>
  )
}
