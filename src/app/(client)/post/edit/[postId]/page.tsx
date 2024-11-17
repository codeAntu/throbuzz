/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
'use client'

import { Button } from '@/components/Button'
import { MyDialog } from '@/components/MyDialog'
import PostImg from '@/components/PostImg'
import { Screen, Screen0 } from '@/components/Screen'
import { DialogClose } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { colors } from '@/lib/const'
import axios from 'axios'
import { Check, ChevronDown, ChevronLeft, Delete, Earth, EarthLock, Image, Plus, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
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

export interface PostT {
  _id: string
  userId: string
  text: string
  postImages: any[]
  visibility: string
  likes: number
  comments: number
  color: string
  createdAt: Date
  updatedAt: Date
  __v: number
  isLiked: boolean
  isMine: boolean
}

interface PostImagesT {
  imageUrl: string
  publicId: string
}

export default function EditPostPage({
  params,
}: {
  params: {
    postId: string
  }
}) {
  const [visibility, setVisibility] = useState('public')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [postImages, setPostImages] = useState<PostImagesT[]>([])
  const postId = params.postId
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [text, setText] = useState('')
  const [color, setColor] = useState<keyof typeof colors>('stone')
  const [isPublic, setIsPublic] = useState(true)
  const [images, setImages] = useState<FileList | null>(null)
  const [post, setPost] = useState<PostT | null>(null)
  const router = useRouter()

  console.log(postId)

  // console.log('color', color)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [text])

  // console.log('images', images)

  async function getPost(postId: string) {
    try {
      const response = await axios.post('/api/post/getPost', {
        postId,
      })
      console.log(response.data)
      setPost(response.data.post)
      setText(response.data.post.text)
      setVisibility(response.data.post.visibility)
      setPostImages(response.data.post.postImages)
    } catch (error) {
      console.log('error', error)
    }
  }

  async function editPost({ text, visibility, postId }: { text: string; visibility: string; postId: string }) {
    if (text.length > 500) {
      setError('Text is too long')
      return
    }

    if (text.length === 0) {
      setError('Text is required')
      return
    }

    if (text === post?.text && visibility === post?.visibility) {
      setError('No changes made')
      return
    }

    try {
      const response = await axios.post('/api/post/editPost', {
        text,
        visibility,
        postId,
      })

      console.log('response', response.data)
      router.push(`/post/${postId}`)
    } catch (error) {
      console.log('error ', error)
    }
  }

  useEffect(() => {
    getPost(postId)
  }, [postId])

  console.log('post', post)

  return (
    <Screen0 className='grid'>
      <Header />

      <Screen className='min-h-[93dvh] justify-between py-2'>
        <div className='flex flex-col gap-6'>
          <div className='grid w-full gap-4'>
            <div className='flex items-center justify-between'>
              <div className='text-base font-semibold'>Your photos </div>
            </div>
            {postImages.length && (
              <div className='grid w-full gap-4'>
                <div className='no-scrollbar flex gap-3.5 overflow-auto rounded-2xl sm:gap-5'>
                  {postImages.map((image, index) => (
                    <div key={index} className='relative aspect-video h-44'>
                      <PostImg imageUrl={image.imageUrl} publicId={image.publicId} alt='image' />
                    </div>
                  ))}
                </div>

                <Button
                  variant='zero'
                  className={`${colors[color].card} flex h-11 w-full items-center justify-center rounded-lg border border-black/5`}
                >
                  <div>You have {postImages.length} images</div>
                </Button>
              </div>
            )}
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
          <Button
            variant='filled'
            className='w-full py-3'
            onClick={() => {
              editPost({ text, visibility, postId })
            }}
          >
            Save changes
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
      {/* <Button variant='text' className='rounded-full p-3 text-base active:bg-red-100 active:dark:bg-red-900 md:p-3'> */}
      <MyDialog
        trigger={
          <Button variant='icon' className='rounded-full p-3 active:bg-black/10 dark:active:bg-white/10'>
            <Trash2 size={21} className='text-red-500' />
          </Button>
        }
      >
        <div className='pt-5 text-center text-lg'>Do you want to delete the post</div>
        <div className='pb-3 text-center text-xs text-black/50 dark:text-white/50'>
          If you delete the post, it will be permanently removed from your account. This cannot be undone.
        </div>
        <div className='grid grid-cols-2 gap-3'>
          <Button
            variant='filled'
            className='border-red-500 bg-red-500 text-white dark:border-red-500 dark:bg-red-500 dark:text-white'
            onClick={() => {
              // deletePost(postId)
            }}
          >
            Delete
          </Button>
          <DialogClose>
            <Button variant='filled' className=''>
              Cancel
            </Button>
          </DialogClose>
        </div>
      </MyDialog>
      {/* <Trash2 size={21} className='text-red-500' /> */}
      {/* </Button> */}
      {/* <Trash2 size={21} className='text-red-500' /> */}
      {/* </Button> */}
    </div>
  )
}
