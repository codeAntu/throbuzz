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
import axios from 'axios'

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
  const [color, setColor] = useState<keyof typeof colors>('stone')
  const [isPublic, setIsPublic] = useState(true)
  const [images, setImages] = useState<FileList | null>(null)

  console.log('color', color)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [text])

  console.log('images', images)

  const handleSubmit = async () => {
    if (!text && !images) {
      console.log('Please add text or image')
      return
    }

    const formData = new FormData()
    formData.append('text', text || '')
    formData.append('visibility', isPublic ? 'public' : 'private')
    if (images) {
      Array.from(images).forEach((image) => {
        formData.append('images', image)
      })
    }
    formData.append('color', color)

    try {
      const response = await axios.post('/api/post/createPost', formData)

      if (response.status === 200) {
        console.log('Post created:', response.data)
      } else {
        console.log('Error creating post:', response.data)
      }
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  return (
    <Screen0 className='grid'>
      <Header />
      <Screen className='min-h-[90dvh] justify-between py-2'>
        <div className='flex flex-col gap-6'>
          <div className='grid w-full gap-4'>
            <div className='flex items-center justify-between'>
              <div className='text-base font-semibold'>Add photos </div>
              <div className='dark:text:white/50 text-xs font-semibold text-black/50'>
                {images
                  ? `${images.length > 1 ? `${images.length} photos` : `${images.length} photo`}`
                  : 'Add upto 5 photos'}
              </div>
            </div>
            <div className='grid w-full gap-4'>
              <div className='no-scrollbar flex gap-3.5 overflow-auto rounded-2xl sm:gap-5'>
                {images
                  ? Array.from(images).map((image, index) => (
                      <div key={index} className='relative aspect-video h-44'>
                        <img
                          src={URL.createObjectURL(image)}
                          className='aspect-video h-44 cursor-pointer rounded-2xl object-cover transition-all duration-300 active:object-contain sm:h-56 md:hover:object-contain'
                          onContextMenu={(e: { preventDefault: () => any }) => e.preventDefault()}
                        />
                        <Button
                          variant='zero'
                          className='absolute right-1.5 top-1.5 rounded-full bg-black/50 p-1.5'
                          onClick={() => {
                            setImages((prev) => {
                              if (prev) {
                                const dataTransfer = new DataTransfer()
                                Array.from(prev)
                                  .filter((_, i) => i !== index)
                                  .forEach((file) => dataTransfer.items.add(file))
                                const newImages = dataTransfer.files
                                return newImages
                              }
                              return null
                            })
                          }}
                        >
                          <Trash2 size={16} className='text-white' />
                        </Button>
                      </div>
                    ))
                  : null}
              </div>

              <label htmlFor='postImages'>
                <div
                  className={`${colors[color].card} flex h-11 w-full items-center justify-center rounded-lg border border-black/5`}
                >
                  <Plus size={24} className='text-black' />
                </div>
              </label>
              <input
                type='file'
                multiple
                accept='image/*'
                onChange={(e) => {
                  if (e.target.files) {
                    let files = Array.from(e.target.files)
                    const totalFiles = files.length + (images ? images.length : 0)
                    if (totalFiles > 5) {
                      alert('You can only upload a maximum of 5 images.')
                      files = files.slice(0, 5 - (images ? images.length : 0))
                    }
                    setImages((prev) => {
                      const dataTransfer = new DataTransfer()
                      if (prev) {
                        Array.from(prev).forEach((file) => dataTransfer.items.add(file))
                      }
                      files.forEach((file) => dataTransfer.items.add(file))
                      return dataTransfer.files
                    })
                  }
                }}
                className='hidden'
                id='postImages'
              />
            </div>
          </div>
          <div className='grid gap-5'>
            <textarea
              ref={textareaRef}
              placeholder='Write something...'
              className={`${
                colors[color].card
              } no-scrollbar max-h-60 w-full rounded-2xl border border-black/5 px-2 py-3 text-sm text-black/80 outline-none placeholder:text-black/50 sm:text-base sm:font-extrabold`}
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
            ></textarea>
            <div className='dark:text:white/80 sm:text:sm flex items-start justify-between gap-4 px-2 text-xs font-semibold text-black/80 dark:text-white/80 sm:font-extrabold'>
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
                    className='dark:border:white/10 border border-black/10 bg-white/10 backdrop-blur-md dark:bg-black/25'
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
              <div className='dark:text:white/50 text-black/50'>
                <span className={`${text.length > 500 ? 'text-red-500' : ''} `}>{text.length}</span>/ 500
              </div>
            </div>
            <div className='no-scrollbar flex gap-3 overflow-auto pb-6'>
              {colorNames.map((colorName) => (
                <Button
                  key={colorName}
                  variant='zero'
                  className={`flex aspect-square size-12 cursor-pointer items-center justify-center gap-2 rounded-full border sm:size-14 ${
                    colors[colorName].card
                  }`}
                  onClick={() => setColor(colorName)}
                >
                  {color === colorName ? <Check /> : null}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className=''>
          <Button variant='filled' className='w-full py-3' onClick={handleSubmit}>
            Post
          </Button>
        </div>
      </Screen>
    </Screen0>
  )
}

function Header() {
  return (
    <div className='dark:border:white/5 sticky top-0 z-10 flex w-full items-center justify-between border-b border-black/5 bg-white/80 px-5 py-0 backdrop-blur-3xl dark:bg-black/70'>
      <Button
        variant='icon'
        onClick={() => {
          window.history.back()
        }}
      >
        <ChevronLeft size={24} />
      </Button>
      <div className='text-base font-bold'>Create Post </div>
      <Button variant='text' className='dark:text:accent pl-5 text-base text-accent'>
        <div></div>
      </Button>
    </div>
  )
}
