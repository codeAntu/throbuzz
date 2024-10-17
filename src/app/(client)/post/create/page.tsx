'use client'
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { Button } from '@/components/Button'
import { Screen } from '@/components/Screen'
import { Check, ChevronDown, Earth, Image, Plus, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { colors } from '@/lib/const'

const image = ['/images/img1.png', '/images/img2.png', '/images/img3.png', '/images/img4.png', '/images/img5.png']

const colorNames: (keyof typeof colors)[] = [
  'stone',
  'slate',
  'orange',
  'amber',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'red',
]

export default function Page() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [text, setText] = useState('')
  const [color, setColor] = useState('stone')

  console.log('color', color)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [text])

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
            <div className='no-scrollbar flex gap-3.5 overflow-auto rounded-2xl sm:gap-5'>
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
            <Button
              variant='zero'
              className='flex h-10 w-full items-center justify-center rounded-lg border bg-black/10 dark:bg-white/10'
            >
              <Plus size={24} />
            </Button>
          </div>
        </div>
        <div className='grid gap-5'>
          <textarea
            ref={textareaRef}
            placeholder='Add a comment'
            className='no-scrollbar max-h-64 w-full rounded-2xl border bg-black/5 px-2 py-3 outline-none dark:bg-white/5 dark:text-white/80 sm:max-h-96'
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
          ></textarea>
          <div className='flex items-center justify-between gap-4 px-2 text-xs font-semibold text-black/80 dark:text-white/80 sm:text-sm sm:font-extrabold'>
            <div className='flex items-center justify-center gap-1.5'>
              <Image size={20} />
              <div className=''>Image</div>
            </div>
            <div className='flex items-center justify-center gap-1.5'>
              <Earth size={20} />
              <div className='flex items-center'>
                <div className=''>Public</div>
                <ChevronDown size={16} strokeWidth={3} />
              </div>
            </div>
          </div>
          <div className='flex gap-3 overflow-auto pt-3'>
            {colorNames.map((colorName) => (
              <div
                key={color}
                className={`no-scrollbar flex aspect-square size-12 cursor-pointer items-center justify-center gap-2 rounded-full border sm:size-14 ${
                  colors[colorName].card
                }`}
                onClick={() => setColor(colorName)}
              >
                {color === colorName ? <Check /> : null}
              </div>
            ))}
          </div>
        </div>
      </Screen>
    </div>
  )
}

function Header() {
  return (
    <div className='sticky top-0 z-10 flex h-auto w-full flex-grow items-center justify-between border-b border-black/5 bg-white/80 px-5 py-2 backdrop-blur-3xl dark:border-white/5 dark:bg-black/70'>
      <Button variant='icon' className='pr-5'>
        <X size={24} />
      </Button>
      <div className='text-base font-bold'>Create Post </div>
      <Button variant='text' className='pl-5 text-base text-accent dark:text-accent'>
        Post
      </Button>
    </div>
  )
}
