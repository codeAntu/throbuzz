/* eslint-disable jsx-a11y/alt-text */
'use client'

import { Button } from '@/components/Button'
import { Screen, Screen0 } from '@/components/Screen'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { colors } from '@/lib/const'
import axios from 'axios'
import { Check, ChevronDown, ChevronLeft, Earth, EarthLock, Image, Plus, Trash2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

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

export default function EditPostPage() {
  const [visibility, setVisibility] = useState('public')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const postId = '66f2e42e108a3040e088d114'
  const [postImages, setPostImages] = useState<string[]>([])

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

  async function getPost(postId: string) {
    try {
      const response = await axios.post('/api/post/getPost', {
        postId,
      })
      console.log(response.data)

      setText(response.data.post.text)
      setVisibility(response.data.post.visibility)
      setPostImages(response.data.post.images)
    } catch (error) {
      console.log('error', error)
    }
  }

  async function editPost({ text, visibility, postId }: { text: string; visibility: string; postId: string }) {
    try {
      const response = await axios.post('/api/post/editPost', {
        text,
        visibility,
        postId,
      })

      console.log('response', response.data)
    } catch (error) {
      console.log('error ', error)
    }
  }

  async function deletePost(postId: string) {
    try {
      const response = await axios.post('/api/post/deletePost', {
        postId: '66f2697fdbb5e1ae7c5a2e26',
      })
      console.log(response.data)
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <Screen0 className='grid'>
      <Header />

      <Screen className='min-h-[93dvh] justify-between py-2'>
        <div className='flex flex-col gap-6'>
          <div className='grid w-full gap-4'>
            <div className='flex items-center justify-between'>
              <div className='text-base font-semibold'>Your photos </div>
              {/* <div className='text-xs font-semibold text-black/50 dark:text-white/50'>
                {images
                  ? `${images.length > 1 ? `${images.length} photos` : `${images.length} photo`}`
                  : 'Add upto 5 photos'}
              </div> */}
            </div>
            <div className='grid w-full gap-4'>
              {/* <div className='no-scrollbar flex gap-3.5 overflow-auto rounded-2xl sm:gap-5'>
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
              </div> */}
              <Button
                variant='zero'
                className={`${colors[color].card} flex h-11 w-full items-center justify-center rounded-lg border border-black/5`}
              >
                <div>You have {postImages.length} images</div>
                {/* <label htmlFor='postImages'>
                  <Plus size={24} className='text-black' />
                </label> */}
                {/* <input
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
                /> */}
              </Button>
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
    <div className='z-10 flex min-h-3 w-full items-center justify-between border-b border-black/5 bg-white/80 px-3 py-0 backdrop-blur-3xl dark:border-white/5 dark:bg-black/70'>
      <Button
        variant='icon'
        className='rounded-full p-3 active:bg-black/10 dark:active:bg-white/10'
        onClick={() => {
          window.history.back()
        }}
      >
        <ChevronLeft size={24} />
      </Button>
      <div className='text-base font-bold'>Edit Post </div>
      <Button variant='text' className='rounded-full p-3 text-base active:bg-red-100 active:dark:bg-red-900 md:p-3'>
        <div>
          <Trash2 size={21} className='text-red-500' />
        </div>
      </Button>
    </div>
  )
}
