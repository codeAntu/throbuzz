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
      <div className='flex w-12 justify-center rounded-full text-sm md:p-3'>{children}</div>
    </div>
  )
}
