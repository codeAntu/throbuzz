'use client'
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { Button } from '@/components/Button'
import { Screen } from '@/components/Screen'
import { ChevronDown, Earth, Image, Plus, X } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'

const image = ['/images/img1.png', '/images/img2.png', '/images/img3.png', '/images/img4.png', '/images/img5.png']

export default function Page() {
  return (
    <div className='grid'>
      <Header />
      <Screen className='gap-7'>
        <div className='grid w-full gap-4'>
          <div className='flex items-center justify-between'>
            <div className='text-base font-semibold'>Add photos </div>
            <div className='text-sm text-black/60 dark:text-white/60'>
              {false ? 'Add upto 10 photos' : '5 photos added'}
            </div>
          </div>
          <div className='grid w-full gap-4'>
            <div className='flex gap-3.5 overflow-auto rounded-2xl sm:gap-5'>
              {image.map((img, index) => (
                <img
                  src={img}
                  key={index}
                  alt=''
                  className='aspect-video h-44 cursor-pointer rounded-2xl object-cover transition-all duration-300 active:object-contain sm:h-56'
                  onContextMenu={(e: { preventDefault: () => any }) => e.preventDefault()}
                />
              ))}
            </div>
            <div className='flex h-10 w-full items-center justify-center rounded-lg border bg-black/10 dark:bg-white/10'>
              <Plus size={24} />
            </div>
          </div>
        </div>
        <div>
          <textarea
            name=''
            id=''
            placeholder='Write something here...'
            className='w-full rounded-2xl border bg-black/5 px-2 py-3 dark:bg-white/5 dark:text-white/80'
            rows={5}
          ></textarea>
        </div>
      </Screen>
    </div>
  )
}

function Header() {
  return (
    <div className='sticky top-0 z-10 flex h-auto w-full flex-grow items-center justify-between border-b border-black/5 bg-white/80 px-5 py-2 backdrop-blur-3xl dark:border-white/5 dark:bg-black/70'>
      <Button variant='icon'>
        <X size={24} />
      </Button>
      <div className='text-base font-bold'>Create Post </div>
      <Button variant='text' className='text-base text-accent'>
        Post
      </Button>
    </div>
  )
}
