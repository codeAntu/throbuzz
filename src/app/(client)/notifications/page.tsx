/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import Header from '@/components/Header'
import { Screen0 } from '@/components/Screen'
import NotificationSkeleton from '@/components/skeleton/NotificationSkeleton'
import { gteNotifications } from '@/handelers/notifications/notifications'
import axios from 'axios'
import { Bell, EllipsisVertical } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export interface NotificationT {
  _id: string
  userId: string
  title: string
  message: string
  read: boolean
  readAt: null
  url: string
  createdAt: Date
  updatedAt: Date
  __v: number
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationT[] | null>(null)
  const [nextPage, setNextPage] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const [newNotificationsCount, setNewNotificationsCount] = useState(0)
  const [loading, setLoading] = useState(true)

  async function handleGetNotifications() {
    setLoading(true)
    const response = await gteNotifications()
    console.log(response)
    if (response.error) {
      console.log(response.message)
      return
    }
    setNotifications(response.notifications)
    setNextPage(response.nextLink)
    setNewNotificationsCount(response.newNotificationsCount)
    console.log(response)
    setLoading(false)
  }

  async function getNextNotifications(nextPage: string) {
    if (!nextPage) return console.log('No more notifications')

    console.log('next page', nextPage)

    try {
      const response = await axios.post(nextPage)
      console.log(response)

      setNotifications([...(notifications || []), ...response.data.notifications])
      setNextPage(response.data.nextLink)
    } catch (error: any) {
      console.log(error.message)
    }
  }

  console.log(notifications)
  console.log(nextPage)

  useEffect(() => {
    handleGetNotifications()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        getNextNotifications(nextPage)
      }
    })

    if (ref.current) observer.observe(ref.current)

    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [nextPage])

  // return <NotificationSkeleton />

  return (
    <Screen0 className=''>
      <Header title='Notifications' />
      <div className='grid gap-4 p-5'>
        <div className='text-lg font-semibold'>
          All Notifications
          <span className='px-2 text-accent'>{newNotificationsCount > 0 ? newNotificationsCount : ''}</span>
        </div>
        <div className='space-y-5'>
          {loading && !notifications && (
            <div className='space-y-4'>
              <NotificationSkeleton />
              <NotificationSkeleton />
              <NotificationSkeleton />
              <NotificationSkeleton />
              <NotificationSkeleton />
              <NotificationSkeleton />
            </div>
          )}
          {!loading && !notifications?.length && (
            <div className='flex h-[50dvh] items-center justify-center'>
              <div className='flex flex-col items-center gap-2'>
                <div className='text-center text-lg font-semibold'>No Notifications </div>
              </div>
            </div>
          )}

          {notifications &&
            notifications.map((notification) => (
              <Notification key={notification._id} notification={notification} />
              // <NotificationSkeleton key={notification._id} />
            ))}
        </div>
        <div ref={ref} className='flex justify-center'></div>
      </div>
    </Screen0>
  )
}

function Notification({ notification }: { notification: NotificationT }) {
  const [showMore, setShowMore] = useState(false)

  return (
    <div
      className={`flex items-center gap-1 ${!notification.read ? 'bg-black/5 dark:bg-white/10' : ''} rounded-xl py-2 pl-3 pr-3`}
    >
      <div className='flex flex-grow items-center gap-3'>
        <div className='w-12 flex-grow-0 rounded-full bg-yellow-200 p-3'>
          <Bell size={22} className='text-yellow-500' />
        </div>
        <div className='w-full flex-grow'>
          <div
            className={`cursor-pointer text-sm font-semibold text-black/65 dark:text-white/65 ${showMore ? '' : 'line-clamp-2'} `}
            onClick={() => setShowMore(!showMore)}
          >
            {notification.message}
          </div>
        </div>
      </div>
      <div>
        <EllipsisVertical size={20} />
      </div>
    </div>
  )
}
