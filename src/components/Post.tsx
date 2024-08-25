import { MessageCircle, MoreHorizontal, MoreVertical, Share, Share2, ThumbsUp } from 'lucide-react'
import Image from 'next/image'

export default function Post() {
  return (
    <div className='flex flex-col gap-0 border-t bg-white py-2 text-black dark:bg-black dark:text-white'>
      <Account />
      <Text />
      <Media />
      <Like />
    </div>
  )
}

function Like() {
  return (
    <div className='grid select-none gap-2 pb-2 pt-3'>
      <div className='flex justify-between px-5 text-xs text-black/70 dark:text-white/70'>
        <div className=''>30 Likes</div>
        <div>450 Comments </div>
      </div>
      <div className='flex items-center justify-around border-t border-black/15 pt-3 text-sm font-medium text-black/60 dark:border-white/15 dark:text-white/60'>
        <div className='flex items-center gap-2'>
          <ThumbsUp size={22} className='fill-white/50' />
          Like
        </div>
        <div className='flex items-center gap-2'>
          <MessageCircle size={22} />
          Comment
        </div>
        <div className='flex items-center gap-2'>
          <Share2 size={22} />
          Share
        </div>
      </div>
    </div>
  )
}

function Text() {
  return (
    <div className='line-clamp-3 px-3 py-2 text-sm'>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas unde fugit delectus inventore voluptatibus nobis,
      accusantium perferendis ad ab illo, autem placeat numquam explicabo sed. Ipsum pariatur dolore blanditiis
      consequatur?
    </div>
  )
}

function Media() {
  return (
    <div>
      <Image src='/images/image.2.png' alt='' className='max-h-[500px] w-full object-cover sm:object-contain' />
    </div>
  )
}

function Account() {
  return (
    <div className='flex items-center justify-between px-3'>
      <div className='flex items-center justify-normal gap-2'>
        <Image src='/images/profile.jpg' alt='' className='w-12 rounded-full' />
        <div className='flex w-[80%] flex-col gap-0'>
          <div className='font-semibold'>Ananta Karmakar</div>
          <div className='line-clamp-1 text-xs text-black/70 dark:text-white/70'>
            Frontend Developer | React & Next.js | Freelancer | JS | Competitive Programmer Frontend Developer{' '}
          </div>
          <div className='line-clamp-1 text-xs text-black/70 dark:text-white/70'>28 jul 2023</div>
        </div>
      </div>
      <div>
        <MoreVertical size={20} />
      </div>
    </div>
  )
}
