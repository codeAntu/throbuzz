/* eslint-disable @next/next/no-img-element */
'use client '
import { Button } from '@/components/Button'
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from '@/components/ui/drawer'
import { colors } from '@/lib/const'
import { nFormatter } from '@/utils/utils'
import { EllipsisVertical, Heart, MessageSquareText, Pencil, Trash, Trash2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'

export interface PostT {
  id: string
  name: string
  username: string
  profilePic: string
  time: number
  content: string
  image: string[]
  likes: number
  comments: number
  color:
    | 'slate'
    | 'stone'
    | 'red'
    | 'orange'
    | 'amber'
    | 'yellow'
    | 'lime'
    | 'green'
    | 'emerald'
    | 'teal'
    | 'cyan'
    | 'sky'
    | 'blue'
    | 'indigo'
    | 'violet'
    | 'purple'
    | 'pink'
    | 'fuchsia'
}
export default function Post({ post }: { post: PostT }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [showReactions, setShowReactions] = useState(false)

  const toggleContent = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div
      className={`flex flex-col gap-2 rounded-3xl border border-slate-400/5 px-3.5 py-4 pb-2.5 text-black sm:p-4 ${colors[post.color as keyof typeof colors].card} `}
    >
      <div className='flex items-start gap-3 px-0.5'>
        <Button variant='zero'>
          <img src='/images/profile.jpg' alt='' className='aspect-square w-12 rounded-full' />
        </Button>
        <div className='flex flex-grow select-none items-center justify-between'>
          <div>
            <Button
              variant='zero'
              className='text-sm font-semibold leading-tight'
              onClick={() => {
                console.log('clicked')
              }}
            >
              {post.name}
            </Button>
            <p className='text-xs text-black/50 md:text-black/80'>{post.time}</p>
          </div>
          <Button variant='icon' className=''>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className='p-2'>
                <div>
                  <EllipsisVertical size={20} className='text-black' />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align='end'
                className='border border-black/10 bg-white/10 backdrop-blur-md dark:border-white/10 dark:bg-black/25'
              >
                <DropdownMenuItem
                  className=''
                  onClick={() => {
                    console.log('clicked')
                  }}
                >
                  <Pencil size={17} className='mr-2' />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem className='text-red-500'>
                  <Trash2 size={17} className='mr-2' />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Button>
        </div>
      </div>
      <div
        className={`cursor-pointer px-1 text-xs font-medium text-black/80 sm:text-sm md:font-medium ${isExpanded ? '' : 'line-clamp-2'}`}
        onClick={toggleContent}
      >
        {post.content}
      </div>
      <div className=''>
        <Swiper
          spaceBetween={12}
          pagination={{
            clickable: false,
          }}
          autoplay={{
            delay: 3000,
          }}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          className='rounded-xl'
        >
          {post.image.map((img, index) => (
            <SwiperSlide key={index} className='flex w-full items-center justify-center rounded-full'>
              <div className='flex w-full items-center justify-center bg-black/5'>
                <img
                  src={img}
                  alt=''
                  className='aspect-video w-full cursor-pointer rounded-xl object-cover transition-all duration-300 active:object-contain'
                  onContextMenu={(e: { preventDefault: () => any }) => e.preventDefault()}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className='flex select-none items-center justify-between gap-5 pl-1 sm:px-2'>
        <div className='flex flex-grow items-center gap-4 text-sm font-medium text-black/50 md:text-black/50'>
          <Button
            variant='zero'
            className='flex cursor-pointer items-center gap-1.5 font-normal'
            onClick={() => {
              setIsLiked(!isLiked)
            }}
          >
            {isLiked ? (
              <Heart size={20} className='fill-current text-red-500' onClick={() => setIsLiked(!isLiked)} />
            ) : (
              <Heart size={20} className='' onClick={() => setIsLiked(!isLiked)} />
            )}
            <p className=''>{nFormatter(post.likes)}</p>
            <p className='hidden md:block'> {post.likes == 1 ? 'Like' : 'Likes'} </p>
          </Button>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant='zero' className='flex cursor-pointer items-center gap-1.5 font-normal'>
                <MessageSquareText size={20} className='' />
                <p className=''>{nFormatter(post.comments)}</p>
                <p className='hidden md:block'> {post.comments == 1 ? 'Comment' : 'Comments'} </p>
              </Button>
            </DrawerTrigger>
            <DrawerContent className={`wbackdrop-blur-3xl mx-auto min-h-[600px] max-w-[800px]`}>
              <DrawerHeader className='w-full text-center font-extrabold'>450 Comments</DrawerHeader>
              <Comments />
            </DrawerContent>
          </Drawer>
        </div>
        <Button
          variant='zero'
          className={`cursor-pointer select-none rounded-full border-[0.5px] border-black/5 px-5 py-2 text-xs font-semibold ${colors[post.color as keyof typeof colors].button} text-black/45`}
        >
          set reaction
        </Button>
      </div>
    </div>
  )
}

export function Comments() {
  const [comment, setComment] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [comment])

  return (
    <div className=''>
      <div className='absolute bottom-0 left-auto w-full border-t bg-white/60 px-2 py-3 pt-4 backdrop-blur-lg dark:bg-black'>
        <div className='flex w-full items-center gap-1.5'>
          <img src='/images/profile.jpg' alt='' className='aspect-square w-8 rounded-full' />
          <textarea
            ref={textareaRef}
            placeholder='Add a comment'
            className='no-scrollbar max-h-24 flex-grow rounded-3xl border border-black/5 px-3 py-2 text-[13px] repeat-infinite focus:outline-none dark:bg-black dark:text-white'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={1}
          />
          <Button
            variant='zero'
            className='flex items-center gap-1 rounded-full border border-black/5 bg-accent px-4 py-1.5 text-xs font-semibold text-white'
          >
            Post
          </Button>
        </div>
      </div>
      <div className='grid max-h-[85dvh] gap-5 overflow-auto py-1 pb-24'>
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </div>
    </div>
  )
}

export function Comment() {
  const [showReplies, setShowReplies] = useState(false)
  return (
    <div className='flex flex-col items-start gap-3 px-5'>
      <div className='grid gap-2'>
        <CommentContent />
        <div className='flex items-center justify-normal gap-1.5 px-12'>
          <Button variant='zero' className='text-xs font-semibold text-black/50 dark:text-white/60'>
            Reply
          </Button>
          <p className='leading-none text-black/50'>•</p>
          <Button
            variant='zero'
            className='text-xs font-semibold text-black/50 dark:text-white/60'
            onClick={() => setShowReplies(!showReplies)}
          >
            {showReplies ? 'Hide Replies' : 'View 2 Replies'}
          </Button>
        </div>
      </div>
      {showReplies && (
        <div className='grid gap-3.5 pb-2 pl-10 pt-0.5'>
          <CommentReplay />
          <CommentReplay />
        </div>
      )}
    </div>
  )
}

export function CommentReplay() {
  return (
    <div className='grid gap-1'>
      <CommentContent />
      <div className='flex items-center justify-normal gap-1.5 px-12'>
        <Button variant='zero' className='text-xs font-semibold text-black/55 dark:text-white/60' onClick={() => {}}>
          Reply
        </Button>
      </div>
    </div>
  )
}

function CommentContent() {
  const [isLiked, setIsLiked] = useState(false)
  const [showMore, setShowMore] = useState(false)
  return (
    <div className='flex items-start justify-center gap-3'>
      <div className='w-36 flex-grow-0 pt-1.5 sm:w-20'>
        <img src='/images/profile.jpg' alt='' className='aspect-square rounded-full' />
      </div>
      <div className='flex items-center gap-4 pr-2'>
        <div className='grid gap-1'>
          <div className='flex gap-3'>
            <div className='flex items-center justify-normal gap-1.5 text-xs'>
              <p className='font-semibold'>Ananta Karmakar</p>
              <p className='leading-none text-black/50'>•</p>
              <p className='text-[11px] text-black/50'>12:20 AM</p>
            </div>
          </div>
          <div
            className={`cursor-pointer text-xs font-medium text-black/80 dark:text-white/80 sm:text-sm md:font-medium ${showMore ? '' : 'line-clamp-2'}`}
            onClick={() => setShowMore(!showMore)}
          >
            This is a comment on the post. This is a comment on the post. This is a comment on the post. This is a This
            is a comment on the post. This is a comment on the post. This is a comment on the post. This is a
          </div>
        </div>
        <div className='flex flex-col items-center justify-start gap-1'>
          <Button variant='icon' className='text-xs font-semibold' onClick={() => setIsLiked(!isLiked)}>
            <Heart size={18} className={isLiked ? 'fill-current text-red-500' : ''} />
          </Button>
          <div className='text-[11px]'>203</div>
        </div>
      </div>
    </div>
  )
}
