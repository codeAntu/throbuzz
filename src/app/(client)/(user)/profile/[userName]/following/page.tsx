/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'

import { Button } from '@/components/Button'
import Header from '@/components/Header'
import Img from '@/components/Img'
import { Screen0 } from '@/components/Screen'
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from '@/components/ui/drawer'
import { getFollowing } from '@/handelers/user/follow'
import axios from 'axios'
import { EllipsisVertical, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export interface FollowingT {
  _id: string
  status: string
  details: {
    name: string
    username: string
    profilePic: {
      imageUrl: string
      publicId: string
    }
    bio: string
  }
}

export default function Followings({
  params,
}: {
  params: {
    userName: string
    [key: string]: any
  }
}) {
  const router = useRouter()
  const [followings, setFollowings] = useState<FollowingT[]>([])
  const [totalFollowing, setTotalFollowing] = useState(0)
  const [nextPageUrl, setNextPageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  async function handleGetFollowing() {
    const response = await getFollowing(params.userName)
    console.log(response)

    if (response.error) {
      return
    }

    setFollowings(response.followers)
    setTotalFollowing(response.totalFollowing)
    setNextPageUrl(response.nextPageUrl)
  }

  async function handleNextPage() {
    if (!nextPageUrl) {
      return
    }

    setLoading(true)
    const response = await axios.get(nextPageUrl)
    console.log(response.data)
    setFollowings((prev) => [...prev, ...response.data.following])
    setNextPageUrl(response.data.nextPageUrl)
    setTotalFollowing(response.data.totalFollowing)
    setLoading(false)
  }

  useEffect(() => {
    handleGetFollowing()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        const first = entries[0]
        if (first.isIntersecting && !loading) {
          await handleNextPage()
        }
      },
      { threshold: 0.5 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref.current, loading])

  return (
    <Screen0>
      <Header title='Following' />
      <div className='grid select-none gap-4 px-5 py-4'>
        <div className='flex w-full items-center justify-center gap-2 rounded-full bg-black/5 px-3 py-2.5 text-xs text-black/80 dark:bg-white/5 dark:text-white/80'>
          <Search size={20} />
          <input type='text' className='w-full border-none bg-transparent outline-none' placeholder='Search ' />
        </div>
        <div className='text-lg font-semibold'>
          All Following
          <span className='px-2 text-accent'>{totalFollowing ? totalFollowing : ''}</span>
        </div>
        <div className='grid gap-5 sm:gap-7'>
          {followings && followings.map((following) => <Following key={following._id} {...following} />)}
        </div>
        <div ref={ref}></div>
      </div>
    </Screen0>
  )
}

function Following(
  props: FollowingT & {
    [key: string]: any
  },
) {
  const router = useRouter()
  return (
    <div className='flex select-none items-center gap-4'>
      <div
        className='flex aspect-square w-16 items-center justify-center overflow-hidden rounded-full bg-red-200'
        onClick={() => {
          router.push(`/profile/${props.details.username}`)
        }}
      >
        <Img
          imageUrl={props.details.profilePic.imageUrl}
          publicId={props.details.profilePic.publicId}
          height={50}
          width={50}
        />
      </div>
      <div className='flex w-full justify-between gap-2.5'>
        <div
          className=''
          onClick={() => {
            router.push(`/profile/${props.details.username}`)
          }}
        >
          <div className='text-sm font-semibold sm:text-lg'>{props.details.name}</div>
          <div className='text-xs font-medium text-black/60 dark:text-white/60 sm:text-base'>
            {props.details.username}
          </div>
        </div>
        <div className='flex items-center justify-center gap-2.5'>
          <Button
            variant='zero'
            className='rounded-[8px] bg-black px-5 py-2 text-xs font-medium text-white dark:bg-white dark:text-black sm:py-2'
          >
            Message
          </Button>
          <MyDrawer />
        </div>
      </div>
    </div>
  )
}

function MyDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='zero' className='flex cursor-pointer items-center gap-1.5 font-normal'>
          <EllipsisVertical size={26} strokeWidth={1} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className={`wbackdrop-blur-3xl mx-auto max-w-[800px]`}>
        <DrawerHeader className='w-full text-center font-extrabold'>Unfollow This account ?</DrawerHeader>
        <div className='px-5 pb-10 pr-8'>
          <div className='flex items-center gap-4'>
            <img src='/images/img1.png' alt='' className='size-14 rounded-full sm:size-20' />
            <div className='flex w-full justify-between gap-2.5'>
              <div className=''>
                <div className='text-sm font-semibold sm:text-lg'>Ananta Karmakar</div>
                <div className='text-xs font-medium text-black/60 dark:text-white/60 sm:text-base'>codeAntu</div>
              </div>
            </div>
            <Button
              variant='zero'
              className='rounded-[8px] px-5 py-1.5 text-xs font-medium text-red-500 sm:py-2 sm:text-base'
            >
              Unfollow
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
