/* eslint-disable @next/next/no-img-element */
'use client '
import { colors } from '@/lib/const'
import { nFormatter } from '@/utils/utils'
import { EllipsisVertical, Heart, MessageSquareText } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/Button'

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

  const toggleContent = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div
      className={`flex flex-col gap-2 rounded-3xl border border-slate-400/5 px-2.5 py-3.5 pb-2.5 text-black sm:p-4 ${colors[post.color as keyof typeof colors].card}`}
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
          <Button variant='icon' className='px-2 py-2'>
            <EllipsisVertical size={20} className='text-black' />
          </Button>
        </div>
      </div>
      <div
        className={`cursor-pointer px-1 text-xs font-medium text-black/80 sm:text-sm md:font-medium ${isExpanded ? '' : 'line-clamp-2'}`}
        onClick={toggleContent}
      >
        {post.content}
      </div>
      {/* <img src='/images/image.2.png' alt='' className='w-full' /> */}
      <div className=''>
        {post.image.map((img, index) => (
          <div
            key={index}
            className='max-h-80 w-full overflow-hidden rounded-xl object-contain sm:max-h-[350px] md:max-h-[500px]'
          >
            <img src={img} alt='' className='w-full' />
          </div>
        ))}
      </div>
      <div className='flex select-none items-center justify-between gap-5 pl-1 sm:px-2'>
        <div className='flex flex-grow items-center gap-4 text-sm font-medium text-black/50 md:text-black/50'>
          <Button variant='zero' className='flex cursor-pointer items-center gap-1.5 font-normal'>
            <Heart size={20} className='' />
            <p className=''>{nFormatter(post.likes)}</p>
            <p className='hidden md:block'> {post.likes == 1 ? 'Like' : 'Likes'} </p>
          </Button>

          <Button variant='zero' className='flex cursor-pointer items-center gap-1.5 font-normal'>
            <MessageSquareText size={20} className='' />
            <p className=''>{nFormatter(post.comments)}</p>
            <p className='hidden md:block'> {post.comments == 1 ? 'Comment' : 'Comments'} </p>
          </Button>
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
