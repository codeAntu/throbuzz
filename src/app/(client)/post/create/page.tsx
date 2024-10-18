'use client'
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { Button } from '@/components/Button'
import { Screen, Screen0 } from '@/components/Screen'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { colors } from '@/lib/const'
import {
  Check,
  CheckCheck,
  ChevronDown,
  ChevronLeft,
  Earth,
  EarthLock,
  EllipsisVertical,
  Image,
  Pencil,
  Plus,
  Trash2,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

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
  const [color, setColor] = useState('orange')
  const [isPublic, setIsPublic] = useState(true)

  console.log('color', color)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [text])

  return (
    <Screen0 className='grid'>
      <Header />
      <Screen className='min-h-[90dvh] justify-between'>
        <div className='flex flex-col gap-7'>
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
                    className='aspect-video h-44 cursor-pointer rounded-2xl object-cover transition-all duration-300 hover:object-contain active:object-contain sm:h-56'
                    onContextMenu={(e: { preventDefault: () => any }) => e.preventDefault()}
                  />
                ))}
              </div>
              <Button
                variant='zero'
                className='flex h-11 w-full items-center justify-center rounded-lg border bg-black/10 dark:bg-white/10'
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
            <div className='flex items-start justify-between gap-4 px-2 text-xs font-semibold text-black/80 dark:text-white/80 sm:text-sm sm:font-extrabold'>
              <div className='flex items-center justify-normal gap-5'>
                <div className='flex items-center justify-center gap-1.5'>
                  <Image size={20} />
                  <div className=''>Image</div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className='p-2'>
                    <div className='flex items-center justify-center gap-1.5'>
                      {isPublic ? <Earth size={20} /> : <EarthLock size={20} />}
                      <div className='flex items-center'>
                        {isPublic ? 'Public' : 'Private'}
                        <ChevronDown size={16} strokeWidth={3} />
                      </div>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align='end'
                    className='border border-black/10 bg-white/10 backdrop-blur-md dark:border-white/10 dark:bg-black/25'
                  >
                    <DropdownMenuItem
                      className='text-accent'
                      onClick={() => {
                        setIsPublic(true)
                      }}
                    >
                      <Earth size={17} className='mr-2' />
                      Public
                      {isPublic ? <Check className='ml-auto' size={17} /> : null}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className=''
                      onClick={() => {
                        setIsPublic(false)
                      }}
                    >
                      <EarthLock size={17} className='mr-2' />
                      private
                      {!isPublic ? <Check className='ml-auto' size={17} /> : null}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className='text-black/50 dark:text-white/50'>
                <span className={`${text.length > 500 ? 'text-red-500' : ''} `}>{text.length}</span>/ 500
              </div>
            </div>
            <div className='no-scrollbar flex gap-3 overflow-auto pt-3'>
              {colorNames.map((colorName) => (
                <div
                  key={color}
                  className={`flex aspect-square size-12 cursor-pointer items-center justify-center gap-2 rounded-full border sm:size-14 ${
                    colors[colorName].card
                  }`}
                  onClick={() => setColor(colorName)}
                >
                  {color === colorName ? <Check /> : null}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className=''>
          <Button variant='accent' className='w-full'>
            Post
          </Button>
        </div>
      </Screen>
    </Screen0>
  )
}

function Header() {
  return (
    <div className='sticky top-0 z-10 flex w-full items-center justify-between border-b border-black/5 bg-white/80 px-5 py-0 backdrop-blur-3xl dark:border-white/5 dark:bg-black/70'>
      <Button variant='icon' className='p-1.5'>
        <ChevronLeft size={24} />
      </Button>
      <div className='text-base font-bold'>Create Post </div>
      <Button variant='text' className='pl-5 text-base text-accent dark:text-accent'>
        <div></div>
      </Button>
    </div>
  )
}
