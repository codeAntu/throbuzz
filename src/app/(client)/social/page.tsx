/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
'use client'
import { Button } from '@/components/Button'
import Header from '@/components/Header'
import { Screen0 } from '@/components/Screen'
import { handleAcceptRequest, handleDeleteRequest } from '@/handelers/helpers/follow'
import { acceptRequest, deleteRequest, getFriendRequests, getSentRequests } from '@/handelers/social/social'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

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
  const [page, setPage] = useState('Sent Requests')

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
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([])
  const [nextPage, setNextPage] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const [total, setTotal] = useState(0)

  async function handleGetFriendRequests() {
    const response = await getFriendRequests()

    console.log(response)

    if (response.error) {
      console.log(response.message)
      return
    }

    setFriendRequests(response.friendRequests)
    setNextPage(response.nextPage)
    setTotal(response.total)
  }
  async function getNextFriendRequests(nextPage: string) {
    if (!nextPage) return console.log('No more friend requests')

    console.log('next page', nextPage)

    try {
      const response = await axios.get(nextPage)
      console.log(response.data)
      setFriendRequests([...friendRequests, ...response.data.friendRequests])
      setNextPage(response.data.nextPage)
    } catch (error: any) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    handleGetFriendRequests()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        getNextFriendRequests(nextPage)
      }
    })

    if (ref.current) observer.observe(ref.current)
  }, [nextPage])

  return (
    <Screen0 className='gap-5'>
      <div className='text-lg font-semibold'>
        {' '}
        Follow Requests
        <span className='px-2 text-red-500'>{total > 0 ? total : ''}</span>
      </div>
      <div className='grid gap-5 sm:gap-7'>
        {friendRequests.map((friendRequest, index) => (
          <FriendRequest key={index} friendRequest={friendRequest} />
        ))}
      </div>
      <div ref={ref}></div>
    </Screen0>
  )
}

function FriendRequest({ friendRequest }: { friendRequest: FriendRequest }) {
  const [isAccepted, setIsAccepted] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const router = useRouter()

  if (isDeleted) return null

  return (
    <div
      className='flex items-center gap-3'
      onClick={() => {
        router.push(`/profile/${friendRequest.senderDetails.username}`)
      }}
    >
      <img src={friendRequest.senderDetails.profilePic.imageUrl} alt='' className='size-20 rounded-full sm:size-24' />
      <div className='grid w-full gap-2.5 pt-1'>
        <div className='px-2'>
          <div className='text-base font-semibold sm:text-lg'>{friendRequest.senderDetails.name}</div>
          <div className='text-xs font-medium text-black/60 dark:text-white/60 sm:text-sm'>
            {friendRequest.senderDetails.username}
          </div>
        </div>
        <div className='flex w-full items-center justify-between gap-3'>
          {isAccepted ? (
            <Button variant='filled' className='rounded-xs py-2 text-xs sm:py-3' disabled={isAccepted}>
              Accepted
            </Button>
          ) : (
            <>
              <Button
                variant='filled'
                className='rounded-xs py-2 text-xs sm:py-3'
                onClick={(e) => {
                  e.stopPropagation()
                  console.log(friendRequest._id)

                  handleAcceptRequest(friendRequest._id, setIsAccepted)
                }}
                disabled={isAccepted}
              >
                Accept
              </Button>
              <Button
                variant='outline'
                className='rounded-xs border-[1.5px] py-2 text-xs sm:py-3'
                onClick={(e) => {
                  e.stopPropagation()
                  handleDeleteRequest(friendRequest._id, setIsDeleted)
                }}
                disabled={isDeleted}
              >
                Delete
              </Button>
            </>
          )}
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
          <Button
            variant='filled'
            className='rounded-xs py-2 text-xs sm:py-3'
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
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

export interface SentRequestT {
  _id: string
  receiverDetails: {
    name: string
    username: string
    profilePic: {
      imageUrl: string
      publicId: string
    }
    bio: string
  }
}

function SentRequests() {
  const [sentRequests, setSentRequests] = useState<SentRequestT[]>([])
  const [nextPage, setNextPage] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const [total, setTotal] = useState(0)

  async function handleGetSentRequests() {
    const response = await getSentRequests()
    if (response.error) {
      console.log(response.message)
      setSentRequests((prevRequests) => [...prevRequests, ...response.data.friendRequests])
    }
    console.log(response)

    setSentRequests(response.sentRequests)
    setNextPage(response.nextPage)
    setTotal(response.totalRequests)
  }

  async function getNextSentRequests(nextPage: string) {
    if (!nextPage) return console.log('No more sent requests')

    try {
      const response = await axios.post(nextPage)
      console.log(response.data)
      setSentRequests([...sentRequests, ...response.data.sentRequests])
      setNextPage(response.data.nextPage)
    } catch (error: any) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    handleGetSentRequests()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        getNextSentRequests(nextPage)
      }
    })

    if (ref.current) observer.observe(ref.current)
  }, [nextPage])

  return (
    <Screen0 className='gap-5'>
      <div className='text-lg font-semibold'>
        Sent Requests
        <span className='px-2 text-red-500'>{total > 0 ? total : ''}</span>
      </div>

      <div className='grid gap-5 sm:gap-7'>
        {sentRequests.map((sentRequest, index) => (
          <SentRequest key={index} sentRequest={sentRequest} />
        ))}
      </div>
      <div ref={ref}></div>
    </Screen0>
  )
}

function SentRequest({ sentRequest }: { sentRequest: SentRequestT }) {
  console.log(sentRequest)
  const [isDeleted, setIsDeleted] = useState(false)
  const router = useRouter()

  if (isDeleted) return null

  return (
    <div
      className='flex items-center gap-3'
      onClick={() => {
        router.push(`/profile/${sentRequest.receiverDetails.username}`)
      }}
    >
      <img src={sentRequest.receiverDetails.profilePic.imageUrl} alt='' className='size-20 rounded-full sm:size-24' />
      <div className='grid w-full gap-2.5 pt-1'>
        <div className='px-2'>
          <div className='text-base font-semibold sm:text-lg'>{sentRequest.receiverDetails.name}</div>
          <div className='text-xs font-medium text-black/60 dark:text-white/60 sm:text-sm'>
            {sentRequest.receiverDetails.username}
          </div>
        </div>
        <div className='flex w-full items-center justify-between gap-3'>
          <Button
            variant='filled'
            className='rounded-xs py-2 text-xs sm:py-3'
            onClick={(e) => {
              e.stopPropagation()
              handleDeleteRequest(sentRequest._id, setIsDeleted)
            }}
          >
            Withdraw
          </Button>
          <Button variant='outline' className='rounded-xs border-[1.5px] py-2 text-xs sm:py-3'>
            Message
          </Button>
        </div>
      </div>
    </div>
  )
}
