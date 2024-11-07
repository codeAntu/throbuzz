'use client'
import { FollowersT } from '@/app/(client)/(user)/profile/[userName]/followers/page'
import { handleFollow, handleUnFollow } from '@/handelers/helpers/follow'
import { useState } from 'react'
import { Button } from './Button'
import Img from './Img'
import { useRouter } from 'next/navigation'

export interface PeopleT {
  _id: string
  name: string
  username: string
  isMe: boolean
  profilePic: {
    imageUrl: string
    publicId: string
  }
  followers: number
  postsCount: number
  isFollowing: boolean
}

export default function People({ people }: { people: PeopleT }) {
  const [isFollowing, setIsFollowing] = useState(people.isFollowing)
  const [isMe, setIsMe] = useState(people.isMe)
  const router = useRouter()
  return (
    <div className='flex select-none items-center gap-4'>
      <div
        className='flex aspect-square w-16 items-center justify-center overflow-hidden rounded-full'
        onClick={() => {
          router.push(`/profile/${people.username}`)
        }}
      >
        <Img imageUrl={people.profilePic.imageUrl} publicId={people.profilePic.publicId} height={100} width={100} />
      </div>
      <div className='flex w-full justify-between gap-2.5'>
        <div
          className=''
          onClick={() => {
            router.push(`/profile/${people.username}`)
          }}
        >
          <div className='text-sm font-semibold sm:text-lg'>{people.name}</div>
          <div className='text-xs font-medium text-black/60 dark:text-white/60 sm:text-base'>{people.username}</div>
        </div>
        <div className='flex items-center justify-center gap-2.5'>
          {!isMe ? (
            !isFollowing ? (
              <Button
                variant='zero'
                className='rounded-[8px] bg-black px-5 py-2 text-xs font-medium text-white dark:bg-white dark:text-black sm:py-2'
                onClick={(e) => {
                  e.stopPropagation()
                  handleFollow(people._id, setIsFollowing)
                }}
                disabled={isFollowing}
              >
                Follow
              </Button>
            ) : (
              <Button
                variant='zero'
                className='rounded-[8px] bg-black/10 px-5 py-2 text-xs font-medium text-black dark:bg-white/10 dark:text-white sm:py-2'
                onClick={(e) => {
                  e.stopPropagation()
                  handleUnFollow(people._id, setIsFollowing)
                }}
                disabled={!isFollowing}
              >
                Unfollow
              </Button>
            )
          ) : null}
        </div>
      </div>
    </div>
  )
}
