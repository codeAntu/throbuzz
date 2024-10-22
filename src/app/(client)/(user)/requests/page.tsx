/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
'use client'
import { Button } from '@/components/Button'
import Header from '@/components/Header'
import { Screen, Screen0 } from '@/components/Screen'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { title } from 'process'
import { useEffect, useState } from 'react'

interface FriendRequest {
  _id: string
  senderDetails: {
    name: string
    username: string
    profilePic: {
      imageUrl: string
      publicId: string
    }
    bio: string
  }
}

export default function Requests() {
  const router = useRouter()
  const [page, setPage] = useState('Follow Requests')

  const pages = ['Follow Requests', 'Sent Requests', 'Suggestions']

  return (
    <Screen0>
      <Header title={page}></Header>
      <div className='grid gap-4 px-5 py-4'>
        <div className='flex items-center gap-2'>
          {pages.map((title, index) => (
            <Button
              key={index}
              variant='zero'
              className={`rounded-full bg-black/10 px-5 py-2 text-xs font-semibold text-black/80 dark:bg-white/10 dark:text-white/80 ${page === title ? 'hidden' : ''} `}
              onClick={() => {
                setPage(title)
              }}
            >
              {title}
            </Button>
          ))}
        </div>
        <hr />
        {
          {
            'Follow Requests': <FriendRequests />,
            Suggestions: <Suggestions />,
            'Sent Requests': <SentRequests />,
          }[page]
        }
      </div>
    </Screen0>
  )
}

function FriendRequests() {
  // async function getFriendRequests() {
  //   try {
  //     const response = await axios.get('/api/user/getFriendRequests')
  //     // console.log(response.data)
  //     setFriendRequests(response.data.data)
  //     setNextPage(response.data.nextPage || '')
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // async function getNextFriendRequests(nextPage: string) {
  //   if (!nextPage) return console.log('No more friend requests')

  //   console.log('next page', nextPage)

  //   try {
  //     const response = await axios.get(nextPage)
  //     // console.log(response.data)
  //     setFriendRequests([...friendRequests, ...response.data.data])
  //     setNextPage(response.data.nextPage || '')
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // async function deleteFriendRequest(friendRequestId: string) {
  //   try {
  //     const response = await axios.delete('/api/user/deleteFriendRequest', {
  //       data: { friendRequestId },
  //     })
  //     console.log(response.data)
  //     setFriendRequests(friendRequests.filter((friendRequest) => friendRequest._id !== friendRequestId))
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   getFriendRequests()
  // }, [])

  return (
    <Screen0 className='gap-5'>
      <div className='text-lg font-semibold'>
        {' '}
        Follow Requests
        <span className='px-2 text-red-500'>120</span>
      </div>
      <div className='grid gap-5 sm:gap-7'>
        <FriendRequest />
        <FriendRequest />
        <FriendRequest />
        <FriendRequest />
        <FriendRequest />
        <FriendRequest />
        <FriendRequest />
        <FriendRequest />
        <FriendRequest />
        <FriendRequest />
        <FriendRequest />
        <FriendRequest />
        <FriendRequest />
        <FriendRequest />
        <FriendRequest />
        <FriendRequest />
        <FriendRequest />
      </div>
    </Screen0>
  )
}

function FriendRequest() {
  return (
    <div className='flex items-center gap-3'>
      <img src='/images/img1.png' alt='' className='size-20 rounded-full sm:size-24' />
      <div className='grid w-full gap-2.5 pt-1'>
        <div className='px-2'>
          <div className='text-base font-semibold sm:text-lg'>Ananta Karmakar</div>
          <div className='text-xs font-medium text-black/60 dark:text-white/60 sm:text-sm'>codeAntu</div>
        </div>
        <div className='flex w-full items-center justify-between gap-3'>
          <Button variant='filled' className='rounded-xs py-2 text-xs sm:py-3'>
            Accept
          </Button>
          <Button variant='outline' className='rounded-xs border-[1.5px] py-2 text-xs sm:py-3'>
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

function Suggestions() {
  const router = useRouter()
  return (
    <Screen0 className='gap-5'>
      <div className='text-lg font-semibold'>You may know</div>
      <div className='grid gap-5 sm:gap-7'>
        <People />
        <People />
        <People />
      </div>
    </Screen0>
  )
}

function People() {
  return (
    <div className='flex items-center gap-3'>
      <img src='/images/img1.png' alt='' className='size-20 rounded-full sm:size-24' />
      <div className='grid w-full gap-2.5 pt-1'>
        <div className='px-2'>
          <div className='text-base font-semibold sm:text-lg'>Ananta Karmakar</div>
          <div className='text-xs font-medium text-black/60 dark:text-white/60 sm:text-sm'>codeAntu</div>
        </div>
        <div className='flex w-full items-center justify-between gap-3'>
          <Button variant='filled' className='rounded-xs py-2 text-xs sm:py-3'>
            Follow
          </Button>
          <Button variant='outline' className='rounded-xs border-[1.5px] py-2 text-xs sm:py-3'>
            Message
          </Button>
        </div>
      </div>
    </div>
  )
}

function SentRequests() {
  return (
    <Screen0 className='gap-5'>
      <div className='text-lg font-semibold'>
        Sent Requests
        <span className='px-2 text-red-500'>120</span>
      </div>
      <div className='grid gap-5 sm:gap-7'>
        <SentRequest />
        <SentRequest />
        <SentRequest />
        <SentRequest />
      </div>
    </Screen0>
  )
}

function SentRequest() {
  return (
    <div className='flex items-center gap-3'>
      <img src='/images/img1.png' alt='' className='size-20 rounded-full sm:size-24' />
      <div className='grid w-full gap-2.5 pt-1'>
        <div className='px-2'>
          <div className='text-base font-semibold sm:text-lg'>Ananta Karmakar</div>
          <div className='text-xs font-medium text-black/60 dark:text-white/60 sm:text-sm'>codeAntu</div>
        </div>
        <div className='flex w-full items-center justify-between gap-3'>
          <Button variant='filled' className='rounded-xs py-2 text-xs sm:py-3'>
            Cancel
          </Button>
          <Button variant='outline' className='rounded-xs border-[1.5px] py-2 text-xs sm:py-3'>
            Message
          </Button>
        </div>
      </div>
    </div>
  )
}
